import { configureStore } from '@reduxjs/toolkit'
import tarefasRedurcers from './redurcers/tarefas'
import filtroRedurcers from './redurcers/filtro'

const store = configureStore({
  reducer: {
    tarefas: tarefasRedurcers,
    filtro: filtroRedurcers
  }
})

export type RootReducer = ReturnType<typeof store.getState>
export default store
