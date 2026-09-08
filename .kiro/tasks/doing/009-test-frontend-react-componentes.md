# 009 · test · Testes Unitários para Componentes React

## 🔧 Configuração Inicial (LEIA ANTES DE INICIAR)

### Agent Responsável
**devops** - Este agent deve iniciar a implementação.

### Branch Base
**SEMPRE `ia-main`**

### Worktree
Esta task será implementada em worktree isolado em `.kiro/worktrees/009-test-frontend-react-componentes/`

---

## ⚠️ CHECKLIST DE INÍCIO (OBRIGATÓRIO)

Antes de começar a implementar, o agent devops deve:

- [ ] **Verificar branch atual:** `git branch --show-current`
  - Se não estiver em `ia-main`, **PERGUNTAR** ao usuário se pode trocar
  - Aguardar autorização
  - Após autorização: `git checkout ia-main && git pull origin ia-main`

- [ ] **Mover task para doing:**
  ```bash
  mv .kiro/tasks/009-test-frontend-react-componentes.md .kiro/tasks/doing/
  git add .kiro/tasks/
  git commit -m "move: task 009 para doing"
  git push origin ia-main
  ```

- [ ] **Criar worktree:**
  ```bash
  git worktree add .kiro/worktrees/009-test-frontend-react-componentes -b test/009-test-frontend-react-componentes ia-main
  cd .kiro/worktrees/009-test-frontend-react-componentes
  git branch --show-current  # Confirmar branch correto
  ```

---

## Contexto

O projeto BIA possui **testes unitários apenas no backend** (API Express). O frontend React ainda não possui nenhuma cobertura de testes automatizados. 

A pasta `client/` já possui as dependências necessárias instaladas:
- `@testing-library/react` v16.0.1
- `@testing-library/jest-dom` v6.5.0
- `@testing-library/user-event` v14.5.2

Porém:
- Não existe configuração do Vitest (ambiente de testes para Vite)
- Não existe script `test` no `client/package.json`
- Não existem arquivos de teste (`.test.jsx` ou `.spec.jsx`)

---

## História de Usuário

> **Como** desenvolvedor do projeto BIA,  
> **Quero** ter testes unitários automatizados para os componentes React principais,  
> **Para que** eu possa garantir a qualidade do frontend e evitar regressões ao fazer mudanças.

---

## Critérios de Aceite

### Configuração
- [ ] Vitest está configurado no `client/vite.config.js` com suporte a React Testing Library
- [ ] Existe o script `"test"` no `client/package.json` que executa os testes
- [ ] Existe o script `"test:ui"` no `client/package.json` para UI interativa do Vitest (opcional mas recomendado)
- [ ] As dependências necessárias estão instaladas (`vitest`, `jsdom`, `@vitest/ui`)

### Testes Implementados
- [ ] **AddTask.test.jsx** — testa renderização e interação do formulário de adicionar tarefa
  - Renderiza o formulário corretamente
  - Permite digitar no campo de título
  - Permite selecionar data
  - Permite marcar/desmarcar checkbox "Importante"
  - Chama a função `onAdd` ao submeter o formulário
  - Limpa os campos após submissão

- [ ] **Tasks.test.jsx** — testa renderização da lista de tarefas
  - Renderiza lista de tarefas recebidas via props
  - Exibe mensagem quando não há tarefas (ou testa o componente pai)
  - Renderiza cada Task individual corretamente

- [ ] **Task.test.jsx** — testa o componente individual de tarefa
  - Renderiza título, data e ícone de prioridade
  - Chama função `onDelete` ao clicar no ícone de deletar
  - Chama função `onToggle` ao clicar na tarefa (duplo clique)

### Execução
- [ ] Todos os testes passam ao executar `npm test` dentro da pasta `client/`
- [ ] Os testes rodam no modo watch durante desenvolvimento
- [ ] Os testes não dependem de API real (usar mocks)

---

## Checklist de Implementação — Agent `devops`

### 1. Instalação de Dependências
- [ ] Entrar na pasta `client/`: `cd client/`
- [ ] Instalar Vitest e dependências:
  ```bash
  npm install --save-dev vitest jsdom @vitest/ui
  ```
- [ ] Marcar este item no checklist da task

### 2. Configuração do Vitest
- [ ] Editar `client/vite.config.js` para adicionar configuração de teste:
  ```javascript
  import { defineConfig } from 'vite'
  import react from '@vitejs/plugin-react'

  export default defineConfig({
    plugins: [react()],
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: './src/setupTests.js',
      css: true,
    },
  })
  ```
