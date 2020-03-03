<!DOCTYPE html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="">
    <meta name="author" content="">
    <link rel="shortcut icon" href="static/images/KEA3_logo_transparent.png" type="image/x-icon">

    <title>KEA3</title>

    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
    <script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"></script>
    <style>
        #landing, #about, #tutorial, #api, #download {
            margin-top: -70px;
            padding-top: 110px;
        }
    </style>
</head>

<body data-spy="scroll" data-target="#index__navbar" data-offset="150">
<div id="top"></div>

<div id="index" class="container">
    <div class="row justyfy-content-center">
        <div class="col-sm col-md-10">
            <nav id="index__navbar" class="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
                <a class="navbar-brand" href="#top">
                    <img src="../static/images/KEA3_logo_transparent.png" width="30" height="30"
                         class="d-inline-block align-top" alt="">
                    KEA3
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
                        <a class="nav-item nav-link" href="https://github.com/MaayanLab/KEA3web"
                           target="_blank">GitHub</a>
                        <a class="nav-item nav-link" href="#download">Download</a>
                    </div>
                </div>
            </nav>
        </div>
    </div>
    <div class="row justyfy-content-center">
        <div class="col-sm col-md-10">
            <div id="landing" class="row">
                <%@ include file="templates/landing.html" %>
            </div>

            <div id="about" class="row">
                <%@ include file="templates/about.html" %>
            </div>

            <div id="tutorial" class="row">
                <%@ include file="templates/tutorial.html" %>
            </div>

            <div id="api" class="row">
                <%@ include file="templates/api.html" %>
            </div>

            <div id="download" class="row">
                <%@ include file="templates/libraries.html" %>
            </div>
        </div>
    </div>
    <%@ include file="templates/footer.html" %>
</div>
</body>