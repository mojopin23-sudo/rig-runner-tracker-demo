/* Shows permit requests on a job record and on a unit's equipment record. */
(function(){
function E(s){return PM.esc(s)}
function item(r,showJob){return '<div style="margin:3px 0" data-pm="'+r.id+'">'+PM.pill(r.status)+' <a href="permit-request.html?v=35&id='+r.id+'">'+r.id+'</a> · '+E(r.type.split(' (')[0])+' · move '+E(r.start)+' · '+(showJob?E(r.linkLabel.split(' · ')[0]):'unit '+E(r.unit))+(r.permitNo?' · Permit # '+E(r.permitNo):'')+' <a class="btn sm" href="permit-request.html?v=35&pdf='+r.id+'">📄 PDF</a> <a class="btn sm" href="#" data-pmem="'+r.id+'">✉ Email</a></div>'}
function wire(el){el.querySelectorAll('[data-pmem]').forEach(function(a){a.onclick=function(e){e.preventDefault();var r=PM.get(a.getAttribute('data-pmem'));var to=prompt('Email Permit Request '+r.id+' (PDF attached) to:','dispatch@rigrunner.example');if(to){var t=document.createElement('div');t.textContent=PM.mailText(r,to);t.style.cssText='position:fixed;bottom:20px;left:50%;transform:translateX(-50%);background:#222;color:#fff;padding:10px 16px;border-radius:8px;z-index:9999;pointer-events:none';document.body.appendChild(t);setTimeout(function(){t.remove()},3000)}}})}
function job(){if(document.getElementById('pm-row')||document.getElementById('pm-card'))return;var id=(window.RRJOB&&RRJOB.id)||new URLSearchParams(location.search).get('job')||new URLSearchParams(location.search).get('id')||'214';id=String(id);
 var html=(PM.byJob(id).map(function(r){return item(r,false)}).join('')||'<span style="color:#888">No permit requests yet</span>')+' <a class="btn sm" href="permit-request.html?v=35&link=job:'+encodeURIComponent(id)+'">+ New Permit Request</a>';
 var td=[].slice.call(document.querySelectorAll('td')).filter(function(t){return t.textContent.trim()==='Route Survey'})[0];
 if(td){var tr=document.createElement('tr');tr.id='pm-row';tr.innerHTML='<td>Permits</td><td></td>';tr.lastChild.innerHTML=html;td.parentNode.after(tr);wire(tr);return}
 var c=document.createElement('section');c.id='pm-card';c.className='card';c.style.cssText='margin:16px 0;padding:12px 16px;background:#fff;border:1px solid #e2e2de;border-radius:8px';c.innerHTML='<h3 style="margin:0 0 8px">Permit Requests</h3>'+html;
 var main=document.querySelector('main')||document.body;var ft=main.querySelector('footer');ft?main.insertBefore(c,ft):main.appendChild(c);wire(c)}
function unit(){var h=[].slice.call(document.querySelectorAll('h1')).find(function(x){return / — Detail View/.test(x.textContent)});if(!h)return;var u=h.textContent.split(' — ')[0].trim();if(!PM.UNITS.some(function(x){return x[0]===u}))return;var old=document.getElementById('pm-unit');if(old&&old.dataset.u===u)return;if(old)old.remove();
 var c=document.createElement('section');c.id='pm-unit';c.dataset.u=u;c.className='card';c.style.cssText='margin:16px 0;padding:12px 16px;background:#fff;border:1px solid #e2e2de;border-radius:8px';
 c.innerHTML='<h3 style="margin:0 0 8px">Permit Requests</h3>'+(PM.byUnit(u).map(function(r){return item(r,true)}).join('')||'<div style="color:#888">No permit requests for this unit yet.</div>')+'<div style="margin-top:8px"><a class="btn sm" href="permit-request.html?v=35&unit='+encodeURIComponent(u)+'">+ New Permit Request</a></div>';
 var head=h.closest('.page-head')||h;head.after(c);wire(c)}
function go(){if(/job-/.test(location.pathname))job();else unit()}
if(/resources/.test(location.pathname)){new MutationObserver(function(){clearTimeout(window._pmT);window._pmT=setTimeout(unit,60)}).observe(document.body,{childList:true,subtree:true})}
if(document.readyState==='complete')setTimeout(go,80);else window.addEventListener('load',function(){setTimeout(go,80)});
})();
