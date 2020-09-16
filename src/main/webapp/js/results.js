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

function drawTable(data, wrapper) {
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
        dom: 'lfrtiBp',
        buttons: [
            {
                extend: 'csvHtml5',
                // filename: 'Test',
                // text: '<i class="fas fa-download" title="Download SVG"></i>SVG'
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
                        'data-content': `${geneLinks.slice(0, 20).join(" ")}`
                    }).append(
                        `<span tabindex="-1" style="cursor: pointer;text-decoration: underline dotted;">${row['Intersect']}/${row['Set length']}</span>`,
                    ).prop('outerHTML')
                }
            },
            {"mData": "FET p-value", "sTitle": "FET p-value"},
            {"mData": "FDR", "sTitle": "FDR"},
            {"mData": "Odds Ratio", "sTitle": "Odds Ratio"}
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
        dom: 'lfrtiBp',
        buttons: ['csvHtml5'],
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
                        'data-content': `${geneLinks.slice(0, 20).join(" ")}`
                    }).append(
                        `<span tabindex="-1" style="cursor: pointer;text-decoration: underline dotted;">${row['Overlapping_Genes'].length} genes </span>`,
                    ).prop('outerHTML')
                }
            }
        ],
        drawCallback: function () {
            $('.popover-button').popover();
        },
    })
}