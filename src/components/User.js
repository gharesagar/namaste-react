import { useState } from "react";

const User = ({name}) => {
  const [count] = useState(0);

  return (
    <div className="user-card">
      <h1>Count = {count}</h1>
      <h2>Name: {name}</h2>
      <h2>Location: Mumbai</h2>
      <h4>Contact: @SagarGhare</h4>
    </div>
  )
}

export default User;