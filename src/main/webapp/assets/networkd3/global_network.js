const radius = 6;
let g;
let max = 100;
let zm;
let global_nodes;
let global_labels;
let net_width = 1000;
let net_height = 500;
let div = d3.select("body").append("div")
    .attr("class", "tooltip")
    .attr("id", "tf_tooltip")
    .style("opacity", 0);

function whichNetwork() {
    console.log("whichNetwork()");
    const net = document.getElementById("whichnetwork").value;
    console.log(net);
    if (net === "GTEx Kinase Network") {
        return "gtex";
    } else if (net === "TCGA Kinase Network") {
        return ("tcga");
    } else if (net === "ARCHS4 Kinase Network") {
        return ("archs4");
    } else {
        return null;
    }
}

function changeNetwork() {
    console.log("changeNetwork()");
    const net_svg = document.getElementById("net_svg");
    if (net_svg != null) {
        deleteNetwork(net_svg);
    }
    zm = 1;
    const netview = whichNetwork();
    setLegendView();
    recolorAllNodes();
    const gtex_table_link = $("#gtextablelink");
    gtex_table_link.addClass("d-none");
    switch (netview) {
        case "gtex":
            setGTExColorByOptions();
            drawNetwork("static/json/wgcna_gtex_annotated4.json", netview);
            gtex_table_link.removeClass("d-none");
            break;
        case "archs4":
            setARCHS4ColorByOptions();
            drawNetwork("static/json/wgcna_archs4_annotated.json", netview);
            break;
        case "tcga":
            setTCGAColorByOptions();
            drawNetwork("static/json/wgcna_tcga_annotated.json", netview);
            break;
    }
}

function zoom_actions() {
    console.log("zoom_actions()");
    // create new scale objects based on event
    let new_xScale = d3.event.transform
        .rescaleX(xScale);
    let new_yScale = d3.event.transform
        .rescaleY(yScale);
    // update axes

    node.data(net_json)
        .attr('cx', function (d) {
            return new_xScale(d.x)
        }).attr('cy', function (d) {
        return new_yScale(d.y)
    });

    label.data(net_json)
        .attr('x', function (d) {
            return new_xScale(d.x)
        })
        .attr('y', function (d) {
            return new_yScale(d.y) - 6
        });

    zm = d3.event.transform.k;

    if (getLabelView() === "auto") {
        if (zm >= 2) {
            label.style("opacity", "1");
        } else {
            label.style("opacity", "0");
        }
    }
}

function requestFullScreen(element_id) {
    console.log("requestFullScreen(element_id)");
    const element = document.getElementById(element_id);
    // Supports most browsers and their versions.
    if (element.requestFullScreen) {
        element.requestFullScreen();
    } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
    } else if (element.webkitRequestFullScreen) {
        element.webkitRequestFullScreen();
    }
}

function setTCGAColorByOptions() {
    console.log("setTCGAColorByOptions()");
    $("#colorby").html(`<select class="form-control" id="colorby"
						onchange="recolorAllNodes();setLegendView()">
						<option>none</option>
						<option>Tumor</option>
						<option>WGCNA modules</option>
					</select>`)

}

function setGTExColorByOptions() {
    console.log("setGTExColorByOptions()");
    $("#colorby").html(`<select class="form-control" id="colorby"
						onchange="recolorAllNodes();setLegendView()">
						<option>none</option>
						<option>Tissue (general)</option>
						<option>Tissue (specific)</option>
						<option>WGCNA modules</option>
					</select>`)
}

function setARCHS4ColorByOptions() {
    console.log("setARCHS4ColorByOptions()");
    $("#colorby").html(`<select class="form-control" id="colorby"
					onchange="recolorAllNodes();setLegendView()">
					<option>none</option>
					<option>Tissue</option>
					<option>WGCNA modules</option>
				</select>`)
}

function saveSvg(svg_id, name) {
    console.log("saveSvg(svg_id, name)");
    const svgEl = document.getElementById(svg_id);
    svgEl.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    const svgData = svgEl.outerHTML;
    const preface = '<?xml version="1.0" standalone="no"?>\r\n';
    const svgBlob = new Blob([preface, svgData], {type: "image/svg+xml;charset=utf-8"});
    const svgUrl = URL.createObjectURL(svgBlob);
    const downloadLink = document.createElement("a");
    downloadLink.href = svgUrl;
    downloadLink.download = name;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
}

function setLabelView() {
    console.log("setLabelView()");
    const labelview = getLabelView();
    if (labelview === "auto") {
        if (zm >= 2) {
            global_labels.style("opacity", 1);
        } else {
            global_labels.style("opacity", 0);
        }
    } else if (labelview === "always") {
        global_labels.style("opacity", 1);
    } else {
        global_labels.style("opacity", 0);
    }
}

