function render(){
 const all=SUBS(),q=new URLSearchParams(location.search),fill=q.get('fill');
 const groups=['Safety','Employee','Equipment'];
 let h=`<h1>Forms</h1><div class="sub">Tracker Forms · ${S.t==='all'?'All terminals':TERMS[S.t]}</div>`;
 if(fill){const f=FORMS.find(x=>x.id===fill);
  h+=`<section class="card" style="max-width:640px;margin-bottom:16px"><h2>${f.name}<a class="more" href="forms.html?v=41">Cancel</a></h2><form class="body" id="ff" style="display:grid;gap:10px">
  <label>Submitted by<select name="Submitted by">${EMP.filter(inT).map(e=>`<option>${e.name}</option>`).join('')}</select></label>
  ${f.fields.map(([n,t,o])=>`<label>${n}${t==='sel'?`<select name="${n}">${o.map(x=>`<option>${x}</option>`).join('')}</select>`:`<input name="${n}" type="${t==='date'?'date':'text'}" required>`}</label>`).join('')}
  <button class="btn primary" ${readOnly()?'disabled title="Read-only role"':''}>Submit</button></form></section>`;}
 h+=`<section class="card" style="margin-bottom:16px"><h2>Dispatch</h2><div class="body">${table(['Form',''],[['Waybill (standalone driver form)',`<a class="btn" id="wbform-link" href="forms-waybill.html?v=41">Fill out</a>`],['Route Survey (Pre-Move Route Risk Assessment · links to a job or bid)',`<a class="btn" id="rsform-link" href="route-survey.html?v=41">Fill out</a>`],['Permit Request (oversize / overweight · links to a job and a unit)',`<a class="btn" id="pmform-link" href="permit-request.html?v=41">Fill out</a>`]])}</div></section>`;
 h+=`<div class="wgrid">${groups.map(g=>`<section class="card"><h2>${g}</h2><div class="body">${table(['Form',''],FORMS.filter(f=>f.group===g).map(f=>[f.name,`<a class="btn" href="forms.html?v=41&fill=${f.id}">Fill out</a>`]))}</div></section>`).join('')}</div>`;
 $('#page').innerHTML=h;
 if(fill)$('#ff').onsubmit=e=>{e.preventDefault();const fdt=new FormData(e.target);const by=fdt.get('Submitted by');const emp=EMP.find(x=>x.name===by);
  const summary=[...fdt.entries()].filter(([k])=>k!=='Submitted by').map(([k,v])=>k+': '+v).join(' · ');
  const arr=JSON.parse(localStorage.rrSubs||'[]');arr.push({form:fill,date:TODAY,by,term:emp.term,summary});localStorage.rrSubs=JSON.stringify(arr);
  history.replaceState(null,'','forms.html?v=41');render();toast('Submitted.')};
}
