import React from "react";

class UserClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: {
        name: "Dummy",
        location: "Kolkata",
        avatar_url: "dummy.photo.com",
        bio: "Dummy bio here",
      },
    };
    console.log("Child Constructor");
  }

  async componentDidMount() {
    // Fetching data from GitHub API
    const data = await fetch("https://api.github.com/users/prabhash1475");
    const json = await data.json();

    // Updating the state with fetched user info
    this.setState({
      userInfo: json,
    });
    console.log(json.bio);
  }

  componentWillUnmount() {
    console.log("Unmount");
  }

  render() {
    console.log("Child Render");
    const { name, location, avatar_url, bio } = this.state.userInfo;

    return (
      <div className="user-card max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden my-6">
        <img
          className="w-32 h-32 mx-auto mt-6 rounded-full"
          src={avatar_url}
          alt={name}
        />
        <div className="p-6 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Name: {name}
          </h2>
          <h3 className="text-lg text-gray-600 mb-2">
            Bio: {bio ? bio : "No bio available"}
          </h3>
          <h4 className="text-md text-gray-600 mb-2">Location: {location}</h4>
          <h4 className="text-md text-gray-600 mb-4">Contact: @pk1475</h4>
        </div>
      </div>
    );
  }
}

export default UserClass;
