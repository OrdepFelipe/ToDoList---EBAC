import { ChangeEvent, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import { BotaoSalvar } from '../../styles'
import * as S from './styles'
import { remover, editar, alteraStatus } from '../../store/redurcers/tarefas'
import TarefaClass from '../../models/Tarefa'
import * as enums from '../../utils/enums/Tarefas'

type Props = TarefaClass

const Tarefa = ({
  titulo,
  prioridade,
  status,
  descricao: descricaoOriginal,
  id
}: Props) => {
  /*
  useDispatch: Obtém a função dispatch para despachar ações.
  Estados Locais:
    estaEditando: Indica se o componente está em modo de edição.
    descricao: Armazena a descrição da tarefa.
  useEffect: Sincroniza o estado descricao com descricaoOriginal quando descricaoOriginal muda.

  */
  const dispatch = useDispatch()
  const [estaEditando, setEstaEditando] = useState(false)

  const [descricao, setDescricao] = useState('')
  useEffect(() => {
    if (descricaoOriginal.length > 0) {
      setDescricao(descricaoOriginal)
    }
  }, [descricaoOriginal])
  /*
Cancela a edição, redefinindo estaEditando para false e descricao para descricaoOriginal.
*/
  function cancelarEdicao() {
    setEstaEditando(false)
    setDescricao(descricaoOriginal)
  }

  function alteraStatusTarefa(evento: ChangeEvent<HTMLInputElement>) {
    dispatch(
      alteraStatus({
        id,
        finalizado: evento.target.checked
      })
    )
  }
  return (
    <S.Card>
      <label htmlFor={titulo}>
        <input
          type="checkbox"
          id={titulo}
          checked={status === enums.Status.CONCLUIDA}
          onChange={alteraStatusTarefa}
        />
        <S.Titulo>
          {estaEditando ? <em>Editando: </em> : ''}
          {titulo}
        </S.Titulo>
      </label>
      <S.Tag parametro="prioridade" prioridade={prioridade}>
        {prioridade}
      </S.Tag>
      <S.Tag parametro="status" status={status}>
        {status}
      </S.Tag>
      {/*
Explicação:
Este é um campo de texto (input ou textarea) estilizado usando styled-components (referenciado aqui como S.Descricao). Ele possui três propriedades importantes:

disabled={!estaEditando}:

Define se o campo de texto está desabilitado ou não.
disabled é um atributo booleano que, quando true, desabilita o campo de texto, tornando-o não editável.
Aqui, o valor de disabled é inverso ao valor de estaEditando. Ou seja, se estaEditando for false, disabled será true, e vice-versa.
Isso significa que o campo de texto será editável (disabled={false}) somente quando o modo de edição (estaEditando) estiver ativado (true).
value={descricao}:

Define o valor atual do campo de texto.
value é uma propriedade controlada pelo estado local descricao.
O valor exibido no campo de texto será o valor atual de descricao.
onChange={(evento) => setDescricao(evento.target.value)}:

Define uma função de callback para ser chamada quando o conteúdo do campo de texto mudar.
onChange é um evento que dispara sempre que o usuário digita algo no campo de texto.
A função de callback recebe um objeto de evento (evento) como argumento.
evento.target.value contém o novo valor digitado no campo de texto.
setDescricao(evento.target.value) atualiza o estado descricao com o novo valor digitado.
Comportamento:
Quando estaEditando for true:

O campo de texto estará habilitado e o usuário poderá editá-lo.
As alterações feitas pelo usuário serão refletidas no estado descricao graças à função onChange.
Quando estaEditando for false:

O campo de texto estará desabilitado e o usuário não poderá editá-lo.
O valor do campo de texto será exibido, mas não poderá ser alterado pelo usuário.
        */}
      <S.Descricao
        disabled={!estaEditando}
        value={descricao}
        onChange={(evento) => setDescricao(evento.target.value)}
      />
      <S.BarraAcoes>
        {estaEditando ? (
          <>
            <BotaoSalvar
              onClick={() => {
                dispatch(
                  editar({
                    descricao,
                    id,
                    prioridade,
                    status,
                    titulo
                  })
                )
                setEstaEditando(false)
              }}
            >
              Salvar
            </BotaoSalvar>
            <S.BotaoCancelarRemover onClick={cancelarEdicao}>
              Cancelar
            </S.BotaoCancelarRemover>
          </>
        ) : (
          <>
            <S.Botao onClick={() => setEstaEditando(true)}>Editar</S.Botao>
            <S.BotaoCancelarRemover onClick={() => dispatch(remover(id))}>
              Remover
            </S.BotaoCancelarRemover>
          </>
        )}
      </S.BarraAcoes>
    </S.Card>
  )
}

export default Tarefa
