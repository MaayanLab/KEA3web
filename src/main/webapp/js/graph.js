graph = (library, wrapper) => {
    const height = 330;
    const width = 500;
    const k = kinases(results[library], graph_mode.num)

    // Arrow ends
    const markerBoxWidth = 10;
    const markerBoxHeight = 10;
    const refX = 30;
    const refY = 5;
    const markerWidth = markerBoxWidth / 2;
    const markerHeight = markerBoxHeight / 2;
    const arrowPoints = [[0, 0], [0, 10], [10, 5]];

    const link_strength = 0.1;
    const charge_strength = 500;
    const r_mult = 4;

    const svg = d3.select(wrapper).html(null)
        // .attr("width", width)
        // .attr("height", height)
        .attr("viewBox", [0, 0, width, height])
        .attr("class", "graph");

    const marker = svg
        .append('defs')
        .append('marker')
        .attr('id', 'arrow')
        .attr('viewBox', [0, 0, markerBoxWidth, markerBoxHeight])
        .attr('refX', refX)
        .attr('refY', refY)
        .attr('markerWidth', markerWidth)
        .attr('markerHeight', markerHeight)
        .attr('orient', 'auto-start-reverse')
        .append('path')
        .attr('d', d3.line()(arrowPoints))
        .attr('fill', '#999');

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
            .force("x", d3.forceX(width/2))
            .force("y", d3.forceY(height/2));

        const tooltip = d3.select("body").append("div")
            .attr("class", "svg-tooltip")
            .style("position", "absolute")
            .style("visibility", "hidden");

        const link = svg
            .append("g")
            .attr("stroke", "#999")
            .attr("stroke-opacity", 0.9)
            .selectAll("line")
            .data(links)
            .join("line")
            .attr("stroke-width", 1.5)
            .attr('marker-start', 'url(#arrow)')
            .on("mouseover", function(d){
                return tooltip.style("visibility", "visible").text(`Kinase substrate evidence\n\t${d.kinase_substrate_evidence.split(', ').join('\n\t')}\n\nPPI evidence\n\t${d.ppi_evidence.split(', ').join('\n\t')}`);
            })
            .on("mousemove", function(){
                return tooltip.style("top", (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px");
            })
            .on("mouseout", function(){
                return tooltip.style("visibility", "hidden").text('');
            });

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