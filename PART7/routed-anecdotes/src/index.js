import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import App from './App'




export const useField = (type) => {
    const [value, setValue] = useState('')

    const onChange = (e) => {
     setValue(e.target.value)   
    }


    return {
        type,
        value,
        onChange
    }

}


ReactDOM.render( <BrowserRouter> <App /> </BrowserRouter> , document.getElementById('root'))