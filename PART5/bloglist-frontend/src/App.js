import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import Notification from './components/Notification'
import blogService from "./services/blogs";
import loginService from "./services/login"

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })
      blogService.setToken(user.token)
      window.localStorage.setItem(
        'loggeduser', JSON.stringify(user)
      )
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
       setErrorMessage('Invalid Credentials')
       setTimeout( () => {setErrorMessage(null)}, 5000)
    }

  }
    
  const login = () => {
    return (
      <form onSubmit={handleLogin}>
        <div>
          <h1>Login</h1>
          username 
          <input
          type="text"
          value={username}
          name="Username"
          onChange = {({target}) => setUsername(target.value)}
          />
        </div>
        <div>
          Password: 
          <input
          type="text"
          value={password}
          name="Password"
          onChange= {({target}) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    );
  };


  //   const blogForm = () => {
  //   return (
  //     <div>
        
  //     </div>
  //   )
  // }



  return (
    <div>
      <Notification message={errorMessage} />
      {user === null ? 
      login() : 
      <div>
        <p>{user.name} logged in</p>
      </div>
      }

      {user !== null && null}
      <h2>Blogs</h2>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
