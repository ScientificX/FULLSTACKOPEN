const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./test_helper')

const api = supertest(app)

describe('Blog api test', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    await User.deleteMany({})

    const user = {
      username: 'admin',
      name: 'admin',
      password: 'admin',
    }

    const response = await api
      .post('/api/users')
      .send(user)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogObject = helper.initialBlogs.map(
      (blog) => new Blog({ ...blog, user: response.body.id })
    )
    const promiseArray = blogObject.map((blog) => blog.save())
    await Promise.all(promiseArray)
  })

  test('Returns correct amount of blog post in JSON', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('Verifies the uid is id not _id', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
  })

  test('Blog creates succesfully', async () => {
    const login = await api
      .post('/api/login')
      .send({ username: 'admin', password: 'admin' })
      .expect(200)

    const newBlog = new Blog({
      title: 'Type wars',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
      likes: 2,
    })

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', `Bearer ${login.body.token}`)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.allBlogs()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const titles = blogsAtEnd.map((b) => b.title)
    expect(titles).toContain('Type wars')
  })

  test('default value of likes equals 0', async () => {
    const login = await api
      .post('/api/login')
      .send({ username: 'admin', password: 'admin' })
      .expect(200)

    const newBlog = new Blog({
      title: 'TDD harms architecture',
      author: 'test',
      url:
        'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    })

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', `Bearer ${login.body.token}`)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.allBlogs()
    const blog = blogsAtEnd.filter((b) => b.author === 'test')
    expect(blog[0].likes).toBeDefined()
  })

  test('if title or url are missing return 400', async () => {
    const login = await api
      .post('/api/login')
      .send({ username: 'admin', password: 'admin' })
      .expect(200)

    const newBlog = new Blog({
      author: 'Robert C. Martin',
      likes: 10,
    })
    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', `Bearer ${login.body.token}`)
      .expect(400)
  })

  test('deleted blog deletes successfully and returns 204', async () => {
    const login = await api
      .post('/api/login')
      .send({ username: 'admin', password: 'admin' })
      .expect(200)

    const blogsAtStart = await helper.allBlogs()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `Bearer ${login.body.token}`)
      .expect(204)

    const blogsAtEnd = await helper.allBlogs()

    expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1)
  })

  test('updated blog updates successfully and returns 200', async () => {
    const blogsAtStart = await helper.allBlogs()
    const blogToUpdate = blogsAtStart[0]

    const updatedBlog = await api
      .put(`/api/blogs/${blogToUpdate.id}`, {
        likes: 50,
      })
      .expect(200)

    expect(blogToUpdate.likes).not.toEqual(updatedBlog.likes)
  })
})

describe('User api test', () => {
  beforeEach(async () => {
    await User.deleteMany({})
    const passwordHash = await bcrypt.hash('password', 10)
    const user = new User({ username: 'root', passwordHash })
    await user.save()
  })

  test('Invalid users are not created', async () => {
    const userWithNoUsername = {
      password: 'test123',
    }
    await api.post('/api/users').send(userWithNoUsername).expect(400)
    expect((await helper.allUsers()).length).toEqual(1)

    const userWithNoPassword = {
      username: 'test',
    }
    await api.post('/api/users').send(userWithNoPassword).expect(400)
    expect((await helper.allUsers()).length).toEqual(1)

    const userWithShortUsername = {
      username: 'to',
      password: 'test123',
    }
    await api.post('/api/users').send(userWithShortUsername).expect(400)
    expect((await helper.allUsers()).length).toEqual(1)

    const userWithShortPassword = {
      username: 'test',
      password: 't1',
    }
    await api.post('/api/users').send(userWithShortPassword).expect(400)
    expect((await helper.allUsers()).length).toEqual(1)
  })

  test('Invalid user operation is not successful', async () => {
    const existingUser = {
      username: 'root',
      password: 'password',
    }

    await api.post('/api/users').send(existingUser).expect(400)
    expect((await helper.allUsers()).length).toEqual(1)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
