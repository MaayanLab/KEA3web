function split_libs(result){
    let vals = 'name,BioGRID,ChengKSIN,ChengPPI,HIPPIE,mentha,MINT,PhosDAll,prePPI,PTMsigDB,STRING,STRING.bind';
    for (let kin of result) {
        let lib_vals = {
            "BioGRID": 0,
            "ChengKSIN": 0,
            "ChengPPI": 0,
            "HIPPIE": 0,
            "mentha": 0,
            "MINT": 0,
            "PhosDAll": 0,
            "prePPI": 0,
            "PTMsigDB": 0,
            "STRING": 0,
            "STRING.bind": 0
        };
        let kinase = kin['TF']; // lol
        let libstring = kin['Library']
        let libs = libstring.split(';');
        for (let l of libs) {
            const nv = l.split(',');
            lib_vals[nv[0]] = parseInt(nv[1]);
        }
        vals = `${vals}\n${kinase},${lib_vals["BioGRID"]},${lib_vals["ChengKSIN"]},${lib_vals["ChengPPI"]},${lib_vals["HIPPIE"]},${lib_vals["mentha"]},${lib_vals["MINT"]},${lib_vals["PhosDAll"]},${lib_vals["prePPI"]},${lib_vals["PTMsigDB"]},${lib_vals["STRING"]},${lib_vals["STRING.bind"]}`;
    }
    return vals
}

function stacked_chart(json, wrapper, num= 10) {
    const data = d3
        .csvParse(
            split_libs(json.slice(0, num)),
            (d, i, columns) => (
                d3.autoType(d), (d.total = d3.sum(columns, c => d[c])), d
            )
        )
        .sort((a, b) => b.total - a.total);

    const margin = ({top: 30, right: 20, bottom: 50, left: 60});
    const height = data.length * 25 + margin.top + margin.bottom;
    const width = 500;
    const svg = d3.select(wrapper);
    const series = d3.stack()
        .keys(data.columns.slice(1))
        (data)
        .map(d => (d.forEach(v => v.key = d.key), d));

    const x = d3.scaleLinear()
        .domain([0, d3.max(series, d => d3.max(d, d => d[1]))])
        .range([margin.left, width - margin.right]);

    let y = d3.scaleBand()
        .domain(data.map(d => d.name))
        .range([margin.top, height - margin.bottom])
        .padding(0.08);

    let color = d3.scaleOrdinal()
        .domain(series.map(d => d.key))
        .range(d3.schemeSpectral[series.length])
        .unknown("#ccc");

    let xAxis = g => g
        .attr("transform", `translate(0,${margin.top})`)
        .call(d3.axisTop(x).ticks(width / 100, "s"))
        .call(g => g.selectAll(".domain").remove());

    let yAxis = g => g
        .attr("transform", `translate(${margin.left},0)`)
        .style("font-size", "12px")
        .style("font-family", "'Lucida Console', Monaco, monospace")
        .call(d3.axisLeft(y).tickSizeOuter(0))
        .call(g => g.selectAll(".domain").remove());

    let formatValue = x => isNaN(x) ? "N/A" : x.toLocaleString("en");

    svg.attr("width", width)
        .attr("height", height)
        .attr("viewBox", [0, 0, width, height])
        .attr("class", "barchart");

    svg.append("g")
        .selectAll("g")
        .data(series)
        .join("g")
        .attr("fill", d => color(d.key))
        .selectAll("rect")
        .data(d => d)
        .join("rect")
        .attr("x", d => x(d[0]))
        .attr("y", (d, i) => y(d.data.name))
        .attr("width", d => x(d[1]) - x(d[0]))
        .attr("height", y.bandwidth())
        .append("title")
        .text(d => `${d.key}: ${formatValue(d.data[d.key])}`);

    svg.append("g").call(xAxis);
    svg.append("g").call(yAxis);

    return svg.node();

}

function chart(json, wrapper, order = "pvalue", color = "steelblue", numBar = 10) {
    let data = json.map(d => ({
        "name": d['TF'],
        "value": order === "pvalue" ? -Math.log10(parseFloat(d["FET p-value"])): parseFloat(d["Score"]),
        "pvalue": parseFloat(d["FET p-value"]),
        "fdr": parseFloat(d["FDR"]),
        "odds": parseFloat(d["Odds Ratio"]),
        "scaled_Rank": parseFloat(d["Scaled Rank"]),
        "mode": order,
        "caption": "-log₁₀(p-value)"
    }));

    data = data.sort((a, b) => b.value - a.value).slice(0, numBar);
    const margin = ({top: 30, right: 20, bottom: 50, left: 60});
    const height = data.length * 25 + margin.top + margin.bottom;
    const width = 500;
    const svg = d3.select(wrapper);
    svg.attr("width", width)
        .attr("height", height)
        .attr("viewBox", [0, 0, width, height])
        .attr("class", "barchart");

    const title = svg.append("text")
        .attr("class", "title")
        .attr("fill", "black")
        .attr("opacity", 0.8)
        .style("font", "12px sans-serif")
        .attr("x", margin.left + (width - margin.left) / 2)
        .attr("y", height - margin.bottom + 40);

    title.text(order === "pvalue" ? decodeURIComponent("%E2%88%92log%E2%82%81%E2%82%80(p%E2%80%90value)") : "Score");

    let x = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.value)])
        .range([margin.left, width - margin.right]);

    let y = d3.scaleBand()
        .domain(data.map(d => d.name))
        .range([margin.top, height - margin.bottom])
        .padding(0.1);

    let xAxis = g => g
        .attr("class", "axis-x")
        .attr("transform", `translate(0,${margin.top})`)
        .call(d3.axisBottom(x).ticks(width / 100).tickSize(height - 80));

    let yAxis = g => g
        .attr("class", "axis-y")
        .attr("transform", `translate(${margin.left}, 0)`)
        .style("text-anchor", "end")
        .call(d3.axisLeft(y).tickSize(0));

    const gx = svg.append("g")
        .call(xAxis)
        .selectAll("line")
        .attr("opacity", 0.1);

    const gy = svg.append("g")
        .call(yAxis)
        .selectAll("text")
        .attr("fill", "black")
        .style("font-size", "12px")
        .style("font-family", "'Lucida Console', Monaco, monospace");

    // Hide axis
    svg.selectAll(".domain")
        .attr("opacity", 0);

    const bar = svg.append("g")
        .attr("fill", color)
        .selectAll("rect")
        .data(data)
        .join("rect")
        .attr("x", x(0))
        .attr("y", d => y(d.name))
        .attr("width", d => x(d.value) - x(0))
        .attr("height", y.bandwidth());

    const label = svg.append("g")
        .attr("fill", "black")
        .attr("opacity", 0.8)
        .attr("text-anchor", "start")
        .style("font-size", "10px")
        .style("font-family", "'Lucida Console', Monaco, monospace")
        .selectAll("text")
        .data(data)
        .join("text")
        .attr("x", x(0) + 10)
        .attr("y", d => y(d.name) + y.bandwidth() / 2)
        .attr("dy", "0.35em")
        .text(d => order === "pvalue" ? decodeURIComponent(`%E2%88%92log%E2%82%81%E2%82%80(${d3.format(".3")(d.pvalue)})`) : d3.format(".3")(d.value));
    return svg.node();
}