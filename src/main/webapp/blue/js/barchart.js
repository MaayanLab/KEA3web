function chart(json, wrapper, color = "steelblue", numBar = "20", order = "pvalue") {
    let data = json.map(d => ({
        "name": d['TF'],
        "value": -Math.log10(parseFloat(d["FET p-value"])),
        "pvalue": parseFloat(d["FET p-value"]),
        "fdr": parseFloat(d["FDR"]),
        "odds": parseFloat(d["Odds Ratio"]),
        "scaled_Rank": parseFloat(d["Scaled Rank"]),
        "mode": "pvalue",
        "caption": "-log₁₀(p-value)"
    }));

    data = data.slice(0, numBar).sort((a, b) => b.value - a.value);
    const margin = ({top: 30, right: 20, bottom: 50, left: 50});
    const height = data.length * 25 + margin.top + margin.bottom;
    const width = 600;
    const svg = d3.select(wrapper);
    svg.attr("width", width)
        .attr("height", height)
        .attr("class", "barchart");

    const title = svg.append("text")
        .attr("class", "title")
        .attr("fill", "black")
        .attr("opacity", 0.8)
        .style("font", "12px sans-serif")
        .attr("x", margin.left + (width - margin.left) / 2)
        .attr("y", height - margin.bottom + 40);

    for (const item in data) {
        data[item].value = data[item].pvalue;
        data[item].mode = order
    }
    title.text("P‐value");
    data.sort((a, b) => a.value - b.value);

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

    // Trim long labels
    const yLabels = data.map(d => d.name.length);
    const maxAvgLen = Math.floor(((Math.min(...yLabels) + Math.max(...yLabels)) / 2));
    const avgLabel = maxAvgLen < 40 ? maxAvgLen : 40;
    gy.text(d => trimLabel(d, avgLabel));

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
        .style("font-size", "12px")
        .style("font-family", "'Lucida Console', Monaco, monospace")
        .selectAll("text")
        .data(data)
        .join("text")
        .attr("x", x(0) + 10)
        .attr("y", d => y(d.name) + y.bandwidth() / 2)
        .attr("dy", "0.35em")
        .text(d => d.mode === "pvalue" ? d3.format(".3")(d.pvalue) : d3.format(".3")(d.value));
    return svg.node();
}

function trimLabel(label, avgLen) {
    if (label.length > avgLen) {return `${label.slice(0, avgLen-1)}…`}
    else if (label.length < avgLen) return label.padEnd(avgLen, '\xa0')
    else return label
}