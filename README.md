# Chrono Study

Este é um projeto desenvolvido em **React** com **Next.js**, focado em gerenciamento de tempo e estudos. Ele utiliza uma estrutura modular e moderna, com suporte a temas (claro e escuro) e componentes reutilizáveis.

## 🚀 Tecnologias e Bibliotecas Utilizadas

- **React**: Biblioteca para construção de interfaces de usuário.
- **Next.js**: Framework para renderização do lado do servidor (SSR) e geração de sites estáticos.
- **Tailwind CSS**: Framework de utilitários CSS para estilização rápida e responsiva.
- **next-themes**: Gerenciamento de temas (claro e escuro).
- **lucide-react**: Ícones modernos e leves.
- **TypeScript**: Superset do JavaScript para tipagem estática.
- **ESLint e Prettier**: Ferramentas para linting e formatação de código.

## 📂 Estrutura do Projeto

O projeto segue uma estrutura modular, com componentes organizados por página e reutilizáveis:

```plaintext
src
├── app
│   ├── (home)
│   │   ├── components
│   │   │   ├── ChronoStudyCard.tsx
│   │   │   ├── HistoryCard.tsx
│   │   │   ├── HistoryItem.tsx
│   │   │   ├── StatisticsCard.tsx
│   │   │   └── Timer.tsx
│   │   ├── types
│   │   │   └── index.ts
│   │   ├── utils
│   │   │   └── index.ts
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── globals.css
│   ├── layout.tsx
│   └── providers.tsx
├── components
│   ├── providers
│   │   └── theme-provider.tsx
│   ├── ui
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── chart.tsx
│   │   ├── dialog.tsx
│   │   ├── dropdown-menu.tsx
│   │   ├── form.tsx
│   │   ├── label.tsx
│   │   ├── resizable.tsx
│   │   ├── select.tsx
│   │   ├── table.tsx
│   │   └── tooltip.tsx
│   └── theme.tsx
├── lib
│   ├── discipline-data.ts
│   ├── use-interval.tsx
│   └── utils.ts
├── store
│   └── timerStore.ts
└── types
│   └── index.ts
└── next.config.ts
```

### Principais Componentes

- **ChronoStudy**: Componente principal para gerenciamento de tempo.
- **Timer**: Subcomponente para controle de contagem regressiva.
- **History**: Exibe o histórico de atividades.
- **Statistics**: Exibe um resumo das disciplinas e temas mais estudados.

## 🛠️ Como Rodar o Projeto

### Pré-requisitos

Certifique-se de ter instalado:

- **Node.js** (versão 16 ou superior)
- **npm** ou **yarn**

### Passos para rodar

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/chrono-study.git
   cd chrono-study
   ```
2. Instale as dependências:

   ```
   npm install
   # ou
   yarn install
   ```

3. Inicie o servidor de desenvolvimento:

   ```
   npm run dev
   # ou
   yarn dev
   ```

4. Abra o navegador e acesse:
   ```
   http://localhost:3000
   ```

## 📦 Scripts Disponíveis

- dev: Inicia o servidor de desenvolvimento.
- build: Gera a build de produção.
- start: Inicia o servidor em modo de produção.
- lint: Verifica o código com ESLint.

## 🌟 Funcionalidades

- Gerenciamento de tempo: Controle de atividades com um timer.
- Histórico: Visualização de atividades anteriores.
- Tema claro/escuro: Alternância entre temas com suporte a persistência.
