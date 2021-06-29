import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

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
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(false)
        if (e.key === 'Enter') {
            addItem();
        }
    }
    return (
        <div>
            <input value={title}
                   className={error ? 'error' : ''}
                   style={error? {border: "3px solid red"} : {}}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
            />
            <button onClick={addItem}>+</button>
            {error && <div className={error ? errorMessage : ''}>{error}</div>}
        </div>
    )
}
