import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import BlogForm from "./components/BlogForm"
import Notification from './components/Notification'
import blogService from "./services/blogs";
import loginService from "./services/login"

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null)
  const [loginVisible, setLoginVisible] = useState(false)

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);
  
  useEffect(() => {
    const loggeduser = window.localStorage.getItem('loggeduser')
    if (loggeduser){
      const user = JSON.parse(loggeduser)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

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
      setErrorMessage("Logged in")
      setTimeout(() => {setErrorMessage(null)}, 5000)
      setUsername('')
      setPassword('')
    } catch (exception) {
       setErrorMessage('Invalid Credentials')
       setTimeout( () => {setErrorMessage(null)}, 5000)
    }

  }

  const handleLogout = () => {
  window.localStorage.removeItem('loggeduser')
  setUser(null)
    setErrorMessage("Logged out")
    setTimeout(() => {setErrorMessage(null)}, 5000)
  }
  const handleNewBlog = async (blogObject) => {
  
    const blog = await blogService.create(blogObject)
    // console.log(blog)
    setUrl("")
    setTitle("")
    setAuthor("")

  }

  // const handleBlogCreate = (event) => {
  //   event.preventDefault()

  //   blogService.create()

  // }
const hideWhenVisible = {display: loginVisible ? 'none' : ''}
const showWhenVisible = {display: loginVisible ? '' : 'none'}

    
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





  return (
    <div>
      <Notification message={errorMessage}  />
      {user === null ? 
      login() : 
      <div>
        <p>{user.name} logged in  <button onClick={handleLogout}>logout</button> </p>
      </div>
      }

      {user !== null && 
        <>
        <div style={hideWhenVisible}>
          <button onClick={() => setLoginVisible(true)}>New Blog</button>
        </div>
         <div style={showWhenVisible}>
          <BlogForm handleNewBlog={handleNewBlog} /> 
          <button onClick={() => setLoginVisible(false)}>cancel</button>
        </div>
      </>
      }

      <h2>Blogs</h2>
      {blogs.map( blog => 
        <Blog key={blog.id} blog={blog} />
      )}

    </div>
  );
};

export default App;
