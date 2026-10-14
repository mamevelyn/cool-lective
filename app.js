
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const K={sites:"coollective_sites_v4",tasks:"coollective_tasks_v4"};
function esc(v=""){return String(v).replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]));}
function openSection(id){
  $$(".view").forEach(v=>v.classList.toggle("active",v.id===id));
  $$(".tab").forEach(t=>t.classList.toggle("active",t.dataset.section===id));
  const active=$(`.tab[data-section="${id}"]`); if(active) active.scrollIntoView({behavior:"smooth",block:"nearest",inline:"center"});
  if(id==="dashboard") renderDashboard();
}
$$(".tab").forEach(b=>b.addEventListener("click",()=>openSection(b.dataset.section)));
$$("[data-open]").forEach(b=>b.addEventListener("click",()=>openSection(b.dataset.open)));

function getSites(){try{return JSON.parse(localStorage.getItem(K.sites)||"[]")}catch{return[]}}
function setSites(v){localStorage.setItem(K.sites,JSON.stringify(v))}
function renderSites(){
  const s=getSites(),box=$("#siteList");
  box.innerHTML=s.length?s.slice(0,6).map((x,i)=>`<div class="record"><div class="record-head"><div><strong>${esc(x.name)}</strong><small>${esc(x.type)} · ${esc(x.status)}${x.users?` · observed use: ${esc(x.users)}`:""}</small></div><button data-del="${i}">Remove</button></div>${x.factor?`<small><b>Possible factor:</b> ${esc(x.factor)}</small>`:""}${x.action?`<small><b>Response to examine:</b> ${esc(x.action)}</small>`:""}${x.obs?`<small>${esc(x.obs)}</small>`:""}</div>`).join(""):'<div class="privacy-note">No saved observations yet.</div>';
  $$("[data-del]").forEach(b=>b.addEventListener("click",()=>{const a=getSites();a.splice(Number(b.dataset.del),1);setSites(a);renderSites();renderDashboard();}));
}
$("#addSite").addEventListener("click",()=>{
  const name=$("#siteName").value.trim(); if(!name){$("#siteName").focus();return}
  const s=getSites();s.unshift({id:String(Date.now()),name,type:$("#siteType").value,status:$("#siteStatus").value,users:$("#siteUsers").value?Number($("#siteUsers").value):null,time:$("#siteTime").value||"",factor:$("#siteFactor").value,action:$("#siteAction").value,obs:$("#siteObs").value.trim(),createdAt:new Date().toISOString()});
  setSites(s);["siteName","siteUsers","siteTime","siteObs"].forEach(id=>$("#"+id).value="");$("#siteFactor").value="";$("#siteAction").value="";renderSites();renderDashboard();
});renderSites();

$("#evaluateSpace").addEventListener("click",()=>{
  const name=$("#spaceName").value.trim()||"This space",time=$("#spaceTime").value,items=$$(".spaceCheck:checked").map(x=>x.value),out=$("#spaceResult");out.classList.remove("hidden");
  out.innerHTML=items.length?`<strong>${esc(name)}</strong>${time?` at ${esc(time)}`:""}: observed items include <strong>${items.map(esc).join(", ")}</strong>. Suspected causes marked “to verify” should remain hypotheses until repeated observation or appropriate measurement supports them.`:`<strong>${esc(name)}</strong>${time?` at ${esc(time)}`:""}: no protection gaps were selected in this quick check. Repeat observations at comparable times before drawing conclusions.`;
});

