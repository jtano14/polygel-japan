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

/* Flowing menu hover highlight and click-to-expand descriptions */
const flowRows=[...document.querySelectorAll(".flow-row")];
const flowDetails=[...document.querySelectorAll(".flow-detail")];
flowRows.forEach((row,index)=>{
  const button=row.querySelector(".flow-trigger");
  row.addEventListener("pointerenter",event=>{if(event.pointerType!=="touch")row.classList.add("is-active")});
  row.addEventListener("pointerleave",()=>{if(button.getAttribute("aria-expanded")!=="true")row.classList.remove("is-active")});
  button.addEventListener("focus",()=>row.classList.add("is-active"));
  button.addEventListener("blur",()=>{if(button.getAttribute("aria-expanded")!=="true")row.classList.remove("is-active")});
  button.addEventListener("click",()=>{
    const open=button.getAttribute("aria-expanded")!=="true";
    flowRows.forEach((item,i)=>{
      const selected=open&&index===i;
      item.classList.toggle("is-active",selected);
      item.querySelector(".flow-trigger").setAttribute("aria-expanded",String(selected));
      flowDetails[i].hidden=!selected;
    });
  });
});

/* Reusable back-to-top button for every page */
document.querySelectorAll(".quick-top").forEach(button=>{
  button.addEventListener("click",()=>{
    window.scrollTo({top:0,behavior:window.matchMedia("(prefers-reduced-motion: reduce)").matches?"instant":"smooth"});
  });
});

/* Office selector: functions are confirmed; precise addresses remain pending. */
const officeCards=[...document.querySelectorAll(".office-card")];
const officeDetails=[
  {name:"Japan",type:"TRADE & SALES"},
  {name:"India",type:"HEADQUARTERS · MANUFACTURING · TRADE & SALES"},
  {name:"Brunei",type:"MANUFACTURING HUB"},
  {name:"Singapore",type:"TRADE & SALES"},
  {name:"Florida, USA",type:"SALES OFFICE"},
  {name:"Germany",type:"SALES OFFICE"}
];
officeCards.forEach((card,index)=>{
  card.addEventListener("click",()=>{
    officeCards.forEach((item,i)=>{
      item.classList.toggle("is-selected",i===index);
      item.setAttribute("aria-pressed",String(i===index));
    });
    const office=officeDetails[index];
    if(!office)return;
    const name=document.querySelector("#office-name");
    const type=document.querySelector("#office-type");
    const address=document.querySelector("#office-address");
    if(name)name.textContent=office.name;
    if(type)type.textContent=office.type;
    if(address)address.textContent="Full office address pending confirmation.";
  });
});


/* Prefill contact inquiries from application, product and document links. */
const documentContactForm=document.querySelector("#contact-form");
if(documentContactForm){
  const params=new URLSearchParams(window.location.search);
  const topic=documentContactForm.querySelector('[name="topic"]');
  const message=documentContactForm.querySelector('[name="message"]');
  const source=documentContactForm.querySelector('[name="inquiry_source"]');
  const validTopics=["General Inquiry","Product Inquiry","Application Inquiry","Business Partnership"];
  const requestedTopic=params.get("inquiry");
  const requestedSource=params.get("source");
  if(requestedTopic&&validTopics.includes(requestedTopic)&&topic)topic.value=requestedTopic;
  if(requestedSource&&source)source.value=requestedSource.slice(0,160);
  if(requestedSource&&message)message.value="Regarding: "+requestedSource.slice(0,160)+"\n\n";
  try{
    const requests=JSON.parse(sessionStorage.getItem("polygel-japan-document-requests")||"[]");
    if(Array.isArray(requests)&&requests.length&&message){
      const lines=requests.filter(item=>item&&typeof item.family==="string"&&typeof item.document==="string").map(item=>"- "+item.family+": "+item.document);
      if(lines.length){
        message.value="Technical document request:\n"+lines.join("\n")+"\n\nAdditional information:\n";
        if(topic)topic.value="Product Inquiry";
        if(source)source.value="Technical document request";
      }
    }
  }catch(_){}
}
