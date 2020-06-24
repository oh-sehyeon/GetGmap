console.log('- btnFunctions JS loaded -');

//Functions executed when Main Search Button is clicked
document.querySelector("#buscar-button").addEventListener("click", function(){

	var cep = $('.input').val();
	if (cep.length != 9) {
		removeGmap();
		document.querySelector("#logradouro").textContent = "CEP deve ter 8 dígitos !";
	}
	else if (cep.length == 9){
		disableBuscarBtn();
		addRedoBtn();
		addXbtn();
		addGmap();
	}
})

//Actions executed by ReDo Button
document.querySelector(".redo-button").addEventListener("click", function() {

	cleanAddressInfo();
	removeGmap();
	removeRedoBtn();
	removeXbtn();
	enableBuscarBtn();
	document.querySelector(".input").focus();

	console.log('Redo button clicked: Screen cleaned');
})

//Actions executed by X-Button
document.querySelector(".x-button").addEventListener("click", function(){
	removeGmap();
	removeRedoBtn();
	cleanAddressInfo();
	removeXbtn();
	enableBuscarBtn();

	console.log('X-button clicked: Screen cleaned');
})


//--Functions--//

//Add #google-map on HTML
function addGmap(){
	document.querySelector('.google-map').setAttribute("id", "google-map");
}

//Remove #google-map on HTML
function removeGmap(){
	document.querySelector('.google-map').setAttribute("id", "none");
}

//Add #redo-button on HTML
function addRedoBtn(){
	document.querySelector('.redo-button').setAttribute("id", "none");
}

//Remove #redo-button on HTML
function removeRedoBtn(){
	document.querySelector('.redo-button').setAttribute("id", "redo-button");
}

//Remove all address information
function cleanAddressInfo(){
	document.querySelector("#logradouro").textContent = "";
	document.querySelector("#bairro").textContent = "";
	document.querySelector("#localidade").textContent = "";
	document.querySelector("#cep").textContent = "";
}

//Add #x-button
function addXbtn(){
	document.querySelector('.x-button').setAttribute("id", "x-button");
}

//Remove #x-button
function removeXbtn(){
	document.querySelector('.x-button').setAttribute("id", "none");
}

//Enable Search Button
function enableBuscarBtn(){
	document.querySelector('#DISABLED_buscar-button').setAttribute("id", "buscar-button");
	console.log('Search Button Enabled');
}

//Disable Search Button
function disableBuscarBtn(){
	document.querySelector('#buscar-button').setAttribute("id", "DISABLED_buscar-button");
	console.log('Search Button Disabled');
}