$("#loadPlanSample").addEventListener("click",()=>{$("#activity").value="Walking home";$("#duration").value="25";$("#planTime").value="15:30";$("#cooling").value="Shaded route";});
$("#makePlan").addEventListener("click",()=>{
  const activity=$("#activity").value,duration=Number($("#duration").value||0),time=$("#planTime").value,cooling=$("#cooling").value;const a=[];
  if(time&&time>="11:00"&&time<="16:00")a.push("Check the latest PAGASA iHeatMAP and whether a cooler time is practical.");
  if(duration>=25)a.push("Plan a rest or cooling opportunity before or during the activity.");
  if(cooling==="Shaded route")a.push("Use the validated shaded route when practical, remembering that shade can change by time.");
  if(cooling==="Water / refill point")a.push("Confirm the verified refill point before leaving.");
  if(cooling==="Rest / cooling space")a.push("Confirm the verified rest or cooling space before the activity.");
  if(cooling==="None confirmed yet")a.push("Verify a shade, water, or rest option before relying on the route.");
  a.push("Recheck conditions before starting. For school activities, responsible authorities still make the decision.");
  $("#planResult").innerHTML=`<h3>${esc(activity)}</h3><p><b>${duration||"—"} minutes${time?` · ${esc(time)}`:""}</b></p><ul>${a.map(x=>`<li>${esc(x)}</li>`).join("")}</ul>`;
});

const CARE={
  general:{title:"General extra care",body:["Choose a cooler time when possible and prioritize shade or a cooler indoor space.","Plan more frequent rest and cooling opportunities.","Keep water accessible and drink regularly unless a clinician has given a different fluid plan.","Use a buddy or check-in plan if the person may need help noticing heat symptoms."]},
  asthma:{title:"Breathing / asthma guidance",body:["Check heat conditions and, when available, air-quality information before strenuous outdoor activity.","Choose cooler, shaded conditions and take additional breaks if heat or air quality worsens symptoms.","Follow the person’s asthma action plan and keep prescribed quick-relief medicine accessible as directed.","Do not leave inhalers or medicines in very hot places such as a parked vehicle. Seek help for unusual or worsening breathing difficulty."]},
  heart:{title:"Heart / blood pressure / circulation guidance",body:["Heat can add strain to the heart and circulation, so favor cooler times and reduce strenuous activity when conditions are very hot.","Stay cool and follow the person’s usual hydration plan; if a clinician has prescribed fluid restriction, follow that plan instead.","Do not stop or change blood-pressure, heart, or diuretic medicines because of heat without clinician advice.","Plan an easy route to shade or a cooler place and seek medical help for concerning symptoms such as fainting, chest pain, severe weakness, or confusion."]},
  meds:{title:"Medicine-related heat sensitivity",body:["Some prescription and over-the-counter medicines can change sweating, thirst, blood pressure, fluid balance, or heat tolerance.","Do not stop or change medicine on your own. Ask a clinician or pharmacist whether a hot-day plan is needed.","Store medicines as directed and keep heat-sensitive items out of hot vehicles or direct sun.","Use more conservative timing, shade, rest, and cooling access when advised."]}
};
let currentCare="general";
function renderCare(){
  const c=CARE[currentCare];$("#extraGuide").innerHTML=`<span class="kicker green-text">EXTRA CARE GUIDANCE</span><h3>${esc(c.title)}</h3><ul>${c.body.map(x=>`<li>${esc(x)}</li>`).join("")}</ul><p class="privacy-note">This is general planning support, not a diagnosis or individualized medical prescription.</p>`;
  $$(".extra-option").forEach(b=>b.classList.toggle("active",b.dataset.care===currentCare));
}
$$(".extra-option").forEach(b=>b.addEventListener("click",()=>{currentCare=b.dataset.care;renderCare();}));renderCare();

