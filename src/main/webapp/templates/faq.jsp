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
            <h3>Frequently asked questions</h3>
            <h4 class="mt-3">What is enrichment of kinase substrates?</h4>
            <p>Protein kinases are enzymes that catalyze the transfer of a phosphate group from ATP to another protein
                on a
                threonine, a serine, or a tyrosine residue. The reversible addition of a phosphate group to a protein
                can
                profoundly affect its reversible activity, stability, localization, and interactions with other
                molecules. Of
                the hundreds of thousands of potential phosphorylation sites, each protein kinase recognizes between one
                to a
                few hundred substrates. Thus, kinases serve a critical and central role in regulating essentially all
                cellular
                processes, and their aberrant activity is recognized as a cause of many human diseases. Phosphoproteomic
                signatures, which represent the differential phosphorylation state of cellular proteins between two
                cellular
                states, can provide a snapshot of the intracellular signaling networks that are differentially active
                between
                two conditions, for instance, between diseased and healthy cells. The enrichment of known kinase
                substrates in a
                set of differentially phosphorylated proteins can serve as a marker of the activity of the upstream
                kinases,
                thus providing insights into physiological and pathophysiological mechanisms.</p>
            <h4 class="mt-3">What is KEA?</h4>
            <p>Kinase Enrichment Analysis
                3
                (KEA3) infers upstream kinases whose putative substrates are overrepresented in a user-inputted list of
                genes or
                differentially phosphorylated proteins. The KEA3 database contains putative kinase-substrate
                interactions
                collected from publicly available datasets. Gene sets of putative kinase substrates are used as the
                primary
                units of analysis in KEA3. These gene sets are organized in gene set "libraries." Libraries are
                supersets of
                kinase substrate sets that are aggregated based on the database from which they are derived.</p>

            <h4>How librares are constructed?</h4>
            <p> All protein and gene symbols were mapped to 2019 HGNC-approved gene symbols using the custom R package
                <a href="https://github.com/MaayanLab/genesetr">genesetr</a>. Gene or protein symbols that could
                not be mapped using synonym or alias matching were discarded. The set of 520 unique <a
                        href="https://www.genenames.org/">HGNC-mappable</a> human protein kinases used for KEA3 are
                derived from <a
                        href="https://www.ncbi.nlm.nih.gov/pubmed/12471243">Manning
                    et al.</a>, <a href="https://www.ncbi.nlm.nih.gov/pubmed/17557329">Miranda-Saavedra and Barton</a>,
                and the
                <a href="https://druggablegenome.net/">Illuminating the Druggable Genome</a> (IDG) project.
            </p>

            <h5 style="font-weight: 400;">Kinase-substrate interactions libraries</h5>
            <p>
            <ul>
                <li>
                    The <a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4116514/#SD5" target="_blank">Cheng <i>et
                    al. </i></a>kinase-substrate interaction network (KSIN) dataset incorporates human kinase-substrate
                    interactions from the <a href="">Phospho.ELM</a>, <a
                        href="https://genome.cshlp.org/content/13/10/2363.full.html">HPRD</a>, <a
                        href="https://phosphonetworks.org/">PhosphoNetworks</a>, and <a
                        href="https://www.phosphosite.org/homeAction.action">PhosphoSitePlus</a> databases.

                <li>
                    <a href="http://prot-shiny-vm.broadinstitute.org:3838/ptmsigdb-app/" target="_blank">PTMsigDB</a>
                    contains
                    a collection of kinase phosphorylation signatures derived from <a
                        href="https://www.phosphosite.org/homeAction.action">PhosphoSitePlus</a>.

                <li>
                    <a href="https://omictools.com/phosd-tool">PhosD</a> predicts kinase-substrate interactions based
                    on protein domains.
                </li>
            </ul>
            </p>
            <h5 style="font-weight: 400;">Protein-protein interactions libraries</h5>
            <p>
            <ul>
                <li>
                    The <a href="https://thebiogrid.org/">BioGRID</a> and <a
                        href="https://mint.bio.uniroma2.it/">MINT</a> databases contain PPIs from high- and
                    low-throughput experiments that were manually curated from the literature.
                <li><a href="https://mentha.uniroma2.it/">Mentha</a> is a PPI network (PPIN) that contains molecular
                    interactions aggregated and updated weekly from <a href="https://mint.bio.uniroma2.it/">MINT</a>, <a
                        href="https://www.ebi.ac.uk/intact/">IntAct</a>, <a href="https://thebiogrid.org/">BioGRID</a>,
                    <a href="http://matrixdb.univ-lyon1.fr/">MatrixDB</a>, and the <a
                        href="https://dip.doe-mbi.ucla.edu/dip/Main.cgi">Database of Interacting Proteins (DIP)</a>.
                <li>
                    <a href="http://cbdm-01.zdv.uni-mainz.de/~mschaefer/hippie/">HIPPIE</a> aggregates experimentally
                    determined PPIs from <a href="https://www.ebi.ac.uk/intact/">IntAct</a>, <a
                        href="https://mint.bio.uniroma2.it/">MINT</a>, <a href="https://thebiogrid.org/">BioGRID</a>, <a
                        href="https://genome.cshlp.org/content/13/10/2363.full.html">HPRD</a>, <a
                        href="https://dip.doe-mbi.ucla.edu/dip/Main.cgi">DIP</a>, <a
                        href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC165503/">BIND</a>, and <a
                        href="http://mips.helmholtz-muenchen.de/proj/ppi/">MMPI</a>.
                <li>
                    <a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4116514/">Cheng <i>et al.</i></a> used PPIs
                    collected from<a href="https://www.ebi.ac.uk/intact/">IntAct</a>, <a
                        href="https://mint.bio.uniroma2.it/">MINT</a>, <a href="https://thebiogrid.org/">BioGRID</a>, <a
                        href="https://dip.doe-mbi.ucla.edu/dip/Main.cgi">DIP</a>, <a
                        href="https://genome.cshlp.org/content/13/10/2363.full.html">HPRD</a>, and <a
                        href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC1347366/">MIPS MPact</a>.
                <li>
                    <a href="http://honig.c2b2.columbia.edu/preppi">PrePPI</a> consists of predicted PPIs that were
                    determined using a Bayesian framework that relies on three-dimensional structural, functional
                    evolutionary, and expression information to make PPI predictions.
                </li>
            </ul>
            </p>

            <h5 style="font-weight: 400;">Other libraries</h5>
            <p><a href="https://string-db.org" target="_blank">STRING</a> KEA3 library includes physical interaction,
                co-expression, co-occurrence in the literature, and evolutionary co-occurrence, among other association
                types.</p>

            <h4>What is kinase substrate over-representation analysis?</h4>
            <p>The goal of KEA3 is to predict kinases
                associated with user-input sets of genes/proteins. Discrete query gene/protein sets are compared to <a
                        href="/kea3/templates/libraries.jsp">KEA3 libraries</a> of putative kinase substrate sets assembled from multiple
                publically
                available datasets. The Fisher's Exact Test, with a background size of 20,000, is used to compare the
                input
                gene/protein set to the kinase substrate sets in order to determine which kinases may be most closely
                associated
                with the input gene/protein set.
            </p>
            <h4>What types of input KEA3 accepts?</h4>
            <p>Users can submit a set of human gene or protein symbols for kinase enrichment
                analysis.
                Commonly, the gene set may be a set of differentially expressed genes, or a set of differentially
                phosphorylated
                proteins with the goal of forming hypotheses about which upstream kinases might be responsible for the
                changes
                in the phenotype.
            </p>

            <h4>What does kinase co-expression networks visualization show?</h4>

            <p>The KEA3 application displays a scatter
                plot of
                points representing human kinases based on their co-expression similarity. This kinase coexpression
                network was
                constructed by conducting a <a
                        href="https://horvath.genetics.ucla.edu/html/CoexpressionNetwork/Rpackages/WGCNA/">Weighted Gene
                    Co-expression Network Analysis (WGCNA)</a> over human kinase expression data. WGCNs were constructed
                from <a
                        href="https://gtexportal.org/home/">GTEx</a> samples, <a href="https://portal.gdc.cancer.gov">TCGA</a>
                samples, and <a href="https://maayanlab.cloud/archs4/">ARCHS4</a> samples. The network layouts were
                determined
                using Allegro Fruchterman-Reingold Clustering in <a href="https://cytoscape.org">Cytoscape</a>. For the
                GTEx networks, WGCNA kinase module summary expression
                profiles,
                also known as Eigen-genes, were correlated with gene expression profiles from all GTEx tissue samples to determine strong module-tissue
                associations. Each GTEx WGCN module may be colored by its
                most highly
                correlated tissue. Tissues are aggregated into more general tissue types (e.g. brain) and more specific
                tissue
                types (e.g. cerebellum, frontal cortex):</p>
            <div class="table-responsive">
                <table class="table table-sm" id="gtextable">
                    <thead>
                    <tr>
                        <th scope="col">General Tissue</th>
                        <th scope="col">Specific Tissue</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>Adipose Tissue</td>
                        <td>Subcutaneous</td>
                    </tr>
                    <tr>
                        <td>Adrenal Gland</td>
                        <td>Adrenal Gland</td>
                    </tr>
                    <tr>
                        <td rowspan="2" style="vertical-align: middle;">Blood</td>
                        <td>Whole Blood</td>
                    </tr>
                    <tr>
                        <td>EBV-transformed lymphocytes</td>
                    </tr>
                    <tr>
                        <td>Blood Vessel</td>
                        <td>Artery - Tibial</td>
                    </tr>
                    <tr>
                        <td rowspan="3" style="vertical-align: middle;">Brain</td>
                        <td>Cerebellum</td>
                    </tr>
                    <tr>
                        <td>Frontal Cortex (BA9)</td>
                    </tr>
                    <tr>
                        <td>Spinal cord (cervical c-1)</td>
                    </tr>
                    <tr>
                        <td rowspan="2" style="vertical-align: middle;">Colon</td>
                        <td>Sigmoid</td>
                    </tr>
                    <tr>
                        <td>Transverse</td>
                    </tr>
                    <tr>
                        <td rowspan="2" style="vertical-align: middle;">Esophagus</td>
                        <td>Muscularis</td>
                    </tr>
                    <tr>
                        <td>Mucosa</td>
                    </tr>
                    <tr>
                        <td>Heart</td>
                        <td>Atrial Appendage</td>
                    </tr>
                    <tr>
                        <td>Liver</td>
                        <td>Liver</td>
                    </tr>
                    <tr>
                        <td>Muscle</td>
                        <td>Skeletal</td>
                    </tr>
                    <tr>
                        <td>Nerve</td>
                        <td>Tibial</td>
                    </tr>
                    <tr>
                        <td>Pancreas</td>
                        <td>Pancreas</td>
                    </tr>
                    <tr>
                        <td>Pituitary</td>
                        <td>Pituitary</td>
                    </tr>
                    <tr>
                        <td>Prostate</td>
                        <td>Prostate</td>
                    </tr>
                    <tr>
                        <td rowspan="2" style="vertical-align: middle;">Skin</td>
                        <td>Sun Exposed (Lower leg)</td>
                    </tr>
                    <tr>
                        <td>Transformed fibroblasts</td>
                    </tr>
                    <tr>
                        <td>Testis</td>
                        <td>Testis</td>
                    </tr>
                    <tr>
                        <td>Thyroid</td>
                        <td>Thyroid</td>
                    </tr>
                    <tr>
                        <td>Uterus</td>
                        <td>Uterus</td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <p>TCGA module Eigen-genes were correlated with tumor gene
                expression
                profiles to determine strong module-tumor type associations. Each TCGA WGCN module may be colored by its most highly
                correlated
                tumor type. Finally, the ARCHS4 module Eigen-genes were
                correlated with ARCHS4 tissue types. The ARCHS4 network modules may be colored by the most
                highly
                correlated tissue type.</p>
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

<script async src="https://www.googletagmanager.com/gtag/js?id=G-P74CNQT8DY"></script>
<script>
    window.dataLayer = window.dataLayer || [];

    function gtag() {
        dataLayer.push(arguments);
    }

    gtag('js', new Date());
    gtag('config', 'G-P74CNQT8DY');
    $('[data-toggle="popover"]').popover();
</script>