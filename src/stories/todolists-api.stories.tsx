import React, {useEffect, useState} from 'react'
import axios from "axios";
import {todolistAPI} from "../api/todolist-api";

export default {
    title: 'API'
}

const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': '4206485e-0290-4078-a67d-87761ec4f1b5'
    },
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.getTodolist()
            .then((res) => {
                setState(res.data);
            })
    }, [])
    return <div> {JSON.stringify(state)}</div>
}


export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.addTodolist("TRAIN")
            .then((res) => {
                setState(res.data);
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = "9c2d42e9-f15a-40a9-ae07-e8b078c962be";
        todolistAPI.deleteTodolist(todolistId)
            .then((res) => {
                setState(res.data);
            })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = "a784f870-84d3-486f-82fc-51840718e26b"
        todolistAPI.updateTodolist(todolistId, "AHAHHAHAAHAH")
            .then((res) => {
                setState(res.data)
            })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const GetTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = "b47a9a46-0de9-4413-8f99-5354a3c65ef5";
        todolistAPI.getTask(todolistId)
            .then((res) => {
                setState(res.data);
            })
    }, [])
    return <div> {JSON.stringify(state)}</div>
}


export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = "b47a9a46-0de9-4413-8f99-5354a3c65ef5";
        todolistAPI.addTask(todolistId, "React")
            .then((res) => {
                setState(res.data);
            })
    }, [])
    return <div> {JSON.stringify(state)}</div>
}

export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = "b47a9a46-0de9-4413-8f99-5354a3c65ef5";
        const taskId ="c27d5c42-ff6b-42b2-adde-47d9a5fb9f32"
        todolistAPI.deleteTask(todolistId, taskId)
            .then((res) => {
                setState(res.data);
            })

    }, [])
    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = "b47a9a46-0de9-4413-8f99-5354a3c65ef5";
        const taskId ="c27d5c42-ff6b-42b2-adde-47d9a5fb9f32"
        todolistAPI.updateTask(todolistId,taskId, "AHAHHAHAAHAH")
            .then((res) => {
                setState(res.data)
            })

    }, [])
    return <div> {JSON.stringify(state)}</div>
}
