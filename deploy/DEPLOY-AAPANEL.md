# Deploy NetPlay no aaPanel

## Pré-requisitos no servidor

- aaPanel instalado
- Node.js 20+ (instale via aaPanel → App Store → Node.js)
- MySQL 8.0+ (instale via aaPanel → App Store → MySQL)
- Nginx (instale via aaPanel → App Store → Nginx)
- pnpm: `npm install -g pnpm`
- PM2: `npm install -g pm2`

---

## 1. Criar o banco de dados MySQL

No aaPanel → Banco de Dados → MySQL → Adicionar banco:
- Nome: `netplay_db`
- Usuário: `netplay_user`
- Senha: `(defina uma senha forte)`

Em seguida execute o schema:
```bash
mysql -u netplay_user -p netplay_db < /www/wwwroot/netplay/deploy/mysql-schema.sql
```

---

## 2. Clonar/transferir o projeto

```bash
cd /www/wwwroot
git clone https://github.com/SEU_USUARIO/netplay.git netplay
cd netplay
```

---

## 3. Configurar variáveis de ambiente

```bash
cp deploy/.env.production.example .env
nano .env   # Preencha com seus dados reais
```

---

## 4. Instalar dependências e fazer o build

```bash
pnpm install
pnpm run build
```

---

## 5. Iniciar a API na porta 83

```bash
# Carrega o .env e inicia com PM2
PORT=83 pm2 start artifacts/api-server/dist/index.mjs \
  --name netplay-api \
  --env production
pm2 save
pm2 startup
```

---

## 6. Configurar o Nginx no aaPanel

No aaPanel → Sites → Adicionar site:
- Domínio: `seu-dominio.com`
- Raiz: `/www/wwwroot/netplay/artifacts/netplay/dist/public`

Depois, edite o config do Nginx (aaPanel → Sites → Configurações → Config):
Cole o conteúdo de `deploy/aaPanel-nginx.conf`.

Recarregue o Nginx:
```bash
nginx -t && nginx -s reload
```

---

## 7. Verificar

- Frontend: `http://seu-dominio.com` → porta 80
- API: `http://seu-dominio.com/api/health` → proxied da porta 83

---

## Portas utilizadas

| Serviço | Porta interna | Acesso externo |
|---------|--------------|----------------|
| Frontend (Nginx) | — | 80 |
| API Node.js | 83 | via proxy /api → 83 |
| MySQL | 3306 | interno apenas |
