import React from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {AddItemForm} from "./components/ItemForm/AddItemForm";
import {AppBar, Toolbar, Button, IconButton, Typography, Grid, Container, Paper} from "@material-ui/core";
import {List} from "@material-ui/icons";
import {
    AddTodoListAC,
    ChangeTodoFilterAC,
    ChangeTodoTitleAC,
    RemoveTodoListAC,
} from "./store/ToDoLists-Reducer";
import {addTaskAC, changeStatusTaskAC, changeTaskTitleAC, removeTaskAC} from "./store/Tasks-Reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store/store";

export type FilterValuesType = "all" | "active" | "completed";

export type ToDoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TaskStateType = {
    [key: string]: Array<TaskType>
}


function AppWithRedux() {

    let todoLists = useSelector<AppRootStateType,ToDoListType[]>(state=>state.todolist)
    let tasks = useSelector<AppRootStateType,TaskStateType>(state=>state.tasks)

    const dispatch = useDispatch()


    function changeTaskStatus(taskID: string, isDone: boolean, todoList_ID: string) {
        const action = changeStatusTaskAC(taskID, isDone, todoList_ID)
        dispatch(action)
    }

    function changeTaskTitle(taskID: string, title: string, todoList_ID: string) {
        const action = changeTaskTitleAC(taskID, title, todoList_ID)
        dispatch(action)
    }

    function changeTodoListTitle(title: string, todoList_ID: string) {
        const action = ChangeTodoTitleAC(title, todoList_ID)
        dispatch(action)
    }

    function removeTask(taskID: string, todoList_ID: string) {
        const action = removeTaskAC(taskID,todoList_ID)
        dispatch(action)
    }

    function addTask(title: string, todoList_ID: string) {
        const action = addTaskAC(title,todoList_ID)
        dispatch(action)
    }

    function addTodoList(title: string) {
        const action = AddTodoListAC(title)
        dispatch(action)
    }

    function changeTodoListFilter(value: FilterValuesType, todoList_ID: string) {
        const action = ChangeTodoFilterAC(todoList_ID,value)
        dispatch(action)
    }

    function removeTodoList(todoList_ID: string) {
        const action = RemoveTodoListAC(todoList_ID)
        dispatch(action)
    }

    const todoListsComponents = todoLists.map(tl => {
        let tasksForTodolist = tasks[tl.id];

        if (tl.filter === "active") {
            tasksForTodolist = tasks[tl.id].filter(t => t.isDone === false);
        }
        if (tl.filter === "completed") {
            tasksForTodolist = tasks[tl.id].filter(t => t.isDone === true);
        }
        return (
            <Grid item key={tl.id}>
                <Paper style={{background: "#efefef",padding:"20px"}} elevation={10}>
                <Todolist
                    todoList_ID={tl.id}
                    title={tl.title}
                    filter={tl.filter}
                    tasks={tasksForTodolist}
                    removeTask={removeTask}
                    changeTodoListFilter={changeTodoListFilter}
                    addTask={addTask}
                    changeTaskStatus={changeTaskStatus}
                    removeTodoList={removeTodoList}
                    changeTaskTitle={changeTaskTitle}
                    changeTodoListTitle={changeTodoListTitle}
                />
                </Paper>
            </Grid>
        );
    })
    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar style={{justifyContent: "space-between"}}>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <List/>
                    </IconButton>
                    <Typography variant="h6">
                        <h2>ToDoLists</h2>
                    </Typography>
                    <Button
                        variant={"outlined"}
                        color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: "30px 0"}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={2}>
                    {todoListsComponents}
                </Grid>
            </Container>
        </div>)

}

export default AppWithRedux;

