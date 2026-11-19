"use strict";
const menuButton=document.querySelector(".menu-toggle");
const navigation=document.querySelector("#site-nav");
if(menuButton&&navigation){
  menuButton.addEventListener("click",()=>{
    const open=menuButton.getAttribute("aria-expanded")==="true";
    menuButton.setAttribute("aria-expanded",String(!open));
    navigation.classList.toggle("is-open",!open);
  });
  navigation.querySelectorAll("a").forEach(link=>link.addEventListener("click",()=>{
    navigation.classList.remove("is-open");
    menuButton.setAttribute("aria-expanded","false");
  }));
}
const year=document.querySelector("#year");
if(year)year.textContent=String(new Date().getFullYear());

const featurePanels=[...document.querySelectorAll(".feature-panel")];
featurePanels.forEach(panel=>panel.addEventListener("click",()=>{
  featurePanels.forEach(item=>{
    const active=item===panel;
    item.classList.toggle("is-active",active);
    item.setAttribute("aria-pressed",String(active));
  });
}));
