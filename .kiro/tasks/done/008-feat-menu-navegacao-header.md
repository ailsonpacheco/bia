# Task 008 - Menu de Navegação no Header (Tarefas / Versão / Sobre)

## 🔧 Configuração Inicial (LEIA ANTES DE INICIAR)

### Agent Responsável
**dev** - Este agent deve iniciar a implementação.

### Branch Base
**SEMPRE `ia-main`**

### Worktree
Esta task será implementada em worktree isolado em `.kiro/worktrees/008-feat-menu-navegacao-header/`

---

## Informações da Task
- **Número:** 008
- **Tipo:** feat
- **Branch:** feature/008-feat-menu-navegacao-header
- **Branch Base:** ia-main
- **Worktree:** `.kiro/worktrees/008-feat-menu-navegacao-header/`
- **Agent Responsável:** dev

## Descrição
Adicionar uma barra de navegação horizontal no `Header`, posicionada **logo abaixo do título "BIA 2026"**, com os itens de menu na seguinte ordem: **Tarefas**, **Versão** e **Sobre**. Atualmente essas páginas existem como rotas, mas não há um menu visível que as apresente ao usuário de forma consistente.

## História de Usuário
**Como** usuário do sistema
**Eu quero** ver um menu de navegação com Tarefas, Versão e Sobre logo abaixo do título
**Para que** eu consiga navegar facilmente entre as principais telas da aplicação

## Contexto Técnico (levantado pelo PO)
- O menu **não existe** hoje. As rotas já estão definidas em `client/src/components/../App.jsx`:
  - Tarefas → `/`
  - Versão → `/versao`
  - Sobre → `/about`
- O `Header` (`client/src/components/Header.jsx`) hoje contém apenas: `<h1>{title}</h1>`, o componente `VersionInfo` (ícone de status) e o botão de tema. **Não há menu.**
- Acessos atuais e dispersos (que NÃO devem ser removidos nesta task):
  - "Versão": ícone de status (🟢/🔴/🟡) no `VersionInfo` dentro do Header
  - "Sobre": link "Sobre a BIA" no `Footer`
- O CSS **já possui** classes preparadas para navegação, ainda não utilizadas no JSX:
  - `.header-content` (linha ~1113 de `index.css`)
  - `.header-nav` (linha ~1117 de `index.css`, com `flex-wrap: wrap` no responsivo)
- O projeto já usa `react-router-dom` (usar `NavLink` para marcar o item ativo).

## Critérios de Aceitação
- [x] Existe um menu de navegação horizontal **abaixo do título** "BIA 2026" no Header
- [x] O menu contém os itens **na ordem**: Tarefas, Versão, Sobre
- [x] Tarefas navega para `/`, Versão para `/versao`, Sobre para `/about`
- [x] Os itens seguem a **mesma distribuição/estilo** entre si (consistência visual)
- [x] O item da rota atual é destacado como ativo (usar `NavLink` + classe `active`)
- [x] O layout permanece responsivo (mobile: menu não quebra o cabeçalho)
- [x] Os acessos existentes (ícone de status e link "Sobre a BIA" no Footer) **continuam funcionando** (não remover)
- [x] Não há regressão nas rotas ou no restante do Header (botão de tema, VersionInfo)

## Observações Técnicas
- Reaproveitar as classes CSS já existentes `.header-content` e `.header-nav`.
- Usar `NavLink` do `react-router-dom` (já é dependência) para obter o estado ativo automaticamente.
- Estrutura sugerida do Header:
  ```jsx
  <header className="header">
    <div className="header-content">
      <h1>{title}</h1>
      <nav className="header-nav">
        <NavLink to="/" end>Tarefas</NavLink>
        <NavLink to="/versao">Versão</NavLink>
        <NavLink to="/about">Sobre</NavLink>
      </nav>
    </div>
    <div className="header-controls"> ... (VersionInfo + botão tema, inalterado) ... </div>
  </header>
  ```
  Observação: usar `end` no NavLink de "Tarefas" (`/`) para não ficar sempre ativo.
- Adicionar/ajustar o CSS de `.header-nav a` e do estado `.active` mantendo a identidade visual atual.
- **Não** alterar `App.jsx` (as rotas já existem). Escopo é apenas o Header + CSS.

---

## ⚠️ CHECKLIST DE INÍCIO (OBRIGATÓRIO)

Antes de começar a implementar, o agent deve:

- [x] **Verificar branch atual:** `git branch --show-current`
  - Se não estiver em `ia-main`, **PERGUNTAR** ao usuário se pode trocar
  - Aguardar autorização

- [x] **Mover task para doing** (caso ainda não esteja):
  ```bash
  # (esta task já é criada diretamente em doing/)
  git add .kiro/tasks/
  git commit -m "chore: cria task 008 (menu de navegacao no header)"
  git push fork ia-main
  ```

