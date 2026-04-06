from models.schemas import RepoMetadata
from typing import Dict, Any

def score_repository(metadata: RepoMetadata) -> Dict[str, Any]:
    """
    Evaluates a repository based on GitHub metadata and heuristics.
    Total Score: 100 points
    - Readme Completeness: 30 pts
    - Code Structure: 30 pts
    - Activity: 20 pts
    - Documentation: 20 pts
    """
    score_breakdown = {
        "readme_quality": 0.0,
        "code_structure": 0.0,
        "activity": 0.0,
        "documentation": 0.0,
    }

    # 1. Readme Quality (Max 30)
    has_readme = False
    for fname in metadata.key_files.keys():
        if fname.lower() in ["readme.md", "readme.rst", "readme.txt"]:
            has_readme = True
            body = metadata.key_files[fname]
            break
            
    if has_readme:
        # Give points based on length (simplistic metric)
        readme_len = len(body)
        if readme_len > 1500:
            score_breakdown["readme_quality"] = 30.0
        elif readme_len > 500:
            score_breakdown["readme_quality"] = 20.0
        else:
            score_breakdown["readme_quality"] = 10.0
    else:
        score_breakdown["readme_quality"] = 0.0

    # 2. Code Structure (Max 30)
    structure_score = 0
    tree_lower = [f.lower() for f in metadata.file_tree]
    
    # Check testing
    if metadata.has_tests:
        structure_score += 10
    
    # Check CI/CD
    if metadata.has_ci:
        structure_score += 10
        
    # Standard architectural folders (src, lib, app, bin, etc.)
    if any(p.startswith("src/") or p.startswith("lib/") or p.startswith("app/") for p in tree_lower):
        structure_score += 10
    
    score_breakdown["code_structure"] = min(structure_score, 30.0)

    # 3. Activity (Max 20)
    activity = 0
    stars, forks = metadata.stars, metadata.forks
    if stars > 1000:
        activity += 15
    elif stars > 100:
        activity += 10
    elif stars > 10:
        activity += 5
        
    if forks > 50:
        activity += 5
    elif forks > 10:
        activity += 2

    score_breakdown["activity"] = min(activity, 20.0)

    # 4. Documentation & Standards (Max 20)
    docs = 0
    if metadata.license:
        docs += 10
    
    # Look for Contributing Guidelines
    if any("contributing" in f for f in tree_lower):
        docs += 5
        
    # Look for Issue templates or PR templates
    if any("github/ui" in f or "issue_template" in f or "pull_request_template" in f for f in tree_lower):
        docs += 5
        
    score_breakdown["documentation"] = min(docs, 20.0)

    total_score = sum(score_breakdown.values())

    return {
        "score_breakdown": score_breakdown,
        "total_score": float(total_score)
    }
