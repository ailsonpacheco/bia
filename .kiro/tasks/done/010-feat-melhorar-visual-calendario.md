# [010] - Melhorar Visual e Estilização do Calendário

## 🔧 Configuração Inicial (LEIA ANTES DE INICIAR)

### Agent Responsável
**dev** - Este agent deve iniciar a implementação.

### Branch Base
**SEMPRE `ia-main`**

### Worktree
Esta task será implementada em worktree isolado em `.kiro/worktrees/010-feat-melhorar-visual-calendario/`

---

## ⚠️ CHECKLIST DE INÍCIO (OBRIGATÓRIO)

Antes de começar a implementar, o agent deve:

- [ ] **Verificar branch atual:** `git branch --show-current`
  - Se não estiver em `ia-main`, **PERGUNTAR** ao usuário se pode trocar
  - Aguardar autorização
  - Após autorização: `git checkout ia-main && git pull origin ia-main`

- [ ] **Mover task para doing:**
  ```bash
  mv .kiro/tasks/010-feat-melhorar-visual-calendario.md .kiro/tasks/doing/
  git add .kiro/tasks/
  git commit -m "move: task 010 para doing"
  git push origin ia-main
  ```

- [ ] **Criar worktree:**
  ```bash
  git worktree add .kiro/worktrees/010-feat-melhorar-visual-calendario -b feature/010-feat-melhorar-visual-calendario ia-main
  cd .kiro/worktrees/010-feat-melhorar-visual-calendario
  git branch --show-current  # Confirmar branch correto
  ```

- [ ] **Confirmar isolamento do worktree:**
  - O worktree foi criado com sucesso
  - O branch `feature/010-feat-melhorar-visual-calendario` está isolado neste worktree
  - Nenhum outro worktree pode fazer checkout deste branch (garantia de isolamento do Git)

---

## 📋 Tipo
**feat** - Melhoria de Usabilidade

## 📝 Resumo
Aprimorar a estilização visual do componente DatePicker no formulário de adicionar tarefas para melhorar a experiência do usuário.

## 📖 Descrição
Como **usuário da aplicação BIA**, eu quero **um calendário com visual mais moderno e intuitivo**, para que **a experiência de seleção de datas seja mais agradável e profissional**.

### Contexto
Atualmente o calendário no componente `AddTask` usa os estilos padrão do `react-datepicker`. Esta task visa criar uma estilização customizada que:
- Melhore a identidade visual do projeto
- Aprimore a legibilidade
- Otimize a experiência mobile
- Mantenha consistência com o design system da aplicação

## ✅ Critérios de Aceitação

### Funcionalidades Principais
- [ ] O calendário deve manter todas as funcionalidades atuais (seleção de data, limpar, dropdown de anos)
- [ ] Os estilos customizados devem sobrescrever os estilos padrão do react-datepicker
- [ ] A estilização deve respeitar o tema claro/escuro da aplicação

### Interface e UX
- [ ] Melhorar cores e contrastes do calendário
- [ ] Adicionar hover states mais claros nos dias
- [ ] Destacar visualmente o dia selecionado
- [ ] Melhorar a aparência do header do calendário (mês/ano)
- [ ] Estilizar botões de navegação (setas anterior/próximo)
- [ ] Melhorar o visual do dropdown de anos
- [ ] Adicionar bordas arredondadas e sombras suaves
- [ ] Garantir responsividade mobile

### Integração
- [ ] Não quebrar a funcionalidade existente
- [ ] Manter a localização pt-BR
- [ ] Preservar o formato dd/MM/yyyy

## 🧪 Testes
- [ ] Testar seleção de datas em diferentes meses/anos
- [ ] Validar funcionamento do botão "limpar"
- [ ] Testar navegação entre meses
- [ ] Testar dropdown de anos
- [ ] Validar tema claro e escuro
- [ ] Testar responsividade em diferentes tamanhos de tela
- [ ] Verificar acessibilidade (contraste de cores)

