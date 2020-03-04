<!DOCTYPE html>
<html style="scroll-behavior: smooth;">
<head>
	<title>KEA3</title>
	<meta name="description" content="KEA3 Web Tool">
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1">

	<link rel="shortcut icon" href="assets/images/KEA3_logo_transparent.png" type="image/x-icon">

	<link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
	<link rel="stylesheet" href="assets/theme/css/style.css">

	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.8.0/Chart.min.css">
	<link rel="stylesheet" href="assets/mobirise/css/mbr-additional.css">
	<link rel="stylesheet" href="assets/styles.css">
	<link rel="stylesheet" href="assets/web/assets/mobirise-icons/mobirise-icons.css">

	<script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js"></script>
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"></script>
	<script src="assets/mobirise/mbr-switch-arrow.js"></script>
	<script src="assets/theme/js/script.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.8.0/Chart.bundle.min.js"></script>
</head>

<body style="background:white">
	<%--Navigation--%>
    <nav class="navbar navbar-expand beta-menu navbar-dropdown align-items-center navbar-fixed-top navbar-toggleable-sm"
         style="min-height: 25px; padding: 0px; background:#7A1920">
        <div class="container py-1">
            <div class="menu-logo">
                <div class="navbar-brand" style="margin-left: 10px; min-height: 1rem">
						<span class="navbar-logo"><a href="#top">
                            <img src="assets/images/KEA3_logo_transparent.png" alt="KEA3" title="" style="height: 1.5rem;">
                        </a></span>
                    <span class="navbar-caption-wrap">
                        <a class="navbar-caption text-white display-4" href="#top" style="padding-right:0;margin-right:0">
                            KEA3&nbsp
							</a>
                        <a class="navbar-caption text-white display-4" style="padding-left:0;margin-left:0;font-weight:300" href="#top">
                            - Kinase Enrichment Analysis Version 3</a>
                    </span>
                </div>
            </div>
            <div class="collapse navbar-collapse" id="navbarSupportedContent"
                 style="margin-right: 10px; padding-right: 0px">
                <ul class="navbar-nav nav-dropdown" data-app-modern-menu="true">
                    <li class="nav-item"><a class="nav-link link text-white display-4"
                                            href="#about"><span
                            class="mbri-setting mbr-iconfont mbr-iconfont-btn"></span>About</a>
                    </li>
                    <li class="nav-item"><a class="nav-link link text-white display-4"
                                            href="#tutorial"><span
                            class="mbri-idea mbr-iconfont mbr-iconfont-btn"></span>Tutorial</a></li>

                    <li class="nav-item"><a class="nav-link link text-white display-4"
                                            href="#api"><span
                            class="mbri-laptop mbr-iconfont mbr-iconfont-btn"></span>API</a></li>

                    <li class="nav-item"><a class="nav-link link text-white display-4"
                                            href="https://github.com/MaayanLab/KEA3web" target="_blank"><span
                            class="mbri-github mbr-iconfont mbr-iconfont-btn"></span>GitHub</a></li>

                    <li class="nav-item"><a class="nav-link link text-white display-4" href="#download">
                        <span class="mbri-save mbr-iconfont mbr-iconfont-btn"></span>Download</a></li>
                </ul>
            </div>
        </div>
    </nav>

	<%--Query Submissions--%>
	<div class="container">
		<div class="row">
			<div class="col-12">
				<div id="tfea-submission">
					<h1 class="mbr-section-title mbr-bold mbr-fonts-style display-5 mt-5 mb-0 pt-5 pb-0">
						Submit Your Gene Set for Analysis with KEA3
					</h1>
					<div class="form-container" style="padding: 0; border: ''">
						<div class="media-container-column">
							<form class="mbr-form" action="">
								<div class="form-group" data-for="message">
									<button type="button" class="btn btn-link display-7 px-0 py-2"
											style="color:#7A1920;" id="example-genelist">Example protein list
									</button>
									<div class="d-inline-block mx-2">or</div>
									<input id="file-input" type="file" style="width: 201px;" accept=".txt">
									<span class="mbri-question ml-2" data-container="body" data-toggle="popover"
										  data-placement="right"
										  data-trigger="hover"
										  data-title="<div class='px-1 py-2'>What file types can be uploaded?</div>"
										  data-content="<div style = 'max-width:400px' class='px-3 py-2'>KEA3 supports uploading gene lists as text files containing one gene per line.</div>"
										  data-html="true"></span>
									<textarea class="form-control 3px pt-2" rows="7"
											  placeholder="Submit protein list with one gene per row."
											  id="genelist" cols=""></textarea>
								</div>
								<button type="button" class="btn btn-primary" id="submit-genelist"
										style="background-color:#7A1920;padding: .5;">Submit
								</button>
								<br>
								<span class="display-7" id="genecheck" style="font-size:70%">0 symbols entered, 0
										duplicates, 0 valid symbols</span>
								<span class="mbri-question ml-2" data-container="body" data-toggle="popover"
									  data-placement="right" data-trigger="hover"
									  data-title="<div class='px-1 py-2'>What gene symbols are accepted?</div>"
									  data-content="<div style = 'max-width:400px' class='px-3 py-2'>KEA3 supports <a target='_blank' href ='https://www.genenames.org/'>HGNC-approved</a> gene symbols. Symbols that are not included in this set are not analyzed.</div>"
									  data-html="true"></span>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- Loading screen -->
	<div id="loading-screen" class="mbr-overlay d-none" style="color:#7A1920">
		<div class="c_spinner"></div>
		<div class="ellipsis"></div>
	</div>

	<%@ include file="templates/results.html" %>
	<%@ include file="templates/about.html" %>
	<%@ include file="templates/tutorial.html" %>
	<%@ include file="templates/api.html" %>
	<%@ include file="templates/libraries.html" %>
	<%@ include file="templates/footer.html" %>
