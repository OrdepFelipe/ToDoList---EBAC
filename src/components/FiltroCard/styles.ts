import styled from 'styled-components'

/*
  No index temos três propriedades, no entanto no arquivo de estilo somente a props ativo
  é utilizada. Sendo assim, para evitar erros utilizamos o Omit, onde passamos as props
  que não iremos utilizar.
*/

type Props = {
  ativo: boolean
}

type PropsSemLegendaEContador = Omit<
  Props,
  'contador' | 'legenda' | 'criterio' | 'valor'
>

export const Card = styled.div<PropsSemLegendaEContador>`
  padding: 8px;
  border: 1px solid ${(props) => (props.ativo ? '#1E90FF' : '#a1a1a1')};
  background-color: ${(props) => (props.ativo ? '#fff' : '#fcfcfc')};
  color: ${(props) => (props.ativo ? '#1E90FF' : '#5e5e5e')};
  border-radius: 8px;
  cursor: pointer;
`

export const Contador = styled.span`
  font-weight: bold;
  font-size: 24px;
  display: block;
`

export const Label = styled.span`
  font-size: 14px;
`
