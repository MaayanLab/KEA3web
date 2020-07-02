scatter = (type) => {
    const wrapper = `#${type}-network`;
    const json = `static/json/wgcna_${type}_annotated.json`;
    const k = kinases(results[network_mode[type].library]).slice(0, network_mode[type].num);
    const color_by = network_mode[type].color_by;
    const height = 500;
    const width = 900;
    const margin = {top: 30, right: 50, bottom: 30, left: 50};

    const svg = d3.select(wrapper).html(null)
        .attr("width", width)
        .attr("height", height)
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