<!doctype html>
<html lang="en">
<head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <link rel="shortcut icon" href="static/logo.png" type="image/x-icon">

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
          integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm"
          crossorigin="anonymous">

    <!-- Custom CSS -->
    <link rel="stylesheet" type="text/css" href="css/custom_dataTables.css"/>
    <link rel="stylesheet" type="text/css" href="css/custom_select_dataTables.css"/>

    <link rel="stylesheet" type="text/css" href="css/index.css"/>

    <meta property="og:type" content="website"/>
    <meta property="og:image" content="static/thumbnail.png"/>
</head>
<body>

<div class="container">
    <div class="row">
    <!--  Logo and nav  -->
    <div class="col-3">
        <h3>Kinase<br/>Enrichment<br/>Analysis<br/>version 3</h3>
        <div class="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
            <a class="nav-link active" id="v-pills-results-tab" data-toggle="pill" href="#v-pills-results" role="tab" aria-controls="v-pills-results" aria-selected="true">Results</a>
            <a class="nav-link" id="v-pills-faq-tab" data-toggle="pill" href="#v-pills-faq" role="tab" aria-controls="v-pills-faq" aria-selected="false">FAQ</a>
            <a class="nav-link" id="v-pills-api-tab" data-toggle="pill" href="#v-pills-api" role="tab" aria-controls="v-pills-api" aria-selected="false">API</a>
            <a class="nav-link" id="v-pills-download-tab" data-toggle="pill" href="#v-pills-download" role="tab" aria-controls="v-pills-download" aria-selected="false">Download libraries</a>
        </div>
    </div>
    <!--  Content  -->
    <div class="col-8">
        <div class="tab-content" id="v-pills-tabContent">
            <div class="tab-pane fade show active" id="v-pills-results" role="tabpanel" aria-labelledby="v-pills-results-tab">...</div>
            <div class="tab-pane fade" id="v-pills-faq" role="tabpanel" aria-labelledby="v-pills-faq-tab">
                <div id="faq" class="row faq">
                    <%@ include file="templates/faq.html" %>
                </div>
            </div>
            <div class="tab-pane fade" id="v-pills-api" role="tabpanel" aria-labelledby="v-pills-api-tab">
                <div id="api" class="row api">
                    <%@ include file="templates/api.html" %>
                </div>
            </div>
            <div class="tab-pane fade" id="v-pills-download" role="tabpanel" aria-labelledby="v-pills-download-tab">
                <div id="libraries" class="row libraries">
                    <%@ include file="templates/libraries.html" %>
                </div>
            </div>
        </div>
    </div>
    </div>
</div>

<footer class="footer">
    <div class="container">
        <div class="row justify-content-center m-5">
            <div class="col-md-2 col-sm text-center">
                <a href="https://icahn.mssm.edu/research/bioinformatics" target="_blank">
                    <img class="rounded" src="static/icahn_cb.png" style="height: 5rem;">
                </a>
            </div>
            <div class="col-md-2 col-sm text-center">
                <a href="http://lincs-dcic.org" target="_blank">
                    <img class="rounded" src="static/dcic_light.png" style="height: 5rem;">
                </a>
            </div>
            <div class="col-md-2 col-sm text-center">
                <a href="https://labs.icahn.mssm.edu/maayanlab/" target="_blank">
                    <img class="rounded" src="static/maayanlab_logo.png"
                         style="height: 5rem;">
                </a>
            </div>
            <div class="col-md-2 col-sm">
                <div class="row my-2">
                    <a class="badge badge-secondary px-2" href="https://github.com/MaayanLab/KEA3web" target="_blank">
                        <span class="badge badge-light">
                            <img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
                                 style="width: 1rem;">
                </span>
                        View source code
                    </a>
                </div>
                <div class="row my-2">
                    <a class="badge badge-secondary px-2"
                       href="https://github.com/MaayanLab/KEA3web/issues/new" target="_blank">
                        <span class="badge badge-light">
                        <img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
                             style="width: 1rem;">
                            </span>
                        Submit an issue
                    </a>
                </div>
            </div>
        </div>
    </div>
</footer>

<script src="https://code.jquery.com/jquery-3.2.1.min.js"
        crossorigin="anonymous"></script>
<script src="https://d3js.org/d3.v5.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js"
        integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q"
        crossorigin="anonymous"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"
        integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl"
        crossorigin="anonymous"></script>
<script type="text/javascript"
        src="https://cdn.datatables.net/v/dt/dt-1.10.20/b-1.6.1/b-html5-1.6.1/rg-1.1.1/sc-2.0.1/sp-1.0.1/datatables.min.js"></script>
<script type="text/javascript"
        src="https://cdn.datatables.net/select/1.3.1/js/dataTables.select.min.js"></script>

<script type="text/javascript" src="https://kit.fontawesome.com/1295b553b3.js"></script>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
<script src="https://platform.linkedin.com/in.js" type="text/javascript">lang: en_US</script>
<div id="fb-root"></div>
<script async defer crossorigin="anonymous"
        src="https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v6.0"></script>

<script>
    $(document).ready(function () {
        // Force https if not on dev
        if ((location.protocol !== 'https:') && (location.hostname !== 'localhost')) {
            location.href = 'https:' + window.location.href.substring(window.location.protocol.length);
        }
    });
</script>
</body>
</html>