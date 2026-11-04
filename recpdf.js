/* Email and PDF actions for JSA and equipment inspection records (same pattern as waybills). */
(function(){
function kindOf(t){var n=t,s=null;for(var i=0;i<3&&n&&!s;i++){var p=n.previousElementSibling;if(p&&p.classList&&p.classList.contains('sbar'))s=p;n=n.parentElement}var txt=s?s.textContent:'';
 if(/JSA/.test(txt))return 'JSA';if(/Inspection/.test(txt))return 'Inspection';
 if(new URLSearchParams(location.search).get('r')==='inspect'&&t.closest('main'))return 'Inspection';var h=document.querySelector('.page-head h1, main h1, main h2');if(h&&/Inspection Reports/.test(h.textContent)&&t.closest('#main,main'))return 'Inspection';return null}
function cellIdx(t,re){var h=[].slice.call(t.querySelectorAll('thead th'));for(var i=0;i<h.length;i++)if(re.test(h[i].textContent))return i;return -1}
function enhance(){document.querySelectorAll('table').forEach(function(t){if(t.dataset.rp||!t.tHead||!t.tBodies[0])return;var k=kindOf(t);if(!k)return;
 t.dataset.rp=1;var hr=t.tHead.rows[0];var th=document.createElement('th');th.textContent='Actions';hr.appendChild(th);
 var iD=cellIdx(t,/Date/),iE=cellIdx(t,/Equipment|Unit/),iT=cellIdx(t,/^Type/),iB=cellIdx(t,/Submitted|By|Driver|Operator/),iF=cellIdx(t,/File|PDF|Report/);
 [].slice.call(t.tBodies[0].rows).forEach(function(r){if(r.cells.length<2)return;var g=function(i){return i>=0&&r.cells[i]?r.cells[i].textContent.trim():''};
  var f=g(iF),num=(f.match(/(\d{5})/)||[])[1]||'';var q={kind:k,date:g(iD),eq:g(iE),type:g(iT),by:g(iB),file:f.replace(/^📄\s*/,''),num:num,job:(window.RRJOB&&RRJOB.id)||'214'};
  var td=document.createElement('td');td.style.whiteSpace='nowrap';
  td.innerHTML='<span class="btn sm dark rp-pdf">📄 PDF</span> <span class="btn sm primary rp-mail">✉ Email</span>';
  td.querySelector('.rp-pdf').onclick=function(){location.href='record-pdf.html?v=38&'+new URLSearchParams(q)};
  td.querySelector('.rp-mail').onclick=function(){var to=prompt('Email this '+(k=='JSA'?'JSA':'inspection record')+' to:','safety@sampledrilling.example');if(!to)return;
   var name=(k=='JSA'?'JSA-':'Inspection-')+(num||q.eq)+'.pdf';(window.toast||alert)('✉ '+(k=='JSA'?'JSA':'Inspection')+' '+(num?'#'+num:'for unit '+q.eq)+' emailed to '+to+'<br><small>Attached: '+name+'</small>',6000)};
  r.appendChild(td)})})}
if(document.readyState!='loading')enhance();else document.addEventListener('DOMContentLoaded',enhance);
new MutationObserver(function(){enhance()}).observe(document.documentElement,{childList:true,subtree:true});
})();
