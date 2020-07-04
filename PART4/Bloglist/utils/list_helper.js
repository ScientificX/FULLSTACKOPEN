

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  const numberOfLikes = (sum, item) => {
    return sum + item.likes;
  };
  return blogs.length === 0 ? 0 : blogs.reduce(numberOfLikes, 0);
};

const favouriteBlog = (blogs) => {
  const k = 0;

  for (blog of blogs) {
    k = Math.max(k, blog.likes);
  }
  const index = blogs.findIndex((blog) => blog.likes === k);
  return blogs.length === 0 ? 0 : blogs[index] ;
};


const mostBlogs = (blogs) => {

  var authors = blogs.reduce((acc, curr) => {
    acc[curr.author] = (acc[curr.author] || 0) + 1
    return acc
  }, {})
  authors = Object.entries(authors).map(([author,blogs]) => ({author, blogs}))

  var k = 0;
  for (x of authors) {
    k = Math.max(k, x.blogs);
  }
  const index = authors.findIndex((x) => x.blogs === k);

  return authors.length === 0 ? 0 : authors[index] ;

}

const mostLikes = (blogs) =>{

  var authors = blogs.reduce((acc, curr) => {
    acc[curr.author] = (acc[curr.author] || 0) + (curr.likes || 0);
    return acc;
  }, {});
  

  authors = Object.entries(authors).map(([author,likes]) => ({author, likes}))
  var k = 0;
  for (author of authors) {
    k = Math.max(k, author.likes);
  }
  const index = authors.findIndex((author) => author.likes === k);

  return authors.length === 0 ? 0 : authors[index] ;

}



module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostLikes,
  mostBlogs,
};
