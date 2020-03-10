import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
const Test = () => {
  const [clicks, setClicks] = useState({left: 0 , right: 0})

  const handleLeft = () => {
    const newClick = {
      left: clicks.left + 1,
      right: clicks.right

    }
    setClicks(newClick)
  }


  const handleRight = () => {
      const newClick = {
        left: clicks.left,
        right: clicks.right +1

      }
      setClicks(newClick)
    }
    return(
      <>
        <div>

          {clicks.left}
          <button onClick={handleLeft}> left </button>
          {clicks.right}
          <button onClick={handleRight}> right </button>
        </div>

      </>
    )
}

ReactDOM.render(<Test />, document.getElementById('root'));

