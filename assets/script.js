const containers = document.querySelectorAll('.container1')
const todoContainer = document.querySelector('.TODO1')
const doingContainer= document.querySelector('.DOING1')
const doneContainer = document.querySelector('.DONE1')
var draggables = document.querySelectorAll('.draggable')
var todo = [];
var doing = [];
var done = [];
let priority = 1;
let description = '';
let created = false;
let tasks1 = [];
let tasks2 = [];
let tasks3 = [];
let data, data2, data3;
if(JSON.parse(localStorage.getItem('LCid')) === null){
  let id = 0;
  localStorage.setItem('LCid', id);
}

window.onload = function(){
  created = false;
  getLocalStorage();
  drag();
}

function changeName(e){
  for (let i = 0; i < todo.length; i++) {
    if(todo[i].id == e.target.dataset.id){
      localStorage.removeItem('todo');
      todo[i].name = e.target.value;
      localStorage.setItem(`todo`, JSON.stringify(todo))
    }   
  }
  for (let i = 0; i < doing.length; i++) {
    if(doing[i].id == e.target.dataset.id){
      localStorage.removeItem('doing');
      doing[i].name = e.target.value;
      localStorage.setItem(`doing`, JSON.stringify(doing))
    }   
  }
  for (let i = 0; i < done.length; i++) {
    if(done[i].id == e.target.dataset.id){
      localStorage.removeItem('done');
      done[i].name = e.target.value;
      localStorage.setItem(`done`, JSON.stringify(done))

    }
  }
}

function onChange(arr, LCarr, toChange, changed){
  localStorage.removeItem(LCarr);
  toChange = changed;

  localStorage.setItem(LCarr, JSON.stringify(arr))
}   

function changePriority(e){
  
  for (let i = 0; i < todo.length; i++) {
    if(todo[i].id == e.target.dataset.id){
      localStorage.removeItem('todo');
      todo[i].priority = parseInt(e.target.value);
      localStorage.setItem(`todo`, JSON.stringify(todo))
    }   
  }
  for (let i = 0; i < doing.length; i++) {
    if(doing[i].id == e.target.dataset.id){
      localStorage.removeItem('doing');
      doing[i].priority = parseInt(e.target.value);
      localStorage.setItem(`doing`, JSON.stringify(doing))
    }   
  }
  for (let i = 0; i < done.length; i++) {
    if(done[i].id == e.target.dataset.id){
      localStorage.removeItem('done');
      done[i].priority = parseInt(e.target.value);
      localStorage.setItem(`done`, JSON.stringify(done))
    }   
  }
  sort();
}

function changeDescription(e){

  for (let i = 0; i < todo.length; i++) {
    if(todo[i].id == e.target.dataset.id){
      localStorage.removeItem('todo');
      todo[i].description = e.target.value;
      localStorage.setItem(`todo`, JSON.stringify(todo))
    }   
  }
  for (let i = 0; i < doing.length; i++) {
    if(doing[i].id == e.target.dataset.id){
      localStorage.removeItem('doing');
      doing[i].description = e.target.value;
      localStorage.setItem(`doing`, JSON.stringify(doing))
    }   
  }
  for (let i = 0; i < done.length; i++) {
    if(done[i].id == e.target.dataset.id){
      localStorage.removeItem('done');
      done[i].description = e.target.value;
      localStorage.setItem(`done`, JSON.stringify(done))
    }   
  }
}