## 📚 Definição de Pronto (DoD)
- [ ] Código implementado e testado
- [ ] Todos os itens do checklist marcados ✅
- [ ] Commits descritivos e frequentes
- [ ] Push do branch realizado
- [ ] Estilos CSS organizados e comentados
- [ ] Funcionalidade preservada

---

## 🎯 CHECKLIST DE IMPLEMENTAÇÃO (MARCAR DURANTE O TRABALHO)

### Configuração
- [ ] Worktree criado e branch correto confirmado
- [ ] Navegar para o worktree: `cd .kiro/worktrees/010-feat-melhorar-visual-calendario`
- [ ] Instalar dependências se necessário: `npm install` (raiz e client)

### Análise
- [ ] Revisar arquivo atual: `client/src/styles/datepicker.css`
- [ ] Analisar componente: `client/src/components/AddTask.jsx`
- [ ] Identificar classes CSS do react-datepicker a serem customizadas

### Desenvolvimento
- [ ] Criar/atualizar estilos customizados no arquivo `client/src/styles/datepicker.css`
- [ ] Implementar variáveis CSS para cores (usar variáveis do tema)
- [ ] Estilizar container do calendário (.react-datepicker)
- [ ] Estilizar header do calendário (.react-datepicker__header)
- [ ] Estilizar dias da semana (.react-datepicker__day-names)
- [ ] Estilizar dias individuais (.react-datepicker__day)
- [ ] Estilizar dia selecionado (.react-datepicker__day--selected)
- [ ] Estilizar dia de hoje (.react-datepicker__day--today)
- [ ] Estilizar estados hover (.react-datepicker__day:hover)
- [ ] Estilizar botões de navegação
- [ ] Estilizar dropdown de anos
- [ ] Adicionar transições suaves (transition)
- [ ] Garantir suporte a tema escuro (usando variáveis CSS)

### Testes Manuais
- [ ] Testar em navegador - tema claro
- [ ] Testar em navegador - tema escuro
- [ ] Testar seleção de datas
- [ ] Testar navegação entre meses
- [ ] Testar dropdown de anos
- [ ] Testar botão limpar
- [ ] Testar responsividade mobile (DevTools)
- [ ] Validar contraste de cores (acessibilidade)

### Finalização
- [ ] Código revisado e limpo
- [ ] Comentários adicionados onde necessário
- [ ] Commits realizados: `git add . && git commit -m "feat: melhora visual do calendário"`
- [ ] Push do branch: `git push origin feature/010-feat-melhorar-visual-calendario`
- [ ] Todos os itens acima marcados ✅

---

## ⚠️ FINALIZAÇÃO DA TASK (OBRIGATÓRIO)

Quando o agent concluir a implementação:

### 1. Verificação Final
```bash
# Garantir que está no worktree correto
pwd
# Deve estar em: /home/ailson/DesafioAgo2026IA/desafio01_AgIA_MultAgentic/bia/.kiro/worktrees/010-feat-melhorar-visual-calendario

# Verificar branch
git branch --show-current
# Deve mostrar: feature/010-feat-melhorar-visual-calendario
```

### 2. Commit e Push Final
```bash
git add .
git commit -m "feat: finaliza melhorias visuais do calendário"
git push origin feature/010-feat-melhorar-visual-calendario
```

### 3. Voltar para Raiz e Notificar PO
```bash
cd ../../..  # Voltar para raiz do projeto
```

**NOTIFICAR O PO:**
> "Task 010 concluída. Todos os itens do checklist marcados. Branch `feature/010-feat-melhorar-visual-calendario` com push realizado. Melhorias visuais implementadas no calendário com suporte a tema claro/escuro. Aguardando revisão do PO para encerramento e abertura de PR."

**⚠️ NÃO REMOVER O WORKTREE. Apenas o PO faz isso após o PR ser mergeado.**

