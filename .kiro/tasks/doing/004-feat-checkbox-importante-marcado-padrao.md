# [004] - Checkbox "Importante" marcado por padrão no cadastro de tarefa

## Tipo
**feat** - Nova funcionalidade

## Resumo
Na tela de cadastro de tarefa, o checkbox "Importante" deve vir marcado por padrão. Apenas o estado visual/marcação inicial do checkbox deve ser alterado, sem impactar as demais funcionalidades do formulário.

## Descrição
Como usuário do sistema BIA, ao abrir a tela de cadastro de tarefa, eu quero que o checkbox "Importante" já venha marcado por padrão, para que a maioria das tarefas seja registrada como importante sem que eu precise marcar manualmente.

## Contexto Técnico
- Componente afetado: `client/src/components/AddTask.jsx`
- Estado relevante: `const [importante, setImportante] = useState(false);`
- A mudança consiste em inicializar esse estado como `true`.

## Critérios de Aceitação

### Funcionalidades Principais
- [ ] O checkbox "Importante" deve aparecer **marcado por padrão** ao abrir/renderizar o formulário de cadastro
- [ ] O usuário deve poder **desmarcar** o checkbox normalmente
- [ ] Ao enviar o formulário, o valor de `importante` deve refletir o estado atual do checkbox (marcado = true, desmarcado = false)
- [ ] Após adicionar uma tarefa, o formulário deve ser resetado com o checkbox **novamente marcado por padrão**

### Restrições
- [ ] Alterar **apenas** o valor inicial de marcação do checkbox
- [ ] Não alterar layout, textos, validações ou o fluxo de submissão do formulário
- [ ] Não alterar backend, models ou migrations

## Definição de Pronto (DoD)
- [ ] Código implementado no `AddTask.jsx`
- [ ] Checkbox vem marcado por padrão ao carregar a tela
- [ ] Reset do formulário mantém o checkbox marcado por padrão
- [ ] Testado localmente (marcar/desmarcar e submissão)
- [ ] Segue padrões do projeto (React hooks)

## Notas Técnicas
- Inicializar o estado: `useState(true)` em vez de `useState(false)`
- No reset do `onSubmit`, usar `setImportante(true)` em vez de `setImportante(false)`

## Valor de Negócio
- **Baixo/Médio** - Melhora a experiência do usuário reduzindo cliques para o caso de uso mais comum

## Estimativa
**1 Story Point** - Complexidade baixa

## Dependências
- Nenhuma

## Instruções para o Agent
1. Verificar se está no branch `ia-main` antes de iniciar
2. Mover task para `doing/`
3. Fazer commit e push no `ia-main`
4. Criar branch `004-feat-checkbox-importante-padrao`
5. Implementar a funcionalidade
