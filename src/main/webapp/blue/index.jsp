<!doctype html>
<html lang="en">
<head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <link rel="shortcut icon" href="static/logo.png" type="image/x-icon">

    <!-- Bootstrap & DT CSS -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
          integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm"
          crossorigin="anonymous">

    <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/v/dt/dt-1.10.21/b-1.6.2/b-html5-1.6.2/datatables.min.css"/>

    <!-- Custom CSS -->

    <link rel="stylesheet" type="text/css" href="css/index.css"/>

    <meta property="og:type" content="website"/>
    <meta property="og:image" content="static/thumbnail.png"/>
</head>
<body>

<div class="container">
    <div class="row">
        <!--  Logo and nav  -->
        <div class="col-3">
            <div class="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                <a class="nav-link active" id="v-pills-index-tab" data-toggle="pill" href="#v-pills-index" role="tab"
                   aria-controls="v-pills-index" aria-selected="false" style="background-color: #FBE5CC">
                    <div id="logo">
                        <h3>Kinase<br/>Enrichment<br/>Analysis<br/>version 3</h3>
                    </div>
                </a>
                <a class="nav-link" id="v-pills-faq-tab" data-toggle="pill" href="#v-pills-faq" role="tab"
                   aria-controls="v-pills-faq" aria-selected="false">FAQ</a>
                <a class="nav-link" id="v-pills-api-tab" data-toggle="pill" href="#v-pills-api" role="tab"
                   aria-controls="v-pills-api" aria-selected="false">API</a>
                <a class="nav-link" id="v-pills-download-tab" data-toggle="pill" href="#v-pills-download" role="tab"
                   aria-controls="v-pills-download" aria-selected="false">Download libraries</a>
            </div>
        </div>
        <!--  Content  -->
        <div class="col-9">
            <div class="tab-content" id="v-pills-tabContent">
                <div class="tab-pane fade show active" id="v-pills-index" role="tabpanel"
                     aria-labelledby="v-pills-index-tab">
                    <%@ include file="templates/form.html" %>
                </div>
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
        <div class="col-12">
            <div id="results" style="display: none">
                <%@ include file="templates/results.jsp" %>
            </div>
        </div>
    </div>
</div>

<%@ include file="templates/footer.html" %>

<script src="https://code.jquery.com/jquery-3.2.1.min.js"
        crossorigin="anonymous"></script>
<script src="https://d3js.org/d3.v5.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js"
        integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q"
        crossorigin="anonymous"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"
        integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl"
        crossorigin="anonymous"></script>
<script type="text/javascript" src="https://cdn.datatables.net/v/dt/dt-1.10.21/b-1.6.2/b-html5-1.6.2/datatables.min.js"></script>
<script type="text/javascript"
        src="https://cdn.datatables.net/select/1.3.1/js/dataTables.select.min.js"></script>

<script type="text/javascript" src="https://kit.fontawesome.com/1295b553b3.js"></script>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
<script src="https://platform.linkedin.com/in.js" type="text/javascript">lang: en_US</script>
<div id="fb-root"></div>
<script async defer crossorigin="anonymous"
        src="https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v6.0"></script>

<script async src="https://www.googletagmanager.com/gtag/js?id=UA-6277639-43"></script>
<script>
    window.dataLayer = window.dataLayer || [];

    function gtag() {
        dataLayer.push(arguments);
    }

    gtag('js', new Date());
    gtag('config', 'UA-6277639-43');
    $('[data-toggle="popover"]').popover();
</script>
<script type="text/javascript" src="js/index.js"></script>
<script type="text/javascript" src="js/results.js"></script>
<script type="text/javascript" src="js/barchart.js"></script>
<script type="text/javascript" src="js/generate_clustergram.js"></script>
<script type="text/javascript" src="static/hgnc_symbols.js"></script>

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