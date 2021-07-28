import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from "./components/ItemForm/AddItemForm";
import {EditableSpan} from "./components/EditableSpan/EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {useSelector} from "react-redux";
import {AppRootStateType} from "./store/store";
import {ToDoListType} from "./AppWithRedux";

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
    changeTodoListTitle: (title: string, todoList_ID: string) => void
}

export function Todolist(props: PropsType) {

    //const todo = useSelector<AppRootStateType, ToDoListType>(state=>state.todolist.filter(todo=>todo.id=== props.todoList_ID)[0])
   //const todoTask = useSelector<AppRootStateType, Array<TaskType>>(state=>state.tasks[props.todoList_ID])

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
    const changeTodolistTitle = (title: string) => {
        props.changeTodoListTitle(title, props.todoList_ID)
    }


    return <div>
        <h2><EditableSpan title={props.title} changeTitle={changeTodolistTitle}/>
            <IconButton
                size={"small"}
                color={"primary"}
                onClick={onClickRemoveTodoList}><Delete style={{color: "black"}}/></IconButton></h2>
        <AddItemForm addItem={addTask}/>
        <ul style={{listStyle: "none",paddingLeft: "0"}}>
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
                        <Checkbox
                            size={"small"}
                            color={"default"}
                            checked={t.isDone}
                            onChange={isDoneHandler}
                        />
                        <span>
                        <EditableSpan title={t.title} changeTitle={changeTaskTitleHandler}/>
                        </span>
                        <IconButton
                            onClick={onClickHandler}
                            size={"small"}
                            color={"primary"}
                        ><Delete style={{color: "black"}} fontSize={"small"}/></IconButton>
                    </li>
                })
            }
        </ul>
        <div>
            <Button
                size={"small"}
                variant={"contained"}
                color={props.filter === 'all' ? "primary" : "default"}
                onClick={onAllClickHandler}>All
            </Button>
            <Button
                style={{margin: "0 4px"}}
                size={"small"}
                variant={"contained"}
                color={props.filter === 'active' ? "primary" : "default"}
                onClick={onActiveClickHandler}>Active
            </Button>
            <Button
                size={"small"}
                variant={"contained"}
                color={props.filter === 'completed' ? "primary" : "default"}
                onClick={onCompleteClickHandler}>Completed
            </Button>
        </div>
    </div>
}

