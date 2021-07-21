import {TaskStateType} from "../App";
import {v1} from "uuid";
import {AddTodoListAT, RemoveTodoListAT} from "./ToDoLists-Reducer";

const REMOVE_TASK = 'REMOVE-TASK'
const ADD_TASK = 'ADD-TASK'
const CHANGE_STATUS_TASK = 'CHANGE-STATUS-TASK'
const CHANGE_TASK_TITLE = 'CHANGE-TASK-TITLE'

export type AddTaskAT = {
    type: 'ADD-TASK'
    title: string
    todoList_ID: string

}
export type RemoveTaskAT = {
    type: 'REMOVE-TASK'
    taskID: string
    todoList_ID: string

}
export type ChangeStatusTaskAT = {
    type: 'CHANGE-STATUS-TASK'
    taskID: string
    isDone: boolean
    todoList_ID: string
}
export type ChangeTaskTitleAT = {
    type: 'CHANGE-TASK-TITLE'
    taskID: string
    title: string
    todoList_ID: string
}


export type ActionsType = AddTaskAT | RemoveTaskAT | ChangeStatusTaskAT | ChangeTaskTitleAT | AddTodoListAT | RemoveTodoListAT

export const tasksReducer = (state: TaskStateType, action: ActionsType) => {
    switch (action.type) {
        case ADD_TASK: {
            const newTask = {id: v1(), title: action.title, isDone: false};
            return {...state, [action.todoList_ID]: [newTask, ...state[action.todoList_ID]]}
        }
        case REMOVE_TASK: {
            return {...state, [action.todoList_ID]: [...state[action.todoList_ID].filter(t => t.id !== action.taskID)]}
        }
        case CHANGE_STATUS_TASK: {
            return {
                ...state, [action.todoList_ID]: [...state[action.todoList_ID]
                    .map(t => t.id === action.taskID ? {...t, isDone: action.isDone} : t)]
            }
        }
        case CHANGE_TASK_TITLE: {
            return {
                ...state, [action.todoList_ID]: [...state[action.todoList_ID]
                    .map(t => t.id === action.taskID ? {...t, title: action.title} : t)]
            }
        }
        case 'ADD-TODOLIST':{
            return {...state, [action.todoList_ID]: []}
        }
        case 'REMOVE-TODOLIST':{
            let copyState={...state}
            delete copyState[action.todoList_ID]
            return copyState
        }
        default:
            throw new Error("i don't understand this type")
    }
}

export const addTaskAC = (title: string, todoList_ID: string): AddTaskAT => {
    return {type: ADD_TASK, title, todoList_ID}
}

export const removeTaskAC = (taskID: string, todoList_ID: string): RemoveTaskAT => {
    return {type: REMOVE_TASK, taskID, todoList_ID}
}
export const changeStatusTaskAC = (taskID: string, isDone: boolean, todoList_ID: string): ChangeStatusTaskAT => {
    return {type: CHANGE_STATUS_TASK, taskID, isDone, todoList_ID}
}
export const changeTaskTitleAC = (taskID: string, title: string, todoList_ID: string): ChangeTaskTitleAT => {
    return {type: CHANGE_TASK_TITLE, taskID, title, todoList_ID}
}

