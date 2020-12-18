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
    <div class="row  justify-content-center">
        <div class="col-7 libraries__content">
            <h3>Download libraries</h3>
            <p>
                "Primary" libraries are used by KEA3 to conduct kinase enrichment analysis. "Benchmarking" libraries
                were
                used
                to benchmark KEA3. "Additional" libraries are available as an additional resource to the community.
                "Primary"
                and "Additional" libraries were generated to only include kinases with four or more interactions, and
                all
                gene
                symbols are HGNC-approved.
            </p>
            <div class="table-responsive">
                <table class="table">
                    <thead>
                    <tr>
                        <th scope="col" style="vertical-align: top">Library type <br/><span style="font-weight: 300">and name</span>
                        </th>
                        <th scope="col" style="vertical-align: top">Unique Kinases</th>
                        <th scope="col" style="vertical-align: top">Unique Substrates</th>
                        <th scope="col" style="vertical-align: top">Mean Set Size</th>
                        <th scope="col" style="vertical-align: top">Download</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td style="font-weight: 500">Primary</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td><a href="https://downloads.thebiogrid.org/" target="_blank">BioGRID</a>
                        </td>
                        <td>240</td>
                        <td>2,251</td>
                        <td>24</td>
                        <td><a download="" href="/static/tflibs/BioGRID.gmt">
                            <i class="fas fa-file-download" aria-hidden="true"></i>
                        </a></td>
                    </tr>
                    <tr>
                        <td><a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4116514/#SD5" target="_blank">Cheng.KSIN</a>
                        </td>
                        <td>227</td>
                        <td>2,154</td>
                        <td>31</td>
                        <td><a download="" href="/static/tflibs/Cheng.KSIN.gmt">
                            <i class="fas fa-file-download" aria-hidden="true"></i>
                        </a></td>
                    </tr>
                    <tr>
                        <td><a href="http://cbdm-01.zdv.uni-mainz.de/~mschaefer/hippie/" target="_blank">HIPPIE</a>
                        </td>
                        <td>474</td>
                        <td>8,798</td>
                        <td>97</td>
                        <td><a download="" href="/static/tflibs/HIPPIE.gmt">
                            <i class="fas fa-file-download" aria-hidden="true"></i>
                        </a></td>
                    </tr>
                    <tr>
                        <td><a href="http://mentha.uniroma2.it/index.php" target="_blank">Mentha</a></td>
                        <td>474</td>
                        <td>8,639</td>
                        <td>72</td>
                        <td><a download="" href="/static/tflibs/mentha.gmt">
                            <i class="fas fa-file-download" aria-hidden="true"></i>
                        </a></td>
                    </tr>
                    <tr>
                        <td><a href="https://mint.bio.uniroma2.it/" target="_blank">MINT</a></td>
                        <td>156</td>
                        <td>1,383</td>
                        <td>72</td>
                        <td><a download="" href="/static/tflibs/MINT.gmt">
                            <i class="fas fa-file-download" aria-hidden="true"></i>
                        </a></td>
                    </tr>
                    <tr>
                        <td><a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4116514/#SD5" target="_blank">Cheng.PPI</a>
                        </td>
                        <td>376</td>
                        <td>4,678</td>
                        <td>40</td>
                        <td><a download="" href="/static/tflibs/Cheng.PPI.gmt">
                            <i class="fas fa-file-download" aria-hidden="true"></i>
                        </a></td>
                    </tr>
                    <tr>
                        <td><a href="http://prot-shiny-vm.broadinstitute.org:3838/ptmsigdb-app/" target="_blank">PTMsigDB</a>
                        </td>
                        <td>163</td>
                        <td>2,262</td>
                        <td>32</td>
                        <td><a download="" href="/static/tflibs/PTMsigDB.gmt">
                            <i class="fas fa-file-download" aria-hidden="true"></i>
                        </a></td>
                    </tr>
                    <tr>
                        <td>
                            <a href="https://string-db.org/cgi/input.pl?sessionId=cOMzocvk3ztX&amp;input_page_show_search=on"
                               target="_blank">STRING</a></td>
                        <td>514</td>
                        <td>18,213</td>
                        <td>1,235</td>
                        <td><a download="" href="/static/tflibs/STRING.gmt">
                            <i class="fas fa-file-download" aria-hidden="true"></i>
                        </a></td>
                    </tr>
                    <tr>
                        <td>
                            <a href="https://string-db.org/cgi/input.pl?sessionId=cOMzocvk3ztX&amp;input_page_show_search=on"
                               target="_blank">STRING.bind</a></td>
                        <td>432</td>
                        <td>5,254</td>
                        <td>72</td>
                        <td><a download="" href="/static/tflibs/STRING.bind.gmt">
                            <i class="fas fa-file-download" aria-hidden="true"></i>
                        </a></td>
                    </tr>
                    <tr>
                        <td><a href="https://omictools.com/phosd-tool" target="_blank">PhosD.All</a></td>
                        <td>339</td>
                        <td>6,544</td>
                        <td>368</td>
                        <td><a download="" href="/static/tflibs/PhosD.All.gmt">
                            <i class="fas fa-file-download" aria-hidden="true"></i>
                        </a></td>
                    </tr>
                    <tr>
                        <td><a href="http://honig.c2b2.columbia.edu/preppi" target="_blank">PrePPI</a></td>
                        <td>519</td>
                        <td>14,382</td>
                        <td>658</td>
                        <td><a download="" href="/static/tflibs/prePPI.gmt">
                            <i class="fas fa-file-download" aria-hidden="true"></i>
                        </a></td>
                    </tr>

                    <!-- Benchmarking Libraries -->
                    <tr>
                        <td style="font-weight: 500">Benchmarking</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td><a href="http://prot-shiny-vm.broadinstitute.org:3838/ptmsigdb-app/" target="_blank">PTMsigDB.drug</a>
                        </td>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                        <td><a download="" href="/static/tflibs/PTMsigDB_drugtarget_signatures.gmt">
                            <i class="fas fa-file-download" aria-hidden="true"></i>
                        </a></td>
                    </tr>
                    <tr>
                        <td><a href="https://maayanlab.cloud/CREEDS/" target="_blank">KinCREEDSupdn</a>
                        </td>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                        <td><a download="" href="/static/tflibs/single_kinase_perts_from_GEO_updn.gmt">
                            <i class="fas fa-file-download" aria-hidden="true"></i>
                        </a></td>
                    </tr>
                    <tr>
                        <td><a href="https://maayanlab.cloud/l1000fwd/" target="_blank">DrugL1000updn</a>
                        </td>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                        <td><a download="" href="/static/tflibs/L1000FWD_kin_targets_updn.gmt">
                            <i class="fas fa-file-download" aria-hidden="true"></i>
                        </a></td>
                    </tr>
                    <!-- Additional Libraries -->
                    <tr>
                        <td style="font-weight: 500">Additional</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td><a href="http://mizuguchilab.org/PSOPIA/theory.html" target="_blank">PSOPIA</a>
                        </td>
                        <td>44</td>
                        <td>493</td>
                        <td>14</td>
                        <td><a download="" href="/static/tflibs/PSOPIA.gmt">
                            <i class="fas fa-file-download" aria-hidden="true"></i>
                        </a></td>
                    </tr>
                    <tr>
                        <td><a href="https://www.phosphosite.org/homeAction.action" target="_blank">PhosphoSitePlus</a>
                        </td>
                        <td>165</td>
                        <td>2,269</td>
                        <td>32</td>
                        <td><a download="" href="/static/tflibs/PhosphoSitePlus.gmt">
                            <i class="fas fa-file-download" aria-hidden="true"></i>
                        </a></td>
                    </tr>
                    <tr>
                        <td><a href="https://phosphonetworks.org/" target="_blank">PhosphoNetworks.rawKSI</a>
                        </td>
                        <td>285</td>
                        <td>1,914</td>
                        <td>83</td>
                        <td><a download="" href="/static/tflibs/PhosphoNetworks.rawKSI.gmt">
                            <i class="fas fa-file-download" aria-hidden="true"></i>
                        </a></td>
                    </tr>
                    <tr>
                        <td><a href="https://phosphonetworks.org/" target="_blank">PhosphoNetworks.comKSI</a>
                        </td>
                        <td>181</td>
                        <td>1,115</td>
                        <td>23</td>
                        <td><a download="" href="/static/tflibs/PhosphoNetworks.comKSI.gmt">
                            <i class="fas fa-file-download" aria-hidden="true"></i>
                        </a></td>
                    </tr>
                    <tr>
                        <td><a href="https://phosphonetworks.org/" target="_blank">PhosphoNetworks.refKSI</a>
                        </td>
                        <td>164</td>
                        <td>717</td>
                        <td>21</td>
                        <td><a download="" href="/static/tflibs/PhosphoNetworks.refKSI.gmt">
                            <i class="fas fa-file-download" aria-hidden="true"></i>
                        </a></td>
                    </tr>
                    <tr>
                        <td><a href="https://omictools.com/phosd-tool" target="_blank">PhosD.ELM</a></td>
                        <td>161</td>
                        <td>3,799</td>
                        <td>127</td>
                        <td><a download="" href="/static/tflibs/PhosD.ELM.gmt">
                            <i class="fas fa-file-download" aria-hidden="true"></i>
                        </a></td>
                    </tr>
                    <tr>
                        <td><a href="https://omictools.com/phosd-tool" target="_blank">PhosD.PSP</a></td>
                        <td>212</td>
                        <td>5,565</td>
                        <td>246</td>
                        <td><a download="" href="/static/tflibs/PhosD.ELM.gmt">
                            <i class="fas fa-file-download" aria-hidden="true"></i>
                        </a></td>
                    </tr>
                    <tr>
                        <td><a href="https://maayanlab.cloud/archs4/" target="_blank">ARCHS4.coexp</a>
                        </td>
                        <td>515</td>
                        <td>16,711</td>
                        <td>300</td>
                        <td><a download="" href="/static/tflibs/ARCHS4.coexp.gmt">
                            <i class="fas fa-file-download" aria-hidden="true"></i>
                        </a></td>
                    </tr>
                    <tr>
                        <td><a href="https://www.gtexportal.org/home/" target="_blank">GTEx.coexp</a></td>
                        <td>515</td>
                        <td>17,769</td>
                        <td>300</td>
                        <td><a download="" href="/static/tflibs/GTEx.coexp.gmt">
                            <i class="fas fa-file-download" aria-hidden="true"></i>
                        </a></td>
                    </tr>
                    <tr>
                        <td><a href="http://www.compbio.dundee.ac.uk/www-pips/" target="_blank">PIPs</a>
                        </td>
                        <td>266</td>
                        <td>2,068</td>
                        <td>50</td>
                        <td><a download="" href="/static/tflibs/PIPs.gmt">
                            <i class="fas fa-file-download" aria-hidden="true"></i>
                        </a></td>
                    </tr>
                    <tr>
                        <td><a href="https://reactome.org/" target="_blank">REACTOME</a></td>
                        <td>178</td>
                        <td>1,209</td>
                        <td>22</td>
                        <td><a download="" href="/static/tflibs/REACTOME.gmt">
                            <i class="fas fa-file-download" aria-hidden="true"></i>
                        </a></td>
                    </tr>
                    <tr>
                        <td><a href="http://phospho.elm.eu.org/" target="_blank">Phospho.ELM</a>
                        </td>
                        <td>39</td>
                        <td>418</td>
                        <td>16</td>
                        <td><a download="" href="/static/tflibs/Phospho.ELM.gmt">
                            <i class="fas fa-file-download" aria-hidden="true"></i>
                        </a></td>
                    </tr>
                    <tr>
                        <td><a href="http://hu.proteincomplexes.org/download" target="_blank">Hu.MAP</a>
                        </td>
                        <td>33</td>
                        <td>294</td>
                        <td>12</td>
                        <td><a download="" href="/static/tflibs/hu.MAP.gmt">
                            <i class="fas fa-file-download" aria-hidden="true"></i>
                        </a></td>
                    </tr>
                    </tbody>
                </table>
            </div>
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