const general_tissue = [
    {
        "term": "Blood",
        "color": "#458B74"
    },
    {
        "term": "Blood Vessel",
        "color": "#8B4513"
    },
    {
        "term": "Brain",
        "color": "#8B008B"
    },
    {
        "term": "Colon",
        "color": "#B22222"
    },
    {
        "term": "Heart",
        "color": "#7FFF00"
    },
    {
        "term": "Lung",
        "color": "#FF1493"
    },
    {
        "term": "Muscle",
        "color": "#BF3EFF"
    },
    {
        "term": "Skin",
        "color": "#458B00"
    },
    {
        "term": "Testis",
        "color": "#00CED1"
    }];

const GO_enrichment = [
    {
        "term": "anatomical structure morphogenesis",
        "color": "#FF8247"
    },
    {
        "term": "animal organ morphogenesis",
        "color": "#00008B"
    },
    {
        "term": "blastoderm segmentation",
        "color": "#FFC0CB"
    },
    {
        "term": "central nervous system neuron developmen...",
        "color": "#FF0000"
    },
    {
        "term": "collagen fibril organization",
        "color": "#B22222"
    },
    {
        "term": "definitive hemopoiesis",
        "color": "#00FFFF"
    },
    {
        "term": "embryonic organ morphogenesis",
        "color": "#A020F0"
    },
    {
        "term": "epidermis development",
        "color": "#228B22"
    },
    {
        "term": "humoral immune response",
        "color": "#CD950C"
    },
    {
        "term": "immune response",
        "color": "#00CED1"
    },
    {
        "term": "lipid biosynthetic process",
        "color": "#8B4513"
    },
    {
        "term": "lymphocyte differentiation",
        "color": "#8B5A2B"
    },
    {
        "term": "negative regulation of small molecule me...",
        "color": "#7FFF00"
    },
    {
        "term": "negative regulation of transcription inv...",
        "color": "#8B0000"
    },
    {
        "term": "odontogenesis of dentin-containing tooth",
        "color": "#DDA0DD"
    },
    {
        "term": "oligodendrocyte differentiation",
        "color": "#FF1493"
    },
    {
        "term": "pancreas development",
        "color": "#CD3700"
    },
    {
        "term": "pituitary gland development",
        "color": "#BF3EFF"
    },
    {
        "term": "positive regulation of wound healing",
        "color": "#CD661D"
    },
    {
        "term": "prostate gland morphogenesis",
        "color": "#ADD8E6"
    },
    {
        "term": "regulation of cardioblast differentiatio...",
        "color": "#8B008B"
    },
    {
        "term": "regulation of neural retina development",
        "color": "#00EE76"
    },
    {
        "term": "regulation of ossification",
        "color": "#F08080"
    },
    {
        "term": "regulation of skeletal muscle tissue dev...",
        "color": "#7FFFD4"
    },
    {
        "term": "RNA 3'-end processing",
        "color": "#191970"
    },
    {
        "term": "single fertilization",
        "color": "#000000"
    },
    {
        "term": "skeletal system development",
        "color": "#FFA500"
    },
    {
        "term": "stem cell fate specification",
        "color": "#458B74"
    },
    {
        "term": "thyroid hormone generation",
        "color": "#2E8B57"
    },
    {
        "term": "transcription," +
            "DNA-templated",
        "color": "#FFFF00"
    }];

const specific_tissue = [
    {
        "term": "Cells - EBV-transformed lymphocytes",
        "color": "#458B74"
    },
    {
        "term": "Whole Blood",
        "color": "#00008B"
    },
    {
        "term": "Artery - Tibial",
        "color": "#8B4513"
    },
    {
        "term": "Brain - Cerebellum",
        "color": "#ADD8E6"
    },
    {
        "term": "Brain - Cortex",
        "color": "#FF1493"
    },
    {
        "term": "Brain - Spinal cord (cervical c-1)",
        "color": "#8B008B"
    },
    {
        "term": "Esophagus - Muscularis",
        "color": "#B22222"
    },
    {
        "term": "Heart - Atrial Appendage",
        "color": "#7FFF00"
    },
    {
        "term": "Lung",
        "color": "#00CED1"
    },
    {
        "term": "Muscle - Skeletal",
        "color": "#000000"
    },
    {
        "term": "Esophagus - Mucosa",
        "color": "#458B00"
    },
    {
        "term": "Skin - Sun Exposed (Lower leg)",
        "color": "#FFA500"
    },
    {
        "term": "Testis",
        "color": "#BF3EFF"
    }];

const tumor = [
    {
        "term": "COAD",
        "color": "#8B008B"
    },
    {
        "term": "KIRC",
        "color": "#BF3EFF"
    },
    {
        "term": "LAML",
        "color": "#7FFF00"
    },
    {
        "term": "LGG",
        "color": "#FF1493"
    },
    {
        "term": "LIHC",
        "color": "#00CED1"
    },
    {
        "term": "PCPG",
        "color": "#CD950C"
    },
    {
        "term": "READ",
        "color": "#8B4513"
    },
    {
        "term": "SARC",
        "color": "#458B74"
    },
    {
        "term": "TGCT",
        "color": "#B22222"
    },
    {
        "term": "THYM",
        "color": "#458B00"
    }];

const tissue = [
    {
        "term": "Adipose",
        "color": "#8B008B"
    },
    {
        "term": "Colon",
        "color": "#458B74"
    },
    {
        "term": "Hepatocyte",
        "color": "#8B4513"
    },
    {
        "term": "Kidney",
        "color": "#B22222"
    },
    {
        "term": "Macrophage",
        "color": "#CD950C"
    },
    {
        "term": "Motor Neuron",
        "color": "#FF1493"
    },
    {
        "term": "Pancreatic Islet",
        "color": "#7FFF00"
    },
    {
        "term": "Retina",
        "color": "#458B00"
    },
    {
        "term": "Skeletal Muscle",
        "color": "#00CED1"
    }];

const wgcna = [];