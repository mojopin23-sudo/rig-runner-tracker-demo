/* Permit Request (oversize / overweight), shared by the web demo and the phone app. Sample data only. */
(function(){
var KEY='rrPermits';
function esc(s){return String(s==null?'':s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
var PM={KEY:KEY,esc:esc};
PM.UNITS=[["T-308-14","2019 Kenworth","308"],["C-308-02","2016 Grove","308"],["T-331-07","2021 Peterbilt","331"],["T-331-11","2018 Mack","331"],["T-335-03","2020 Kenworth","335"],["C-335-01","2017 Link-Belt","335"],["T-346-05","2022 Peterbilt","346"],["T-346-09","2015 Freightliner","346"],["F-308-04","2020 Sellick","308"],["P-331-02","2019 Kenworth","331"],["W-335-06","2018 Peterbilt","335"],["C-346-01","2021 Grove","346"]];
PM.TERMS={'308':'308 Alice','331':'331 Jourdanton','335':'335 Odessa','346':'346 Kilgore'};
PM.TYPES=['Oversize / Overweight (OS/OW)','Oversize only','Overweight only','Superheavy'];
PM.TRIPS=['Single trip','Round trip','Annual'];
PM.STATUS=['Requested','Submitted','Issued','Denied'];
PM.sample=function(){return {id:'PR-26-2001',link:'job:214',linkLabel:'Job #214 · Sample Rig 27',unit:'T-335-03',unitLabel:'T-335-03 · 2020 Kenworth · 335 Odessa',name:'Wade Callister',title:'Driver',reqDate:'2026-10-27',type:PM.TYPES[0],trip:'Single trip',origin:'Sample Lease #4H · Monahans, TX',dest:'Sample Ranch Unit 12 #1 · Pecos, TX',route:'I-20 W to exit 52, FM 1219 N, County Rd 1210 to lease road. Avoid downtown during school hours.',states:'TX',counties:'Ward, Reeves',start:'2026-11-04',end:'2026-11-05',load:'Substructure box',len:'68 ft',wid:'14 ft 6 in',hgt:'15 ft 2 in',ohf:'0 ft',ohr:'6 ft',gross:'118,000 lb',axles:'6',steer:'12,000 lb',drive:'40,000 lb',trailer:'66,000 lb',escort:'1 front, 1 rear',notes:'Daylight travel only.',status:'Issued',permitNo:'TX-OS-90417',hist:[{at:'2026-10-27 08:12',s:'Requested',by:'Wade Callister',n:''},{at:'2026-10-27 10:40',s:'Submitted',by:'Dispatch',n:'Sent to state permit office'},{at:'2026-10-28 09:05',s:'Issued',by:'Dispatch',n:'Permit TX-OS-90417'}],date:'2026-10-27'}};
PM.all=function(){var a;try{a=JSON.parse(localStorage.getItem(KEY)||'null')}catch(e){}if(!a){a=[PM.sample()];localStorage.setItem(KEY,JSON.stringify(a))}return a};
PM.save=function(a){localStorage.setItem(KEY,JSON.stringify(a))};
PM.get=function(id){return PM.all().find(function(x){return x.id===id})};
PM.byJob=function(id){return PM.all().filter(function(r){return r.link==='job:'+id})};
PM.byUnit=function(u){return PM.all().filter(function(r){return r.unit===u})};
PM.now=function(){var d=new Date(),p=function(n){return String(n).padStart(2,'0')};return d.getFullYear()+'-'+p(d.getMonth()+1)+'-'+p(d.getDate())+' '+p(d.getHours())+':'+p(d.getMinutes())};
PM.submit=function(r){var a=PM.all();var n=2001+a.length;while(a.some(function(x){return x.id==='PR-26-'+n}))n++;r.id='PR-26-'+n;r.date=r.reqDate;r.hist=[{at:PM.now(),s:r.status,by:r.name,n:r.status==='Issued'?'Permit '+r.permitNo:''}];a.push(r);PM.save(a);return r};
PM.setStatus=function(id,s,no,note,by){var a=PM.all(),r=a.find(function(x){return x.id===id});if(!r)return 'Not found';if(s==='Issued'&&!no)return 'Enter the permit number to mark it Issued';if(s==='Denied'&&!note)return 'Add a note with the reason it was denied';r.status=s;if(s==='Issued')r.permitNo=no;r.hist=r.hist||[];r.hist.push({at:PM.now(),s:s,by:by||'Dispatch',n:(s==='Issued'?'Permit '+no+(note?' · ':''):'')+(note||'')});PM.save(a);return ''};
PM.pill=function(s){var c={Requested:'#8a5a00;background:#fff6dd',Submitted:'#1a4f8a;background:#e6f0fb',Issued:'#1e6b35;background:#e3f4e8',Denied:'#c8102e;background:#fde8eb'}[s]||'#444;background:#eee';return '<span style="display:inline-block;padding:2px 8px;border-radius:999px;font-size:12px;font-weight:700;color:'+c+'">'+esc(s)+'</span>'};
PM.CSS='.rs-form{display:grid;gap:12px}.rs-sec{border:1px solid #ddd;border-radius:8px;padding:10px 12px;background:#fff}.rs-sec h4{margin:0 0 8px;font-size:13px;text-transform:uppercase;letter-spacing:.04em;color:#c8102e}.rs-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(170px,1fr));gap:8px 12px}.rs-f{display:flex;flex-direction:column;gap:3px;font-size:13px;font-weight:600}.rs-f input,.rs-f select,.rs-f textarea{font:14px Arial;padding:7px;border:1px solid #bbb;border-radius:6px;font-weight:400}.rs-full{grid-column:1/-1}.rs-err{color:#c8102e;font-size:13px;font-weight:700}.rs-req{color:#c8102e}.rs-note{font-size:12px;color:#666;margin-top:4px}';
function inp(n,l,v,t,w){return '<label class="rs-f'+(w?' rs-'+w:'')+'"><span>'+l+'</span><input name="'+n+'" type="'+(t||'text')+'" value="'+esc(v||'')+'"></label>'}
function sel(n,l,opts,v,ph,w){return '<label class="rs-f'+(w?' rs-'+w:'')+'"><span>'+l+'</span><select name="'+n+'">'+(ph?'<option value="">'+ph+'</option>':'')+opts.map(function(o){o=Array.isArray(o)?o:[o,o];return '<option value="'+esc(o[0])+'"'+(v===o[0]?' selected':'')+'>'+esc(o[1])+'</option>'}).join('')+'</select></label>'}
function ta(n,l,v){return '<label class="rs-f rs-full"><span>'+l+'</span><textarea name="'+n+'" rows="3">'+esc(v||'')+'</textarea></label>'}
var R='<span class="rs-req">*</span>';
PM.unitLabel=function(u){var x=PM.UNITS.find(function(q){return q[0]===u});return x?x[0]+' · '+x[1]+' · '+PM.TERMS[x[2]]:u};
PM.formHTML=function(o){var r=o.rec||{};
 return '<style>'+PM.CSS+'</style><form class="rs-form" id="pmform" onsubmit="return false">'+
 '<div class="rs-sec"><h4>Link to</h4><div class="rs-grid">'+sel('link','Job '+R,o.jobs.map(function(j){return [j.v,j.t]}),o.pre||'','Select a job…','full')+sel('unit','Unit (truck / equipment) '+R,PM.UNITS.map(function(u){return [u[0],PM.unitLabel(u[0])]}),o.unit||r.unit||'','Select a unit…','full')+'</div><div class="rs-note">The permit shows on the job record and on the unit\'s equipment record.</div></div>'+
 '<div class="rs-sec"><h4>Requested by</h4><div class="rs-grid">'+sel('name','Name '+R,o.people.map(function(p){return p[0]}),r.name||'','Select a person…')+inp('title','Title',r.title)+inp('reqDate','Date requested '+R,r.reqDate||o.today,'date')+'</div></div>'+
 '<div class="rs-sec"><h4>Permit</h4><div class="rs-grid">'+sel('type','Permit type '+R,PM.TYPES,r.type||PM.TYPES[0])+sel('trip','Trip',PM.TRIPS,r.trip||'Single trip')+inp('start','Move date (start) '+R,r.start,'date')+inp('end','Move date (end)',r.end,'date')+'</div></div>'+
 '<div class="rs-sec"><h4>Route</h4><div class="rs-grid">'+inp('origin','Origin '+R,r.origin,'text','full')+inp('dest','Destination '+R,r.dest,'text','full')+inp('states','States',r.states||'TX')+inp('counties','Counties',r.counties)+ta('route','Route notes',r.route)+'</div></div>'+
 '<div class="rs-sec"><h4>Load dimensions</h4><div class="rs-grid">'+inp('load','Load description',r.load,'text','full')+inp('len','Overall length',r.len)+inp('wid','Width',r.wid)+inp('hgt','Height',r.hgt)+inp('ohf','Front overhang',r.ohf)+inp('ohr','Rear overhang',r.ohr)+'</div></div>'+
 '<div class="rs-sec"><h4>Weights</h4><div class="rs-grid">'+inp('gross','Gross weight',r.gross)+inp('axles','Number of axles',r.axles)+inp('steer','Steer axle',r.steer)+inp('drive','Drive axles',r.drive)+inp('trailer','Trailer axles',r.trailer)+inp('escort','Escorts / pilot cars',r.escort)+'</div></div>'+
 '<div class="rs-sec"><h4>Status</h4><div class="rs-grid">'+sel('status','Status',PM.STATUS,r.status||'Requested')+inp('permitNo','Permit number (required when Issued)',r.permitNo)+ta('notes','Notes',r.notes)+'</div></div>'+
 '<div class="rs-err" id="pm-err"></div></form>'};
PM.bind=function(root,o){var f=root.querySelector('#pmform');var P={};(o.people||[]).forEach(function(p){P[p[0]]=p[1]});
 f.name.onchange=function(){f.title.value=P[f.name.value]||''};
 function fill(r){Object.keys(r).forEach(function(k){if(f[k]&&f[k].tagName)f[k].value=r[k]})}
 return {demo:function(){var s=PM.sample();var j=f.link.value||(f.link.options[1]&&f.link.options[1].value);s.link=j;delete s.status;delete s.permitNo;fill(s);f.link.value=j;if(!f.unit.value)f.unit.value='T-335-03';f.status.value='Requested';f.permitNo.value='';if(!P[s.name]){f.name.selectedIndex=1}f.title.value=P[f.name.value]||''},
 read:function(){var r={};['link','unit','name','title','reqDate','type','trip','start','end','origin','dest','states','counties','route','load','len','wid','hgt','ohf','ohr','gross','axles','steer','drive','trailer','escort','status','permitNo','notes'].forEach(function(k){r[k]=(f[k].value||'').trim()});
  var miss=[];if(!r.link)miss.push('Job');if(!r.unit)miss.push('Unit');if(!r.name)miss.push('Name');if(!r.reqDate)miss.push('Date requested');if(!r.start)miss.push('Move date');if(!r.origin)miss.push('Origin');if(!r.dest)miss.push('Destination');
  var e=root.querySelector('#pm-err');if(miss.length){e.textContent='Required: '+miss.join(', ');return null}
  if(r.status==='Issued'&&!r.permitNo){e.textContent='Enter the permit number to mark it Issued';return null}
  e.textContent='';r.linkLabel=f.link.options[f.link.selectedIndex].text;r.unitLabel=PM.unitLabel(r.unit);return r}}};
function row(a,b){return '<tr><td style="padding:4px 8px;border:1px solid #ccc;background:#f4f4f2;font-weight:700;width:38%">'+a+'</td><td style="padding:4px 8px;border:1px solid #ccc">'+esc(b||'—')+'</td></tr>'}
function sec(t,rows){return '<h3 style="background:#c8102e;color:#fff;margin:14px 0 0;padding:5px 8px;font-size:13px;text-transform:uppercase;letter-spacing:.04em">'+t+'</h3><table style="width:100%;border-collapse:collapse;font-size:13px">'+rows+'</table>'}
PM.docHTML=function(r,logo){return '<div style="font-family:Arial;color:#222;max-width:760px;margin:auto"><div style="display:flex;align-items:center;gap:12px;border-bottom:3px solid #c8102e;padding-bottom:8px"><img src="'+(logo||'logo.png?v=36')+'" style="height:44px" alt="Rig Runner"><div style="flex:1"><div style="font-size:18px;font-weight:800">Permit Request</div><div style="font-size:12px;color:#666">Oversize / Overweight · '+esc(r.id)+'</div></div><div>'+PM.pill(r.status)+(r.permitNo?'<div style="font-size:12px;margin-top:4px">Permit # <b>'+esc(r.permitNo)+'</b></div>':'')+'</div></div>'+
 sec('Linked to',row('Job',r.linkLabel)+row('Unit',r.unitLabel))+
 sec('Requested by',row('Name',r.name)+row('Title',r.title)+row('Date requested',r.reqDate))+
 sec('Permit',row('Permit type',r.type)+row('Trip',r.trip)+row('Move date(s)',r.start+(r.end&&r.end!==r.start?' to '+r.end:'')))+
 sec('Route',row('Origin',r.origin)+row('Destination',r.dest)+row('States',r.states)+row('Counties',r.counties)+row('Route notes',r.route))+
 sec('Load dimensions',row('Load',r.load)+row('Overall length',r.len)+row('Width',r.wid)+row('Height',r.hgt)+row('Front overhang',r.ohf)+row('Rear overhang',r.ohr))+
 sec('Weights',row('Gross weight',r.gross)+row('Number of axles',r.axles)+row('Steer axle',r.steer)+row('Drive axles',r.drive)+row('Trailer axles',r.trailer)+row('Escorts / pilot cars',r.escort))+
 sec('Notes',row('Notes',r.notes))+
 sec('Status history',(r.hist||[]).map(function(h){return row(h.at+' · '+h.s,(h.by||'')+(h.n?' · '+h.n:''))}).join(''))+'</div>'};
PM.mailText=function(r,to){return 'Permit Request '+r.id+' (PDF attached) emailed to '+to};
window.PM=PM;
})();
