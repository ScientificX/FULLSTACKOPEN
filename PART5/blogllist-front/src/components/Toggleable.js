import React, {useState} from 'react'
import PropTypes from 'prop-types'


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


Toggleable.propTypes = {
	buttonLabel: PropTypes.string.isRequired
  }

Toggleable.displayName = 'Toggleable'


export default Toggleable