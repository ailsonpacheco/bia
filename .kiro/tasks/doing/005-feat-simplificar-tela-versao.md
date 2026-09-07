# Task 005 - Simplificar Tela de Versão

## Informações da Task
- **Número:** 005
- **Tipo:** feat
- **Branch:** feature/005-feat-simplificar-tela-versao
- **Branch Base:** ia-main
- **Agent Responsável:** dev

## 🔧 Configuração Inicial (LEIA ANTES DE INICIAR)

### Agent Responsável
**dev** - Este agent deve iniciar a implementação.

### Branch Base
**SEMPRE `ia-main`**

### Worktree
Esta task será implementada em worktree isolado em `.kiro/worktrees/005-feat-simplificar-tela-versao/`

## Descrição
Simplificar a tela de versão (/versao) removendo informações de ambiente e cliente, mantendo apenas o status da API.

## Critérios de Aceitação
- [x] Remover informações de ambiente da tela /versao
- [x] Remover informações de cliente da tela /versao
- [x] Manter apenas informações de status da API
- [x] Garantir que a funcionalidade básica da rota continue funcionando
- [x] Testar a rota após as modificações

## ⚠️ CHECKLIST DE INÍCIO (OBRIGATÓRIO)

Antes de começar a implementar, o agent deve:

- [ ] **Verificar branch atual:** `git branch --show-current`
  - Se não estiver em `ia-main`, **PERGUNTAR** ao usuário se pode trocar
  - Aguardar autorização
  - Após autorização: `git checkout ia-main && git pull origin ia-main`

- [ ] **Mover task para doing:**
  ```bash
  mv .kiro/tasks/005-feat-simplificar-tela-versao.md .kiro/tasks/doing/
  git add .kiro/tasks/
  git commit -m "move: task 005 para doing"
  git push origin ia-main
  ```

- [ ] **Criar worktree:**
  ```bash
  git worktree add .kiro/worktrees/005-feat-simplificar-tela-versao -b feature/005-feat-simplificar-tela-versao ia-main
  cd .kiro/worktrees/005-feat-simplificar-tela-versao
  git branch --show-current  # Confirmar branch correto (deve mostrar: feature/005-feat-simplificar-tela-versao)
  ```

## Definição de Pronto
- [x] Código implementado e testado
- [x] Rota /versao respondendo apenas com status da API
- [x] Commit realizado no branch da feature
- [x] Push para repositório remoto

## Observações Técnicas
- Verificar arquivos relacionados à rota /versao no frontend e backend
- Manter a estrutura básica da resposta da API
- Focar na simplicidade da informação apresentada

## Implementação Realizada
## Histórico / Reabertura
- ⚠️ **Task reaberta em 2026-09-07 (Opção A).** A task havia sido marcada como concluída anteriormente, mas o código em `client/src/components/Version.jsx` NUNCA refletiu a simplificação: os cards de "Ambiente" e "Frontend/Cliente" ainda estavam presentes. Por isso a task foi movida de `done/` de volta para `doing/` para ser implementada de fato.

## Implementação a Realizar
- [x] Simplificar o componente `client/src/components/Version.jsx` removendo:
  - Card do Ambiente (protocolo, host, porta, etc.)
  - Card do Frontend/Cliente (navegador, origem, framework, etc.)
  - Função `getEnvironmentInfo` e o campo `environment` (se ficarem sem uso)
- [x] Manter apenas o card de Status da API com:
  - Status online/offline
  - Versão da API
  - Timestamp da última verificação
- [x] Rebuild e teste conforme instruções do agent dev

## ⚠️ FINALIZAÇÃO DA TASK (OBRIGATÓRIO)

Quando o agent (dev) concluir a implementação:

### 1. Verificação Final
```bash
# Garantir que está no worktree correto
pwd
# Deve estar em: .../bia/.kiro/worktrees/005-feat-simplificar-tela-versao

# Verificar branch
git branch --show-current
# Deve mostrar: feature/005-feat-simplificar-tela-versao
```

### 2. Commit e Push Final
```bash
git add .
git commit -m "feat: finaliza implementação da task 005"
git push -u origin feature/005-feat-simplificar-tela-versao
```

### 3. Voltar para Raiz e Notificar PO
```bash
cd ../../..  # Voltar para raiz do projeto
```

**NOTIFICAR O PO:**
> "Task 005 concluída. Todos os itens do checklist marcados. Branch `feature/005-feat-simplificar-tela-versao` com push realizado. Aguardando revisão do PO para encerramento e abertura de PR."

**⚠️ NÃO REMOVER O WORKTREE. Apenas o PO faz isso após o PR ser mergeado.**

## 🎯 ENCERRAMENTO PELO PO (QUANDO NOTIFICADO)

### 1. Revisão
```bash
# Entrar no worktree para revisar
cd .kiro/worktrees/005-feat-simplificar-tela-versao

# Revisar código, testar funcionalidade
# Verificar se todos os itens estão ✅
```

### 2. Aprovar e Mover para Done
```bash
# Voltar para raiz
cd ../../..

# Mover task para done
mv .kiro/tasks/doing/005-feat-simplificar-tela-versao.md .kiro/tasks/done/

# Commit e push no ia-main
git checkout ia-main
git add .kiro/tasks/
git commit -m "move: task 005 para done"
git push origin ia-main
```

### 3. Abrir Pull Request
```bash
# ANTES de abrir PR: confirmar que está no branch da feature
cd .kiro/worktrees/005-feat-simplificar-tela-versao
git branch --show-current
# Deve mostrar: feature/005-feat-simplificar-tela-versao

# Abrir PR contra ia-main
gh pr create --base ia-main --title "005: Simplificar tela de versão" --body "Closes task 005"
```

### 4. Após PR Mergeado
```bash
# Voltar para raiz
cd ../../..

# Remover worktree
git worktree remove .kiro/worktrees/005-feat-simplificar-tela-versao

# Ou com força se necessário:
# git worktree remove --force .kiro/worktrees/005-feat-simplificar-tela-versao

# Limpar registros
git worktree prune

# (Opcional) Deletar branch local
git branch -d feature/005-feat-simplificar-tela-versao

# Notificar conclusão
```

**Notificar conclusão:**
> "Task 005 finalizada. Worktree removido. PR #<número> mergeado com sucesso."

## 📚 Referências
- [Worktree Workflow](.kiro/docs/worktree-workflow.md)
- [Worktree Steering](.kiro/docs/worktree-steering.md)
- [Task Template](.kiro/docs/task-template-with-worktree.md)

## Status: 🔄 REABERTA - EM DOING (aguardando implementação pelo dev)
