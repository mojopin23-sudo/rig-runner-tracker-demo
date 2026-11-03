function render(){
 const all=SUBS(),q=new URLSearchParams(location.search),fill=q.get('fill');
 const groups=['Safety','Employee','Equipment'];
 let h=`<h1>Forms</h1><div class="sub">Tracker Forms · ${S.t==='all'?'All terminals':TERMS[S.t]}</div>`;
 if(fill){const f=FORMS.find(x=>x.id===fill);
  h+=`<section class="card" style="max-width:640px;margin-bottom:16px"><h2>${f.name}<a class="more" href="forms.html?v=28">Cancel</a></h2><form class="body" id="ff" style="display:grid;gap:10px">
  <label>Submitted by<select name="Submitted by">${EMP.filter(inT).map(e=>`<option>${e.name}</option>`).join('')}</select></label>
  ${f.fields.map(([n,t,o])=>`<label>${n}${t==='sel'?`<select name="${n}">${o.map(x=>`<option>${x}</option>`).join('')}</select>`:`<input name="${n}" type="${t==='date'?'date':'text'}" required>`}</label>`).join('')}
  <button class="btn primary" ${readOnly()?'disabled title="Read-only role"':''}>Submit</button></form></section>`;}
 h+=`<section class="card" style="margin-bottom:16px"><h2>Dispatch</h2><div class="body">${table(['Form','Submissions',''],[['Waybill (standalone driver form)',JSON.parse(localStorage.wbSaved||'[]').filter(w=>!w.job).length,`<a class="btn" id="wbform-link" href="forms-waybill.html?v=28">Fill out</a>`]])}</div></section>`;
 h+=`<div class="wgrid">${groups.map(g=>`<section class="card"><h2>${g}</h2><div class="body">${table(['Form','Submissions',''],FORMS.filter(f=>f.group===g).map(f=>[f.name,all.filter(s=>s.form===f.id&&inT(s)).length,`<a class="btn" href="forms.html?v=28&fill=${f.id}">Fill out</a>`]))}</div></section>`).join('')}</div>`;
 h+=`<section class="card" style="margin-top:16px" id="subs"><h2>Submissions</h2><div class="filters"><label>Form<select id="sf"><option value="">All forms</option>${FORMS.map(f=>`<option value="${f.id}">${f.name}</option>`).join('')}</select></label>
 <label>From<input type="date" id="sd1"></label><label>To<input type="date" id="sd2"></label><span class="muted">Terminal filter: use the selector above</span></div><div id="stab"></div></section>`;
 $('#page').innerHTML=h;
 const draw=()=>{const f=$('#sf').value,d1=$('#sd1').value,d2=$('#sd2').value;
  const r=all.filter(s=>inT(s)&&(!f||s.form===f)&&(!d1||s.date>=d1)&&(!d2||s.date<=d2));
  $('#stab').innerHTML=table(['Date','Form','Submitted By','Terminal','Details'],r.map(s=>[fd(s.date),formName(s.form),s.by,TERMS[s.term],s.summary]))};
 ['#sf','#sd1','#sd2'].forEach(s=>$(s).onchange=draw);if(q.get('form'))$('#sf').value=q.get('form');draw();
 if(fill)$('#ff').onsubmit=e=>{e.preventDefault();const fdt=new FormData(e.target);const by=fdt.get('Submitted by');const emp=EMP.find(x=>x.name===by);
  const summary=[...fdt.entries()].filter(([k])=>k!=='Submitted by').map(([k,v])=>k+': '+v).join(' · ');
  const arr=JSON.parse(localStorage.rrSubs||'[]');arr.push({form:fill,date:TODAY,by,term:emp.term,summary});localStorage.rrSubs=JSON.stringify(arr);
  history.replaceState(null,'','forms.html?v=28&form='+fill);render();toast('Submitted. Saved in this browser.');$('#subs').scrollIntoView()};
}