---

## 🎯 ENCERRAMENTO PELO PO (QUANDO NOTIFICADO)

### 1. Revisão
```bash
# Entrar no worktree para revisar
cd .kiro/worktrees/010-feat-melhorar-visual-calendario

# Testar aplicação
npm run dev

# Revisar código CSS
# Verificar tema claro e escuro
# Testar responsividade
```

### 2. Aprovar e Mover para Done
```bash
# Voltar para raiz
cd ../../..

# Mover task para done
mv .kiro/tasks/doing/010-feat-melhorar-visual-calendario.md .kiro/tasks/done/

# Commit e push no ia-main
git checkout ia-main
git add .kiro/tasks/
git commit -m "move: task 010 para done"
git push origin ia-main
```

### 3. Abrir Pull Request
```bash
# ANTES de abrir PR: confirmar que está no branch da feature
cd .kiro/worktrees/010-feat-melhorar-visual-calendario
git branch --show-current
# Deve mostrar: feature/010-feat-melhorar-visual-calendario

# Abrir PR contra ia-main
gh pr create --base ia-main --title "010: Melhorar visual e estilização do calendário" --body "Closes task 010

## 🎨 Melhorias Implementadas
- Estilização customizada do DatePicker
- Suporte a tema claro/escuro
- Melhor experiência visual e de usabilidade
- Responsividade mobile aprimorada

## ✅ Testes Realizados
- Funcionalidade preservada
- Temas validados
- Responsividade testada"
```

### 4. Após PR Mergeado
```bash
# Voltar para raiz
cd ../../..

# Remover worktree
git worktree remove .kiro/worktrees/010-feat-melhorar-visual-calendario

# Ou com força se necessário:
# git worktree remove --force .kiro/worktrees/010-feat-melhorar-visual-calendario

# Limpar registros
git worktree prune

# (Opcional) Deletar branch local
git branch -d feature/010-feat-melhorar-visual-calendario

# Notificar conclusão
echo "✅ Task 010 finalizada. Worktree removido. PR mergeado com sucesso."
```

---

## 📊 Notas Técnicas

### Arquivos Envolvidos
- `client/src/styles/datepicker.css` - Estilos customizados
- `client/src/components/AddTask.jsx` - Componente que usa o calendário

### Variáveis CSS Recomendadas
Usar variáveis CSS existentes do tema:
- `--bg-card` - Background do calendário
- `--text-primary` - Texto principal
- `--text-secondary` - Texto secundário
- `--border-color` - Bordas
- `--primary-color` - Cor de destaque

### Classes CSS Principais do react-datepicker
- `.react-datepicker` - Container principal
- `.react-datepicker__header` - Header (mês/ano)
- `.react-datepicker__day` - Dias individuais
- `.react-datepicker__day--selected` - Dia selecionado
- `.react-datepicker__day--today` - Dia atual
- `.react-datepicker__navigation` - Botões de navegação

### Boas Práticas
- Usar `transition` para animações suaves
- Manter boa relação de contraste (WCAG)
- Testar com diferentes tamanhos de fonte
- Garantir touch targets adequados (mobile)

## 💼 Valor de Negócio
**Alto** - Melhora significativa na experiência do usuário, aumentando a percepção de qualidade da aplicação e facilitando a interação com datas.

## 🎯 Estimativa
**3 Story Points** - Complexidade média. Requer conhecimento de CSS customizado e teste de múltiplos estados visuais.

## 🔗 Dependências
Nenhuma - Task independente.

---

## 📚 Referências
- [Worktree Workflow](.kiro/docs/worktree-workflow.md)
- [Worktree Steering](.kiro/docs/worktree-steering.md)
- [React DatePicker Documentation](https://reactdatepicker.com/)
- [React DatePicker CSS Classes](https://github.com/Hacker0x01/react-datepicker/blob/main/docs/datepicker.md)
