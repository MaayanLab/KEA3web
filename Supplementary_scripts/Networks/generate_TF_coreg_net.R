#KEA3 co-regulatory network
#gmts to dataframes
rm(list = ls())
library(foreach)
library(doMC)
registerDoMC(4) 

lib_dir = "/users/alexandrakeenan/eclipse-workspace/KEA3web/WebContent/WEB-INF/tflibs/"
lib_files = list.files(lib_dir)
KEA3libs = lapply(paste0(lib_dir,lib_files),genesetr::loadGMT)
names(KEA3libs) = unlist(lapply(strsplit(lib_files,"_"),"[[",2))

libs_dfs = lapply(KEA3libs,genesetr::toLongDF)
libs_dfs = plyr::adply(setdiff(names(KEA3libs),"Perturbations"),1,
  function(name){
  lib = KEA3libs[[name]]
  lib_df = genesetr::toLongDF(lib)
  lib_df$TF = unlist(sapply(strsplit(lib_df$set_name,"_"),head,1))
  lib_df = lib_df[lib_df$TF != lib_df$gene,]
  edges = as.data.frame(table(lib_df[,c("TF","gene")]), stringsAsFactors = F)
  edges = edges[edges$Freq>0,]
  total_tf_sets = as.data.frame(table(lib_df[!duplicated(lib_df$set_name),"TF"]),
    stringsAsFactors = F)
  colnames(total_tf_sets) = c("TF","total_tf_sets")
  edges = merge(edges,total_tf_sets,by = "TF",all.x = T)
  edges$lib = name
  return(edges)
  
})



libs_dfs$temp = paste(libs_dfs$TF,libs_dfs$gene)

all_edges = as.data.frame(t(combn(unique(as.character(libs_dfs$TF)),2)))
all_edges$KINA = as.character(all_edges[,1])
all_edges$KINB = as.character(all_edges[,2])

all_edges[,c(1,2)] = NULL

#subset all edges
all_edges$temp = paste(all_edges$KINA,all_edges$KINB)
all_edges$temp2 = paste(all_edges$KINB,all_edges$KINA)

all_edges = all_edges[all_edges$temp %in% libs_dfs$temp | all_edges$temp2 %in% libs_dfs$temp,]
all_edges$temp = NULL
all_edges$temp2 = NULL

all_edges$edge_type = ""
all_edges$edge_score = ""
all_edges$ppi_evidence = "none"
all_edges$ABkinsub = "none"
all_edges$BAkinsub = "none"

undir = c("biogrid","string", "mentha", "mint", "cheng", "hippie")
dir = c("ptmsigdb", "phosphonetworks-comKSI")
ppi = c("biogrid","string", "mentha", "mint", "cheng", "hippie")
kinsub = c("ptmsigdb", "phosphonetworks-comKSI")

annot_edges = data.frame()
#A>B edges
for(i in 1:nrow(all_edges)){
  
  AB_edges = libs_dfs[libs_dfs$TF == all_edges$KINA[i] & libs_dfs$gene == all_edges$KINB[i],]
  BA_edges = libs_dfs[libs_dfs$gene == all_edges$KINA[i] & libs_dfs$TF == all_edges$KINB[i],]
  edges = all_edges[i,]
  #determine edge direction
  if(any(AB_edges$lib %in% dir) && any(BA_edges$lib %in% dir)){
    edges$edge_type = "bidir"
    
  }else if(any(AB_edges$lib %in% dir)){
    edges$edge_type = "AB"
  }else if(any(BA_edges$lib %in% dir)){
    edges$edge_type = "BA"
  }else{
    edges$edge_type = "undir"
  }
  
  #determine edge score
  edges$edge_score = sum(unique(c(BA_edges$lib,AB_edges$lib)) %in% c(dir,undir))
  
  #set evidence
  if(any(AB_edges$lib %in% kinsub)){
    edges$ABkinsub = paste(unique(AB_edges$lib[AB_edges$lib %in% kinsub]),collapse = ",")
  }
  
  if(any(BA_edges$lib %in% kinsub)){
    edges$BAkinsub = paste(unique(BA_edges$lib[BA_edges$lib %in% kinsub]),collapse = ",")
  }
  
  if(any(AB_edges$lib %in% ppi) || any(BA_edges$lib %in% ppi)){
    edges$ppi_evidence = paste(unique(c(BA_edges$lib[BA_edges$lib %in% ppi],
      AB_edges$lib[AB_edges$lib %in% ppi])),collapse = ",")
  }
  annot_edges = rbind(annot_edges,edges)
}

jsonlite::write_json(annot_edges,'/users/alexandrakeenan/eclipse-workspace/KEA3web/WebContent/assets/chea-query/KEA3_coreg_network.json')
edges_sub = annot_edges[annot_edges$edge_score>1,]
jsonlite::write_json(edges_sub,"/users/alexandrakeenan/eclipse-workspace/KEA3web/WebContent/assets/chea-query/KEA3_coreg_sub_network.json")
