import React, {ChangeEvent} from 'react';
import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "./components/EditableSpan/EditableSpan";
import {Delete} from "@material-ui/icons";
import {TaskType} from "./Todolist";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store/store";
import {changeStatusTaskAC, changeTaskTitleAC, removeTaskAC} from "./store/Tasks-Reducer";

type TaskPropsType = {
    todoList_ID: string
    task: TaskType
}


export const TaskWithDispatch = React.memo((props: TaskPropsType) => {
    console.log("TaskWithDispatch")

    const task = useSelector<AppRootStateType, TaskType>(state => state.tasks[props.todoList_ID]
        .filter(task => task.id === props.task.id)[0])

    const dispatch = useDispatch()

    const isDoneHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const action = changeStatusTaskAC(props.task.id, e.currentTarget.checked, props.todoList_ID)
        dispatch(action)
    }
    const onClickHandler = () => {
        const action = removeTaskAC(props.task.id, props.todoList_ID)
        dispatch(action)
    }
    const changeTaskTitleHandler = (title: string) => {
        const action = changeTaskTitleAC(props.task.id, title, props.todoList_ID)
        dispatch(action)
    }

    return (
        <li key={props.task.id} className={props.task.isDone ? 'isDone' : ''}>
            <Checkbox
                size={"small"}
                color={"default"}
                checked={props.task.isDone}
                onChange={isDoneHandler}
            />
            <span>
                        <EditableSpan title={props.task.title} changeTitle={changeTaskTitleHandler}/>
                        </span>
            <IconButton
                onClick={onClickHandler}
                size={"small"}
                color={"primary"}
            ><Delete style={{color: "black"}} fontSize={"small"}/></IconButton>
        </li>
    )
})


