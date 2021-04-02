scatter = (type, wrapper, color_by, legend_data, num = 10) => {
    const json = `static/json/wgcna_${type}_annotated.json`;
    const k = kinases(results[network_mode[type].library]).slice(0, num);
    const height = 500;
    const width = 900;
    const margin = {top: 30, right: 50, bottom: 30, left: 50};
    $(wrapper).empty();
    const svg = d3.select(wrapper).html(null)
        .attr("viewBox", [0, 0, width, height])
        .attr("class", "global-network");

    d3.json(json).then(function (data) {
        const x = d3
            .scaleLinear()
            .domain(d3.extent(data.map(d => d.x)))
            .range([margin.left, width - margin.right]);

        const y = d3
            .scaleLinear()
            .domain(d3.extent(data.map(d => d.y)))
            .range([margin.top, height - margin.bottom]);

        const node = svg.append("g");

        node
            .selectAll("g")
            .data(data)
            .join("g")
            .append("g")
            .call(g =>
                g
                    .append("circle")
                    .join("circle")
                    .attr("class", "halo")
                    .attr("cx", d => x(d.x))
                    .attr("cy", d => y(d.y))
                    .attr("r", 10)
                    .attr("opacity", d => (k.includes(d.name) ? 0.5 : 0))
                    .style("fill", d => d[color_by])
            )
            .call(g =>
                g
                    .append("circle")
                    .join("circle")
                    .attr("class", "node")
                    .attr("cx", d => x(d.x))
                    .attr("cy", d => y(d.y))
                    .attr("r", 5)
                    .style("fill", d => d[color_by])
            );
        // append labels after displaying all nodes to avoid overlap
        const label = svg.append("g");
        label
            .selectAll("g")
            .data(data)
            .join("g")
            .append("g")
            .call(g =>
                g
                    .append("text")
                    .join("text")
                    .attr("class", "label")
                    .attr("x", d => x(d.x))
                    .attr("y", d => y(d.y))
                    .attr("dy", -12)
                    .attr("text-anchor", "middle")
                    .style("font", "15px sans-serif")
                    .style("font-weight", "600")
                    .style("fill-opacity", d => (k.includes(d.name) ? 1 : 0))
                    .style("stroke", "white")
                    .style("stroke-opacity", d => (k.includes(d.name) ? 0.8 : 0))
                    .style("stroke-width", d => (k.includes(d.name) ? "0.7px" : 0))
                    .text((d) => d.name)
            )

        return svg.node();
    });
    drawLegend(wrapper, legend_data);
    let legend = d3.select(`${wrapper.slice(1)}-legend`);
    legend.raise();
}

function drawLegend(wrapper, legend_data) {
    const height = 500;
    const width = 900;
    const g = d3.select(wrapper)
    const legend = g.append("g")
        .attr("x", width - 100)
        .attr("y", height)
        .attr("height", 100)
        .attr("width", 100)
        .attr("opacity", 0.7)
        .attr("id", `${wrapper.slice(1)}-legend`)
        .style("pointer-events", "none");

    legend.selectAll('g')
        .data(legend_data)
        .enter()
        .append('g')
        .each(function (d, i) {
            const g = d3.select(this);
            g.append("rect")
                .attr("x", width - 118)
                .attr("y", i * 15)
                .attr("width", 10)
                .attr("height", 10)
                .style("stroke-width", 1)
                .style("stroke", "white")
                .style("fill", function (d) {
                    return d.color
                });

            g.append("text")
                .attr("x", width - 105)
                .attr("y", i * 15 + 10)
                .style("fill", "white")
                .style("font-size", "10pt")
                .style("stroke-width", "0.4em")
                .style("stroke", "white")
                .text(function (d) {
                    return d.term
                });

            g.append("text")
                .attr("x", width - 105)
                .attr("y", i * 15 + 10)
                .style("font-size", "10pt")
                .text(function (d) {
                    return d.term
                });
        });
}