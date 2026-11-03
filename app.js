// Rig Runner Tracker - dashboard mockup. ALL DATA IS FAKE.
const URLS={jobs:'jobs.html?v=19',job:'job-index.html?v=19',bids:'bids.html?v=19',res:'resources.html?v=19'};
const JOBURL=j=>'job-index.html?v=19';const BIDURL=b=>'bids.html?v=19#quote/'+b;
const TERMS={'308':'308 Alice','331':'331 Jourdanton','335':'335 Odessa','346':'346 Kilgore'};
const TODAY='2026-11-02';
const S={get t(){return localStorage.rrT||'all'},set t(v){localStorage.rrT=v},get role(){return localStorage.rrRole||'Admin'},set role(v){localStorage.rrRole=v}};
const canMoney=()=>S.role!=='Dispatch';const readOnly=()=>S.role==='Management';
const inT=r=>S.t==='all'||r.term===S.t;
const $=s=>document.querySelector(s);const money=n=>'$'+Math.round(n).toLocaleString();
const fd=d=>{const x=new Date(d+'T12:00');return (x.getMonth()+1)+'/'+x.getDate()+'/'+x.getFullYear()};
const addD=(d,n)=>{const x=new Date(d+'T12:00');x.setDate(x.getDate()+n);return x.toISOString().slice(0,10)};
const PILL={Scheduled:'Scheduled','In Progress':'Transit',Complete:'Complete',Won:'Won',Lost:'Lost',Draft:'Draft',Sent:'Submitted',Pending:'warn',Open:'bad','In Progress':'info2',Completed:'ok',Valid:'ok',Expired:'bad',Expiring:'warn',High:'bad',Medium:'warn',Low:'ok'};
const tag=s=>`<span class="pill ${PILL[s]||'off'}">${s}</span>`;
const tchip=t=>`<span class="tchip"><i style="background:${TCOLOR[t]}"></i>${TERMS[t]}</span>`;
// ---------- fake master data ----------
const EMP=[['Wade Callister','308','Driver'],['Luis Barrientos','308','Swamper'],['Corey Nash','308','Crane Operator'],
['Dale Pruitt','331','Driver'],['Jesse Okafor','331','Swamper'],
['Mario Gallegos','335','Driver'],['Andre Pham','335','Crane Operator'],
['Travis Ellery','346','Driver'],['Marcus Hollins','346','Swamper'],['Owen Riggs','346','Owner Operator']].map(([name,term,occ],i)=>({name,term,occ,acct:'EMP-'+(1040+i)}));
const DISPATCH={'308':'Kara Delgado','331':'Brett Mahaffey','335':'Lena Ortiz','346':'Cody Faulk'};
const CUST=['Lone Mesa Energy','Red Caliche Operating','Pecos Flats Petroleum','Sample Drilling Co.'];
const OPER=['Hartline Drilling','Cobalt Basin Drilling'];
const TCOLOR={'308':'#e0700f','331':'#1f8a4c','335':'#1b4f9c','346':'#7b3fa0'};
const ROUTES={'308':[['Alice, TX','Premont, TX'],['Orange Grove, TX','Sandia, TX'],['Ben Bolt, TX','Falfurrias, TX'],['San Diego, TX','Freer, TX']],
'331':[['Jourdanton, TX','Pleasanton, TX'],['Charlotte, TX','Poteet, TX'],['Christine, TX','Campbellton, TX'],['Fashing, TX','Kenedy, TX']],
'335':[['Odessa, TX','Kermit, TX'],['Goldsmith, TX','Notrees, TX'],['Penwell, TX','Monahans, TX'],['Gardendale, TX','Andrews, TX']],
'346':[['Kilgore, TX','Henderson, TX'],['Overton, TX','Tatum, TX'],['Gladewater, TX','White Oak, TX'],['Carthage, TX','Beckville, TX']]};
const JOBS=[
['J-26-1182','308','Hartline 12','In Progress','2026-11-01',4,'B-4410',0,'Full Rig Move',38,182000,141500,12],
['J-26-1185','308','Cobalt 7','Scheduled','2026-11-05',3,'B-4418',1,'Full Rig Move',22,156000,118400,10],
['J-26-1179','308','Hartline 21','Complete','2026-10-21',2,'B-4397',2,'Partial Move',14,64000,47900,6],
['J-26-1190','308','Hartline 27','Scheduled','2026-11-16',3,'B-4430',3,'Full Rig Move',31,151000,115900,10],
['214','331','Sample Rig 27','In Progress','2026-11-02',4,'B-4412',3,'Full Rig Move',38,201500,163300,14],
['J-26-1188','331','Hartline 30','Scheduled','2026-11-06',1,'B-4421',0,'Skid / Walk',4,38500,27100,5],
['J-26-1176','331','Cobalt 15','Complete','2026-10-14',3,'B-4390',1,'Full Rig Move',33,174000,149800,11],
['J-26-1191','331','Cobalt 19','Scheduled','2026-11-12',3,'B-4431',2,'Full Rig Move',27,147500,111000,10],
['J-26-1184','335','Hartline 44','In Progress','2026-10-29',6,'B-4414',2,'Full Rig Move',67,238000,181300,15],
['J-26-1187','335','Cobalt 22','Scheduled','2026-11-04',2,'B-4419',2,'Rig Down Only',0,72000,51600,8],
['J-26-1180','335','Hartline 9','Complete','2026-10-26',3,'B-4401',3,'Full Rig Move',45,192500,158900,12],
['J-26-1192','335','Hartline 48','Scheduled','2026-11-19',4,'B-4432',0,'Full Rig Move',58,221000,170400,14],
['J-26-1186','346','Cobalt 18','In Progress','2026-11-02',3,'B-4417',3,'Full Rig Move',29,149000,112200,9],
['J-26-1189','346','Hartline 5','Scheduled','2026-11-07',2,'B-4423',1,'Partial Move',11,58000,43800,6],
['J-26-1177','346','Cobalt 11','Complete','2026-10-19',3,'B-4393',0,'Full Rig Move',36,168500,140100,11],
['J-26-1193','346','Cobalt 26','Scheduled','2026-11-23',3,'B-4433',1,'Full Rig Move',24,139000,104700,9]
].map(([job,term,rig,status,date,days,bid,c,type,miles,rev,cost,crew],i)=>{const r=ROUTES[term][i%4];return {job,term,rig,status,date,days,end:addD(date,days-1),bid,cust:CUST[c],oper:OPER[i%2],type,miles,rev,cost,crew,from:r[0],to:r[1]}});
// demo: jobs created from won bids on the Bids page
try{JSON.parse(localStorage.getItem('rrDemoJobs')||'[]').forEach(j=>JOBS.push(j))}catch(e){}
const ACTIVE=['In Progress'];
// demo: job start-date overrides saved from the job page
const JOBDATES=(()=>{try{return JSON.parse(localStorage.getItem('rrJobDates')||'{}')}catch(e){return {}}})();
JOBS.forEach(j=>{j.baseDate=j.date;const d=JOBDATES[j.job];if(d){j.date=d;j.end=addD(d,j.days-1);j.moved=true}});
const dayOf=j=>Math.round((new Date(TODAY)-new Date(j.date))/864e5)+1;
const BIDS=JOBS.map(j=>({bid:j.bid,status:'Won',date:addD(j.date,-12),cust:j.cust,oper:j.oper,term:j.term,rig:j.rig,type:j.type,job:j.job,miles:j.miles,price:Math.round(j.rev*0.97/100)*100,final:j.rev})).concat([
['B-4425','308','Submitted','2026-10-29',1,'Cobalt 25','Full Rig Move',41,171000],['B-4426','308','Draft','2026-10-31',3,'Hartline 17','Skid / Walk',3,29500],
['B-4424','331','Submitted','2026-10-28',0,'Hartline 38','Full Rig Move',27,148000],['B-4416','331','Lost','2026-10-20',2,'Cobalt 29','Full Rig Move',58,214000],
['B-4427','335','Draft','2026-10-30',2,'Cobalt 31','Full Rig Move',72,246000],['B-4428','335','Submitted','2026-10-30',3,'Hartline 50','Partial Move',18,69000],['B-4429','335','Pending','2026-10-31',0,'Hartline 52','Rig Down Only',0,66000],
['B-4422','346','Submitted','2026-10-27',1,'Cobalt 33','Full Rig Move',31,152000],['B-4415','346','Lost','2026-10-18',0,'Hartline 41','Partial Move',9,51000]
].map(([bid,term,status,date,c,rig,type,miles,price],i)=>({bid,status,date,cust:CUST[c],oper:OPER[i%2],term,rig,type,job:'',miles,price,final:''})));
// demo: bids created or changed on the Bids page
(()=>{let D=[],S={};try{D=JSON.parse(localStorage.getItem('rrDemoBids')||'[]');S=JSON.parse(localStorage.getItem('rrBidStatus')||'{}')}catch(e){}
 D.filter(b=>!b.jobId).forEach(b=>BIDS.push({bid:b.id,status:b.status,date:b.quoteDate,cust:b.billTo,oper:b.operator,term:String(b.terminal||'').slice(0,3),rig:b.rig,type:b.moveType||'Full Rig Move',job:'',miles:+b.miles||0,price:b.price||0,final:'',demo:true}));
 BIDS.forEach(b=>{const o=S[b.bid];if(o&&!b.job){b.status=o.status}});
 const seen={};for(let i=0;i<BIDS.length;i++){if(seen[BIDS[i].bid]){BIDS.splice(i,1);i--}else seen[BIDS[i].bid]=1}})();
