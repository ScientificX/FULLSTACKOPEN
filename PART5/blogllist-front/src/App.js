import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import BlogForm from "./components/BlogForm"
import Notification from './components/Notification'
import Toggleable from './components/Toggleable'
import blogService from "./services/blogs";
import loginService from "./services/login"

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [currBLog, setCurrBlog] = useState(null)
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null)
  const [loginVisible, setLoginVisible] = useState(false)
  const [deletes, setDeletes] = useState(false)

  useEffect(() => {
    blogService.getAll().then((blogs) => { 
      // console.log(blogs) 
      setBlogs(blogs)});
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
      console.log(user)
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

  const handleDeletes = async (id) => {
    console.log(id)
    await blogService.deletes(id)
    const updatedBlogs = await blogService.getAll()
    setBlogs(updatedBlogs)
  }



  // const handleBlogCreate = (event) => {
  //   event.preventDefault()

  //   blogService.create()

  // }
    
  const login = () => {

    
    return (
      <>
      <form onSubmit={handleLogin} id='loginform' >
        <div>
          <h1>Login</h1>
          username 
          <input
          id='username'
          type="text"
          value={username}
          name="Username"
          onChange = {({target}) => setUsername(target.value)}
          />
        </div>
        <div>
          Password: 
          <input
          id='password'
          type="password"
          value={password}
          name="Password"
          onChange= {({target}) => setPassword(target.value)}
          />
        </div>
        <button type="submit" id='loginform' >login</button>
      </form>
      </>
    );
  };



  return (
    <div>
      <Notification message={errorMessage}  />
      {user === null ? 
      login() :
      <div>
        <p>{user.username} logged in  <button onClick={handleLogout}>logout</button> </p>
      </div>
      }

      {user !== null && 
        <Toggleable buttonLabel="New Blog" >
        <BlogForm handleNewBlog={handleNewBlog} />
        </Toggleable>
        }

      <h2>Blogs</h2>
      {blogs.map( blog =>      
        <Blog key={blog.id} blog={blog} handleDeletes={handleDeletes} setCurrBlog={setCurrBlog}  />
      )}

    </div>
  );
};

export default App;
