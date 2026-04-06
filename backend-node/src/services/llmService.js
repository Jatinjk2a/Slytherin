const OpenAI = require('openai');
const logger = require('../utils/logger');

// Groq is OpenAI-compatible — same SDK, different baseURL + key
let groqClient = null;

function getClient() {
  if (!groqClient) {
    if (!process.env.GROQ_API_KEY) {
      throw new Error('GROQ_API_KEY is not configured — add it to your .env file');
    }
    groqClient = new OpenAI({
      apiKey: process.env.GROQ_API_KEY,
      baseURL: 'https://api.groq.com/openai/v1',
    });
  }
  return groqClient;
}

function buildGenerationPrompt(metadata, options = {}) {
  const {
    style = 'standard',
    include_badges = true,
    include_toc = true,
    custom_sections = [],
    doc_tone = 'professional',
  } = options;

  const toneMap = {
    professional: 'professional and polished',
    casual: 'friendly and approachable',
    technical: 'precise and highly technical',
    minimal: 'concise and minimalist',
  };

  const badgeSnippet = include_badges
    ? 'Include relevant shields.io badges for: language, license, stars, build status (if CI detected).'
    : 'Do NOT include badges.';

  const tocSnippet = include_toc
    ? 'Include a clickable Table of Contents after the intro.'
    : 'Do NOT include a Table of Contents.';

  const customSnippet =
    custom_sections.length > 0
      ? `Also include these additional sections: ${custom_sections.join(', ')}.`
      : '';

  const systemPrompt = `You are an expert technical writer specializing in open-source project documentation.
Generate production-quality README.md files in Markdown format.
Tone: ${toneMap[doc_tone] || toneMap.professional}.
Style: ${style}.
${badgeSnippet}
${tocSnippet}
${customSnippet}

ALWAYS include:
- Project title and concise description
- Key features (bullet list)
- Tech stack / built with
- Prerequisites
- Installation steps (with code blocks)
- Usage examples (with code blocks)
- API reference (if applicable)
- Contributing guidelines
- License

Output ONLY the raw Markdown. No explanations, no code fences wrapping the entire output.`;

  const userPrompt = `Generate a README.md for this repository:

Repository: ${metadata.full_name}
Description: ${metadata.description || 'No description provided'}
Primary Language: ${metadata.language || 'Unknown'}
Languages Used: ${metadata.languages.join(', ') || 'Unknown'}
Stars: ${metadata.stars} | Forks: ${metadata.forks}
Topics: ${metadata.topics?.join(', ') || 'None'}
License: ${metadata.license || 'None specified'}
Has Tests: ${metadata.has_tests}
Has CI/CD: ${metadata.has_ci}
Root Files: ${metadata.file_tree.slice(0, 30).join(', ')}
${metadata.homepage ? `Homepage: ${metadata.homepage}` : ''}

${metadata.readme_content ? `Existing README (improve upon this):\n${metadata.readme_content.slice(0, 2000)}` : ''}`;

  return { systemPrompt, userPrompt };
}

async function generateReadme(metadata, options = {}) {
  const client = getClient();
  const model = process.env.GROQ_MODEL || 'llama-3.3-70b-versatile';
  const { systemPrompt, userPrompt } = buildGenerationPrompt(metadata, options);

  logger.info(`Calling Groq (${model}) for ${metadata.full_name}`);

  const response = await client.chat.completions.create({
    model,
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt },
    ],
    temperature: 0.7,
    max_tokens: 4096,
  });

  const content = response.choices[0]?.message?.content;
  if (!content) throw new Error('Groq returned empty response');

  logger.info(`Groq generation complete — ${content.length} chars, ${response.usage?.total_tokens} tokens`);

  return {
    markdown: content,
    tokens_used: response.usage?.total_tokens || 0,
    model_used: model,
  };
}

async function regenerateReadme(currentReadme, feedback, metadata) {
  const client = getClient();
  const model = process.env.GROQ_MODEL || 'llama-3.3-70b-versatile';

  const systemPrompt = `You are an expert technical writer.
Revise the provided README.md based on user feedback.
Preserve what's good; apply the requested changes precisely.
Output ONLY the improved raw Markdown.`;

  const userPrompt = `Repository: ${metadata.full_name}

Current README:
${currentReadme}

User Feedback:
${feedback}

Generate the improved README.md:`;

  const response = await client.chat.completions.create({
    model,
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt },
    ],
    temperature: 0.6,
    max_tokens: 4096,
  });

  const content = response.choices[0]?.message?.content;
  if (!content) throw new Error('Groq returned empty response on regeneration');

  return {
    markdown: content,
    tokens_used: response.usage?.total_tokens || 0,
    model_used: model,
  };
}

module.exports = { generateReadme, regenerateReadme };
