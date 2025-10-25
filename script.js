// Minimal exam logic
(function(){
const params = new URLSearchParams(location.search);
const student = params.get('name') || '';
const unit = params.get('unit') || 'unit2';
if(location.pathname.endsWith('exam.html')){
  document.getElementById('student').textContent = 'الاسم: '+student;
  fetch('exams/unit2.json').then(r=>r.json()).then(data=>{
    const bank = data.questions;
    const shuffled = bank.slice().sort(()=>Math.random()-0.5);
    const selected = shuffled.slice(0, Math.min(40, bank.length));
    let idx=0; const answers={};
    const progress = document.getElementById('progress');
    const qarea = document.getElementById('qarea');
    function render(){
      const q = selected[idx];
      progress.textContent = 'السؤال '+(idx+1)+' من '+selected.length;
      qarea.innerHTML = '<div><strong>س'+(idx+1)+':</strong> '+q.question+'</div>';
      if(q.image){ qarea.innerHTML += '<img class="qimg" src="'+q.image+'"><div style="font-size:12px;color:#000">إعداد المعلم: محمد ملكاوي</div>'; }
      qarea.innerHTML += '<div class="options"></div>';
      const opts = q.options;
      const optdiv = qarea.querySelector('.options');
      opts.forEach((o,i)=>{ const id='o'+i; const lab=document.createElement('label'); lab.innerHTML = '<input type="radio" name="opt" value="'+i+'" '+(answers[q.id]===i?'checked':'')+'> '+o; lab.style.display='block'; lab.style.marginTop='6px'; lab.onclick=()=>{ answers[q.id]=i; }; optdiv.appendChild(lab); });
    }
    document.getElementById('prev').addEventListener('click', ()=>{ if(idx>0){ idx--; render(); } });
    document.getElementById('next').addEventListener('click', ()=>{ if(idx<selected.length-1){ idx++; render(); } });
    document.getElementById('finish').addEventListener('click', ()=>{
      if(!confirm('هل أنت متأكد من إنهاء الامتحان؟ لا يمكنك التعديل بعد الإنهاء.')) return;
      let correct=0; const details=[];
      selected.forEach(q=>{ const given = (answers[q.id]===undefined)?null:answers[q.id]; const ok = given===q.answer; if(ok) correct++; details.push({question:q.question, given: given===null?null:q.options[given], correct:q.options[q.answer], ok}); });
      const score = Math.round((correct/selected.length)*100);
      const result={name:student, unit:unit, score:score, correct:correct, total:selected.length, date:new Date().toISOString(), details};
      const arr = JSON.parse(localStorage.getItem('exam_results')||'[]'); arr.unshift(result); localStorage.setItem('exam_results', JSON.stringify(arr));
      location.href='result.html?data='+encodeURIComponent(JSON.stringify(result));
    });
    render();
  });
}
if(location.pathname.endsWith('result.html')){
  const p = new URLSearchParams(location.search).get('data');
  const r = p?JSON.parse(decodeURIComponent(p)): (JSON.parse(localStorage.getItem('exam_results')||'[]')[0]||null);
  if(r){ document.getElementById('summary').innerHTML = '<div><strong>الاسم:</strong> '+r.name+' — <strong>النتيجة:</strong> '+r.score+'% ('+r.correct+' من '+r.total+')</div>'; const d=document.getElementById('details'); r.details.forEach((it,i)=>{ const div=document.createElement('div'); div.innerHTML = '<div><strong>س'+(i+1)+':</strong> '+it.question+'</div><div>إجابتك: '+(it.given||'لم تجب')+'</div><div>الصحيح: '+it.correct+'</div><div style="color:'+(it.ok? 'green':'red')+'">'+(it.ok? 'صحيح':'خاطئ')+'</div>'; d.appendChild(div); }); }
}
})();