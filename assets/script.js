  //1.++n shi shevinaxo yvela divi
  //2.++dataebi gadmovitano da todoshi gadmotanis dros taskis magivrad chavwero n
  //3.++del from storage (delete bug is because of id creating again)
  //3.1.+move max id to LC
  //3.2.+use maxid in creating new  
  //3.3.+problem with tasks1 in LC
  //4.++shevinaxo dasortili
  //4.1++gamovachino sort is ricxvi inputshi
  //4.2++shecvlili priority shevinaxo loc shi
  //4.3++an tavidan davsorto an ratom ar inaxavs gavarkvio
  //5.++shevinaxo description changec
  //6.++shevinaxo name changec

  ///////////new chapter unlocked: THE LAST BUG////////////////////

  //1. shevamowmo ra ar mushaobs STEP BY STEP
  //2.++ganvakomentaro yvelaferi ertad zemodan qvemot   
  //2.2++rac mushaobda imis shemowmeba -> mushaobs
  //3.  gavarkvio ratom ar mushaobs D&D da gamovasworo
  //3.1++doing shi aris elementebi da LC shic midis magram ar ibechdeba
  //3.2++todo dan doingshi gadatanili todo dan ar ishleba
  //3.4++todo dan doingze gavakete
  //3.5++danarchenebzec gadavitano  TEST COMPLETED
  //3.5.1  ragac momentshi LCdan gaqra todo, doing, done 
  //3.6++BUG: roca arsebobs mag: doing0 da iqmneba todo0 urevs(id funqciis shecdomaa)
  //3.7++mteli funqcionali shevamowmo 
  
  /////////////////////////////////////LAST 2 BUGS////////////////////////////////////////////////
  ////1.1++D&D ar mushaobs sanam axal damatebul elements ar davamateb 
  //3.7  sorts aqvs bug
  //3.7  feb 4 11:33 line 507 cannot set property 'value' of null

  ////////////////////////////////////PERFECTIONALIZE/////////////////////////////////////////////
  //1.+ implement functional programming for clean and understandable code
  //2.++removee not needed console.log()s

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

      // onChange(done, 'done', done[i].name.value, e.target.value);
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
  for (let i = 0; i < doing.length; i++) {
    if(doing[i].id == e.target.dataset.id){
      localStorage.removeItem('doing');
      doing[i].description = e.target.value;
      localStorage.setItem(`doing`, JSON.stringify(doing))
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

          todoContainer.ondragend = function(){

            if(current === 'DONE'){

              for (let i = 0; i < done.length; i++) {
                id2 = done[i].id;
                temp2 = localStorage.getItem(`doneTask${id2}`); 
                if(id2 == id1){

                  localStorage.removeItem('done')
                  localStorage.removeItem('todo')

                  temp = done.splice(i, 1);
                  temp = temp[0];
                  todo.push(temp);
                  localStorage.setItem('done', JSON.stringify(done))
                  localStorage.setItem('todo', JSON.stringify(todo))

                  localStorage.setItem(`todoTask${id2}`, temp2) //
                  localStorage.removeItem(`doneTask${id2}`)
                }                
              } 
            }

            else if(current === 'DOING'){

              for (let i = 0; i < doing.length; i++) {
                id2 = doing[i].id;
                temp2 = localStorage.getItem(`doingTask${id2}`); //LC s gareshe?
                if(id2 == id1){

                  localStorage.removeItem('doing')
                  localStorage.removeItem('todo')

                  temp = doing.splice(i, 1);
                  temp = temp[0];
                  todo.push(temp);
                  localStorage.setItem('doing', JSON.stringify(doing))
                  localStorage.setItem('todo', JSON.stringify(todo))
                  
                  localStorage.setItem(`todoTask${id2}`, temp2) //
                  localStorage.removeItem(`doingTask${id2}`)
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

                  localStorage.removeItem('todo')
                  localStorage.removeItem('doing')

                  temp = todo.splice(i, 1);
                  temp = temp[0];
                  doing.push(temp);
                  localStorage.setItem('todo', JSON.stringify(todo))
                  localStorage.setItem('doing', JSON.stringify(doing))

                  localStorage.setItem(`doingTask${id2}`, temp2) 
                  localStorage.removeItem(`todoTask${id2}`)
                  
                }                
              } 
            }
            
            else if(current === 'DONE'){

              for (let i = 0; i < done.length; i++) {
                id2 = done[i].id;
                temp2 = localStorage.getItem(`doneTask${id2}`); 
                if(id2 == id1){

                  localStorage.removeItem('done')
                  localStorage.removeItem('doing')

                  temp = done.splice(i, 1);
                  temp = temp[0];
                  doing.push(temp);
                  localStorage.setItem('done', JSON.stringify(done))
                  localStorage.setItem('doing', JSON.stringify(doing))
                  
                  localStorage.setItem(`doingTask${id2}`, temp2)
                  localStorage.removeItem(`doneTask${id2}`)
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

                  localStorage.removeItem('doing')
                  localStorage.removeItem('done')

                  temp = doing.splice(i, 1);
                  temp = temp[0];
                  done.push(temp);
                  localStorage.setItem('doing', JSON.stringify(doing))
                  localStorage.setItem('done', JSON.stringify(done))
                  
                  localStorage.setItem(`doneTask${id2}`, temp2)
                  localStorage.removeItem(`doingTask${id2}`)
                }                
              } 
            }
            else if(current === 'TODO'){

              for (let i = 0; i < todo.length; i++) {
                id2 = todo[i].id;
                temp2 = localStorage.getItem(`todoTask${id2}`); 
                if(id2 == id1){

                  localStorage.removeItem('todo')
                  localStorage.removeItem('done')

                  temp = todo.splice(i, 1);
                  temp = temp[0];
                  done.push(temp);
                  localStorage.setItem('todo', JSON.stringify(todo))
                  localStorage.setItem('done', JSON.stringify(done))
                  
                  localStorage.setItem(`doneTask${id2}`, temp2)
                  localStorage.removeItem(`todoTask${id2}`)
                }                
              } 
            }
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

function del(e){//mushaoooooobss
  
  remove(todo, 'todo', e.target.dataset.id, todoContainer);
  remove(doing, 'doing', e.target.dataset.id, doingContainer);
  remove(done, 'done', e.target.dataset.id, doneContainer);

  fillContainer(todoContainer, todo);
  fillContainer(doingContainer, doing);
  fillContainer(doneContainer, done);
      
}

function sort(){//doingshi da done shi isorteba magram qreba da refreshis mere yvelaferi mushaobs
  
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
  

  ///awful fix and cheating:
  // location.reload();

  //real fix:  \_('_')_/
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
    
    
    
    
    
    
    








 // if(data1){
    //   for(let i = 0; i < data1.length; i++){

    //     tasks1.push(JSON.parse(localStorage.getItem(`todoTask${data1[i].id}`))) 
        
    //     let n = document.createElement('div');
    //     n.innerHTML = tasks1[i];

    //     if(n.querySelector('.name')){
    //       n.querySelector('.name').value = data1[i].name
    //       n.querySelector('.do__container__draggable__fix__priority').value = data1[i].priority
    //       n.querySelector('.do__container__draggable__more__textarea').value = data1[i].description
    //     }

    //     data1[i].task = n;
    //     todo[i] = data1[i];
        
    //     todoContainer.appendChild(todo[i].task);
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