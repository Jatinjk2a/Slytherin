import openai
from models.schemas import RepoMetadata, ReadmeStyle, GenerateResponse
from config import settings
import logging

logger = logging.getLogger(__name__)

client = openai.AsyncOpenAI(api_key=settings.xai_api_key, base_url="https://api.groq.com/openai/v1")


def _build_prompt(
    metadata: RepoMetadata,
    style: ReadmeStyle,
    include_badges: bool,
    include_toc: bool,
    custom_sections: list[str] | None,
    repo_url: str,
) -> str:
    """
    Build a structured prompt using the ANCHOR → CONSTRAINT STACK → PERSONA BOUNDARY pattern.
    """
    # Serialize file tree (compact)
    tree_preview = "\n".join(metadata.file_tree[:60])
    if len(metadata.file_tree) > 60:
        tree_preview += f"\n... and {len(metadata.file_tree) - 60} more files"

    # Serialize key file contents
    key_files_block = ""
    for fname, content in metadata.key_files.items():
        key_files_block += f"\n### {fname}\n```\n{content[:1500]}\n```\n"

    # Language breakdown
    lang_str = ", ".join(
        f"{lang} ({round(bytes_/(sum(metadata.languages.values()) or 1)*100)}%)"
        for lang, bytes_ in sorted(metadata.languages.items(), key=lambda x: -x[1])
    ) if metadata.languages else metadata.language or "Unknown"

    # Style-specific instructions
    style_instructions = {
        ReadmeStyle.minimal: (
            "Keep it short: title, one-line description, install, usage. "
            "No fluff. Max 80 lines."
        ),
        ReadmeStyle.standard: (
            "Include: title, description, features, prerequisites, installation, "
            "usage with examples, configuration, contributing, license. "
            "Aim for 150–250 lines."
        ),
        ReadmeStyle.detailed: (
            "Include everything in standard plus: architecture overview, API reference, "
            "environment variables table, FAQ, roadmap, acknowledgements. "
            "Be thorough. 300+ lines is fine."
        ),
    }

    badge_instruction = (
        "Include shields.io badges for: stars, forks, license, primary language, "
        "and CI status (if CI detected). Use the standard shields.io URL format."
        if include_badges else "Do NOT include any badges."
    )

    toc_instruction = (
        "Include a clickable Table of Contents using GitHub anchor links."
        if include_toc else "Do NOT include a Table of Contents."
    )

    custom_section_instruction = ""
    if custom_sections:
        custom_section_instruction = (
            f"Also include these additional sections: {', '.join(custom_sections)}."
        )

    prompt = f"""
## ANCHOR — Output Format
Generate a complete, production-quality README.md in raw Markdown.
Output ONLY the Markdown. No preamble, no explanation, no code fences wrapping the whole thing.

## CONSTRAINT STACK
- Style: {style.value} — {style_instructions[style]}
- Badges: {badge_instruction}
- Table of Contents: {toc_instruction}
- {custom_section_instruction}
- Repo URL for links: {repo_url}
- Clone command should use: git clone {repo_url}
- All code examples must be accurate based on the actual tech stack detected
- Do not invent features not evident from the repo metadata or file contents
- If you cannot infer something, use a clear placeholder like `[TODO: add description]`

## PERSONA BOUNDARY
You are an expert technical writer specialising in open-source documentation.
You produce clean, scannable, developer-first READMEs.
Hard limits: never hallucinate APIs, never invent version numbers, never fabricate features.

## REPOSITORY METADATA
- **Name:** {metadata.full_name}
- **Description:** {metadata.description or 'No description provided'}
- **Primary Language:** {metadata.language or 'Unknown'}
- **Language Breakdown:** {lang_str}
- **Stars:** {metadata.stars} | **Forks:** {metadata.forks} | **Open Issues:** {metadata.open_issues}
- **Topics:** {', '.join(metadata.topics) if metadata.topics else 'None'}
- **License:** {metadata.license or 'Not specified'}
- **Homepage:** {metadata.homepage or 'None'}
- **Default Branch:** {metadata.default_branch}
- **Has Tests:** {'Yes' if metadata.has_tests else 'No'}
- **Has CI/CD:** {'Yes' if metadata.has_ci else 'No'}

## FILE TREE (up to 60 files shown)
```
{tree_preview}
```

## KEY FILE CONTENTS
{key_files_block if key_files_block else 'No key files could be retrieved.'}

## TASK
Write the complete README.md now.
""".strip()

    return prompt


async def generate_readme(
    repo_url: str,
    metadata: RepoMetadata,
    style: ReadmeStyle = ReadmeStyle.standard,
    include_badges: bool = True,
    include_toc: bool = True,
    custom_sections: list[str] | None = None,
) -> GenerateResponse:
    """
    Call Groq to generate a README based on parsed repo metadata.
    Returns the full GenerateResponse with content + token usage.
    """
    prompt = _build_prompt(
        metadata=metadata,
        style=style,
        include_badges=include_badges,
        include_toc=include_toc,
        custom_sections=custom_sections,
        repo_url=repo_url,
    )

    logger.info(f"Calling Groq ({settings.grok_model}) for {metadata.full_name}")

    response = await client.chat.completions.create(
        model=settings.grok_model,
        messages=[
            {
                "role": "system",
                "content": (
                    "You are a senior technical writer. You produce clean, accurate, "
                    "developer-focused README files. Output only raw Markdown — "
                    "no surrounding explanation, no wrapper code fences."
                )
            },
            {"role": "user", "content": prompt}
        ]
    )

    readme_content = response.choices[0].message.content.strip()
    tokens_used = response.usage.total_tokens

    logger.info(f"Generated README for {metadata.full_name} | tokens: {tokens_used}")

    return GenerateResponse(
        repo_url=repo_url,
        readme_content=readme_content,
        metadata=metadata,
        tokens_used=tokens_used,
    )
