<!doctype html>
<html lang="en">
<head>
    <!-- Required meta tags -->
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <link rel="shortcut icon" href="/kea3/static/KEA3_logo_transparent.png" type="image/x-icon">

    <!-- Bootstrap & DT CSS -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css"
          integrity="sha384-B0vP5xmATw1+K9KRQjQERJvTumQW0nPEzvF6L/Z6nronJ3oUOFUFpCjEUQouq2+l" crossorigin="anonymous">


    <link rel="stylesheet" type="text/css"
          href="https://cdn.datatables.net/v/dt/dt-1.10.21/b-1.6.3/b-html5-1.6.3/datatables.min.css"/>

    <!-- Custom CSS -->
    <link rel="stylesheet" type="text/css" href="dist/css/index.css"/>

    <meta property="og:type" content="website"/>
    <meta property="og:image" content="static/thumbnail.png"/>
</head>

<body class="d-flex flex-column h-100">
<main role="main" class="flex-shrink-0">
    <div class="container-fluid">
        <%@ include file="header.html" %>
        <div class="row justify-content-center">
            <!--  Content  -->
            <div class="col-8">
                <%@ include file="form.html" %>
            </div>
        </div>
        <div class="row justify-content-center">
            <%@ include file="results.jsp" %>
        </div>
        <div class="row justify-content-center">
            <div class="col-10">
                <div id="placeholder" style="display: none">
                    <%@ include file="placeholder_ext.html" %>
                </div>
            </div>
        </div>
    </div>
</main>
<%@ include file="footer.html" %>


<script src="https://code.jquery.com/jquery-3.5.1.min.js"
        integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=" crossorigin="anonymous"></script>
<script src="https://d3js.org/d3.v5.min.js"></script>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-Piv4xVNRyMGpqkS2by6br4gNJ7DXjqk09RmUpJ8jgGtD7zP9yug3goQfGII0yAns"
        crossorigin="anonymous"></script>
<script type="text/javascript"
        src="https://cdn.datatables.net/v/dt/dt-1.10.21/b-1.6.3/b-html5-1.6.3/datatables.min.js"></script>
<script type="text/javascript"
        src="https://cdn.datatables.net/select/1.3.1/js/dataTables.select.min.js"></script>

<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
<script src="https://platform.linkedin.com/in.js" type="text/javascript">en_US</script>
<div id="fb-root"></div>
<script async defer crossorigin="anonymous"
        src="https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v6.0"></script>

<script async src="https://www.googletagmanager.com/gtag/js?id=G-P74CNQT8DY"></script>
<script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-P74CNQT8DY');
</script>
<script type="text/javascript" src="static/hgnc_symbols.js"></script>
<script type="text/javascript" src="static/tissue_legends.js"></script>
<script type="text/javascript" src="dist/js/index.js"></script>
<script type="text/javascript" src="dist/js/results.js"></script>
<script type="text/javascript" src="dist/js/barchart.js"></script>
<script type="text/javascript" src="dist/js/global_network.js"></script>
<script type="text/javascript" src="dist/js/graph.js"></script>
<script type="text/javascript" src="dist/js/generate_clustergram.js"></script>
<script type="text/javascript" src="https://kit.fontawesome.com/1295b553b3.js"></script>

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