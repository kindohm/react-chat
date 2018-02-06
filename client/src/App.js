import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import io from 'socket.io-client';

class App extends Component {

  componentDidMount() {

    this.make({ name: "pete" });
    this.search();
    this.message();
  }

  message() {
    const socket = io({
      path: '/chat'
    }).connect('/');

    socket.on('news', function (data) {
      console.log(data);
      socket.emit('my other event', { my: 'data' });
    });

  }

  make(data) {
    fetch('/api/rooms', {
      method: 'POST', // or 'PUT'
      body: JSON.stringify(data),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    }).then(res => res.json()).then(json => console.log("post response", json))
    .catch(err => console.error("error", err));;
  }

  search() {

    return fetch(`/api/rooms`, {
      accept: 'application/json',
    }).then((response) => {
      return response.json();
    }).then(json => {
      console.log("/api/rooms", json);
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;

