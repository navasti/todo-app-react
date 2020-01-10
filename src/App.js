import React, {Component} from 'react'
import './App.css';

class App extends Component {
  state={
      tasks: [
        {id: 1, description: "Clean up the apartment"},
        {id: 2, description: "Do shopping"},
        {id: 3, description: "Take the dog for a walk"}
      ],
      searchValue: "",
      addValue: "",
      isImportant: null,
      mobileSearchValue: "",
  }

  handleAddInput = e =>{
    const addValue = e.target.value;
    this.setState({addValue});
  }
  handleSearchInput = e => {
    const searchValue = e.target.value.toLowerCase();
    this.setState({searchValue});
    this.searchingForTask(searchValue)
  }
  handleMobileSearch = e => {
    const mobileSearchValue = e.target.value.toLowerCase();
    this.setState({mobileSearchValue});
    this.searchingForTask(mobileSearchValue);
  }
  
  handleAddButton = () => {
    const ul = document.getElementById('undone-ul');
    const liText = this.state.addValue;
    const li = document.createElement('li');
    const yesBtn = document.getElementById('yesBtn');
    const noBtn = document.getElementById('noBtn');
    if(this.state.isImportant === null || this.state.addValue === ""){
      return alert('Input and important fields required');
    }else if(this.state.isImportant === true){
      if(liText.length >= 1 && liText!==""){
        const uppercase = liText[0].toUpperCase() + liText.slice(1);
        li.innerHTML = `<span><i class="far fa-star"></i>${uppercase}</span><span class="doneBtn">Done</span>`;
        ul.appendChild(li);
        yesBtn.style.color = "white";
        this.setState({
          addValue: "",
          isImportant: null,
        });
      }else return null;
    }else if(this.state.isImportant === false){
      if(liText.length >= 1 && liText!==""){
        const uppercase = liText[0].toUpperCase() + liText.slice(1);
        li.innerHTML = `<span>${uppercase}</span><span class="doneBtn">Done</span>`;
        ul.appendChild(li);
        noBtn.style.color = "white";
        this.setState({
          addValue: "",
          isImportant: null,
        });
      }else return null;
    }
  }
  searchingForTask(value){
    const items = document.querySelectorAll('li');
    let tasks = [...items];
    tasks.forEach(task => task.style.color="white")
    tasks = tasks.filter(li => li.firstChild.textContent.toLowerCase().includes(value))
    tasks.forEach(task=>task.style.color="yellow")
    if(value === "") {
      items.forEach(item=>item.style.color="white")
    }
  }
  colorChange = e => {
    const yesBtn = document.getElementById('yesBtn');
    const noBtn = document.getElementById('noBtn');
    if(e.target.id === yesBtn.id){
      yesBtn.style.color = "green";
      noBtn.style.color = "white";
      this.setState({ isImportant: true })
    }else if(e.target.id === noBtn.id){
      noBtn.style.color = "red";
      yesBtn.style.color = "white";
      this.setState({ isImportant: false })
    }
  }
  doneUndoButtonsChange = () => {
    const doneBtns = document.querySelectorAll('.doneBtn');
    doneBtns.forEach(btn => btn.addEventListener('click', this.flipToDone));
    const undoBtns = document.querySelectorAll('.undoBtn');
    undoBtns.forEach(btn => btn.addEventListener('click', this.flipToUndone));
  }
  flipDoneUndone = e => {
    const undoneUl = document.getElementById('undone-ul');
    const doneUl = document.getElementById('done-ul');
    const target = e.target;
    if(target.className === "doneBtn"){
      target.classList.remove('doneBtn')
      target.classList.add('undoBtn')
      target.innerText = "UNDO";
      const li = target.parentNode;
      li.firstChild.classList.add('doneTask')
      undoneUl.removeChild(li);
      doneUl.appendChild(li);
    }else if(target.className === "undoBtn"){
      target.classList.remove('undoBtn')
      target.classList.add('doneBtn')
      target.innerText = "DONE";
      const li = target.parentNode;
      li.firstChild.classList.remove('doneTask')
      doneUl.removeChild(li);
      undoneUl.appendChild(li);
    }
  }
  clearDoneList = () => {
    const doneList = document.getElementById('done-ul');
    doneList.innerHTML = "";
  }
  componentDidMount(){
    const undoneUl = document.getElementById('undone-ul');
    const doneUl = document.getElementById('done-ul');
    undoneUl.addEventListener('click', this.flipDoneUndone)
    doneUl.addEventListener('click', this.flipDoneUndone)
    const searchIcon = document.querySelector('.fa-search');
    const searchField = document.getElementById('search-mobile');
    searchIcon.addEventListener('click', () => searchField.classList.toggle('active'));
  }

  render(){
    const {tasks, searchValue, addValue, mobileSearchValue} = this.state;
    return(
      <div id="container">
        <div className="add-desktop">
          <div className="add-task">
            <h1>Got a new task to do?</h1>
            <input type="text" value={addValue} onChange={this.handleAddInput}/>
            <div className="important">
              <h2>Is it important?</h2>
              <div>
                <p><span onClick={this.colorChange} id="yesBtn">Yes</span> / <span onClick={this.colorChange} id="noBtn">No</span></p>
              </div>
            </div>
            <button onClick={this.handleAddButton} id="addBtn">Add task</button>
          </div>
          <div id="search-desktop"><input type="text" value={searchValue} onChange={this.handleSearchInput} placeholder="Search for undone task"/></div>
        </div>
        <div id="search-mobile"><i className="fas fa-search"></i><input value={mobileSearchValue} onChange={this.handleMobileSearch} id="mobile-input" type="text"/></div>
        <div className="tasks">
          <div className="undone">
            <h3>Remaining tasks</h3>
            <ul id="undone-ul" style={{listStyle: 'none'}}>
              <li>
                <span>{tasks[0].description}</span><span className="doneBtn">Done</span>
              </li>
              <li>
                <span>{tasks[1].description}</span><span className="doneBtn">Done</span>
              </li>
            </ul>
            </div>
          <div className="done">
          <h3>Accomplished tasks</h3>
            <ul id="done-ul" style={{listStyle: 'none'}}>
              <li>
                <span className="doneTask">{tasks[2].description}</span><span className="undoBtn">Undo</span>
              </li>
            </ul>
            <div onClick={this.clearDoneList} id="clearBtn">Clear</div>
          </div>
        </div>
      </div>
    )
  }
}

export default App;
