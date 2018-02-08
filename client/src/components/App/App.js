import React, { Component } from 'react';
import './App.css';
import io from 'socket.io-client';
import RoomList from './../RoomList/RoomList';


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
        <RoomList></RoomList>
      </div>
    );
  }
}

export default App;

