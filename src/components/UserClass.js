import React from "react";

class UserClass extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      userInfo : {
        login : "Dummy",
        location : "Default"
      }
    };

    //console.log("Child constructor");
  }

  async componentDidMount(){
    //console.log("Child Component Did Mount");

    const data = await fetch("https://api.github.com/users/gharesagar");
    const json = await data.json();

    this.setState({
      userInfo : json
    })
    
    console.log(json);
  }

  componentDidUpdate(){
    console.log("Component Did Update");
  }

  componentWillUnmount() {
    console.log("Component Will Unmount");
  }

  render() {
    //console.log("Child render");

    const { login, location, avatar_url } = this.state.userInfo;

    return (
      <div className="user-card">
        <img src= {avatar_url} />
        <h2>Name: {login}</h2>
        <h2>Location: {location}</h2>
        <h4>Contact: @SagarGhare</h4>
      </div>
    );
  }
}

export default UserClass;
