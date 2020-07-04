// const palindrome = (string) => {
//     return string
//       .split('')
//       .reverse()
//       .join('')
//   }

//   const average = (array) => {
//     const reducer = (sum, item) => {
//       return sum + item
//     }

//     return array.length ===  0 ? 0 : array.reduce(reducer, 0) / array.length
//   }

//   module.exports = {
//     palindrome,
//     average,
//   }

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





  // var blogCount = 0;
  // var count = 0;
  
  // for ( var i = 0; i < blogs.length; i++){
  //   blogCount = Math.max(blogCount, blogs.filter( blog => blog.author === blogs[i].author).length )
  //   count = i;
  // }
  // const profile = {
  //   "Author": `${blogs[count].author}`,
  //   "blogs": `${blogCount}`
  // }
}

// const mostLikes = (blogs) => {
  
//   var maxlike = 0;
//   var index = 0;
//   for (var i =0; i < blogs.length; i++){
//     const authorBlogs = blogs.filter(blog => blog.author === blogs[i].author)
//     const numberOfLikes = (sum, item) => {
//       return sum + item.likes;
//     }
//     maxlike = Math.max(maxlike, authorBlogs.reduce(numberOfLikes,0))
//   }

// }


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
};