function tasks(){try{return JSON.parse(localStorage.getItem(K.tasks)||"{}")}catch{return{}}}
function saveTasks(t){localStorage.setItem(K.tasks,JSON.stringify(t))}
function totalPoints(){const t=tasks();let n=0;if(t.lesson)n+=10;if(t.report)n+=15;if(t.tree)n+=20;if(t.validate)n+=20;return n}
function renderPoints(){const t=tasks();$("#pointsTotal").textContent=totalPoints();$("#lessonPointBadge").textContent=t.lesson?"✓ +10":"0/10";$$(".pointBtn").forEach(b=>{const done=!!t[b.dataset.id];b.disabled=done;b.classList.toggle("done",done);b.textContent=done?"✓":"+"+b.dataset.points;});}
$$(".pointBtn").forEach(b=>b.addEventListener("click",()=>{const t=tasks();t[b.dataset.id]=true;saveTasks(t);renderPoints();}));
$("#resetPoints").addEventListener("click",()=>{localStorage.removeItem(K.tasks);renderPoints();$("#quizResult").classList.add("hidden");$("#lessonForm").reset();});renderPoints();

$("#startLesson").addEventListener("click",()=>$("#lessonModal").classList.remove("hidden"));$("#closeLesson").addEventListener("click",()=>$("#lessonModal").classList.add("hidden"));$("#lessonModal").addEventListener("click",e=>{if(e.target===$("#lessonModal"))$("#lessonModal").classList.add("hidden")});
$("#lessonForm").addEventListener("submit",e=>{
  e.preventDefault();const fd=new FormData(e.currentTarget),ans=[fd.get("q1"),fd.get("q2"),fd.get("q3"),fd.get("q4"),fd.get("q5")],correct=["a","a","a","a","a"],score=ans.reduce((n,v,i)=>n+(v===correct[i]?1:0),0),box=$("#quizResult");box.classList.remove("hidden");
  if(score===5){const t=tasks(),already=!!t.lesson;t.lesson=true;saveTasks(t);renderPoints();box.innerHTML=already?`<strong>5/5 — Heat-smart!</strong> The +10 points were already earned on this device.`:`<strong>5/5 — Heat-smart! +10 COOL POINTS.</strong> You connected self-care, environmental conditions, and evidence-based community action.`}else{box.innerHTML=`<strong>${score}/5.</strong> Review the choices and try again. A perfect score earns the mini-lesson points.`}
});

function renderDashboard(){
  const s=getSites();$("#mObs").textContent=s.length;$("#mVal").textContent=s.filter(x=>["VALIDATED","ACTIONED","MONITORED"].includes(x.status)).length;$("#mAct").textContent=s.filter(x=>["ACTIONED","MONITORED"].includes(x.status)).length;$("#mMon").textContent=s.filter(x=>x.status==="MONITORED").length;
  $("#dashboardRows").innerHTML=s.map(x=>`<tr><td><strong>${esc(x.name)}</strong>${x.time?`<div class="privacy-note">${esc(x.time)}</div>`:""}</td><td>${esc(x.type)}</td><td>${esc(x.factor||"—")}</td><td>${esc(x.action||"—")}</td><td>${x.users??"—"}</td><td>${esc(x.status)}</td></tr>`).join("");$("#emptyDashboard").classList.toggle("hidden",s.length>0);
}renderDashboard();

$("#exportData").addEventListener("click",()=>{const blob=new Blob([JSON.stringify({project:"PROJECT COOL-LECTIVE",exportedAt:new Date().toISOString(),observations:getSites(),coolPoints:totalPoints()},null,2)],{type:"application/json"}),u=URL.createObjectURL(blob),a=document.createElement("a");a.href=u;a.download=`cool-lective-data-${new Date().toISOString().slice(0,10)}.json`;a.click();setTimeout(()=>URL.revokeObjectURL(u),1000);});

let deferredPrompt=null;const installBtn=$("#installBtn");window.addEventListener("beforeinstallprompt",e=>{e.preventDefault();deferredPrompt=e;installBtn.classList.remove("hidden")});installBtn.addEventListener("click",async()=>{if(!deferredPrompt)return;deferredPrompt.prompt();await deferredPrompt.userChoice;deferredPrompt=null;installBtn.classList.add("hidden")});
if("serviceWorker"in navigator&&location.protocol.startsWith("http"))window.addEventListener("load",()=>navigator.serviceWorker.register("./service-worker.js").catch(()=>{}));
