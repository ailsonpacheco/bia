# Task 005 - Simplificar Tela de Versão

## Informações da Task
- **Número:** 005
- **Tipo:** feat
- **Branch:** 005-feat-simplificar-tela-versao
- **Branch Base:** ia-main
- **Agent Responsável:** dev

## Descrição
Simplificar a tela de versão (/versao) removendo informações de ambiente e cliente, mantendo apenas o status da API.

## Critérios de Aceitação
- [ ] Remover informações de ambiente da tela /versao
- [ ] Remover informações de cliente da tela /versao
- [ ] Manter apenas informações de status da API
- [ ] Garantir que a funcionalidade básica da rota continue funcionando
- [ ] Testar a rota após as modificações

## Definição de Pronto
- [ ] Código implementado e testado
- [ ] Rota /versao respondendo apenas com status da API
- [ ] Commit realizado no branch da feature
- [ ] Push para repositório remoto

## Observações Técnicas
- Verificar arquivos relacionados à rota /versao no frontend e backend
- Manter a estrutura básica da resposta da API
- Focar na simplicidade da informação apresentada

## Instruções para o Agent
1. Verificar se está no branch ia-main
2. Caso não esteja, solicitar autorização para retornar
3. Mover task para doing
4. Fazer commit e push no ia-main
5. Criar branch 005-feat-simplificar-tela-versao
6. Implementar as modificações necessárias

## Implementação Realizada
## Histórico / Reabertura
- ⚠️ **Task reaberta em 2026-09-07 (Opção A).** A task havia sido marcada como concluída anteriormente, mas o código em `client/src/components/Version.jsx` NUNCA refletiu a simplificação: os cards de "Ambiente" e "Frontend/Cliente" ainda estavam presentes. Por isso a task foi movida de `done/` de volta para `doing/` para ser implementada de fato.

## Implementação a Realizar
- [ ] Simplificar o componente `client/src/components/Version.jsx` removendo:
  - Card do Ambiente (protocolo, host, porta, etc.)
  - Card do Frontend/Cliente (navegador, origem, framework, etc.)
  - Função `getEnvironmentInfo` e o campo `environment` (se ficarem sem uso)
- [ ] Manter apenas o card de Status da API com:
  - Status online/offline
  - Versão da API
  - Timestamp da última verificação
- [ ] Rebuild e teste conforme instruções do agent dev

## Finalização da Task
- [ ] Agent dev informar conclusão ao PO para encerramento
- [ ] PO verificar se tudo foi implementado conforme especificado
- [ ] PO verificar se todos os itens da task foram marcados como concluídos
- [ ] PO mover task para pasta done/
- [ ] PO fazer commit e push final

## Status: 🔄 REABERTA - EM DOING (aguardando implementação pelo dev)
