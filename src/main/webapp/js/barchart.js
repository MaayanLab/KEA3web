// +

function parseMeanRankLibraries2(nr_tfs) {
    console.log('barchart: function parseMeanRankLibraries2(nr_tfs)');
    const maxMeanRankScore = Math.max(...chea3Results["Integrated--meanRank"].map(a => a.Score).map(Number));
    const toptfsdat = chea3Results["Integrated--meanRank"].slice(0, nr_tfs);
    const tfs = toptfsdat.map(function (x) {
        return x["TF"]
    });
    let libs = Object.keys(chea3Results).map(function (x) {
        return x.replace("--", " ");
    });
    libs = libs.slice(2, libs.length);
    let datasets = [];

    for (let i = 0; i < libs.length; i++) {
        let ranks = Array(tfs.length).fill(null);
        for (let j = 0; j < tfs.length; j++) {
            const ranksinfo = toptfsdat[j]["Library"].split(";").map(function (x) {
                return x.split(",")
            });

            const scaledScore = 1 - toptfsdat[j].Score / maxMeanRankScore;
            for (let k = 0; k < ranksinfo.length; k++) {
                if (ranksinfo[k][0] === libs[i]) {
                    ranks[j] = (ranks[j] + (ranksinfo[k][1] / (ranksinfo.length * toptfsdat[j].Score)) * scaledScore).toFixed(3);
                }
            }
        }

        datasets[i] = {
            label: libs[i],
            data: ranks,
            backgroundColor: Array(ranks.length).fill(colorArray[i]),
            borderWidth: 1
        }
    }
    const data = {
        labels: tfs,
        datasets: datasets
    };
    return (data);
}

function parseLibrary(library, nr_tfs) {
    console.log('barchart: function parseLibrary(library, nr_tfs)');
    let results = chea3Results[library].slice(0, nr_tfs);
    let process_score;
    let title;
    let xlab;
    let label;

    if (library === 'Integrated--topRank') {
        process_score = function (x) {
            return 1 / x['Score']
        };
        title = 'Top Scaled Kinase Ranks from Integrated topRank';
        label = '1/Integrated Scaled Rank';
        xlab = '1/Integrated Scaled Rank';
    } else {
        process_score = function (x) {
            return -Math.log10(x['FET p-value']).toFixed(3)
        };
        title = 'Top Kinase Scores from the ' + library.replace('--', ' ') + ' library';
        label = library.replace('--', ' ') + '-log10 (FET P-Value)';
        xlab = '-log10 (FET P-Value)';
    }
    const data = {
        labels: results.map(function (x) {
            return x['TF']
        }),
        datasets: [{
            label: label,
            data: results.map(process_score),
            backgroundColor: getColor('colorpicker'),
            borderWidth: 1
        }]
    };
    return {data: data, title: title, xlab: xlab}
}

function generateBarChart() {
    console.log('barchart: function generateBarChart()');
    $('#nav-barchart').html('<canvas id="barchart" width="400" height="200"></canvas>');
    const  ctx = document.getElementById('barchart').getContext('2d');
    const library = $('#library-selectpicker').val();
    const nr_tfs = $('#tf-slider').val();

    if (library === "Integrated--meanRank") {
        const data = parseMeanRankLibraries2(nr_tfs);
        new Chart(ctx, {
            type: 'horizontalBar',
            data: data,
            options: {
                title: {
                    display: true,
                    text: "Weighted Library Contribution to Integrated MeanRank Kinase Scores",
                },
                scales: {
                    xAxes: [{
                        stacked: true,
                        scaleLabel: {
                            display: true,
                            labelString: '1 - Scaled MeanRank Score'
                        }
                    }],
                    yAxes: [{
                        stacked: true
                    }]
                }
            }
        });

    } else {
        const barchart_data = parseLibrary(library, nr_tfs);
        new Chart(ctx, {
            type: 'horizontalBar',
            data: barchart_data['data'],
            options: {
                title: {
                    display: true,
                    text: barchart_data['title'],
                },
                scales: {
                    xAxes: [{
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: barchart_data['xlab']
                        }
                    }]
                },
                legend: {
                    display: false
                }
            }
        });
    }
}