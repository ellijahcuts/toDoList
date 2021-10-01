import {addTodolistAC} from "../features/TodolistsList/todolists-reducer";
import {stat} from "fs";

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type ErrorMessageType = string | null

const initialState = {
    status: 'loading' as RequestStatusType,
    error: null as ErrorMessageType
}

type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        default:
            return state
    }
}
export type setAppStatusAT = ReturnType<typeof setAppStatusAC>;
export type setAppErrorAT =  ReturnType<typeof setAppErrorAC>;
type ActionsType = setAppStatusAT | setAppErrorAT

export const setAppStatusAC = (status: RequestStatusType) =>
    ({type: 'APP/SET-STATUS', status} as const)
export const setAppErrorAC = (error: ErrorMessageType) =>
    ({type: 'APP/SET-ERROR', error} as const)