- [ ] Criar arquivo `client/src/setupTests.js`:
  ```javascript
  import '@testing-library/jest-dom'
  ```
- [ ] Marcar este item no checklist da task

### 3. Adicionar Scripts de Teste
- [ ] Editar `client/package.json` e adicionar:
  ```json
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "server": "json-server --watch db.json --port 5000",
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:run": "vitest run"
  }
  ```
- [ ] Marcar este item no checklist da task

### 4. Criar Testes para AddTask
- [ ] Criar arquivo `client/src/components/AddTask.test.jsx`
- [ ] Implementar pelo menos 4 testes básicos:
  1. Renderiza o formulário
  2. Permite interação com campo de título
  3. Chama `onAdd` ao submeter
  4. Limpa campos após submissão
- [ ] Executar `npm test` e verificar que todos passam
- [ ] Marcar este item no checklist da task

### 5. Criar Testes para Tasks
- [ ] Criar arquivo `client/src/components/Tasks.test.jsx`
- [ ] Implementar pelo menos 2 testes:
  1. Renderiza lista de tarefas
  2. Renderiza cada tarefa corretamente
- [ ] Executar `npm test` e verificar que todos passam
- [ ] Marcar este item no checklist da task

### 6. Criar Testes para Task (componente individual)
- [ ] Criar arquivo `client/src/components/Task.test.jsx`
- [ ] Implementar pelo menos 3 testes:
  1. Renderiza informações da tarefa
  2. Chama `onDelete` ao clicar em deletar
  3. Chama `onToggle` ao interagir com a tarefa
- [ ] Executar `npm test` e verificar que todos passam
- [ ] Marcar este item no checklist da task

### 7. Validação Final
- [ ] Executar `npm test` na pasta `client/` e confirmar que **todos** os testes passam
- [ ] Executar `npm run test:run` para rodar os testes em modo CI (sem watch)
- [ ] Confirmar que não foram introduzidas quebras no código original
- [ ] Verificar que os componentes continuam funcionando normalmente
- [ ] Marcar este item no checklist da task

### 8. Documentação
- [ ] Adicionar seção no README sobre como rodar os testes do frontend
- [ ] Documentar comandos disponíveis (`npm test`, `npm run test:ui`, etc.)
- [ ] Marcar este item no checklist da task

---

## ⚠️ FINALIZAÇÃO DA TASK (OBRIGATÓRIO)

Quando o agent devops concluir a implementação:

### 1. Verificação Final
```bash
# Garantir que está no worktree correto
pwd
# Deve estar em: /caminho/do/projeto/.kiro/worktrees/009-test-frontend-react-componentes

# Verificar branch
git branch --show-current
# Deve mostrar: test/009-test-frontend-react-componentes
```

### 2. Commit e Push Final
```bash
git add .
git commit -m "test: adiciona testes unitários para componentes React do frontend"
git push origin test/009-test-frontend-react-componentes
```

### 3. Voltar para Raiz e Notificar PO
```bash
cd ../../..  # Voltar para raiz do projeto
```

**NOTIFICAR O PO:**
> "Task 009 concluída. Todos os itens do checklist marcados. Branch `test/009-test-frontend-react-componentes` com push realizado. Testes do frontend implementados e passando. Aguardando revisão do PO para encerramento e abertura de PR."

**⚠️ NÃO REMOVER O WORKTREE. Apenas o PO faz isso após o PR ser mergeado.**

---

## Detalhes Técnicos

### Estrutura Esperada
```
client/
├── src/
│   ├── components/
│   │   ├── AddTask.jsx
│   │   ├── AddTask.test.jsx       ← NOVO
│   │   ├── Task.jsx
│   │   ├── Task.test.jsx          ← NOVO
│   │   ├── Tasks.jsx
│   │   └── Tasks.test.jsx         ← NOVO
│   └── setupTests.js              ← NOVO
├── package.json                    ← MODIFICADO (scripts)
└── vite.config.js                  ← MODIFICADO (test config)
```

### Componentes Principais do Frontend
- **AddTask** — Formulário de criar tarefa (título, data, importante)
- **Tasks** — Lista de tarefas
- **Task** — Item individual de tarefa
- **Header** — Cabeçalho da aplicação
- **Footer** — Rodapé
- **About** — Página sobre
- **Version** — Exibe versão da API
- **Analytics** — Dashboard de analytics
- **DebugLogs** — Logs de debug

