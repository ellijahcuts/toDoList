import {AppRootStateType} from "./store";
import {Provider} from "react-redux";
import React from "react";
import {v1} from "uuid";
import {combineReducers, createStore} from "redux";
import {tasksReducer} from "./Tasks-Reducer";
import {toDoListsReducer} from "./ToDoLists-Reducer";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolist: toDoListsReducer
})

const initialGlobalState = {
    todolist: [
        {id: "todoList_ID1", title: "What to learn", filter: "all"},
        {id: "todoList_ID2", title: "What to buy", filter: "all"}
    ] ,
    tasks: {
        ["todoList_ID1"]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true}
        ],
        ["todoList_ID2"]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "React Book", isDone: true}
        ]
    }
};

export const storyBookStore = createStore(rootReducer, initialGlobalState as AppRootStateType);

export const ReduxStoreProviderDecorator = (storyFn: any) => (
    <Provider
        store={storyBookStore}>{storyFn()}
    </Provider>)
