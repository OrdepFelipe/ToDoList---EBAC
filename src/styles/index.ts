import styled, { createGlobalStyle } from 'styled-components'
import { Botao } from '../components/Tarefa/styles'
import variaveis from './variaveis'

const EstiloGlobal = createGlobalStyle`
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: Roboto, sans-serif;
    list-style: none;

}
`
export const Container = styled.div`
  display: grid;
  grid-template-columns: 224px auto; // Com auto dizemos qua a coluna ocupará todo o espaço disponível
`
export const MainContainer = styled.main`
  padding: 40px;
  height: 100vh;
  overflow-y: scroll;
`

export const Titulo = styled.h2`
  display: block;
  margin-top: 40px;
  margin-bottom: 40px;
  font-size: 18px;
  font-weight: bold;
`
export const Campo = styled.input`
  font-size: 14px;
  font-weight: bold;
  padding: 8px;
  background-color: #fff;
  border: 1px solid #666666;
  border-radius: 8px;
  width: 100%;
  height: 32px;
`

export const BotaoSalvar = styled(Botao)`
  background-color: ${variaveis.verde};
`
export const BotaoVoltar = styled.button`
  font-size: 12px;
  font-weight: bold;
  color: #ffffff;
  padding: 8px 12px;
  border: none;
  cursor: pointer;
  border-radius: 8px;
  background-color: #2f3640;
  margin-right: 8px;
`

export default EstiloGlobal