### Prioridade de Testes
**Começar com:** AddTask, Tasks, Task (componentes core da aplicação)  
**Deixar para depois:** Header, Footer, About (componentes estáticos/simples)

### Exemplo de Teste Básico
```javascript
import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import AddTask from './AddTask'

describe('AddTask', () => {
  it('renderiza o formulário de adicionar tarefa', () => {
    render(<AddTask onAdd={vi.fn()} />)
    expect(screen.getByPlaceholderText(/adicionar tarefa/i)).toBeInTheDocument()
  })
})
```

---

## Definition of Done (DoD)

- [ ] Vitest configurado e funcionando
- [ ] Scripts de teste adicionados ao `package.json`
- [ ] Pelo menos 3 arquivos de teste criados (AddTask, Tasks, Task)
- [ ] Todos os testes passando (`npm test` na pasta `client/`)
- [ ] Componentes originais não foram quebrados
- [ ] Documentação atualizada com instruções de teste
- [ ] Código commitado e pushed no branch `test/009-test-frontend-react-componentes`
- [ ] Todos os itens deste checklist marcados ✅

---

## 🎯 ENCERRAMENTO PELO PO (QUANDO NOTIFICADO)

### 1. Revisão
```bash
# Entrar no worktree para revisar
cd .kiro/worktrees/009-test-frontend-react-componentes

# Entrar na pasta client e rodar os testes
cd client
npm test

# Verificar se todos os testes passam
# Verificar se a aplicação ainda funciona: npm run dev

# Revisar código dos testes criados
```

### 2. Aprovar e Mover para Done
```bash
# Voltar para raiz
cd ../../..

# Mover task para done
mv .kiro/tasks/doing/009-test-frontend-react-componentes.md .kiro/tasks/done/

# Commit e push no ia-main
git checkout ia-main
git add .kiro/tasks/
git commit -m "move: task 009 para done"
git push origin ia-main
```

### 3. Abrir Pull Request
```bash
# ANTES de abrir PR: confirmar que está no branch da feature
cd .kiro/worktrees/009-test-frontend-react-componentes
git branch --show-current
# Deve mostrar: test/009-test-frontend-react-componentes

# Abrir PR contra ia-main
gh pr create --base ia-main --title "009: Testes unitários para componentes React do frontend" --body "Closes task 009

## Resumo
Implementa testes unitários para os componentes principais do frontend React utilizando Vitest e React Testing Library.

## O que foi feito
- ✅ Configuração do Vitest no projeto
- ✅ Testes para AddTask (formulário de criar tarefa)
- ✅ Testes para Tasks (lista de tarefas)
- ✅ Testes para Task (item individual de tarefa)
- ✅ Scripts de teste no package.json
- ✅ Documentação atualizada

## Como testar
\`\`\`bash
cd client
npm test
\`\`\`"
```

### 4. Após PR Mergeado
```bash
# Voltar para raiz
cd ../../..

# Remover worktree
git worktree remove .kiro/worktrees/009-test-frontend-react-componentes

# Ou com força se necessário:
# git worktree remove --force .kiro/worktrees/009-test-frontend-react-componentes

# Limpar registros
git worktree prune

# (Opcional) Deletar branch local
git branch -d test/009-test-frontend-react-componentes

# Notificar conclusão
```

**Notificação final:**
> "Task 009 finalizada. Worktree removido. PR #<número> mergeado com sucesso. Frontend agora possui cobertura de testes unitários."

---

## 📚 Referências
- [Vitest Documentation](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Testing Library Jest-DOM](https://github.com/testing-library/jest-dom)
- [Worktree Workflow](.kiro/docs/worktree-workflow.md)
- [Worktree Steering](.kiro/docs/worktree-steering.md)
- [Task Template](.kiro/docs/task-template-with-worktree.md)

---

## Observações

- **Simplicidade primeiro:** Os testes devem ser simples e diretos, adequados para alunos em aprendizado
- **Não usar mocks complexos:** Manter mocks simples com `vi.fn()` do Vitest
- **Focar no comportamento:** Testar o que o usuário vê e interage, não detalhes de implementação
- **CI futura:** Estes testes podem ser integrados ao GitHub Actions em uma task futura