- [x] **Criar worktree:**
  ```bash
  git worktree add .kiro/worktrees/008-feat-menu-navegacao-header -b feature/008-feat-menu-navegacao-header ia-main
  cd .kiro/worktrees/008-feat-menu-navegacao-header
  git branch --show-current  # Confirmar: feature/008-feat-menu-navegacao-header
  ```

---

## 📋 CHECKLIST DE IMPLEMENTAÇÃO (dev)

- [x] Importar `NavLink` de `react-router-dom` no `Header.jsx`
- [x] Envolver o `<h1>` em `.header-content` e adicionar `<nav className="header-nav">` abaixo do título
- [x] Adicionar os itens Tarefas (`/`, com `end`), Versão (`/versao`), Sobre (`/about`)
- [x] Estilizar `.header-nav a` e o estado `.active` no `index.css` (consistência entre itens)
- [x] Garantir responsividade (validar em largura mobile)
- [x] Confirmar que VersionInfo, botão de tema e link do Footer continuam funcionando
- [x] Rodar `npm run build` no client e validar sem erros
- [x] Testar navegação localmente (`npm run dev`) nas três rotas
- [x] **Rebuild Docker no worktree** (OBRIGATÓRIO, mesmo processo da task 004):
  ```bash
  # a partir da RAIZ do worktree 008
  docker compose down
  docker compose build server
  docker compose up -d
  # testar em http://localhost:3001  (menu Tarefas/Versão/Sobre no topo)
  ```
- [x] Fazer commits frequentes e descritivos

## Definição de Pronto (DoD)
- [x] Código implementado e testado
- [x] Menu visível abaixo do título com Tarefas/Versão/Sobre funcionando
- [x] Layout responsivo, sem regressões
- [x] Todos os itens do checklist marcados

---

## ⚠️ FINALIZAÇÃO DA TASK (OBRIGATÓRIO)

### 1. Verificação Final
```bash
pwd   # .../bia/.kiro/worktrees/008-feat-menu-navegacao-header
git branch --show-current   # feature/008-feat-menu-navegacao-header
```

### 2. Commit e Push Final
```bash
git add .
git commit -m "feat: adiciona menu de navegacao no header (task 008)"
git push -u fork feature/008-feat-menu-navegacao-header
```

### 3. Voltar para Raiz e Notificar PO
```bash
cd ../../..
```
**NOTIFICAR O PO:**
> "Task 008 concluída. Menu de navegação adicionado no Header (Tarefas/Versão/Sobre). Branch `feature/008-feat-menu-navegacao-header` com push realizado. Aguardando revisão do PO para PR."

**⚠️ NÃO REMOVER O WORKTREE. Apenas o PO faz isso após o PR ser mergeado.**

---

## 🎯 ENCERRAMENTO PELO PO (QUANDO NOTIFICADO)

> **IMPORTANTE:** SEMPRE quem finaliza a task e move para `done/` é o PO.

### 1. Revisão
```bash
cd .kiro/worktrees/008-feat-menu-navegacao-header
# Revisar código, rodar build e testar navegação
```

### 2. Aprovar e Mover para Done
```bash
cd ../../..
mv .kiro/tasks/doing/008-feat-menu-navegacao-header.md .kiro/tasks/done/
git checkout ia-main
git add .kiro/tasks/
git commit -m "move: task 008 para done"
git push fork ia-main
```

### 3. Abrir Pull Request
```bash
cd .kiro/worktrees/008-feat-menu-navegacao-header
git branch --show-current   # feature/008-feat-menu-navegacao-header
gh pr create --repo ailsonpacheco/bia --base ia-main \
  --head feature/008-feat-menu-navegacao-header \
  --title "008: Menu de navegação no Header (Tarefas/Versão/Sobre)" \
  --body "Closes task 008"
```
- PR aberto do branch `feature/008-feat-menu-navegacao-header` contra `ia-main`.

### 4. Após PR Mergeado (ETAPA FINAL)
```bash
cd ../../..
git worktree remove .kiro/worktrees/008-feat-menu-navegacao-header
git worktree prune
git branch -d feature/008-feat-menu-navegacao-header
```

---

## 📚 Referências
- [Worktree Workflow](.kiro/docs/worktree-workflow.md)
- [Worktree Steering](.kiro/docs/worktree-steering.md)
- [Task Template](.kiro/docs/task-template-with-worktree.md)

---

## 🎯 Encerramento pelo PO (2026-09-07)
- Código revisado: `Header.jsx` com menu `NavLink` (Tarefas/Versão/Sobre), `.header-content` e `.header-nav`; `index.css` com estilos e estado `.active`. VersionInfo, botão de tema e Footer preservados.
- Build validado: `✓ built in 8.30s`, sem erros.
- Execução em Docker validada anteriormente (porta 3001): menu visível abaixo do título.
- Branch `feature/008-feat-menu-navegacao-header` recriado a partir do `ia-main` atual e limpo (apenas `Header.jsx` + `index.css`; lockfiles e arquivos de task defasados removidos). Force-push realizado (commit `cc68a6c`).
- Task movida para `done/`.

## Status: ✅ TASK ENCERRADA PELO PO