function drag(){
  let current;
  let id1;
  draggables = document.querySelectorAll('.draggable');

  draggables.forEach(draggable => {
    
    draggable.addEventListener('dragstart', e => {
      draggable.classList.add('dragging')
      
      if(e.target.closest('.do__container__draggable')){
        
        id1 = e.target.closest('.do__container__draggable').dataset.id;

        if(e.target.closest('.container').classList.contains('TODO')){
          current = 'TODO';
        }
        else if(e.target.closest('.container').classList.contains('DOING')){
          current = 'DOING'
        }
        else if(e.target.closest('.container').classList.contains('DONE')){
          current = 'DONE'
        }
      }  
    })

    draggable.addEventListener('dragend', () => {
      draggable.classList.remove('dragging')
    })
    
    containers.forEach(container => {

      container.addEventListener('dragover', e => {
        
        e.preventDefault() 
        const draggable = document.querySelector('.dragging')
        container.appendChild(draggable);
        
        ////////////////////////////////////only moving in arrays and LC///////////////////////////
        let temp;
        let id2, temp2;
        draggable.addEventListener('dragend', () => {

          function updateTasks(from, to, LCfrom, LCto, index){

            localStorage.removeItem(LCfrom)
            localStorage.removeItem(LCto)

            temp = from.splice(index, 1);
            temp = temp[0];
            to.push(temp);
            console.log(from)
            console.log(to)
            localStorage.setItem(LCfrom, JSON.stringify(from))
            localStorage.setItem(LCto, JSON.stringify(to))

            localStorage.setItem(`${LCto}Task${id2}`, temp2)
            localStorage.removeItem(`${LCfrom}Task${id2}`)
          }
          todoContainer.ondragend = function(){


            if(current === 'DONE'){

              for (let i = 0; i < done.length; i++) {
                id2 = done[i].id;
                temp2 = localStorage.getItem(`doneTask${id2}`); 

                if(id2 == id1){

                  updateTasks(done, todo, `done`, `todo`, i);
                }                
              } 
            }
            
            else if(current === 'DOING'){

              for (let i = 0; i < doing.length; i++) {
                id2 = doing[i].id;
                temp2 = localStorage.getItem(`doingTask${id2}`); 

                if(id2 == id1){
                  
                  updateTasks(doing, todo, `doing`, `todo`, i);
                }                
              } 
            }
          }

          doingContainer.ondragend = function(){
            
            if(current === 'TODO'){

              for (let i = 0; i < todo.length; i++) {
                id2 = todo[i].id;
                temp2 = localStorage.getItem(`todoTask${id2}`); 
                if(id2 == id1){

                  updateTasks(todo, doing, `todo`, `doing`, i);
                }                
              } 
            }
            
            else if(current === 'DONE'){

              for (let i = 0; i < done.length; i++) {
                id2 = done[i].id;
                temp2 = localStorage.getItem(`doneTask${id2}`); 
                if(id2 == id1){

                  updateTasks(done, doing, `done`, `doing`, i);
                }                
              } 
            }
          }

          doneContainer.ondragend = function(){

            if(current === 'DOING'){

              for (let i = 0; i < doing.length; i++) {
                id2 = doing[i].id;
                temp2 = localStorage.getItem(`doingTask${id2}`); 
                if(id2 == id1){

                  updateTasks(doing, done, `doing`, `done`, i);
                }                
              } 
            }
            else if(current === 'TODO'){

              for (let i = 0; i < todo.length; i++) {
                id2 = todo[i].id;
                temp2 = localStorage.getItem(`todoTask${id2}`); 
                if(id2 == id1){

                  updateTasks(todo, done, `todo`, `done`, i);
                }                
              } 
            }
          }
        })
      })
    })
  })
  _setLocalStorage();
}//drag()


function remove(arr, LCname, eventID, container){

  for (let i = 0; i < arr.length; i++) {

    if(arr[i].id == eventID){

      localStorage.removeItem(`${LCname}Task${arr[i].id}`)
      localStorage.removeItem(LCname, JSON.stringify(arr))
      removed = arr.splice(i,1);
      container.innerHTML = '';
      localStorage.setItem(LCname, JSON.stringify(arr))
    }
  }
}

function fillContainer(container, arr){
  for(let i = 0; i < arr.length; i++){
    container.appendChild(arr[i].task);
  }
}

function del(e){
  
  remove(todo, 'todo', e.target.dataset.id, todoContainer);
  remove(doing, 'doing', e.target.dataset.id, doingContainer);
  remove(done, 'done', e.target.dataset.id, doneContainer);

  fillContainer(todoContainer, todo);
  fillContainer(doingContainer, doing);
  fillContainer(doneContainer, done);
      
}

function sort(){//doingshi da done shi isorteba magram qreba da refreshis mere sort mushaobs drag and dropis gamoyenebamde(gadatanili elementebistvis agar mushaobs)
  
  localStorage.removeItem(`todo`, JSON.stringify(todo))
  localStorage.removeItem(`doing`, JSON.stringify(doing))
  localStorage.removeItem(`done`, JSON.stringify(done))

  todo.sort((a, b) => {
    if(a.priority > b.priority) return -1
    if(b.priority > a.priority) return 1
  })
  doing.sort((a, b) => {
    if(a.priority > b.priority) return -1
    if(b.priority > a.priority) return 1
  })
  console.log(doing)
  done.sort((a, b) => {
    if(a.priority > b.priority) return -1
    if(b.priority > a.priority) return 1
  })

  todoContainer.innerHTML = '';
  doingContainer.innerHTML = '';
  doneContainer.innerHTML = '';
  
  for(let i = 0; i < todo.length; i++){
    todoContainer.appendChild(todo[i].task);
  }
  console.log(todo)
  console.log(doing)
  console.log(done)
  
  for(let i = 0; i <= doing.length-1; i++){
    doingContainer.appendChild(doing[i].task);
    console.log(doing[i])
  }
  for(let i = 0; i < done.length; i++){
    doneContainer.appendChild(done[i].task);
  }
  
  localStorage.setItem(`todo`, JSON.stringify(todo))
  localStorage.setItem(`done`, JSON.stringify(done))
  localStorage.setItem(`doing`, JSON.stringify(doing))
  

  // awful fix and cheating:
  // location.reload();

  // real fix:  \_('_')_/
}

