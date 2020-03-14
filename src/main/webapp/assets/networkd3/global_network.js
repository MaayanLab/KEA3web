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
    console.log("function whichNetwork()");
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
    console.log("function changeNetwork()");
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
            drawNetwork();
            gtex_table_link.removeClass("d-none");
            break;
        case "archs4":
            setARCHS4ColorByOptions();
            drawARCHS4Network();
            break;
        case "tcga":
            setTCGAColorByOptions();
            drawTCGANetwork();
            break;
    }
}

function zoom_actions() {
    console.log("function zoom_actions()");
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
    console.log("function requestFullScreen(element_id)");
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
    console.log("function setTCGAColorByOptions()");
    $("#colorby").html(`<select class="form-control" id="colorby"
						onchange="recolorAllNodes();setLegendView()">
						<option>none</option>
						<option>Tumor</option>
						<option>WGCNA modules</option>
					</select>`)

}

function setGTExColorByOptions() {
    console.log("function setGTExColorByOptions()");
    $("#colorby").html(`<select class="form-control" id="colorby"
						onchange="recolorAllNodes();setLegendView()">
						<option>none</option>
						<option>Tissue (general)</option>
						<option>Tissue (specific)</option>
						<option>WGCNA modules</option>
					</select>`)
}

function setARCHS4ColorByOptions() {
    console.log("function setARCHS4ColorByOptions()");
    $("#colorby").html(`<select class="form-control" id="colorby"
					onchange="recolorAllNodes();setLegendView()">
					<option>none</option>
					<option>Tissue</option>
					<option>WGCNA modules</option>
				</select>`)
}

function saveSvg(svg_id, name) {
    console.log("function saveSvg(svg_id, name)");
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
    console.log("function setLabelView()");
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
    console.log("function openNav(nav)");
    $('#' + nav).removeClass('closeNav').addClass('openNav')
}

function closeNav(nav) {
    console.log("function closeNav(nav)");
    $('#' + nav).removeClass('openNav').addClass('closeNav')
}

