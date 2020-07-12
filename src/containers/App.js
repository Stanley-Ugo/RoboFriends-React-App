import React, { Component } from "react";
import CardList from "../components/CardList";
import SearchBox from "../components/SearchBox";
import Scroll from '../components/Scroll';
import './App.css';

class App extends Component {
  // eslint-disable-next-line no-useless-constructor
  constructor() {
    super();
    this.state = {
      robots: [],
      searchfield: "",
    };
  }

  componentDidMount(){
    fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(users => {this.setState({robots: users})});
  }

  onSearchChange = (event) => {
    this.setState({ searchfield: event.target.value });
  };
  render() {
    const { robots, searchfield } = this.state;
    const filteredRobots = robots.filter((robots) => {
      return robots.name
        .toLowerCase()
        .includes(searchfield.toLowerCase());
    });
    return !robots.length ? 
      <h1>Loading</h1> :
      (
        <div className="tc">
          <h1 className="f1">RobotFriends</h1>
          <SearchBox searchChange={this.onSearchChange} />
          <Scroll>
           <CardList robots={filteredRobots} />
          </Scroll>
        </div>
      );
  }
}

export default App;
