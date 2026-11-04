/* Field Safety Reports (daily, per job) filed from the phone app; shown read-only on the job record. Sample data only. */
(function(){
var K='rrFSR',SEED=[{id:'FSR-214-2026-11-01',job:'214',rig:'Sample Rig 27',date:'2026-11-01',shift:'Day',rep:'Dale Pruitt',loc:'Old End (rig down)',wx:'Clear, 71°F',crew:'14',loads:'9',checks:['Pre-job safety meeting held','JSA reviewed and signed by crew','PPE in compliance','Stop Work Authority reviewed','Rigging inspected and tagged','Crane / forklift inspections complete'],inc:'None',haz:'Soft shoulder at lease road cattle guard.',ca:'Spotter posted at cattle guard for all loads.',notes:'',by:'Dale Pruitt'}];
function all(){try{var a=JSON.parse(localStorage.getItem(K)||'null');if(!a){a=SEED;localStorage.setItem(K,JSON.stringify(a))}return a}catch(e){return []}}
function E(s){return String(s==null?'':s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
function mdy(d){var p=String(d).split('-');return p[1]+'/'+p[2]+'/'+p[0]}
function go(){if(!/job-index/.test(location.pathname))return;var id=(window.RRJOB&&RRJOB.id)||new URLSearchParams(location.search).get('id')||'214';
 var old=document.getElementById('fsr-card');if(old)old.remove();
 var a=all().filter(function(r){return r.job==id}).sort(function(x,y){return x.date<y.date?1:-1});
 var c=document.createElement('section');c.id='fsr-card';c.className='card';c.style.cssText='margin:16px 0;padding:12px 16px;background:#fff;border:1px solid #e2e2de;border-radius:8px';
 c.innerHTML='<h3 style="margin:0 0 8px">Field Safety Reports</h3>'+(a.length?'<div class="table-wrap"><table class="grid"><thead><tr><th>Date</th><th>Shift</th><th>Field Safety Rep</th><th>Location</th><th>Crew</th><th>Loads</th><th>Checks</th><th>Incidents</th><th>Hazards / Corrective Actions</th></tr></thead><tbody>'+a.map(function(r){return '<tr data-fsr="'+E(r.id)+'"><td>'+mdy(r.date)+'</td><td>'+E(r.shift)+'</td><td>'+E(r.rep)+'</td><td>'+E(r.loc)+'</td><td>'+E(r.crew)+'</td><td>'+E(r.loads)+'</td><td>'+r.checks.length+' of 8</td><td>'+E(r.inc)+'</td><td>'+E(r.haz||'—')+(r.ca?'<br><span class="muted small">'+E(r.ca)+'</span>':'')+'</td></tr>'}).join('')+'</tbody></table></div>':'<div style="color:#888">No Field Safety Reports for this job yet.</div>')+'<div class="muted small" style="margin-top:6px">Filed daily from the phone app (Field Safety Report tile).</div>';
 var main=document.querySelector('main')||document.body;var ft=main.querySelector('footer');ft?main.insertBefore(c,ft):main.appendChild(c)}
window.RRFSR={all:all};
if(document.readyState==='complete')setTimeout(go,80);else window.addEventListener('load',function(){setTimeout(go,80)});
})();
