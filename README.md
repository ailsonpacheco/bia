## Projeto base para o módulo Agentes de IA e Multi-Agentes da Formação AWS.

### Curso: Formação AWS
### Módulo: Agentes de IA e Multi Agentic

Acompanhe o curso pela área de membros e app do aluno

## Testes

### Testes do Backend
```bash
npm test
```

### Testes do Frontend

O frontend possui testes unitários para os componentes React principais utilizando Vitest e React Testing Library.

#### Rodar os testes em modo watch (desenvolvimento)
```bash
cd client
npm test
```

#### Rodar os testes uma vez (CI)
```bash
cd client
npm run test:run
```

#### Rodar os testes com interface visual
```bash
cd client
npm run test:ui
```

#### Cobertura de Testes
- **AddTask**: 8 testes - Formulário de adicionar tarefas
- **Tasks**: 11 testes - Lista de tarefas com paginação
- **Task**: 12 testes - Componente individual de tarefa
- **Total**: 30 testes

