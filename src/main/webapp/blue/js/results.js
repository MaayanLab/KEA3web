function drawTable(data, wrapper) {
    let columns = [
        {title: "Rank", data: 'Rank'},
        {title: "TF", data: 'TF'},
        {title: "p-value", data: 'FET p-value'},
        {title: "Overlapping genes", data: 'Overlapping_Genes'}
    ];
    $(wrapper).DataTable({
        width: '100%',
        data: data,
        dom: '<"small"f>rt<"small row"ip>',
        responsive: true,
        columns: columns,
        columnsDef: []
    });
}