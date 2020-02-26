<!DOCTYPE html>
<html>

<head>
	<title>KEA3</title>
	<meta name="description" content="KEA3 Web Tool">
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1">

	<link rel="shortcut icon" href="assets/images/KEA3_logo_transparent.png" type="image/x-icon">

	<link rel="stylesheet" href="assets/web/assets/mobirise-icons/mobirise-icons.css">
	<link rel="stylesheet" href="assets/tether/tether.min.css">
	<link rel="stylesheet" href="assets/bootstrap/css/bootstrap.min.css">
	<link rel="stylesheet" href="assets/bootstrap/css/bootstrap-grid.min.css">
	<link rel="stylesheet" href="assets/bootstrap/css/bootstrap-reboot.min.css">
	<link rel="stylesheet" href="assets/socicon/css/styles.css">
	<link rel="stylesheet" href="assets/dropdown/css/style.css">
	<link rel="stylesheet" href="assets/theme/css/style.css">
	<link rel="stylesheet" href="assets/mobirise/css/mbr-additional.css">
	<link rel="stylesheet" href="assets/networkd3/network_style.css">
	<link rel="stylesheet" href="assets/datatables/dataTables.bootstrap4.min.css">
	<link rel="stylesheet" href="assets/tooltips/css_tooltips.css">
	<link rel="stylesheet" href="assets/networkd3/network_options.css">
	<link rel="stylesheet" href="assets/spectrum/spectrum.css">
	<link rel="stylesheet" href="assets/chea-query/pretty-headers.css">
	<link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
	<link rel="stylesheet" href="assets/chea-query/result_scroll.css">
	<link rel="stylesheet" href="assets/chea-query/submit-query.css">
	<link rel="stylesheet" href="assets/chea-query/d3barchart.css">
	<link rel="stylesheet" href="assets/networkd3/netprogressbar.css">
	<link rel="stylesheet" href="assets/styles.css">
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.8.0/Chart.min.css">
	<link rel="stylesheet" href="assets/chea3home/homepage.css">
	<link rel="stylesheet" href="assets/chea3home/df_style.css">
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-select@1.13.9/dist/css/bootstrap-select.min.css">


	<script type="text/javascript">
		var host = "http://localhost:8080/";
	</script>
	<script src="assets/web/assets/jquery/jquery-3.3.1.min.js" type="text/javascript"></script>
	<script src="assets/popper/popper.min.js" type="text/javascript"></script>
	<!-- 	bootstrap v4  -->
	<script src="assets/bootstrap/js/bootstrap.min.js" type="text/javascript"></script>
	<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js" type="text/javascript"></script>

	<!--a bunch of d3 scripts-->
	<script src="assets/d3/d3.v4.min.js" type="text/javascript"></script>
	<!-- <script src="assets/d3/d3.v5.min.js"></script> -->
	<script src="https://d3js.org/d3-selection-multi.v1.js"></script>
	<script src="https://d3js.org/d3-scale-chromatic.v1.min.js"></script>

	<script src="https://cdn.jsdelivr.net/npm/bootstrap-select@1.13.9/dist/js/bootstrap-select.min.js"></script>


	<!--bootstrap/mobirise--->

	<script src="assets/tether/tether.min.js" type="text/javascript"></script>

	<script src="assets/smoothscroll/smooth-scroll.js" type="text/javascript"></script>
	<script src="assets/touchswipe/jquery.touch-swipe.min.js" type="text/javascript"></script>
	<script src="assets/datatables/jquery.dataTables.min.js" type="text/javascript"></script>
	<script src="assets/datatables/dataTables.buttons.min.js" type="text/javascript"></script>
	<script src="assets/datatables/jszip.min.js" type="text/javascript"></script>
	<script src="assets/datatables/buttons.html5.min.js" type="text/javascript"></script>
	<script src="assets/datatables/pdfmake.min.js" type="text/javascript"></script>
	<script src="assets/datatables/vfs_fonts.js" type="text/javascript"></script>
	<script src="assets/mbr-switch-arrow/mbr-switch-arrow.js" type="text/javascript"></script>
	<script src="assets/sociallikes/social-likes.js" type="text/javascript"></script>
	<script src="assets/dropdown/js/script.min.js" type="text/javascript"></script>
	<script src="assets/theme/js/script.js" type="text/javascript"></script>
	<script src="assets/chea-query/download_results.js" type="text/javascript"></script>

	<script src="assets/datatables/dataTables.bootstrap4.min.js" type="text/javascript"></script>
	<script src="assets/datatables/buttons.colVis.min.js" type="text/javascript"></script>
	<script src="assets/spectrum/spectrum.js" type="text/javascript"></script>
	<script src="https://d3js.org/d3-array.v1.min.js" type="text/javascript"></script>

	<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.8.0/Chart.bundle.min.js"
			type="text/javascript"></script>
	<!-- <script src="assets/hitcounter.js"></script> -->



	<!-- OpenCPU scripts -->
	<script src="assets/chea-query/generateCoregNetwork.js" type="text/javascipt"></script>
	<script src="assets/chea-query/color-array.js" type="text/javascript"></script>
	<script src="assets/chea-query/plot_results.js" type="text/javascript"></script>
	<script src="assets/chea-query/generate_clustergram.js" type="text/javascript"></script>
	<script src="assets/chea-query/generate_coreg_network.js" type="text/javascript"></script>
	<script src="assets/chea-query/submit-query2.js" type="text/javascript"></script>
	<script src="assets/networkd3/tissue_legends.js" type="text/javascript"></script>
	<script src="assets/networkd3/network3.js" type="text/javascript"></script>
	<script src="assets/chea-query/generateCoregNetwork.js" type="text/javascript"></script>
	<script src="assets/chea3home/chea3homepage.js" type="text/javascript"></script>

	<script type="text/javascript">if ((location.protocol != 'https:') && (location.hostname != 'localhost')){location.href = 'https:' + window.location.href.substring(window.location.protocol.length);}</script>
