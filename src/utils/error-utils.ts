import {setAppErrorAC, setAppErrorAT, setAppStatusAC, setAppStatusAT} from "../app/app-reducer";
import {Dispatch} from "redux";
import {ResponseType} from "../api/todolists-api";

export const handleServerNetworkError = (dispatch: Dispatch<ErrorUtilsActionType>, message: string) => {
    dispatch(setAppErrorAC(message))
    dispatch(setAppStatusAC("failed"))
}

export const handleServerAppError = <T>(data: ResponseType<T>, dispatch: Dispatch<ErrorUtilsActionType>)=>{
    if (data.messages.length){
        dispatch(setAppErrorAC(data.messages[0]))
    }else{
        dispatch(setAppErrorAC('random error'))
    }
    dispatch(setAppStatusAC('failed'))
}


type ErrorUtilsActionType = setAppStatusAT | setAppErrorAT
