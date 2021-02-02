const containers = document.querySelectorAll('.container1')
const todoContainer = document.querySelector('.TODO1')
const doingContainer= document.querySelector('.DOING1')
const doneContainer = document.querySelector('.DONE1')
var draggables = document.querySelectorAll('.draggable')
var todo = [];
var doing = [];
var done = [];

function drag(){

  let current, over;
  let id1;
  draggables.forEach(draggable => {
    
    draggable.addEventListener('dragstart', e => {
      
      draggable.classList.add('dragging')
      
      if(e.target.closest('.do__container__draggable')){

        id1 = e.target.closest('.do__container__draggable').dataset.id;

        if(e.target.closest('.do__container__draggable').closest('.container').classList.contains('TODO')){
          current = 'TODO';
        }
        else if(e.target.closest('.do__container__draggable').closest('.container').classList.contains('DOING')){
          current = 'DOING'
        }
        if(e.target.closest('.do__container__draggable').closest('.container').classList.contains('DONE')){
          current = 'DONE'
        }
      }  
    })
    
    draggable.addEventListener('dragend', () => {
      draggable.classList.remove('dragging')
    })
    
    //////////////////////////////////////////////////////////////  
    containers.forEach(container => {
      
      container.addEventListener('dragover', e => {

        e.preventDefault()  //changing prevent cursor 
        const draggable = document.querySelector('.dragging')
        container.appendChild(draggable);
        
        //only moving in arrays
        draggable.addEventListener('dragend', () => {
          todoContainer.ondragend = function(){
            let temp;
            if(current === 'DOING'){
              //fropm doing to todo
              for (let i = 0; i < doing.length; i++) {
                
                console.log(doing[i].id);
                console.log(id1);
                if(doing[i].id == id1){
                  
                  temp = doing.splice(i, 1);
                  temp = temp[0];
                  todo.push(temp);
                  // localStorage.setItem('doing', JSON.stringify(todo))
                }                
              } 
            }
            else if(current === 'DONE'){
              //from done to todo
              
              for (let i = 0; i < done.length; i++) {
                
                if(done[i].id == id1){
                  temp = done.splice(i, 1);
                  temp = temp[0];
                  todo.push(temp);
                  // localStorage.setItem('doing', JSON.stringify(todo))
                }                
              } 
            }
            delete temp;
          }
          
          doingContainer.ondragend = function(){
            let temp;
            //move to doing
            
            if(current === 'TODO'){
              //from todo to doing
              for (let i = 0; i < todo.length; i++) {
                
                if(todo[i].id == id1){
                  temp = todo.splice(i, 1);
                  temp = temp[0];
                  doing.push(temp);
                  document.querySelector('.DOING1').appendChild(draggable);
                  // localStorage.setItem('doing', JSON.stringify(doing))
                }                
              } 
            }
            else if(current === 'DONE'){
              //from DONE to doing
              
              for (let i = 0; i < done.length; i++) {
                if(done[i].id == id1){
                  temp = done.splice(i, 1);
                  temp = temp[0];
                  doing.push(temp);
                  // localStorage.setItem('doing', JSON.stringify(doing))
                }                
              } 
            }
            delete temp;
          }

          doneContainer.ondragend = function(){
            let temp;
            
            if(current === 'TODO'){
              //from todo to done
              
              //check in which element is id1
              for (let i = 0; i < todo.length; i++) {
                
                if(todo[i].id == id1){
                  temp = todo.splice(i, 1);
                  temp = temp[0];
                  done.push(temp);
                  // localStorage.setItem('doing', JSON.stringify(done))
                }                
              } 
            }
            
            else if(current === 'DOING'){
              //from doing to done
              for (let i = 0; i < doing.length; i++) {
                if(doing[i].id == id1){
                  temp = doing.splice(i, 1);
                  temp = temp[0];
                  done.push(temp);
                  // localStorage.setItem('doing', JSON.stringify(done))
                }   
              }
            }
            delete temp;
          }
        })
      })
    })
  })
  
  // for (let i = 0; i < todo.length; i++) {
  //   console.log('todo: ' + i)
  //   console.log(todo[i])
  // }
  // for (let i = 0; i < doing.length; i++) {
  //   console.log('doing: ' + i)
  //   console.log(doing[i])
  // }
  // for (let i = 0; i < done.length; i++) {
  //   console.log('done: ' + i)
  //   console.log(done[i])
  // }

  // console.log(todo);
  _setLocalStorage();
}//drag()

