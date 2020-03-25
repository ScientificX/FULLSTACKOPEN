import React from "react";

const Form = ({ form, filter, change0 }) => {
  return (
    <form onSubmit={form}>
      Find Countries <input value={filter} onChange={change0} />
      <hr />
      
    </form>
  );
};

export default Form;
