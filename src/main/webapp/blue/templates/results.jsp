<div class="col-12 hidden">
    <nav>
        <div class="nav nav-tabs" id="nav-tab" role="tablist">
            <a class="nav-item nav-link active" id="nav-tables-tab" data-toggle="tab" href="#nav-tables" role="tab" aria-controls="nav-tables" aria-selected="true">Tables</a>
            <a class="nav-item nav-link" id="nav-networks-tab" data-toggle="tab" href="#nav-networks" role="tab" aria-controls="nav-networks" aria-selected="false">Networks</a>
            <a class="nav-item nav-link" id="nav-barcharts-tab" data-toggle="tab" href="#nav-barcharts" role="tab" aria-controls="nav-barcharts" aria-selected="false">Barcharts</a>
            <a class="nav-item nav-link" id="nav-cluster-tab" data-toggle="tab" href="#nav-cluster" role="tab" aria-controls="nav-cluster" aria-selected="false">Clustergrammer</a>
        </div>
    </nav>
    <div class="tab-content" id="nav-tabContent">
        <div class="tab-pane fade show active" id="nav-tables" role="tabpanel" aria-labelledby="nav-tables-tab">
            <%@ include file="tables.html" %>
        </div>
        <div class="tab-pane fade" id="nav-networks" role="tabpanel" aria-labelledby="nav-networks-tab">...</div>
        <div class="tab-pane fade" id="nav-barcharts" role="tabpanel" aria-labelledby="nav-barcharts-tab">
            <%@ include file="barcharts.html" %>
        </div>
        <div class="tab-pane fade" id="nav-cluster" role="tabpanel" aria-labelledby="nav-cluster-tab">
            <%@ include file="clustergramm.html" %>
        </div>
    </div>
</div>