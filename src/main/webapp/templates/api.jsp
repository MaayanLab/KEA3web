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
        <div class="col-8 api__content">
            <h3 class="text-muted">API</h3>
            <p>KEA3 has an API to enable programmatic access for querying the KEA3 database</p>
            <p>The KEA3 REST API uses POST to transport user submitted JSON-formatted gene sets and JSON-formatted
                query results between the KEA3 server and the user's script. The user gene set and optional
                additional information are encoded in JSON format.</p>

            <p><strong>Method:</strong> POST</p>
            <p><strong>URL:</strong> /KEA3/api/enrich/</p>
            <p><strong>Returns:</strong> JSON array of KEA3 library result objects</p>
            <p><strong>Parameters:</strong></p>
            <p>query_name: String</p>
            <p>gene_set: An array of strings</p>

            <ol>
                <li><strong>Command-line Example</strong> - The following returns results from all KEA3
                    libraries in JSON format:
                    <pre style="width: 100%; overflow-x: scroll; white-space: nowrap">$ curl -d '{"query_name":"myQuery", "gene_set":["FOXM1","SMAD9","MYC","SMAD3","STAT1","STAT3"]}' -H 'Content-Type: application/json' https://maayanlab.cloud/kea3/api/enrich/</pre>
                    Redirect the JSON-formatted results to a file:
                    <pre style="width: 100%; overflow-x: scroll; white-space: nowrap">$ curl -d '{"query_name":"myQuery", "gene_set":["FOXM1","SMAD9","MYC","SMAD3","STAT1","STAT3"]}' -H 'Content-Type: application/json' https://maayanlab.cloud/kea3/api/enrich/ > results.json</pre>
                </li>
                <li><strong>R Example</strong>
                    <pre>
library(httr)
library(jsonlite)

genes = c("SMAD9","FOXO1","MYC","STAT1",'STAT3',"SMAD3")
url = "https://maayanlab.cloud/kea3/api/enrich/"
encode = "json"
payload = list(query_name = "myQuery", gene_set = genes)

response = POST(url = url, body = payload, encode = encode)
json = content(response, "text")

results = fromJSON(json)
</pre>
                </li>
            </ol>
        </div>
    </div>
    <%@ include file="footer.html" %>
</div>

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