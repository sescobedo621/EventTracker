window.onload = function(){
	createForm();
	init();
};

function init(){
	getData("http://localhost:8080/EventTracker/rest/fitness", getAllFitness);
}

function getData(url, callback){
	var xhr = new XMLHttpRequest();
	xhr.open("GET",url);
	xhr.onreadystatechange = function(){
		if(xhr.readyState == 4 && xhr.status < 400){
			//console.log(xhr.responseText);
			callback(JSON.parse(xhr.responseText));
			
		}
	}
	xhr.send(null);

}

function getAllFitness(fitnessData){
	var result = document.getElementById("")
	if()
	var body = document.querySelector("body"); 
	var table = document.createElement("table");
	table.id = "fitness";
	var thr = document.createElement("tr");
	for(key in fitnessData[0]){
		var th = document.createElement("th");
		th.innerHTML = key;
		thr.appendChild(th);
	}
	table.appendChild(thr);
	for (var i = 0; i < fitnessData.length; i++){
		var tr = document.createElement("tr");
		for(var data in fitnessData[i]){
			var td = document.createElement("td");
			td.innerHTML = fitnessData[i][data];
			tr.appendChild(td);
		}
		table.appendChild(tr);
	}
	body.appendChild(table);
}

function createForm(){
	var body = document.querySelector("body");
	var form = document.createElement("form");
	var text = document.createElement("input");
	text.type = "text";
	text.name = "exercise";
	form.appendChild(text);
	var submit = document.createElement("input");
	submit.type = "submit";
	submit.value = "Find Exercise";

	submit.addEventListener("click", function(event){
		event.preventDefault();
		var result = "http://localhost:8080/EventTracker/rest/fitness/" + text.value;
		getData(result, getAllFitness);
	});
	form.appendChild(submit);

	body.appendChild(form);
}