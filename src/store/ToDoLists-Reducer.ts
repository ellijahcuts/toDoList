import {FilterValuesType, ToDoListType} from "../App";
import {v1} from "uuid";

export type RemoveTodoListAT = {
    type: 'REMOVE-TODOLIST'
    todoList_ID: string
}
export type AddTodoListAT = {
    type: 'ADD-TODOLIST'
    title: string
    todoList_ID:string
}

export type ChangeTodoListTitleAT = {
    type: 'CHANGE-TODO-TITLE'
    title: string
    todoList_ID: string
}

export type ChangeTodoListFilterAT = {
    type: 'CHANGE-TODO-FILTER'
    value: FilterValuesType
    todoList_ID: string
}


export type ActionsType = RemoveTodoListAT | AddTodoListAT | ChangeTodoListTitleAT | ChangeTodoListFilterAT


export const toDoListsReducer = (todoLists: Array<ToDoListType>, action: ActionsType): Array<ToDoListType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return todoLists.filter(tl => tl.id !== action.todoList_ID)
        case 'ADD-TODOLIST':
            const newTodoList: ToDoListType = {
                id: action.todoList_ID,
                title: action.title,
                filter: "all"
            }
            return [...todoLists, newTodoList]
        case 'CHANGE-TODO-TITLE':
            const todolist = todoLists.find(tl => tl.id === action.todoList_ID);
            if (todolist) {
                todolist.title = action.title;
            }
            return [...todoLists]
        case 'CHANGE-TODO-FILTER':
            return todoLists.map(tl => tl.id === action.todoList_ID ? {...tl, filter: action.value} : tl)
        default:
            return todoLists
    }
}

export const RemoveTodoListAC = (todoList_ID: string): RemoveTodoListAT => {
    return {type: 'REMOVE-TODOLIST', todoList_ID: todoList_ID}
}

export const AddTodoListAC = (title:string): AddTodoListAT => {
    return {type: 'ADD-TODOLIST', title:title, todoList_ID:v1()}
}
export const ChangeTodoTitleAC =(title: string,todoList_ID: string): ChangeTodoListTitleAT =>{
    return {type: 'CHANGE-TODO-TITLE',title:title,todoList_ID: todoList_ID}
}
export const ChangeTodoFilterAC = (todoList_ID: string, value:FilterValuesType): ChangeTodoListFilterAT=>{
    return {type:'CHANGE-TODO-FILTER', todoList_ID:todoList_ID, value:value}
}
