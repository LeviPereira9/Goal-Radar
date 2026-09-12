## Goal Radar

O **Goal Radar** é uma aplicação web que fornece dados estatísticos de campeonatos de futebol para apoiar decisões informadas em apostas esportivas. O foco inicial é apresentar a probabilidade de ocorrência de gols em partidas, calculada pelo back-end (FStats API) com base em distribuição estatística sobre o histórico de gols de cada competição.

## Acesso à aplicação em produção
 
A aplicação está disponível publicamente em: **https://goal-radar-rho.vercel.app/**
 
O back-end (FStats API) está hospedado no Render, em um plano gratuito que hiberna a aplicação após um período de inatividade. A primeira requisição feita após um tempo sem uso pode demorar de alguns segundos até cerca de um minuto para responder, enquanto o serviço é reativado. Requisições subsequentes voltam ao tempo de resposta normal. Esse comportamento é esperado e não indica falha da aplicação.
 
## Como executar o projeto localmente
 
O Goal Radar é composto por dois repositórios independentes: este front-end e a [FStats API](https://github.com/LeviPereira9/fstats), que deve estar em execução para que a aplicação funcione.
 
### 1. Executando o back-end (FStats API)
 
O back-end utiliza Docker para facilitar a execução do ambiente completo (incluindo banco de dados MySQL e Redis).
 
```bash
git clone https://github.com/LeviPereira9/fstats.git
cd fstats
```
 
Configure as variáveis de ambiente com base no arquivo `.env.example` do repositório (crie um `.env` preenchido, ou configure diretamente nos arquivos `.properties` para execução local).
 
```bash
docker-compose up -d
```
 
A API estará disponível em `http://localhost:8080`, com a documentação Swagger em `http://localhost:8080/swagger-ui/index.html`.
 
Consulte o [README](https://github.com/LeviPereira9/fstats.git) do repositório da FStats API para detalhes completos de configuração, arquitetura em camadas e padrão de respostas.
 
### 2. Executando o front-end (Goal Radar)
 
Com o back-end em execução, clone e configure o front-end:
 
```bash
git clone <url-deste-repositório>
cd goal-radar
npm install
```
 
Crie um arquivo `.env` na raiz do projeto com a URL da API:
 
```bash
VITE_API_BASE_URL=http://localhost:8080
```
 
Essa variável é lida em `src/shared/lib/http/config.ts`, via `import.meta.env.VITE_API_BASE_URL`, e define a base de todas as chamadas HTTP feitas pelo cliente da aplicação.
 
Inicie o servidor de desenvolvimento:
 
```bash
npm run dev
```
 
A aplicação estará disponível em `http://localhost:5173` (porta padrão do Vite).
 
### 3. Build de produção
 
```bash
npm run build
```
 
Os arquivos otimizados são gerados na pasta `dist/`, prontos para deploy em qualquer serviço de hospedagem de conteúdo estático (Vercel, Netlify, etc.).

## Stack Técnica

| Camada                 | Tecnologia            | Motivo                                                               |
| :--------------------- | :-------------------- | :------------------------------------------------------------------- |
| **Build tool**         | Vite                  | Build rápido, HMR instantâneo, sem necessidade de SSR                |
| **Framework**          | React + TypeScript    | Tipagem estática em todo o projeto                                   |
| **Roteamento**         | React Router          | Padrão de mercado para SPAs                                          |
| **Estado de servidor** | TanStack Query        | Cache, dedupe de requisições, gestão de loading/erro                 |
| **Cliente HTTP**       | fetch nativo          | Evita dependência extra; controle total sobre o envelope de resposta |
| **Formulários**        | React Hook Form + Zod | Validação declarativa, schemas como fonte de tipos TS                |
| **Estilização**        | CSS Modules           | Escopo automático por componente, zero dependência extra             |

###  Autenticação
A autenticação é feita via JWT armazenado em cookie `httpOnly`. Isso significa que o front-end nunca tem acesso direto ao token (usa `credentials: 'include'`). O "usuário logado" é sempre resolvido consultando o endpoint `GET /me`, nunca decodificado localmente.

---

##  Sistema de Permissões (RBAC)

O sistema possui quatro níveis de acesso, organizados hierarquicamente:

| Nível | Role | Descrição |
| :--- | :--- | :--- |
| 1 | `USER` | Usuário comum, acesso básico |
| 2 | `MOD` | Moderador |
| 3 | `ADMIN` | Administrador |
| 4 | `SUPER_ADMIN` | Administrador máximo |
*Nota: Um usuário com nível superior herda automaticamente as permissões dos níveis abaixo.*

### Categorias de Proteção de Rota

- **Pública:** Acessível sem estar autenticado.
- **Somente convidado (guest only):** Só acessível por quem não está logado (redireciona para Home se logado).
- **Autenticado:** Qualquer usuário logado, independente da role.
- **Role mínima:** Exige que o usuário tenha uma role igual ou superior (ex: `MOD+`, `ADMIN+`).
- **Self only:** Apenas o próprio usuário (dono da conta) pode acessar.
- **Self or elevated:** O próprio usuário ou qualquer usuário com privilégio elevado (`MOD+`).
- **Regra especial (alterar cargo):** Um usuário só pode alterar o cargo de outro se seu nível hierárquico for estritamente maior que o nível da role atual do alvo e da nova role sendo atribuída.

---

## Mapa de Rotas do Front-end

### 🔑 Autenticação (Públicas / Somente Convidado)
| Rota                        | Tela                | Acesso            | Descrição                                    |
| :-------------------------- | :------------------ | :---------------- | :------------------------------------------- |
| `/login`                    | Login               | Somente convidado | Autenticação via usuário/e-mail + senha      |
| `/register`                 | Registro            | Somente convidado | Criação de conta (exige maioridade, 18 anos) |
| `/forgot-password`          | Esqueci minha senha | Somente convidado | Solicita código de redefinição por e-mail    |
| `/reset-password/:username` | Redefinir senha     | Somente convidado | Informa código recebido + nova senha         |
*(Todas redirecionam para `/` se já autenticado)*

### 🏠 Núcleo da Aplicação (Autenticado)
| Rota | Tela | Acesso | Descrição |
| :--- | :--- | :--- | :--- |
| `/` | Home | Autenticado | Apresentação do produto e avisos |
| `/competitions` | Lista de competições | Autenticado | `MOD+` veem inativas; `USER` apenas ativas |
| `/competitions/:code` | Detalhe da competição | Autenticado | Partidas, probabilidades, favoritos, classificação e médias |
| `/favorites` | Meus favoritos | Autenticado (self implícito) | Competições favoritadas pelo próprio usuário |
| `/search` | Buscar usuários | Autenticado | Busca paginada de usuários por nome |
| `/verify-account` | Verificar conta | Autenticado | Confirmação de e-mail via código |

### 👤 Perfil de Usuário
| Rota | Tela | Acesso | Descrição |
| :--- | :--- | :--- | :--- |
| `/users/:username` | Perfil | Autenticado | Comportamento duplo: resumo p/ terceiros; completo p/ self ou `MOD+` |
| `.../password` | Alterar senha | Self only | Troca de senha e invalidação de todas as sessões |
| `.../email` | Alterar e-mail | Self only | Requer conta verificada. Fluxo em duas etapas |
| `.../delete` | Desativar conta | Self or elevated | Soft delete da conta |

### ⚙️ Administração
| Rota | Tela | Acesso mínimo | Descrição |
| :--- | :--- | :--- | :--- |
| `/admin` | Painel administrativo | `MOD` | Hub com atalhos para áreas de admin |
| `/admin/roles` | Gerenciar cargos | `MOD` | Altera cargo (respeitando regra especial de hierarquia) |
| `/admin/competitions` | Competições acompanhadas| `ADMIN` | Adiciona ou ativa/desativa competições (soft toggle) |
| `/admin/sync` | Sincronização | `SUPER_ADMIN` | Dispara sincronização manual de dados via API |

###  Páginas de Estado
- `/forbidden` - Acesso negado (exibida por falta de permissão).
- `*` - Não encontrada (página 404).

---

##  Guia Rápido de Navegação

1. **Criar uma conta:** Vá em `/register`. A idade mínima de 18 anos é validada antes do envio. O login acontece automaticamente após o registro.
2. **Verificar E-mail:** Observe o aviso de e-mail não verificado no topo. Clique para ir a `/verify-account` e inserir o código.
3. **Explorar Competições:** Acesse `/competitions` e abra um campeonato. Observe:
   - As probabilidades de gols exibidas via barra de intensidade ("incidência histórica").
   - O aviso de falta de dados em rodadas iniciais.
   - Os painéis laterais de "Ver classificação" e "Ver médias".
   - O botão de favoritar e sua listagem na barra abaixo do cabeçalho.
4. **Gerenciar Perfil:** Clique no nome de usuário no topo para editar dados, trocar senha, e-mail ou desativar a conta.
5. **Visão Admin:** Usando uma conta `MOD` ou superior, acesse `/admin` para demonstrar a gestão de cargos (`/admin/roles`) e sincronização.

---

##  Estrutura do Código

O projeto segue organização por *feature*, não por tipo de arquivo técnico:

```text
src/
├── app/              → roteamento, layout geral, header, footer
├── features/
│   ├── auth/         → login, registro, verificação, recuperação, guards
│   ├── users/        → perfil, senha, e-mail, desativação, busca
│   ├── competitions/ → listagem, detalhe, partidas, classificação, médias
│   ├── favorites/    → favoritar/desfavoritar competições
│   └── admin/        → gerenciar cargos, competições acompanhadas, sync
└── shared/           → componentes UI, cliente HTTP, RBAC, tipos, estilos globais