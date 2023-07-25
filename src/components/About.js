import { Component } from "react";
import User from "./User";
import UserClass from "./UserClass";


class About extends Component {
  constructor(){
    super();
    //console.log("Parent constructor");
  }

  componentDidMount(){
    //console.log("Parent Component Did Mount");
  }

  render(){
    //console.log("Parent render");
    return (
      <div>
        <h1>About class Component</h1>
        <h2>This is Namaste React Web Series</h2>
        <UserClass name = {"Sagar ghare (class)"} location = {"Mumbai (class)"}/>
      </div>
    )
  }
}


export default About;