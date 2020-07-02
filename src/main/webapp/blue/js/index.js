let network_mode = ({
    archs4: ({color_by: 'WGCNA_module', num: 10, library: 'Integrated--meanRank'}),
    gtex: ({color_by: 'WGCNA_module', num: 10, library: 'Integrated--meanRank'}),
    tcga: ({color_by: 'WGCNA_module', num: 10, library: 'Integrated--meanRank'})
});

let graph_mode = ({library: 'Integrated--meanRank', num: 10});

let results;

function checkGeneList(data) {
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

function kinases(results, num = results.length) {
    let kinases = [];
    for (let res of results.slice(0, num)) {
        kinases.push(res.TF);
    }
    return kinases;
}

function submitList() {
    $('#placeholder').show();
    const geneset = [...new Set($('#genelist').val().toUpperCase().split(/\n/))].filter(value => hgnc.includes(value));
    if (validateGeneSet(geneset)) {
        $.post(`${location.protocol}//${location.hostname}:${location.port}/kea3/api/enrich/`,
            JSON.stringify({"query_name": "gene_set_query", "gene_set": geneset}),
            function (r) {
                results = r;
                drawIntegratedTable(results['Integrated--meanRank'], '#table-1-1', 'Mean rank');
                drawIntegratedTable(results['Integrated--topRank'], '#table-1-2', 'Integrated scaled rank');

                drawTable(results['ChengKSIN'], '#table-2-1');
                drawTable(results['PTMsigDB'], '#table-2-2');
                drawTable(results['PhosDAll'], '#table-2-3');

                drawTable(results['prePPI'], '#table-3-1');
                drawTable(results['BioGRID'], '#table-3-2');
                drawTable(results['mentha'], '#table-3-3');
                drawTable(results['MINT'], '#table-3-4');
                drawTable(results['HIPPIE'], '#table-3-5');
                drawTable(results['STRING.bind'], '#table-3-6');
                drawTable(results['ChengPPI'], '#table-3-7');
                drawTable(results['STRING'], '#table-4-1');

                $('#placeholder').hide();
                $('#results').show();
                location.hash = "#results";
                stacked_chart(results['Integrated--meanRank'], '#bar-1-1')
                chart(results['Integrated--topRank'], '#bar-1-2', 'Score');
                chart(results['ChengKSIN'], '#bar-2-1');
                chart(results['PTMsigDB'], '#bar-2-2');
                chart(results['PhosDAll'], '#bar-2-3');
                chart(results['prePPI'], '#bar-3-1');
                chart(results['BioGRID'], '#bar-3-2');
                chart(results['mentha'], '#bar-3-3');
                chart(results['MINT'], '#bar-3-4');
                chart(results['HIPPIE'], '#bar-3-5');
                chart(results['STRING.bind'], '#bar-3-6');
                chart(results['ChengPPI'], '#bar-3-7');
                chart(results['STRING'], '#bar-4-1');

                scatter('archs4', kinases(results['Integrated--meanRank']))
                scatter('gtex', kinases(results['Integrated--meanRank']))
                scatter('tcga', kinases(results['Integrated--meanRank']))

                graph('Integrated--meanRank', '#graph-1-1')
                graph('Integrated--topRank', '#graph-1-2', 'Score');
                graph('ChengKSIN', '#graph-2-1');
                graph('PTMsigDB', '#graph-2-2');
                graph('PhosDAll', '#graph-2-3');
                graph('prePPI', '#graph-3-1');
                graph('BioGRID', '#graph-3-2');
                graph('mentha', '#graph-3-3');
                graph('MINT', '#graph-3-4');
                graph('HIPPIE', '#graph-3-5');
                graph('STRING.bind', '#graph-3-6');
                graph('ChengPPI', '#graph-3-7');
                graph('STRING', '#graph-4-1');

                generateClustergram(results);
            })
    }
    return false;
}

$(document).ready(function () {
    uploadFileListener();
})