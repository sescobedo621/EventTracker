window.onload = function(){
	
	init();
};

function init(){
	var title = document.getElementById("title");
	title.addEventListener("mouseover", function(){
		title.setAttribute("class", "navbarhover");
	});
	title.addEventListener("mouseleave", function(){
		title.setAttribute("class", "navbar");
	});
	title.addEventListener("click", function(){
		title.setAttribute("class", "navbar");
		getData("rest/fitness", getAllFitness);
	});
	var add = document.getElementById("addFitness");
	add.addEventListener("mouseover", function(){
		add.setAttribute("class", "navbarhover");
	});
	add.addEventListener("mouseleave", function(){
		add.setAttribute("class", "navbar");
	});
	add.addEventListener("click", function(){
		//add.getAttribute("navbarhover").removeAttribute("class");
		add.setAttribute("class", "navbar");
		addFitnessForm();
	});
	var update = document.getElementById("updateFitness");
	update.addEventListener("mouseover", function(){
		//update.getAttribute("navbar").removeAttribute("class");
		update.setAttribute("class", "navbarhover");
	});
	update.addEventListener("mouseleave", function(){
		update.setAttribute("class", "navbar");
	});
	update.addEventListener("click", function(){
		update.setAttribute("class", "navbar");
		getData("rest/fitness", updateFitnessTable);
	});

	createForm();
	getData("rest/steps", displayAverage);
	getData("rest/fitness", getAllFitness);
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

function putPostDeleteData(method, url, obj, callback){
	var xhr = new XMLHttpRequest();
	xhr.open(method, url);
	xhr.setRequestHeader("Content-Type", "application/json");
	console.log(obj);
	xhr.onreadystatechange = function(){
		if(xhr.readyState == 4 && xhr.status<400){
			console.log(obj);
			getData("rest/fitness", getAllFitness);
		}
	}
	if(obj){
		xhr.send(JSON.stringify(obj));

	} else{
		xhr.send(null);
	}
	
}

function getAllFitness(fitnessData){
	var result = document.getElementById("fitness");
	if(result !== null){
		result.parentNode.removeChild(result);
	}
	var addForm = document.getElementById("fitnessAdd");
	if(addForm !== null){
		addForm.parentNode.removeChild(addForm);
	}
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
		var deletetd = document.createElement("td");

		var deleteform = document.createElement("form");
		
		var deleteButton = document.createElement("input");
		deleteButton.setAttribute("f_id", fitnessData[i].id.toString());
		deleteButton.type = "submit";
		deleteButton.setAttribute("value", deleteButton.id);
		deleteButton.value = "Delete";
		console.log(deleteButton.id);
		deleteform.appendChild(deleteButton);
		deleteButton.addEventListener("click", function(event){
			event.preventDefault();
			console.log(deleteButton.getAttribute("f_id"));
			var url = "rest/deleteFitness/" + event.target.getAttribute("f_id");
			console.log(url);
			putPostDeleteData("DELETE", url);
		});
		
		deletetd.appendChild(deleteform);
		tr.appendChild(deletetd);
		table.appendChild(tr);
	}
	if(fitnessData.length == 0){
		var p = document.createElement("p");
		p.innerHTML = "Result Not Found";
		p.id = "fitness";
		body.appendChild(p);
	}
	 
	body.appendChild(table);
}

function createForm(){
	var navbar = document.getElementById("navbar");
	var li = document.createElement("li");
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
		var result = "rest/getfitness/" + text.value;
		console.log(result);
		getData(result, getAllFitness);
	});
	form.appendChild(submit);
	li.appendChild(form);
	navbar.appendChild(form);
}

function displayAverage(avg){
	var average = document.getElementById("average");
	if(average !== null){
		average.parentNode.removeChild(average);
	}
	var body = document.querySelector("body");
	var h3 = document.createElement("h3");
	h3.id = "average";
	h3.innerHTML = "Average Steps: " + avg;
	body.appendChild(h3);

}