let priority = 1;
let description = '';

let id = 0;

function changeName(e){
  console.log('changing')

  for (let i = 0; i < todo.length; i++) {
    if(todo[i].id == e.target.dataset.id){
      localStorage.removeItem('todo');
      todo[i].name = e.target.value;
      localStorage.setItem(`todo`, JSON.stringify(todo))
    }   
  }
  for (let i = 0; i < doing.length; i++) {
    if(doing[i].id == e.target.dataset.id){
      doing[i].name = e.target.value;
    }   
  }
  for (let i = 0; i < done.length; i++) {
    if(done[i].id == e.target.dataset.id){
      done[i].name = e.target.value;
    }   
  }
}

function changePriority(e){
  
  for (let i = 0; i < todo.length; i++) {
    if(todo[i].id == e.target.dataset.id){
      localStorage.removeItem('todo');
      todo[i].priority = parseInt(e.target.value);
      // localStorage.setItem('todo', todo);
      localStorage.setItem(`todo`, JSON.stringify(todo))

    }   
  }
  for (let i = 0; i < doing.length; i++) {
    if(doing[i].id == e.target.dataset.id){
      doing[i].priority = parseInt(e.target.value);
    }   
  }
  for (let i = 0; i < done.length; i++) {
    if(done[i].id == e.target.dataset.id){
      done[i].priority = parseInt(e.target.value);
    }   
  }

  sort();
}

function changeDescription(e){

  for (let i = 0; i < todo.length; i++) {
    if(todo[i].id == e.target.dataset.id){
      localStorage.removeItem('todo');
      todo[i].description = e.target.value;
      console.log(todo[i].description)
      localStorage.setItem(`todo`, JSON.stringify(todo))

    }   
  }
  for (let i = 0; i < doing.length; i++) {
    if(doing[i].id == e.target.dataset.id){
      doing[i].description = e.target.value;
    }   
  }
  for (let i = 0; i < done.length; i++) {
    if(done[i].id == e.target.dataset.id){
      done[i].description = e.target.value;
    }   
  }
}

function del(e){//refreshis mere ireoda id ebi, magis gamo ar shlida sworad
  //an imis gamo rom todoTask1 egreve todo[1] shi shemaqvs
  
  for (let i = 0; i < todo.length; i++) {
    
    console.log('todo[i].id' + todo[i].id)
    console.log('e.target.dataset.id ' +e.target.dataset.id)
    if(todo[i].id == e.target.dataset.id){
      localStorage.removeItem(`todoTask${todo[i].id}`)
      localStorage.removeItem(`todo`, JSON.stringify(todo))
      removed = todo.splice(i,1);
      console.log(removed)
      document.querySelector('.TODO1').innerHTML = '';
      localStorage.setItem(`todo`, JSON.stringify(todo))
    }   
  }
  
  // for (let i = 0; i < doing.length; i++) {
    //   if(doing[i].id == e.target.dataset.id){
  //     doing.splice(i,1);
  //     document.querySelector('.DOING1').innerHTML = '';
  //   }   
  // }
  // for (let i = 0; i < done.length; i++) {
    //   if(done[i].id == e.target.dataset.id){
      //     done.splice(i,1);
      //     document.querySelector('.DONE1').innerHTML = '';
      //   }   
      // }
      
      for(let i = 0; i < todo.length; i++){
        document.querySelector('.TODO1').appendChild(todo[i].task);
      }
      // for(let i = 0; i < doing.length; i++){
        //   document.querySelector('.DOING1').appendChild(doing[i].task);
        // }
        // for(let i = 0; i < done.length; i++){
          //   document.querySelector('.DONE1').appendChild(done[i].task);
          // }
          
        }
        

window.onload = function(){
  created = false;
  getLocalStorage();
}

