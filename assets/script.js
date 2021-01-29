let containers = document.querySelectorAll('.container')
var draggables = document.querySelectorAll('.draggable')


function drag(){
 
  draggables.forEach(draggable => {

    draggable.addEventListener('dragstart', () => {
      draggable.classList.add('dragging')
    })
    
    draggable.addEventListener('dragend', () => {
      draggable.classList.remove('dragging')
    })
  })

//////////////////////////////////////////////////////////////  
  containers.forEach(container => {
    
    container.addEventListener('dragover', e => {
      // console.log(e);
      e.preventDefault()
      const draggable = document.querySelector('.dragging')
      container.appendChild(draggable);
    })
  })

}
var todo = [];
var doing = [];
var done = [];

document.querySelector('.do__container__head__add').addEventListener('click', function(){
  
  let name = document.querySelector('.do__container__head__input').value;
  let newTask = document.createElement('div');
  
  newTask.innerHTML = `
  <div class="do__container__draggable draggable" draggable="true">
  
  <div class='do__container__draggable__fix'>
  
  <input value='${name}' class="do__container__draggable__fix__name name" type="text" maxlength="10">
  <input class="do__container__draggable__fix__priority" type='number' min='0' max='101'>
  <button class="do__container__draggable__fix__submit submit">Update</button>
  <button class="do__container__draggable__fix__extend extend"></button>
  
  </div>
  
  <div class="do__container__draggable__more">
  <h3 class="do__container__draggable__more__header">Description</h3>
  <textarea class='do__container__draggable__more__textarea' cols="1" rows="3"></textarea>
  </div>
  
  </div>
  `;
  
  todo.push(newTask);
  
  for(let i = 0; i < todo.length; i++){
    document.querySelector('.container').appendChild(todo[i]);
    
  }
  
  draggables = document.querySelectorAll('.draggable');
  drag();
})













// var show = false;
// document.querySelector('.extend').addEventListener('click', function(){
  //   show = true;
  
  //   if(show){
    
    //   }
    // })
    
    
    
    
    
    
    
    
    
    
    
    
    


















































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