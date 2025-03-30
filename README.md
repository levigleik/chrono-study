# Chrono Study

[<img src="dashboard.png" alt="dashboard">](https://chrono-study.vercel.app/)
**Deploy**: [https://chrono-study.vercel.app/](https://chrono-study.vercel.app/)

Este é um projeto desenvolvido em **React** com **Next.js**, focado em gerenciamento de tempo e estudos. Ele utiliza uma estrutura modular e moderna, com suporte a temas (claro e escuro) e componentes reutilizáveis.

## 🚀 Tecnologias e Bibliotecas Utilizadas

- **Next.js**: Framework para renderização do lado do servidor (SSR) e geração de sites estáticos.
- **Tailwind CSS**: Framework de utilitários CSS para estilização rápida e responsiva.
- **zod**: Biblioteca de validação e parsing de esquemas TypeScript-first, utilizada para garantir a integridade dos dados no projeto.
- **react-hook-form**: Biblioteca para gerenciamento de formulários, proporcionando uma experiência simples e eficiente.
- **next-themes**: Gerenciamento de temas (claro e escuro).
- **lucide-react**: Ícones modernos e leves.
- **shadcn/ui**: Biblioteca de componentes reutilizáveis e estilizáveis.
- **sonner**: Utilizado para exibir o alerta de sucesso ao salvar o tempo.
- **next/font**: Selecionado Libre_Baskerville como fonte padrão do projeto.

## 🌟 Funcionalidades

- **Gerenciamento de tempo**: Controle de atividades com um timer.
- **Histórico**: Visualização de atividades anteriores.
- **Tema claro/escuro**: Alternância entre temas com suporte a persistência.

## 📂 Estrutura do Projeto

O projeto segue uma estrutura modular, com componentes organizados por página e reutilizáveis:

```plaintext
├── src
│   ├── app
│   │   ├── (home)
│   │   │   ├── components
│   │   │   │   ├── AddDisciplineSubject.tsx
│   │   │   │   ├── ChronoStudyCard.tsx
│   │   │   │   ├── HistoryCard.tsx
│   │   │   │   ├── HistoryItem.tsx
│   │   │   │   ├── Statistics.tsx
│   │   │   │   ├── StatisticsCard.tsx
│   │   │   │   ├── Theme.tsx
│   │   │   │   └── Timer.tsx
│   │   │   ├── tests
│   │   │   │   ├── AddDisciplineSubject.test.tsx
│   │   │   │   ├── ChronoStudyCard.test.tsx
│   │   │   │   ├── HelperForm.tsx
│   │   │   │   ├── HistoryItem.test.tsx
│   │   │   │   ├── Statistics.test.tsx
│   │   │   │   ├── Theme.test.tsx
│   │   │   │   └── Timer.test.tsx
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx
│   │   │   └── utils.tsx
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── providers.tsx
│   ├── components
│   │   ├── hooks
│   │   │   └── use-interval.tsx
│   │   ├── providers
│   │   │   ├── theme-provider.tsx
│   │   │   └── tooltip-provider.tsx
│   │   └── ui
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── chart.tsx
│   │       ├── dialog.tsx
│   │       ├── dropdown-menu.tsx
│   │       ├── form.tsx
│   │       ├── input.tsx
│   │       ├── label.tsx
│   │       ├── popover.tsx
│   │       ├── resizable.tsx
│   │       ├── select.tsx
│   │       ├── sonner.tsx
│   │       ├── table.tsx
│   │       └── tooltip.tsx
│   ├── lib
│   │   ├── discipline-data.ts
│   │   └── utils.ts
│   ├── store
│   │   ├── disciplineStore.ts
│   │   └── timerStore.ts
│   └── types
│       └── index.ts
├── jest.config.ts
├── jest.setup.ts
└── next.config.ts
```

### Principais Componentes

- **ChronoStudy**: Componente principal para gerenciamento de tempo.
- **Timer**: Subcomponente para controle de contagem regressiva.
- **History**: Exibe o histórico de atividades.
- **Statistics**: Exibe um resumo das disciplinas e temas mais estudados.

## 🛠️ Como executar o projeto

### Pré-requisitos

Certifique-se de ter instalado:

- **Node.js** (versão 16 ou superior)
- **npm** ou **yarn**

### Passos para executar

1. Clone o repositório:
   ```bash
   git clone https://github.com/levigleik/chrono-study.git
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
- test: Realiza testes com Jest e React Testing Library.
