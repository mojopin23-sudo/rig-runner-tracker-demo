/* Maintenance request detail, status workflow and photos. Shared by web demo and app via localStorage rrMaintReq. Sample data only. */
(function(){
var KEY='rrMaintReq';
function esc(s){return String(s==null?'':s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
function ph(label,c1,c2){var s='<svg xmlns="http://www.w3.org/2000/svg" width="320" height="220"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="'+c1+'"/><stop offset="1" stop-color="'+c2+'"/></linearGradient></defs><rect width="320" height="220" fill="url(#g)"/><circle cx="250" cy="60" r="28" fill="#fff" opacity=".25"/><rect x="40" y="120" width="180" height="60" rx="8" fill="#000" opacity=".25"/><text x="16" y="205" font-family="Arial" font-size="15" fill="#fff">'+label+' (sample photo)</text></svg>';return 'data:image/svg+xml;utf8,'+encodeURIComponent(s)}
var SEED={
 'MR-0931':{desc:'Brakes pulling hard to the right on the lease road. Air pressure drops faster than normal.',photos:[ph('Front brake chamber','#5b3a29','#a07050'),ph('Air gauge','#2b3a55','#6a7fa8')],hist:[{at:'2026-10-27 06:40',to:'Open',by:'Wade Callister',note:'Submitted from the app'}]},
 'MR-0934':{desc:'Hydraulic leak at the boom lift cylinder; puddle under the crane overnight.',photos:[ph('Boom cylinder leak','#3d4a2a','#8a9a5b')],hist:[{at:'2026-10-29 07:10',to:'Open',by:'Hector Villareal',note:'Submitted from the app'},{at:'2026-10-29 13:25',from:'Open',to:'In Progress',by:'Ray Tolbert',note:'Seal kit ordered; crane tagged out until replaced.'}]},
 'MR-0928':{desc:'Steer tire worn on the inside edge.',photos:[ph('Steer tire wear','#333','#777')],hist:[{at:'2026-10-22 05:55',to:'Open',by:'Dale Pruitt',note:'Submitted from the app'},{at:'2026-10-23 09:00',from:'Open',to:'In Progress',by:'Ray Tolbert',note:'Unit scheduled at shop.'},{at:'2026-10-25 15:30',from:'In Progress',to:'Completed',by:'Ray Tolbert',note:'WO-5512: replaced both steer tires and aligned front end.'}]},
 'MR-0937':{desc:'Winch line frayed near the hook.',photos:[ph('Winch line','#4a2a2a','#a05a5a')],hist:[{at:'2026-10-31 08:05',to:'Open',by:'Andre Pham',note:'Submitted from the app'},{at:'2026-10-31 11:40',from:'Open',to:'In Progress',by:'Ray Tolbert',note:'New line on order, ETA 11/4.'}]},
 'MR-0925':{desc:'A/C blowing warm air.',photos:[],hist:[{at:'2026-10-18 06:00',to:'Open',by:'Kyle Brandt',note:'Submitted from the app'},{at:'2026-10-21 16:10',from:'Open',to:'Completed',by:'Ray Tolbert',note:'WO-5490: recharged A/C, replaced cabin filter.'}]}};
var MR={KEY:KEY,esc:esc,ph:ph,STATUSES:['Open','In Progress','Completed']};
MR.store=function(){try{return JSON.parse(localStorage.getItem(KEY)||'{}')}catch(e){return {}}};
MR.put=function(s){localStorage.setItem(KEY,JSON.stringify(s))};
MR.base=function(){return ((typeof MAINT!=='undefined'&&MAINT)||(window.RR&&RR.MAINT)||[]).slice()};
MR.all=function(){var st=MR.store(),out=MR.base().map(function(m){return MR.merge(m,st[m.id])});(st._new||[]).forEach(function(n){out.unshift(MR.merge(n,st[n.id]))});return out};
MR.merge=function(m,o){var s=SEED[m.id]||{},r={};for(var k in m)r[k]=m[k];r.desc=r.desc||s.desc||(m.type+' issue reported on '+m.unit+'.');r.photos=r.photos||s.photos||[];r.hist=(s.hist||[{at:m.date+' 07:00',to:'Open',by:m.by,note:'Submitted from the app'}]).concat((o&&o.hist)||[]);if(m.status!=='Open'&&!s.hist&&!(o&&o.hist))r.hist.push({at:m.date+' 12:00',from:'Open',to:m.status,by:'Ray Tolbert',note:m.status==='Completed'?'WO-5400: '+(m.notes||'Repaired at shop'):(m.notes||'Awaiting parts')});var last=r.hist[r.hist.length-1];r.status=last.to;if(r.status==='Completed'){r.done=last.at.slice(0,10);r.notes=last.note}else{r.done='';r.notes=last.note}return r};
MR.get=function(id){return MR.all().find(function(m){return m.id===id})};
MR.setStatus=function(id,to,note,by){note=(note||'').trim();var cur=MR.get(id);if(!cur)return 'Not found';if(to===cur.status)return 'Status is already '+to;
 if(to==='In Progress'&&!note)return 'A note is required to move a request to In Progress.';
 if(to==='Completed'&&!note)return 'A note is required to complete a request: name the work order (WO-####) or describe what was done.';
 var st=MR.store();st[id]=st[id]||{};st[id].hist=(st[id].hist||[]).concat([{at:(function(d){return new Date(d-d.getTimezoneOffset()*6e4).toISOString().slice(0,16).replace('T',' ')})(new Date()),from:cur.status,to:to,by:by||'Ray Tolbert',note:note}]);MR.put(st);return ''};
MR.add=function(m){var st=MR.store();st._new=st._new||[];m.term=m.term||m.unit.split('-')[1];m.id='MR-'+(939+st._new.length).toString().padStart(4,'0');st._new.push(m);MR.put(st);return m};
MR.tag=function(s){return '<span class="pill '+(s==='Completed'?'Won':s==='In Progress'?'Submitted':'Draft')+'">'+s+'</span>'};
window.MR=MR;
})();
