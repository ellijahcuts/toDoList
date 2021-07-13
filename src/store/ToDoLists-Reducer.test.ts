import {ChangeTodoListFilterAT, ChangeTodoListTitleAT, toDoListsReducer} from './todolists-reducer';
import {v1} from 'uuid';
import {FilterValuesType, ToDoListType} from '../App';

test('correct todolist should be removed', () => {
    let todoList_ID1 = v1();
    let todoList_ID2 = v1();

    const startState: Array<ToDoListType> = [
        {id: todoList_ID1, title: "What to learn", filter: "all"},
        {id: todoList_ID2, title: "What to buy", filter: "all"}
    ]

    const endState = toDoListsReducer(startState, { type: 'REMOVE-TODOLIST', todoList_ID: todoList_ID1})

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

    const endState = toDoListsReducer(startState, { type: 'ADD-TODOLIST', title: newTodolistTitle})

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

    const action:ChangeTodoListTitleAT = {
        type:"CHANGE-TODO-TITLE",
        todoList_ID: todoList_ID2,
        title: newTodolistTitle}

    const endState = toDoListsReducer(startState,action);

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

    const action:ChangeTodoListFilterAT = {
        type: "CHANGE-TODO-FILTER",
        todoList_ID: todoList_ID2,
        value: newFilter
    };

    const endState = toDoListsReducer(startState, action);

    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);
});
