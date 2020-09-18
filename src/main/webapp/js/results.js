var saveSvgAsPng = require('save-svg-as-png');

function save_svg(svg, name){
    saveSvgAsPng.svgAsDataUri(svg, {}, function(uri) {
        downloadUri(uri, `${name}.svg`);
    })
}

function save_png(svg, name) {
    saveSvgAsPng.svgAsPngUri(svg, {}, function(uri) {
        downloadUri(uri, `${name}.png`);
    })
}

function downloadUri(uri, filename) {
    var downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", uri);
    downloadAnchorNode.setAttribute("download", filename);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
}

function drawTable(data, wrapper, name) {
    let data_clean = [];
    for (let k of data) {
        if (k['Overlapping_Genes'] !== "") {
            data_clean.push(k);
        }
    }

    $(wrapper).DataTable({
        width: '100%',
        data: data_clean,
        pagingType: "simple",
        dom: 'lfrtipB',
        buttons: [{
            extend: 'csvHtml5',
            text: '<i class="fas fa-download" title="Download TSV"></i>.tsv',
            filename: name,
            fieldSeparator: '\t',
            extension: '.tsv',
            fieldBoundary: '',
            exportOptions: {
                columns: [ 0, 2, 4, 5, 6]
            }
        }],
        columns: [
            {"mData": "Rank", "sTitle": "Rank"},
            {
                "mData": "TF", "sTitle": "Protein", "mRender": function (x) {
                    return `<a href="https://maayanlab.cloud/Harmonizome/gene/${x}" target="_blank">${x}</a>`
                }
            },
            {
                "mData": "Overlapping_Genes",
                "sTitle": "Overlapping Genes"
            },
            {
                "mData": "Overlapping_Genes",
                "sTitle": "Overlapping Genes",
                "mRender": function (data, type, row) {
                    let geneLinks = [];
                    $.each(row['Overlapping_Genes'].split(',').sort(), function (index, gene) {
                        geneLinks.push(`<a class="gene-link" href="https://maayanlab.cloud/Harmonizome/gene/${gene}" target="_blank">${gene}</a>`);
                    });
                    return $('<div>', {
                        'class': 'popover-button',
                        'data-toggle': 'popover',
                        'data-placement': 'right',
                        'data-trigger': 'focus',
                        'data-html': 'true',
                        'data-template': '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>',
                        'title': 'Genes',
                        'data-content': `${geneLinks.join(" ")}`
                    }).append(
                        `<span tabindex="-1" style="cursor: pointer;text-decoration: underline dotted;">${row['Intersect']}/${row['Set length']}</span>`,
                    ).prop('outerHTML')
                }
            },
            {
                "mData": "FET p-value",
                "sTitle": "FET p-value",
                "mRender": (data, type, row) => row['FET p-value'] < 0.01 ? row['FET p-value'].toExponential(2) : row['FET p-value'].toFixed(3)
            },
            {
                "mData": "FDR",
                "sTitle": "FDR",
                "mRender": (data, type, row) => row['FDR'] < 0.01 ? row['FDR'].toExponential(2) : row['FDR'].toFixed(3)
            },
            {"mData": "Odds Ratio", "sTitle": "Odds Ratio"}
        ],
        columnDefs: [
            {
                "targets": [ 2 ],
                "visible": false
            }
        ],
        drawCallback: function () {
            $('.popover-button').popover();
        }
    })

}

function drawIntegratedTable(data, wrapper, score) {
    let data_clean = [];
    for (let k of data) {
        if (k['Overlapping_Genes'] !== "") {
            data_clean.push(k);
        }
    }

    $(wrapper).DataTable({
        data: data_clean,
        pagingType: "simple",
        dom: 'lfrtipB',
        buttons: [{
            extend: 'csvHtml5',
            text: '<i class="fas fa-download" title="Download TSV"></i>.tsv',
            filename: score,
            fieldSeparator: '\t',
            extension: '.tsv',
            fieldBoundary: '',
            exportOptions: {
                columns: [ 0, 1, 2, 4]
            }
        }],
        columns: [
            {
                "mData": "Rank",
                "sTitle": "Rank"
            },
            {
                "mData": "TF",
                "sTitle": "Protein",
                "mRender": function (x) {
                    return `<a href="https://maayanlab.cloud/Harmonizome/gene/${x}" target="_blank">${x}</a>`
                }
            },
            {
                "mData": "Score",
                "sTitle": score
            },
            {
                "mData": "Score",
                "sTitle": score,
                "className": "score-col",
                "mRender": function (data, type, row, meta) {
                    const libraries = row['Library'].split(';');
                    let rend_libs = [];
                    $.each(libraries, function (index, lib) {
                        const name_val = lib.split(',');
                        rend_libs.push(`<p><b>${name_val[0]}</b>: ${name_val[1]}</p>`)
                    })
                    return $('<div>', {
                        'class': 'popover-button',
                        'data-toggle': 'popover',
                        'data-placement': 'right',
                        'data-trigger': 'focus',
                        'data-html': 'true',
                        'data-template': '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>',
                        'title': 'Libraries',
                        'data-content': `${rend_libs.join('')}`
                    }).append(
                        `<span tabindex="-1" style="cursor: pointer;text-decoration: underline dotted;">${row['Score']}  </span>`,
                    ).prop('outerHTML')
                }
            },
            {
                "mData": "Overlapping_Genes",
                "sTitle": "Overlapping Genes"
            },
            {
                "mData": "Overlapping_Genes",
                "sTitle": "Overlapping Genes",
                "mRender": function (data, type, row, meta) {
                    let geneLinks = [];
                    $.each(row['Overlapping_Genes'].split(',').sort(), function (index, gene) {
                        geneLinks.push(`<a class="gene-link" href="https://maayanlab.cloud/Harmonizome/gene/${gene}" target="_blank">${gene}</a>`);
                    });
                    return $('<div>', {
                        'class': 'popover-button',
                        'data-toggle': 'popover',
                        'data-placement': 'right',
                        'data-trigger': 'focus',
                        'data-html': 'true',
                        'data-template': '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>',
                        'title': 'Genes',
                        'data-content': `${geneLinks.join(" ")}`
                    }).append(
                        `<span tabindex="-1" style="cursor: pointer;text-decoration: underline dotted;">${row['Overlapping_Genes'].split(',').length} genes </span>`,
                    ).prop('outerHTML')
                }
            }
        ],
        columnDefs: [
            {
                "targets": [ 2, 4 ],
                "visible": false
            }
        ],
        drawCallback: function () {
            $('.popover-button').popover();
        },
    })
}