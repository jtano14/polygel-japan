"use strict";
(()=>{const groups=[
{title:"Semiconductors",description:"Materials identified by Polygel Global for electronic, optoelectronic and advanced-material precursor chemistry.",items:[
["Tantalum Pentachloride (TaCl₅)","Reactive tantalum precursor and Lewis acid catalyst for tantalum derivatives, coatings, thin films, advanced ceramics and electronic materials.","tantalum-pentachloride.html"],
["Selenium (Se)","Specialty material with applications in electronics, glass, metallurgy and advanced materials; suitability depends on form and purity.","selenium.html"],
["Indium Chloride (Anhydrous)","Reactive indium source and Lewis acid catalyst for semiconductor and optoelectronic precursor chemistry and functional materials.","indium-chloride.html"]]},
{title:"Catalysts",description:"Catalyst precursors and reactive metal sources used in specialty synthesis and electrochemical systems.",items:[
["Molybdenum Pentachloride (MoCl₅)","Lewis acid and molybdenum precursor for specialty catalysis, organometallic synthesis and advanced inorganic chemistry.","molybdenum-pentachloride.html"],
["Vanadyl Sulphate N-hydrate","Water-soluble vanadium(IV) source used in catalyst systems, redox flow batteries and specialty chemical synthesis.","vanadium.html"]]},
{title:"EV Batteries",description:"Vanadium chemistry used in electrochemical and advanced-material processes.",items:[
["Vanadyl Oxalate Solution","Liquid vanadium(IV) source used in catalyst preparation, vanadium oxide precursors and controlled metal incorporation.","vanadium.html"]]},
{title:"Coatings",description:"Specialty compounds relevant to coating precursors, oxidation catalysis and functional materials.",items:[
["Molybdenum Pentachloride (MoCl₅)","Reactive molybdenum source for specialty synthesis and catalyst development.","molybdenum-pentachloride.html"],
["Vanadium Acetylacetonate","Vanadium coordination compounds used in oxidation catalysis, thin-film deposition and functional oxide materials.","vanadium.html"],
["Selenium (Se)","Specialty material used across glass, chemicals, electronics and advanced materials, depending on form and purity.","selenium.html"]]}];
const title=document.querySelector("#app-group-title"),desc=document.querySelector("#app-group-description"),out=document.querySelector("#app-products"),buttons=[...document.querySelectorAll("[data-group]")];
function render(i){const group=groups[i];title.textContent=group.title;desc.textContent=group.description;out.replaceChildren();group.items.forEach((item,n)=>{const article=document.createElement("article");article.className="app-product";const small=document.createElement("small");small.textContent="PRODUCT "+String(n+1).padStart(2,"0");const h=document.createElement("h3");h.textContent=item[0];const p=document.createElement("p");p.textContent=item[1];const a=document.createElement("a");a.href=item[2];a.textContent="View product information ↗";article.append(small,h,p,a);out.append(article)});buttons.forEach((b,n)=>{b.classList.toggle("is-active",n===i);b.setAttribute("aria-pressed",String(n===i))})}
buttons.forEach((b,i)=>b.addEventListener("click",()=>render(i)));render(0)})();