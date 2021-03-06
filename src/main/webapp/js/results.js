var saveSvgAsPng = require('save-svg-as-png');

function save_svg(svg, name) {
    saveSvgAsPng.svgAsDataUri(svg, {}, function (uri) {
        downloadUri(uri, `${name}.svg`);
    })
}

function save_png(svg, name) {
    saveSvgAsPng.svgAsPngUri(svg, {}, function (uri) {
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

    if ($.fn.dataTable.isDataTable(wrapper)) {
        $(wrapper).DataTable().clear().destroy()
    }


    $(wrapper).DataTable({
        width: '100%',
        data: data_clean,
        pagingType: "simple",
        dom: 'lfrtipB',
        responsive: true,
        retrieve: true,
        buttons: [{
            extend: 'csvHtml5',
            text: '<i class="fas fa-download" title="Download TSV"></i>.tsv',
            filename: name,
            fieldSeparator: '\t',
            extension: '.tsv',
            fieldBoundary: '',
            exportOptions: {
                columns: [0, 1, 2, 4, 5, 6]
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
                "sTitle": "Overlapping Proteins"
            },
            {
                "mData": "Overlapping_Genes",
                "sTitle": "Overlapping Proteins",
                "mRender": function (data, type, row) {
                    if (type === "display") {
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
                    } else return row['Intersect'];
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
                "targets": [2],
                "visible": false
            }
        ],
        drawCallback: function () {
            $('.popover-button').popover();
        }
    })

}

function redrawIntTablesOnSlider(num) {
    drawIntegratedTable(results['Integrated--meanRank'], '#table-1-1', 'Mean rank', num);
    drawIntegratedTable(results['Integrated--topRank'], '#table-1-2', 'Integrated scaled rank', num);
}

function drawIntegratedTable(data, wrapper, score, num = 10) {
    let data_clean = [];
    for (let k of data) {
        if (k['Overlapping_Genes'] !== "") {
            data_clean.push(k);
        }
    }

    let mr = results['Integrated--meanRank'].map(d => d['TF']).slice(0, num);
    let tr = results['Integrated--topRank'].map(d => d['TF']).slice(0, num);
    let overlap = mr.filter(value => tr.includes(value));

    if ($.fn.dataTable.isDataTable(wrapper)) {
        $(wrapper).DataTable().clear().destroy()
    }

    $(wrapper).DataTable({
        data: data_clean,
        pagingType: "simple",
        dom: 'lfrtipB',
        retrieve: true,
        buttons: [{
            extend: 'csvHtml5',
            text: '<i class="fas fa-download" title="Download TSV"></i>.tsv',
            filename: score,
            fieldSeparator: '\t',
            extension: '.tsv',
            fieldBoundary: '',
            exportOptions: {
                columns: [0, 1, 2, 4]
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
                    let asterix = overlap.includes(x) ? '*' : '';
                    return `<a href="https://maayanlab.cloud/Harmonizome/gene/${x}" target="_blank">${x}${asterix}</a>`
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
                    if (type === "display") {
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
                    } else return data;
                }
            },
            {
                "mData": "Overlapping_Genes",
                "sTitle": "Overlapping Proteins"
            },
            {
                "mData": "Overlapping_Genes",
                "sTitle": "Overlapping Proteins",
                "mRender": function (data, type, row, meta) {
                    if (type === "display") {
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
                            'data-template': '<div class="popover overflow-auto" role="tooltip"><div class="arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>',
                            'title': 'Genes',
                            'data-content': `${geneLinks.join(" ")}`
                        }).append(
                            `<span tabindex="-1" style="cursor: pointer;text-decoration: underline dotted;">${row['Overlapping_Genes'].split(',').length} proteins </span>`,
                        ).prop('outerHTML')
                    } else return row['Overlapping_Genes'].split(',').length;
                }
            }
        ],
        columnDefs: [
            {
                "targets": [2, 4],
                "visible": false
            }
        ],
        drawCallback: function () {
            $('.popover-button').popover();
        },
    })
}