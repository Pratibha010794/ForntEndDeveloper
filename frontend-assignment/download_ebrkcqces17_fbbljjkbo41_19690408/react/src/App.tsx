import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <button onClick={this.resetCommentFeed}>Reset comment feed</button>
      </div>
    );
  }

  private resetCommentFeed = () => {
    fetch('/api/reset-comments', {
      method: 'post'
    });
  }
}

export default App;
