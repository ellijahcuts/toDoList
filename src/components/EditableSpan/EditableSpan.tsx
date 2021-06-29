import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type EditableSpanPropsType = {
    title: string
    changeTitle: (title: string) => void
}

export function EditableSpan(props: EditableSpanPropsType) {
    const [editMode, setEditMode] = useState<boolean>(false)
    const [title, setTitle] = useState<string>(props.title)


    const onEditMode = () => {
        setEditMode(true)
    }
    const offEditMode = () => {
        if (title) {
            props.changeTitle(title)
        }
        setEditMode(false)
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onEnterKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            offEditMode();
        }
    }


    return (
        editMode
            ? <input
                autoFocus
                value={title}
                onBlur={offEditMode}
                onChange={onChangeHandler}
                onKeyPress={onEnterKeyPress}/>
            : <span onDoubleClick={onEditMode}>{props.title}</span>
    )
}
