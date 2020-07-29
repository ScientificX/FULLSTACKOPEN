import React, { useState } from 'react'



const useField = (type) => {
    const [value, setValue] = useState('')

    const reset = (event) => {
        setValue("")
    }

    const bind  = {
        value,
        onChange: e => {
            setValue(e.target.value)
        }
    }


    return [value, bind, type, reset]
}


export default useField