function add(){
  let name;
  
  name = document.querySelector('.do__container__head__input').value;
  let newTask = document.createElement('div');
  
  created = true;
  
  newTask.innerHTML = `
  <div class="do__container__draggable draggable" draggable="true" data-id=${id}>
  
  <div class='do__container__draggable__fix'>
  
  <input onchange='changeName(event)' value='${name}' data-id=${id} class="do__container__draggable__fix__name name" type="text" maxlength="10">
  <input class="do__container__draggable__fix__priority" value='1' data-id=${id} onchange='changePriority(event)' type='number' min='0' max='101'>
  <button data-id=${id} onclick='del(event)' class="do__container__draggable__fix__extendt extend"><img data-id=${id} src='./assets/icons/delete.png'></button>
  
  </div>
  
  <div class="do__container__draggable__more">
  <h3 class="do__container__draggable__more__header">Description</h3>
  <textarea class='do__container__draggable__more__textarea' onchange='changeDescription(event)' data-id=${id} cols="1" rows="3"></textarea>
  </div>
  
  </div>
  `;
  maxID();
  
  todo.push({task: newTask, id: id, name: name, priority: priority, description: description});
  
  fillContainer(todoContainer, todo);
  
  id++;
  drag();

  console.log(document.querySelector('.do__container__head__input'))
  document.querySelector('.do__container__head__input').value = '';
  
}///////////////////////////////////////////////////////////add()

function _setLocalStorage(){
  localStorage.setItem(`LCid`, JSON.stringify(id)) 
  
  for (let i = 0; i < todo.length; i++) {
    localStorage.setItem(`todoTask${todo[i].id}`, JSON.stringify(todo[i].task.innerHTML)) 
  }

  localStorage.setItem(`todo`, JSON.stringify(todo))
  localStorage.setItem('doing', JSON.stringify(doing))
  localStorage.setItem('done', JSON.stringify(done))

}

function getLocalStorage(){
  
  data1 = JSON.parse(localStorage.getItem('todo'));
  data2 = JSON.parse(localStorage.getItem('doing'));
  data3 = JSON.parse(localStorage.getItem('done'));
  
  id = JSON.parse(localStorage.getItem('LCid'))
  
  setData(data1, tasks1, `todoTask`, todo, todoContainer);
  setData(data2, tasks2, `doingTask`, doing, doingContainer);
  setData(data3, tasks3, `doneTask`, done, doneContainer);
  
  function setData(data, tasks, LCTask, arr, container){
    
    if(data){
      for(let i = 0; i < data.length; i++){

        // a = localStorage.getItem(`doingTask${data[i].id}`);
        tasks.push(JSON.parse(localStorage.getItem(`${LCTask}${data[i].id}`))); 
        
        let n = document.createElement('div');
        n.innerHTML = tasks[i];

        if(n.querySelector('.name')){
          n.querySelector('.name').value = data[i].name
          n.querySelector('.do__container__draggable__fix__priority').value = data[i].priority
          n.querySelector('.do__container__draggable__more__textarea').value = data[i].description
        }
          
        data[i].task = n;
        arr[i] = data[i]  
        
        container.appendChild(arr[i].task)
      }
    }
  }
}

  function maxID() {
  
    //unda avigo max id value LC dan yvela elementshi shesvlit
    if(data1 && !created){
      let max = 0;
      
      for(let i = 0; i < data1.length; i++){
        
        if(data1[i].id > max){
          max = data1[i].id;
        }
      }
      id = max + 1;
    }
  
    if(data2 && !created){
      let max = 0;
      
      for(let i = 0; i < data2.length; i++){
        
        if(data2[i].id > max){
          max = data2[i].id;
        }
      }
      id = max + 1;
    }
  
    if(data3 && !created){
      let max = 0;
      
      for(let i = 0; i < data3.length; i++){
        
        if(data3[i].id > max){
          max = data3[i].id;
        }
      }
      id = max + 1;
    }
    
  }















