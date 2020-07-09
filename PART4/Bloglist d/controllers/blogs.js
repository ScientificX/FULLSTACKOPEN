const blogRouter = require("express").Router();
const Blog = require("../models/blog");
const jwt = require('jsonwebtoken')

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')){
    return authorization.substring(7)
  }
  return null
}

blogRouter.get("/api/blogs", async (request, response) => {
  const blogs = await Blog.find({}).populate('author');
  response.json(blogs);
});

blogRouter.post("/api/blogs", async (request, response) => {
  const r = request.body;

  const token = getTokenFrom(r)
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!token && !decodedToken){
    response.status(401).json({error: "token invalid or missing"})
  }
  const creator = await findById(decodedToken.id)
  

 
  const blog = new Blog({
    titile: r.title,
    author: r.title,
    likes: r.likes || 0,
    url: "ashkjhasdf.com",
    user: creator._id,
  });



  if (!r.title && !r.url) {
    response.status(400);
  } else {
    const savedBlog = await blog.save();
    response.status(201).json(savedBlog);
  }
});


blogRouter.delete("/api/blogs/:id", async (request, response) => {
  const r = request.body
  const token = getTokenFrom(r)
  const decodedToken = jwt.verify(token, process.env.SECRET)
  const decodedId = decodedToken.id

  if (!token || !decodedToken || request.params.id !== decodedId){
    response.status(401).json({error: "trying to delete unauthed resource"})
  }
  
  const id = request.params.id;
  await Blog.findByIdAndDelete(id);
  response.status(204).end();
});

blogRouter.put("api/blogs/:id", async (request, response) => {
  const body = request.body;
  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  };

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {new: true})
  response.status(204).json(updatedBlog)

});


module.exports = blogRouter;
