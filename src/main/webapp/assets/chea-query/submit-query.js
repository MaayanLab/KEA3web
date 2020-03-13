// +
let chea3Results;
let json;

function checkGeneList(data) {
    const genes = data.toUpperCase().split("\n").filter(Boolean);
    const uniq_genes = [...new Set(genes)];
    const intersect = uniq_genes.filter(value => hgnc.includes(value));
    $('#genecheck').html(`${genes.length}  symbols entered, ${genes.length - uniq_genes.length} duplicates, <span id='num-valid-genes'> ${intersect.length} </span> valid symbols`);
}

function downloadResults(filename, text) {
    const blob = new Blob([text], {type: 'text/csv;charset=utf-8;'});
    if (navigator.msSaveBlob) { // IE 10+
        navigator.msSaveBlob(blob, filename);
    } else {
        let link = document.createElement("a");
        if (link.download !== undefined) { // feature detection
            const url = URL.createObjectURL(blob);
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

function translateNodeColor(val) {
    switch (val) {
        case "Tissue (general)":
            return ("General_tissue_color");
        case "Tissue (specific)":
            return ("Specific_tissue_color");
        case "WGCNA modules":
            return ("WGCNA_hex");
        case "GO Enrichment":
            return ("GO_enrichment_color");
        case "Tumor":
            return ("Tumor_color");
        case "Tissue":
            return ("Tissue_color");
        default:
            return (defaultNodeColor);
    }
}

function defaultNodeColorAll() {
    const colorby_val = document.getElementById("colorby").value;
    const fill = translateNodeColor(colorby_val);
    let nodes = document.querySelectorAll("circle");
    for (let n of nodes) {
        if (fill === defaultNodeColor) {
            n.setAttribute("fill", fill);
        } else {
            n.setAttribute("fill", n.getAttribute(fill));
        }
        n.setAttribute("stroke-width", "0");
    }
}

function getTFs2() {
    const library = $('#library-selectpicker').val();
    const nr_tfs = parseInt($('#tf-slider').val());
    return typeof chea3Results !== "undefined" ? chea3Results[library].slice(0, nr_tfs).map(function (x) {
        return x['TF']
    }) : []
}

function highlightNodes2() {
    for (let tf of getTFs2()) {
        let node = document.getElementById(tf);
        if (node) {
            node.setAttribute("stroke", getColor('colorpicker'));
            node.setAttribute("stroke-width", radius * 2.5);
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
    $('#colorpicker')
        .spectrum({
            color: colorArray[1],
            change: function () {
                recolorAllNodes();
                generateBarChart();
                generateNetwork();
            }
        })
}

function renderDownloadLibraryButton(libraryName, display) {
    const libraryTitle = libraryName.replace(/--/, "_");
    const displayClass = display ? '' : 'd-none';
    return `<a id = "${libraryName}-download" class="btn btn-primary display-7 ${displayClass} download-tsv ml-0" style="padding:0;color:#28a0c9;font-size:80%" 
	onclick="downloadResults('${libraryTitle}.tsv',libraryJSONtoTSV('${libraryName}'));"><span class="mbri-download display-5 mr-2"></span>
	Download All ${libraryTitle.replace('_', ' ')} Results as TSV</a>`

}

function validateGeneSet(geneset) {
    let x = false;
    if (geneset.length > 1 && $('#num-valid-genes').html() === "0") {
        alert("No valid gene symbols have were recognized. Please note that CHEA3 currently only supports HGNC gene symbols (https://www.genenames.org/). If the submitted genes are identified using other systems, such as Ensembl IDs or Entrez IDs, please converting them to HGNC to proceed.");
    } else if (geneset.length > 1 && geneset.length < 8000) {
        x = true;
    } else {
        alert("Gene set must contain more than 1 gene and fewer than 8,000 genes. One gene per line.");
    }
    return x;
}

function intersectionPopover(row, library) {
    const genes = row.Overlapping_Genes.split(','),
        genes_link = genes.map(function (x) {
            return `<a href="https://amp.pharm.mssm.edu/Harmonizome/gene/${x}" target="_blank">${x}</a>`
        });
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
    const libs = row.Library.substr(0, 5) + '...';

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
        let f = evt.target.files[0],
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

function generateDatatable(library, library_results, default_library, filter_top_results = false) {
    let table = $('<table>', {
        'id': library + '-table',
        'class': 'w-100 text-black'
    })
        .append($('<thead>', {'class': 'text-black'}).html($('<tr>')))
        .append($('<tbody>', {'class': 'text-black'}))
        .append($('<tfoot>', {'class': 'text-black'}));

    const tables_wrapper = $('#tables-wrapper');
    tables_wrapper.append(table);

    if (filter_top_results) {
        library_results = library_results.slice(0, filter_top_results);
    }

    let score_th;
    if (library.includes('Integrated')) {
        if (library === 'Integrated--meanRank') {
            score_th = 'Mean Rank';
        } else if (library === 'Integrated--topRank') {
            score_th = 'Integrated Scaled Rank';
        }

        // Initialize
        table.DataTable({
            data: library_results,
            pagingType: "simple",
            columns: [
                {"mData": "Rank", "sTitle": "Rank", "className": "dt-head-center"},
                {
                    "mData": "TF", "sTitle": "Protein", "mRender": function (x) {
                        return `<a href="https://amp.pharm.mssm.edu/Harmonizome/gene/${x}" target="_blank">${x}</a>`
                    }, "className": "dt-head-center"
                },
                //          ^ when that "TF" is changed to Protein, all protein names are replaced with "undefined" in the web display
                {"mData": "Score", "sTitle": score_th, "className": "dt-head-center score-col"},
                {
                    "mData": "Overlapping_Genes",
                    "sTitle": "Overlapping Genes",
                    "mRender": function (data, type, row, meta) {
                        return intersectionPopover(row, library)
                    },
                    "className": "dt-head-center"
                },
                {
                    "mData": "Library", "sTitle": "Library", "mRender": function (data, type, row, meta) {
                        return libraryPopover(row, library)
                    }, "className": "dt-head-left"
                }
            ]
        })

    } else {
        table.DataTable({
            data: library_results,
            pagingType: "simple",
            columns: [
                {"mData": "Rank", "sTitle": "Rank", "className": "dt-head-center"},
                {
                    "mData": "TF", "sTitle": "Protein", "mRender": function (x) {
                        return `<a href="https://amp.pharm.mssm.edu/Harmonizome/gene/${x}" target="_blank">${x}</a>`
                    }, "className": "dt-head-center"
                },
                {"mData": "Set_name", "sTitle": "Set name", "className": "dt-head-center"},
                {"mData": "Set length", "sTitle": "Set size", "className": "dt-head-center"},
                {
                    "mData": "Overlapping_Genes",
                    "sTitle": "Overlapping Genes",
                    "mRender": function (data, type, row, meta) {
                        return intersectionPopover(row, library)
                    },
                    "className": "dt-head-center"
                },
                {"mData": "FET p-value", "sTitle": "FET p-value", "className": "dt-head-center"},
                {"mData": "FDR", "sTitle": "FDR", "className": "dt-head-center"},
                {"mData": "Odds Ratio", "sTitle": "Odds Ratio", "className": "dt-head-center"}
            ]
        })
    }

    tables_wrapper.append(renderDownloadLibraryButton(library, library === default_library));
    if (library !== default_library) {
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
    $.each(chea3Results, function (key, value) {
        generateDatatable(key, value, 'Integrated--meanRank');
    });

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
    let library_selectpicker = $('#library-selectpicker');
    library_selectpicker.change(function (evt) {
        let library = $(evt.target).val();

        // Toggle
        toggleSelectors(library, $('#nav-tab .nav-item.active').attr('aria-controls'));

        // Hide
        $('#tables-wrapper .dataTables_wrapper').addClass('d-none');
        $('.download-tsv').addClass('d-none');

        // Show
        $('#' + library + '-table_wrapper').removeClass('d-none');
        $('#' + library + '-download').removeClass('d-none');
        generateBarChart();
        generateNetwork();
        recolorAllNodes();
    });
    library_selectpicker.val('Integrated--meanRank');

    document.getElementById("colorby").value = "none";
    recolorAllNodes();
    setLegendView();
    location.href = '#top';

    // Popovers
    // Ovrerlapping genes
    $("[id=overlappinggenespopover]").popover({
        html: true,
        trigger: 'click',
        content: function () {
            const content = $(this).attr("data-popover-content");
            return $(content).children(".popover-body").html();
        }
    });

    $(".libspopover").popover({
        html: true,
        trigger: 'click',
        content: function () {
            const content = $(this).attr("data-popover-content");
            return $(content).children(".popover-body").html();
        }
    });
    const matrix_str = buildClustergrammerMatrix(chea3Results);
    generateClustergram(matrix_str);
}

$(document).ready(function () {
    uploadFileListener();
    $('#example-genelist').on('click', function () {
        let gl = document.getElementById("genelist");
        gl.placeholder = "";
        jQuery.get('assets/chea-query/example_genelist.txt', function (data) {
            gl.value = data;
            checkGeneList(data);
        });
    });

    $('#nav-clustergram-tab').on("click", function () {
        const iframe = document.getElementById('clustergram-iframe');
        const src = iframe.dataset.source;
        if (iframe.src === '') {
            iframe.src = src;
        }
    });

    $('#submit-genelist').on('click', function () {
        const geneset = document.getElementById("genelist").value.toUpperCase().split(/\n/);
        const intersect = [...new Set(geneset)].filter(value => hgnc.includes(value));
        const enrich_url = host + "kea3/api/enrich/";
        const payload = {
            "query_name": "gene_set_query",
            "gene_set": intersect
        };
        if (validateGeneSet(intersect)) {
            $('#loading-screen').removeClass('d-none');
            $.ajax({
                type: "POST",
                data: JSON.stringify(payload),
                dataType: "json",
                contentType: "application/json",
                url: enrich_url,
                success: function (results) {
                    displayResults(results);
                }
            });
        }
    });

    $('#nav-tab [data-toggle="tab"]').on('shown.bs.tab', function (evt) {
        toggleSelectors($('#library-selectpicker').val(), $(evt.target).attr('aria-controls'));
    })
});