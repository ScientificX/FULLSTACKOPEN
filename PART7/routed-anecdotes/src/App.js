import React, { useState } from "react";
import uuid from 'react-uuid'
import useField from './Hooks'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch,
  useHistory,
} from "react-router-dom";

const Menu = () => {
  const padding = {
    paddingRight: 5,
  };
  return (
    <div>
      <Link to="/anecdotes" style={padding}>
        anecdotes
      </Link>
      <Link to="/create" style={padding}>
        create new
      </Link>
      <Link to="/about" style={padding}>
        about
      </Link>
    </div>
  );
};

const Anecdote = ({ anecdote }) => {
  console.log(anecdote);

  return (
    <div>
      <p> {anecdote.author} </p>
      <p> {anecdote.content} </p>
      <p> {anecdote.info} </p>
      <p> {anecdote.votes} </p>
    </div>
  );
};

const AnecdoteList = ({ anecdotes }) => (
  <div>
    {console.log(anecdotes)}
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map((a) => (
        <li key={a.id}>
          <Link to={`/anecdotes/${a.id}`}>{a.content}</Link>
        </li>
      ))}
    </ul>
  </div>
);

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>
      An anecdote is a brief, revealing account of an individual person or an
      incident. Occasionally humorous, anecdotes differ from jokes because their
      primary purpose is not simply to provoke laughter but to reveal a truth
      more general than the brief tale itself, such as to characterize a person
      by delineating a specific quirk or trait, to communicate an abstract idea
      about a person, place, or thing through the concrete details of a short
      narrative. An anecdote is "a story with a point."
    </em>

    <p>
      Software engineering is full of excellent anecdotes, at this app you can
      find the best and add more.
    </p>
  </div>
);

const Footer = () => (
  <div>
    Anecdote app for{" "}
    <a href="https://courses.helsinki.fi/fi/tkt21009">
      Full Stack -websovelluskehitys
    </a>
    . See{" "}
    <a href="https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js">
      https://github.com/fullstack-hy2019/routed-anecdotes/blob/master/src/App.js
    </a>{" "}
    for the source code.
  </div>
);

const CreateNew = (props) => {
  // const [content, setContent] = useState("");
  // const [author, setAuthor] = useState("");
  // const [info, setInfo] = useState("");

  const [content, setContent, type1, reset1] = useField('text')
  const [author, setAuthor, type2, reset2] = useField('text')
  const [info, setInfo, type3, reset3] = useField('text')

  const history = useHistory()
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('CONTENT FROM CREATE NEW,', content)
    console.log('CONTENT FROM CREATE NEW,', author)
    console.log('CONTENT FROM CREATE NEW,', info)
    
    history.push('/anecdotes')
    const newAnecdote = {
      content,
      author,
      info,
      votes: 0
    }
    props.addNew( newAnecdote );
  };
  const reset = () => {
    reset1()
    reset2()
    reset3()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input
           type={type1}
           value={content}
          {...setContent}
          />
        </div>
        <div>
          author
          <input
           type={type2}
           value={author}
         {...setAuthor}
          />
        </div>
        <div>
          url for more info
          <input
           type={type3}
           value={info}
           {...setInfo}
          />
        </div>
        <button type="submit">create</button>
        <button onClick={reset} type='reset' > reset </button>
      </form>
    </div>
  );
};

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: "If it hurts, do it more often",
      author: "Jez Humble",
      info: "https://martinfowler.com/bliki/FrequencyReducesDifficulty.html",
      votes: 0,
      id:  `${uuid()}`,
    },
    {
      content: "Premature optimization is the root of all evil",
      author: "Donald Knuth",
      info: "http://wiki.c2.com/?PrematureOptimization",
      votes: 0,
      id: `${uuid()}`,
    },
  ]);

  const [notification, setNotification] = useState("");

  const addNew = (anecdote) => {
    anecdote.id = uuid();
    setAnecdotes(anecdotes.concat(anecdote));
    setNotification(`${anecdote.content}`)
    setTimeout(() => setNotification(null), 10000)
  };

  const anecdoteById = (id) => anecdotes.find((a) => a.id === id);

  const vote = (id) => {
    const anecdote = anecdoteById(id);

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1,
    };

    setAnecdotes(anecdotes.map((a) => (a.id === id ? voted : a)));
  };
  const match = useRouteMatch("/anecdotes/:id");
  const anecdote = match
    ? anecdotes.find((x) => x.id === match.params.id)
    : null;
  // console.log(anecdote);
  // console.log(match);
  console.log(notification)
  return (
    <div>
      <h1>Software anecdotes</h1>
      <Menu />
      {notification ? `${notification}` : null}
      <Switch>
        <Route path="/anecdotes/:id">
          <Anecdote anecdote={anecdote} />
        </Route>
        <Route path="/create">
          <CreateNew addNew={addNew} />
        </Route>
        <Route path="/about">
          <About />
        </Route>

        <Route path={"/anecdotes"}>
          <AnecdoteList anecdotes={anecdotes} />
        </Route>
      </Switch>

      <Footer />
    </div>
  );
};

export default App;
