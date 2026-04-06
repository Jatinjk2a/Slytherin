import openai
from models.schemas import RepoMetadata, ReadmeStyle, GenerateResponse
from config import settings
import logging

logger = logging.getLogger(__name__)

client = openai.AsyncOpenAI(api_key=settings.xai_api_key, base_url="https://api.groq.com/openai/v1")


async def regenerate_readme(
    repo_url: str,
    metadata: RepoMetadata,
    current_readme: str,
    feedback: str,
    style: ReadmeStyle = ReadmeStyle.standard,
    include_badges: bool = True,
    include_toc: bool = True,
) -> GenerateResponse:
    """
    Takes the existing README + user feedback and produces an improved version.
    Used by POST /regenerate.
    """
    prompt = f"""
## ANCHOR — Output Format
Output ONLY the improved README.md in raw Markdown. No preamble, no explanation.

## PERSONA BOUNDARY
You are an expert technical writer revising an existing README based on specific feedback.
Hard limits: do not invent features, do not hallucinate API names, preserve accurate content.

## CONTEXT
- Repository: {metadata.full_name}
- Language: {metadata.language or 'Unknown'}
- Style target: {style.value}
- Include badges: {include_badges}
- Include Table of Contents: {include_toc}

## EXISTING README
```markdown
{current_readme[:6000]}
```

## USER FEEDBACK
{feedback}

## TASK
Revise the README above based on the feedback. 
Keep everything that wasn't criticised. 
Fix exactly what the feedback requests.
Output the complete revised README now.
""".strip()

    response = await client.chat.completions.create(
        model=settings.grok_model,
        messages=[
            {
                "role": "system",
                "content": (
                    "You are a senior technical writer revising READMEs. "
                    "Output only raw Markdown — no preamble, no wrapper fences."
                )
            },
            {"role": "user", "content": prompt}
        ]
    )

    readme_content = response.choices[0].message.content.strip()
    tokens_used = response.usage.total_tokens

    logger.info(f"Regenerated README for {metadata.full_name} | tokens: {tokens_used}")

    return GenerateResponse(
        repo_url=repo_url,
        readme_content=readme_content,
        metadata=metadata,
        tokens_used=tokens_used,
    )
