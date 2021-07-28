import {AddTodoListAC, toDoListsReducer} from "./ToDoLists-Reducer";
import {tasksReducer} from "./Tasks-Reducer";
import {TaskStateType, ToDoListType} from "../App";

let startTasksState: TaskStateType
let startTodolistsState: Array<ToDoListType>
beforeEach(() => {
    startTasksState = {};
    startTodolistsState = [];
})

test('ids should be equals', () => {

    const action = AddTodoListAC("new todolist");

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = toDoListsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].id;

    expect(idFromTasks).toBe(action.todoList_ID);
    expect(idFromTodolists).toBe(action.todoList_ID);
});
