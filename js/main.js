var score = 0;

function shuffleArr(arr) {
    for(var j, x, i = arr.length; i; j = Math.floor(Math.random() * i), x = arr[--i], arr[i] = arr[j], arr[j] = x);
    return arr;
}

function allowMove(empty, nonEmpty) {
	var er = Math.ceil(empty / 4),
			ec = empty % 4,
			ner = Math.ceil(nonEmpty / 4),
			nec = (nonEmpty % 4);
	if(ec === 0) ec = 4;
	if(nec === 0) nec = 4;
	if((er == ner && Math.abs(ec - nec) < 2) || (ec == nec && Math.abs(er -ner) < 2))
		return true;
	else
		return false;
}

function createButton(id) {
	var button = document.createElement('button');
	button.classList.add("moveButton");
	button.setAttribute("draggable", "true");
	button.innerHTML = id;
	button.addEventListener('dragstart', function(ev) {
		ev.dataTransfer.setData("name", ev.target.parentNode.getAttribute("name"));
		ev.dataTransfer.setData("id", this.innerHTML);
	});
	return button;
}

function replace (id) {
	document.getElementById("counter").innerHTML = ++score;
	var empty = document.getElementById("empty");
	var newEmpty = document.getElementById(id);
	empty.appendChild(newEmpty.childNodes[0]);
	empty.setAttribute("id", id);
	newEmpty.appendChild(empty.childNodes[0]);
	newEmpty.setAttribute("id", "empty");
	if(verify()){
		alert("You win!\nYour score: " + score + " moves!");
		refresh();
	};
}

function drop(e) {
	if (allowMove(parseInt(e.target.parentNode.getAttribute("name")), parseInt(e.dataTransfer.getData("name")))) {
		replace(e.dataTransfer.getData("id"));
	}
}

function verify() {
	var table = document.getElementById("table");
	for (var i = 0, row; row = table.rows[i]; i++)
		for (var j = 0, col; col = row.cells[j]; j++)
			if(col.getAttribute("name") != "16" && col.getAttribute("name") != col.id)
				return false;
	return true;
}

function move(e) {
	if(e)
		replace(e.id);
}

function refresh() {
	var tr = document.getElementById("table").getElementsByTagName("tr"),
		arr = shuffleArr([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]),
		div = document.createElement("div"),
		td = null,
		n = 1;
	arr.unshift(0);
	score = 0;

	div.addEventListener('dragover', function(e) { e.preventDefault();});
	div.addEventListener('drop', drop);

	var	empty = document.getElementById("empty");
	empty.setAttribute("name", "16");
	if(!empty.childNodes.length) empty.appendChild(div);

	for (var i = 0; i < tr.length; i++) {
		td = tr[i].getElementsByTagName("td");
		for (var j = 0; j < td.length; j++) {
			if(!(i == tr.length-1 && j == td.length-1)){
				td[j].innerHTML = "";
				td[j].setAttribute("id", arr[n]);
				td[j].setAttribute("name", n);				
				td[j].appendChild(createButton(arr[n]));
			}
			n++	;
		}
	}
}

document.onready = refresh();

document.addEventListener("keydown", function(e) {
	if(e.keyCode === 37) {
		move(empty.nextSibling.nextSibling);
	}
	if(e.keyCode === 38) {
		move(document.getElementsByName(parseInt(empty.getAttribute("name")) + 4)[0]);
	}
	if(e.keyCode === 39) {
		move(empty.previousSibling.previousSibling);
	}
	if(e.keyCode === 40) {
		move(document.getElementsByName(parseInt(empty.getAttribute("name")) - 4)[0]);
	}
});