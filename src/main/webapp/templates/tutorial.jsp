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
        <div class="col-7 about__content">
            <h3>Tutorial</h3>

            <h4 class="mt-3">Navigating Your Results</h4>
            <p>
                Once an input list is submitted for analysis with KEA3, various results tabs will appear, each 
                of which provides a different view of the kinase enrichment analysis results. The first tab 
                provides integrative results; it is recommended to consider the results from this tab first. 
            </p>

            <h5 class="mt-3">The Integrated Results Tab</h5>
            <p>
                The integrated results tab displays visualizations and tables for the results from the two 
                integrated methods, MeanRank and TopRank. The bar charts show the top 10 ranked kinases 
                computed using each of the two methods. Each bar in the MeanRank bar chart is color-coded by 
                library; hover over a colored segment to see the kinase rank for that library. The 
                TopRank bar chart displays the corresponding score for each kinase. Use the 
                sliders to view more or less kinases. The charts can be downloaded in SVG or PNG format.
            </p>
            <img src="/kea3/static/int_results_barcharts_updated.gif" class="img-fluid">
            <p>
                Below the bar charts are tables that provide more detailed results. Kinases which are 
                top-ranked for both integrated ranking methods have an asterisk next to their name; the 
                default setting highlights only kinases that appear in the top 10 for both MeanRank and 
                TopRank methods. Kinase names are linked to their corresponding 
                <a href="https://maayanlab.cloud/Harmonizome/">Harmonizome</a> page. In either table, kinases 
                can be searched by name. Click on the overlapping protein counts to see the actual names of 
                the overlapping proteins. Click on the MeanRank score to show the rank of a given kinase in 
                each of the KEA3 libraries. Click on the Integrated Scaled Rank score to show the library 
                with the best scaled rank of the given kinase.
            </p>
            <img src="/kea3/static/int_results_tables.gif" class="img-fluid">
            <p>
                Below the tables are subnetworks that connect the top-ranked kinases from the MeanRank and 
                TopRank methods based on known kinase-substrate and kinase-protein interactions. Sliders are 
                provided to adjust the number of kinases to include within each subnetwork. The subnetworks 
                can be downloaded in SVG and PNG formats. Hover over an edge to view libraries in which 
                evidence for an interaction was found.
            </p>
            <img src="/kea3/static/int_results_subnetworks.gif" class="img-fluid">
            <p>
                A <a href="https://maayanlab.cloud/clustergrammer/">Clustergrammer</a> visualization is also 
                provided for the integrated results. Each column is a ranked set from the MeanRank or
                TopRank results, and each row is a putative substrate from the input list that overlaps with 
                the sets from the integrated methods. The heat map is fully interactive; hover over terms 
                or sections for more detailed information. Rows and columns can also be sorted by sum. 
                Clustergrammer is developed by the Ma'ayan Lab. 
            </p>
            <img src="/kea3/static/int_results_clustergram.gif" class="img-fluid">

            <h5 class="mt-3">The Tables Tab</h5>
            <p>
                The KEA3 enrichment analysis results for different kinase-substrate interaction libraries are 
                displayed in a table format. By default, kinases are ranked by the Fisher's Exact Test (FET) 
                p-value in ascending order. A low p-value and high rank indicates significant enrichment for 
                kinase substrate overlap between the query set and a gene set in the library. False 
                discovery rates (FDRs) were computed with the Benjamini-Hochberg correction method. The 
                table is searchable, and the name of each protein is hyperlinked to the corresponding 
                <a href="https://maayanlab.cloud/Harmonizome/">Harmonizome</a> page. Clicking on the 
                overlapping protein counts will display the names of overlapping proteins. Tables may be 
                downloaded in TSV format.
            </p>
            <img src="/kea3/static/tables.gif" class="img-fluid">

            <h4>Visualizing Your Results</h4>
            <p>
                A global kinase co-expression network, a local results-specific co-regulatory network, 
                bar charts, and a clustergram are available to aid in interpreting the results.
            </p>

            <h5 class="mt-3">The Networks Tab</h5>
            <p>
                The KEA3 results are projected onto human kinome networks produced by applying 
                <a href="https://horvath.genetics.ucla.edu/html/CoexpressionNetwork/Rpackages/WGCNA/">Weighted 
                Gene Co-expression Network Analysis (WGCNA)</a> to datasets from 
                <a href="https://maayanlab.cloud/archs4/">ARCHS4</a>, 
                <a href="https://gtexportal.org/home/">GTEx</a>, and 
                <a href="https://www.cancer.gov/about-nci/organization/ccg/research/structural-genomics/tcga">TCGA</a>. 
                Select a library using the drop-down menu above each network to view the top kinases, which 
                will be highlighted in the visualization. By default, the top 10 kinases from the chosen 
                library are highlighted, but this number can be adjusted using the slider above each graph. 
                The networks can be downloaded in SVG or PNG format.
            </p>
            <img src="/kea3/static/coexp.gif" class="img-fluid">

            <h5 class="mt-3">The Subnetworks Tab</h5>
            <p>
                Kinase-kinase co-regulatory subnetworks are constructed by connecting the top-ranked kinases 
                from the KEA3 results for various kinase-substrate interaction libraries. Directed edges 
                indicate interactions supported by kinase-substrate evidence, while undirected edges indicate 
                protein-protein interactions. Hover over an edge to view the source libraries supplying 
                evidence for the interaction. Use the sliders to increase or decrease the number of kinases 
                within each subnetwork.
            </p>
            <img src="/kea3/static/coreg.gif" class="img-fluid">

            <h5 class="mt-3">The Bar Charts Tab</h5>
            <p>
                The bar charts tab provides the KEA3 results as bar charts showing the -log(p-value) of the 
                top-ranked kinases from analysis of each KEA3 library. The numer of top kinases displayed 
                may be modifed using the slider above each chart.
            </p>

            <h5 class="mt-3">The Clustergrammer Tab</h5>
            <p>
                The clustergrammer tab provides a visualization of the relationships between the most 
                common kinase-substrate associations detected as overlapping with the input. Each column 
                represents a protein set from a KEA3 library, while the rows are putative substrates from the 
                input list which overlap with proteins from the KEA3 library sets. Rows and columns can be 
                sorted by sum, in order to observe the KEA3 sets with the most substrates. 
                <a href="https://maayanlab.cloud/clustergrammer/">Clustergrammer</a> 
                is an interactive heatmap visualization component developed by the Ma'ayan Lab.
            </p>
            <img src="/kea3/static/cluster.gif" class="img-fluid"> 

            <h4 class="mt-3">Accessing the KEA3 API</h4>
            <p>
                KEA3 provides a well-documented API to enable programmatic access for querying the KEA3 
                database. The KEA3 REST API uses POST to handle user-submitted JSON-formatted gene sets, and 
                produces JSON-formatted query results. More details can be found on the 
                <a href="/kea3/templates/api.jsp">API page</a>. 
            </p>

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