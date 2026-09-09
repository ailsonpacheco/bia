import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import AddTask from './AddTask'

describe('AddTask', () => {
  let mockOnAdd

  beforeEach(() => {
    mockOnAdd = vi.fn()
  })

  it('renderiza o formulário de adicionar tarefa', () => {
    render(<AddTask onAdd={mockOnAdd} />)
    
    expect(screen.getByText('Tarefa')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('O que você precisa fazer?')).toBeInTheDocument()
    expect(screen.getByText('Data/Prazo')).toBeInTheDocument()
    expect(screen.getByLabelText('Importante')).toBeInTheDocument()
    expect(screen.getByText('Add New Task')).toBeInTheDocument()
  })

  it('permite digitar no campo de título', () => {
    render(<AddTask onAdd={mockOnAdd} />)
    
    const input = screen.getByPlaceholderText('O que você precisa fazer?')
    fireEvent.change(input, { target: { value: 'Minha nova tarefa' } })
    
    expect(input.value).toBe('Minha nova tarefa')
  })

  it('permite marcar e desmarcar o checkbox "Importante"', () => {
    render(<AddTask onAdd={mockOnAdd} />)
    
    const checkbox = screen.getByLabelText('Importante')
    
    // Por padrão vem marcado
    expect(checkbox).toBeChecked()
    
    // Desmarcar
    fireEvent.click(checkbox)
    expect(checkbox).not.toBeChecked()
    
    // Marcar novamente
    fireEvent.click(checkbox)
    expect(checkbox).toBeChecked()
  })

  it('chama onAdd com dados corretos ao submeter o formulário', async () => {
    render(<AddTask onAdd={mockOnAdd} />)
    
    const input = screen.getByPlaceholderText('O que você precisa fazer?')
    const checkbox = screen.getByLabelText('Importante')
    const submitButton = screen.getByText('Add New Task')
    
    // Preencher formulário
    fireEvent.change(input, { target: { value: 'Nova tarefa' } })
    fireEvent.click(checkbox) // Desmarcar importante
    
    // Submeter
    fireEvent.click(submitButton)
    
    await waitFor(() => {
      expect(mockOnAdd).toHaveBeenCalledTimes(1)
      expect(mockOnAdd).toHaveBeenCalledWith(
        expect.objectContaining({
          titulo: 'Nova tarefa',
          importante: false,
        })
      )
    })
  })

  it('limpa os campos após submissão bem-sucedida', async () => {
    render(<AddTask onAdd={mockOnAdd} />)
    
    const input = screen.getByPlaceholderText('O que você precisa fazer?')
    const checkbox = screen.getByLabelText('Importante')
    const submitButton = screen.getByText('Add New Task')
    
    // Preencher e submeter
    fireEvent.change(input, { target: { value: 'Tarefa teste' } })
    fireEvent.click(checkbox) // Desmarcar
    fireEvent.click(submitButton)
    
    await waitFor(() => {
      expect(input.value).toBe('')
      expect(checkbox).toBeChecked() // Volta ao padrão (marcado)
    })
  })

  it('não chama onAdd quando o título está vazio', () => {
    render(<AddTask onAdd={mockOnAdd} />)
    
    const submitButton = screen.getByText('Add New Task')
    
    // Submeter sem preencher título
    fireEvent.click(submitButton)
    
    expect(mockOnAdd).not.toHaveBeenCalled()
  })

  it('não chama onAdd quando o título contém apenas espaços', () => {
    render(<AddTask onAdd={mockOnAdd} />)
    
    const input = screen.getByPlaceholderText('O que você precisa fazer?')
    const submitButton = screen.getByText('Add New Task')
    
    // Preencher com espaços
    fireEvent.change(input, { target: { value: '   ' } })
    fireEvent.click(submitButton)
    
    expect(mockOnAdd).not.toHaveBeenCalled()
  })

  it('remove espaços em branco no início e fim do título ao submeter', async () => {
    render(<AddTask onAdd={mockOnAdd} />)
    
    const input = screen.getByPlaceholderText('O que você precisa fazer?')
    const submitButton = screen.getByText('Add New Task')
    
    fireEvent.change(input, { target: { value: '  Tarefa com espaços  ' } })
    fireEvent.click(submitButton)
    
    await waitFor(() => {
      expect(mockOnAdd).toHaveBeenCalledWith(
        expect.objectContaining({
          titulo: 'Tarefa com espaços',
        })
      )
    })
  })
})