function openNav(nav) {
    console.log("openNav(nav)");
    $('#' + nav).removeClass('closeNav').addClass('openNav')
}

function closeNav(nav) {
    console.log("closeNav(nav)");
    $('#' + nav).removeClass('openNav').addClass('closeNav')
}

function getLabelView() {
    console.log("getLabelView()");
    return (document.getElementById("labelview").value)
}

function hideAllLegends() {
    $('#general_tissue_legend').hide();
    $('#specific_tissue_legend').hide();
    $('#GO_legend').hide();
    $('#Tissue_legend').hide();
    $('#Tumor_legend').hide();
}

function setLegendViews(legend, legend_option_val) {
    console.log(`function setLegendViews${legend}, ${legend_option_val}`);
    // TODO hideAllLegends()?
    // TODO .add-/.removeClass('hidden') - > .toggle()
    const color_by = document.getElementById("colorby").value;
    const hidden = legend.hasClass("hidden");

    if (color_by === legend_option_val) {
        if (hidden) {
            legend.removeClass("hidden");
        }
    } else {
        if (!hidden) {
            legend.addClass("hidden");
        }
    }
}

function setLegendView() {
    console.log('function setLegendView()');
    let net = whichNetwork();
    switch (net) {
        case 'gtex':
            setLegendViews($('#general_tissue_legend'), 'Tissue (general)');
            setLegendViews($('#specific_tissue_legend'), 'Tissue (specific)');
            setLegendViews($('#GO_legend'), 'GO Enrichment');
            break;
        case 'archs4':
            setLegendViews($('#Tissue_legend'), 'Tissue');
            break;
        case 'tcga':
            setLegendViews($('#Tumor_legend'), 'Tumor');
            break;
    }
}

function drawLegend(legend_id, legend_data) {
    const legend = g.append("g")
        .attr("class", "legend")
        .attr("id", legend_id)
        .attr("x", net_width - 100)
        .attr("y", net_height)
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
                .attr("x", net_width - 118)
                .attr("y", i * 15 + 140)
                .attr("width", 10)
                .attr("height", 10)
                .style("stroke-width", 1)
                .style("stroke", "white")
                .style("fill", function (d) {
                    return d.color
                });

            g.append("text")
                .attr("x", net_width - 105)
                .attr("y", i * 15 + 150)
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
                .attr("x", net_width - 105)
                .attr("y", i * 15 + 150)
                .attr("height", 10)
                .attr("width", 100)
                .style("fill", "black")
                .style("stroke-opacity", 0)
                .style("font-size", "10pt")
                .text(function (d) {
                    return d.term
                });
        });

    highlightNodes2();
    global_nodes = node;
    global_labels = label;
    setLabelView();
    setLegendView();
}