const jobOf=id=>JOBS.find(j=>j.job===id);
const EXC=[['J-26-1182','Luis Barrientos','11/01 05:12 AM','—','Missing clock out'],['J-26-1182','Corey Nash','11/01 04:48 AM','11/01 09:55 PM','Shift over 16 hrs'],
['214','Rudy Saenz','11/01 06:02 AM','11/01 06:40 PM','Clock in outside geofence'],['214','Jesse Okafor','—','11/01 07:15 PM','Missing clock in'],
['J-26-1184','Kyle Brandt','11/01 05:30 AM','11/01 11:58 PM','Overlapping punch'],['J-26-1184','Andre Pham','11/01 06:15 AM','—','Missing clock out'],['J-26-1184','Shane Whitlow','10/31 07:00 PM','11/01 08:05 AM','Night shift not approved'],
['J-26-1186','Marcus Hollins','11/01 05:55 AM','11/01 05:58 AM','Punch under 5 min']].map(([job,res,ci,co,reason])=>({job,res,ci,co,reason,term:jobOf(job).term}));
const MAINT=[['MR-0931','2026-10-27','Wade Callister','Brakes','T-308-14','Open'],['MR-0934','2026-10-29','Hector Villareal','Hydraulic leak','C-308-02','In Progress'],
['MR-0928','2026-10-22','Dale Pruitt','Tires','T-331-07','Completed'],['MR-0935','2026-10-30','Rudy Saenz','Lights / electrical','T-331-11','Open'],
['MR-0936','2026-10-30','Mario Gallegos','Engine warning','T-335-03','Open'],['MR-0937','2026-10-31','Andre Pham','Winch line','C-335-01','In Progress'],['MR-0925','2026-10-18','Kyle Brandt','A/C','T-335-09','Completed'],
['MR-0938','2026-11-01','Travis Ellery','Fifth wheel','T-346-05','Open']].map(([id,date,by,type,unit,status])=>({id,date,by,type,unit,status,term:unit.split('-')[1],done:status==='Completed'?addD(date,3):'',notes:status==='Completed'?'Repaired at shop':'Awaiting parts'}));
const EQ=[['T-308-14','308',2019,'Kenworth','1XKAD49X0KJ2271','RR-4471','OS-77812','2026-11-18','2027-03-02','2026-12-01'],['C-308-02','308',2016,'Grove','1G9CR4511G4410','RR-3310','OS-77801','2027-05-10','2026-11-09','2027-01-20'],
['T-331-07','331',2021,'Peterbilt','1XPBD49X1MD5531','RR-5120','OS-77840','2026-11-25','2027-04-14','2027-02-01'],['T-331-11','331',2018,'Mack','1M2GR4GC5JM0071','RR-4022','OS-77851','2027-02-11','2027-06-30','2026-11-14'],
['T-335-03','335',2020,'Kenworth','1XKAD49X2LJ3392','RR-4901','OS-77866','2026-10-29','2027-01-05','2027-03-15'],['C-335-01','335',2017,'Link-Belt','LB9213330088','RR-3555','OS-77870','2027-07-01','2026-11-21','2027-02-11'],
['T-346-05','346',2022,'Peterbilt','1XPBD49X4ND7718','RR-5333','OS-77890','2027-04-20','2027-05-01','2026-11-28'],['T-346-09','346',2015,'Freightliner','1FUJGLDR5FL0912','RR-2988','OS-77895','2027-08-08','2026-12-30','2027-04-04'],['F-308-04','308',2020,'Sellick','SLK2020FK00418','RR-5011','OS-77815','2027-03-03','2027-02-02','2027-01-01'],['P-331-02','331',2019,'Kenworth','1XKAD49X9KJ6612','RR-4780','OS-77844','2027-01-19','2026-11-30','2027-05-05'],['W-335-06','335',2018,'Peterbilt','1XPBD49X7JD4410','RR-4412','OS-77872','2026-12-12','2027-03-20','2027-02-28'],['C-346-01','346',2021,'Grove','1G9CR4511M4471','RR-5402','OS-77899','2027-06-06','2027-01-11','2026-12-20']]
.map(([unit,term,year,make,vin,plate,permit,reg,dot,insp],i)=>({unit,term,year,make,vin,plate,permit,reg,dot,insp,own:i%4===3?'Owner Operator':'Company'}));
const INV=[['SN-77120','308','H2S Monitor','Personal gas monitor','Luis Barrientos','2025-11-10','2026-11-10'],['SN-77131','308','Fall Harness','Full body harness','Corey Nash','2024-11-20','2026-11-20'],
['SN-77144','331','H2S Monitor','Personal gas monitor','Jesse Okafor','2025-11-06','2026-11-06'],['SN-77152','331','Fire Extinguisher','10 lb ABC, truck T-331-11','Rudy Saenz','2025-10-30','2026-10-30'],
['SN-77163','335','Fall Harness','Full body harness','Kyle Brandt','2024-12-01','2026-12-01'],['SN-77170','335','First Aid Kit','Class B kit, C-335-01','Andre Pham','2025-11-15','2026-11-15'],
['SN-77188','346','H2S Monitor','Personal gas monitor','Marcus Hollins','2025-11-25','2026-11-25']].map(([serial,term,item,desc,to,issued,exp])=>({serial,term,item,desc,to,issued,exp}));
const COURSES=['H2S','First Aid/CPR','PEC SafeLand','Rigging','Forklift'];
const TRAIN=EMP.map((e,i)=>({name:e.name,term:e.term,prim:e.occ,sec:i%3===0?'Swamper':'—',c:COURSES.map((c,k)=>addD(TODAY,((i*37+k*53)%400)-20))}));
const GC=[['2026-11-01','Luis Barrientos','J-26-1182','Near Miss','High','Serious','Load shifted on lowboy during turn'],['2026-10-30','Hector Villareal','J-26-1182','Good Catch','Medium','Moderate','Spotted frayed sling before lift'],
['2026-10-31','Jesse Okafor','214','Good Catch','Low','Minor','Missing wheel chock on parked trailer'],['2026-11-01','Andre Pham','J-26-1184','Near Miss','High','Serious','Crane swing near energized line'],
['2026-10-28','Kyle Brandt','J-26-1184','Good Catch','Medium','Moderate','Pinch point on mast pin flagged'],['2026-10-29','Marcus Hollins','J-26-1177','Near Miss','Medium','Moderate','Pickup backed toward walkway']]
.map(([date,by,job,type,pot,sev,desc])=>({date,by,job,type,pot,sev,desc,term:jobOf(job).term}));
const NOTIF=[['2026-11-02','J-26-1182','Kara Delgado','Rig down starts 6:00 AM','All Hartline 12 crew'],['2026-11-01','214','Brett Mahaffey','Road closure on FM 140, use alternate','Drivers 331'],
['2026-11-02','J-26-1184','Lena Ortiz','Safety meeting at yard 5:30 AM','Hartline 44 crew'],['2026-11-01','J-26-1187','Lena Ortiz','Cobalt 22 rig down moved to Wed','Crew + customer'],
['2026-11-02','J-26-1186','Cody Faulk','Permits approved for Cobalt 18','Drivers 346'],['2026-10-31','J-26-1185','Kara Delgado','Crane needed Thu, confirm by noon','Crane operators']]
.map(([date,job,sender,title,rcp])=>({date,job,sender,title,rcp,term:jobOf(job).term}));
// payroll period: 10/25-11/07; hours generated deterministically
const PERIOD=[...Array(14)].map((_,i)=>addD('2026-10-25',i));
const hrs=(e,i)=>{const n=EMP.indexOf(e);if(PERIOD[i]>TODAY)return 0;const v=((n*7+i*5)%6);return v===0?0:9+v};
EMP.forEach(e=>{e.h=PERIOD.map((_,i)=>hrs(e,i));e.tot=e.h.reduce((a,b)=>a+b,0);e.reg=Math.min(80,e.tot);e.ot=e.tot-e.reg;e.rate=e.occ.includes('Crane')?31:e.occ.includes('Pusher')?33:e.occ==='Owner Operator'?0:25;e.wage=e.reg*e.rate+e.ot*e.rate*1.5;e.job=JOBS.filter(j=>j.term===e.term&&ACTIVE.includes(j.status))[0].job});
// ---------- chrome ----------
function chrome(active){
 {const p=new URLSearchParams(location.search).get('t');if(p&&(p==='all'||TERMS[p]))S.t=p;}
 const nav=[['Dashboard','index.html?v=19'],['Calendar','calendar.html?v=19'],['Bids',URLS.bids],['Jobs',URLS.jobs],['Resources',URLS.res],['Reports','reports.html?v=19'],['Forms','forms.html?v=19'],['Documents','documents.html?v=19'],['Admin','admin.html?v=19']];
 const mnav=`<button class="hamb" onclick="document.body.classList.toggle('navopen')" aria-label="Menu">&#9776;</button>`;
 document.body.insertAdjacentHTML('afterbegin',`<header class="topbar">${mnav}<a class="brand" href="index.html?v=19"><img src="logo.png?v=19" alt="Rig Runner"><span class="divider"></span><span class="appname">Tracker</span></a>
 <nav class="nav">${nav.map(([n,h])=>`<a href="${h}" class="${n===active?'active':''}">${n}</a>`).join('')}</nav><span class="spacer"></span>
 <div class="gs"><input id="gq" type="search" placeholder="Search jobs, bids, people, reports, forms, docs…" oninput="rrGsearch(this.value)" onfocus="rrGsearch(this.value)"><div id="gres"></div></div>
 <span class="tsel"><label for="tsel">Terminal</label><select id="tsel"><option value="all">View All</option>${Object.entries(TERMS).map(([k,v])=>`<option value="${k}">${v}</option>`).join('')}</select></span>
 <span class="demo-badge">Demo mockup · sample data</span>
 <span class="user"><span class="avatar">RT</span><span class="who"><b>Ray Tolbert</b><select id="rsel" title="Role (demo switcher)">${['Admin','Dispatch','Management'].map(r=>`<option value="${r}">${r==='Management'?'Management (read-only)':r}</option>`).join('')}</select></span></span></header>`);
 if(active!=='Dashboard'&&!window.NOCRUMB)document.querySelector('main').insertAdjacentHTML('afterbegin','<div class="crumb"><a href="index.html?v=19">&larr; Back to Dashboard</a></div>');
 document.body.insertAdjacentHTML('beforeend','<footer class="appfoot">&copy; Rig Runner 2026 · Tracker demo · all names and figures are fictional</footer>'+(document.getElementById('toast')?'':'<div class="toast" id="toast"></div>'));
 $('#tsel').value=S.t;$('#tsel').onchange=e=>{S.t=e.target.value;rr()};
 $('#rsel').value=S.role;$('#rsel').onchange=e=>{S.role=e.target.value;rr()};
}
function toast(m){const t=$('#toast');t.textContent=m;t.style.display='block';setTimeout(()=>t.style.display='none',2200)}
const go=u=>location.href=u;
const R=k=>'reports.html?v=19&r='+k;
function table(cols,rows,link){return `<div class="table-wrap"><table class="grid"><thead><tr>${cols.map(c=>`<th>${c}</th>`).join('')}</tr></thead><tbody>${rows.length?rows.map((r,i)=>`<tr class="${link?'click':''}" ${link?`onclick="go('${link(i)}')"`:''}>${r.map(c=>`<td>${c}</td>`).join('')}</tr>`).join(''):`<tr><td colspan="${cols.length}" class="muted">No rows for this terminal.</td></tr>`}</tbody></table></div>`}
// ---------- forms ----------
const F_TERM=['Terminal','sel',Object.values(TERMS)];
const FORMS=[
['Safety','jsa','Load / Unload JSA',[['Job #','sel',JOBS.map(j=>j.job)],['Load type','sel',['Standard','OS (Oversize)','OW (Overweight)','OS/OW']],['Hazards identified','text'],['Escort required','sel',['No','Yes']]]],
['Safety','bbs','HSE Behavior Based Safety Intervention',[['Job #','sel',JOBS.map(j=>j.job)],['Behavior observed','sel',['Safe','At-risk']],['Intervention notes','text']]],
['Safety','cjsa','Customer JSA',[['Customer','sel',CUST],['Job #','sel',JOBS.map(j=>j.job)],['Customer rep','text']]],
['Employee','dl','Driver License Renewal',[['License class','sel',['CDL A','CDL B']],['New expiration','date']]],
['Employee','med','Medical Card Renewal',[['Examiner','text'],['New expiration','date']]],
['Employee','lunch','Lunch Break Deduction Authorization',[['Pay period start','date'],['Authorize deduction','sel',['Yes','No']]]],
['Employee','orient','Orientation Policies Agreement',[['Orientation date','date'],['I agree to the policies','sel',['Yes']]]],
['Employee','vehicle','Vehicle Use Policy',[['Unit #','sel',EQ.map(q=>q.unit)],['Acknowledged','sel',['Yes']]]],
['Employee','elec','Electronic Equipment Policy & Installation Receipt',[['Device','sel',['ELD tablet','Dash camera','Phone']],['Serial','text']]],

['Equipment','loadlist','Load List',[['Job #','sel',JOBS.map(j=>j.job)],['Loads','text'],['Notes','text']]],
['Equipment','stock','Equipment Stock Addition',[['Item','text'],['Quantity','text'],['Unit #','sel',EQ.map(q=>q.unit)]]],
['Equipment','mumm','Multiple Unit Monthly Maintenance Report',[['Month','sel',['October 2026','November 2026']],['Units checked','text'],['Issues found','text']]]
].map(([group,id,name,fields])=>({group,id,name,fields}));
const SEED=[['jsa','2026-11-02','Wade Callister','308','Job #: J-26-1182 · Load type: OS/OW'],['bbs','2026-11-01','Dale Pruitt','331','Behavior observed: Safe'],
['med','2026-10-31','Travis Ellery','346','New expiration: 2028-10-31'],
['loadlist','2026-10-31','Corey Nash','308','Loads: 34'],['cjsa','2026-10-30','Grant Tolliver','346','Customer: Sabine Ridge Oil'],
['mumm','2026-10-30','Andre Pham','335','Month: October 2026 · Units checked: 9'],['jsa','2026-10-29','Rudy Saenz','331','Job #: 214 · Load type: OW (Overweight)']]
.map(([form,date,by,term,summary])=>({form,date,by,term,summary}));
const SUBS=()=>JSON.parse(localStorage.rrSubs||'[]').concat(SEED).sort((a,b)=>a.date<b.date?1:-1);
const formName=id=>FORMS.find(f=>f.id===id).name;

