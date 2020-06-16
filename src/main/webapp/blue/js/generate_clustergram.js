function generateClustergram(kea_results, top_tfs = 5) {
    let genes = new Set();
    let tfs = ['', ''];
    let libraries = ['', ''];
    let ranks = ['', ''];
    let rows = [];

    $.each(kea_results, function (key, value) {
        if (key.indexOf('Integrated') === -1) {
            for (let i = 0; i < top_tfs; i++) {
                // Value
                const chea_result = value[i];
                const library = key.split('--')[0];
                // Rows
                $.each(chea_result['Overlapping_Genes'].split(','), function (index, gene) {
                    genes.add(gene);
                });
                // Column labels
                tfs.push('Kinase: ' + library + '-' + chea_result['Rank'].padStart(2, '0') + '-' + chea_result['TF']);
                libraries.push('Library: ' + library);
                ranks.push('Rank: ' + chea_result['Rank']);
            }
        }
    });

    // Get values
    $.each(Array.from(genes), function (index, gene) {
        let rowData = ['Gene: ' + gene];
        let gene_bools = [];

        // Get binary values
        $.each(kea_results, function (key, value) {
            if (key.indexOf('Integrated') === -1) {
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
    const columns_str = $.map([tfs, libraries, ranks], function (x) {
        return x.join('\t')
    }).join('\n');
    const matrix_str =  columns_str + '\n' + rows.join('\n');

    let formData = new FormData();
    let blob = new Blob([matrix_str], {type: 'plain/text'});
    formData.append('file', blob, 'kea_clustergram.txt');

    let request = new XMLHttpRequest();
    request.open('POST', 'https://amp.pharm.mssm.edu/clustergrammer/matrix_upload/');
    request.send(formData);

    request.onreadystatechange = function () {
        if (request.readyState === 4) {
            if (request.status === 200) {
                document.getElementById('clustergram-iframe').src = request.responseText.replace("http", "https");
                $('#clustergram-error').addClass('d-none');
            } else {
                $('#clustergram-iframe').addClass('d-none');
                $('#clustergram-error').removeClass('d-none');
            }
        }
    }
}