function addFitnessForm(){
	var table = document.getElementById("fitness");
	var body = document.querySelector("body");
	if(table !== null){
		table.parentNode.removeChild(table);
	}
	var addForm = document.createElement("form");
	var exercise = document.createElement("input");
	addForm.id = "fitnessAdd";
	exercise.type = "text";
	exercise.placeholder = "exercise";
	exercise.name = "exercise";

	addForm.appendChild(exercise);

	var elength = document.createElement("input");
	elength.type = "text";
	elength.placeholder = "length";
	elength.name = "minLength";

	addForm.appendChild(elength);

	var steps = document.createElement("input");
	steps.type = "text";
	steps.placeholder = "steps";
	steps.name = "steps";
	addForm.appendChild(steps);

	var calories = document.createElement("input");
	calories.type ="text";
	calories.placeholder = "calories";
	calories.name = "caloriesBurned";
	addForm.appendChild(calories);

	var submit = document.createElement("input");
	submit.type ="submit";
	submit.value ="Add Fitness";

	submit.addEventListener("click", function(event){ 
		event.preventDefault();
		var fitnessObj = {};
		fitnessObj.exercise = exercise.value;
		fitnessObj.minLength = elength.value;
		fitnessObj.steps = steps.value;
		fitnessObj.caloriesBurned = calories.value;
		getData("rest/steps", displayAverage);
		putPostDeleteData("PUT", "rest/addFitness", fitnessObj);
	});
	addForm.appendChild(submit);
	body.appendChild(addForm);
}

function updateFitnessTable(data){
	var result = document.getElementById("fitness");
	if(result !== null){
		result.parentNode.removeChild(result);
	}
	var addForm = document.getElementById("fitnessAdd");
	if(addForm !== null){
		addForm.parentNode.removeChild(addForm);
	}
	var body = document.querySelector("body");
	
	var table = document.createElement("table");
	table.id = "fitness";
	var thr = document.createElement("tr");
	for(key in data[0]){
		var th = document.createElement("th");
		th.innerHTML = key;
		thr.appendChild(th);
	}
	table.appendChild(thr);
	for (var i = 0; i < data.length; i++){
		var tr = document.createElement("tr");
		for(var update in data[i]){
			var td = document.createElement("td");
			td.innerHTML = data[i][update];
			tr.appendChild(td);
		}
		var updatetd = document.createElement("td");

		var updateform = document.createElement("form");
		
		var updateButton = document.createElement("input");
		updateButton.setAttribute("f_id", data[i].id.toString());
		updateButton.type = "submit";
		//updateButton.setAttribute("value", updateButton.id);
		updateButton.value = "Update";
		//console.log(deleteButton.id);
		updateform.appendChild(updateButton);
		updateButton.addEventListener("click", function(event){
			event.preventDefault();
			//console.log(deleteButton.getAttribute("f_id"));
			var url = "rest/fitness/" + event.target.getAttribute("f_id");
			console.log(url);
			getData(url, updateFitnessForm);
		});
		
		updatetd.appendChild(updateform);
		tr.appendChild(updatetd);
		table.appendChild(tr);
	}
	body.appendChild(table);
}
function updateFitnessForm(updateData){
	var table = document.getElementById("fitness");
	var body = document.querySelector("body");
	if(table !== null){
		table.parentNode.removeChild(table);
	}
	var addForm = document.createElement("form");
	var exercise = document.createElement("input");
	addForm.id = "fitnessAdd";
	exercise.type = "text";
	exercise.value = updateData.exercise;
	exercise.name = "exercise";

	addForm.appendChild(exercise);

	var elength = document.createElement("input");
	elength.type = "text";
	elength.value = updateData.minLength;
	elength.name = "minLength";
	addForm.appendChild(elength);

	var steps = document.createElement("input");
	steps.type = "text";
	steps.value = updateData.steps;
	steps.name = "steps";
	addForm.appendChild(steps);

	var calories = document.createElement("input");
	calories.type ="text";
	calories.value = updateData.caloriesBurned;
	calories.name = "caloriesBurned";
	addForm.appendChild(calories);

	var submit = document.createElement("input");
	submit.setAttribute("f_id", updateData.id);
	submit.type ="submit";
	submit.value ="Update Fitness";

	submit.addEventListener("click", function(event){ 
		event.preventDefault();
		var fitnessObj = {};
		fitnessObj.exercise = exercise.value;
		fitnessObj.minLength = elength.value;
		fitnessObj.steps = steps.value;
		fitnessObj.caloriesBurned = calories.value;
		var url = "rest/updateFitness/" + event.target.getAttribute("f_id");
		getData("rest/steps", displayAverage);
		putPostDeleteData("POST", url, fitnessObj);
	});
	addForm.appendChild(submit);
	body.appendChild(addForm);
}