// ---------- shared lists for global search ----------
const DOCS=[["2025\u201326 Ca S Ca Fleet Auto Id", "Insurance/Liability"], ["2025\u201326 Ca S La Fleet Auto Id", "Insurance/Liability"], ["2025\u201326 Ca S Tx Fleet Auto Id", "Insurance/Liability"], ["2025\u201326 Tral Ca Fleet Auto Id", "Insurance/Liability"], ["2025\u201326 Tral La Fleet Auto Id", "Insurance/Liability"], ["2025\u201326 Tral Tx Fleet Auto Id", "Insurance/Liability"], ["Accident Prevention Program (rev. 6.26.2026)", "Rig Runner Policies"], ["Agent Contact Guide List", "Contacts"], ["Bloodborne Pathogen Policy", "Rig Runner Addendums for New Handbook"], ["Chain Working Load Limits", "Rig Runner SOP's"], ["Company Directory", "Contacts"], ["Company Vehicle Liability Card CA-S Fleet - TX", "Insurance/Liability"], ["Continental Resources Addendum to Rig Runner Drug and Alcohol Policy", "Rig Runner Policies"], ["Contractor Code Of Conduct", "Enterprise Products"], ["Crane JSA", "JSA"], ["Critical Lift Form", "Forms"], ["Crosby Rigging Information", "Rig Runner Best Practices"], ["Digital Sign-In Sign-Out Process for ExxonMobil", "ExxonMobil"], ["Driver Accident Protocol", "Accidents"], ["EZE Hazardous Materials Certificate 2026\u20132027", "Hazmat"], ["Emergency Contacts", "Contacts"], ["Enterprise Products Contractor EHST Manual 2018", "Enterprise Products"], ["Fire Protection Extinguishers", "Rig Runner Addendums for New Handbook"], ["First Aid", "Rig Runner Addendums for New Handbook"], ["Forklift JSA", "JSA"], ["Fuel Card Contact Information", "Contacts"], ["Fuel Tank Shipping Papers", "Diesel Transport"], ["GULFTEX Safety Manual & Forklift Certification", "Gulftex"], ["HSER Moment Heat Illness Prevention Dehydration", "Chesapeake Energy"], ["HSER Moment Heat Illness Prevention Hydration", "Chesapeake Energy"], ["Halliburton 20 Rules", "Halliburton"], ["Handbook Addendum HIGH VISIBILITY WARNING GARMENTS", "Rig Runner Addendums for New Handbook"], ["Hazmat Hotline Information", "Rig Runner SOP's"], ["Hazmat info guide", "Rig Runner Best Practices"], ["Heat Stress", "Chesapeake Energy"], ["Kodiak Gas Services Life Critical Rules", "Kodiak Gas Services"], ["Ladder Safety", "Rig Runner Addendums for New Handbook"], ["Life Saving Rules", "Rig Runner Best Practices"], ["Live Dispatch Guide", "Dispatch"], ["Memo - Safe Dispatch", "Rig Runner Policies"], ["Orientation Student Handout", "Rig Runner Best Practices"], ["Oversize Overweight Booklet", "Rig Runner SOP's"], ["Owner Operator Vehicle Liability Card TRAL Fleet - TX", "Insurance/Liability"], ["PMF IFTA 2026", "Insurance/Liability"], ["PMF UCR 2026", "Insurance/Liability"], ["Paper Log Tutorial", "Rig Runner Best Practices"], ["Patterson Hazardous Materials Certificate 2026\u20132027", "Hazmat"], ["Personal Conveyance Policy", "Rig Runner Policies"], ["Personal Protective Equipment PPE", "Rig Runner Addendums for New Handbook"], ["Placard ERG Handbook", "Diesel Transport"], ["Power Line Clearance Acknowledgment", "Power Lines"], ["Power Line Clearance Deviation Acknowledgment", "Power Lines"], ["Pre Lease Safety Inspection", "Forms"], ["Preventative Maintenance", "Rig Runner Addendums for New Handbook"], ["RKIER-EHS Handbook", "RKIER"], ["Railroad / Train Emergency Document FMCSA-DOT_Safety RR Xing", "Emergency"], ["Ranch Rules for SM Energy", "SM Energy"], ["Required Equipment for Ryder", "Ryder/Shell/Chevron"], ["Rig Move JSA", "JSA"], ["Rig Runner & Ryder Cell Phone Policy", "Rig Runner Policies"], ["Rig Runner - Alcohol, Drug, and Contraband Policy", "Rig Runner Policies"], ["Rig Runner - HazMat Security Plan for the Transportation", "Rig Runner SOP's"], ["Rig Runner Colorado Permit 2026\u20132027", "Hazmat"], ["Rig Runner Dropped Object Policy", "Rig Runner Policies"], ["Rig Runner Fuel Discounts", "Discounts"], ["Rig Runner HAZMAT exp 06-30-26", "Hazmat"], ["Rig Runner IFTA 2026", "Insurance/Liability"], ["Rig Runner RYDER OPERATIONS POLICY ADDENDUM", "Ryder/Shell/Chevron"], ["Rig Runner Safety Manual", "Rig Runner Best Practices"], ["Rig Runner Short Service Employee Mgmt Program (rev. 6.26.2026)", "Rig Runner Policies"], ["Rig Runner UCR 2026", "Insurance/Liability"], ["Roadside Inspections Rewards", "Rewards"], ["Ryder \"Cheat Sheet\"", "Ryder/Shell/Chevron"], ["Ryder Driver Expectations", "Ryder/Shell/Chevron"], ["Ryder Life Saving Rules", "Ryder/Shell/Chevron"], ["Ryder Move To From Forklift", "Ryder/Shell/Chevron"], ["Ryder Pre Job Plan", "Ryder/Shell/Chevron"], ["SDS Diesel Fuel No 2 Chevron", "Diesel Transport"], ["Stop Work Obligation Policy", "Enterprise Products"], ["Tandem Pole Truck JSA", "JSA"], ["Terminal Directory", "Contacts"], ["Tioga Pipe Chart", "Chart"], ["Workplace Violence SB553", "Rig Runner Policies"]].map(([title,cat],i)=>({id:i,title,cat}));const CATS=[...new Set(DOCS.map(d=>d.cat))].sort();
const REPNAMES=[['p30','30 Day Personnel View'],['bids','Bids'],['daily','Daily Log'],['dispatch','Dispatch (edits audit)'],['eqdates','Equipment Dates'],['inventory','Equipment Inventory'],['exception','Exception Queue'],['gross','Gross Payroll Report'],['inspect','Inspection Reports'],['jobres','Job Resources'],['jobs','Jobs'],['maint','Maintenance Requests'],['notif','Notifications'],['oo','Owner Operator Uploads'],['payroll','Payroll Period Report'],['perdiem','Per Diem'],['rigfolder','Rig Folder'],['gcnm','Good Catch / Near Miss (formerly SIF)'],['time','Time Records'],['training','Training / Certification Expiration'],['waybills','Waybills']];
function gsearch(q){q=q.trim().toLowerCase();const box=$('#gres');if(q.length<2){box.style.display='none';return}
 const m=s=>String(s).toLowerCase().includes(q);
 const G=[['Jobs',JOBS.filter(j=>m(j.job+' '+j.rig+' '+j.cust+' '+j.status+' '+j.term)).map(j=>[j.job+' · '+j.rig,j.status+' · '+TERMS[j.term],URLS.job])],
 ['Bids',BIDS.filter(b=>m(b.bid+' '+b.rig+' '+b.cust+' '+b.status)).map(b=>[b.bid+' · '+b.rig,b.status+' · '+b.cust,BIDURL(b.bid)])],
 ['Resources',EMP.filter(e=>m(e.name+' '+e.occ)).map(e=>[e.name,e.occ+' · '+TERMS[e.term],'resources.html?v=19&id=p'+(EMP.indexOf(e)+1)]).concat(EQ.filter(x=>m(x.unit+' '+x.make)).map(x=>[x.unit,x.year+' '+x.make,'resources.html?v=19&id=u'+(EQ.indexOf(x)+1)]))],
 ['Reports',REPNAMES.filter(r=>m(r[1])).map(r=>[r[1],'Report','reports.html?v=19&r='+r[0]])],
 ['Forms',FORMS.filter(f=>m(f.name+' '+f.group)).map(f=>[f.name,f.group+' form','forms.html?v=19&fill='+f.id])],
 ['Documents',DOCS.filter(d=>m(d.title+' '+d.cat)).map(d=>[d.title,d.cat,'documents.html?v=19&q='+encodeURIComponent(d.title)])],['Jobs list',[['All jobs','Jobs list','jobs.html?v=19']].filter(x=>m('jobs list all'))]].filter(g=>g[1].length);
 box.innerHTML=G.length?G.map(([g,r])=>`<div class="gh">${g} (${r.length})</div>`+r.slice(0,5).map(([t,s,u])=>`<a href="${u}"><b>${t}</b><span>${s}</span></a>`).join('')).join(''):'<div class="gh">No results</div>';box.style.display='block'}
document.addEventListener("click",e=>{if(!e.target.closest(".gs")){const b=document.getElementById("gres");if(b)b.style.display="none"}});

function rr(){if(typeof render==='function')render();else location.reload()}
window.rrGsearch=gsearch;
// cache-busting for any internal link
document.addEventListener('click',e=>{const l=e.target.closest&&e.target.closest('a[href]');if(!l)return;const h=l.getAttribute('href');if(!h||l.hasAttribute('download')||/^(https?:|#|mailto:|javascript:|blob:|data:)/.test(h)||/[?&]v=/.test(h))return;e.preventDefault();const [p,hash]=h.split('#');location.href=p+(p.includes('?')?'&':'?')+'v=19'+(hash?'#'+hash:'')},true);
