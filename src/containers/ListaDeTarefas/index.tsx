import { useSelector } from 'react-redux'

import Tarefa from '../../components/Tarefa'
import * as S from '../../styles/index'
import { RootReducer } from '../../store'

const ListaDeTarefas = () => {
  /*
  1º useSelector ---> Acesso o estado global armazenado no redurcer tarefas
  itens: Obtém a lista de tarefas do estado global.
  */
  const { itens } = useSelector((state: RootReducer) => state.tarefas)
  //2º useSelector ---> Acesso o estado global armazenado no redurcer filtro
  const { termo, criterio, valor } = useSelector(
    (state: RootReducer) => state.filtro
  )

  const filtraTarefa = () => {
    //essa variável recebe todos os itens que foram obtidos do estado global pelo useSelector
    let tarefasFiltradas = itens
    /*
    - Primeiro, filtra pelo termo de busca (termo).
    - Em seguida, aplica o critério de filtragem, se for prioridade ou status.
    */
    if (termo !== undefined) {
      tarefasFiltradas = itens.filter(
        (itens) =>
          itens.titulo.toLocaleLowerCase().search(termo.toLocaleLowerCase()) >=
          0
      )

      if (criterio === 'prioridade') {
        tarefasFiltradas = tarefasFiltradas.filter(
          (item) => item.prioridade === valor
        )
      } else if (criterio === 'status') {
        tarefasFiltradas = tarefasFiltradas.filter(
          (item) => item.status === valor
        )
      }
      return tarefasFiltradas
    } else {
      return itens
    }
  }

  const exibeResultadoFiltragem = (quantidade: number) => {
    let mensagem = ''
    const complementacao =
      termo !== undefined && termo.length > 0 ? `e "${termo}"` : ''
    if (criterio === 'todas') {
      mensagem = `${quantidade} tarefa(s) encontrada(s) como: todas ${complementacao}`
    } else {
      mensagem = `${quantidade} tarefa(s) encontrada(s) como: "${`${criterio}=${valor}`}"  ${complementacao}`
    }
    return mensagem
  }

  const tarefas = filtraTarefa()
  const mensagem = exibeResultadoFiltragem(tarefas.length)

  return (
    <S.MainContainer>
      <S.Titulo as="p">{mensagem}</S.Titulo>
      <ul>
        {tarefas.map((t) => (
          <li key={t.titulo}>
            <Tarefa
              id={t.id}
              descricao={t.descricao}
              status={t.status}
              prioridade={t.prioridade}
              titulo={t.titulo}
            />
          </li>
        ))}
      </ul>
    </S.MainContainer>
  )
}

export default ListaDeTarefas
