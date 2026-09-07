# Task 004 - Checkbox Importante Marcado por Padrão

## 🔧 Configuração Inicial (LEIA ANTES DE INICIAR)

### Agent Responsável
**dev** - Este agent deve iniciar a implementação.

### Branch Base
**SEMPRE `ia-main`**

### Worktree
Esta task será implementada em worktree isolado em `.kiro/worktrees/004-feat-checkbox-importante-padrao/`

---

## Informações da Task
- **Número:** 004
- **Tipo:** feat
- **Branch:** feature/004-feat-checkbox-importante-padrao
- **Branch Base:** ia-main
- **Worktree:** `.kiro/worktrees/004-feat-checkbox-importante-padrao/`
- **Agent Responsável:** dev

## Descrição
Implementar funcionalidade para que o checkbox "importante" venha marcado por padrão na tela de cadastro de nova tarefa.

## História de Usuário
**Como** usuário do sistema  
**Eu quero** que o checkbox "importante" venha marcado por padrão ao cadastrar uma nova tarefa  
**Para que** eu não precise lembrar de marcar essa opção nas tarefas que considero importantes  

## Critérios de Aceitação
- [ ] O checkbox "importante" deve estar marcado (checked) por padrão na tela de cadastro
- [ ] O usuário pode desmarcar o checkbox se desejar
- [ ] A funcionalidade não deve afetar a edição de tarefas existentes
- [ ] O comportamento deve ser consistente em todos os navegadores

## Observações Técnicas
- Modificar apenas o estado inicial do checkbox no componente de cadastro
- Manter a lógica de salvamento inalterada
- Verificar se existe validação específica para o campo "importante"

---

## ⚠️ CHECKLIST DE INÍCIO (OBRIGATÓRIO)

Antes de começar a implementar, o agent deve:

- [ ] **Verificar branch atual:** `git branch --show-current`
  - Se não estiver em `ia-main`, **PERGUNTAR** ao usuário se pode trocar
  - Aguardar autorização
  - Após autorização: `git checkout ia-main && git pull origin ia-main`

- [ ] **Mover task para doing** (caso ainda não esteja):
  ```bash
  mv .kiro/tasks/004-feat-checkbox-importante-marcado-padrao.md .kiro/tasks/doing/
  git add .kiro/tasks/
  git commit -m "move: task 004 para doing"
  git push origin ia-main
  ```

- [ ] **Criar worktree:**
  ```bash
  git worktree add .kiro/worktrees/004-feat-checkbox-importante-padrao -b feature/004-feat-checkbox-importante-padrao ia-main
  cd .kiro/worktrees/004-feat-checkbox-importante-padrao
  git branch --show-current  # Confirmar branch correto: feature/004-feat-checkbox-importante-padrao
  ```

---

## 📋 CHECKLIST DE IMPLEMENTAÇÃO (dev)

Marque cada item à medida que for concluído:

- [ ] Localizar o componente de cadastro de nova tarefa no frontend
- [ ] Identificar o estado inicial do checkbox "importante"
- [ ] Alterar o estado inicial do checkbox para marcado (checked) por padrão
- [ ] Garantir que o usuário consegue desmarcar o checkbox normalmente
- [ ] Verificar que a edição de tarefas existentes NÃO é afetada
- [ ] Confirmar que a lógica de salvamento permanece inalterada
- [ ] Testar localmente no frontend
- [ ] Validar comportamento consistente (checkbox HTML padrão)
- [ ] Fazer commits frequentes e descritivos durante a implementação

## Definição de Pronto (DoD)
- [ ] Código implementado e testado
- [ ] Funcionalidade validada no frontend
- [ ] Não há regressões em outras funcionalidades
- [ ] Todos os itens do checklist marcados

---

## ⚠️ FINALIZAÇÃO DA TASK (OBRIGATÓRIO)

Quando o agent concluir a implementação:

### 1. Verificação Final
```bash
# Garantir que está no worktree correto
pwd
# Deve estar em: .../bia/.kiro/worktrees/004-feat-checkbox-importante-padrao

# Verificar branch
git branch --show-current
# Deve mostrar: feature/004-feat-checkbox-importante-padrao
```

### 2. Commit e Push Final
```bash
git add .
git commit -m "feat: finaliza implementação da task 004"
git push -u origin feature/004-feat-checkbox-importante-padrao
```

### 3. Voltar para Raiz e Notificar PO
```bash
cd ../../..  # Voltar para raiz do projeto
```

**NOTIFICAR O PO:**
> "Task 004 concluída. Todos os itens do checklist marcados. Branch `feature/004-feat-checkbox-importante-padrao` com push realizado. Aguardando revisão do PO para encerramento e abertura de PR."

**⚠️ NÃO REMOVER O WORKTREE. Apenas o PO faz isso após o PR ser mergeado.**

---

## 🎯 ENCERRAMENTO PELO PO (QUANDO NOTIFICADO)

> **IMPORTANTE:** SEMPRE quem finaliza a task e move ela para `done/` é o PO.

### 1. Revisão
```bash
# Entrar no worktree para revisar
cd .kiro/worktrees/004-feat-checkbox-importante-padrao

# Revisar código, testar funcionalidade
# Verificar se todos os itens estão ✅
```

### 2. Aprovar e Mover para Done
```bash
# Voltar para raiz
cd ../../..

# Mover task para done
mv .kiro/tasks/doing/004-feat-checkbox-importante-marcado-padrao.md .kiro/tasks/done/

# Commit e push no ia-main
git checkout ia-main
git add .kiro/tasks/
git commit -m "move: task 004 para done"
git push origin ia-main
```

### 3. Abrir Pull Request
```bash
# ANTES de abrir PR: confirmar que está no branch da feature
cd .kiro/worktrees/004-feat-checkbox-importante-padrao
git branch --show-current
# Deve mostrar: feature/004-feat-checkbox-importante-padrao

# Abrir PR contra ia-main
gh pr create --base ia-main --title "004: Checkbox importante marcado por padrão" --body "Closes task 004"
```
- O PR deve ser aberto do branch `feature/004-feat-checkbox-importante-padrao` contra `ia-main`
- Nunca abrir PR contra `main` ou qualquer outro branch

### 4. Após PR Mergeado (ETAPA FINAL)
```bash
# Voltar para raiz
cd ../../..

# Remover worktree
git worktree remove .kiro/worktrees/004-feat-checkbox-importante-padrao

# Ou com força se necessário:
# git worktree remove --force .kiro/worktrees/004-feat-checkbox-importante-padrao

# Limpar registros
git worktree prune

# (Opcional) Deletar branch local
git branch -d feature/004-feat-checkbox-importante-padrao
```

**Notificar conclusão:**
> "Task 004 finalizada. Worktree removido. PR #<número> mergeado com sucesso."

---

## 📚 Referências
- [Worktree Workflow](.kiro/docs/worktree-workflow.md)
- [Worktree Steering](.kiro/docs/worktree-steering.md)
- [Task Template](.kiro/docs/task-template-with-worktree.md)
