import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

export interface TodoState{
    id:number,
    name:string,
    completed:boolean
}

const initialState: TodoState[] = [
    {
        id:1,
        name:'Первое задание',
        completed:false
    },
    {
        id:2,
        name:'Второе задание',
        completed:false
    }
]

export const todoSlice = createSlice({
    name:'todo',
    initialState,
    reducers:{
        addTodo: (state, action: PayloadAction<TodoState>) => {
            const newTodo = {
                id:action.payload.id,
                name:action.payload.name,
                completed:false
            }
            state.push(newTodo)
        },
        deleteTodo: (state, action: PayloadAction<number>) => {
            const del = state.find(todo => todo.id === action.payload)
            if (del){
                return state.filter(f => f.id !== action.payload)
            }
        },
        toggleStatus: (state, action: PayloadAction<{id:number, completed:boolean}>) =>{
            const index = state.findIndex(todo => todo.id === action.payload.id)
            state[index].completed = action.payload.completed
        },
        updateTodo: (state, action: PayloadAction<{id:number,name:string}>) => {
            const {id, name} = action.payload
            const editTodo = state.find(t => t.id == id)
            if (editTodo){
                editTodo.name = name
            }
        },
    }
})

export const {addTodo, deleteTodo, toggleStatus, updateTodo} = todoSlice.actions

export const selectTodo = (state: RootState) => state.todos
export default todoSlice.reducer