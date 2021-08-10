import React, {ChangeEvent, useCallback} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from "./components/ItemForm/AddItemForm";
import {EditableSpan} from "./components/EditableSpan/EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {Task} from "./Task";
import {TaskWithDispatch} from "./TaskWithDispatch";


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

export const Todolist = React.memo(function (props: PropsType) {
    console.log('Todolist')
    //const todo = useSelector<AppRootStateType, ToDoListType>(state=>state.todolist.filter(todo=>todo.id=== props.todoList_ID)[0])
    //const todoTask = useSelector<AppRootStateType, Array<TaskType>>(state=>state.tasks[props.todoList_ID])

    const addTask = useCallback((title: string) => {
        if (title) {
            props.addTask(title, props.todoList_ID);
        }
    }, [props.addTask, props.todoList_ID])
    const onClickRemoveTodoList = () => {
        props.removeTodoList(props.todoList_ID)
    }
    const onAllClickHandler = useCallback(() => {
        props.changeTodoListFilter("all", props.todoList_ID)
    }, [props.changeTodoListFilter, props.todoList_ID])
    const onActiveClickHandler = useCallback(() => {
        props.changeTodoListFilter("active", props.todoList_ID)
    }, [props.changeTodoListFilter, props.todoList_ID])
    const onCompleteClickHandler = useCallback(() => {
        props.changeTodoListFilter("completed", props.todoList_ID)
    }, [props.changeTodoListFilter, props.todoList_ID])


    const changeTodolistTitle = useCallback((title: string) => {
        props.changeTodoListTitle(title, props.todoList_ID)
    }, [props.changeTodoListTitle, props.todoList_ID])

    let allTodoListTasks = props.tasks
    let tasksForTodolist = allTodoListTasks

    if (props.filter === "active") {
        tasksForTodolist = allTodoListTasks.filter(t => t.isDone === false);
    }
    if (props.filter === "completed") {
        tasksForTodolist = allTodoListTasks.filter(t => t.isDone === true);
    }


    return <div>
        <h2><EditableSpan title={props.title} changeTitle={changeTodolistTitle}/>
            <IconButton
                size={"small"}
                color={"primary"}
                onClick={onClickRemoveTodoList}><Delete style={{color: "black"}}/></IconButton></h2>
        <AddItemForm addItem={addTask}/>
        <ul style={{listStyle: "none", paddingLeft: "0"}}>
            {
                tasksForTodolist.map(t => {
                    return <TaskWithDispatch key={t.id} todoList_ID={props.todoList_ID} task={t}/>
                    /*<Task key={t.id}
                                 task={t}
                                 todoList_ID={props.todoList_ID}
                                 removeTask={props.removeTask}
                                 changeTaskTitle={props.changeTaskTitle}
                                 changeTaskStatus={props.changeTaskStatus}
                    />*/
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
})

