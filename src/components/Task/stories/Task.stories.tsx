import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {action} from "@storybook/addon-actions";
import {Task} from "../Task";

const changeTaskStatusCallback = action('Change Task Status')
const changeTaskTitleCallback = action('Change Task Title')
const removeTaskCallback = action('Task Remove')

export default {
    title: 'Todolist/Task',
    component: Task,
    args:{
        changeTaskStatus:changeTaskStatusCallback,
        changeTaskTitle:changeTaskTitleCallback,
        removeTask:removeTaskCallback
    }
} as ComponentMeta<typeof Task>;



const Template: ComponentStory<typeof Task> = (args) => <Task {...args} />;

export const TaskIsDone = Template.bind({})
TaskIsDone.args = {
    task: {id: '1', isDone: true, title: 'REDUX'},
    todoList_ID: 'todo1'
}
export const TaskIsNotDone = Template.bind({})
TaskIsNotDone.args = {
    task: {id: '1', isDone: false, title: 'JS'},
    todoList_ID: 'todo1'
}
