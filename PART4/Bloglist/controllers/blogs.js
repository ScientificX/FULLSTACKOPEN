const blogRouter = require("express").Router();
const Blog = require("../models/blog");

blogRouter.get("/api/blogs", async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

blogRouter.post("/api/blogs", async (request, response) => {
  const r = request.body;
  const blog = new Blog({
    titile: r.title,
    author: r.title,
    likes: r.likes || 0,
    url: "ashkjhasdf.com",
  });

  if (!r.title && !r.url) {
    response.status(400);
  } else {
    const savedBlog = await blog.save();
    response.status(201).json(savedBlog);
  }
});

blogRouter.delete("/api/blogs/:id", async (request, response) => {
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