function getLabelView() {
    console.log("function getLabelView()");
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

function drawNetwork() {
    console.log("function drawNetwork()");
    d3.json("assets/networkd3/wgcna_gtex_annotated4.json", function (net_json) {
        const network_svg = d3.select("#tfnet").append("svg");
        network_svg.attr("id", "net_svg")
            .attr("width", net_width)
            .attr("height", net_height);

        var nodes = net_json;
        var max_x = Math.max.apply(Math, nodes.map(function (o) {
            return o.x;
        }));
        var max_y = Math.max.apply(Math, nodes.map(function (o) {
            return o.y;
        }));
        var min_x = Math.min.apply(Math, nodes.map(function (o) {
            return o.x;
        }));
        var min_y = Math.min.apply(Math, nodes.map(function (o) {
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

        var xUnscale = d3.scaleLinear().domain(
            [net_width * 0.05, net_width * 0.95]).range(
            [min_x, max_x]);

        var yUnscale = d3.scaleLinear().domain(
            [net_height * 0.05, net_width * 0.95]).range(
            [min_y, max_y]);

        let circle_fill;
        var colorby_val = document.getElementById("colorby").value;
        if (colorby_val == null) {
            circle_fill = "General_tissue_color"
        } else {
            circle_fill = translateNodeColor(colorby_val);
        }

        // draw circles for the nodes
        var node = g
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
            .attr(
                "fill",
                function (d) {
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
                }).attr("stroke", 0).attr(
                "stroke-opacity", 0).attr(
                "WGCNA_hex", function (d) {
                    return d.WGCNA_hex
                }).attr("General_tissue_color",
                function (d) {
                    return d.General_tissue_color
                }).attr("Specific_tissue_color",
                function (d) {
                    return d.Specific_tissue_color
                }).attr("GO_enrichment_color",
                function (d) {
                    return d.GO_enrichment_color
                }).on("mouseover", function (d) {
                div.transition()
                    .duration(100)
                    .style("opacity", .9);
                div.html(d.name)
                    .style("left", (d3.event.pageX) + "px")
                    .style("top", (d3.event.pageY - 28) + "px");
            })
            .on("mouseout", function (d) {
                div.transition()
                    .duration(2000)
                    .style("opacity", 0);
            });

        var label = g.append("g")
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
            .on("mouseout", function (d) {
                div.transition()
                    .duration(2000)
                    .style("opacity", 0);
            });

        var zoom_handler = d3
            .zoom()
            .scaleExtent([0.5, 40])
            .extent([[0, 0], [net_width, net_height]])
            .on("zoom", zoom_actions);


        zoom_handler(network_svg);

        var labelview = getLabelView();
        var op;
        if ((labelview === "auto" & zm > 2) || (labelview === "always")) {
            op = 1;
        } else {
            op = 0;
        }


        let general_tissue_legend = g.append("g")
            .attr("class", "legend")
            .attr("id", "general_tissue_legend")
            .attr("x", net_width - 100)
            .attr("y", net_height)
            .attr("height", 100)
            .attr("width", 100)
            .attr("class", "hidden")
            .style("pointer-events", "none");

		general_tissue_legend.selectAll('g').data(general_tissue)
            .enter()
            .append('g')
            .each(function (d, i) {

                var g = d3.select(this);
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
                        return d.tissue
                    });

                g.append("text")
                    .attr("x", net_width - 105)
                    .attr("y", i * 15 + 150)
                    .attr("height", 10)
                    .attr("width", 100)
                    .style("stroke-opacity", 0)
                    .style("fill", "black")
                    .style("font-size", "10pt")
                    .text(function (d) {
                        return d.tissue
                    });
            });

        let specific_tissue_legend = g.append("g")
            .attr("class", "legend")
            .attr("id", "specific_tissue_legend")
            .attr("x", net_width - 100)
            .attr("y", net_height)
            .attr("height", 100)
            .attr("width", 100)
            .attr("class", "hidden")
            .style("pointer-events", "none");

		specific_tissue_legend.selectAll('g').data(specific_tissue)
            .enter()
            .append('g')
            .each(function (d, i) {
                var g = d3.select(this);
                g.append("rect")
                    .attr("x", net_width - 148)
                    .attr("y", i * 15 + 140)
                    .attr("width", 10)
                    .attr("height", 10)
                    .style("stroke-width", 1)
                    .style("stroke", "white")
                    .style("fill", function (d) {
                        return d.color
                    });

                g.append("text")
                    .attr("x", net_width - 135)
                    .attr("y", i * 15 + 150)
                    .attr("height", 10)
                    .attr("width", 100)
                    .style("fill", "white")
                    .style("font-size", "10pt")
                    .style("stroke-width", "0.4em")
                    .style("stroke", "white")
                    .text(function (d) {
                        return d.tissue
                    });

                g.append("text")
                    .attr("x", net_width - 135)
                    .attr("y", i * 15 + 150)
                    .attr("height", 10)
                    .attr("width", 100)
                    .style("stroke-opacity", 0)
                    .style("fill", "black")
                    .style("font-size", "10pt")
                    .text(function (d) {
                        return d.tissue
                    });
            });


        let go_legend = g.append("g")
            .attr("class", "legend")
            .attr("id", "GO_legend")
            .attr("x", net_width - 400)
            .attr("y", net_height)
            .attr("height", 400)
            .attr("width", 400)
            .attr("class", "hidden")
            .style("pointer-events", "none");

		go_legend.selectAll('g').data(GO_enrichment)
            .enter()
            .append('g')
            .each(function (d, i) {
                var g = d3.select(this);
                g.append("rect")
                    .attr("x", net_width - 248)
                    .attr("y", i * 15 + 50)
                    .attr("width", 10)
                    .attr("height", 10)
                    .style("stroke-width", 1)
                    .style("stroke", "white")
                    .style("fill", function (d) {
                        return d.color
                    });

                g.append("text")
                    .attr("x", net_width - 235)
                    .attr("y", i * 15 + 60)
                    .attr("height", 10)
                    .attr("width", 100)
                    .style("fill", "white")
                    .style("font-size", "10pt")
                    .style("stroke-width", "0.4em")
                    .style("stroke", "white")
                    .text(function (d) {
                        return d.GO_term
                    });

                g.append("text")
                    .attr("x", net_width - 235)
                    .attr("y", i * 15 + 60)
                    .attr("height", 10)
                    .attr("width", 100)
                    .style("stroke-opacity", 0)
                    .style("fill", "black")
                    .style("font-size", "10pt")
                    .text(function (d) {
                        return d.GO_term
                    });
            });

        highlightNodes2();
        global_nodes = node;
        global_labels = label;
        setLabelView();
        setLegendView();
    });
}

function drawTCGANetwork() {
    console.log("function drawTCGANetwork()");
    d3.json("assets/networkd3/wgcna_tcga_annotated.json", function (net_json) {
        console.log('tcga');

        var networkDiv = document.getElementById("tfnet");
        // net_width = networkDiv.clientWidth;
        // net_height = Math.max($('#tfea-submission').height(),networkDiv.clientHeight,500);
        //console.log(net_width)
        //console.log(net_height)
        //console.log($('#tfnet').width())
        //console.log($('#tfnet').css('padding'))


        const network_svg = d3.select("#tfnet").append("svg");
        // network_svg.attr("viewBox","0,0,${net_width},${net_height}");
        network_svg.attr("preserveAspectRatio",
            "xMidYMid slice");
        network_svg.attr("id", "net_svg");

        network_svg.attr("width", net_width).attr("height",
            net_height);

        var nodes = net_json;
        var max_x = Math.max.apply(Math, nodes.map(function (o) {
            return o.x;
        }));
        var max_y = Math.max.apply(Math, nodes.map(function (o) {
            return o.y;
        }));
        var min_x = Math.min.apply(Math, nodes.map(function (o) {
            return o.x;
        }));
        var min_y = Math.min.apply(Math, nodes.map(function (o) {
            return o.y;
        }));

//		nodes = adjustCoordinates(nodes);

        // add encompassing group for the zoom
        g = network_svg.append("g").attr("class", "everything");

        var xScale = d3.scaleLinear().domain([min_x, max_x])
            .range([net_width * 0.05, net_width * .95]);

        var yScale = d3
            .scaleLinear()
            .domain([min_y, max_y])
            .range([net_height * 0.05, net_height * 0.95]);

        var xUnscale = d3.scaleLinear().domain(
            [net_width * 0.05, net_width * 0.95]).range(
            [min_x, max_x]);

        var yUnscale = d3.scaleLinear().domain(
            [net_height * 0.05, net_width * 0.95]).range(
            [min_y, max_y]);

        var colorby_val = document.getElementById("colorby").value;
        console.log(colorby_val);
		let circle_fill;
        if (colorby_val == null) {
            alert('null');
			circle_fill = "Tumor Type"
        } else {
            circle_fill = translateNodeColor(colorby_val);
        }


        // draw circles for the nodes
        var node = g
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
            .attr(
                "fill",
                function (d) {
                    if (circle_fill === "Tumor_color") {
                        return d.Tumor_color;
                    } else if (circle_fill === "WGCNA_hex") {
                        return d.WGCNA_hex;
                    } else {
                        return defaultNodeColor;
                    }
                }).attr("stroke", 0).attr(
                "stroke-opacity", 0).attr(
                "WGCNA_hex", function (d) {
                    return d.WGCNA_hex
                }).attr("Tumor_color",
                function (d) {
                    return d.Tumor_color
                }).on("mouseover", function (d) {
                div.transition()
                    .duration(100)
                    .style("opacity", .9);
                div.html(d.name)
                    .style("left", (d3.event.pageX) + "px")
                    .style("top", (d3.event.pageY - 28) + "px");
            })
            .on("mouseout", function (d) {
                div.transition()
                    .duration(2000)
                    .style("opacity", 0);
            });

        var label = g.append("g")
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
            .on("mouseout", function (d) {
                div.transition()
                    .duration(2000)
                    .style("opacity", 0);
            });

        var zoom_handler = d3
            .zoom()
            .scaleExtent([0.5, 40])
            .extent([[0, 0], [net_width, net_height]])
            .on("zoom", zoom_actions);


        zoom_handler(network_svg);

        var labelview = getLabelView();
        var op;
        if ((labelview === "auto" & zm > 2) || (labelview === "always")) {
            op = 1;
        } else {
            op = 0;
        }


        var legend = g.append("g")
            .attr("class", "legend")
            .attr("id", "Tumor_legend")
            .attr("x", net_width - 100)
            .attr("y", net_height)
            .attr("height", 100)
            .attr("width", 100)
            .attr("class", "hidden")
            .style("pointer-events", "none");

        legend.selectAll('g').data(tumor)
            .enter()
            .append('g')
            .each(function (d, i) {

                var g = d3.select(this);
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
                        return d.Tumor
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
                        return d.Tumor
                    });
            });


        // var sliders = document.querySelectorAll(".slider");
        // if (sliders != null) {
        // 	highlightNodes(sliders);
        // }
        highlightNodes2();

        global_nodes = node;
        global_labels = label;

        setLabelView();
        setLegendView();
    });
}

