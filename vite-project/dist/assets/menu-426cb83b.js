import"./modulepreload-polyfill-ec808ebb.js";import{A as c}from"./fetch_API_Weather-639828d2.js";import"./select_quiz-d1ec6f8a.js";const u=document.querySelector(".body-API"),s=document.querySelector(".city-information h2 "),m=document.querySelector(".information-temperature h3"),f=document.querySelector(".information-pressure h3"),y=document.querySelector(".information-weather h3"),S=document.querySelector(".icon-weather i"),g=localStorage.getItem("city");let h=localStorage.getItem("problemWithCodeOrServer");const p=()=>{if(h==="true")u.style.display="none";else{const o=e=>{const t={cloudSun:e.id>=801,sun:e.id>=800,barsStaggered:e.id>=701&&e.id<=781,snowFlake:e.id>=600&&e.id<=622,cloudSunRain:e.id>=500&&e.id<=531,cloudShowersHeavy:e.id>=300&&e.id<=321,cloudBolt:e.id>=200&&e.id<=232},n=a=>{S.className=a};if(t.cloudSun)return n("fa-solid fa-cloud-sun fa-8x");if(t.sun)return n("fa-solid fa-sun fa-8x");if(t.barsStaggered)return n("fa-solid fa-bars-staggered fa-8x");if(t.snowFlake)return n("fa-solid fa-snowflake fa-8x");if(t.cloudSunRain)return n("fa-solid fa-cloud-sun-rain fa-8x");if(t.cloudShowersHeavy)return n("fa-solid fa-cloud-showers-heavy fa-8x");if(t.cloudBolt)return n("fa-solid fa-cloud-bolt fa-8x")};(()=>{const e=c.API_LINK+g+c.API_KEY+c.API_UNITS;axios.get(e).then(t=>{const n=Object.assign({},...t.data.weather),a=Math.floor(t.data.main.temp),d=Math.floor(t.data.main.pressure);s.textContent=localStorage.getItem("city"),y.textContent=`${n.main}`,m.textContent=`${a} °C`,f.textContent=`${d} bar`,o(n)})})()}};p();const w=document.querySelector(".current-day-name"),x=document.querySelector(".current-day"),I=document.querySelector(".clock"),k=()=>{let o=new Date,r=o.toLocaleString("en",{weekday:"long"}),e=String(o.getDate()).padStart(2,"0"),t=String(o.getMonth()+1).padStart(2,"0"),n=o.getFullYear();w.textContent=r,x.textContent=e+"/"+t+"/"+n},i=()=>{const o=new Date;let r=o.getHours(),e=o.getMinutes(),t=o.getSeconds();e=l(e),t=l(t),I.innerHTML=r+":"+e+":"+t,setTimeout(i,1e3)};function l(o){return o<10&&(o="0"+o),o}i();k();const C=document.querySelector(".container-welcome-text h1"),b=()=>{C.textContent=localStorage.getItem("nickName")};b();