<!doctype html>
<html lang="en">
<head>
    <!-- Required meta tags -->
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <link rel="shortcut icon" href="/kea3/static/KEA3_logo_transparent.png" type="image/x-icon">

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
          integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossorigin="anonymous">

    <!-- Custom CSS -->
    <link rel="stylesheet" type="text/css" href="/kea3/dist/css/index.css"/>

    <meta property="og:type" content="website"/>
    <meta property="og:image" content="/kea3/static/thumbnail.png"/>
</head>
<body>
<div class="container-fluid">
    <%@ include file="header.html" %>
    <div class="row justify-content-center">
        <div class="col-8 about__content">
            <h3 class="text-muted">Tutorial</h3>
            <ol>
                <li><strong>Navigating Your Results</strong> - Results tables from the integration methods MeanRank
                    and TopRank
                    and from each KEA3 kinase substrate library are accessible from a dropdown menu.
                    The MeanRank table is by default the first table shown because it performed the best across the
                    KEA3 benchmarks. Tables may
                    be searched by entering terms in the search box, sorted by column by clicking on the
                    column header, and copied to the clipboard by clicking on the Copy button. Results
                    for the KEA3 kinase substrate libraries are sorted by the Fisher's Exact Test p-value.
                    This provides a ranking of kinases whose putative substrates
                    are most closely similar to the query set. Integrated results, which take into account
                    results from all libraries, are sorted in ascending order by score. Lower scores indicate
                    more relevancy to the kinase substrate set. The top 100 results are returned for each table. The
                    full kinase ranking and results
                    for each integration method and library may be downloaded as a tab-separated (tsv) file using a
                    link found at the footer of each
                    results table. Full results are also available via the
                    <a href="#api">KEA3 API</a>.
                    <img src="/kea3/static/tables.gif" class="img-fluid"></li>
                <li><strong>Visualizing Your Results</strong> - A global kinase co-expression
                    network, a local results-specific co-regulatory network, bar charts, and a clustergram are
                    available to aid in interpreting the results.
                    <ul>
                        <li><strong>Kinase Co-expression Networks</strong></li>

                        The kinase co-expression networks are provided to help users visualize their top ranking
                        kinases
                        in the context of the larger human kinase phosphorylation network. There are three networks
                        generated from GTEx,
                        TCGA, and ARCHS4 expression data. Users may toggle between these three networks using the
                        dropdown menu.
                        <img src="/kea3/static/coexp.gif" class="img-fluid">

                        The slider above the network designates the number of kinases to highlight in the network.
                        The kinases that are highlighted are the top results
                        from the library that is selected from library selection dropdown menu.
                        Network node coloring options provide additional information about the tissues or tumor
                        types the kinases may be
                        most active in. The network may be zoomed, panned, and saved as an SVG image. There are
                        other options, for
                        example, hiding the legend or switching to full screen. These options can be accessed by
                        clicking
                        the "Network Options" hamburger.
                        </li>

                        <li><strong>Kinase Co-regulatory Networks</strong></li>
                        Kinase-kinase phosphorylation networks are dynamically generated using the top results of
                        the selected library. Edges between kinases are defined
                        by evidence from the KEA3 libraries and are directed where evidence from a KSI library
                        supports the interaction and undirected where evidence from a PPI library supports the
                        interaction.
                        The supporting evidence for each
                        edge is summarized in a tooltip that appears upon hovering over each edge. The slider above
                        the network indicates the number of top kinase results
                        to include in the network from the library results indicated in the library selection
                        dropdown.
                        <img src="/kea3/static/coreg.gif" class="img-fluid">
                        <li><strong>Bar Charts</strong></li>
                        Bar charts corresponding to the top kinases of the selected library display the
                        -log10(pvalue) for KEA3 kinase substrate library results, and an integrated
                        rank score for the integrated library results. The numer of top kinases on the y-axis may be
                        modifed using the slider.
                        <img src="/kea3/static/bar.gif" class="img-fluid">

                        <li>Clustergram</li>
                        The interactive clustergram shows the overlapping query substrate targets among top library
                        results.
                        <img src="/kea3/static/cluster.gif" class="img-fluid">
                    </ul>
            </ol>
        </div>
    </div>
    <%@ include file="footer.html" %>
</div>
</body>
<script src="https://code.jquery.com/jquery-3.5.1.min.js" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js"
        integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo"
        crossorigin="anonymous"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js"
        integrity="sha384-OgVRvuATP1z7JjHLkuOU7Xw704+h835Lr+6QL9UvYjZE3Ipu6Tp75j7Bh/kR0JKI"
        crossorigin="anonymous"></script>

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