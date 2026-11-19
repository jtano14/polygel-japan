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
const featureAccordion=document.querySelector(".feature-accordion");
function activateFeature(panel){
  featurePanels.forEach(item=>{
    const active=item===panel;
    item.classList.toggle("is-active",active);
    item.setAttribute("aria-pressed",String(active));
  });
}
featurePanels.forEach(panel=>{
  panel.addEventListener("click",()=>activateFeature(panel));
  panel.addEventListener("pointerenter",event=>{
    if(event.pointerType==="mouse"||event.pointerType==="pen")activateFeature(panel);
  });
  panel.addEventListener("focus",()=>activateFeature(panel));
});
featureAccordion?.addEventListener("pointerleave",event=>{
  if((event.pointerType==="mouse"||event.pointerType==="pen")&&featurePanels.length){
    activateFeature(featurePanels[0]);
  }
});

const aboutPanels=[...document.querySelectorAll(".about-panel")];
const aboutDetails=[...document.querySelectorAll(".about-detail")];
function activateAbout(panel){
  const key=panel.dataset.about;
  aboutPanels.forEach(item=>{
    const active=item===panel;
    item.classList.toggle("is-active",active);
    item.setAttribute("aria-pressed",String(active));
  });
  aboutDetails.forEach(item=>{
    const active=item.dataset.aboutDetail===key;
    item.classList.toggle("is-active",active);
    item.hidden=!active;
  });
}
aboutPanels.forEach(panel=>{
  panel.addEventListener("click",()=>activateAbout(panel));
  panel.addEventListener("pointerenter",event=>{
    if(event.pointerType==="mouse"||event.pointerType==="pen")activateAbout(panel);
  });
  panel.addEventListener("focus",()=>activateAbout(panel));
});
