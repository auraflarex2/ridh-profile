# AuraMind

AuraMind is an AI accountability product built around one loop:

GOAL -> PLAN -> HOURLY TRACKING -> DAILY ANALYSIS -> WEEKLY PATTERNS -> ADAPTIVE PLAN

## V1 included in this folder

- Goal intake form
- AI-generated 7-day schedule
- Strict JSON output schema
- Daily accountability concepts
- Supabase database schema for goals, schedule blocks and logs
- AI API route ready for an OpenAI key

## Run locally

1. Copy .env.example to .env.local.
2. Add the required OpenAI and Supabase values.
3. Run npm install.
4. Run npm run dev.

## Important

The current connected GitHub account exposes the existing auraflarex2/ridh-profile repository, so this MVP is isolated under auramind/ on a feature branch rather than modifying the existing profile site.

Supabase itself was not available through the connected toolset in this session, so the SQL schema is included for the project owner to run in the Supabase SQL editor.
