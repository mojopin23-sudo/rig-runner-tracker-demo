var TERMS=["Shipper and Carrier hereby agree that the shipment covered by this bill of lading is subject to the terms and conditions of this bill of lading and that these terms and conditions take precedence over any conflicting terms and conditions found in any other written or oral contract or agreement between Shipper and Carrier.",
"Carrier agrees to transport Shipper's freight subject to this bill of lading and any non-conflicting terms of any written agreement between the parties. Shipper acknowledges that Carrier is a motor carrier and agrees that Carrier's obligations shall not exceed those found in Title 49 of the United States Code and those historically undertaken by motor carriers carrying general freight.",
"All amounts due to Carrier hereunder are payable to Carrier at Rig Runner, Incorporated<br>519 N. Sam Houston Parkway E., STE 600, Houston, TX 77060 within thirty (30) days of the date of invoice. Rig Runner may charge interest at a rate of 1 ½ percent per month on any unpaid balance, or the maximum amount allowed by applicable law, whichever is higher.",
"Carrier's liability for the loss, damage or delay to freight shall be governed by 49 U.S.C.§14706 (the \"Carmack Amendment\") and all claims shall be filed and processed pursuant to 49 C.F.R. Part 370.",
"The rights and obligations of the parties will be governed solely by the laws of the State of Texas and any applicable Federal law in regard to motor carriage, without regard to any conflict of laws principles. The parties voluntarily submit to the State and Federal courts of Harris County, Texas for adjudication of their liabilities, claims and responsibilities hereunder, acknowledge the jurisdiction of such courts and that this venue is proper, and waive all objections and defenses thereto.",
"Carrier's liability for loss or damage to or delay of cargo, or for injury, including death, to persons or damage to property, other than cargo, shall be limited to the value of Carrier's insurance coverage relevant to the particular claim.",
"Neither party shall have any liability to the other party for loss of product, loss of profit, loss of use, business interruption or any other indirect, incidental, special, punitive or consequential damage, irrespective of whether such action is brought in contract, tort or strict liability, and irrespective of whether it was caused or allegedly caused by the negligence of a party.",
"In the event Carrier is unable to effect delivery for any reason whatsoever, then Carrier shall timely notify Shipper, and Carrier's liability thereafter shall be that of a warehouseman, and Shipper shall be responsible for storage charges.",
"Carrier will not carry or be liable in any way for any documents, coin money, or for any articles of extraordinary value unless a special agreement to do so and a stipulated value of the articles are endorsed on this bill of lading.",
"Nothing in this bill of lading shall limit the right of Carrier to require the prepayment or guarantee of some or all charges at the time of shipment or prior to delivery.",
"If the description of articles or other information on this bill of lading is found to be incorrect or incomplete, the freight charges must be paid upon the articles actually shipped.",
"If Carrier is directed by Shipper, or its consignee or consignor, to unload or deliver property at a particular location where Shipper or its consignor, consignee, or the agent of any of them, is not regularly located, the risk after unloading or delivery shall not be that of the carrier.",
"Both parties agree to act in compliance with all statutes, regulations and ordinances relevant to their business and the shipment covered by this bill of lading, and neither party shall act in any manner to cause or require the other party to violate any such statute, regulation or ordinance. Should such condition occur, the party causing or requiring the other party to violate a statute, law or ordinance, whether by demand, contract or otherwise, shall indemnify, defend and hold the other party harmless from any claims of any type or kind brought by any third party, including either party's employees, agents or contractors and/or any governmental entity arising out of or relating to such violation.",
"Shipper shall assure that any location where Carrier picks up or delivers cargo shall be reasonably safe and secure to protect Carrier's employees, agents and contractors from unreasonable risk or injury or harm.",
"The persons executing this bill of lading on the part of each party are each party's duly authorized representatives."]
;
var LOADS=["30 Ton", "40 Ton Tandem", "Air Compressor Skid", "Boiler House", "Booster Skid", "BOP Handler", "BOP Skid", "Casing", "Center Steel", "Change House", "Choke Manifold/Gas Buster/Trip Tank", "Crane", "Crane Boom", "Crane Weights", "Crew House", "Derrick", "Draw Works", "Drill Collars", "Drillers Cabin", "Drill Line Spool Skid", "Drill Pipe", "Empty", "Flex Hoist Skid", "Forklift", "Fuel Tank", "Generator(Motor Package)", "HAZMAT", "HPU/Accumulator", "Jack Box", "Junk Box/Conex", "Lubester/Parts House", "Mats", "MCC/Utility Package", "Miscellaneous Rig Parts", "Mud Boat", "Mud Pump", "Mud Tank", "Pipe Racks", "Pipe Wrangler", "Racking Board", "Rig Down", "Rig Manager House", "Rig Up", "Shaker Skid", "Skid System", "Substructure", "VFD House", "Water Tank"];
var PEOPLE=['R. Alvarez','L. Garza','B. Cole','S. Nunez','A. Reyes','V. Dean','E. Morales','P. Lynch','G. Ibarra'];
var EQUIP=[{id:'3151',type:'4 Axle Winch Truck',op:'L. Garza'},{id:'3139',type:'Slickback Truck',op:'B. Cole'},{id:'5110',type:'30 Ton Pole Truck',op:'S. Nunez'},{id:'3161',type:'4 Axle Winch Truck',op:'A. Reyes'},{id:'3150',type:'Slickback Truck',op:'V. Dean'},{id:'5102',type:'40 Ton Tandem Truck',op:'E. Morales'}];
var TRAILERS=['TR-801 Lowboy','TR-806 Float','TR-812 Step Deck','TR-820 Oilfield Float'];
var CUST={'Sample Drilling Co.':{bill:'billing@sampledrilling.example',addr:'100 Sample Way, Midland, TX 79701',contact:'J. Sample',rules:['Customer PO # required on every waybill','Rig # and Well # must match the field ticket','Consignee stamp required for payment','Submit within 48 hours of delivery']},
'Example Energy LLC':{bill:'ap@exampleenergy.example',addr:'200 Example Blvd, Odessa, TX 79761',contact:'M. Example',rules:['AFE # in Shipper\'s Order #','Detention billed only with in/out times','Hazmat loads need emergency contact']},
'Demo Operating Co.':{bill:'invoices@demooperating.example',addr:'300 Demo St, Kilgore, TX 75662',contact:'T. Demo',rules:['Bill to Third Party unless noted','Charges must be itemized']}};
var RIGS=['Sample Rig 27','Rig 102','Rig 205'];var OPS=['Sample Energy Partners','Example Resources','Demo Petroleum'];
var JOB={no:'214',date:'2026-11-02',cust:'Sample Drilling Co.',rig:'Sample Rig 27',op:'Sample Energy Partners',oldEnd:'Sample Lease #4H — Pecos, TX',newEnd:'Sample Ranch Unit 12 #1 — Monahans, TX'};
var SAMPLES=[
{wb:'1101851',job:'214',mode:'A',date:'2026-11-02',driver:'L. Garza',truck:'3151',trailer:'TR-801 Lowboy',cust:'Sample Drilling Co.',orig:'Pecos, TX',dest:'Monahans, TX',odo1:'184220',odo2:'184434',t1:'06:10',t2:'17:45',loads:[{q:1,hm:0,d:'Draw Works',w:'62000',l:'38',wd:'10',h:'11',hm2:'38',r:''},{q:1,hm:0,d:'Mud Pump',w:'48000',l:'30',wd:'10',h:'10',hm2:'38',r:''}]},
{wb:'1101852',job:'214',mode:'A',date:'2026-11-02',driver:'B. Cole',truck:'3139',trailer:'TR-806 Float',cust:'Sample Drilling Co.',orig:'Pecos, TX',dest:'Monahans, TX',odo1:'90110',odo2:'90308',t1:'06:25',t2:'18:02',loads:[{q:3,hm:0,d:'Drill Pipe',w:'42000',l:'40',wd:'8',h:'6',hm2:'38',r:''},{q:1,hm:1,d:'Fuel Tank',w:'12000',l:'24',wd:'8',h:'8',hm2:'38',r:''}]},
{wb:'1101853',job:'214',mode:'A',date:'2026-11-03',driver:'S. Nunez',truck:'5110',trailer:'TR-812 Step Deck',cust:'Sample Drilling Co.',orig:'Pecos, TX',dest:'Monahans, TX',odo1:'55012',odo2:'55188',t1:'05:58',t2:'16:40',loads:[{q:1,hm:0,d:'Derrick',w:'71000',l:'60',wd:'11',h:'12',hm2:'38',r:''}]},
{wb:'1101854',job:'',mode:'B',date:'2026-10-29',driver:'A. Reyes',truck:'3161',trailer:'TR-820 Oilfield Float',cust:'Example Energy LLC',orig:'Odessa, TX',dest:'Andrews, TX',odo1:'210500',odo2:'210612',t1:'07:00',t2:'15:20',loads:[{q:1,hm:0,d:'Water Tank',w:'18000',l:'40',wd:'10',h:'10',hm2:'56',r:'95/hr'}],chg:{lh:'1150.00',fs:'120.00'}},
{wb:'1101855',job:'',mode:'B',date:'2026-10-27',driver:'V. Dean',truck:'3150',trailer:'TR-806 Float',cust:'Demo Operating Co.',orig:'Kilgore, TX',dest:'Henderson, TX',odo1:'77210',odo2:'77262',t1:'08:15',t2:'13:30',loads:[{q:2,hm:0,d:'Mats',w:'30000',l:'40',wd:'8',h:'4',hm2:'26',r:''},{q:1,hm:0,d:'Junk Box/Conex',w:'9000',l:'20',wd:'8',h:'8',hm2:'26',r:''}],chg:{lh:'780.00'}}];
function $(s,r){return (r||document).querySelector(s)}function $$(s,r){return [].slice.call((r||document).querySelectorAll(s))}
function opts(l,v,blank){return (blank?'<option value="">'+blank+'</option>':'')+l.map(function(x){return '<option'+(x==v?' selected':'')+'>'+x+'</option>'}).join('')}
function toast(t,ms){var e=$('#toast');e.innerHTML=t;e.classList.add('on');clearTimeout(e._t);e._t=setTimeout(function(){e.classList.remove('on')},ms||4500)}
function modal(title,html,ok){$('#mt').innerHTML=title;$('#mf').innerHTML=html;$('#modal').classList.add('on');$('#mo').style.display=ok?'':'none';$('#mo').textContent='OK';$('#mo').onclick=function(){if(ok&&ok()!==false)close()};}
function close(){$('#modal').classList.remove('on')}
function termsHTML(){return '<div class="terms"><h2>TERMS AND CONDITIONS</h2><ol>'+TERMS.map(function(t){return '<li>'+t+'</li>'}).join('')+'</ol></div>'}
function showTerms(){modal('Terms and Conditions',termsHTML()+'<p class=vis>Printed as page 2 of every waybill PDF and attached to every waybill email. <a href="waybill-terms.html?v=40" target=_blank>Open as page</a></p>')}
function eq(id){return EQUIP.filter(function(e){return e.id==id})[0]}
function fmtD(d){if(!d)return '';var p=d.split('-');return p[1]+'/'+p[2]+'/'+p[0]}
function fmtT(t){if(!t)return '';var h=+t.slice(0,2),m=t.slice(3);return (h%12||12)+':'+m+(h<12?' AM':' PM')}
function miles(r){var a=+r.odo1,b=+r.odo2;return (a&&b&&b>=a)?b-a:''}
function loadedMiles(r){return (r.loads||[]).reduce(function(s,l){return s+(+l.hm2||0)},0)}
function loadCount(r){return (r.loads||[]).reduce(function(s,l){return s+(+l.q||0)},0)}
function hrs(r){if(!r.t1||!r.t2)return '';var a=r.t1.split(':'),b=r.t2.split(':');return ((b[0]*60+ +b[1]-a[0]*60-a[1])/60).toFixed(1)}
function allWB(){var s=JSON.parse(localStorage.getItem('wbSaved')||'[]');return SAMPLES.concat(s)}
// ---------- form ----------
function initForm(){var f=$('#wbform');if(!f)return;var A=f.dataset.mode=='A';
 var next=+(localStorage.getItem('wbNext')||1101856);$('#loadno').textContent=next;
 var today=new Date();var iso=today.getFullYear()+'-'+('0'+(today.getMonth()+1)).slice(-2)+'-'+('0'+today.getDate()).slice(-2);
 $('#f_date').value=A?JOB.date:iso;
 $('#f_driver').innerHTML=opts(PEOPLE,A?'L. Garza':'A. Reyes');$('#f_swamper').innerHTML=opts(PEOPLE,'', '— none —');
 $('#f_truck').innerHTML=opts(EQUIP.map(function(e){return e.id+' — '+e.type}),'');$('#f_trailer').innerHTML=opts(TRAILERS,'','— none —');
 function syncTruck(){var d=$('#f_driver').value;var e=EQUIP.filter(function(x){return x.op==d})[0];if(e){$('#f_truck').value=e.id+' — '+e.type}syncType()}
 function syncType(){var e=eq($('#f_truck').value.split(' ')[0]);$('#f_eqtype').value=e?e.type:'';$('#samsara').textContent='Odometer pulled from Samsara for unit '+(e?e.id:'')+' at clock-in / clock-out'}
 $('#f_driver').onchange=syncTruck;$('#f_truck').onchange=syncType;syncTruck();
 $('#f_orig').value=A?'Pecos, TX':'Odessa, TX';$('#f_dest').value=A?'Monahans, TX':'Andrews, TX';
 $('#f_odo1').value=A?'184220':'210500';$('#f_odo2').value=A?'184434':'210612';$('#f_t1').value='06:10';$('#f_t2').value='17:45';
 function calc(){$('#f_miles').textContent=miles({odo1:$('#f_odo1').value,odo2:$('#f_odo2').value})||'—';var t=0;$$('.chg').forEach(function(c){t+=parseFloat(c.value)||0});if($('#f_total'))$('#f_total').textContent='$'+t.toFixed(2);var lc=0,lm=0;$$('#loads tbody tr').forEach(function(r){lc+=+$('.lq',r).value||0;lm+=+$('.lhm',r).value||0});$('#lsum').textContent=lc+' loads · '+lm+' loaded miles'}
 f.addEventListener('input',calc);
 if(A){$('#f_bill').value=JOB.cust+' — '+CUST[JOB.cust].addr;$('#f_eqby').value=CUST[JOB.cust].contact+' ('+JOB.cust+')'}
 else{$('#f_cust').innerHTML=opts(Object.keys(CUST),'','Select customer…');$$('.s_co').forEach(function(s){s.innerHTML=opts(Object.keys(CUST),'','Select…')});$$('.s_rig').forEach(function(s){s.innerHTML=opts(RIGS,'','Select…')});$$('.s_op').forEach(function(s){s.innerHTML=opts(OPS,'','Select…')});
  $('#billreq').onclick=function(e){e.preventDefault();var c=$('#f_cust').value;if(!c){modal('Billing requirements','<p>Select a Bill To customer first.</p>');return}modal('Billing requirements — '+c,'<p class=vis>Sample rules (storage location is an open item)</p><ul>'+CUST[c].rules.map(function(r){return '<li>'+r+'</li>'}).join('')+'</ul><p>Billing contact: <b>'+CUST[c].bill+'</b></p>')}}
 // loads
 $('#addload').onclick=function(){modal('Add Load','<input class="inp" id=lsearch placeholder="Search 48 standard loads…"><div id=llist class=llist></div><label>Or free-form load</label><input class=inp id=lfree placeholder="Describe load">',function(){var v=$('#lfree').value.trim();if(!v){alert('Pick a load or type one');return false}addLoad(v)});
  function draw(){var q=$('#lsearch').value.toLowerCase();$('#llist').innerHTML=LOADS.filter(function(l){return l.toLowerCase().indexOf(q)>=0}).map(function(l){return '<a href=# class=lpick>'+l+'</a>'}).join('')}
  $('#lsearch').oninput=draw;draw();$('#mo').textContent='Add free-form';
  $('#llist').onclick=function(e){if(e.target.classList.contains('lpick')){e.preventDefault();addLoad(e.target.textContent);close()}}}
 function addLoad(d){var tr=document.createElement('tr');tr.innerHTML='<td><input class="inp lq" type=number value=1 style="width:52px"></td><td><input type=checkbox class=lhz title="Hazmat"></td><td><b class=ld>'+d+'</b><div><a href=# class=secure>View load securement requirements</a></div></td><td><input class="inp lw" style="width:80px" inputmode=numeric></td><td><input class="inp ll" style="width:48px"></td><td><input class="inp lwd" style="width:48px"></td><td><input class="inp lh" style="width:48px"></td><td><input class="inp lhm" style="width:60px" value="'+($('#f_miles').textContent|0)+'"></td><td><input class="inp lr" style="width:70px"></td><td><input class="inp la" style="width:80px"></td><td><span class=del>🗑</span></td>';$('#loads tbody').appendChild(tr);
  $('.secure',tr).onclick=function(e){e.preventDefault();modal('Load securement — '+d,'<p class=vis>Placeholder. Requirements will come from the load securement library (open item).</p><ul><li>Minimum 4 chains / binders rated for load weight</li><li>Edge protection on all contact points</li><li>Flags and lights on overhang &gt; 4 ft</li><li>Re-check securement within first 50 miles</li></ul>')};
  $('.del',tr).onclick=function(){tr.remove();calc()};calc();toast('Load added: '+d,1800)}
 window.addLoad=addLoad;addLoad(A?'Draw Works':'Water Tank');
 // stops
 var ns=0;$('#addstop').onclick=function(){ns++;var d=document.createElement('div');d.className='stop';d.innerHTML='<b>Extra Stop '+ns+'</b> <input class="inp st_loc" placeholder="Location"> <input class="inp st_by" placeholder="Shipped / Rec\'d by (name)"> <span class=del>🗑</span>';$('#stops').appendChild(d);$('.del',d).onclick=function(){d.remove()}};
 // signatures
 $$('canvas.sig').forEach(function(c){var x=c.getContext('2d');function fit(){var r=c.getBoundingClientRect();c.width=r.width;c.height=r.height;x.lineWidth=2.2;x.lineCap='round';x.strokeStyle='#1b2a6b'}fit();var dn=false;
  function p(e){var r=c.getBoundingClientRect(),t=e.touches?e.touches[0]:e;return [t.clientX-r.left,t.clientY-r.top]}
  function s(e){dn=true;var q=p(e);x.beginPath();x.moveTo(q[0],q[1]);e.preventDefault()}function m(e){if(!dn)return;var q=p(e);x.lineTo(q[0],q[1]);x.stroke();c.dataset.signed=1;e.preventDefault()}function u(){dn=false}
  c.addEventListener('mousedown',s);c.addEventListener('mousemove',m);window.addEventListener('mouseup',u);c.addEventListener('touchstart',s,{passive:false});c.addEventListener('touchmove',m,{passive:false});c.addEventListener('touchend',u);
  c.parentNode.querySelector('.clr').onclick=function(){x.clearRect(0,0,c.width,c.height);delete c.dataset.signed}});
 // stamp
 $('#f_stamp').onchange=function(){var fl=this.files[0];if(!fl)return;var rd=new FileReader();rd.onload=function(){var im=new Image();im.onload=function(){var cv=document.createElement('canvas'),k=Math.min(1,400/im.width);cv.width=im.width*k;cv.height=im.height*k;cv.getContext('2d').drawImage(im,0,0,cv.width,cv.height);var u=cv.toDataURL('image/jpeg',.8);$('#stampprev').innerHTML='<img src="'+u+'">';$('#stampprev').dataset.url=u;toast('Stamp photo attached',1800)};im.src=rd.result};rd.readAsDataURL(fl)};
 $$('.viewterms').forEach(function(a){a.onclick=function(e){e.preventDefault();showTerms()}});
 function collect(){var r={wb:String(next),mode:A?'A':'B',job:A?JOB.no:'',date:$('#f_date').value,driver:$('#f_driver').value,swamper:$('#f_swamper').value,truck:$('#f_truck').value.split(' ')[0],trailer:$('#f_trailer').value,orig:$('#f_orig').value,dest:$('#f_dest').value,odo1:$('#f_odo1').value,odo2:$('#f_odo2').value,t1:$('#f_t1').value,t2:$('#f_t2').value,route:$('#f_route').value,eqby:$('#f_eqby').value,haz1:$('#f_haz1').value,haz2:$('#f_haz2').value,permits:$('#f_permits').value,ppe:$('#f_ppe').checked,sbol:$('#f_sbol').value,sord:$('#f_sord').value,cbol:$('#f_cbol').value,cord:$('#f_cord').value,
  ft:($('input[name=ft]:checked')||{}).value||'',det:$$('.det').map(function(d){return d.value}),
  loads:$$('#loads tbody tr').map(function(t){return {q:$('.lq',t).value,hm:$('.lhz',t).checked?1:0,d:$('.ld',t).textContent,w:$('.lw',t).value,l:$('.ll',t).value,wd:$('.lwd',t).value,h:$('.lh',t).value,hm2:$('.lhm',t).value,r:$('.lr',t).value,a:$('.la',t).value}}),
  stops:$$('.stop').map(function(s){return {loc:$('.st_loc',s).value,by:$('.st_by',s).value}}),
  sig:$$('canvas.sig').map(function(c){return c.dataset.signed?c.toDataURL():''}),signame:$$('.signame').map(function(i){return i.value}),sigdate:$$('.sigdate').map(function(i){return i.value}),stamp:$('#stampprev').dataset.url||''};
  if(A){r.cust=JOB.cust;r.ship={co:JOB.cust,rig:JOB.rig,oil:JOB.op,well:'Sample Lease #4H',city:'Pecos, TX'};r.cons={co:JOB.cust,rig:JOB.rig,oil:JOB.op,well:'Sample Ranch Unit 12 #1',city:'Monahans, TX'};r.oldEnd=$('#f_old').value;r.newEnd=$('#f_new').value}
  else{r.cust=$('#f_cust').value;function blk(p){return {co:$('#'+p+'_co').value,rig:$('#'+p+'_rig').value,oil:$('#'+p+'_op').value,well:$('#'+p+'_well').value,city:$('#'+p+'_city').value}}r.ship=blk('s');r.cons=blk('c');r.decl=$('#f_decl').value;r.chg={};$$('.chg').forEach(function(c){r.chg[c.dataset.k]=c.value})}
  return r}
 function save(r){localStorage.setItem('wbNext',Math.max(+(localStorage.getItem('wbNext')||0),+r.wb+1));var s=JSON.parse(localStorage.getItem('wbSaved')||'[]').filter(function(x){return x.wb!=r.wb});s.push(r);try{localStorage.setItem('wbSaved',JSON.stringify(s))}catch(e){r.stamp='';localStorage.setItem('wbSaved',JSON.stringify(s))}}
 $('#btnsave').onclick=function(){var r=collect();save(r);toast('Waybill #'+r.wb+' saved — now in the Waybills report');if(A&&window.refreshJobList)refreshJobList()};
 $('#btnpdf').onclick=function(){var r=collect();save(r);location.href='waybill-pdf.html?v=40&id='+r.wb};
 $('#btnmail').onclick=function(){var r=collect();if(!r.cust){toast('Pick a Bill To customer first');return}save(r);mailToast(r)};
 calc()}
