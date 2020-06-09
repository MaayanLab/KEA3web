function drawTable(data, wrapper) {
    $(wrapper).DataTable({
        width: '100%',
        data: data,
        pagingType: "simple",
        columns: [
            {"mData": "Rank", "sTitle": "Rank"},
            {
                "mData": "TF", "sTitle": "Protein", "mRender": function (x) {
                    return `<a href="https://amp.pharm.mssm.edu/Harmonizome/gene/${x}" target="_blank">${x}</a>`
                }
            },
            {
                "mData": "Overlapping_Genes",
                "sTitle": "Overlapping Genes",
                "mRender": function (data, type, row, meta) {
                    let geneLinks = [];
                    $.each(row['Overlapping_Genes'].split(',').sort(), function (index, gene) {
                        geneLinks.push(`<a class="gene-link" href="https://amp.pharm.mssm.edu/Harmonizome/gene/${gene}" target="_blank">${gene}</a>`);
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
    $(wrapper).DataTable({
        data: data,
        pagingType: "simple",
        columns: [
            {
                "mData": "Rank",
                "sTitle": "Rank"
            },
            {
                "mData": "TF",
                "sTitle": "Protein",
                "mRender": function (x) {
                    return `<a href="https://amp.pharm.mssm.edu/Harmonizome/gene/${x}" target="_blank">${x}</a>`
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
                        geneLinks.push(`<a class="gene-link" href="https://amp.pharm.mssm.edu/Harmonizome/gene/${gene}" target="_blank">${gene}</a>`);
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