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

const featureItems=[...document.querySelectorAll(".feature-item")];
const featureCount=document.querySelector(".feature-count");
let featureIndex=0;
function showFeature(next){
  if(!featureItems.length)return;
  featureItems[featureIndex].classList.remove("is-active");
  featureIndex=(next+featureItems.length)%featureItems.length;
  featureItems[featureIndex].classList.add("is-active");
  if(featureCount)featureCount.textContent=String(featureIndex+1).padStart(2,"0")+" / 05";
}
document.querySelector(".feature-prev")?.addEventListener("click",()=>showFeature(featureIndex-1));
document.querySelector(".feature-next")?.addEventListener("click",()=>showFeature(featureIndex+1));
