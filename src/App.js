import React, {Component} from 'react'
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      data: null,
      tasks: [
        {"id": 1, "description": "Clean up the apartment"},
        {"id": 2, "description": "Do shopping"},
        {"id": 3, "description": "Take the dog for a walk"}
      ],
    }
  }
  componentDidMount(){
    console.log(this.state.tasks)
  }
  render(){
    const {tasks} = this.state;
    return(
      <div id="container">
        <div className="add-task">
          <h1>Got a new task to do?</h1>
          <input type="text"/>
          <div className="important">
            <h2>Is it important?</h2>
            <span className="yes">Yes</span>
            <span className="no">No</span>
          </div>
          <button className="addBtn">Add task</button>
        </div>
        <div className="search">
          <input type="text" placeholder="Search for certain task"/>
        </div>
        <div className="tasks">
          <div className="undone">
            <h3>Remaining tasks</h3>
            <ul>
              <li>{tasks[0].description}</li>
              <li>{tasks[1].description}</li>
            </ul>
            </div>
          <div className="done">
          <h3>Accomplished tasks</h3>
            <ul>
              <li>{tasks[2].description}</li>
              <div className="clearBtn">Clear</div>
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default App;
