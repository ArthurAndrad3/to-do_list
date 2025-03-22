# To-Do List Application

Este é um projeto simples de lista de tarefas (To-Do List) desenvolvido com React e TypeScript. A aplicação permite adicionar, concluir e excluir tarefas, além de oferecer filtros para exibir tarefas por palavra-chave e por status (todos, concluídos ou pendentes). As tarefas são persistidas no `localStorage` do navegador.

## Funcionalidades

- **Adicionar Tarefa:** Insira uma nova tarefa pelo campo de texto.
- **Marcar Tarefa como Concluída:** Alterne o estado de uma tarefa para concluída ou pendente.
- **Excluir Tarefa:** Remova tarefas da lista.
- **Filtrar Tarefas:** Filtre por palavra-chave e por status (todos, concluídos ou pendentes).
- **Persistência:** As tarefas são salvas automaticamente no `localStorage`, mantendo os dados mesmo após recarregar a página.

## Tecnologias Utilizadas

- React (com TypeScript)
- CSS
- `lucide-react` (para ícones)
- `localStorage`

## Pré-requisitos

Certifique-se de ter instalado:

- [Node.js](https://nodejs.org/) (versão LTS recomendada)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)

## Como Executar a Aplicação

### 1. Clonar o Repositório

Abra seu terminal e execute:

```bash
git clone https://github.com/ArthurAndrad3/to-do-list.git
```

### 2. Navegar até o Diretório do Projeto

```bash
cd to-do-list
```

### 3.Instalar as Dependências

Utilize o comando:

```bash
npm install
```

Ou, se preferir usar o yarn:
Utilize o comando:

```bash
yarn
```

### 4. Iniciar a Aplicação

Depois da instalação, inicie o servidor de desenvolvimento:

```bash
npm run dev
```

Ou, se estiver usando yarn:

```bash
yarn run dev
```

Abra seu navegador e acesse http://localhost:5173 para visualizar a aplicação.

## Estrutura do Projeto

```bash
/src
  /components
    /ErrorMensage    # Componente com as mensagens de erro da verificação da validação de entrada
    /Header          # Componente do cabeçalho com filtros e campo de busca
    /To-doList       # Componente principal da lista de tarefas
      /TaskCard      # Componente para exibição individual de cada tarefa
  /pages
    App.tsx
  index.tsx
```
