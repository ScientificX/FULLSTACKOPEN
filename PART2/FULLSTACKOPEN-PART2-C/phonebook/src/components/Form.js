import React from "react";

const Form = ({ form, filter, change0, change1, clean }) => {
  return (
    <form onSubmit={form}>
      Find Countries <input value={filter} onChange={change0} />
      <hr />
      name: <input value={clean} onChange={change1} />
      <br></br>
      
      <button type="submit">Add</button>
    </form>
  );
};

export default Form;
