function drawTable(data, wrapper) {
    // let columns = [
    //     {title: "Rank", data: 'Rank'},
    //     {title: "Transcription factor", data: 'TF'},
    //     {title: "P-value", data: 'FET p-value'},
    //     {title: "Overlapping genes", data: 'Intersect'}
    // ];
    // $(wrapper).DataTable({
    //     width: '100%',
    //     data: data,
    //     dom: '<"small"f>rt<"small row"ip>',
    //     responsive: true,
    //     columns: columns,
    //     columnsDef: []
    // });

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
            // {"mData": "Set length", "sTitle": "Set size"},
            {
                "mData": "Overlapping_Genes",
                "sTitle": "Overlapping Genes",
                "mRender": function (data, type, row, meta) {
                    return `${row['Intersect']}/${row['Set length']}`
                }
            },
            {"mData": "FET p-value", "sTitle": "FET p-value"},
            {"mData": "FDR", "sTitle": "FDR"},
            {"mData": "Odds Ratio", "sTitle": "Odds Ratio"}
        ]
    })

}

function drawIntegratedTable(data, wrapper, score) {
    $(wrapper).DataTable({
        data: data,
        pagingType: "simple",
        columns: [
            {"mData": "Rank", "sTitle": "Rank"},
            {
                "mData": "TF", "sTitle": "Protein", "mRender": function (x) {
                    return `<a href="https://amp.pharm.mssm.edu/Harmonizome/gene/${x}" target="_blank">${x}</a>`
                }
            },
            //          ^ when that "TF" is changed to Protein, all protein names are replaced with "undefined" in the web display
            {"mData": "Score", "sTitle": score, "className": "score-col"},
            {
                "mData": "Overlapping_Genes",
                "sTitle": "Overlapping Genes",
                "mRender": function (data, type, row, meta) {
                    return `${row['Overlapping_Genes']}`
                }
            },
            {
                "mData": "Library", "sTitle": "Library", "mRender": function (data, type, row, meta) {
                    return 'libraryPopover(row, library)'
                }, "className": "dt-head-left"
            }
        ]
    })
}