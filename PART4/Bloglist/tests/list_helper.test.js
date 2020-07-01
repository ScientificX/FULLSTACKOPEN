const listHelper = require('../utils/list_helper').dummy

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper(blogs)
  expect(result).toBe(1)
})