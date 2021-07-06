import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {IconButton, TextField} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";

type AddItemFormPropsType={
    addItem: (title:string) => void
}

export function AddItemForm(props:AddItemFormPropsType) {
    const [title, setTitle] = useState("")
    let [error, setError] = useState<boolean>(false)
    const errorMessage = 'Title is required!'


    const addItem = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            props.addItem(trimmedTitle);
            setTitle("");
        }
        setError(true)
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(false)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(false)
        if (e.key === 'Enter') {
            addItem();
        }
    }
    return (
        <div>
            <TextField
                value={title}
                size={"small"}
                color={"primary"}
                label={"Enter the title"}
                variant={"outlined"}
                helperText={error && errorMessage}
                error={error}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
            />
            <IconButton
                size={"small"}
                color={"primary"}
                onClick={addItem}><AddBox fontSize={"large"}/></IconButton>
        </div>
    )
}
