import React, {useState} from 'react'


const BlogForm = ({handleNewBlog}) => {

  const [author, setAuthor] = useState('')
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [likes, setLikes] = useState(null)

  const createBlog = (event) => {
    event.preventDefault()

    handleNewBlog({
      likes,
      title: title,
      author: author,
      url: url,
    })

  }
  

    return (
      <div>
      <form onSubmit={createBlog}>
        <div>
          <h1>Blogs</h1>
          Title 
          <input
          type="text"
          value={title}
          name="Title"
          onChange = {({target}) => setTitle(target.value)}
          />
        </div>
        <div>
          Author: 
          <input
          type="text"
          value={author}
          name="Author"
          onChange= {({target}) => setAuthor(target.value)}
          />
        </div>
        <div>
        Url: 
        <input
        type="text"
        value={url}
        name="Url"
        onChange= {({target}) => setUrl(target.value)}
        />
      </div>
        <button type="submit">Create</button>

      </form>
        
       </div>
    )
  }

export default BlogForm