/* Additional charges and tickets on a job. Sample data only; saved in this browser. */
(function(){
var CK='rrAddlCharges',TK='rrAddlTickets';
var AC={};
AC.CUSTS=['Sample Drilling Co.','Demo Energy LLC','Example Resources Inc','Lone Mesa Energy','Red Caliche Operating','Pecos Flats Petroleum'];
AC.SEED={'214':[{id:'C-214-01',date:'2026-11-01',desc:'Crane standby, 3 hrs (waiting on location)',orderedBy:'Company man on location',billTo:'Sample Drilling Co.',by:'Sample Dispatcher',price:855},{id:'C-214-02',date:'2026-11-02',desc:'Extra forklift, half day',orderedBy:'Rig manager',billTo:'Sample Drilling Co.',by:'Sample Dispatcher',price:640},{id:'C-214-03',date:'2026-11-02',desc:'Haul third-party mud tanks to new location (2 loads)',orderedBy:'Fluids supervisor',billTo:'Example Resources Inc',by:'Ray Tolbert',price:1480}],
 'J-26-1194':[{id:'C-1194-01',date:'2026-11-24',desc:'Pilot car, 1 day',orderedBy:'Drilling superintendent',billTo:'*',by:'Ray Tolbert',price:450},{id:'C-1194-02',date:'2026-11-25',desc:'Haul water tank for third party',orderedBy:'Water transfer supervisor',billTo:'Lone Mesa Energy',by:'Ray Tolbert',price:725}]};
function g(k){try{return JSON.parse(localStorage.getItem(k)||'null')}catch(e){return null}}
AC.charges=function(job,def){var a=g(CK)||{};if(!a[job]&&AC.SEED[job]){a[job]=AC.SEED[job].map(function(c){c=Object.assign({},c);if(c.billTo==='*')c.billTo=def||'Demo Energy LLC';return c});localStorage.setItem(CK,JSON.stringify(a))}return a[job]||[]};
AC.saveCharges=function(job,list){var a=g(CK)||{};a[job]=list;localStorage.setItem(CK,JSON.stringify(a))};
AC.tickets=function(job){return (g(TK)||{})[job]||[]};
AC.ticket=function(job,id){return AC.tickets(job).find(function(t){return t.id===id})};
AC.short=function(job){return String(job).replace(/^J-26-/,'')};
AC.addCharge=function(job,c){var l=AC.charges(job),n=l.length+1;while(l.some(function(x){return x.id==='C-'+AC.short(job)+'-'+String(n).padStart(2,'0')}))n++;c.id='C-'+AC.short(job)+'-'+String(n).padStart(2,'0');l.push(c);AC.saveCharges(job,l);return c};
AC.createTicket=function(job,cust,ids,by){var l=AC.charges(job),sel=l.filter(function(c){return ids.indexOf(c.id)>=0});
 if(!sel.length)return 'Select at least one charge';if(sel.some(function(c){return c.billTo!==cust||c.ticket}))return 'Only un-invoiced charges for '+cust+' can go on one ticket';
 var a=g(TK)||{},t=a[job]||[],n=t.length+1,s=AC.short(job),id='AT-'+s+'-'+String(n).padStart(2,'0');
 var tk={id:id,inv:'INV-'+s+'-A'+String(n).padStart(2,'0'),date:(function(d){return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0')})(new Date()),billTo:cust,by:by,charges:sel.map(function(c){return {id:c.id,date:c.date,desc:c.desc,orderedBy:c.orderedBy,price:c.price}}),total:sel.reduce(function(x,c){return x+Number(c.price||0)},0)};
 t.push(tk);a[job]=t;localStorage.setItem(TK,JSON.stringify(a));
 sel.forEach(function(c){c.ticket=tk.id;c.inv=tk.inv});AC.saveCharges(job,l);return tk};
window.AC=AC;
})();
