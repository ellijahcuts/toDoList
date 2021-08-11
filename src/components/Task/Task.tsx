import React, {ChangeEvent} from 'react';
import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import {Delete} from "@material-ui/icons";
import {TaskType} from "../../Todolist";

type TaskPropsType = {
    todoList_ID: string
    task: TaskType
    changeTaskStatus: (id: string, isDone: boolean, todoList_ID: string) => void
    changeTaskTitle: (taskID: string, title: string, todoList_ID: string) => void
    removeTask: (taskID: string, todoList_ID: string) => void
}




export const Task = React.memo((props: TaskPropsType) => {
    console.log("Task")
    const isDoneHandler = (e: ChangeEvent<HTMLInputElement>) => {
        props.changeTaskStatus(props.task.id, e.currentTarget.checked, props.todoList_ID)
    }
    const onClickHandler = () => props.removeTask(props.task.id, props.todoList_ID)

    const changeTaskTitleHandler = (title: string) => {
        props.changeTaskTitle(props.task.id, title, props.todoList_ID)
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