function drawNetwork(json_file, net_type) {
    console.log("drawNetwork()");
    d3.json(json_file, function (net_json) {
        const network_svg = d3.select("#tfnet").append("svg");
        network_svg.attr("id", "net_svg")
            .attr("width", net_width)
            .attr("height", net_height);

        const nodes = net_json;
        const max_x = Math.max.apply(Math, nodes.map(function (o) {
            return o.x;
        }));
        const max_y = Math.max.apply(Math, nodes.map(function (o) {
            return o.y;
        }));
        const min_x = Math.min.apply(Math, nodes.map(function (o) {
            return o.x;
        }));
        const min_y = Math.min.apply(Math, nodes.map(function (o) {
            return o.y;
        }));

        // add encompassing group for the zoom
        g = network_svg.append("g").attr("class", "everything");

        const xScale = d3.scaleLinear().domain([min_x, max_x])
            .range([net_width * 0.05, net_width * .95]);

        const yScale = d3
            .scaleLinear()
            .domain([min_y, max_y])
            .range([net_height * 0.05, net_height * 0.95]);

        let circle_fill;
        let colorby_val = document.getElementById("colorby").value;
        let node = g
            .append("g")
            .selectAll("circle")
            .data(nodes)
            .enter()
            .append("circle")
            .attr("r", radius)
            .attr("id", function (d) {
                return d.name;
            })
            .attr("cx", function (d) {
                return xScale(d.x)
            })
            .attr("cy", function (d) {
                return yScale(d.y)
            })
            .on("mouseover", function (d) {
                div.transition()
                    .duration(100)
                    .style("opacity", .9);
                div.html(d.name)
                    .style("left", (d3.event.pageX) + "px")
                    .style("top", (d3.event.pageY - 28) + "px");
            })
            .on("mouseout", function () {
                div.transition()
                    .duration(2000)
                    .style("opacity", 0);
            });

        switch (net_type) {
            case "gtex":
                if (colorby_val == null) {
                    circle_fill = "General_tissue_color"
                } else {
                    circle_fill = translateNodeColor(colorby_val);
                }

                node.attr("fill", function (d) {
                    switch (circle_fill) {
                        case "General_tissue_color":
                            return d.General_tissue_color;
                        case "Specific_tissue_color":
                            return d.Specific_tissue_color;
                        case "WGCNA_hex":
                            return d.WGCNA_hex;
                        case "GO_enrichment_color":
                            return d.GO_enrichment_colordefault;
                        default:
                            return defaultNodeColor;
                    }
                })
                    .attr("stroke", 0)
                    .attr("stroke-opacity", 0)
                    .attr("WGCNA_hex", function (d) {
                        return d.WGCNA_hex
                    })
                    .attr("General_tissue_color", function (d) {
                        return d.General_tissue_color
                    })
                    .attr("Specific_tissue_color", function (d) {
                        return d.Specific_tissue_color
                    })
                    .attr("GO_enrichment_color", function (d) {
                        return d.GO_enrichment_color
                    });
                break;
            case "archs4":
                node.attr("fill", function (d) {
                    if (circle_fill === "Tissue_color") {
                        return d.Tissue_color;
                    } else if (circle_fill === "WGCNA_hex") {
                        return d.WGCNA_hex;
                    } else {
                        return defaultNodeColor;
                    }
                })
                    .attr("stroke", 0)
                    .attr("stroke-opacity", 0)
                    .attr("WGCNA_hex", function (d) {
                        return d.WGCNA_hex
                    })
                    .attr("Tissue_color", function (d) {
                        return d.Tissue_color
                    });
                break;
            case "tcga":
                if (colorby_val == null) {
                    alert('null');
                    circle_fill = "Tumor Type"
                } else {
                    circle_fill = translateNodeColor(colorby_val);
                }

                node.attr("fill", function (d) {
                    if (circle_fill === "Tumor_color") {
                        return d.Tumor_color;
                    } else if (circle_fill === "WGCNA_hex") {
                        return d.WGCNA_hex;
                    } else {
                        return defaultNodeColor;
                    }
                })
                    .attr("stroke", 0)
                    .attr("stroke-opacity", 0)
                    .attr("WGCNA_hex", function (d) {
                        return d.WGCNA_hex
                    })
                    .attr("Tumor_color", function (d) {
                        return d.Tumor_color
                    });
                break;
        }

        const labelview = getLabelView();
        let op;
        if ((labelview === "auto" & zm > 2) || (labelview === "always")) {
            op = 1;
        } else {
            op = 0;
        }

        let label = g.append("g")
            .attr("class", "label")
            .selectAll("text")
            .data(nodes)
            .enter()
            .append("text")
            .attr("text-anchor", "middle")
            .style("stroke-opacity", 0)
            .text(function (d) {
                return d.name;
            })
            .attr("x", function (d) {
                return xScale(d.x);
            })
            .attr("y", function (d) {
                return yScale(d.y) - 6;
            })
            .attr("id", function (d) {
                return d.name + "_label";
            })
            .style("opacity", op).on("mouseover", function (d) {
                div.transition()
                    .duration(100)
                    .style("opacity", .9);
                div.html(d.name)
                    .style("left", (d3.event.pageX) + "px")
                    .style("top", (d3.event.pageY - 28) + "px");
            })
            .on("mouseout", function () {
                div.transition()
                    .duration(2000)
                    .style("opacity", 0);
            });

        const zoom_handler = d3
            .zoom()
            .scaleExtent([0.5, 40])
            .extent([[0, 0], [net_width, net_height]])
            .on("zoom", zoom_actions);

        zoom_handler(network_svg);

        switch (net_type) {
            case "gtex":
                drawLegend("general_tissue_legend", general_tissue);
                drawLegend("specific_tissue_legend", specific_tissue);
                drawLegend("GO_legend", GO_enrichment);
                break;
            case "archs4":
                drawLegend("Tissue_legend", tissue);
                break;
            case "tcga":
                drawLegend("Tumor_legend", tumor);
                break;
        }

        highlightNodes2();
        global_nodes = node;
        global_labels = label;
        setLabelView();
        setLegendView();
    });
}

function deleteNetwork() {
    console.log("deleteNetwork()");
    document.getElementById("net_svg").remove();
}

$(document).ready(function () {
    drawNetwork("static/json/wgcna_gtex_annotated4.json", "gtex");
    $('#legend_checkbox').change(setLegendView());
});