let sourceContentInEdition = "";

$('nav.left-menu button.expand').click(function(event){
    $(this).find('i').toggleClass('fa fa-forward fa fa-backward');
	$('nav.left-menu').toggleClass('active');
	$('main').toggleClass('collapsed');
	$('footer').toggleClass('collapsed');

	if (editor) {
		editor.layout();
	}
});

$('#btnSource').click(function(event){
	loadInc('/inc/source.html', $('main.content'))
});

function loadInc(url, container){
	return fetch(url)
	.then(function(response) {
		return response.text();
	})
	.then(function(data) {
		$(container).html(data);
		return "OK";
	})
	.catch(function(error) {
		console.log('There has been a problem with your fetch operation[loadInc]: ' + error.message);
	});
}

function loadObj(callback, url, obj, node){
	return fetch(url).then(function(response) {
		return response.text();
	})
	.then(function(data) {
		return callback(data, obj, node);
	})
	.catch(function(error) {
		console.log('There has been a problem with your fetch operation[loadObj]: ' + error.message);
	});
}

function loadCombo(data, obj){
	$(obj).empty();
	let combo = JSON.parse(data);
		combo = combo[Object.keys(combo)[0]];

	$(obj).append(`<option value="">Selecione uma opção</option>`);
	for(let i=0; i< combo.length; i++){
		$(obj).append(`<option value="${Object.values(combo[i])[0]}">${Object.values(combo[i])[1]}</option>`);
	}
	return "OK";
}

function addBreadcrumb(node){
	$('ol.breadcrumb').append(`<li class="breadcrumb-item"><a href="#" onclick="updateBreadcrumb('${node}')">${node}</a></li>`);
}

function updateBreadcrumb(node){
	let combo = $('.combo-source').val();
	let li = $('ol.breadcrumb').find('li');
	let i=(li.length-1);
	while(true){
		$(li[i]).remove();
		if(node==li[i].innerText){
			break;
		}
		i--;
	};

	if(node==combo){
		setSource();
	}else{	
		loadObj(loadTable, `/data/${combo}TableSource.json`, '.table-source', node);
	}
}

function clearBreadcrumb(){
	$('ol.breadcrumb').html('');
}

//IMPLEMENTADO USO DE JsonXpath
function loadTable(data, obj, node){
	$(obj).find("tr:gt(0)").remove();
	let table = JSON.parse(data);

		if(!node) {
			node = $('.combo-source').val();
			addBreadcrumb(node);
			table = jsonPath(table, node);
		}else{
			addBreadcrumb(node);
			let arr1 = jsonPath(table, "$..source");
			let i=0;
			let arr2 = null;
			let x = null;
			for(i=0; i<arr1.length; i++){
				if(arr1[i].includes(node)){
					arr2 = jsonPath(table, "$..source", {resultType:"PATH"});
					x = arr2[i];
					x = new String(x).replace("['source']", "");
					table = jsonPath(table, x+".inside");
					break;
				}
			}
		}
		for(let i=0; i< table[0].length; i++){
			$(obj).append(
				`<tr>
					<td data-type="${table[0][i].type}" data-url="${table[0][i].source}">${table[0][i].icon} ${table[0][i].source}</td>
					<td>${table[0][i].description}</td>
					<td>${table[0][i].lastModified}</td>
				</tr>`
			);
		}

	return "OK";
}

function setSource(){
	clearBreadcrumb();
	return Promise.resolve()
	.then(function(){
		return loadInc('/inc/sourceTable.html', $('div.source-content'));
	})
	.then(function(){
		let combo = $('.combo-source').val();
		return loadObj(loadTable, `/data/${combo}TableSource.json`, '.table-source', null);
	});
}