import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from "./components/ItemForm/AddItemForm";
import {EditableSpan} from "./components/EditableSpan/EditableSpan";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    todoList_ID: string
    tasks: Array<TaskType>
    removeTask: (taskID: string, todoList_ID: string) => void
    changeTodoListFilter: (value: FilterValuesType, todoList_ID: string) => void
    addTask: (title: string, todoList_ID: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todoList_ID: string) => void
    removeTodoList: (todoList_ID: string) => void
    filter: FilterValuesType
    changeTaskTitle: (taskID: string, title: string, todoList_ID: string) => void
    changeTodoListTitle: (title: string, todoList_ID: string)=>void
}

export function Todolist(props: PropsType) {


    const addTask = (title: string) => {
        if (title) {
            props.addTask(title, props.todoList_ID);
        }
    }
    const onClickRemoveTodoList = () => {
        props.removeTodoList(props.todoList_ID)
    }
    const onAllClickHandler = () => {
        props.changeTodoListFilter("all", props.todoList_ID)
    }
    const onActiveClickHandler = () => {
        props.changeTodoListFilter("active", props.todoList_ID)
    }
    const onCompleteClickHandler = () => {
        props.changeTodoListFilter("completed", props.todoList_ID)
    }
    const changeTodolistTitle=(title:string)=>{
        props.changeTodoListTitle(title, props.todoList_ID)
    }


    return <div>
        <h3><EditableSpan title={props.title} changeTitle={changeTodolistTitle}/></h3>
        <button onClick={onClickRemoveTodoList}>Delete this TodoList</button>
        <hr/>
        <AddItemForm addItem={addTask}/>
        <ul>
            {
                props.tasks.map(t => {

                    const onClickHandler = () => props.removeTask(t.id, props.todoList_ID)
                    const isDoneHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(t.id, e.currentTarget.checked, props.todoList_ID)
                    }
                    const changeTaskTitleHandler = (title: string) => {
                        props.changeTaskTitle(t.id, title, props.todoList_ID)
                    }


                    return <li key={t.id} className={t.isDone ? 'isDone' : ''}>
                        <input type="checkbox" checked={t.isDone} onChange={isDoneHandler}/>
                        <EditableSpan title={t.title} changeTitle={changeTaskTitleHandler}/>
                        <button onClick={onClickHandler}>x</button>
                    </li>
                })
            }
        </ul>
        <div>
            <button className={props.filter === 'all' ? "activeFilter" : ""}
                    onClick={onAllClickHandler}>All
            </button>
            <button className={props.filter === 'active' ? "activeFilter" : ""}
                    onClick={onActiveClickHandler}>Active
            </button>
            <button className={props.filter === 'completed' ? "activeFilter" : ""}
                    onClick={onCompleteClickHandler}>Completed
            </button>
        </div>
    </div>
}

