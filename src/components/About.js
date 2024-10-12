import React from "react";
import UserClass from "./UserClasse";

class About extends React.Component {
  constructor() {
    super();

    console.log("Parent Constructor");
  }
  componentDidMount() {
    console.log("Parent CDM");
  }
  render() {
    console.log("Parent Render");
    return (
      <div className="mt-20 px-6">
        <h1>About Us </h1>
        <UserClass />
      </div>
    );
  }
}
export default About;