function mailToast(r){toast('✉ Waybill #'+r.wb+' emailed to '+CUST[r.cust].bill+'<br><small>Attached: Waybill-'+r.wb+'.pdf — page 1 Bill of Lading + page 2 Terms and Conditions</small>',6000)}
function rowHTML(r){var e=eq(r.truck)||{};return '<tr><td><b>'+r.wb+'</b></td><td>'+fmtD(r.date)+'</td><td>'+r.driver+'</td><td>'+(e.type||'')+' - '+r.truck+'</td><td>'+r.orig+' → '+r.dest+'</td><td class=num>'+miles(r)+'</td><td class=num>'+loadCount(r)+'</td><td><a class="btn sm" href="waybill-pdf.html?v=40&id='+r.wb+'">📄 PDF</a> <a href=# class=vt>Terms</a></td></tr>'}
function addRow(r){var tb=$('#joblist tbody');if(tb){$$('tr',tb).forEach(function(t){if(t.firstChild.textContent==r.wb)t.remove()});tb.insertAdjacentHTML('beforeend',rowHTML(r));bindVT()}}
function bindVT(){$$('.vt').forEach(function(a){a.onclick=function(e){e.preventDefault();showTerms()}})}
function initJobList(){var tb=$('#joblist tbody');if(!tb)return;window.refreshJobList=function(){tb.innerHTML=allWB().filter(function(r){return r.job=='214'}).map(rowHTML).join('');bindVT()};refreshJobList();
 $('#newwb').onclick=function(){var cur=$('#loadno').textContent;if(JSON.parse(localStorage.getItem('wbSaved')||'[]').some(function(x){return x.wb==cur})){location.href='job-index.html?v=40&n='+Date.now()+'#new';return}$('#formwrap').style.display='';$('#formwrap').scrollIntoView({behavior:'smooth'})};
 if(location.hash=='#new')setTimeout(function(){$('#formwrap').style.display='';$('#formwrap').scrollIntoView()},50)}