function drawARCHS4Network() {
    console.log("function drawARCHS4Network()");
    d3.json("assets/networkd3/wgcna_archs4_annotated.json", function (net_json) {

        var networkDiv = document.getElementById("tfnet");
        // net_width = networkDiv.clientWidth;
        // net_height = Math.max($('#tfea-submission').height(),networkDiv.clientHeight,500);


        var network_svg = d3.select("#tfnet").append("svg");
        // network_svg.attr("viewBox","0,0,${net_width},${net_height}");
        network_svg.attr("preserveAspectRatio",
            "xMidYMid slice");
        network_svg.attr("id", "net_svg");

        network_svg.attr("width", net_width).attr("height",
            net_height);

        var nodes = net_json;
        var max_x = Math.max.apply(Math, nodes.map(function (o) {
            return o.x;
        }));
        var max_y = Math.max.apply(Math, nodes.map(function (o) {
            return o.y;
        }));
        var min_x = Math.min.apply(Math, nodes.map(function (o) {
            return o.x;
        }));
        var min_y = Math.min.apply(Math, nodes.map(function (o) {
            return o.y;
        }));

//		nodes = adjustCoordinates(nodes);

        // add encompassing group for the zoom
        g = network_svg.append("g").attr("class", "everything");

        var xScale = d3.scaleLinear().domain([min_x, max_x])
            .range([net_width * 0.05, net_width * .95]);

        var yScale = d3
            .scaleLinear()
            .domain([min_y, max_y])
            .range([net_height * 0.05, net_height * 0.95]);

        var xUnscale = d3.scaleLinear().domain(
            [net_width * 0.05, net_width * 0.95]).range(
            [min_x, max_x]);

        var yUnscale = d3.scaleLinear().domain(
            [net_height * 0.05, net_width * 0.95]).range(
            [min_y, max_y]);

        var colorby_val = document.getElementById("colorby").value;
        console.log(colorby_val);
        var circle_fill = translateNodeColor(colorby_val);


        // draw circles for the nodes
        var node = g
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
            .attr(
                "fill",
                function (d) {
                    if (circle_fill === "Tissue_color") {
                        return d.Tissue_color;
                    } else if (circle_fill === "WGCNA_hex") {
                        return d.WGCNA_hex;
                    } else {
                        return defaultNodeColor;
                    }
                }).attr("stroke", 0).attr(
                "stroke-opacity", 0).attr(
                "WGCNA_hex", function (d) {
                    return d.WGCNA_hex
                }).attr("Tissue_color",
                function (d) {
                    return d.Tissue_color
                }).on("mouseover", function (d) {
                div.transition()
                    .duration(100)
                    .style("opacity", .9);
                div.html(d.name)
                    .style("left", (d3.event.pageX) + "px")
                    .style("top", (d3.event.pageY - 28) + "px");
            })
            .on("mouseout", function (d) {
                div.transition()
                    .duration(2000)
                    .style("opacity", 0);
            });

        var label = g.append("g")
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
            .on("mouseout", function (d) {
                div.transition()
                    .duration(2000)
                    .style("opacity", 0);
            });

        var zoom_handler = d3
            .zoom()
            .scaleExtent([0.5, 40])
            .extent([[0, 0], [net_width, net_height]])
            .on("zoom", zoom_actions);


        zoom_handler(network_svg);

        var labelview = getLabelView();
        var op;
        if ((labelview === "auto" & zm > 2) || (labelview === "always")) {
            op = 1;
        } else {
            op = 0;
        }


        var legend = g.append("g")
            .attr("class", "legend")
            .attr("id", "Tissue_legend")
            .attr("x", net_width - 100)
            .attr("y", net_height)
            .attr("height", 100)
            .attr("width", 100)
            .attr("class", "hidden")
            .style("pointer-events", "none");

        legend.selectAll('g').data(tissue)
            .enter()
            .append('g')
            .each(function (d, i) {

                var g = d3.select(this);
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
                        return d.Tissue
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
                        return d.Tissue
                    });
            });

        highlightNodes2();
        global_nodes = node;
        global_labels = label;
        setLabelView();
        setLegendView();

    });
}

function deleteNetwork() {
    console.log("function deleteNetwork()");
    document.getElementById("net_svg").remove();
}

$(document).ready(function () {
    drawNetwork();
    $('#legend_checkbox').change(setLegendView());

    $(window).resize(function () {
        var net_svg = document.getElementById("net_svg");
        if (net_svg != null) {
            deleteNetwork(net_svg);
            zm = 1;
            var netview = whichNetwork();
            switch (netview) {
                case "gtex":
                    drawNetwork();
                    break;
                case "archs4":
                    drawARCHS4Network();
                    break;
                case "tcga":
                    drawTCGANetwork();
                    break;
            }
        }

    });
});
