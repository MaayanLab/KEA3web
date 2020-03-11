function createNetwork(coreg_network, tfs) {
    console.log("createNetwork(coreg_network, tfs)");
    let network = {"nodes": [], "links": []};
    $.each(coreg_network, function (index, edge) {
        if (tfs.includes(edge['KINA']) && tfs.includes(edge['KINB'])) {
            edge['source'] = edge['KINA'];
            edge['target'] = edge['KINB'];
            network['links'].push(edge);
        }
    });
    $.each(tfs, function (index, tf) {
        network["nodes"].push({
            "id": tf, "name": tf, "label": tf, "degree": network['links'].filter(function (d) {
                return d.KINA === tf || d.KINB === tf
            }).length
        })
    });
    return network
}

function displayNetwork(network) {
    console.log("displayNetwork(network)");
    let svg = d3.select("#coreg-network"),
        width = +svg.attr("width"),
        height = +svg.attr("height"),
        node,
        link;

    svg.selectAll('*').remove();

    let zoom_wrapper = svg.append("g");

    // Tooltips elements
    let tooltip_wrapper = svg.append('g');
    let bg = tooltip_wrapper.append('rect')
        .attr('fill', 'transparent')
        .attr('stroke-width', 1)
        .attr('rx', 5)
        .attr('ry', 5);

    let txt = tooltip_wrapper.append('text')
        .attr("opacity", 0);

    // Define arrows
    zoom_wrapper.append("defs").selectAll("marker")
        .data(["arrow"])
        .enter().append("marker")
        .attr("id", "markerEnd")
        .attr("viewBox", "0 -5 10 10")
        .attr("refX", 19)
        .attr("refY", -0, 7)
        .attr("markerWidth", 9)
        .attr("markerHeight", 9)
        .attr('markerUnits', "userSpaceOnUse")
        .attr("orient", "auto")
        .append("path")
        .attr("d", "M0,-5L10,0L0,5");

    zoom_wrapper.append("defs").selectAll("marker")
        .data(["arrow"])
        .enter().append("marker")
        .attr("id", "markerStart")
        .attr("viewBox", "0 -5 10 10")
        .attr("refX", -10)
        .attr("refY", -0, 7)
        .attr("markerWidth", 9)
        .attr("markerHeight", 9)
        .attr('markerUnits', "userSpaceOnUse")
        .attr("orient", "auto")
        .append("path")
        .attr("d", "M0,0L10,-5L10,5Z");

    // Force directed
    let simulation = d3.forceSimulation()
        .force("link", d3.forceLink().id(function (d) {
            return d.id;
        }).distance(100).strength(0.1))
        .force("charge", d3.forceManyBody().theta(0.9).distanceMin(1).distanceMax(Infinity))
        .force("center", d3.forceCenter(width / 2, height / 2));

    // Tooltip variables
    const pad = 20,
        dy = '1.3em',
        xpos = 10,
        ypos = 0;
    let nr_lines = 0;

    // Functions to create network
    function update(links, nodes) {
        link = zoom_wrapper.selectAll(".link")
            .data(links)
            .enter()
            .append("line")
            .attr("class", "link")
            .attr("stroke", "#999")
            .attr("opacity", function (d) {
                return d.edge_score / 8
            })
            .attr("stroke-width", function (d) {
                return d.edge_score
            })
            .attr('marker-start', function (d) {
                return ['BA', 'bidir'].indexOf(d.edge_type) > -1 ? 'url(#markerStart)' : null
            })
            .attr('marker-end', function (d) {
                return ['AB', 'bidir'].indexOf(d.edge_type) > -1 ? 'url(#markerEnd)' : null
            })
            .on("mouseover", function (d) {
                let mousePos = d3.mouse(this);
                txt.selectAll('*').remove();
                txt.append('tspan')
                    .attr('dy', dy)
                    .attr('x', 10)
                    .attr('font-weight', 'bold')
                    .style('z-index', 1000)
                    .text('Interaction evidence sources:');
                // TODO is to "none" or null?
                if (d["ABkinsub"] !== "none") {
                    txt.append('tspan')
                        .attr('dy', dy)
                        .attr('x', 15)
                        .text('   •  Kinase-substrate (' + d['KINA'] + '→' + d['KINB'] + '): ' + d["ABkinsub"]);
                }
                if (d["BAkinsub"] !== "none") {
                    txt.append('tspan')
                        .attr('dy', dy)
                        .attr('x', 15)
                        .text('   •  Kinase-substrate (' + d['KINB'] + '→' + d['KINA'] + '): ' + d["BAkinsub"]);
                }
                if (d["ppi_evidence"] !== "none") {
                    txt.append('tspan')
                        .attr('dy', dy)
                        .attr('x', 15)
                        .text('   • ' + 'PPI: ' + d["ppi_evidence"]);
                }

                nr_lines = txt.selectAll('tspan')._groups[0].length;
                let max_length = Math.max.apply(null, Array.from(txt.selectAll('tspan')._groups[0]).map(function (x) {
                    return x.innerHTML.length
                }));

                txt.attr("transform", "translate(" + (mousePos[0] + xpos) + "," + (mousePos[1] + ypos - nr_lines * pad) + ")")
                    .attr("opacity", 1);

                bg.attr('fill', '#fcfcfc')
                    .attr('width', max_length * 8.8)
                    .attr('height', pad * nr_lines + 10)
                    .attr('transform', 'translate(' + (mousePos[0]) + ',' + (mousePos[1] + ypos - nr_lines * pad) + ')')
                    .attr('stroke', 'lightgrey')

            })
            .on("mousemove", function () {
                let mousePos = d3.mouse(this);
                txt.attr("transform", "translate(" + (mousePos[0] + xpos) + "," + (mousePos[1] + ypos - nr_lines * pad) + ")");
                bg.attr("transform", "translate(" + (mousePos[0] + xpos) + "," + (mousePos[1] + ypos - nr_lines * pad) + ")");
            })
            .on("mouseout", function () {
                txt.attr("opacity", 0);
                bg.attr("fill", "transparent")
                    .attr("stroke", "transparent");
            });
        // TODO WTF??? It should be local under LET, not global
        edgepaths = zoom_wrapper.selectAll(".edgepath")
            .data(links)
            .enter()
            .append('path')
            .attr('class', 'edgepath')
            .attr('fill-opacity', 0)
            .attr('stroke-opacity', 0)
            .attr('id', function (d, i) {
                return 'edgepath' + i
            })
            .style("pointer-events", "none");

        node = zoom_wrapper.selectAll(".node")
            .data(nodes)
            .enter()
            .append("g")
            .attr("class", "node")
            .call(d3.drag()
                    .on("start", dragstarted)
                    .on("drag", dragged)
                // .on("end", dragended)
            );

        node.append("circle")
            .attr("r", 7)
            .style("stroke",  "lightgrey")
            .style("stroke-width", 1)
            .style("fill", getColor('colorpicker'));

        node.append("title")
            .text(function (d) {
                return d.id;
            });

        node.append("text")
            .attr("dy", -3)
            .text(function (d) {
                return d.name;
            });

        simulation
            .nodes(nodes)
            .on("tick", ticked);

        simulation.force("link")
            .links(links);
    }

    function ticked() {
        link
            .attr("x1", function (d) {
                return d.source.x;
            })
            .attr("y1", function (d) {
                return d.source.y;
            })
            .attr("x2", function (d) {
                return d.target.x;
            })
            .attr("y2", function (d) {
                return d.target.y;
            });

        node
            .attr("transform", function (d) {
                return "translate(" + d.x + ", " + d.y + ")";
            });

        edgepaths.attr('d', function (d) {
            return 'M ' + d.source.x + ' ' + d.source.y + ' L ' + d.target.x + ' ' + d.target.y;
        });

    }

    function dragstarted(d) {
        if (!d3.event.active) simulation.alphaTarget(0.01).restart();
        d.fx = d.x;
        d.fy = d.y;
    }

    function dragged(d) {
        d.fx = d3.event.x;
        d.fy = d3.event.y;
    }

    function dragended(d) {
        if (!d3.event.active) simulation.alphaTarget(0);
        d.fx = undefined;
        d.fy = undefined;
    }
    update(network.links, network.nodes);
}

function generateNetwork() {
    console.log("generateNetwork()");
    $.getJSON('assets/chea-query/KEA3_coreg_sub_network.json', function (coreg_network) {
        displayNetwork(createNetwork(coreg_network, getTFs2()));
    })
}
