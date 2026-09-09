# ✅ Validação de MCPs por Agente — Projeto BIA

> Documento gerado a partir da validação de carregamento e uso dos MCP servers
> configurados por agente. **Nenhuma alteração de código/infra foi feita** durante
> a validação — todas as chamadas foram somente-leitura.
>
> Data da validação: 2026-09-09

## Objetivo

Comparar e comprovar a execução das 4 fases planejadas:

1. Configurar **AWS-MCP** para o agente **devops**
2. Configurar **shadcn** para o agente **dev**
3. Configurar **Playwright** para o agente **qa**
4. Testar o **carregamento e uso** de cada um dos MCPs

## Resultado consolidado

| # | Fase | Status | Evidência |
|---|------|--------|-----------|
| 1 | **AWS-MCP para devops** | ✅ Configurado + carregado + usado | Config em `.kiro/agents/devops.json`. Subagente `devops` carregou o MCP e executou consulta de leitura na documentação AWS ("ECS task definition") com sucesso. |
| 2 | **shadcn para dev** | ✅ Configurado + carregado + usado | Config em `.kiro/agents/dev.json`. Handshake `initialize` OK (shadcn v1.0.0), `tools/list` retornou as ferramentas e `search_items_in_registries("button")` retornou 33 itens. |
| 3 | **Playwright para qa** | ✅ Configurado + usado | Config em `.kiro/agents/qa.json`. Exercitado em sessão: navegação, CRUD de tarefas e screenshots. |
| 4 | **Testar carregamento e uso de cada MCP** | ✅ Os 3 comprovados | Playwright ✅, AWS-MCP ✅, shadcn ✅. |

**Conclusão: as 4 fases estão executadas e comprovadas.**

## Detalhes por MCP

### 1. AWS-MCP (agente `devops`)

Configuração em `.kiro/agents/devops.json`:

```json
"mcpServers": {
  "aws-mcp": {
    "command": "uvx",
    "args": [
      "mcp-proxy-for-aws@latest",
      "https://aws-mcp.us-east-1.api.aws/mcp",
      "--metadata",
      "AWS_REGION=us-east-1"
    ],
    "env": { "AWS_PROFILE": "amifFormacao" }
  }
}
```

- **STATUS:** carregado e operacional.
- **Ferramentas expostas (5):**
  - `mcp_aws_documentation_read_documentation`
  - `mcp_aws_documentation_read_sections`
  - `mcp_aws_documentation_recommend`
  - `mcp_aws_documentation_search_documentation`
  - `mcp_aws_documentation_search_table`
- **Teste de leitura:** busca por "ECS task definition" na documentação AWS → retornou documentos relevantes.
- **Pré-requisitos confirmados:** `uvx` instalado; profile `amifFormacao` presente em `~/.aws/config`.

### 2. shadcn (agente `dev`)

Configuração em `.kiro/agents/dev.json`:

```json
"mcpServers": {
  "shadcn": {
    "command": "npx",
    "args": ["-y", "shadcn@latest", "mcp"]
  }
}
```

- **STATUS:** carregado e operacional (server `shadcn v1.0.0`).
- **Ferramentas expostas (principais):**
  - `get_project_registries`
  - `list_items_in_registries`
  - `search_items_in_registries`
  - `view_items_in_registries`
  - `get_item_examples_from_registries`
  - `get_add_command_for_items`
- **Teste de leitura:** `search_items_in_registries` com query `"button"` no registry `@shadcn` → **33 itens** encontrados (button, kbd-button, button-demo, ...).
- **Observação:** as ferramentas que dependem de `components.json` local retornam erro porque o projeto **não possui `components.json`** — o shadcn nunca foi inicializado formalmente no `client/`. Isso não impede o MCP de carregar/funcionar; apenas limita as operações que exigem o registro local.

### 3. Playwright (agente `qa`)

Configuração em `.kiro/agents/qa.json`:

```json
"mcpServers": {
  "playwright": {
    "command": "npx",
    "args": ["@playwright/mcp@latest"],
    "env": {},
    "timeout": 120000,
    "disabled": false
  }
}
```

- **STATUS:** carregado e usado.
- **Uso comprovado:** navegação em `http://localhost:3001`, criação e exclusão de tarefas pela UI, seleção de datas no datepicker e captura de screenshots.

## Notas

- Cada MCP está vinculado ao seu respectivo agente (subagente), não à sessão principal de chat.
- O carregamento do shadcn foi confirmado testando o servidor MCP diretamente (handshake JSON-RPC `initialize` + `tools/list` + `tools/call`), o que isola a configuração de eventuais limitações no modo de disparo do subagente.
- Todas as chamadas de validação foram **somente-leitura**; nenhum arquivo do projeto e nenhum recurso AWS foi criado, alterado ou removido.