function sort(){//gadatanili elementi ar isorteba, ecvleba div elementi romelic agar mushaobs
  
  localStorage.removeItem(`todo`, JSON.stringify(todo))
  const sorted1 = todo.sort((a, b) => {
    if(a.priority > b.priority) return -1
    if(b.priority > a.priority) return 1
  })

  // const sorted2 = doing.sort((a, b) => {
  //   if(a.priority > b.priority) return -1
  //   if(b.priority > a.priority) return 1
  // })
  // const sorted3 = done.sort((a, b) => {
  //   if(a.priority > b.priority) return -1
  //   if(b.priority > a.priority) return 1
  // })//doing shi da done shi shemowmeba step by step
  //nebismieri gadatanis mere agar sortavs
  
  // console.log(todo[0].task);
  document.querySelector('.TODO1').innerHTML = '';
  // document.querySelector('.DOING1').innerHTML = '';
  // document.querySelector('.DONE1').innerHTML = '';
  
  for(let i = 0; i < todo.length; i++){
    document.querySelector('.TODO1').appendChild(todo[i].task);
  }
  // for(let i = 0; i < doing.length; i++){
  //   document.querySelector('.DOING1').appendChild(doing[i].task);
  // }
  // for(let i = 0; i < done.length; i++){
    //   document.querySelector('.DONE1').appendChild(done[i].task);
    // }
    
  localStorage.setItem(`todo`, JSON.stringify(todo))
    

    
}
  
  
  let created = false;
  
  //1.--n shi shevinaxo yvela divi
  //2.--dataebi gadmovitano da todoshi gadmotanis dros taskis magivrad chavwero n
  //3.--del from storage (delete bug is because of id creating again)
  //3.1.--move max id to LC
  //3.2.--use maxid in creating new  
  //3.3.--problem with tasks in LC
  //4.--shevinaxo dasortili
  //4.1--gamovachino sort is ricxvi inputshi
  //4.2--shecvlili priority shevinaxo loc shi
  //4.3--an tavidan davsorto an ratom ar inaxavs gavarkvio
  //5.--shevinaxo description changec
  //6.--shevinaxo name changec



document.querySelector('.do__container__head__add').addEventListener('click', function(){
  
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
  
  for(let i = 0; i < todo.length; i++){
    document.querySelector('.TODO1').appendChild(todo[i].task);
  }
  
  id++;
  draggables = document.querySelectorAll('.draggable');
  drag();
})


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
    // console.log('id: ' + id)
  }
  else if(!data1 || created){
    // console.log('id: ' + id)
  }
  
  // if (this.#tasks[0]) {
    //   let Max = Math.max(...this.#tasks.map((task) => task.id));
    
    //   this.#taskID = Max + 1;
    //   console.log(this.#taskID, Max);
    // }
  }
  
  
  function _setLocalStorage(){
    localStorage.setItem(`LCid`, JSON.stringify(id)) 
    
    for (let i = 0; i < todo.length; i++) {
      
      localStorage.setItem(`todoTask${i}`, JSON.stringify(todo[i].task.innerHTML)) 
      // console.log(todo)
    }
    
    localStorage.setItem(`todo`, JSON.stringify(todo))
    // localStorage.setItem('doing', JSON.stringify(doing))
    // localStorage.setItem('done', JSON.stringify(done))
  }
  
  let data1, data2, data3;
  let tasks = [];
  
  function getLocalStorage(){
    
    // console.log(id);
    // id = JSON.parse(localStorage.getItem('LCid'))
    
    data1 = JSON.parse(localStorage.getItem('todo'));
    
    if(data1){
      
      for(let i = 0; i < data1.length; i++){//data[i].id 

        tasks.push(JSON.parse(localStorage.getItem(`todoTask${data1[i].id}`))) 
        // console.log(JSON.parse(localStorage.getItem(`todoTask${i}`)))
        
        let n = document.createElement('div');
        n.innerHTML = tasks[i];
        n.querySelector('.name').value = data1[i].name
        n.querySelector('.do__container__draggable__fix__priority').value = data1[i].priority
        n.querySelector('.do__container__draggable__more__textarea').value = data1[i].description
        
        data1[i].task = n;
        
        todo[i] = data1[i]  
        
        todoContainer.appendChild(todo[i].task)

      }
    }


    
    // let n = document.createElement('div');
    // n.innerHTML = data;
    // console.log(data)
    // // todo[0].task = data;
    // todoContainer.appendChild(n);
    
    
  
  
  // if(data2){
    //   data2 = JSON.parse(localStorage.getItem('doing'));
    // }
    // if(data3){
      //   data3 = JSON.parse(localStorage.getItem('done'));
      // }
      
      // for (let i = 0; i < 3; i++) {
        
        //   let a = localStorage.getItem(`task${i}`); 
        //   console.log(a);
        // }
  }
      
  // if(data1){
  //   console.log(data1)  
  //   for (let i = 0; i < data1.length; i++) {
  //     todo.push(data1[i]);
  //   }
  // }
  // console.log(todo);

  // for(let i = 0; i < todo.length; i++){
  //   // document.querySelector('.TODO').appendChild(todo[i].task);
  // }

  // console.log(todo)



  // for (let i = 0; i < todo.length; i++) {
    
  //     if(todo[i] !== undefined && todo[i+1] !== undefined){

  //     if (todo[i].priority < todo[i+1].priority) {
  //       // return -1;
  //       let temp = todo[i];
  //       todo[i] = todo[i+1];
  //       todo[i+1] = temp;      
  //     }
  //   }
  // }
  
  // for(let i = 0; i < done.length; i++){
    
  //   if(done[i] !== undefined && done[i+1] !== undefined){
      
  //     if (done[i].priority < done[i+1].priority) {
  //       console.log('donesort')
  //       console.log(done);
  //       // return -1;
  //       let temp = done[i];
  //       done[i] = done[i+1];
  //       done[i+1] = temp;      
  //     }
  //   }
  // }
  
  // for(let i = 0; i < doing.length; i++){
  //   if(doing[i] !== undefined && doing[i+1] !== undefined){

  //     if (doing[i].priority < doing[i+1].priority) {
  //       // return -1;
  //       let temp = doing[i];
  //       doing[i] = doing[i+1];
  //       doing[i+1] = temp;      
  //     }
  //   }
  // }


















