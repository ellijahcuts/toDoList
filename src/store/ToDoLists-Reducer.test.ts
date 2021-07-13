import {
    AddTodoListAC, ChangeTodoFilterAC,
    ChangeTodoListFilterAT,
    ChangeTodoListTitleAT, ChangeTodoTitleAC,
    RemoveTodoListAC,
    toDoListsReducer
} from './todolists-reducer';
import {v1} from 'uuid';
import {FilterValuesType, ToDoListType} from '../App';

test('correct todolist should be removed', () => {
    let todoList_ID1 = v1();
    let todoList_ID2 = v1();

    const startState: Array<ToDoListType> = [
        {id: todoList_ID1, title: "What to learn", filter: "all"},
        {id: todoList_ID2, title: "What to buy", filter: "all"}
    ]

    const endState = toDoListsReducer(startState, RemoveTodoListAC(todoList_ID1))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todoList_ID2);
    expect(endState[0].title).toBe("What to buy")
});
test('correct todolist should be added', () => {
    let todoList_ID1 = v1();
    let todoList_ID2 = v1();

    let newTodolistTitle = "New Todolist";

    const startState: Array<ToDoListType> = [
        {id: todoList_ID1, title: "What to learn", filter: "all"},
        {id: todoList_ID2, title: "What to buy", filter: "all"}
    ]

    const endState = toDoListsReducer(startState,  AddTodoListAC("New Todolist"))

    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe(newTodolistTitle);
});
test('correct todolist should change its name', () => {
    let todoList_ID1 = v1();
    let todoList_ID2 = v1();

    let newTodolistTitle = "New Todolist";

    const startState: Array<ToDoListType> = [
        {id: todoList_ID1, title: "What to learn", filter: "all"},
        {id: todoList_ID2, title: "What to buy", filter: "all"}
    ]

    const endState = toDoListsReducer(startState,ChangeTodoTitleAC(newTodolistTitle,todoList_ID2));

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
});
test('correct filter of todolist should be changed', () => {
    let todoList_ID1 = v1();
    let todoList_ID2 = v1();

    let newFilter: FilterValuesType = "completed";

    const startState: Array<ToDoListType> = [
        {id: todoList_ID1, title: "What to learn", filter: "all"},
        {id: todoList_ID2, title: "What to buy", filter: "all"}
    ]

    const endState = toDoListsReducer(startState, ChangeTodoFilterAC(todoList_ID2,newFilter));

    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);
});
