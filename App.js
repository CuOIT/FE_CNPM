import logo from './logo.svg';
import './App.css';
import React, { Component } from 'react';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "Hello World",
      color: "#000000",
    };
  };

  changeName = () => {
    this.setState({
      name: "TÔI LÀ TRỊNH VĂN KỶ!!!!",
      color: "#FF0000",
    })
  };

  render() {
    return (
      <div>
        <h2>
          <font color={this.state.color}> {this.state.name} 
          </font>
          <br></br>
          <button type="button" onClick={this.changeName}>Submit</button>
        </h2>
        
      </div>
    );
  };
};


export default App;