// var show = false;
// document.querySelector('.extend').addEventListener('click', function(){
  //   show = true;
  
  //   if(show){
    
    //   }
    // })
    
    
    
    
    
    

  ///////////////////////////////////////////////trash///////////////////////////////////
    // let temp;
            
      // ////////////////////////////////////////////////////////////////////////////////
      // if(current === 'DONE'){
        
      //   if(container.classList.contains('TODO')){
          
      //     e.preventDefault()
      //     const draggable = document.querySelector('.dragging')
      //     container.appendChild(draggable);
          
      //     temp = done.splice(todo.indexOf(id1), 1)
      //     todo.push(temp)
      //   }
      //   else if(container.classList.contains('DOING')){
          
      //     e.preventDefault()
      //     const draggable = document.querySelector('.dragging')
      //     container.appendChild(draggable);
          
      //     temp = done.splice(todo.indexOf(id1), 1 )
      //     // console.log('temp: ' + temp);
      //     doing.push(temp);
      //     // console.log('doing: ' + doing);
      //     //move to doing
      //   }
      // }
      
      // else if(current === 'DOING'){
      //   if(container.classList.contains('TODO')){
          
      //     e.preventDefault()
      //     const draggable = document.querySelector('.dragging')
      //     container.appendChild(draggable);
      //   }
      //   else if(container.classList.contains('DONE')){
          
      //     e.preventDefault()
      //     const draggable = document.querySelector('.dragging')
      //     container.appendChild(draggable);
      //   }
      // }
      
      // else if(current === 'TODO'){
      //   // console.log('id1: ' + id1)
        
      //   if(container.classList.contains('DOING')){
          
      //     e.preventDefault();
      //     const draggable = document.querySelector('.dragging');
      //     container.appendChild(draggable);
      //   }
        
      //   else if(container.classList.contains('DONE')){
          
      //     e.preventDefault()
      //     const draggable = document.querySelector('.dragging')
      //     container.appendChild(draggable);
      //   }
      // }
    
    
    
    
    
    
    


















































// containers.forEach(container => {
//   container.addEventListener('dragover', e => {
//     e.preventDefault()  //changing prevent cursor 
//     // const afterElement = getDragAfterElement(container, e.clientY)
//     const draggable = document.querySelector('.dragging')
//     // if (afterElement == null) {
//       container.appendChild(draggable)
//     // } else {
//     //   container.insertBefore(draggable, afterElement)
//     // }
//   })
// })

// // function getDragAfterElement(container, y) {
// //   const draggableElements = [...container.querySelectorAll('.draggable:not(.dragging)')]

// //   return draggableElements.reduce((closest, child) => {
// //     const box = child.getBoundingClientRect()
// //     const offset = y - box.top - box.height / 2
// //     if (offset < 0 && offset > closest.offset) {
// //       return { offset: offset, element: child }
// //     } else {
// //       return closest
// //     }
// //   }, { offset: Number.NEGATIVE_INFINITY }).element
// // }