scatter = (type) => {
    const wrapper = `#${type}-network`;
    const json = `static/json/wgcna_${type}_annotated.json`;
    const k = kinases(results[network_mode[type].library]).slice(0, network_mode[type].num);
    const color_by = network_mode[type].color_by;
    const height = 500;
    const width = 900;
    const margin = {top: 30, right: 50, bottom: 30, left: 50};

    const svg = d3.select(wrapper).html(null)
        // .attr("width", width)
        // .attr("height", height)
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
                    .append("title")
                    .text(d => d.name)
            );
        // .call(g =>
        //   g
        //     .append("text")
        //     .attr("class", "label")
        //     .attr("x", d => x(d.x))
        //     .attr("y", d => y(d.y))
        //     .attr("dy", -12)
        //     .attr("text-anchor", "middle")
        //     .style("font", "13px sans-serif")
        //     .style("fill-opacity", 0.6)
        //     .text((d, i) => d.name)
        // );

        return svg.node();
    });
}

function drawLegend(type, legend_id, legend_data) {
    console.log('drawLegend')
    const height = 500;
    const width = 900;
    const g = d3.select(`#${type}-network`)
    const legend = g.append("g")
        .attr("class", "legend")
        .attr("id", legend_id)
        .attr("x", width - 100)
        .attr("y", height)
        .attr("height", 100)
        .attr("width", 100)
        .attr("class", "hidden")
        .style("pointer-events", "none");

    legend.selectAll('g').data(legend_data)
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
                .attr("height", 10)
                .attr("width", 100)
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
                .attr("height", 10)
                .attr("width", 100)
                .style("fill", "black")
                .style("stroke-opacity", 0)
                .style("font-size", "10pt")
                .text(function (d) {
                    return d.term
                });
        });
}

function hide_legend(show_legend_id, hide_legend_ids) {
    console.log('hide_legend')
    $(`${show_legend_id}`).show();
    hide_legend_ids.forEach(legend_id => $(`${legend_id}`).hide());
}