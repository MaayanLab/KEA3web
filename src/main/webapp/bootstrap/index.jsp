<!DOCTYPE html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="">
    <meta name="author" content="">
    <link rel="shortcut icon" href="static/images/favicon.png" type="image/x-icon">

    <title>KEA3</title>
    <link rel="stylesheet" href="css/custom.css">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">

    <%--  Below  --%>
    <link rel="stylesheet" href="https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
    <link rel="stylesheet" href="libs/theme/css/style.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.8.0/Chart.min.css">
    <link rel="stylesheet" href="libs/mobirise/css/mbr-additional.css">
    <link rel="stylesheet" href="css/styles.css">
    <link rel="stylesheet" href="libs/mobirise/mobirise-icons/mobirise-icons.css">
    <%--  Above  --%>

    <script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"></script>
    <script src="https://kit.fontawesome.com/1295b553b3.js"></script>

    <%--  Below  --%>
    <script src="libs/mobirise/mbr-switch-arrow.js"></script>
    <script src="libs/theme/js/script.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.8.0/Chart.bundle.min.js"></script>

</head>

<html>
<body data-spy="scroll" data-target="#index__navbar" data-offset="150">
<div id="top"></div>
<div id="index" class="container index">
    <div class="row justyfy-content-center">
        <div class="col-sm col-md-10">
            <nav id="index__navbar" class="navbar fixed-top navbar-expand-sm navbar-dark index__navbar">
                <div class="container">
                    <a class="navbar-brand mx-auto" href="#top">
                        <img src="static/images/KEA3_logo_transparent.png" width="30" height="30"
                             class="d-inline-block align-top" alt="">
                        KEA3 - Kinase Enrichment Analysis Version 3
                    </a>
                    <button class="navbar-toggler" type="button" data-toggle="collapse"
                            data-target="#navbarNavAltMarkup"
                            aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div class="navbar-nav">
                            <a class="nav-item nav-link" href="#about">About</a>
                            <a class="nav-item nav-link" href="#tutorial">Tutorial</a>
                            <a class="nav-item nav-link" href="#api">API</a>
                            <a class="nav-item nav-link" href="#libraries">Download</a>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    </div>
    <div class="row justyfy-content-center index__content">
        <div class="col-sm col-md-10">
            <div id="landing" class="row landing">
                <%@ include file="templates/landing.html" %>
            </div>

            <div id="results" class="row results">
                <%@ include file="templates/results.html" %>
            </div>

            <div id="about" class="row about">
                <%@ include file="templates/about.html" %>
            </div>

            <div id="tutorial" class="row tutorial">
                <%@ include file="templates/tutorial.html" %>
            </div>

            <div id="api" class="row api">
                <%@ include file="templates/api.html" %>
            </div>

            <div id="libraries" class="row libraries">
                <%@ include file="templates/libraries.html" %>
            </div>
        </div>
    </div>
    <%@ include file="templates/footer.html" %>
</div>
</body>
</html>


<link rel="stylesheet" href="css/result_scroll.css">
<link rel="stylesheet" href="css/submit-query.css">
<link rel="stylesheet" href="https://cdn.datatables.net/1.10.20/css/dataTables.bootstrap4.min.css"/>
<link rel="stylesheet" href="css/netprogressbar.css">
<link rel="stylesheet" href="css/network_options.css">
<link rel="stylesheet" href="css/network_style.css">
<link rel="stylesheet" href="libs/socicon/css/styles.css">
<link rel="stylesheet" href="libs/spectrum/spectrum.css">
<link rel="stylesheet" href="libs/tooltips/css_tooltips.css">

<script src="js/hgnc_symbols.js"></script>
<script src="js/palette.js"></script>
<script src="js/tissue_legends.js"></script>
<script src="js/submit-query.js"></script>
<script src="https://d3js.org/d3.v4.min.js"></script>
<script src="js/generate_clustergram.js"></script>
<script src="js/local_network.js"></script>
<script src="js/barchart.js"></script>
<script src="https://cdn.datatables.net/1.10.20/js/jquery.dataTables.min.js"></script>
<script src="https://cdn.datatables.net/1.10.20/js/dataTables.bootstrap4.min.js"></script>
<script src="libs/dropdown/js/script.min.js"></script>
<script src="js/global_network.js"></script>
<script src="libs/spectrum/spectrum.js"></script>

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