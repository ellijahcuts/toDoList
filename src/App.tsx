import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';

export type FilterValuesType = "all" | "active" | "completed";

export type ToDoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TaskStateType = {
    [key: string]: Array<TaskType>
}

function App() {
    const todoList_ID1 = v1()
    const todoList_ID2 = v1()
    const [todoLists, setTodoLists] = useState<Array<ToDoListType>>([
        {id: todoList_ID1, title: "What to learn", filter: "all"},
        {id: todoList_ID2, title: "What to buy", filter: "all"}
    ])
    const [tasks, setTasks] = useState<TaskStateType>({
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
        tasks[todoList_ID] = tasks[todoList_ID].map(t => {
            if (t.id === taskID) {
                return {...t, isDone: isDone}
            }
            return t
        })
        setTasks({...tasks})
    }

    function removeTask(taskID: string, todoList_ID: string) {
        tasks[todoList_ID] = tasks[todoList_ID].filter(t => t.id !== taskID);
        setTasks({...tasks})
    }

    function addTask(title: string, todoList_ID: string) {
        const newTask = {id: v1(), title: title, isDone: false};
        tasks[todoList_ID] = [newTask, ...tasks[todoList_ID]];
        setTasks({...tasks});
    }

    function changeTodoListFilter(value: FilterValuesType, todoList_ID: string) {
        setTodoLists(todoLists.map(tl => tl.id === todoList_ID ? {...tl, filter: value} : tl))
    }

    function removeTodoList(todoList_ID: string) {
        setTodoLists(todoLists.filter(tl => tl.id !== todoList_ID))
        delete tasks[todoList_ID]
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
            <div className="App">
                <Todolist
                    todoList_ID={tl.id}
                    title={tl.title}
                    filter={tl.filter}
                    tasks={tasksForTodolist}
                    removeTask={removeTask}
                    changeTodoListFilter={changeTodoListFilter}
                    addTask={addTask}
                    taskStatus={changeTaskStatus}
                    removeTodoList={removeTodoList}
                />
            </div>
        );
    })
    return (
        <div className="App">
            {todoListsComponents}
        </div>)

}

export default App;
