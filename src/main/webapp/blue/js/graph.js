graph = (library, wrapper) => {
    const height = 330;
    const width = 500;
    const k = kinases(results[library], graph_mode.num)

    const link_strength = 0.1;
    const charge_strength = 500;
    const r_mult = 4;

    const svg = d3.select(wrapper).html(null)
        .attr("width", width)
        .attr("height", height)
        .attr("viewBox", [-width / 2, -height / 2, width, height])
        .attr("class", "graph");

    // This json should be loaded in index.js _synchronously_ before calling graph(kinases)
    d3.json('static/json/KEA3_coreg_sub_network.json').then(function (data) {
        let kinase_graph = ({
            links: data.links.filter(function (link) {
                return k.includes(link.source) && k.includes(link.target);
            }),
            nodes: data.nodes.filter(function (node) {
                return k.includes(node.id);
            })
        });

        const font_size = d3
            .scaleLinear()
            .domain([
                d3.min(kinase_graph.nodes, function (d) {
                    return d.id.length;
                }),
                d3.max(kinase_graph.nodes, function (d) {
                    return d.id.length;
                })
            ])
            .range([0.9, 0.7]);

        const links = kinase_graph.links.map(d => Object.create(d));
        const nodes = kinase_graph.nodes.map(d => Object.create(d));

        const simulation = d3
            .forceSimulation(nodes)
            .force(
                "link",
                d3
                    .forceLink(links)
                    .id(d => d.id)
                    .strength(link_strength)
            )
            .force("charge", d3.forceManyBody().strength(-charge_strength))
            .force("collide", d3.forceCollide(d => Math.floor(Math.sqrt(r_mult))))
            .force("x", d3.forceX())
            .force("y", d3.forceY());

        const link = svg
            .append("g")
            .attr("stroke", "#999")
            .attr("stroke-opacity", 0.9)
            .selectAll("line")
            .data(links)
            .join("line")
            .attr("stroke-width", 1.5);

        const node = svg
            .append("g")
            .selectAll("g")
            .data(nodes)
            .join("g")
            .append("g")
            .call(g =>
                g
                    .append("circle")
                    .attr("r", 15)
                    .attr("fill", "#89bff8")
                    .attr("stroke", "#fff")
                    .attr("stroke-width", 1.5)
            )
            .call(g =>
                g
                    .append("text")
                    .attr("class", "text")
                    .attr("text-anchor", "middle")
                    .attr("dy", ".35em")
                    .attr("pointer-events", "none")
                    .attr("opacity", "0.7")
                    .attr("stroke", "white")
                    .attr("stroke-width", 0.3)
                    .style("font", function (d) {
                        return font_size(d.id.length) + "em sans-serif";
                    })
                    .style("font-weight", "bold")
                    .text(function (d) {
                        return d.id;
                    })
                    .attr("labelLength", function () {
                        return this.getComputedTextLength();
                    })
            )
            .call(drag(simulation));

        simulation.on("tick", () => {
            link
                .attr("x1", d => d.source.x)
                .attr("y1", d => d.source.y)
                .attr("x2", d => d.target.x)
                .attr("y2", d => d.target.y);

            node.attr("transform", d => `translate(${d.x},${d.y})`);
        });

        return svg.node();
    });
}

drag = simulation => {
    function dragstarted(d) {
        if (!d3.event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
    }

    function dragged(d) {
        d.fx = d3.event.x;
        d.fy = d3.event.y;
    }

    function dragended(d) {
        if (!d3.event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
    }

    return d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended);
}