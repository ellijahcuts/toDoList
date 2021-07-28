import React, {useReducer, useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from "./components/ItemForm/AddItemForm";
import {AppBar, Toolbar, Button, IconButton, Typography, Grid, Container, Paper} from "@material-ui/core";
import {List, Menu} from "@material-ui/icons";
import {
    AddTodoListAC,
    ChangeTodoFilterAC,
    ChangeTodoTitleAC,
    RemoveTodoListAC,
    toDoListsReducer
} from "./store/ToDoLists-Reducer";
import {addTaskAC, changeStatusTaskAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./store/Tasks-Reducer";

export type FilterValuesType = "all" | "active" | "completed";

export type ToDoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TaskStateType = {
    [key: string]: Array<TaskType>
}


function AppWithReducers() {
    const todoList_ID1 = v1()
    const todoList_ID2 = v1()

    const [todoLists, dispatchToTodoLists] = useReducer(toDoListsReducer,[
        {id: todoList_ID1, title: "What to learn", filter: "all"},
        {id: todoList_ID2, title: "What to buy", filter: "all"}
    ])
    const [tasks, dispatchToTasks] = useReducer(tasksReducer,{
            [todoList_ID1]: [
                {id: v1(), title: "HTML&CSS", isDone: true},
                {id: v1(), title: "JS", isDone: true},
                {id: v1(), title: "ReactJS", isDone: false},
                {id: v1(), title: "Rest API", isDone: false},
                {id: v1(), title: "GraphQL", isDone: false},
            ],
            [todoList_ID2]: [
                {id: v1(), title: "Bike", isDone: true},
                {id: v1(), title: "Car", isDone: true},
                {id: v1(), title: "Iphone 13 pro", isDone: false},
                {id: v1(), title: "BTC-bitcoin", isDone: false},
                {id: v1(), title: "license for WebStorm", isDone: false},
            ],
        }
    )


    function changeTaskStatus(taskID: string, isDone: boolean, todoList_ID: string) {
        const action = changeStatusTaskAC(taskID, isDone, todoList_ID)
        dispatchToTasks(action)
    }

    function changeTaskTitle(taskID: string, title: string, todoList_ID: string) {
        const action = changeTaskTitleAC(taskID, title, todoList_ID)
        dispatchToTasks(action)
    }

    function changeTodoListTitle(title: string, todoList_ID: string) {
        const action = ChangeTodoTitleAC(title, todoList_ID)
        dispatchToTodoLists(action)
    }

    function removeTask(taskID: string, todoList_ID: string) {
        const action = removeTaskAC(taskID,todoList_ID)
        dispatchToTasks(action)
    }

    function addTask(title: string, todoList_ID: string) {
        const action = addTaskAC(title,todoList_ID)
        dispatchToTasks(action)
    }

    function addTodoList(title: string) {
        const action = AddTodoListAC(title)
        dispatchToTodoLists(action)
        dispatchToTasks(action)
    }

    function changeTodoListFilter(value: FilterValuesType, todoList_ID: string) {
        const action = ChangeTodoFilterAC(todoList_ID,value)
        dispatchToTodoLists(action)
    }

    function removeTodoList(todoList_ID: string) {
        const action = RemoveTodoListAC(todoList_ID)
        dispatchToTodoLists(action)
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

export default AppWithReducers;

