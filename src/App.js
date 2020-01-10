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
        <div className="add-desktop">
          <div className="add-task">
            <h1>Got a new task to do?</h1>
            <input type="text"/>
            <div className="important">
              <h2>Is it important?</h2>
              <div>
                <p><span id="yesBtn">Yes</span> / <span id="noBtn">No</span></p>
              </div>
            </div>
            <button id="addBtn">Add task</button>
          </div>
          <div id="search-desktop"><input type="text" placeholder="Search for certain task"/></div>
        </div>
        <div id="search-mobile"><i className="fas fa-search"></i></div>
        <div className="tasks">
          <div className="undone">
            <h3>Remaining tasks</h3>
            <ul style={{listStyle: 'none'}}>
              <li>
                <span>{tasks[0].description}</span><span id="doneBtn">Done</span>
              </li>
              <li>
                <span>{tasks[1].description}</span><span id="doneBtn">Done</span>
              </li>
            </ul>
            </div>
          <div className="done">
          <h3>Accomplished tasks</h3>
            <ul style={{listStyle: 'none'}}>
              <li>
                <span className="doneTask">{tasks[2].description}</span><span id="undoBtn">Undo</span>
              </li>
            </ul>
            <div id="clearBtn">Clear</div>
          </div>
        </div>
      </div>
    )
  }
}

export default App;
