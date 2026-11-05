function render(){
 const all=SUBS(),q=new URLSearchParams(location.search),fill=q.get('fill');
 const groups=['Safety','Employee','Equipment'];
 let h=`<h1>Forms</h1><div class="sub">Tracker Forms · ${S.t==='all'?'All terminals':TERMS[S.t]}</div>`;
 if(fill){const f=FORMS.find(x=>x.id===fill);
  h+=`<section class="card" style="max-width:640px;margin-bottom:16px"><h2>${f.name}<a class="more" href="forms.html?v=47">Cancel</a></h2><form class="body" id="ff" style="display:grid;gap:10px">
  <label>Completed By<select name="Completed By">${EMP.filter(inT).map(e=>`<option>${e.name}</option>`).join('')}</select></label>
  ${f.fields.map(([n,t,o])=>`<label>${n}${t==='sel'?`<select name="${n}">${o.map(x=>`<option>${x}</option>`).join('')}</select>`:`<input name="${n}" type="${t==='date'?'date':'text'}" required>`}</label>`).join('')}
  <button class="btn primary" ${readOnly()?'disabled title="Read-only role"':''}>Submit</button></form></section>`;}
 h+=`<section class="card" style="margin-bottom:16px"><h2>Dispatch</h2><div class="body">${table(['Form',''],[['Waybill (standalone driver form)',`<a class="btn" id="wbform-link" href="forms-waybill.html?v=47">Fill Out</a>`],['Route Survey (Pre-Move Route Risk Assessment · links to a job or bid)',`<a class="btn" id="rsform-link" href="route-survey.html?v=47">Fill Out</a>`],['Permit Request (oversize / overweight · links to a job and a unit)',`<a class="btn" id="pmform-link" href="permit-request.html?v=47">Fill Out</a>`]])}</div></section>`;
 h+=`<div class="wgrid">${groups.map(g=>`<section class="card"><h2>${g}</h2><div class="body">${table(['Form',''],FORMS.filter(f=>f.group===g).map(f=>[f.name,`<a class="btn" href="forms.html?v=47&fill=${f.id}">Fill Out</a>`]))}</div></section>`).join('')}</div>`;
 $('#page').innerHTML=h;
 if(fill)$('#ff').onsubmit=e=>{e.preventDefault();const fdt=new FormData(e.target);const by=fdt.get("Completed By");const emp=EMP.find(x=>x.name===by);
  const summary=[...fdt.entries()].filter(([k])=>k!=="Completed By").map(([k,v])=>k+': '+v).join(' · ');
  const arr=JSON.parse(localStorage.rrSubs||'[]');arr.push({form:fill,date:TODAY,by,term:emp.term,summary});localStorage.rrSubs=JSON.stringify(arr);
  history.replaceState(null,'','forms.html?v=47');render();toast("Saved to the record.")};
}
