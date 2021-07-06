import React from 'react';

type propsType ={
    callBack:()=>void
    value: string
}

export const ButtonNotUsed = (props:propsType)=>{
    const onClickHandler =()=>{
        props.callBack()
    }
    return (
        <button onClick={onClickHandler}>{props.value}</button>
    )
}

