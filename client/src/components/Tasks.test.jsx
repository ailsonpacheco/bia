import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import Tasks from './Tasks'

describe('Tasks', () => {
  const mockTasks = [
    {
      uuid: '1',
      titulo: 'Tarefa 1',
      dia_atividade: '01/01/2025',
      importante: true,
    },
    {
      uuid: '2',
      titulo: 'Tarefa 2',
      dia_atividade: '02/01/2025',
      importante: false,
    },
    {
      uuid: '3',
      titulo: 'Tarefa 3',
      dia_atividade: '03/01/2025',
      importante: true,
    },
  ]

  const mockOnDelete = vi.fn()
  const mockOnToggle = vi.fn()

  it('renderiza lista de tarefas corretamente', () => {
    render(<Tasks tasks={mockTasks} onDelete={mockOnDelete} onToggle={mockOnToggle} />)
    
    expect(screen.getByText('Tarefa 1')).toBeInTheDocument()
    expect(screen.getByText('Tarefa 2')).toBeInTheDocument()
    expect(screen.getByText('Tarefa 3')).toBeInTheDocument()
  })

  it('não renderiza nada quando não há tarefas', () => {
    const { container } = render(<Tasks tasks={[]} onDelete={mockOnDelete} onToggle={mockOnToggle} />)
    
    expect(container.firstChild).toBeNull()
  })

  it('renderiza cada tarefa com suas informações corretas', () => {
    render(<Tasks tasks={mockTasks} onDelete={mockOnDelete} onToggle={mockOnToggle} />)
    
    expect(screen.getByText('Tarefa 1')).toBeInTheDocument()
    expect(screen.getByText('📅 01/01/2025')).toBeInTheDocument()
    
    expect(screen.getByText('Tarefa 2')).toBeInTheDocument()
    expect(screen.getByText('📅 02/01/2025')).toBeInTheDocument()
  })

  it('passa as props corretas para cada componente Task', () => {
    render(<Tasks tasks={mockTasks} onDelete={mockOnDelete} onToggle={mockOnToggle} />)
    
    // Verifica que os títulos estão presentes (indicando que Task foi renderizado)
    mockTasks.forEach(task => {
      expect(screen.getByText(task.titulo)).toBeInTheDocument()
    })
  })

  it('exibe paginação quando há mais de 5 tarefas', () => {
    const manyTasks = Array.from({ length: 12 }, (_, i) => ({
      uuid: `${i + 1}`,
      titulo: `Tarefa ${i + 1}`,
      dia_atividade: '01/01/2025',
      importante: false,
    }))

    render(<Tasks tasks={manyTasks} onDelete={mockOnDelete} onToggle={mockOnToggle} />)
    
    // Verifica informação de paginação
    expect(screen.getByText(/Mostrando 1-5 de 12 tarefas/i)).toBeInTheDocument()
    
    // Verifica botões de navegação
    expect(screen.getByTitle('Próxima página')).toBeInTheDocument()
    expect(screen.getByTitle('Página anterior')).toBeInTheDocument()
  })

  it('não exibe paginação quando há 5 ou menos tarefas', () => {
    render(<Tasks tasks={mockTasks} onDelete={mockOnDelete} onToggle={mockOnToggle} />)
    
    // Não deve haver controles de paginação
    expect(screen.queryByText(/Mostrando/i)).not.toBeInTheDocument()
    expect(screen.queryByTitle('Próxima página')).not.toBeInTheDocument()
  })

  it('exibe apenas 5 tarefas por página', () => {
    const manyTasks = Array.from({ length: 8 }, (_, i) => ({
      uuid: `${i + 1}`,
      titulo: `Tarefa ${i + 1}`,
      dia_atividade: '01/01/2025',
      importante: false,
    }))

    render(<Tasks tasks={manyTasks} onDelete={mockOnDelete} onToggle={mockOnToggle} />)
    
    // Deve exibir apenas as 5 primeiras tarefas
    expect(screen.getByText('Tarefa 1')).toBeInTheDocument()
    expect(screen.getByText('Tarefa 5')).toBeInTheDocument()
    
    // Tarefa 6 não deve estar visível na primeira página
    expect(screen.queryByText('Tarefa 6')).not.toBeInTheDocument()
  })

  it('navega para próxima página ao clicar no botão', () => {
    const manyTasks = Array.from({ length: 8 }, (_, i) => ({
      uuid: `${i + 1}`,
      titulo: `Tarefa ${i + 1}`,
      dia_atividade: '01/01/2025',
      importante: false,
    }))

    render(<Tasks tasks={manyTasks} onDelete={mockOnDelete} onToggle={mockOnToggle} />)
    
    const nextButton = screen.getByTitle('Próxima página')
    fireEvent.click(nextButton)
    
    // Agora deve exibir a segunda página (tarefas 6-8)
    expect(screen.queryByText('Tarefa 1')).not.toBeInTheDocument()
    expect(screen.getByText('Tarefa 6')).toBeInTheDocument()
    expect(screen.getByText('Tarefa 7')).toBeInTheDocument()
  })

  it('desabilita botão anterior na primeira página', () => {
    const manyTasks = Array.from({ length: 8 }, (_, i) => ({
      uuid: `${i + 1}`,
      titulo: `Tarefa ${i + 1}`,
      dia_atividade: '01/01/2025',
      importante: false,
    }))

    render(<Tasks tasks={manyTasks} onDelete={mockOnDelete} onToggle={mockOnToggle} />)
    
    const prevButton = screen.getByTitle('Página anterior')
    expect(prevButton).toBeDisabled()
  })

  it('desabilita botão próximo na última página', () => {
    const manyTasks = Array.from({ length: 8 }, (_, i) => ({
      uuid: `${i + 1}`,
      titulo: `Tarefa ${i + 1}`,
      dia_atividade: '01/01/2025',
      importante: false,
    }))

    render(<Tasks tasks={manyTasks} onDelete={mockOnDelete} onToggle={mockOnToggle} />)
    
    // Ir para a última página
    const nextButton = screen.getByTitle('Próxima página')
    fireEvent.click(nextButton)
    
    expect(nextButton).toBeDisabled()
  })
})
