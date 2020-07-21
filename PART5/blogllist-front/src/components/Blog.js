import React, { useState } from "react";
import blogService from '../services/blogs'

const Blog = ({ blog, handleDeletes, setCurrBlog }) => {
  const [view, setView] = useState(false);
  const [deletes, setDeletes] = useState()
  const [likes, setLikes] = useState(0);

  

  const likeHandle = async () => {
    setLikes(likes + 1);

    const obj = {
      likes: likes,
      author: blog.author,
      title: blog.title,
      url:	blog.url,
    };
	await blogService.update(obj, blog.id);
	
  };
  var j
  const handleDelete = () => {
	if (j = window.confirm("Do you really want to delete?")){
    setCurrBlog(blog.id)
    console.log(blog.id)
		handleDeletes(blog.id)
	}
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };
  const details = () => {
    return (
      <div>
        <p>{blog.title}</p>
        <p>{blog.author}</p>
        <button onClick={() => setView(!view)}> unview </button>
		<button onClick={likeHandle} id='like-btn' >like</button>
		<button onClick={handleDelete} id='delete-btn' >delete</button>
      </div>
    );
  };

  return (
    <div style={blogStyle}>
      {view ? (
        details()
      ) : (
        <p>
          {blog.title} <button onClick={() => setView(!view)}>view</button>{" "}
        </p>
      )}
    </div>
  );
};

export default Blog;
