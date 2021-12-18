//import './style.css'

const source = document.getElementById('lineinput');

const inputHandler = function(e) {
  updateBusBtn();
}

source.addEventListener('input', inputHandler);
source.addEventListener('propertychange', inputHandler); // for IE8

function setup(){

  console.log("setup");
}

function updateBusBtn(){
  let searchText = document.getElementById("lineinput").value;
  console.log("update" + searchText);
  let btns = document.getElementsByClassName("line-btn");

  for (let i = 0; i < btns.length; i++) {
    if(btns[i].value.includes(searchText)){
      btns[i].style.display = "block";
    }else{
      btns[i].style.display = "none";
    }
    
  }
}

//setup();