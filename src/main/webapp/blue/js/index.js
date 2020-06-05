function checkGeneList(data) {
    console.log('index: function checkGeneList(data)');
    const genes = data.toUpperCase().split("\n").filter(Boolean);
    const uniq_genes = [...new Set(genes)];
    const intersect = uniq_genes.filter(value => hgnc.includes(value));
    $('#genecheck').html(`${genes.length}  symbols entered, ${genes.length - uniq_genes.length} duplicates, <span id='num-valid-genes'> ${intersect.length} </span> valid symbols`);
}

function validateGeneSet(geneset) {
    let x = false;
    if (geneset.length > 1 && $('#num-valid-genes').html() === "0") {
        alert("No valid gene symbols have were recognized. Please note that CHEA3 currently only supports HGNC gene symbols (https://www.genenames.org/). If the submitted genes are identified using other systems, such as Ensembl IDs or Entrez IDs, please converting them to HGNC to proceed.");
    } else if (geneset.length >= 20 && geneset.length <= 3000) {
        x = true;
    } else {
        alert("Gene set containing fewer than 20 gene or more than 3,000 genes can produce inaccurate results.");
    }
    return x;
}

function insertExample() {
    $.get('static/example_genelist.txt', function (data) {
        $('#genelist').val(data);
        checkGeneList(data);
    });
    return false;
}

function uploadFileListener() {
    $('#file-input').on('change', function (evt) {
        const f = evt.target.files[0];
        let reader = new FileReader();
        reader.onload = (function () {
            return function (e) {
                $('#genelist').val(e.target.result);
                checkGeneList(e.target.result);
            };
        })(f);
        reader.readAsText(f);
    })
}

function submitList(){
    $('#results').show(500);
    const geneset = [...new Set($('#genelist').val().toUpperCase().split(/\n/))].filter(value => hgnc.includes(value));
    if (validateGeneSet(geneset)) {
        $.post(`${location.protocol}//${location.hostname}:${location.port}/kea3/api/enrich/`,
            JSON.stringify({"query_name": "gene_set_query", "gene_set": geneset}),
            function (results) {
                generateClustergram(results);

                drawIntegratedTable(results['Integrated--meanRank'], '#table-1-1', 'Mean rank');
                drawIntegratedTable(results['Integrated--topRank'], '#table-1-2', 'Integrated scaled rank');

                drawTable(results['ChengKSIN'], '#table-2-1');
                chart(results['ChengKSIN'], '#bar-2-1');
                drawTable(results['PTMsigDB'], '#table-2-2');
                chart(results['PTMsigDB'], '#bar-2-2');
                drawTable(results['PhosDAll'], '#table-2-3');
                chart(results['PhosDAll'], '#bar-2-3');

                drawTable(results['prePPI'], '#table-3-1');
                chart(results['prePPI'], '#bar-3-1');
                drawTable(results['BioGRID'], '#table-3-2');
                chart(results['BioGRID'], '#bar-3-2');
                drawTable(results['mentha'], '#table-3-3');
                chart(results['mentha'], '#bar-3-3');
                drawTable(results['MINT'], '#table-3-4');
                chart(results['MINT'], '#bar-3-4');
                drawTable(results['HIPPIE'], '#table-3-5');
                chart(results['HIPPIE'], '#bar-3-5');
                drawTable(results['STRING.bind'], '#table-3-6');
                chart(results['STRING.bind'], '#bar-3-6');
                drawTable(results['ChengPPI'], '#table-3-7');
                chart(results['ChengPPI'], '#bar-3-7');

                drawTable(results['STRING'], '#table-4-1');
                chart(results['STRING'], '#bar-4-1');

            })
    }
    return false;
}

$(document).ready(function () {
    uploadFileListener();
})