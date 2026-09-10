# Teste de Isolamento de Worktrees

## Objetivo
Demonstrar que cada worktree mantém seu próprio branch isolado e que não é possível trocar para o branch de outro worktree ativo.

## Conceito de Worktree
Git worktrees permitem ter múltiplas cópias de trabalho do mesmo repositório simultaneamente, cada uma em seu próprio diretório e branch.

## Teste Prático de Isolamento

### Passo 1: Verificar Branch Atual
```bash
git branch --show-current
```
**Esperado:** `ia-main`

### Passo 2: Criar Primeiro Worktree (008)
```bash
git worktree add .kiro/worktrees/008-test-isolamento-1 -b feature/008-test-isolamento-1 ia-main
```

**Saída esperada:**
```
Preparing worktree (new branch 'feature/008-test-isolamento-1')
HEAD is now at [commit-hash] [commit-message]
```

### Passo 3: Criar Segundo Worktree (010)
```bash
git worktree add .kiro/worktrees/010-test-isolamento-2 -b feature/010-test-isolamento-2 ia-main
```

**Saída esperada:**
```
Preparing worktree (new branch 'feature/010-test-isolamento-2')
HEAD is now at [commit-hash] [commit-message]
```

### Passo 4: Listar Worktrees Criados
```bash
git worktree list
```

**Saída esperada:**
```
/home/ailson/DesafioAgo2026IA/desafio01_AgIA_MultAgentic/bia  [ia-main]
/home/ailson/DesafioAgo2026IA/desafio01_AgIA_MultAgentic/bia/.kiro/worktrees/008-test-isolamento-1  [feature/008-test-isolamento-1]
/home/ailson/DesafioAgo2026IA/desafio01_AgIA_MultAgentic/bia/.kiro/worktrees/010-test-isolamento-2  [feature/010-test-isolamento-2]
```

### Passo 5: Entrar no Worktree 008
```bash
cd .kiro/worktrees/008-test-isolamento-1
```

### Passo 6: Verificar Branch Atual
```bash
git branch --show-current
```

**Saída esperada:**
```
feature/008-test-isolamento-1
```

### Passo 7: 🎯 TESTE PRINCIPAL - Tentar Trocar para Branch do Worktree 010
```bash
git checkout feature/010-test-isolamento-2
```

**⚠️ SAÍDA ESPERADA (ERRO):**
```
fatal: 'feature/010-test-isolamento-2' is already checked out at '/home/ailson/DesafioAgo2026IA/desafio01_AgIA_MultAgentic/bia/.kiro/worktrees/010-test-isolamento-2'
```

**✅ ISSO COMPROVA O ISOLAMENTO!** Git impede que você faça checkout de um branch que está ativo em outro worktree.

### Passo 8: Criar Arquivo de Teste no Worktree 008
```bash
echo "Teste 008" > teste-008.txt
git add teste-008.txt
git commit -m "test: arquivo de teste 008"
```

**Saída esperada:**
```
[feature/008-test-isolamento-1 abc1234] test: arquivo de teste 008
 1 file changed, 1 insertion(+)
 create mode 100644 teste-008.txt
```

### Passo 9: Voltar para Raiz e Entrar no Worktree 010
```bash
cd ../../..
cd .kiro/worktrees/010-test-isolamento-2
```

### Passo 10: Verificar Branch e Confirmar que Arquivo do 008 NÃO Existe
```bash
git branch --show-current
```
**Saída esperada:**
```
feature/010-test-isolamento-2
```

```bash
ls -la | grep teste-
```
**Saída esperada:**
```
(sem resultado - arquivo não existe)
```

**✅ ISSO COMPROVA O ISOLAMENTO DE ARQUIVOS!** Mudanças em um worktree não aparecem em outro até que sejam mergeadas.

### Passo 11: Voltar para Raiz e Listar Worktrees
```bash
cd ../../..
git worktree list
```

**Saída esperada:**
```
/home/ailson/DesafioAgo2026IA/desafio01_AgIA_MultAgentic/bia  [ia-main]
/home/ailson/DesafioAgo2026IA/desafio01_AgIA_MultAgentic/bia/.kiro/worktrees/008-test-isolamento-1  [feature/008-test-isolamento-1]
/home/ailson/DesafioAgo2026IA/desafio01_AgIA_MultAgentic/bia/.kiro/worktrees/010-test-isolamento-2  [feature/010-test-isolamento-2]
```

## 📋 Resultados Documentados

### ✅ Comprovações de Isolamento

1. **Isolamento de Branch:**
   - Erro ao tentar `git checkout feature/010-test-isolamento-2` dentro do worktree 008
   - Mensagem: `fatal: 'feature/010-test-isolamento-2' is already checked out at '...'`

2. **Isolamento de Arquivos:**
   - Arquivo `teste-008.txt` existe apenas no worktree 008
   - Arquivo NÃO existe no worktree 010
   - Cada worktree tem seu próprio working directory isolado

3. **Lista de Worktrees Ativos:**
   - Cada worktree aparece na listagem com seu respectivo branch
   - Git mantém registro de todos os worktrees ativos

## 🧹 Limpeza Após o Teste

Para remover os worktrees de teste:

```bash
# Voltar para raiz
cd /home/ailson/DesafioAgo2026IA/desafio01_AgIA_MultAgentic/bia

# Remover worktrees
git worktree remove .kiro/worktrees/008-test-isolamento-1
git worktree remove .kiro/worktrees/010-test-isolamento-2

# Limpar registros
git worktree prune

# Deletar branches (opcional)
git branch -d feature/008-test-isolamento-1
git branch -d feature/010-test-isolamento-2
```

## 📚 Conclusões

### Por Que Worktrees São Úteis?

1. **Trabalho Paralelo:** Você pode trabalhar em múltiplas features simultaneamente sem precisar fazer stash ou commit incompleto
2. **Isolamento Garantido:** Cada worktree é completamente independente
3. **Performance:** Mais rápido que clonar o repositório múltiplas vezes
4. **Economia de Espaço:** Compartilha o histórico Git entre worktrees

### Regras de Segurança

1. ⚠️ **Um branch só pode estar ativo em um worktree por vez**
2. ⚠️ **Não delete um worktree manualmente (via rm -rf)** - sempre use `git worktree remove`
3. ⚠️ **Não faça push force de um branch que está ativo em outro worktree**
4. ⚠️ **Sempre volte para a raiz antes de remover worktrees**

### Workflow Recomendado para o Projeto BIA

```
ia-main (branch principal)
  └─ .kiro/worktrees/
       ├─ 008-feat-exemplo/  → feature/008-feat-exemplo
       ├─ 009-test-unitarios/ → feature/009-test-unitarios
       └─ 010-fix-bug/        → fix/010-fix-bug
```

Cada task tem seu worktree isolado, permitindo que múltiplos agents trabalhem em paralelo sem conflitos!

## 🎯 Aplicação no Workflow do Projeto

Este isolamento é crucial para nosso workflow multi-agente:

- **Agent Dev** trabalha em `feature/008-feat-login` no worktree 008
- **Agent QA** trabalha em `test/009-test-login` no worktree 009
- **Ambos podem trabalhar simultaneamente sem interferir um no outro**
- **O PO pode revisar cada worktree independentemente**

---

**Documento criado em:** 2026-09-09  
**Versão:** 1.0  
**Público:** Alunos da Formação AWS - Módulo Agentes de IA
