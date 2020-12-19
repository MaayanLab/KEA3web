<!doctype html>
<html lang="en">
<head>
    <!-- Required meta tags -->
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <link rel="shortcut icon" href="/kea3/static/KEA3_logo_transparent.png" type="image/x-icon">

    <!-- Bootstrap & DT CSS -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
          integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossorigin="anonymous">


    <link rel="stylesheet" type="text/css"
          href="https://cdn.datatables.net/v/dt/dt-1.10.21/b-1.6.3/b-html5-1.6.3/datatables.min.css"/>

    <!-- Custom CSS -->
    <link rel="stylesheet" type="text/css" href="dist/css/index.css"/>

    <meta property="og:type" content="website"/>
    <meta property="og:image" content="static/thumbnail.png"/>
</head>
<body>

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
                <%@ include file="placeholder.html" %>
            </div>
        </div>
    </div>
</div>
<%@ include file="footer.html" %>


<script src="https://code.jquery.com/jquery-3.5.1.min.js" crossorigin="anonymous"></script>
<script src="https://d3js.org/d3.v5.min.js"></script>

<script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js"
        integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo"
        crossorigin="anonymous"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js"
        integrity="sha384-OgVRvuATP1z7JjHLkuOU7Xw704+h835Lr+6QL9UvYjZE3Ipu6Tp75j7Bh/kR0JKI"
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