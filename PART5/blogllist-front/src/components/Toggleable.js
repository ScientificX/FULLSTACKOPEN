import React, {useState} from 'react'


const Toggleable = (props) => {

	const [visible, setVisible] = useState(false)


	const hideWhenVisible = {display: visible ? 'none' : ''}
	const showWhenVisible = {display: visible ? '' : 'none'}


	const toggleVisibilty = () => {
			setVisible(!visible)
	}


return (
	<>

	<div style={showWhenVisible}  >
	<button onClick={toggleVisibilty} > {props.buttonLabel} </button>
	</div>
	<div style={hideWhenVisible} >
	{props.children}
	<button onClick={toggleVisibilty} > Cancel </button>
	</div>

	</>
	)
	
}


export default Toggleable