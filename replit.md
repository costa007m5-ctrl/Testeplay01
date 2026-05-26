# NetPlay

A Netflix-style streaming platform that aggregates and streams content from Terabox, with movie/series discovery powered by TMDB metadata, watch parties, user profiles, and subscription management.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 8080 em dev, porta 83 em produção aaPanel)
- `pnpm --filter @workspace/netplay run dev` — run the frontend (port 5000 em dev, porta 80 em produção aaPanel via Nginx)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)

## Stack

- pnpm workspaces, Node.js 20, TypeScript 5.9
- Frontend: React 19, Vite, Tailwind CSS 4, Framer Motion, Radix UI
- API: Express 5
- DB: MySQL 8.0 + Drizzle ORM + mysql2
- Validation: Zod, drizzle-zod
- Build: esbuild (CJS bundle for API server)
- Auth: Supabase Auth
- Video: hls.js for HLS/M3U8 playback
- Hospedagem: aaPanel (Nginx + PM2)

## Where things live

- `artifacts/netplay/` — React frontend app
- `artifacts/api-server/` — Express backend (proxy, Terabox, TMDB, AI routes)
- `artifacts/mockup-sandbox/` — UI component development sandbox
- `lib/db/` — Drizzle schema and database client (MySQL)
- `lib/api-spec/` — OpenAPI spec and Orval codegen config
- `lib/api-zod/` — Shared Zod schemas
- `lib/api-client-react/` — Generated React hooks
- `deploy/` — Arquivos de configuração para deploy no aaPanel

## Architecture decisions

- API server proxies all external calls (TMDB, Terabox) — no API keys exposed to the browser via VITE_ vars for server-side only keys
- Frontend proxies `/api/*` to `localhost:8080` via Vite dev server proxy (em dev)
- Em produção no aaPanel, Nginx na porta 80 faz proxy de `/api/*` para a API na porta 83
- Terabox keep-warm service runs on an interval to keep streams accessible
- hls.js loaded as a separate chunk (`vendor-hls`) to avoid blocking initial load

## Portas

| Ambiente | Serviço | Porta |
|----------|---------|-------|
| Dev (Replit) | Frontend (Vite) | 5000 (mapeado para externo 80) |
| Dev (Replit) | API Server | 8080 |
| Produção (aaPanel) | Frontend (Nginx) | 80 |
| Produção (aaPanel) | API Server | 83 |

## Deploy no aaPanel

Veja `deploy/DEPLOY-AAPANEL.md` para o guia completo.
Arquivos disponíveis em `deploy/`:
- `DEPLOY-AAPANEL.md` — guia passo a passo
- `aaPanel-nginx.conf` — configuração Nginx (porta 80 + proxy para 83)
- `mysql-schema.sql` — script para criar as tabelas no MySQL
- `.env.production.example` — exemplo de variáveis de ambiente

## Product

- Browse and search movies/series with TMDB metadata (posters, synopses, ratings)
- Stream content via Terabox integration with HLS playback
- Admin panel for mass-scanning Terabox folders and auto-detecting season/episode structure
- Watch parties with real-time sync (Socket.IO)
- User profiles and subscription management (Mercado Pago)
- Push notifications via OneSignal

## User preferences

- Portuguese (Brazilian) is the primary language for comments and UI strings
- pnpm only — yarn and npm are blocked via preinstall hook

## Gotchas

- API server must start before the frontend (frontend proxies `/api` to port 8080)
- `PORT` env var is required for the API server (set to 8080 in Replit, 83 in aaPanel production)
- `DATABASE_URL` format for MySQL: `mysql://usuario:senha@host:3306/banco`
- Run `pnpm approve-builds` after fresh installs if firebase/genai build scripts are blocked
- VITE_ prefixed secrets are available at runtime via Replit's secret store and picked up by Vite dev server automatically

## Secrets required

- `DATABASE_URL` — MySQL connection string: `mysql://usuario:senha@host:3306/banco`
- `VITE_SUPABASE_URL` + `VITE_SUPABASE_ANON_KEY` — Supabase auth and database
- `VITE_TMDB_API_KEY` — The Movie Database API
- `VITE_GEMINI_API_KEY` — Google Gemini AI (synopsis translation)
- `TERABOX_PRO_API_KEY`, `TERABOX_V2_API_KEY`, `TERABOX_V3_API_KEY`, `TERABOX_V3_API_SECRET` — Terabox stream resolvers
- `VITE_ONESIGNAL_APP_ID` — Push notifications (optional)
- `VITE_MERCADO_PAGO_PUBLIC_KEY` — Payment checkout (optional)
