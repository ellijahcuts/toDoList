import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';

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
    taskStatus: (id: string, isDone: boolean, todoList_ID: string) => void
    removeTodoList: (todoList_ID: string) => void
    filter: FilterValuesType
}

export function Todolist(props: PropsType) {

    let [title, setTitle] = useState("")
    let [error, setError] = useState<null | string>(null)

    const addTask = () => {
        if (title) {
            props.addTask(title, props.todoList_ID);
            setTitle("");
        } else {
            setError('Title is required')
        }
    }


    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.key === 'Enter') {
            addTask();
        }
    }
    const onClickFilterHandler = (filterValue: FilterValuesType) => {
        props.changeTodoListFilter(filterValue, props.todoList_ID)
    }
    const onClickRemoveTodoList = ()=> {props.removeTodoList(props.todoList_ID)}

    return <div>
        <h3>{props.title}</h3>
        <button onClick={onClickRemoveTodoList}>Delete this TodoList</button>
        <hr/>
        <div>
            <input value={title}
                   className={error ? 'error' : ''}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
            />
            <button onClick={addTask}>+</button>
            {error && <div className={error ? 'errorMessage' : ''}>{error}</div>}
        </div>
        <ul>
            {
                props.tasks.map(t => {

                    const onClickHandler = () => props.removeTask(t.id, props.todoList_ID)
                    const isDoneHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.taskStatus(t.id, e.currentTarget.checked, props.todoList_ID)
                    }

                    return <li key={t.id}>
                        <input type="checkbox" checked={t.isDone} onChange={isDoneHandler}/>
                        <span className={t.isDone ? 'isDone' : ''}>{t.title}</span>
                        <button onClick={onClickHandler}>x</button>
                    </li>
                })
            }
        </ul>
        <div>
            <button className={props.filter === 'all' ? "activeFilter" : ""}
                    onClick={() => onClickFilterHandler('all')}>All
            </button>
            <button className={props.filter === 'active' ? "activeFilter" : ""}
                    onClick={() => onClickFilterHandler('active')}>Active
            </button>
            <button className={props.filter === 'completed' ? "activeFilter" : ""}
                    onClick={() => onClickFilterHandler('completed')}>Completed
            </button>
        </div>
    </div>
}
