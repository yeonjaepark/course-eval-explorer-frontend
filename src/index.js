// change require to es6 import style
import $ from 'jquery';
import React from 'react';
// import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './style.scss';

const App = () => <div className="test">All the REACT are belong to us!</div>;

// class App extends Component {
//   render() {
//     return (<div className="test">All the REACT are belong to us!</div>);
//   }
// }

ReactDOM.render(<App />, document.getElementById('main'));

let num = 0;
setInterval(() => {
  $('#main').html(`You've been on this page for ${num} seconds.`);
  num += 1;
}, 1000);
