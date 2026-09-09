import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import Task from './Task'

describe('Task', () => {
  const mockTask = {
    uuid: '123',
    titulo: 'Minha tarefa de teste',
    dia_atividade: '15/01/2025',
    importante: true,
  }

  let mockOnDelete
  let mockOnToggle

  beforeEach(() => {
    mockOnDelete = vi.fn()
    mockOnToggle = vi.fn()
  })

  it('renderiza as informações da tarefa corretamente', () => {
    render(<Task task={mockTask} onDelete={mockOnDelete} onToggle={mockOnToggle} />)
    
    expect(screen.getByText('Minha tarefa de teste')).toBeInTheDocument()
    expect(screen.getByText('📅 15/01/2025')).toBeInTheDocument()
  })

  it('renderiza "Sem data definida" quando não há data', () => {
    const taskSemData = { ...mockTask, dia_atividade: null }
    render(<Task task={taskSemData} onDelete={mockOnDelete} onToggle={mockOnToggle} />)
    
    expect(screen.getByText('📅 Sem data definida')).toBeInTheDocument()
  })

  it('aplica classe "reminder" quando a tarefa é importante', () => {
    const { container } = render(<Task task={mockTask} onDelete={mockOnDelete} onToggle={mockOnToggle} />)
    
    const taskElement = container.querySelector('.task')
    expect(taskElement).toHaveClass('reminder')
  })

  it('não aplica classe "reminder" quando a tarefa não é importante', () => {
    const taskNaoImportante = { ...mockTask, importante: false }
    const { container } = render(<Task task={taskNaoImportante} onDelete={mockOnDelete} onToggle={mockOnToggle} />)
    
    const taskElement = container.querySelector('.task')
    expect(taskElement).not.toHaveClass('reminder')
  })

  it('chama onDelete com o uuid correto ao clicar no botão de deletar', () => {
    render(<Task task={mockTask} onDelete={mockOnDelete} onToggle={mockOnToggle} />)
    
    const deleteButton = screen.getByTitle('Excluir')
    fireEvent.click(deleteButton)
    
    expect(mockOnDelete).toHaveBeenCalledTimes(1)
    expect(mockOnDelete).toHaveBeenCalledWith('123')
  })

  it('chama onToggle com o uuid correto ao clicar no botão de prioridade', () => {
    render(<Task task={mockTask} onDelete={mockOnDelete} onToggle={mockOnToggle} />)
    
    const priorityButton = screen.getByTitle('Remover importante')
    fireEvent.click(priorityButton)
    
    expect(mockOnToggle).toHaveBeenCalledTimes(1)
    expect(mockOnToggle).toHaveBeenCalledWith('123')
  })

  it('chama onToggle ao dar duplo clique na tarefa', () => {
    render(<Task task={mockTask} onDelete={mockOnDelete} onToggle={mockOnToggle} />)
    
    const taskElement = screen.getByText('Minha tarefa de teste').closest('.task')
    fireEvent.doubleClick(taskElement)
    
    expect(mockOnToggle).toHaveBeenCalledTimes(1)
    expect(mockOnToggle).toHaveBeenCalledWith('123')
  })

  it('exibe ícone de estrela preenchida quando tarefa é importante', () => {
    render(<Task task={mockTask} onDelete={mockOnDelete} onToggle={mockOnToggle} />)
    
    const priorityButton = screen.getByTitle('Remover importante')
    expect(priorityButton).toBeInTheDocument()
  })

  it('exibe ícone de estrela vazia quando tarefa não é importante', () => {
    const taskNaoImportante = { ...mockTask, importante: false }
    render(<Task task={taskNaoImportante} onDelete={mockOnDelete} onToggle={mockOnToggle} />)
    
    const priorityButton = screen.getByTitle('Marcar importante')
    expect(priorityButton).toBeInTheDocument()
  })

  it('renderiza botões de ação (prioridade e deletar)', () => {
    render(<Task task={mockTask} onDelete={mockOnDelete} onToggle={mockOnToggle} />)
    
    expect(screen.getByTitle('Remover importante')).toBeInTheDocument()
    expect(screen.getByTitle('Excluir')).toBeInTheDocument()
  })

  it('não chama onDelete múltiplas vezes ao clicar uma vez', () => {
    render(<Task task={mockTask} onDelete={mockOnDelete} onToggle={mockOnToggle} />)
    
    const deleteButton = screen.getByTitle('Excluir')
    fireEvent.click(deleteButton)
    
    expect(mockOnDelete).toHaveBeenCalledTimes(1)
  })

  it('não chama onToggle múltiplas vezes ao clicar uma vez no botão de prioridade', () => {
    render(<Task task={mockTask} onDelete={mockOnDelete} onToggle={mockOnToggle} />)
    
    const priorityButton = screen.getByTitle('Remover importante')
    fireEvent.click(priorityButton)
    
    expect(mockOnToggle).toHaveBeenCalledTimes(1)
  })
})
