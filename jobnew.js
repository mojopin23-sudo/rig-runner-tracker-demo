/* New-job mode for the job pages: ?id=<job> loads a job created from a won bid.
   Without ?id (or id=214) the page is the sample Job #214, unchanged. */
(function(){
var id=new URLSearchParams(location.search).get('id');
if(!id||id==='214')return;
var DJ=[];try{DJ=JSON.parse(localStorage.getItem('rrDemoJobs')||'[]')}catch(e){}
var j=DJ.find(function(x){return x.job===id});
var main=document.querySelector('main');
if(!j){if(main)main.innerHTML='<h1 class="jt">Job #'+String(id).replace(/[<>&"]/g,'')+' not found</h1><p>This demo job doesn\'t exist in this browser. Create one from <a href="bids.html?v=43#list">Bids</a>: open a submitted bid and Mark as Won.</p>';window.RRJOB={missing:true};return}
var s=j.src||{};window.RRJOB={id:j.job,date:j.date,job:j};
// keep this job's saved state separate from Job #214
var NS='rrnj:'+j.job+':',P=Storage.prototype,gi=P.getItem,si=P.setItem,ri=P.removeItem;
var mine=function(k){return /^rrjob|^wbSaved/.test(k)};
P.getItem=function(k){return gi.call(this,mine(k)?NS+k:k)};
P.setItem=function(k,v){if(k==='rrjob3:status'){var a=JSON.parse(gi.call(this,'rrDemoJobs')||'[]');a.forEach(function(x){if(x.job===j.job)x.status=v});si.call(this,'rrDemoJobs',JSON.stringify(a))}return si.call(this,mine(k)?NS+k:k,v)};
P.removeItem=function(k){return ri.call(this,mine(k)?NS+k:k)};
if(localStorage.getItem('rrjob214:addlTickets')==null)localStorage.setItem('rrjob214:addlTickets','[]');
if(localStorage.getItem('rrjob3:status')==null)localStorage.setItem('rrjob3:status',j.status||'Scheduled');
if(localStorage.getItem('wbSaved')==null)localStorage.setItem('wbSaved','[]');
var esc=function(x){return String(x==null?'':x).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})};
var fd=function(d){if(!d)return '';var p=d.split('-');return p[1]+'/'+p[2]+'/'+p[0]};
var T={'308':'308 Alice','331':'331 Jourdanton','335':'335 Odessa','346':'346 Kilgore'};
var term=T[j.term]||j.term, name=(s.newLease||j.rig)+' Move';
var tdy=new Date(),today=('0'+(tdy.getMonth()+1)).slice(-2)+'/'+('0'+tdy.getDate()).slice(-2)+'/'+tdy.getFullYear();
// exact sample text → bid value
var MAP=[['Sample Ranch Unit 12 Move',name],['Sample Rig 27 (1,500 HP AC)',j.rig],['Sample Rig 27',j.rig],['Sample Drilling Co.',j.cust],['Sample Energy Partners',j.oper],
 ['Sample Lease #4H',s.oldLease],['Sample Ranch Unit 12 #1',s.newLease],['B-26-0142',j.bid],['Pecos, TX',j.from],['Monahans, TX',j.to],
 ['31.41250',s.oldLat],['-103.49300',s.oldLng],['31.59420',s.newLat],['-102.89270',s.newLng],['31.41250, -103.49300',(s.oldLat||'')+', '+(s.oldLng||'')],['31.59420, -102.89270',(s.newLat||'')+', '+(s.newLng||'')]];
var PF=[];
function pf(el){el.classList.add('frombid');PF.push(el)}
function swapText(root){
  var w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT),n,L=[];while(n=w.nextNode())L.push(n);
  L.forEach(function(n){var t=n.nodeValue,o=t;
    t=t.replace(/Job #214\b/g,'Job #'+j.job).replace(/route-survey-job-214\.pdf/g,'');
    MAP.forEach(function(m){if(m[1]!=null&&t.trim()===m[0]){t=t.replace(m[0],m[1]);if(n.parentNode&&!/^(OPTION|A)$/.test(n.parentNode.tagName))pf(n.parentNode)}});
    MAP.slice(0,6).forEach(function(m){if(m[1]!=null&&t.indexOf(m[0])>=0&&t.trim()!==m[0])t=t.split(m[0]).join(m[1])});
    t=t.replace(/ - Sample Rig 27/g,' - '+j.rig).replace(/Rig Sample Rig 27/g,'Rig '+j.rig).replace(/from bid B-26-0142/,'from bid '+j.bid);
    if(t!==o)n.nodeValue=t});
  root.querySelectorAll('input,textarea').forEach(function(i){MAP.forEach(function(m){if(m[1]!=null&&i.value===m[0]){i.value=m[1];i.setAttribute('value',m[1]);pf(i)}})});
  root.querySelectorAll('select').forEach(function(sel){var o=sel.options[sel.selectedIndex];if(!o)return;MAP.forEach(function(m){if(m[1]!=null&&o.text===m[0]){o.text=m[1];pf(sel)}})});
}
function kv(label,val,html){[].slice.call(main.querySelectorAll('td,th,dt,label,b,span,div')).forEach(function(e){if(e.children.length===0&&e.textContent.trim()===label){var v=e.nextElementSibling;if(v){if(html)v.innerHTML=val;else v.textContent=val}}})}
function zeroMoney(root){var w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT),n,L=[];while(n=w.nextNode())L.push(n);
  L.forEach(function(n){var t=n.nodeValue.replace(/\$-?[\d,]+\.\d\d/g,'$0.00').replace(/\(-?\d+(\.\d+)?%\)/g,'(0.0%)');if(t!==n.nodeValue)n.nodeValue=t})}
function emptyTables(root,keep){
  root.querySelectorAll('table').forEach(function(t){if(keep&&t.closest(keep))return;var b=t.tBodies[0];if(!b||(b.rows.length===1&&b.rows[0].className==='njempty'))return;
    var cols=(t.tHead&&t.tHead.rows[0]?[].reduce.call(t.tHead.rows[0].cells,function(a,c){return a+(c.colSpan||1)},0):(b.rows[0]?b.rows[0].cells.length:1));
    b.innerHTML='<tr class="njempty"><td colspan="'+cols+'" style="color:#8a8a85;font-style:italic;padding:10px 12px">No records yet. New job.</td></tr>';b.dataset.nj=1;
    if(t.tFoot)[].forEach.call(t.tFoot.querySelectorAll('td,th'),function(c){if(c.children.length)return;c.textContent=c.textContent.replace(/\$-?[\d,]+\.\d\d/g,'$0.00').replace(/[+-]?\d[\d,]*(\.\d+)?/g,function(m){return m.indexOf('.')>=0?'0.00':'0'})});})}
var page=(location.pathname.split('/').pop()||'').replace(/\?.*/,'');
function chrome(){
// 1) links: keep ?id on every job tab
document.body.querySelectorAll('a[href]').forEach(function(a){var h=a.getAttribute('href');if(/^job-(\d|index|time)[\w-]*\.html/.test(h)&&!/[?&]id=/.test(h))a.setAttribute('href',h+(h.indexOf('?')<0?'?':'&')+'id='+encodeURIComponent(j.job))});
// 2) header: status pill, badge
var st=document.querySelector('#status')||document.querySelector('h1.jt .pill');if(st){st.textContent=j.status;st.className='pill '+({'In Progress':'Won',Scheduled:'Submitted',Complete:'Complete'}[j.status]||'Submitted')}
var h1=document.querySelector('h1.jt');if(h1&&!document.getElementById('frombid')){var bd=document.createElement('div');bd.className='njbar';bd.innerHTML='<a id="frombid" class="njbadge" href="bids.html?v=43#quote/'+esc(j.bid)+'">⇠ Created from Bid #'+esc(j.bid)+'</a><span class="njleg"><i></i>Highlighted fields were pre-filled from the bid.</span><span style="flex:1"></span><button type="button" class="btn sm" id="njreset">↺ Reset Demo</button>';h1.after(bd)}
}
chrome();
var css=document.createElement('style');css.textContent='.frombid{background:#fff8d6!important;box-shadow:inset 0 0 0 1px #e8cf5a;border-radius:4px}.njbar{display:flex;gap:12px;align-items:center;margin:4px 0 10px;flex-wrap:wrap}.njbadge{display:inline-flex;background:#fff3c4;color:#5e4500;border:1px solid #e0b800;border-radius:999px;padding:3px 12px;font-weight:600;font-size:13px;text-decoration:none}.njleg{font-size:12px;color:#6b6b66}.njleg i{display:inline-block;width:11px;height:11px;background:#fff8d6;border:1px solid #e0b800;vertical-align:-1px;margin-right:4px}';document.head.appendChild(css);
// 3) page content
swapText(document.body);
if(page==='job-1-rig-job-details.html'||page===''){
  main.querySelectorAll('select').forEach(function(sel){[].forEach.call(sel.options,function(o){if(o.text===term){sel.value=o.value||o.text;o.selected=true;pf(sel)}if(o.text===j.type){o.selected=true;pf(sel)}})});
  main.querySelectorAll('label').forEach(function(l){var i=l.nextElementSibling;var t=l.textContent.trim();
    if(t==='Miles'&&i&&i.tagName==='INPUT'){i.value=j.miles;i.setAttribute('value',j.miles);pf(i)}
    if(t==='Days'&&i&&i.tagName==='INPUT'){i.value=j.days;i.setAttribute('value',j.days);pf(i)}
    if(t==='Location Directions'&&i){i.value='';i.textContent=''}});
  var sd=document.getElementById('sdate');if(sd){sd.value=j.date;sd.setAttribute('value',j.date);pf(sd)}
  var lb=[].slice.call(main.querySelectorAll('a')).find(function(a){return a.textContent===j.bid});if(lb){lb.href='bids.html?v=43#quote/'+j.bid;pf(lb)}
  var al=document.getElementById('alloc');if(al){var E=s.equip||{},rows='',tot=0;
    ['Crane','Tandem','Pole Truck','Forklift','Haul Truck'].forEach(function(k){var q=+E[k]||0;tot+=q;
      rows+='<tr><td>'+k+'</td><td class="num frombid">'+q+'</td>'+(k==='Haul Truck'?'<td class="vis">Trucks/trailers are linked to drivers, not assigned here</td>':'<td class="asg" data-t="'+k+'"></td>')+'</tr>'});
    al.tBodies[0].innerHTML=rows;if(al.tFoot)al.tFoot.rows[0].cells[1].textContent=tot}
} else if(page==='job-index.html'){
  kv('Anticipated Move Date',fd(j.date));kv('Duration',String(j.days));kv('Miles',String(j.miles));kv('Originating Terminal',term);kv('Job Type',j.type);
  kv('Linked Bid','<a href="bids.html?v=43#quote/'+esc(j.bid)+'">'+esc(j.bid)+'</a>',true);
  kv('Job created on',today);kv('Job last Edited on',today);kv('Assigned Dispatcher','Not assigned');kv('Route Survey','Not started');
  ['Anticipated Move Date','Duration','Miles','Originating Terminal','Job Type','Linked Bid'].forEach(function(l){[].slice.call(main.querySelectorAll('td,th,div,span,b,dt')).forEach(function(e){if(e.children.length===0&&e.textContent.trim()===l&&e.nextElementSibling)pf(e.nextElementSibling)})});
  var w=document.createTreeWalker(main,NodeFilter.SHOW_TEXT),n;while(n=w.nextNode()){n.nodeValue=n.nodeValue.replace(/Total Miles: 38\b/,'Total Miles: '+j.miles).replace(/\(38 mi\)/,'('+j.miles+' mi)')}
}
if(page!=='job-1-rig-job-details.html'){
  var run=function(){
    document.querySelectorAll('.kv b').forEach(function(x){x.textContent=/\./.test(x.textContent)?'0.00':'0'});
    document.querySelectorAll('.corr').forEach(function(x){x.innerHTML='<span style="color:#8a8a85;font-style:italic">No correction requests. New job.</span>'});
    var w=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT),n;while(n=w.nextNode()){var v=n.nodeValue.replace(/^(\s*)\d+ pending/,'$10 pending').replace(/\d+ of \d+ records/,'0 of 0 records').replace(/Totals \(\d+\)/,'Totals (0)');if(v!==n.nodeValue)n.nodeValue=v}
    if(page==='job-index.html'){kv('Directions','')}
emptyTables(document.body,'#alloc,#addl,#pm-queue,#pm-up,table.kv,#loads,#formwrap,#newwb,#modal,#xov');zeroMoney(document.body);
    if(page==='job-index.html'&&j.rev){var M='$'+Number(j.rev).toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2});
      document.querySelectorAll('table.kv tr').forEach(function(r){var c=r.cells;if(!c||c.length<2)return;var l=c[0].textContent.trim();
        if(/^Job Price/.test(l)){c[1].textContent=M;c[1].classList.add('frombid');c[1].title='From bid '+j.bid}
        else if(l==='TOTAL INVOICE')c[1].textContent=M;else if(l==='Net Profit')c[1].textContent=M+' (100.0%)'})}

    main.querySelectorAll('ul.list,.docs,.files').forEach(function(u){u.innerHTML='<li style="color:#8a8a85;font-style:italic">None yet. New job.</li>'})};
  run();document.addEventListener('DOMContentLoaded',function(){swapText(document.body);chrome();run()});window.addEventListener('load',function(){swapText(document.body);chrome();run();setTimeout(run,500);setTimeout(run,1500)});
}
document.addEventListener('click',function(e){if(e.target&&e.target.id==='njreset'){if(!confirm('Reset demo? This removes bids and jobs created in this demo.'))return;
  var ks=[];for(var i=0;i<localStorage.length;i++){var k=localStorage.key(i);if(/^rrnj:|^rrDemo|^rrBidStatus/.test(k))ks.push(k)}ks.forEach(function(k){ri.call(localStorage,k)});location.href='bids.html?v=43#list'}});
})();
