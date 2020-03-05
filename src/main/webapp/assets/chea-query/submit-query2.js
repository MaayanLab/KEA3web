var defaultNodeColor = '#d3d3d3';
var chea3Results;
var json;
const colorArray = ['#e6194B', '#3cb44b', '#ffe119', '#4363d8', '#cf5c0a', '#911eb4', '#42d4f4', '#f032e6', '#bfef45', '#fabebe', '#469990', '#e6beff', '#9A6324', '#fffac8', '#800000', '#aaffc3'];

function downloadResults(filename, text){
	var blob = new Blob([text], { type: 'text/csv;charset=utf-8;' });
    if (navigator.msSaveBlob) { // IE 10+
        navigator.msSaveBlob(blob, filename);
    }else {
        var link = document.createElement("a");
        if (link.download !== undefined) { // feature detection
            var url = URL.createObjectURL(blob);
            link.setAttribute("href", url);
            link.setAttribute("download", filename);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }
    
}

function sliderChange() {
	recolorAllNodes();
	setLegendView();
	generateNetwork();
	generateBarChart();
	$('#nr-selected-tfs').html($('#tf-slider').val());
}

function getColor(id) {
	return ($("#" + id).spectrum('get').toHexString())
}

function translateNodeColor(val){
	if(val == "Tissue (general)"){
		return("General_tissue_color");
	}else if (val == "Tissue (specific)"){
		return("Specific_tissue_color");
	}else if(val == "WGCNA modules"){
		return("WGCNA_hex");
	}else if(val == "GO Enrichment"){
		return("GO_enrichment_color");
	}else if(val == "Tumor"){
		return("Tumor_color");	
	}else if(val == "Tissue"){
		return("Tissue_color");
		
	}
	else{
		return(defaultNodeColor);
	}
}

function defaultNodeColorAll(){
	
	var colorby_val = document.getElementById("colorby").value;
	var fill = translateNodeColor(colorby_val);
	nodes = document.querySelectorAll("circle");
	for (var n of nodes) {
		if(fill == defaultNodeColor){
			n.setAttribute("fill",fill);	
		}else{
			n.setAttribute("fill",n.getAttribute(fill));	
		}
		n.setAttribute("stroke-width","0");
		
	}
}

// function getTFs(slider){
// 	var set1Values = chea3Results[slider.id.replace('_slider', '')].map(function (transcriptionFactors) {
// 		return transcriptionFactors.TF;
// 	});
// 	var set1ValuesSliderSubset = set1Values.splice(0, slider.value);
// 	return set1ValuesSliderSubset
// }

function getTFs2(){
	var library = $('#library-selectpicker').val(),
			nr_tfs = parseInt($('#tf-slider').val());
	return typeof chea3Results !== "undefined" ? chea3Results[library].slice(0, nr_tfs).map(function (x) {
		return x['TF']
	}) : []
}

function highlightNodes2() {
	set1ValuesSliderSubset = getTFs2();

	for (var tf of set1ValuesSliderSubset) {
		node = document.getElementById(tf);
		if (node) {
			node.setAttribute("stroke", getColor('colorpicker')); //getColor(colorpicker_id)
			node.setAttribute("stroke-width", radius * 2.5)
			node.setAttribute("stroke-opacity", .5)
		}
	}
}

function recolorAllNodes() {
	defaultNodeColorAll();
	highlightNodes2();
}

function addSliderEventListener() {
	document.getElementById('tf-slider').addEventListener('change', sliderChange);
}

function renderColorPicker() {
	// New colorpicker
	$('#colorpicker')
		.spectrum({
			color: colorArray[1],
			change: function() {
				recolorAllNodes();
				generateBarChart();
				generateNetwork();
			}
		})
}

function renderDownloadLibraryButton(libraryName, display){
	var libraryTitle = libraryName.replace("--","_");
	var libraryTitle = libraryTitle.replace("--","_");
	var displayClass = display ? '' : 'd-none';
	return `<a id = "${libraryName}-download" class="btn btn-primary display-7 ${displayClass} download-tsv ml-0" style="padding:0;color:#28a0c9;font-size:80%" 
	onclick="downloadResults('${libraryTitle}.tsv',libraryJSONtoTSV('${libraryName}'));"><span class="mbri-download display-5 mr-2"></span>
	Download All ${libraryTitle.replace('_', ' ')} Results as TSV</a>`

}

function validateGeneSet(geneset) {
	var x = false;
	console.log($('#num-valid-genes').html());
	if (geneset.length > 1 & $('#num-valid-genes').html() === "0") {
		alert("No valid gene symbols have were recognized. Please note that CHEA3 currently only supports HGNC gene symbols (https://www.genenames.org/). If the submitted genes are identified using other systems, such as Ensembl IDs or Entrez IDs, please converting them to HGNC to proceed.");
	}
	else if (geneset.length > 1 & geneset.length < 8000) {
		x = true;
	} else {
		alert("Gene set must contain more than 1 gene and fewer than 8,000 genes. One gene per line.");
	}
	return x;
}

function intersectionPopover(row, library) {
	var genes = row.Overlapping_Genes.split(','),
			genes_link = genes.map(function(x) { return `<a href="https://amp.pharm.mssm.edu/Harmonizome/gene/${x}" target="_blank">${x}</a>` });
	return `
<div class="w-100 text-center">
	<button id="overlappinggenespopover" tabindex="0" type="button" class="btn-link display-7 nodecoration cursor-pointer" style="border:none; color:#28a0c9" data-popover-content="#${library}-${row.Rank}" data-toggle="popover" data-placement="right">${genes.length}</button>
	<div id="${library}-${row.Rank}" style="display:none;">
		<div class="popover-body">
			<button type="button" class="nodecoration cursor-pointer popover-close close pr-2" onclick="$(this).parents('.popover').popover('hide');">&times</button>
			<div class="gene-popover">${genes_link.join(', ')}</div>
			<a id = "downloadOverlap" class="btn btn-link display-7" style="padding:0;color:#28a0c9;font-size:80%" onclick="downloadResults('overlap.csv','${genes}');">
			<span class="mbri-save mbr-iconfont mbr-iconfont-btn display-7"></span>Download overlapping gene list</a>
		</div>
	</div>
</div>`
}

function libraryPopover(row, library) {
	var libs = row.Library.substr(0,5) + '...';
	
	return `
<div class="w-100 text-center">
	<button class="libspopover" tabindex="0" type="button" class="btn-link display-7 nodecoration cursor-pointer" style="border:none; color:#28a0c9" data-popover-content="#${library}-${row.Rank}-library" data-toggle="popover" data-placement="right">${libs}</button>
	<div id="${library}-${row.Rank}-library" style="display:none;">
		<div class="popover-body">
			<button type="button" class="nodecoration cursor-pointer popover-close close pr-2" onclick="$(this).parents('.popover').popover('hide');">&times</button>
			<div>${row.Library}</div>
		</div>
	</div>
</div>`
}

function uploadFileListener() {
	$('#file-input').on('change', function (evt) {
		var f = evt.target.files[0],
				reader = new FileReader();

		// Closure to capture the file information.
		reader.onload = (function () {
			return function (e) {
				$('#genelist').val(e.target.result);
				checkGeneList(e.target.result);
			};
		})(f);

		reader.readAsText(f);
	})
}

function generateDatatable(library, library_results, default_library, filter_top_results=false) {

	// Create table
	var $table = $('<table>', { 'id': library + '-table', 'class': 'w-100 text-black' }) // + (library === default_library ? '' : 'd-none')
		.append($('<thead>', { 'class': 'text-black' }).html($('<tr>')))
		.append($('<tbody>', { 'class': 'text-black' }))
		.append($('<tfoot>', { 'class': 'text-black' }));

	// Append
	$('#tables-wrapper').append($table);

	// Filter
	if (filter_top_results) {
		library_results = library_results.slice(0, filter_top_results);
	}

	// Integrated libraries
	if (library.includes('Integrated')) {
		
		// Get score column
		if (library === 'Integrated--meanRank') {
			score_th = 'Mean Rank';
			library_render = function (x) { return x }
		} else if (library === 'Integrated--topRank') {
			score_th = 'Integrated Scaled Rank';
			library_render = function (x) { return x.split(',')[0] }
		}

		// Initialize
		$table.DataTable({
			data: library_results,
			pagingType: "simple",
			columns: [
				{ "mData": "Rank", "sTitle": "Rank" , "className": "dt-head-center"},
				//{ "mData": "TF", "sTitle": "TF", "mRender": function (x) { return `<a href="https://amp.pharm.mssm.edu/Harmonizome/gene/${x}" target="_blank">${x}</a>` } , "className": "dt-head-center"},
				{ "mData": "TF", "sTitle": "Protein", "mRender": function (x) { return `<a href="https://amp.pharm.mssm.edu/Harmonizome/gene/${x}" target="_blank">${x}</a>` } , "className": "dt-head-center"},
				//          ^ when that "TF" is changed to Protein, all protein names are replaced with "undefined" in the web display
				{ "mData": "Score", "sTitle": score_th , "className": "dt-head-center score-col"},
				{ "mData": "Overlapping_Genes", "sTitle": "Overlapping Genes", "mRender": function (data, type, row, meta) { return intersectionPopover(row, library) } , "className": "dt-head-center"},
				{ "mData": "Library", "sTitle": "Library", "mRender": function (data, type, row, meta) { return libraryPopover(row, library) } , "className": "dt-head-left" }
			]
		})

	} else {

		// Initialize
		$table.DataTable({
			data: library_results,
			pagingType: "simple",
			columns: [
				{ "mData": "Rank", "sTitle": "Rank" , "className": "dt-head-center"},
				{ "mData": "TF", "sTitle": "Protein", "mRender": function (x) { return `<a href="https://amp.pharm.mssm.edu/Harmonizome/gene/${x}" target="_blank">${x}</a>` } , "className": "dt-head-center"},
				// { "mData": "TF", "sTitle": "Protein", "mRender": function (x) { return `<a href="https://amp.pharm.mssm.edu/Harmonizome/gene/${x}" target="_blank">${x}</a>` } , "className": "dt-head-center"},
				//          ^ same issue here
				{ "mData": "Set_name", "sTitle": "Set name" , "className": "dt-head-center"},
				{ "mData": "Set length", "sTitle": "Set size" , "className": "dt-head-center"},
				{ "mData": "Overlapping_Genes", "sTitle": "Overlapping Genes", "mRender": function (data, type, row, meta) { return intersectionPopover(row, library) } , "className": "dt-head-center"},
				{ "mData": "FET p-value", "sTitle": "FET p-value" , "className": "dt-head-center"},
				{ "mData": "FDR", "sTitle": "FDR" , "className": "dt-head-center"},
				{ "mData": "Odds Ratio", "sTitle": "Odds Ratio", "className": "dt-head-center" }
			]
		})
	}

	// Append
	$('#tables-wrapper').append(renderDownloadLibraryButton(library, library === default_library));

	// Hide
	if (library != default_library) {
		$(`#${library}-table_wrapper`).addClass('d-none');
	}
}

function toggleSelectors(library, tab) {
	if (tab.includes('network')) {
		$('.tf-selector').removeClass('d-none');
	} else if (tab.includes('barchart')) {
		$('.tf-selector').removeClass('d-none');
		if (library === 'Integrated--meanRank') {
			$('#colorpicker-col').addClass('d-none');
		}
	} else {
		$('.tf-selector').addClass('d-none');
	}
}

function displayResults(results) {

	chea3Results = results;

	// Loop through results
	default_library = 'Integrated--meanRank';
	$.each(chea3Results, function (key, value) {
		generateDatatable(key, value, default_library);
	})

	// Add libraries
	addSliderEventListener();
	generateNetwork();
	generateBarChart();
	renderColorPicker();

	// Toggle views
	$('#homepage').addClass("d-none");
	$("#results").removeClass("d-none");
	$('#loading-screen').addClass('d-none');
	
	// Create selectpicker
	$('#library-selectpicker').change(function (evt) {
		var library = $(evt.target).val();

		// Toggle
		toggleSelectors(library=$(evt.target).val(), tab = $('#nav-tab .nav-item.active').attr('aria-controls'));

		// Hide
		$('#tables-wrapper .dataTables_wrapper').addClass('d-none');
		$('.download-tsv').addClass('d-none');

		// Show
		$('#' + library + '-table_wrapper').removeClass('d-none');
		$('#' + library + '-download').removeClass('d-none');
		generateBarChart();
		generateNetwork();
		recolorAllNodes();
	})
	$('#library-selectpicker').selectpicker('val', default_library);

	document.getElementById("colorby").value = "none";
	recolorAllNodes();
	setLegendView();
	location.href = '#top'

	// Popovers
	// Ovrerlapping genes
	$("[id=overlappinggenespopover]").popover({
		html: true,
		trigger: 'click',
		content: function () {
			var content = $(this).attr("data-popover-content");
			return $(content).children(".popover-body").html();
		}
	});
	
	$(".libspopover").popover({
		html: true,
		trigger: 'click',
		content: function () {
			var content = $(this).attr("data-popover-content");
			return $(content).children(".popover-body").html();
		}
	});

	// Clustergrammer
	// Get matrix and send to clustergrammer
	matrix_str = buildClustergrammerMatrix(chea3Results);
	generateClustergram(matrix_str);


}

$(document).ready(function () {

	uploadFileListener()	
	
	$('#example-genelist').on('click', function () {
		var gl = document.getElementById("genelist");
		gl.placeholder = "";
		jQuery.get('assets/chea-query/example_genelist.txt', function (data) {
			gl.value = data;
			checkGeneList(data);
		});

	});

	// Submit genelist button event listener
	$('#submit-genelist').on('click', function (evt) { 

		var geneset = document.getElementById("genelist").value.split(/\n/); 
		var geneset = geneset.map(function(x){return x.toUpperCase()})
		var uniq_genes = [...new Set(geneset)];
		var intersect = uniq_genes.filter(value => hgnc.includes(value));
		var enrich_url = host + "kea3/api/enrich/";
		var payload = {
				"query_name" : "gene_set_query",
				"gene_set" : intersect
		}

		if (validateGeneSet(intersect)) { 

			$('#loading-screen').removeClass('d-none');

			// send gene set to java servlet
			$.ajax({ 
				type: "POST",
				data: JSON.stringify(payload),
				dataType: "json",
				contentType: "application/json",
				url : enrich_url, 
				success : function(results) { 
					displayResults(results);

				} //end success function 
			}); // end AJAX call

		} 
	});

	// Tab listener
	$('#nav-tab [data-toggle="tab"]').on('shown.bs.tab', function (evt) {
		toggleSelectors(library=$('#library-selectpicker').val(), tab = $(evt.target).attr('aria-controls'));
	})

	// Automatic genelist submission for dev
	var dev = false;
	if (dev) {
		$('#loading-screen').removeClass('d-none');
		$.get("chea3Results.json", function (results) { //dev
			displayResults(results);
		})
	}


});








