import React from "react";

const Form = ({ form, filter, change0, change2, change1, number, clean }) => {
  return (
    <form onSubmit={form}>
      Filter shown with <input value={filter} onChange={change0} />
      <hr />
      name: <input value={clean} onChange={change1} />
      <br></br>
      number: <input value={number} onChange={change2} />
      <button type="submit">Add</button>
    </form>
  );
};

export default Form;
