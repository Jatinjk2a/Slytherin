# Requirements Document

## Introduction

This document defines the backend requirements for the README AI platform — a web service that authenticates users, accepts GitHub repository URLs, generates production-quality README files via an LLM pipeline, and persists generation history with analytics scores. The backend extends the existing FastAPI + MongoDB codebase located at `Slytherin/backend/` by adding authentication, user preferences, async job processing, generation history, and a GitHub OAuth flow.

---

## Glossary

- **API**: The FastAPI HTTP service that exposes all endpoints to the frontend SPA.
- **Auth_Service**: The subsystem responsible for user registration, login, JWT issuance, and OAuth flows.
- **Job_Queue**: The background task queue (e.g., Celery) that processes long-running LLM generation tasks asynchronously.
- **Generation_Engine**: The existing pipeline composed of `github_parser`, `readme_generator`, and `scoring` services.
- **LLM_Client**: The integration layer that communicates with an external LLM provider (Groq/OpenAI/Anthropic).
- **User**: An authenticated account identified by a unique ID, email, and optional GitHub identity.
- **GenerationJob**: A background task record tracking the status and result of a single README generation request.
- **GenerationLog**: A persistent database record of a completed README generation, including the final markdown and score.
- **UserPreferences**: A per-user configuration record storing UI theme, documentation tone, and ignored file paths.
- **Score**: A numeric quality assessment (0–100) computed by the `scoring` service from repository metadata.
- **JWT**: A JSON Web Token used as a stateless session credential.
- **GitHub_OAuth**: The OAuth 2.0 flow that allows users to authenticate using their GitHub account.
- **Password_Reset_Token**: A short-lived, single-use token sent via email to authorize a password change.

---

## Requirements

### Requirement 1: User Registration

**User Story:** As a new visitor, I want to create an account with my email and password, so that I can access the README AI platform.

#### Acceptance Criteria

1. WHEN a `POST /api/auth/register` request is received with a valid email, password, and full name, THE Auth_Service SHALL create a new User record with a bcrypt-hashed password and return a JWT.
2. WHEN a `POST /api/auth/register` request is received with an email that already exists in the database, THE Auth_Service SHALL return an HTTP 409 response with a descriptive error message.
3. WHEN a `POST /api/auth/register` request is received with a password shorter than 8 characters, THE Auth_Service SHALL return an HTTP 422 response with a descriptive validation error.
4. WHEN a `POST /api/auth/register` request is received with a malformed email address, THE Auth_Service SHALL return an HTTP 422 response with a descriptive validation error.
5. THE Auth_Service SHALL store passwords exclusively as bcrypt hashes and SHALL NOT persist plaintext passwords.

---

### Requirement 2: User Login

**User Story:** As a registered user, I want to log in with my email and password, so that I can receive a session token to access protected endpoints.

#### Acceptance Criteria

1. WHEN a `POST /api/auth/login` request is received with a valid email and correct password, THE Auth_Service SHALL return a signed JWT with a configurable expiry.
2. WHEN a `POST /api/auth/login` request is received with a valid email and an incorrect password, THE Auth_Service SHALL return an HTTP 401 response.
3. WHEN a `POST /api/auth/login` request is received with an email that does not exist in the database, THE Auth_Service SHALL return an HTTP 401 response.
4. THE Auth_Service SHALL sign JWTs using a secret key loaded from environment configuration and SHALL NOT embed sensitive user data beyond the user ID and email in the token payload.

---

### Requirement 3: Password Reset

**User Story:** As a user who has forgotten my password, I want to trigger a password reset email, so that I can regain access to my account.

#### Acceptance Criteria

1. WHEN a `POST /api/auth/reset-password` request is received with a registered email address, THE Auth_Service SHALL generate a Password_Reset_Token, persist it with an expiry of 1 hour, and dispatch a reset email to that address.
2. WHEN a `POST /api/auth/reset-password` request is received with an email address that does not exist in the database, THE Auth_Service SHALL return an HTTP 200 response without revealing whether the address is registered.
3. WHEN a password reset confirmation request is received with a valid, unexpired Password_Reset_Token and a new password, THE Auth_Service SHALL update the User's password hash and invalidate the token.
4. IF a password reset confirmation request is received with an expired or already-used Password_Reset_Token, THEN THE Auth_Service SHALL return an HTTP 400 response with a descriptive error.

---

### Requirement 4: GitHub OAuth Authentication

**User Story:** As a user, I want to authenticate via my GitHub account, so that I can use the Native GitHub Push feature without managing a separate password.

#### Acceptance Criteria

1. WHEN a `GET /api/auth/github` request is received, THE Auth_Service SHALL redirect the client to the GitHub OAuth authorization URL with the required `client_id` and `scope` parameters.
2. WHEN GitHub redirects back with a valid authorization code, THE Auth_Service SHALL exchange the code for a GitHub access token and retrieve the user's GitHub profile.
3. WHEN a GitHub OAuth callback is received for an email that does not yet exist in the database, THE Auth_Service SHALL create a new User record populated with the GitHub profile data and return a JWT.
4. WHEN a GitHub OAuth callback is received for an email that already exists in the database, THE Auth_Service SHALL link the GitHub identity to the existing User record and return a JWT.
5. IF the GitHub OAuth callback contains an error parameter, THEN THE Auth_Service SHALL redirect the client to the frontend error page with a descriptive message.

---

### Requirement 5: Asynchronous README Generation

**User Story:** As a logged-in user, I want to submit a GitHub repository URL and receive a job ID, so that I can poll for progress without blocking the UI.

#### Acceptance Criteria

