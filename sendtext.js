/* Day/Night Resources: select personnel rows and send a demo text (nothing is sent). */
(function(){
var main=document.querySelector('main');if(!main)return;
var css=document.createElement('style');css.textContent='.stxc{width:28px;text-align:center}.stxc input{width:16px;height:16px;cursor:pointer}#stxov{position:fixed;inset:0;background:rgba(0,0,0,.45);z-index:999;display:flex;align-items:center;justify-content:center}#stxov .box{background:#fff;border-radius:10px;max-width:460px;width:92%;padding:18px 20px;box-shadow:0 10px 30px rgba(0,0,0,.25)}#stxov h3{margin:0 0 10px}#stxov .to{display:flex;flex-wrap:wrap;gap:6px;margin:0 0 10px}#stxov .to span{background:#f1f1ee;border-radius:999px;padding:3px 10px;font-size:13px}#stxov textarea{width:100%;box-sizing:border-box;min-height:90px;border:1px solid #cfcfca;border-radius:6px;padding:8px;font:inherit}#stxov .act{display:flex;gap:8px;justify-content:flex-end;margin-top:12px}#stxov .note{font-size:12px;color:#6b6b66;margin-top:6px}';document.head.appendChild(css);
function tables(){return [].slice.call(main.querySelectorAll('table.grid')).filter(function(t){return t.tHead&&/Resource/.test(t.tHead.textContent)})}
function name(r){var c=r.cells[r.querySelector(".stxc")?2:1];if(!c)return '';var s=c.querySelector('select');var v=s?s.options[s.selectedIndex]&&s.options[s.selectedIndex].text:c.textContent.trim();return v==='None Selected'?'':v}
function decorate(){tables().forEach(function(t){var hr=t.tHead.rows[0];if(!hr.querySelector('.stxc')){var th=document.createElement('th');th.className='stxc';th.innerHTML='<input type="checkbox" class="stxall" title="Select all">';hr.insertBefore(th,hr.firstChild)}
  [].forEach.call(t.tBodies[0].rows,function(r){if(r.querySelector('.stxc'))return;if(r.className==='njempty'){var c=r.cells[0];if(c&&c.colSpan&&!r.dataset.stx){c.colSpan=c.colSpan+1;r.dataset.stx=1}return}
    var td=document.createElement('td');td.className='stxc';td.innerHTML='<input type="checkbox" class="stx">';r.insertBefore(td,r.firstChild)})})}
function buttons(){[].forEach.call(main.querySelectorAll('.row'),function(rw){if(rw.querySelector('.stxbtn'))return;var n=[].slice.call(rw.children).find(function(x){return /Send Notifications/.test(x.textContent)});if(!n)return;
  var b=document.createElement('span');b.className='btn sm stxbtn';b.style.cssText=n.getAttribute('style')||'';b.style.marginLeft='6px';b.textContent='💬 Send text to selected';n.after(b)})}
function run(){decorate();buttons()}
run();document.addEventListener('DOMContentLoaded',run);window.addEventListener('load',function(){run();setTimeout(run,600);setTimeout(run,1700)});
new MutationObserver(function(){clearTimeout(run._t);run._t=setTimeout(run,30)}).observe(main,{childList:true,subtree:true});
document.addEventListener('change',function(e){if(e.target.classList&&e.target.classList.contains('stxall')){var t=e.target.closest('table');t.querySelectorAll('input.stx').forEach(function(c){c.checked=e.target.checked})}},true);
function toast(t){var e=document.getElementById('toast');if(e){e.textContent=t;e.classList.add('on');clearTimeout(e._t);e._t=setTimeout(function(){e.classList.remove('on')},2600)}else alert(t)}
document.addEventListener('click',function(e){if(!e.target.closest||!e.target.closest('.stxbtn'))return;e.preventDefault();e.stopPropagation();
  var names=[];main.querySelectorAll('input.stx:checked').forEach(function(c){var n=name(c.closest('tr'));if(n&&names.indexOf(n)<0)names.push(n)});
  if(!names.length){toast('Select at least one person first.');return}
  var ov=document.createElement('div');ov.id='stxov';ov.innerHTML='<div class="box"><h3>Send text to '+names.length+' '+(names.length>1?'people':'person')+'</h3><div class="to">'+names.map(function(n){return '<span>'+n.replace(/[<>&]/g,'')+'</span>'}).join('')+'</div><label style="font-size:12.5px;font-weight:700">Message</label><textarea id="stxmsg" placeholder="e.g. Report to the old end at 6:00 AM tomorrow."></textarea><div class="note">Demo only. No text is actually sent.</div><div class="act"><span class="btn" id="stxno">Cancel</span><span class="btn primary" id="stxgo">Send</span></div></div>';
  document.body.appendChild(ov);ov.querySelector('#stxmsg').focus();
  ov.querySelector('#stxno').onclick=function(){ov.remove()};
  ov.querySelector('#stxgo').onclick=function(){var m=ov.querySelector('#stxmsg');if(!m.value.trim()){m.style.borderColor='#c20016';m.focus();return}
    ov.querySelector('.box').innerHTML='<h3 style="color:#157347">✓ Text sent to '+names.length+' '+(names.length>1?'people':'person')+'</h3><p style="margin:0 0 10px">'+names.join(', ')+'</p><div class="note">Demo only. Nothing was actually sent.</div><div class="act"><span class="btn primary" id="stxok">Done</span></div>';
    ov.querySelector('#stxok').onclick=function(){ov.remove()};toast('Text sent to '+names.length+' '+(names.length>1?'people':'person'))}},true);
})();
