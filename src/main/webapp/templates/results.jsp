<div id="results" style="display: none" class="col-lg-10 col-md-10 col-sm-12">
    <nav>
        <div class="nav nav-tabs" id="nav-tab" role="tablist">
            <a class="nav-item nav-link active" id="nav-intres-tab" data-toggle="tab" href="#nav-intres" role="tab"
               aria-controls="nav-intres" aria-selected="true">Integrated results</a>
            <a class="nav-item nav-link" id="nav-tables-tab" data-toggle="tab" href="#nav-tables" role="tab"
               aria-controls="nav-tables" aria-selected="true">Tables</a>
            <a class="nav-item nav-link" id="nav-networks-tab" data-toggle="tab" href="#nav-networks" role="tab"
               aria-controls="nav-networks" aria-selected="false">Networks</a>
            <a class="nav-item nav-link" id="nav-graph-tab" data-toggle="tab" href="#nav-graph" role="tab"
               aria-controls="nav-graph" aria-selected="false">Subnetworks</a>
            <a class="nav-item nav-link" id="nav-barcharts-tab" data-toggle="tab" href="#nav-barcharts" role="tab"
               aria-controls="nav-barcharts" aria-selected="false">Bar Charts</a>
            <a class="nav-item nav-link" id="nav-cluster-tab" data-toggle="tab" href="#nav-cluster" role="tab"
               aria-controls="nav-cluster" aria-selected="false">Clustergrammer</a>
        </div>
    </nav>
    <div class="tab-content" id="nav-tabContent">
        <div class="tab-pane px-2 fade show active" id="nav-intres" role="tabpanel" aria-labelledby="nav-intres-tab">
            <%@ include file="integrated_results.html" %>
        </div>
        <div class="tab-pane px-2 fade" id="nav-tables" role="tabpanel" aria-labelledby="nav-tables-tab">
            <%@ include file="tables.html" %>
        </div>
        <div class="tab-pane px-2 fade" id="nav-networks" role="tabpanel" aria-labelledby="nav-networks-tab">
            <%@ include file="global_networks.html" %>
        </div>
        <div class="tab-pane px-2 fade" id="nav-graph" role="tabpanel" aria-labelledby="nav-graph-tab">
            <%@ include file="graph.html" %>
        </div>
        <div class="tab-pane px-2 fade" id="nav-barcharts" role="tabpanel" aria-labelledby="nav-barcharts-tab">
            <%@ include file="barcharts.html" %>
        </div>
        <div class="tab-pane px-2 fade" id="nav-cluster" role="tabpanel" aria-labelledby="nav-cluster-tab">
            <%@ include file="clustergramm.html" %>
        </div>
    </div>
</div>