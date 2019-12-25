// Define some useful handles
let body = document.getElementsByTagName("body")[0];
let input = document.getElementById("input");
let tasklist = document.getElementById("task_list");
let add_button = document.getElementById("add_button");
let clear_button = document.getElementById("clear_button");
let select = document.getElementById("task_type");


body.addEventListener("keydown", function(event){
	if (event.keyCode == 13){
		addItem();
	}
	if (event.keyCode == 27){
		clear_button.click();
	}
});

add_button.addEventListener("click", addItem);

function addItem(){
	let text = input.value.trim();
	if (text == "") {
		return;
	}
	let item = createItem(text)
	setColor(item)
	addActions(item);
	tasklist.append(item);
	input.value = "";
	input.focus();
}

clear_button.addEventListener("click", function(){
	if (tasklist.childNodes.length != 0 && confirm("Are you sure you want to delete all items?")){
		for(i = tasklist.childNodes.length -1; i >= 0 ; i--){
			tasklist.childNodes[i].remove();
		}
	}
});


function setColor(item){
	let colors = {
		"home": "blue",
		"work": "green",
		"urgent": "red"
	}

	item.childNodes[1].style.color = colors[select.value]
}


function addActions(item){
	let checkbox = item.childNodes[0]; 
	let span = item.childNodes[1]; 
	let delete_button = item.childNodes[2]; 

	delete_button.addEventListener("click", function(){
		item.remove();
	})	

	checkbox.addEventListener("click", function(){
		if (checkbox.checked == false){
			span.style.textDecoration = ""
		} 
		else {
			span.style.textDecoration = "line-through"
		}
	})

}






function createItem(text){

	let box = document.createElement("div");

	let checkbox = document.createElement("input");
	checkbox.type = "checkbox"

	let item = document.createElement("span");
	item.innerHTML = text;

	let close = document.createElement("button");
	close.innerHTML = "Delete"	

	box.append(checkbox)
	box.append(item);
	box.append(close);


	return box;
}
