import anecdoteService from "../services/anecdote";

const anecdotesAtStart = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};

const initialState = anecdotesAtStart.map(asObject);

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "VOTE":
      const id = action.data.id;
      const voteAnecdote = state.find((a) => a.id === id);
      const votedAnecdote = {
        ...voteAnecdote,
        votes: voteAnecdote.votes + 1,
      };
      return state.map((a) => (a.id === id ? votedAnecdote : a));
    case "CREATE":
      const newAnecdote = action.data;
      return state.concat(newAnecdote);
    case "INI_NOTES":
      return action.data;

    default:
      // console.log("state now: ", state);
      // console.log("action", action);
      return state;
  }
};

export const voteAction = (id) => {
  return async (dispatch) =>  {
    let toVote = await anecdoteService.getAll()
    console.log(toVote)
    toVote = toVote.map( a => a.id === id ? ++a.id : a)
    await anecdoteService.voteNow(toVote)
    console.log(toVote)
    dispatch(
      {
        type: "VOTE",
        data: { id },
       }
    )

  };
};

export const createAnecdote = (anecdote) => {
  return async (dispatch) => {
    await anecdoteService.createNew(anecdote);
    // console.log(anecdote)
    dispatch({
      type: "CREATE",
      data: {
        content: anecdote,
        id: getId(),
        votes: 0,
      },
    });
  };
};

export const initializeAnecdotes = (init) => {
  return async (dispatch) => {
    const storedAnecdote = init ? init : await anecdoteService.getAll();
    console.log('STORED ANECDOTES', typeof storedAnecdote, storedAnecdote)
    dispatch({
      type: "INI_NOTES",
      data: storedAnecdote,
    });
  };
};



export default reducer;
