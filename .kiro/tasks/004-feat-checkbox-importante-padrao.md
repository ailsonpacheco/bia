# Task 004 - Marcar Checkbox "Importante" como Padrão

## 🔧 Configuração Inicial (LEIA ANTES DE INICIAR)

### Agent Responsável
**dev** - Este agent deve iniciar a implementação.

### Branch Base
**SEMPRE `ia-main`**

### Worktree
Esta task será implementada em worktree isolado em `.kiro/worktrees/004-feat-checkbox-importante-padrao/`

---

## ⚠️ CHECKLIST DE INÍCIO (OBRIGATÓRIO)

Antes de começar a implementar, o agent deve:

- [ ] **Verificar branch atual:** `git branch --show-current`
  - Se não estiver em `ia-main`, **PERGUNTAR** ao usuário se pode trocar
  - Aguardar autorização
  - Após autorização: `git checkout ia-main && git pull origin ia-main`

- [ ] **Mover task para doing:**
  bash
 mv .kiro/tasks/004-feat-checkbox-importante-padrao.md .kiro/tasks/doing/
 git add .kiro/tasks/
 git commit -m "move: task 004 para doing"
 git push origin ia-main
 

- [ ] **Criar worktree:**
  bash
 git worktree add .kiro/worktrees/004-feat-checkbox-importante-padrao -b feature/004-feat-checkbox-importante-padrao ia-main
 cd .kiro/worktrees/004-feat-checkbox-importante-padrao
 git branch --show-current  # Confirmar branch correto
 


---

## 📋 Descrição

Alterar o comportamento padrão do checkbox "Importante" no formulário de cadastro de tarefas para que ele venha **marcado por padrão** quando o usuário acessa a tela.

**Contexto Importante:** 
- O campo 
importante
 é um boolean no banco de dados
- Atualmente o checkbox inicia **desmarcado** (importante = false)
- A mudança afeta apenas o estado inicial do formulário
- O usuário ainda pode desmarcar o checkbox se desejar

---

## 🎯 Objetivo

Facilitar o cadastro de tarefas importantes, que presumivelmente são a maioria, reduzindo um clique do usuário e tornando o fluxo mais eficiente.

---

## 📝 História de Usuário

**Como** usuário da BIA  
**Quero** que o checkbox "Importante" venha marcado por padrão  
**Para que** eu não precise marcar manualmente toda vez que cadastrar uma tarefa importante

---

## ✅ Critérios de Aceitação

1. ✅ Checkbox "Importante" inicia **marcado** ao abrir o formulário
2. ✅ Ao criar uma nova tarefa sem alterar o checkbox, ela é salva como 
importante: true

3. ✅ Usuário pode **desmarcar** o checkbox normalmente se desejar
4. ✅ Após submeter o formulário, o checkbox volta ao estado padrão (marcado)
5. ✅ Funcionalidade existente de marcar/desmarcar não é afetada
6. ✅ Tarefas criadas são salvas corretamente no banco com o valor do checkbox

---

## 🛠️ Implementação

### 1. Identificar o Componente

**Arquivo a modificar:** 
client/src/components/AddTask.jsx

Este é o componente responsável pelo formulário de cadastro de tarefas.

### 2. Alterar Estado Inicial

**Mudança necessária:**

javascript
// ANTES (estado inicial com importante = false)
const [importante, setImportante] = useState(false);

// DEPOIS (estado inicial com importante = true)
const [importante, setImportante] = useState(true);

### 3. Verificar Reset do Formulário

Após submeter a tarefa, o formulário é resetado. Garantir que o checkbox volta ao estado padrão (marcado):

javascript
// Após submit bem-sucedido
setTitulo('');
setDia('');
setImportante(true); // Garantir que volta para true

### 4. Checklist de Implementação

- [ ] Localizar componente `AddTask.jsx`
- [ ] Alterar `useState(false)` para `useState(true)` no campo importante
- [ ] Verificar função de reset do formulário
- [ ] Garantir que o reset também define importante como `true`
- [ ] Testar criação de tarefa com checkbox marcado
- [ ] Testar criação de tarefa com checkbox desmarcado
- [ ] Verificar persistência no banco de dados

---

## 🔍 Validações Técnicas

### Frontend
- ✅ Estado inicial do checkbox = `true`
- ✅ Reset do formulário mantém checkbox = `true`
- ✅ onChange do checkbox funciona normalmente
- ✅ Visual do checkbox marcado renderiza corretamente

### Backend
- ✅ Tarefas criadas com checkbox marcado salvam `importante: true`
- ✅ Tarefas criadas com checkbox desmarcado salvam `importante: false`
- ✅ Nenhuma mudança necessária no backend (apenas frontend)

---

## 📦 Dependências

**Nenhuma dependência nova.**

Esta task modifica apenas o estado inicial de um componente React existente.

---

## 🎨 UX/UI

### Comportamento Esperado

**1. Ao abrir o formulário:**

┌─────────────────────────────────────┐
│  Adicionar Nova Tarefa              │
│                                     │
│  Título: [____________]             │
│  Data:   [____________]             │
│  ☑️ Importante                       │
│                                     │
│  [Adicionar Tarefa]                 │
└─────────────────────────────────────┘

**2. Após submeter uma tarefa:**

Formulário limpa e checkbox volta marcado:
☑️ Importante (estado padrão restaurado)

---

## 🧪 Testes Manuais

### Cenários de Teste

- [ ] **Teste 1:** Abrir aplicação
  - Verificar checkbox "Importante" **marcado** por padrão

- [ ] **Teste 2:** Criar tarefa SEM alterar checkbox
  - Preencher título e data
  - Submeter formulário
  - Verificar no banco/lista: `importante = true`