</body>
</html>

<link rel="stylesheet" href="assets/chea-query/d3barchart.css">
<link rel="stylesheet" href="assets/chea-query/pretty-headers.css">
<link rel="stylesheet" href="assets/chea-query/result_scroll.css">
<link rel="stylesheet" href="assets/chea-query/submit-query.css">
<link rel="stylesheet" href="assets/chea3home/df_style.css">
<link rel="stylesheet" href="assets/chea3home/homepage.css">
<link rel="stylesheet" href="https://cdn.datatables.net/1.10.20/css/dataTables.bootstrap4.min.css"/>
<link rel="stylesheet" href="assets/dropdown/css/style.css">
<link rel="stylesheet" href="assets/networkd3/netprogressbar.css">
<link rel="stylesheet" href="assets/networkd3/network_options.css">
<link rel="stylesheet" href="assets/networkd3/network_style.css">
<link rel="stylesheet" href="assets/socicon/css/styles.css">
<link rel="stylesheet" href="assets/spectrum/spectrum.css">
<link rel="stylesheet" href="assets/tooltips/css_tooltips.css">

<script src="assets/chea-query/submit-query2.js"></script>
<script src="https://d3js.org/d3.v4.min.js"></script>
<script src="assets/chea-query/download_results.js"></script>
<script src="assets/chea-query/generate_clustergram.js"></script>
<script src="assets/chea-query/generate_coreg_network.js"></script>
<script src="assets/chea-query/plot_results.js"></script>
<script src="assets/chea3home/chea3homepage.js"></script>
<script type="text/javascript" src="https://cdn.datatables.net/1.10.20/js/jquery.dataTables.min.js"></script>
<script type="text/javascript" src="https://cdn.datatables.net/1.10.20/js/dataTables.bootstrap4.min.js"></script>
<script src="assets/dropdown/js/script.min.js"></script>
<script src="assets/networkd3/network3.js"></script>
<script src="assets/networkd3/tissue_legends.js"></script>
<script src="assets/spectrum/spectrum.js"></script>

<script>
	var host = "http://localhost:8080/";
	if ((location.protocol !== 'https:') && (location.hostname !== 'localhost')){location.href = 'https:' + window.location.href.substring(window.location.protocol.length);};
</script>
<script async src="https://www.googletagmanager.com/gtag/js?id=UA-6277639-43"></script>
<script>
	window.dataLayer = window.dataLayer || [];
	function gtag() { dataLayer.push(arguments); }
	gtag('js', new Date());

	gtag('config', 'UA-6277639-43');
	$('[data-toggle="popover"]').popover();
</script>