1. WHEN a `POST /api/generate` request is received with a valid `repo_url` and an authenticated `user_id`, THE API SHALL enqueue a GenerationJob on the Job_Queue and return a `job_id` with an HTTP 202 response.
2. WHEN a GenerationJob is dequeued, THE Generation_Engine SHALL execute the full pipeline: parse the repository, call the LLM_Client, compute the Score, and persist a GenerationLog.
3. WHILE a GenerationJob is executing, THE Job_Queue SHALL update the job status to one of `"Queued"`, `"Analyzing AST"`, `"Writing Docs"`, or `"Complete"` at each pipeline stage transition.
4. WHEN a `GET /api/generate/:job_id/status` request is received for a valid job ID, THE API SHALL return `{ status, progress }` where `progress` is an integer between 0 and 100 inclusive.
5. WHEN a `GET /api/generate/:job_id/result` request is received for a job with status `"Complete"`, THE API SHALL return the final markdown payload and score data.
6. IF a `GET /api/generate/:job_id/result` request is received for a job that is not yet complete, THEN THE API SHALL return an HTTP 202 response indicating the job is still processing.
7. IF a `GET /api/generate/:job_id/status` request is received for a job ID that does not exist, THEN THE API SHALL return an HTTP 404 response.
8. IF the Generation_Engine encounters an unrecoverable error during processing, THEN THE Job_Queue SHALL set the job status to `"Failed"` and persist the error message.

---

### Requirement 6: User Preferences

**User Story:** As a logged-in user, I want to configure my documentation tone, ignored paths, and UI theme, so that all generated READMEs reflect my preferences.

#### Acceptance Criteria

1. WHEN a `GET /api/user/preferences` request is received from an authenticated user, THE API SHALL return the user's current UserPreferences record.
2. WHEN a `GET /api/user/preferences` request is received from an authenticated user who has no saved preferences, THE API SHALL return a default UserPreferences object.
3. WHEN a `PUT /api/user/preferences` request is received with a valid payload containing `theme`, `tone`, and `ignored_paths`, THE API SHALL upsert the UserPreferences record for that user and return the updated record.
4. IF a `PUT /api/user/preferences` request is received with an unrecognized `theme` value, THEN THE API SHALL return an HTTP 422 response with a descriptive validation error.
5. THE Generation_Engine SHALL apply the authenticated user's `doc_tone` and `ignored_paths` preferences when processing a GenerationJob for that user.

---

### Requirement 7: Generation History

**User Story:** As a logged-in user, I want to view all my previously generated READMEs, so that I can revisit and reuse past outputs.

#### Acceptance Criteria

1. WHEN a `GET /api/history` request is received from an authenticated user, THE API SHALL return a list of GenerationLog records belonging to that user, ordered by `created_at` descending.
2. WHEN a `GET /api/history` request is received from an authenticated user who has no generation history, THE API SHALL return an empty list with an HTTP 200 response.
3. THE API SHALL paginate the history response, returning a maximum of 20 records per page, and SHALL include pagination metadata (`total`, `page`, `page_size`) in the response body.
4. THE API SHALL NOT return GenerationLog records belonging to a different user than the one authenticated in the request.

---

### Requirement 8: Repository Score Retrieval

**User Story:** As a logged-in user, I want to retrieve the analytics score for a previously generated repository, so that I can understand its documentation health.

#### Acceptance Criteria

1. WHEN a `GET /api/repo/:id/score` request is received for a GenerationLog ID that belongs to the authenticated user, THE API SHALL return `{ total_score, readability, coverage, vulnerabilities }`.
2. IF a `GET /api/repo/:id/score` request is received for a GenerationLog ID that does not exist, THEN THE API SHALL return an HTTP 404 response.
3. IF a `GET /api/repo/:id/score` request is received for a GenerationLog ID that belongs to a different user, THEN THE API SHALL return an HTTP 403 response.
4. THE scoring service SHALL compute `readability`, `coverage`, and `vulnerabilities` sub-scores as components of the `total_score`, each normalized to a 0–100 range.

---

### Requirement 9: Authentication Middleware

**User Story:** As a platform operator, I want all non-public endpoints to require a valid JWT, so that user data is protected from unauthorized access.

#### Acceptance Criteria

1. THE API SHALL protect all `/api/user/*`, `/api/history`, `/api/repo/*`, and `/api/generate` endpoints with JWT authentication middleware.
2. IF a request to a protected endpoint is received without an `Authorization: Bearer <token>` header, THEN THE API SHALL return an HTTP 401 response.
3. IF a request to a protected endpoint is received with an expired JWT, THEN THE API SHALL return an HTTP 401 response with a message indicating token expiry.
4. IF a request to a protected endpoint is received with a tampered or invalid JWT signature, THEN THE API SHALL return an HTTP 401 response.
5. THE Auth_Service SHALL expose `POST /api/auth/register`, `POST /api/auth/login`, `POST /api/auth/reset-password`, and `GET /api/auth/github` as public endpoints that do not require authentication.

---

### Requirement 10: Database Models

**User Story:** As a backend developer, I want well-defined database models, so that all services share a consistent data schema.

#### Acceptance Criteria

1. THE database SHALL persist a `User` model with fields: `id`, `email` (unique index), `password_hash`, `full_name`, `avatar_url`, and `created_at`.
2. THE database SHALL persist a `UserPreferences` model with fields: `user_id` (unique index), `doc_tone`, `ignored_paths` (array of strings), and `ui_theme`.
3. THE database SHALL persist a `GenerationLog` model with fields: `id`, `user_id`, `repo_url`, `final_markdown`, `architecture_score`, and `created_at`.
4. THE database SHALL enforce a unique index on `User.email` to prevent duplicate registrations.
5. THE database SHALL enforce a unique index on `UserPreferences.user_id` to ensure one preferences record per user.