// ---------- report ----------
function initReport(){var tb=$('#rep tbody');if(!tb)return;var all=allWB();
 function fill(id,l){$(id).innerHTML=opts(l.filter(function(v,i){return v&&l.indexOf(v)==i}),'','All')}
 fill('#r_cust',all.map(function(r){return r.cust}));fill('#r_pers',all.map(function(r){return r.driver}));fill('#r_job',all.map(function(r){return r.job}));fill('#r_type',all.map(function(r){return (eq(r.truck)||{}).type}));fill('#r_eq',all.map(function(r){return r.truck}));
 function draw(){var c=$('#r_cust').value,p=$('#r_pers').value,j=$('#r_job').value,t=$('#r_type').value,q=$('#r_eq').value,d1=$('#r_d1').value,d2=$('#r_d2').value;
  var rows=all.filter(function(r){var e=eq(r.truck)||{};return (!c||r.cust==c)&&(!p||r.driver==p)&&(!j||r.job==j)&&(!t||e.type==t)&&(!q||r.truck==q)&&(!d1||r.date>=d1)&&(!d2||r.date<=d2)});
  window._rows=rows;var T=[0,0,0,0];
  tb.innerHTML=rows.map(function(r){var e=eq(r.truck)||{};var m=miles(r)||0,h=+hrs(r)||0,lc=loadCount(r),lm=loadedMiles(r);T[0]+=h;T[1]+=m;T[2]+=lc;T[3]+=lm;
   return '<tr><td><b>'+r.wb+'</b></td><td>'+(r.job?'<a href="job-index.html?v=40#waybills">#'+r.job+'</a>':'— (standalone)')+'</td><td>'+e.type+'</td><td>'+r.truck+'</td><td>'+fmtD(r.date)+'</td><td>'+r.driver+'</td><td>'+r.cust+'</td><td class=num>'+h.toFixed(1)+'</td><td class=num>'+m+'</td><td class=num>'+lc+'</td><td class=num>'+lm+'</td><td><a class="btn sm" href="waybill-pdf.html?v=40&id='+r.wb+'">📄 PDF</a></td></tr>'}).join('')||'<tr><td colspan=12 class=nodata>No waybills match</td></tr>';
  $('#rep tfoot').innerHTML='<tr><td colspan=7>'+rows.length+' waybills</td><td class=num>'+T[0].toFixed(1)+'</td><td class=num>'+T[1]+'</td><td class=num>'+T[2]+'</td><td class=num>'+T[3]+'</td><td></td></tr>'}
 $$('.filters select,.filters input').forEach(function(e){e.onchange=draw});$('#r_clear').onclick=function(){$$('.filters select,.filters input').forEach(function(e){e.value=''});draw()};draw();
 $('#r_xls').onclick=function(){var h=['Waybill #','Job #','Equipment Type','Equipment ID','Date','Employee','Customer','Equipment Hours','Equipment Miles','Loads','Loaded Miles'];var csv=[h].concat(_rows.map(function(r){return [r.wb,r.job,(eq(r.truck)||{}).type,r.truck,fmtD(r.date),r.driver,r.cust,hrs(r),miles(r),loadCount(r),loadedMiles(r)]})).map(function(a){return a.map(function(v){return '"'+String(v==null?'':v).replace(/"/g,'""')+'"'}).join(',')}).join('\r\n');
  var a=document.createElement('a');a.href=URL.createObjectURL(new Blob(['\ufeff'+csv],{type:'application/vnd.ms-excel'}));a.download='Waybills-report.csv';document.body.appendChild(a);a.click();a.remove();toast('Exported '+_rows.length+' rows (opens in Excel)')}}
// ---------- pdf ----------
function initPDF(){var pg=$('#bol');if(!pg)return;var id=new URLSearchParams(location.search).get('id')||'1101851';var r=allWB().filter(function(x){return x.wb==id}).pop()||SAMPLES[0];var e=eq(r.truck)||{};var c=CUST[r.cust]||{};
 function S(k,v){$$('[data-f="'+k+'"]').forEach(function(el){el.textContent=v==null?'':v})}
 var A=r.mode=='A';var sh=r.ship||{co:r.cust,rig:A?'Sample Rig 27':'',oil:A?'Sample Energy Partners':'',well:'',city:r.orig},co=r.cons||{co:r.cust,rig:sh.rig,oil:sh.oil,well:'',city:r.dest};
 S('wb',r.wb);S('date',fmtD(r.date));S('bill',r.cust);S('billaddr',c.addr||'');S('sbol',r.sbol);S('sord',r.sord||(r.job?'Job #'+r.job:''));S('cbol',r.cbol);S('cord',r.cord);
 ['co','rig','oil','well','city'].forEach(function(k){S('s'+k,sh[k]);S('c'+k,co[k])});
 if(A&&r.oldEnd){S('swell',r.oldEnd)}if(A&&r.newEnd){S('cwell',r.newEnd)}
 S('truck',r.truck);S('trailer',r.trailer);S('driver',r.driver);S('swamper',r.swamper);S('t1',fmtT(r.t1));S('t2',fmtT(r.t2));S('haz1',r.haz1);S('haz2',r.haz2);S('eqtype',e.type);S('eqby',r.eqby||(A?c.contact:''));
 S('orig',r.orig);S('dest',r.dest);S('odo','Odometer '+(r.odo1||'')+' → '+(r.odo2||'')+' = '+miles(r)+' mi');S('route',r.route||'');S('permits',r.permits);S('decl',r.decl);
 if(r.ppe)$('#ppe').classList.add('on');if(r.ft)$$('[data-ft="'+r.ft+'"]').forEach(function(x){x.textContent='☒'});
 var g=$('#lines tbody');var L=r.loads||[];var tw=0;g.innerHTML='';for(var i=0;i<14;i++){var l=L[i]||{};tw+=+l.w||0;g.insertAdjacentHTML('beforeend','<tr><td>'+(l.q||'')+'</td><td>'+(l.hm?'X':'')+'</td><td class=dsc>'+(l.d||'')+'</td><td>'+(l.w||'')+'</td><td>'+(l.l||'')+'</td><td>'+(l.wd||'')+'</td><td>'+(l.h||'')+'</td><td>'+(l.hm2||'')+'</td><td>'+(l.r||'')+'</td><td>'+(l.a||'')+'</td></tr>')}
 S('tq',loadCount(r));S('tw',tw||'');
 var ch=r.chg||{};var tot=0;['pm','lh','ins','fs','af','dt','es'].forEach(function(k){S('ch_'+k,ch[k]?'$'+(+ch[k]).toFixed(2):'');tot+=+ch[k]||0});S('ch_tot',tot?'$'+tot.toFixed(2):'');
 var st=r.stops||[];[0,1].forEach(function(i){S('stop'+i,st[i]?st[i].loc:'');S('stopby'+i,st[i]?st[i].by:'')});var dt=r.det||[];['li','lo','ui','uo'].forEach(function(k,i){S('d_'+k,dt[i]?fmtT(dt[i]):'')});
 [0,1,2].forEach(function(i){var s=(r.sig||[])[i];$('#sig'+i).innerHTML=s?'<img src="'+s+'">':'';S('sn'+i,(r.signame||[])[i]||'');S('sd'+i,fmtD((r.sigdate||[])[i]||''))});
 if(r.stamp)$('#stampbox').innerHTML='<img src="'+r.stamp+'">';
 $('#tpage').innerHTML=termsHTML();document.title='Waybill-'+r.wb;
 $('#dl').onclick=function(){window.print()};$('#pmail').onclick=function(){mailToast(r)};$('#pterms').onclick=function(e){e.preventDefault();showTerms()}}
document.addEventListener('DOMContentLoaded',function(){if(!document.body.dataset.wb)return;var mc=$('#mc');if(mc)mc.onclick=close;var m=$('#modal');if(m)m.onclick=function(e){if(e.target==m)close()};
 if($('#tonly'))$('#tonly').innerHTML=termsHTML();$$('.navterms').forEach(function(a){a.onclick=function(e){e.preventDefault();showTerms()}});initForm();initJobList();initReport();initPDF()});
