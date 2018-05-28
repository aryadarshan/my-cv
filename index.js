// fetch the data from the json
function getCVData() {
	var request = new XMLHttpRequest();
	request.open('GET', 'cv.json');
	request.responseType = 'json';
	request.onload = function() {
		handleResponse(request.response);
	}
	request.send();
}

function handleResponse(jsonResponse) {
	renderData(jsonResponse);
};

// render the view from the response json
function renderData(jsonResponse) {
	primaryInfo(jsonResponse);
	secondaryInfo(jsonResponse);
	careerSummary(jsonResponse);
	keySkills(jsonResponse);
	workExperience(jsonResponse);
}

function primaryInfo(response) {
	var perName = "<h2 id='name'>" + response.name + "</h2>";
	
	var address = "<div class='address'>" +
					"<div>" + response.address.houseName + "</div>" +
					"<div>" + response.address.neighborHood + "</div>" +
					"<div>" + response.address.streetName + ", " + response.address.city + "- " + response.address.pincode + "</div>" +					
				  "</div>";

	var primaryInfoEl = document.querySelector('.personal-primary');
	primaryInfoEl.innerHTML = perName + address;
}

function secondaryInfo(response) {
	var details = "<div>"+
					"<div>" + "<span>" +"Mob:" + "</span>" + response.mobNo + "</div>" + 
					"<div>" + "<span>" +"Emai:" + "</span>" + response.email + "</div>" +
					"<div>" + "<span>" +"DOB:" + "</span>" + response.dob + "</div>" +
				  "</div>";

	var secondaryInfoEl = document.querySelector('.personal-secondary');
	secondaryInfoEl.innerHTML = details;
}

function careerSummary(response) {
	var sectionEl = document.querySelector('.career-sum-desc');

	var ulEl = document.createElement('ul');
	var careerSum = "";
	for(let i = 0; i < response.careerSummary.length; i++) {
		var result = "<li>" + response.careerSummary[i] + "." + "</li>"
		careerSum += result;
	}

	ulEl.innerHTML = careerSum;
	sectionEl.appendChild(ulEl);
}

function keySkills(response) {
	var sectionEl = document.querySelector('.key-skill-desc');
	
	var ulEl = document.createElement('ul');
	var result = "";
	var keySkills = response.keySkills;
	for(let keySkill in keySkills) {
		var liEl = "<li>" + keySkills[keySkill].join(', ') + "</li>";
		result += liEl;
	}

	ulEl.innerHTML = result;
	sectionEl.appendChild(ulEl);

}
function workExperience(response) {
	var sectionEl = document.querySelector('.work-exp');
	var result = "";
	for(let i = 0; i < response.experience.length; i++) {
		var companyName = "<h3>" + response.experience[i].companyName + "</h3>";
		var dateOfJoining = "<h5>" + response.experience[i].date + "</h5>";
		var projectsDetails = response.experience[i].projects;

		var projInfo = projectDetails(projectsDetails);
		result += "<div>" +
					companyName + 
					dateOfJoining + 
				  "</div>" +
				  projInfo;
	}
	 
	sectionEl .innerHTML = result;
}

function projectDetails(projectsDetails) {
	var result = "";
	
	for(let j = 0; j < projectsDetails.length; j++) {
		var projects = projectsDetails[j];
		var projTitle = "<h4>" + projects.proTitle + "</h4>";
		var projDesc = "<p>" + projects.projDesc + "</p>";
		var projcontributions = "<p>" + "Contributions: " + projects.contributions.join(', ') + "</p>";

		result += "<div>" + 
					projTitle + 
					projDesc + 
					projcontributions + 
				  "</div>";
	}
	return result;
}

window.addEventListener("load", function(event) {
	getCVData();
});