import {tasksReducer} from "./Tasks-Reducer";
import {toDoListsReducer} from "./ToDoLists-Reducer";
import { combineReducers, createStore } from "redux";


const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolist: toDoListsReducer
})

export const store = createStore(rootReducer)

export type AppRootStateType = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store
