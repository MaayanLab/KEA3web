function generateClustergram(wrapper, top_tfs = 5, int = 0) {
    let genes = new Set();
    let tfs = ['', ''];
    let kinases = ['', '']
    let libraries = ['', ''];
    let ranks = ['', ''];
    let rows = [];

    $.each(results, function (key, value) {
        if (key.indexOf('Integrated') === -1 + int) {
            for (let i = 0; i < top_tfs; i++) {
                // Value
                const kea_result = value[i];
                const library = key.split('--')[int];
                // Rows
                $.each(kea_result['Overlapping_Genes'].split(','), function (index, gene) {
                    genes.add(gene);
                });
                // Column labels
                tfs.push(`Kinase results: ${kea_result['TF']} ${library}`);
                kinases.push(`Kinase: ${kea_result['TF']}`);
                libraries.push(`Library: ${library}`);
                ranks.push(`Rank: ${kea_result['Rank']}`);
            }
        }
    });

    // Get values
    $.each(Array.from(genes), function (index, gene) {
        let rowData = ['Gene: ' + gene];
        let gene_bools = [];

        // Get binary values
        $.each(results, function (key, value) {
            if (key.indexOf('Integrated') === -1 + int) {
                for (let i = 0; i < top_tfs; i++) {
                    let gene_bool = value[i]['Overlapping_Genes'].indexOf(gene) > -1 ? 1 : 0;
                    gene_bools.push(gene_bool);
                }
            }
        });

        rowData.push('Count: ' + gene_bools.reduce(function (a, b) {
            return a + b;
        }, 0));
        rowData.push(gene_bools.join('\t'));
        rows.push(rowData.join('\t'));
    });

    // Build string
    const columns_str = $.map([tfs, kinases, libraries, ranks], function (x) {
        return x.join('\t')
    }).join('\n');
    const matrix_str =  columns_str + '\n' + rows.join('\n');

    let formData = new FormData();
    let blob = new Blob([matrix_str], {type: 'plain/text'});
    formData.append('file', blob, 'kea_clustergram.txt');

    let request = new XMLHttpRequest();
    request.open('POST', 'https://maayanlab.cloud/clustergrammer/matrix_upload/');
    request.send(formData);

    request.onreadystatechange = function () {
        if (request.readyState === 4) {
            if (request.status === 200) {
                document.getElementById(`${wrapper}-iframe`).src = request.responseText.replace("http", "https");
                $(`#${wrapper}-error`).addClass('d-none');
            } else {
                $(`#${wrapper}-iframe`).addClass('d-none');
                $(`#${wrapper}-error`).removeClass('d-none');
            }
        }
    }
}