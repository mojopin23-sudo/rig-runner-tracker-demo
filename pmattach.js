/* Permit Requests queue (open requests only) on the job summary, permit-request modal with Upload Document,
   the job's uploaded Permits table, and the unit record card. Sample data only. */
(function(){
var V='39';function E(s){return PM.esc(s)}
function jid(){return String((window.RRJOB&&RRJOB.id)||new URLSearchParams(location.search).get('id')||'214')}
function toast(m){var t=document.createElement('div');t.textContent=m;t.style.cssText='position:fixed;bottom:20px;left:50%;transform:translateX(-50%);background:#222;color:#fff;padding:10px 16px;border-radius:8px;z-index:10001;pointer-events:none';document.body.appendChild(t);setTimeout(function(){t.remove()},3200)}
function md(s){var p=String(s||'').split('-');return p.length==3?p[1]+'/'+p[2]+'/'+p[0]:(s||'')}
function money(n){return '$'+(+n||0).toLocaleString(undefined,{minimumFractionDigits:2,maximumFractionDigits:2})}
var css='#pm-queue{margin:14px 0 18px;border:2px solid #c8102e;border-left:8px solid #c8102e;border-radius:8px;background:#fff7f7;padding:0 0 8px}'+
 '#pm-queue .pmq-h{display:flex;align-items:center;gap:10px;background:#c8102e;color:#fff;padding:8px 12px;font-weight:700;font-size:15px}'+
 '#pm-queue .pmq-badge{background:#fff;color:#c8102e;border-radius:12px;padding:1px 9px;font-size:13px;font-weight:800}'+
 '#pm-queue table{margin:8px 10px 0;width:calc(100% - 20px)}#pm-queue tr[data-pmo]{cursor:pointer}#pm-queue tr[data-pmo]:hover td{background:#ffe9e9}'+
 '#pm-queue .pmq-none{padding:10px 12px;color:#666;font-size:13px;display:flex;align-items:center;gap:10px}'+
 '#pm-modal{position:fixed;inset:0;background:rgba(0,0,0,.45);z-index:10000;display:flex;align-items:flex-start;justify-content:center;overflow:auto;padding:30px 10px}'+
 '#pm-modal .pmm{background:#fff;border-radius:10px;max-width:820px;width:100%;padding:16px 18px;box-shadow:0 10px 40px rgba(0,0,0,.3)}'+
 '.pm-reading{display:none;color:#b45309;font-weight:700}.pm-tag{font-size:11px;padding:1px 6px;border-radius:9px}';
function style(){if(document.getElementById('pm-css'))return;var s=document.createElement('style');s.id='pm-css';s.textContent=css;document.head.appendChild(s)}
/* ---------- queue ---------- */
function queue(){style();var id=jid(),c=document.getElementById('pm-queue');
 if(!c){c=document.createElement('div');c.id='pm-queue';
  var addl=document.getElementById('addl');
  var sbs=[].slice.call(document.querySelectorAll('.sbar'));
  var bid=sbs.filter(function(x){return /Bid Equipment Allocation/.test(x.textContent)})[0];
  var loc=sbs.filter(function(x){return /^\s*Job Location/.test(x.textContent)})[0];
  if(addl)addl.parentNode.insertBefore(c,addl);else if(loc)loc.parentNode.insertBefore(c,loc);else if(bid)bid.parentNode.insertBefore(c,bid);
  else{var m=document.querySelector('main')||document.body;m.appendChild(c)}}
 var a=PM.openByJob(id);
 c.innerHTML='<div class="pmq-h">📋 Permit Requests <span class="pmq-badge" id="pmq-count">'+a.length+' open</span><span style="font-weight:400;font-size:12px;opacity:.9">open requests waiting on a permit · click one to open it</span><span style="flex:1"></span><a class="btn sm" style="background:#fff;color:#c8102e" href="permit-request.html?v='+V+'&link=job:'+encodeURIComponent(id)+'">+ New Permit Request</a></div>'+
 (a.length?'<table class="grid static"><thead><tr><th>Request #</th><th>Unit</th><th>Load</th><th>Date Requested</th><th>Requested By</th><th></th></tr></thead><tbody>'+a.map(function(r){return '<tr data-pmo="'+E(r.id)+'"><td><b><a href="#" data-pmo2="'+E(r.id)+'">'+E(r.id)+'</a></b></td><td>'+E(r.unit)+'</td><td>'+E(r.load||'')+'</td><td>'+md(r.reqDate)+'</td><td>'+E(r.name)+(r.title?' <span class="muted" style="font-size:11px">'+E(r.title)+'</span>':'')+'</td><td><span class="btn sm dark">Open</span></td></tr>'}).join('')+'</tbody></table>'
 :'<div class="pmq-none">No open permit requests <a class="btn sm" href="permit-request.html?v='+V+'&link=job:'+encodeURIComponent(id)+'">+ New Permit Request</a></div>');
 c.querySelectorAll('[data-pmo]').forEach(function(tr){tr.onclick=function(e){e.preventDefault();openModal(tr.dataset.pmo)}})}
/* ---------- modal ---------- */
function openModal(id){var r=PM.get(id);if(!r)return;var old=document.getElementById('pm-modal');if(old)old.remove();
 var m=document.createElement('div');m.id='pm-modal';
 m.innerHTML='<div class="pmm"><div style="display:flex;align-items:center;gap:8px;margin-bottom:10px;flex-wrap:wrap"><b style="font-size:16px">Permit Request '+E(r.id)+'</b>'+(PM.isOpen(r)?'<span class="pill" style="background:#fde68a;color:#7c4a03">Open</span>':'<span class="pill Won">Closed — permit uploaded</span>')+'<span style="flex:1"></span><a class="btn sm" href="permit-request.html?v='+V+'&id='+E(r.id)+'">Open full page</a><span class="btn sm" id="pmm-x" style="cursor:pointer">✕ Close</span></div>'+
 PM.docHTML(r)+
 '<div style="display:flex;align-items:center;gap:12px;margin-top:14px;padding-top:12px;border-top:1px solid #ddd">'+(PM.isOpen(r)?'<label class="btn primary" style="cursor:pointer">⬆ Upload Document<input id="pmm-file" type=file accept="application/pdf,image/*" style="display:none"></label><span class="pm-reading" id="pmm-read">⏳ Reading permit… pulling permit number and cost</span><span class="muted" style="font-size:12px" id="pmm-hint">Upload the issued permit (PDF or photo). The request closes and the permit moves to this job\'s Permits table.</span>':'<span class="muted">Permit '+E(r.permitNo||'')+' uploaded '+md(r.closedOn)+' by '+E(r.closedBy||'')+'.</span>')+'</div></div>';
 document.body.appendChild(m);
 m.onclick=function(e){if(e.target===m)m.remove()};m.querySelector('#pmm-x').onclick=function(){m.remove()};
 var f=m.querySelector('#pmm-file');if(f)f.onchange=function(){var file=f.files[0];if(!file)return;m.querySelector('#pmm-read').style.display='inline';m.querySelector('#pmm-hint').style.display='none';f.parentNode.style.opacity='.5';f.disabled=true;
  PM.uploadForRequest(id,file).then(function(u){m.remove();queue();uploads();toast('Permit '+u.permitNo+' uploaded · '+id+' closed and moved to Permits');var t=document.getElementById('pm-up');if(t)t.scrollIntoView({behavior:'smooth',block:'center'});var row=document.querySelector('[data-up="'+u.id+'"]');if(row){row.style.transition='background 2s';row.style.background='#fff3c4';setTimeout(function(){row.style.background=''},2500)}})}}
/* ---------- lower Permits section: uploaded permits only ---------- */
function uploads(){var id=jid(),w=document.getElementById('pm-up');
 if(!w){w=document.createElement('div');w.id='pm-up';w.style.margin='8px 0 14px';
  var sb=[].slice.call(document.querySelectorAll('.sbar')).filter(function(x){var s=x.querySelector('span');return s&&s.textContent.trim()==='Permits'&&!x.closest('form,#formwrap')})[0];
  if(sb){var nx=sb.nextElementSibling;if(nx&&nx.tagName==='TABLE'&&/Type/.test(nx.textContent))nx.remove();sb.after(w)}
  else{sb=document.createElement('div');sb.className='sbar';sb.innerHTML='<span>Permits</span><span class="btn dark">⊕ Upload Permit</span>';var m=document.querySelector('main')||document.body;m.appendChild(sb);sb.after(w)}
  [].slice.call(sb.querySelectorAll('.btn')).forEach(function(b){if(/Upload Permit/.test(b.textContent)){b.style.cursor='pointer';b.onclick=function(){var f=document.getElementById('pm-file');f&&f.click()}}});
  if(PM.uploads().some(function(r){return r.id==='UP-seed214'}))PM.saveUploads(PM.uploads().filter(function(r){return r.id!=='UP-seed214'}));}
 var a=PM.uploads().filter(function(r){return r.job===id}),tot=a.reduce(function(s,r){return s+(parseFloat(r.cost)||0)},0);
 w.innerHTML='<div style="display:flex;align-items:center;gap:8px;margin:4px 0"><span class="muted" style="font-size:12px">Uploaded permits · permit number and cost are auto-read from the file; check and correct any field</span><span style="flex:1"></span><span class="pm-reading" id="pm-reading">⏳ Reading permit…</span><input id="pm-file" type=file multiple accept="application/pdf,image/*" style="display:none"></div>'+
 '<div style="overflow:auto"><table class="grid static" id="pm-uptab"><thead><tr><th>Date</th><th>Permit Number</th><th>Unit</th><th>Load</th><th>Uploaded By</th><th class="num">Cost</th><th>File</th></tr></thead><tbody>'+
 (a.map(function(r){var I=function(k,wd,al){return '<input class="inp" data-k="'+k+'" value="'+E(r[k])+'" style="width:'+wd+'px;font-size:12px;padding:3px 5px'+(al?';text-align:right':'')+'">'};return '<tr data-up="'+E(r.id)+'"><td>'+I('date',92)+'</td><td>'+I('permitNo',110)+' '+(r.auto?'<span class="pm-tag" style="background:#e0f2fe;color:#075985">Auto-read</span>':'<span class="pm-tag" style="background:#dcfce7;color:#166534">Checked</span>')+(r.reqId?'<div class="muted" style="font-size:11px">from '+E(r.reqId)+'</div>':'')+'</td><td>'+I('unit',80)+'</td><td>'+I('load',240)+'</td><td>'+E(r.by)+'</td><td class="num">'+I('cost',80,1)+'</td><td><a href="#" data-view="'+E(r.id)+'">📄 View PDF</a><div class="muted" style="font-size:11px">'+E(r.file)+'</div></td></tr>'}).join('')||'<tr><td colspan=7 class="muted" style="text-align:center;padding:10px">No permits uploaded yet.</td></tr>')+
 '</tbody><tfoot><tr><td colspan=5 style="text-align:right;font-weight:700">Permit Costs Total</td><td class="num" style="font-weight:700" id="pm-uptot">'+money(tot)+'</td><td></td></tr></tfoot></table></div>';
 w.querySelector('#pm-file').onchange=function(){var fs=[].slice.call(this.files);if(!fs.length)return;w.querySelector('#pm-reading').style.display='inline';PM.uploadStandalone(fs,id).then(function(){uploads()})};
 w.querySelectorAll('[data-up] input').forEach(function(i){i.onchange=function(){var uid=i.closest('tr').dataset.up,b=PM.uploads();b.forEach(function(r){if(r.id===uid){r[i.dataset.k]=i.value;r.auto=false}});PM.saveUploads(b);uploads()}});
 w.querySelectorAll('[data-view]').forEach(function(l){l.onclick=function(ev){ev.preventDefault();PM.viewUpload(l.dataset.view)}})}
/* ---------- unit record ---------- */
function unit(){var h=[].slice.call(document.querySelectorAll('h1')).find(function(x){return / — Detail View/.test(x.textContent)});if(!h)return;var u=h.textContent.split(' — ')[0].trim();if(!PM.UNITS.some(function(x){return x[0]===u}))return;var old=document.getElementById('pm-unit');if(old&&old.dataset.u===u)return;if(old)old.remove();
 var c=document.createElement('section');c.id='pm-unit';c.dataset.u=u;c.className='card';c.style.cssText='margin:16px 0;padding:12px 16px;background:#fff;border:1px solid #e2e2de;border-radius:8px';
 var all=PM.byUnit(u),op=all.filter(PM.isOpen),cl=all.filter(function(r){return !PM.isOpen(r)});
 function it(r){return '<div style="margin:3px 0"><a href="permit-request.html?v='+V+'&id='+E(r.id)+'">'+E(r.id)+'</a> · '+E(r.load||'')+' · requested '+md(r.reqDate)+' · '+E(String(r.linkLabel||'').split(' · ')[0])+' '+(PM.isOpen(r)?'<span class="pill" style="background:#fde68a;color:#7c4a03">Open</span>':'<span class="pill Won">Closed — permit '+E(r.permitNo||'')+' uploaded</span>')+'</div>'}
 c.innerHTML='<h3 style="margin:0 0 8px">Permit Requests <span class="pill" style="background:#c8102e;color:#fff">'+op.length+' open</span></h3>'+(op.map(it).join('')||'<div style="color:#888">No open permit requests for this unit.</div>')+(cl.length?'<div style="margin-top:8px;font-size:12px;color:#666;font-weight:700">Closed</div>'+cl.map(it).join(''):'')+'<div style="margin-top:8px"><a class="btn sm" href="permit-request.html?v='+V+'&unit='+encodeURIComponent(u)+'">+ New Permit Request</a></div>';
 var head=h.closest('.page-head')||h;head.after(c)}
function go(){if(/job-/.test(location.pathname)){queue();uploads();setTimeout(function(){queue();uploads()},700);var o=new URLSearchParams(location.search).get('pr');if(o)openModal(o)}else unit()}
if(/resources/.test(location.pathname)){new MutationObserver(function(){clearTimeout(window._pmT);window._pmT=setTimeout(unit,60)}).observe(document.body,{childList:true,subtree:true})}
window.addEventListener('storage',function(e){if(e.key===PM.KEY&&/job-/.test(location.pathname))queue()});
if(document.readyState==='complete')setTimeout(go,80);else window.addEventListener('load',function(){setTimeout(go,80)});
})();
