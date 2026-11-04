/* Shows route surveys attached to a job or bid; bid surveys carry over to the job once won. */
(function(){
function E(s){return RS.esc(s)}
function bidOfJob(id){var b=null;try{(JSON.parse(localStorage.getItem('rrDemoJobs')||'[]')).forEach(function(j){if(j.job===id&&j.bid)b=j.bid})}catch(e){}
 if(!b&&window.RR&&RR.JOBS)RR.JOBS.forEach(function(j){if(j.job===id&&j.bid)b=j.bid});return b}
function list(jobId,bidId){var rs=RS.linked(jobId,bidId);
 return rs.map(function(r){var co=jobId&&r.link.indexOf('bid:')==0;return '<div style="margin:2px 0" data-rs="'+r.id+'"><span class="pill Won">Submitted</span> '+E(r.date)+' · <a href="route-survey.html?v=36&id='+r.id+'">'+r.id+'</a> · '+E(r.name)+(co?' <span style="font-size:12px;color:#8a5a00">(carried over from Bid '+E(r.link.slice(4))+')</span>':'')+' <a class="btn sm" href="route-survey.html?v=36&pdf='+r.id+'">📄 PDF</a> <a class="btn sm" href="#" data-rsem="'+r.id+'">✉ Email</a> <a class="btn sm" href="#" data-rsdel="'+r.id+'" title="Delete route survey" style="color:#c8102e">🗑 Delete</a></div>'}).join('')}
function wire(el){el.querySelectorAll('[data-rsdel]').forEach(function(a){a.onclick=function(e){e.preventDefault();if(!confirm("Delete this route survey? This can't be undone."))return;var id=a.getAttribute('data-rsdel');RS.save(RS.all().filter(function(x){return x.id!==id}));go()}});el.querySelectorAll('[data-rsem]').forEach(function(a){a.onclick=function(e){e.preventDefault();var r=RS.all().find(function(x){return x.id===a.getAttribute('data-rsem')});var to=prompt('Email Route Survey '+r.id+' (PDF attached) to:','dispatch@rigrunner.example');if(to){var t=document.createElement('div');t.textContent=RS.mailText(r,to);t.style.cssText='position:fixed;bottom:20px;left:50%;transform:translateX(-50%);background:#222;color:#fff;padding:10px 16px;border-radius:8px;z-index:9999';document.body.appendChild(t);setTimeout(function(){t.remove()},3000)}}})}
function job(){var tds=[].slice.call(document.querySelectorAll('td')).filter(function(t){return t.textContent.trim()==='Route Survey'});
 var id=(window.RRJOB&&RRJOB.id)||new URLSearchParams(location.search).get('id')||'214';if(!tds.length){card(id==='214'?null:id,bidOfJob(id),'job');return}var bid=id==='214'?null:bidOfJob(id),cell=tds[0].nextElementSibling;
 cell.innerHTML=(list(id,bid)||'<span style="color:#888">No route survey yet</span>')+' <a class="btn sm" href="route-survey.html?v=36&link=job:'+encodeURIComponent(id)+'">+ New Route Survey</a>';wire(cell)}
function bid(){var m=location.hash.match(/^#(edit|quote)\/(.+)/),old=document.getElementById('rs-bidcard');if(old)old.remove();if(!m)return;card(null,decodeURIComponent(m[2]),'bid')}
function card(jid,id,kind){var old=document.getElementById('rs-bidcard');if(old)old.remove();
 var c=document.createElement('section');c.id='rs-bidcard';c.className='card';c.style.cssText='margin:16px 0;padding:12px 16px;background:#fff;border:1px solid #e2e2de;border-radius:8px';
 c.innerHTML='<h3 style="margin:0 0 8px">Route Surveys</h3>'+(list(jid,id)||'<div style="color:#888">No route survey attached to this '+kind+' yet.</div>')+'<div style="margin-top:8px"><a class="btn sm" href="route-survey.html?v=36&link='+(kind=='job'?'job:'+encodeURIComponent(jid||'214'):'bid:'+encodeURIComponent(id))+'">+ New Route Survey</a> '+(kind=='bid'?'<span style="font-size:12px;color:#666">Carries over to the job if this bid is won.</span>':'')+'</div>';
 var main=document.querySelector('main')||document.body;var ft=main.querySelector('footer');ft?main.insertBefore(c,ft):main.appendChild(c);wire(c)}
function go(){if(/job-/.test(location.pathname))job();else bid()}
window.addEventListener('hashchange',function(){setTimeout(go,50)});
if(document.readyState==='complete')setTimeout(go,50);else window.addEventListener('load',function(){setTimeout(go,50)});
})();
