console.log('- showAddressAndGmap JS loaded -');

//Executed when Search button is Clicked - Shows Address details and Google Map
document.querySelector("#buscar-button").addEventListener("click", function(){

	console.log('Search button clicked');

	var cep = $('.input').val();
	cep = cep.replace(/-/g, "");

	if (cep.length != 8) {
		console.log ('Invalid CEP: CEP length must be equal to 8');
		cleanAddressInfo();
		removeGmap();
	}
	else {
		console.log('CEP with 8 digits inserted');
		getAddressDetail(cep);
	}
})


/* ---------- Functions --------- */

//Get Json from VIA VEP and run "showAddressAndMap" when succeed
function getAddressDetail(cep){

	console.log('Searching CEP...');

	$.ajax({
	url: "https://viacep.com.br/ws/"+cep+"/json",
	type: "get",
	dataType: "json",
	success:showAddressAndMap
	})
}

//Shows Address Detail and Google Map on 'map-section'
function showAddressAndMap(addressInfo){

	if (addressInfo.logradouro == undefined){
		removeGmap();
		cleanAddressInfo();

		document.querySelector("#logradouro").textContent = 'CEP não existente';

		console.log('Invalid or Nonexistent CEP')
	}

	else {
		console.log('Got Address information');

		document.querySelector("#logradouro").textContent = addressInfo.logradouro;
		document.querySelector("#bairro").textContent = addressInfo.bairro;
		document.querySelector("#localidade").textContent = addressInfo.localidade+" - "+addressInfo.uf;
		document.querySelector("#cep").textContent = addressInfo.cep;

		console.log('Address Details inserted on screen');

		var paramLogradouro = normalizeString(addressInfo.logradouro);
		var paramLocalidade = normalizeString(addressInfo.localidade);
		var paramUF = normalizeString(addressInfo.uf);

		getGmap(paramLogradouro, paramLocalidade, paramUF);
	}
}

//Format Parameter Strings
function normalizeString(param) {
	var str = param.replace(/ /g, "+");
	const normalizedStr = str.normalize('NFD').replace(/([\u0300-\u036f])/g, '');

	return (normalizedStr);
}


//Gets map info from Google Maps API and executes "createGmap" when succed
function getGmap(paramLogradouro, paramLocalidade, paramUF) {

	console.log('Seaching Latitude and Longitude...');

	$.ajax({
		url: "https://maps.googleapis.com/maps/api/geocode/json?address="+paramLogradouro+",+"+paramLocalidade+",+"+paramUF+"&key=AIzaSyDkUqC6E4iJeYmxZgGaweeKEfUfA25ZLME",
		type: "get",
		dataType: "json",
		success: createGmap
		})
}


//Creates Google Map on #google-map
function createGmap(address) {
	addGmap();

	var coordinates = (address.results[0].geometry.location);
 
        var mapa = new google.maps.Map(document.getElementById('google-map'), {
          zoom: 15,
          center: coordinates
        });
 
        var marker = new google.maps.Marker({
          position: coordinates,
          map: mapa,
          title: 'Meu marcador'
        });

    console.log('Gmap created on screen');
}

