function apiPokename() {
		let texttPokedata = $("#pokename").val();
		if(texttPokedata == '' || texttPokedata === null || texttPokedata === undefined){
			alert('Debe ingresar el numero del pokemon');
			return false
		}
		$.ajax({
			type: "get",
			url: "https://pokeapi.co/api/v2/pokemon/" + texttPokedata,
			dataType: "json",
			success: function (pokedata) {
				console.log(pokedata)
				$('#imagenPoke').attr('src', pokedata.sprites.front_default);
				$('#namePoke').text(pokedata.name);
				$('#loquequieras').text(pokedata.name);
				graficar(pokedata.stats, pokedata.name);
			},
			error: function(e){
				alert('Ha ocurrido un error');
			}
		});
}

$("#btn").click(function () { //Id del boton
	apiPokename();
});

function graficar(obj, name){
	var stats = [];
	for(let i = 0; i < obj.length; i++){
		let sTemp = {
				label: obj[i].stat.name,
				y: obj[i].base_stat
			}
		stats.push(sTemp);
	}
	let chart = new CanvasJS.Chart("chartContainer", {
		theme: "light1", // "light2", "dark1", "dark2"
		animationEnabled: true, // change to true		
		title:{
			text: "Habilidades del"  + name,
		},
		data: [
		{
			type: "pie",
			dataPoints: stats,
		}
		]
	});
	chart.render();
}