- [ ] **Teste 3:** Criar tarefa DESMARCANDO checkbox
  - Preencher título e data
  - **Desmarcar** checkbox "Importante"
  - Submeter formulário
  - Verificar no banco/lista: `importante = false`

- [ ] **Teste 4:** Múltiplas criações seguidas
  - Criar tarefa 1 (checkbox marcado)
  - Criar tarefa 2 (desmarcar checkbox)
  - Criar tarefa 3 (checkbox volta marcado automaticamente)
  - Verificar que cada uma foi salva corretamente

- [ ] **Teste 5:** Validar gráfico de analytics
  - Acessar `/analytics`
  - Verificar contagem de tarefas importantes
  - Confirmar que tarefas criadas com checkbox padrão aparecem como "Importantes"

---

## 📚 Referências

- [Worktree Workflow](.kiro/docs/worktree-workflow.md)
- [Worktree Steering](.kiro/docs/worktree-steering.md)
- [React useState Hook](https://react.dev/reference/react/useState)

---

## 📊 Estimativa

**Complexidade:** Muito Baixa  
**Tempo estimado:** 30 minutos - 1 hora  
**Impacto:** Médio (melhora UX para caso de uso comum)

---

## ⚠️ Observações Importantes

1. **Mudança simples:** Apenas alterar valor padrão de `false` para `true`
2. **Sem impacto no backend:** Backend já suporta ambos os valores
3. **Reversível:** Se necessário, basta voltar para `false` no useState
4. **UX consideração:** Presume-se que maioria das tarefas são importantes
5. **Acessibilidade:** Manter atributos ARIA se existirem

---

## 🔄 Definition of Done (DoD)

- [ ] Estado inicial do checkbox alterado para `true`
- [ ] Reset do formulário mantém checkbox marcado
- [ ] Tarefas criadas com checkbox marcado salvam `importante: true`
- [ ] Tarefas criadas com checkbox desmarcado salvam `importante: false`
- [ ] Todos os testes manuais executados com sucesso
- [ ] Código commitado com mensagem descritiva
- [ ] Push realizado para o branch feature/004-feat-checkbox-importante-padrao

---

## ⚠️ FINALIZAÇÃO DA TASK (OBRIGATÓRIO)

Quando o agent concluir a implementação:

### 1. Verificação Final
bash
# Garantir que está no worktree correto
pwd
# Deve estar em: .kiro/worktrees/004-feat-checkbox-importante-padrao

# Verificar branch
git branch --show-current
# Deve mostrar: feature/004-feat-checkbox-importante-padrao

### 2. Commit e Push Final
bash
git add .
git commit -m "feat: marca checkbox Importante como padrão no formulário"
git push origin feature/004-feat-checkbox-importante-padrao

### 3. Voltar para Raiz e Notificar PO
bash
cd ../../..  # Voltar para raiz do projeto

**NOTIFICAR O PO:**
> "Task 004 concluída. Todos os itens do checklist marcados. Branch `feature/004-feat-checkbox-importante-padrao` com push realizado. Checkbox 'Importante' agora inicia marcado por padrão no formulário de cadastro. Funcionalidade testada e validada. Aguardando revisão do PO para encerramento e abertura de PR."

**⚠️ NÃO REMOVER O WORKTREE. Apenas o PO faz isso após o PR ser mergeado.**

---

## 🎯 ENCERRAMENTO PELO PO (QUANDO NOTIFICADO)

### 1. Revisão
bash
# Entrar no worktree para revisar
cd .kiro/worktrees/004-feat-checkbox-importante-padrao

# Testar a funcionalidade:
# - Executar aplicação: npm run dev (no diretório client)
# - Verificar checkbox marcado por padrão
# - Criar tarefa sem alterar checkbox
# - Criar tarefa desmarcando checkbox
# - Verificar persistência no banco

# Revisar código
# Verificar se todos os itens estão ✅

### 2. Aprovar e Mover para Done
bash
# Voltar para raiz
cd ../../..

# Mover task para done
mv .kiro/tasks/doing/004-feat-checkbox-importante-padrao.md .kiro/tasks/done/

# Commit e push no ia-main
git checkout ia-main
git add .kiro/tasks/
git commit -m "move: task 004 para done"
git push origin ia-main

### 3. Abrir Pull Request
bash
# ANTES de abrir PR: confirmar que está no branch da feature
cd .kiro/worktrees/004-feat-checkbox-importante-padrao
git branch --show-current
# Deve mostrar: feature/004-feat-checkbox-importante-padrao

# Abrir PR contra ia-main
gh pr create --base ia-main --title "004: Marca checkbox Importante como padrão" --body "Closes task 004

## Mudanças
- Alterado estado inicial do checkbox 'Importante' para true
- Reset do formulário mantém checkbox marcado por padrão
- Comportamento de marcar/desmarcar preservado

## Testes realizados
- ✅ Checkbox inicia marcado ao abrir formulário
- ✅ Tarefas criadas com checkbox marcado salvam como importante
- ✅ Tarefas criadas com checkbox desmarcado salvam como não importante
- ✅ Reset do formulário restaura checkbox marcado
- ✅ Funcionalidade existente não afetada

## Impacto UX
- Reduz um clique para caso de uso mais comum
- Usuário ainda pode desmarcar se necessário"

### 4. Após PR Mergeado
bash
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

# Notificar conclusão

**Notificação:** "Task 004 finalizada. Worktree removido. PR #X mergeado com sucesso. Checkbox 'Importante' agora vem marcado por padrão no formulário de cadastro de tarefas."