</head>

<body style="background:white">

	<!-- Loading screen -->
	<div id="loading-screen" class="mbr-overlay d-none" style="color:#7A1920">
		<div class="c_spinner"></div>
		<div class="ellipsis"></div>
	</div>

	<!-- Navigation Bar -->
	<div class="menu cid-r0JOqR1tf7" id="menu1-0">
		<nav class="navbar navbar-expand beta-menu navbar-dropdown align-items-center navbar-fixed-top navbar-toggleable-sm"
			style="min-height: 25px; padding: 0px; background:#7A1920">
			<div class="container py-1">
				<button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse"
					data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
					aria-label="Toggle navigation">
					<div class="hamburger">
						<span></span> <span></span> <span></span> <span></span>
					</div>
				</button>
				<div class="menu-logo">
					<div class="navbar-brand" style="margin-left: 10px; min-height: 1rem">
						<span class="navbar-logo"> <a href="#top"> <img src="assets/images/KEA3_logo_transparent.png" alt="KEA3"
									title="" style="height: 1.5rem;">
							</a>
						</span> <span class="navbar-caption-wrap"><a class="navbar-caption text-white display-4"
								href="#top" style="padding-right:0;margin-right:0"> KEA3&nbsp
							</a><a class="navbar-caption text-white display-4"
								style="padding-left:0;margin-left:0;font-weight:300" href="#top">- Kinase Enrichment
								Analysis Version 3</a></span>
					</div>
				</div>
				<div class="collapse navbar-collapse" id="navbarSupportedContent"
					style="margin-right: 10px; padding-right: 0px">
					<ul class="navbar-nav nav-dropdown" data-app-modern-menu="true">
						<li class="nav-item"><a class="nav-link link text-white display-4"
								href="#content4-o"><span
									class="mbri-setting mbr-iconfont mbr-iconfont-btn"></span> About</a>
						</li>
							<li class="nav-item"><a class="nav-link link text-white display-4"
								href="#content4-about"><span
									class="mbri-idea mbr-iconfont mbr-iconfont-btn"></span>Tutorial</a></li>

						<li class="nav-item"><a class="nav-link link text-white display-4"
								href="#content4-z"><span
									class="mbri-laptop mbr-iconfont mbr-iconfont-btn"></span>API</a></li>

						<li class="nav-item"><a class="nav-link link text-white display-4"
								href="https://github.com/MaayanLab/KEA3web" target="_blank"><span
									class="mbri-github mbr-iconfont mbr-iconfont-btn"></span>GitHub</a></li>

						<li class="nav-item"><a class="nav-link link text-white display-4"
								href="#content4-13"><span
									class="mbri-save mbr-iconfont mbr-iconfont-btn"></span>Download</a></li>
					</ul>

					<!-- <a id="hitcount"> <span class="mbr-iconfont mbr-iconfont-btn"></span></a> -->

				</div>
			</div>
		</nav>
	</div>
	<br>


	<!-- Block 1.1: Query Submissions -->
	<div class="mbr-section" id="homepage" style="background:white;padding-bottom:0">

			<div class="container" style="background: white">
			<div class="row" style="background: white">
				<div class="col-8 offset-2" style="background:white">

					<div id="tfea-submission">
						<h1 class="mbr-section-title mbr-bold mbr-fonts-style display-5 mt-5 mb-0 pt-5 pb-0">
							Submit Your Gene Set for Analysis with KEA3
						</h1>
						<!-- <p class="mbr-text mbr-fonts-style display-7"
											style="margin-bottom: 0; padding-bottom: 2rem">Discover
											transcription factors associated with sets of target genes</p> -->
						<div class="form-container" style="padding: 0; border: ''">
							<div class="media-container-column" data-form-type="formoid">

								<form class="mbr-form" action="">
									<div class="form-group" data-for="message">
										<button type="button" class="btn btn-link display-7 px-0 py-2" style="color:#7A1920;" id="example-genelist"
											type="submit">Example protein list</button>
										<div class="d-inline-block mx-2">or</div>
										<input id="file-input" type="file" style="width: 201px;" accept=".txt">
										<span class="mbri-question ml-2" data-container="body" data-toggle="popover" data-placement="right"
											data-trigger="hover" data-title="<div class='px-1 py-2'>What file types can be uploaded?</div>"
											data-content="<div style = 'max-width:400px' class='px-3 py-2'>KEA3 supports uploading gene lists as text files containing one gene per line.</div>"
											data-html="true"></span>
										<textarea class="form-control 3px pt-2" rows="7" placeholder="Submit protein list with one gene per row."
											id="genelist" cols=""></textarea>

									</div>

									<button type="button" class="btn btn-primary" id="submit-genelist" type="submit"
										style="background-color:#7A1920;padding: .5;">Submit</button>
									<br>
									<span class="display-7" id="genecheck" style="font-size:70%">0 symbols entered, 0
										duplicates, 0 valid symbols</span>
										<span class="mbri-question ml-2" data-container="body" data-toggle="popover" data-placement="right" data-trigger="hover" data-title="<div class='px-1 py-2'>What gene symbols are accepted?</div>" data-content="<div style = 'max-width:400px' class='px-3 py-2'>KEA3 supports <a target='_blank' href ='https://www.genenames.org/'>HGNC-approved</a> gene symbols. Symbols that are not included in this set are not analyzed.</div>" data-html="true"></span>

								</form>

							</div>
						</div>
					</div>

				</div>

			</div> <!-- end row -->
		</div> <!-- end container -->

	</div>

	<%@ include file="templates/results.html" %>
	<%@ include file="templates/about.html" %>
	<%@ include file="templates/tutorial.html" %>
	<%@ include file="templates/api.html" %>
	<%@ include file="templates/libraries.html" %>
	<!--Footer-->
	<br><br>
	<div class="row px-5 justify-content-center">
		<!-- Affiliations Column -->
		<div class="col-md-5 col-sm small">
			<h5 class="mb-3">Affiliations</h5>
			<div><a class="black" href="http://icahn.mssm.edu/research/labs/maayan-laboratory" target="_blank">The
					Ma'ayan Lab</a></div>
			<div><a class="black" href="http://www.lincs-dcic.org/" target="_blank">BD2K-LINCS Data
					Coordination and Integration Center (DCIC)</a></div>
			<div><a class="black" href="http://www.lincsproject.org/">NIH LINCS program</a></div>
			<div><a class="black" href="https://nihdatacommons.us/" target="_blank">Data Commons Pilot
					Project
					Consortium (DCPPC)</a></div>
			<div><a class="black" href="https://druggablegenome.net/KMC_ISMMS" target="_blank">NIH
					Illuminating the Druggable Genome (IDG) Program</a></div>
			<div><a class="black" href="http://icahn.mssm.edu/" target="_blank">Icahn School of Medicine at
					Mount Sinai</a></div>
			<div><a class="black" href="http://icahn.mssm.edu/research/bioinformatics" target="_blank">Mount
					Sinai Center for Bioinformatics</a></div>
		</div>

		<!-- Share Column -->
		<div class="col-md-2 col-sm small">
			<h5 class="mb-3">License</h5>
			<a rel="license" href="https://creativecommons.org/licenses/by-nc-sa/4.0/">
				<img alt="Creative Commons License" style="border-width:0;"
					src="https://i.creativecommons.org/l/by-nc-sa/4.0/88x31.png">
			</a>
			<div class="micro mt-2">
				<p>All contents on this site are covered by the <a rel="license"
						href="https://creativecommons.org/licenses/by-nc-sa/4.0/">Creative
						Commons Attribution 4.0 International License</a>.</p>
			</div>
		</div>

		<!-- Logo Column -->
		<div class="col-md-3 col-sm px-5 mt-3">
			<a href="http://icahn.mssm.edu/research/bioinformatics" target="_blank">
				<img src="https://amp.pharm.mssm.edu/archs4/images/mountsinai.png" class="w-100 px-3">
			</a>
		</div>
	</div>

	<!-- Global site tag (gtag.js) - Google Analytics -->
	<script async src="https://www.googletagmanager.com/gtag/js?id=UA-6277639-43"></script>
	<script>
		window.dataLayer = window.dataLayer || [];
		function gtag() { dataLayer.push(arguments); }
		gtag('js', new Date());

		gtag('config', 'UA-6277639-43');
		$('[data-toggle="popover"]').popover();
	</script>
</body>
</html>