const mongoose = require("mongoose");
require("express-async-errors");
const supertest = require("supertest");
const app = require("../app");
require("express-async-errors");
const api = supertest(app);

test(" test get req", async () => {
  const initialNote = await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("post method", async () => {
  const noLike = {
    title: "tabeu",
    author: "Twerpk",
    url: "https://bloglist--scientificx.repl.co/api/blogs",
  };

  const response1 = await api.get("/api/blogs");
  const initialNote = response1.body;
  const tcase = {
    title: "dsfasd",
    author: "asasf",
    url: "asdsd",
    likes: 33,
  };

  await api.post("/api/blogs").send(tcase).expect(201);

  const response = await api.get("/api/blogs");
  const filtered = response.body.map((x) => x.title);

  expect(filtered).toContain("dsfasd");

  expect(response.body.length).toBe(initialNote.length + 1);

  //usage expect(response.data.likes).toBe(object that was sent)
});
test("likes property", async () => {
  const ob = {
    author: "john",
    title: "asdf",
    url: "sadfasd",
  };
  api.post("/api/blogs").send(ob).expect(201);
  const gets = await api.get("/api/blogs");
  const filtered = gets.body.filter(x => x.author === "john")


  expect(filtered.likes).toBeDefined()
});

test("id ", async () => {
  const response = await api.get("/api/blogs");

  expect(response.body[4].id).toBeDefined();
});

afterAll(() => {
  mongoose.connection.close();
});
