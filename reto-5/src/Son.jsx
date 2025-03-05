import React from "react";
import { memo } from "react";

export const Son = memo(({numero, mostrar}) => {
    console.log('reloaded')

    return(
        <button
            className='btn'
            onClick={() =>{mostrar(numero)}}
        >
            {numero}
        </button>
    )
})