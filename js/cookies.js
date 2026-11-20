"use strict";
/* Consent-first optional analytics. Set a valid G-XXXXXXXXXX ID at launch. */
(function(){
 const KEY="polygel-japan-cookie-consent-v1";
 const GA_ID=""; // Add the verified Google Analytics 4 measurement ID later.
 let choice=null;
 try{choice=localStorage.getItem(KEY)}catch(_){}
 const banner=document.createElement("aside");
 banner.className="cookie-banner";
 banner.setAttribute("aria-label","Cookie preferences");
 banner.innerHTML='<div class="cookie-banner-inner"><p>Polygel Japan uses optional analytics cookies to understand website traffic and improve our services. Analytics remains off unless you accept. Read our <a href="privacy.html">Privacy Policy</a>.</p><div class="cookie-actions"><button type="button" data-cookie-choice="reject">Reject</button><button type="button" data-cookie-choice="accept">Accept analytics</button></div></div>';
 banner.hidden=choice==="accept"||choice==="reject";
 document.body.appendChild(banner);
 let analyticsLoaded=false;
 function loadAnalytics(){
   if(analyticsLoaded||!/^G-[A-Z0-9]+$/.test(GA_ID))return;
   analyticsLoaded=true;
   window.dataLayer=window.dataLayer||[];
   window.gtag=function(){window.dataLayer.push(arguments)};
   window.gtag("js",new Date());
   window.gtag("config",GA_ID,{anonymize_ip:true});
   const script=document.createElement("script");
   script.async=true;
   script.src="https://www.googletagmanager.com/gtag/js?id="+encodeURIComponent(GA_ID);
   document.head.appendChild(script);
 }
 if(choice==="accept")loadAnalytics();
 function choose(value){
   choice=value;
   try{localStorage.setItem(KEY,value)}catch(_){}
   banner.hidden=true;
   if(value==="accept")loadAnalytics();
   else if(analyticsLoaded){window.location.reload()}
 }
 banner.querySelectorAll("[data-cookie-choice]").forEach(button=>button.addEventListener("click",()=>choose(button.dataset.cookieChoice)));
 document.querySelectorAll(".cookie-settings-trigger").forEach(button=>button.addEventListener("click",()=>{banner.hidden=false;banner.querySelector("button").focus()}));
})();