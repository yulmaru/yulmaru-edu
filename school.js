(() => {
  'use strict';
  const $ = s => document.querySelector(s);
  const content = window.SCHOOL_CONTENT;
  let role = 'accused';
  let faqCategory = '조치';
  const sideName = () => role === 'accused' ? '신고 받은 학생 측' : '피해학생 측';
  const laws = 'https://www.law.go.kr/법령/학교폭력예방및대책에관한법률';
  const firm = id => `https://yulmaru.co.kr/bbs/board.php?bo_table=case&wr_id=${id}`;
  const courtSource = 'https://www.newsis.com/view/NISX20250421_0003146698';
  const scenariosAnswers = {
    accused: ['신고 내용과 실제 행동을 나누고, 하지 않은 행동을 뒷받침할 대화·영상·목격 자료를 확인하세요.','누가 먼저 무엇을 했는지, 서로의 행동 순서와 정도를 구분해 기록하세요.','친한 사이였다는 이유만으로 판단이 끝나지 않습니다. 거부 표현, 반복 여부와 실제 피해를 함께 살펴야 합니다.','현장에 있었던 사실과 실제 가담은 구분해야 합니다. 말과 행동, 현장을 떠난 시점 등을 정리하세요.','학생마다 한 말과 행동이 다릅니다. 자녀의 행동 범위와 다른 학생의 행동을 구분해 확인하세요.','인정하는 사실과 다투는 사실을 분리하고 각각의 자료를 정리하세요.','먼저 있었던 공격과 대응 행동을 시간순으로 확인하고, 당시 상황을 보여주는 자료를 보존하세요.','대화 전체를 보존해 직접 발언, 동조, 전달 여부와 참여 시점을 확인하세요.','반응의 내용·횟수와 전체 맥락에 따라 판단이 달라질 수 있습니다. 앞뒤 대화를 함께 확인하세요.'],
    victim: ['상대의 의도 설명뿐 아니라 실제 행동, 반복 여부와 아이에게 생긴 피해를 함께 기록하세요.','학교 밖에서 학생을 대상으로 일어난 행위도 학교폭력이 될 수 있습니다. 장소·시점·참여자를 정리하세요.','온라인 욕설·따돌림 등도 학교폭력에 해당할 수 있습니다. 계정과 날짜가 보이는 대화 원본을 보존하세요.','아이의 진술 외에 상담기록, 담임과 나눈 연락, 목격학생 등 보완 자료를 찾아보세요.','처음 알게 된 시점과 사건 발생 시점을 나눠 기록하고 남아 있는 대화·상담 자료를 확보하세요.','반복적으로 배제된 날짜와 상황, 대화, 학교생활 변화를 구체적으로 남겨두세요.','학생별로 어떤 행동을 했는지 나누고, 함께 이루어진 행동과 반복된 피해를 정리하세요.','피해 신고와 상대방 신고 내용을 각각 정리하세요. 아이의 대응 행동과 그 이전의 피해를 함께 확인해야 합니다.','사과·화해 내용과 이후 새로 발생한 행동을 구분해 보존하고 학교에 현재 상황을 알리세요.']
  };
  const warnings = {
    accused: ['자료를 임의로 삭제하지 마세요.','상대 학생에게 직접 연락하지 마세요.','다른 학생에게 유리한 진술을 부탁하지 마세요.','아이에게 답변을 정해주지 마세요.','사실관계를 확인하기 전에 무조건 부인하거나 인정하지 마세요.'],
    victim: ['카톡·DM을 지우지 마세요.','상대 학생과 직접 문제를 해결하려 하지 마세요.','사건 내용을 SNS에 공개하지 마세요.','기억에만 의존하지 말고 기록을 남기세요.','아이에게 같은 내용을 반복해서 캐묻지 마세요.']
  };
  const evidence = [
    ['카카오톡·문자','사건 전후 대화, 두 학생의 관계, 갈등이 시작된 경위','phone'],
    ['단체채팅방','누가 어떤 말을 했는지, 참여 정도, 앞뒤 대화','chat'],
    ['SNS·DM','욕설·비방·사진 전송 등의 실제 내용','social'],
    ['사진·영상','당시 행동과 현장 상황','photo'],
    ['CCTV','사건 발생 과정과 전후 상황','cctv'],
    ['통화·녹음','사건 이후 당사자 사이에 오간 내용','wave'],
    ['목격학생','당시 현장을 직접 본 학생이 있는지','people'],
    ['게임 채팅·접속기록','온라인에서 발생한 사건의 대화와 시점','game'],
    ['학교와 주고받은 자료','담임 연락, 사실확인서, 학교 안내문 등','folder'],
    ['사건 경위 메모','날짜·장소·참여학생·일어난 일을 시간순으로','note']
  ];
  const drawings = {
    phone:'<rect x="43" y="12" width="54" height="88" rx="11" fill="#fff"/><rect x="50" y="24" width="40" height="59" rx="4" fill="#dceeff"/><path d="M61 19h18M65 92h10"/><path d="M54 34h29v17H67l-7 5v-5h-6z" fill="#5ea3ff"/><path d="M61 62h24v13H61z" fill="#fff"/>',
    chat:'<path d="M22 24h72a10 10 0 0 1 10 10v34a10 10 0 0 1-10 10H54L35 94V78H22a10 10 0 0 1-10-10V34a10 10 0 0 1 10-10z" fill="#fff"/><path d="M55 51h63v31H99l-1 12-15-12H55z" fill="#82b6ff"/><circle cx="34" cy="46" r="3"/><circle cx="50" cy="46" r="3"/><circle cx="66" cy="46" r="3"/>',
    social:'<rect x="29" y="12" width="75" height="86" rx="10" fill="#fff"/><circle cx="42" cy="25" r="4" fill="#82b6ff"/><path d="M53 25h32"/><rect x="37" y="35" width="59" height="37" rx="4" fill="#dceeff"/><path d="M47 63l13-16 12 10 9-8 11 15"/><path d="M97 78l26-9-7 25-7-9-12-7zm12 7 14-16" fill="#73aafd"/>',
    photo:'<rect x="16" y="30" width="100" height="63" rx="10" fill="#fff"/><path d="M39 30l7-14h37l8 14" fill="#8abaff"/><circle cx="67" cy="60" r="23" fill="#cbe3ff"/><circle cx="67" cy="60" r="13" fill="#739bea"/><path d="M27 41h9"/>',
    cctv:'<path d="M20 32l75-13 18 35-66 16z" fill="#fff"/><path d="M95 19l23 13 12 23-17-1z" fill="#8abaff"/><path d="M66 67v18h38v-9M104 65v30"/><circle cx="112" cy="43" r="7" fill="#355c9e"/><path d="M19 32l-5-10 64-12"/>',
    wave:'<rect x="10" y="24" width="120" height="64" rx="12" fill="#fff"/><path d="M23 56h8m7-10v20m10-30v40m10-25v10m10-39v69m10-47v25m10-39v51m10-34v18m10-9h9" stroke="#639fee" stroke-width="5"/><circle cx="120" cy="34" r="3" fill="#8e78da"/>',
    people:'<circle cx="71" cy="30" r="16" fill="#fff"/><path d="M43 100V78c0-35 56-35 56 0v22" fill="#83b4ff"/><circle cx="27" cy="43" r="12" fill="#fff"/><path d="M7 96V80c0-22 27-30 38-10" fill="#c7dfff"/><circle cx="114" cy="43" r="12" fill="#fff"/><path d="M99 68c13-13 34-5 34 14v14" fill="#c7dfff"/>',
    game:'<path d="M33 33h74c13 0 26 53 16 60-11 6-26-12-32-14H50c-7 2-25 23-34 13-10-9 6-59 17-59z" fill="#fff"/><path d="M70 32V18h18"/><path d="M31 58h22m-11-11v22" stroke-width="6"/><circle cx="95" cy="52" r="5" fill="#8abaff"/><circle cx="106" cy="65" r="5" fill="#9d8ae7"/>',
    folder:'<path d="M18 26h42l12 12h49v57H18z" fill="#91bcff"/><rect x="30" y="16" width="67" height="70" rx="4" fill="#fff"/><path d="M41 32h42M41 44h35M41 56h39"/><path d="M13 52h116l-12 47H24z" fill="#c9e1ff"/>',
    note:'<path d="M29 15h74v84H29z" fill="#fff"/><path d="M42 12v10m15-10v10m15-10v10m15-10v10M42 39h43M42 52h33M42 65h20M42 80h24"/><path d="M102 43l10 6-26 43-13 7 1-16z" fill="#84b4ff"/>'
  };
  function objectSVG(type) { return `<svg viewBox="0 0 140 112" aria-hidden="true" fill="none" stroke="#325581" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="70" cy="101" rx="50" ry="7" fill="#d9e6fa" stroke="none"/>${drawings[type]}</svg>`; }
  $('#evidence-list').innerHTML = evidence.map(([name,desc,type],i)=>`<article class="sw-evidence-item"><span class="sw-evidence-no">${String(i+1).padStart(2,'0')}</span>${objectSVG(type)}<h3>${name}</h3><p>${desc}</p></article>`).join('');
  const lawyers = [['박상준','park-sang-jun'],['임재현','im-jae-hyun'],['문지영','moon-ji-young'],['이주원','lee-ju-won']];
  $('#lawyer-list').innerHTML = lawyers.map(([name,file],i)=>`<article class="sw-lawyer"><div class="sw-lawyer-photo"><span>YULMARU<br>FACULTY ${String(i+1).padStart(2,'0')}</span><img src="assets/lawyer-${file}.webp" alt="${name} 변호사" loading="lazy"></div><div class="sw-lawyer-name"><h4>${name}<small>변호사</small></h4><a href="https://yulmaru.co.kr/page/member_list.php" target="_blank" rel="noopener noreferrer" aria-label="${name} 변호사 소개 보기">↗</a></div></article>`).join('');
  const measures = [['서면사과','피해학생에 대한 서면사과'],['접촉·협박·보복 금지','피해학생 및 신고·고발 학생에 대한 금지 조치'],['학교에서의 봉사','학교 내에서 정해진 봉사 이행'],['사회봉사','학교 밖 지정 기관 등에서 봉사'],['특별교육·심리치료','전문가에 의한 특별교육 이수 또는 심리치료'],['출석정지','정해진 기간 동안 출석 정지'],['학급교체','소속 학급 변경'],['전학','다른 학교로 전학'],['퇴학처분','의무교육과정에 있는 학생에게는 적용하지 않음']];
  const groups = {
    accused: {'조치':['조치 결과','조치 이행'],'학교생활':['학생부','기록 삭제','진학·대입','전학'],'결과 불복':['결과 불복','행정심판','행정소송','집행정지'],'소년·형사':['경찰 사건','소년사건','형사사건'],'배상':['손해배상 요구','민사소송']},
    victim: {'보호':['상대 학생 조치','피해학생 보호','분리','학교생활','상담·치료','추가 피해','접촉·보복','보호조치 미이행'],'결과 불복':['결과 부족','피해 일부 불인정','행정심판','행정소송'],'형사':['경찰 신고','형사절차'],'배상':['손해배상','민사소송']}
  };
  const victimAppeal = content.faq.victim.find(x=>x[0]==='행정심판');
  victimAppeal[1] = '상대 학생 조치가 너무 가벼운데 행정심판을 할 수 있나요?';
  victimAppeal[2] = '가능합니다. 피해학생이나 보호자는 피해학생 보호조치뿐 아니라 가해학생에게 내려진 조치에 이의가 있는 경우에도 행정심판을 검토할 수 있습니다.';
  content.faq.victim.push(['보호조치 미이행','학교에서 결정된 보호조치를 제대로 해주지 않으면 어떻게 하나요?','학교와 교육지원청에 결정 내용과 미이행 상황을 알리고 이행을 요청하세요. 또한 학교폭력예방법 제17조제16항은 같은 조 제9항·제10항·제15항에 따른 조치 또는 징계가 지연되거나 이행되지 않으면 교육감에게 신고할 수 있도록 규정하고 있습니다. 보호조치 미이행에 대한 요청과 이 신고제도의 적용 요건은 구분해 확인해야 합니다.']);
  function renderFAQs() {
    const selected = groups[role][faqCategory];
    $('#faq-tabs').innerHTML = Object.entries(groups[role]).map(([name,items])=>`<button type="button" data-faq-category="${name}" aria-pressed="${name===faqCategory}"><span>${name}</span><small>${items.length}</small><b>→</b></button>`).join('');
    $('#faq-list').innerHTML = content.faq[role].filter(row=>selected.includes(row[0])).map(([label,q,a])=>`<details class="sw-faq"><summary><span class="sw-q">Q.</span><span><small>${label}</small>${q}</span><b aria-hidden="true">+</b></summary><div class="sw-answer"><span>A.</span><p>${a}${label==='행정심판'||label==='보호조치 미이행'?` <a href="${laws}" target="_blank" rel="noopener noreferrer">관련 법령 ↗</a>`:''}</p></div></details>`).join('');
    $('#faq-count').textContent = `전체 ${content.faq[role].length}개 질문 · ${faqCategory} ${selected.length}개`;
  }
  function renderCases() {
    const cases = role === 'accused' ? [
      {type:'학폭위',source:'법무법인 율마루 수행사례',title:'쌍방 다툼, 한쪽만 신고됐다면',desc:'사건 전 메시지와 당시 행동을 함께 제출해 의뢰 학생의 방어 경위를 설명했습니다.',result:'의뢰 학생 조치 없음',url:firm(122)},
      {type:'행정',source:'법무법인 율마루 수행사례',title:'가담 정도와 조치가 맞지 않는다면',desc:'학폭위 기록과 실제 가담 범위를 바탕으로 행정심판을 진행한 사례입니다.',result:'4호 사회봉사 → 2호 접촉금지',url:firm(113)},
      {type:'소년·형사',source:'법무법인 율마루 수행사례',title:'학폭위와 별도로 진행된 소년재판',desc:'학생 강제추행 혐의 소년보호사건에서 보호처분의 필요성이 없다고 판단한 사례입니다. 학폭위 조치 결과와는 구분됩니다.',result:'소년보호처분 없이 불처분 결정',url:firm(98)},
      {type:'민사',source:'부산지방법원 동부지원 · 보도 사례',title:'서면사과 이후에도 배상책임은 별도로',desc:'학교폭력 조치와 별도로 학생과 부모의 배상책임이 인정된 사례입니다. 신고 측의 승소사례가 아닌 책임 범위 참고자료입니다.',result:'학생·부모 합계 2,200만 원 배상',url:courtSource,external:true}
    ] : [
      {type:'학폭위',source:'법무법인 율마루 수행사례',title:'영상이 없어도, 남아 있는 기록으로',desc:'상담기록과 학교생활의 변화, 목격학생의 진술을 연결해 피해를 설명했습니다.',result:'반복 피해 인정 · 가해학생 조치',url:firm(110)},
      {type:'민사',source:'부산지방법원 동부지원 · 보도 사례',title:'학교 조치와 별개로 피해 회복을',desc:'돌에 맞아 얼굴에 상처를 입은 피해학생 사건에서 치료와 흉터 등의 손해를 살펴 배상책임이 인정됐습니다.',result:'학생·부모 합계 2,200만 원 배상',url:courtSource,external:true}
    ];
    $('#case-list').innerHTML=cases.map((c,i)=>`<article class="sw-case"><div class="sw-case-top"><span class="sw-case-index">CASE ${String(i+1).padStart(2,'0')}</span><span class="sw-tag">${c.type}</span><span class="sw-tag sw-tag-side">${role==='accused'?'신고 측':'피해 측'}${c.external?' 참고':''}</span></div><small>${c.source}</small><h4>${c.title}</h4><p>${c.desc}</p><strong class="sw-case-result">${c.result}</strong><a href="${c.url}" target="_blank" rel="noopener noreferrer">${c.external?'보도 원문':'사례 원문'} 확인 <span>↗</span></a></article>`).join('');
  }
  function renderCommittee() {
    const questions = ['무엇을 보고 판단할까?','무엇을 설명해야 할까?','무엇을 준비할까?','어떤 결과가 나올까?'];
    const answers = role==='accused' ? ['행위 내용, 심각성·지속성·고의성, 가담 정도, 반성·화해 등을 살핍니다.','실제 행동 범위, 사건 경위, 가담 정도, 상대 주장과 다른 부분을 설명합니다.','사건 경위와 대화 전체 맥락, CCTV, 의견자료 등을 준비합니다.','몇 호 조치를 받게 되는지, 학교생활에 어떤 영향을 주는지 확인합니다.'] : ['피해 내용, 기간·반복성, 피해 정도와 제출자료 등을 살핍니다.','피해 발생 과정, 반복된 내용, 현재 피해상황과 보호 필요성을 설명합니다.','피해 증거, 진료·상담자료, 대화·영상과 의견자료 등을 준비합니다.','상대 학생에 대한 조치와 우리 아이에게 필요한 보호조치를 함께 확인합니다.'];
    $('#committee-questions').innerHTML = questions.map((q,i)=>`<article><span>QUESTION 0${i+1}</span><h3>${q}</h3><p>${answers[i]}</p></article>`).join('');
    const list = `<ol class="sw-measures">${measures.map(([name,desc],i)=>`<li><span>${i+1}<small>호</small></span><div><h4>${name}</h4><p>${desc}</p></div></li>`).join('')}</ol>`;
    const note = '<p class="sw-fine">가해학생 조치는 복수로 부과될 수 있습니다. 2~4호·6~8호 조치를 받은 학생은 특별교육 또는 심리치료도 받아야 합니다.</p>';
    $('#result-title').textContent = role==='accused'?'학폭위 결과, 무엇이 달라질까요?':'학폭위 결과, 무엇이 결정될까요?';
    $('#result-content').innerHTML = role==='accused' ? `${list}${note}<div class="sw-impact">${[['학생부 기록','조치별 기재·보존 기준 확인'],['전학','8호 조치의 실제 이행 확인'],['특별교육','교육·심리치료 일정 확인'],['출석정지','기간과 학습 지원 확인']].map(([a,b])=>`<div><strong>${a}</strong><span>${b}</span></div>`).join('')}</div>` : `<div class="sw-victim-results"><div><h4 class="sw-result-subtitle">상대 학생에 대한 조치 <span>1–9호</span></h4>${list}${note}</div><div class="sw-protection"><span class="sw-protection-icon"><i class="fa-solid fa-shield-heart" aria-hidden="true"></i></span><h4>우리 아이를 위한<br>보호조치</h4><p>처분 이후에도 아이의 안전과<br>회복을 함께 확인해야 합니다.</p><ul><li><b>상담</b><span>심리상담 및 조언</span></li><li><b>일시보호</b><span>안전한 환경에서의 보호</span></li><li><b>치료·요양</b><span>신체·심리 회복을 위한 지원</span></li><li><b>학급교체 등</b><span>필요한 보호와 학교생활 지원</span></li></ul><a href="${laws}" target="_blank" rel="noopener noreferrer">학교폭력예방법 제16조 ↗</a></div></div>`;
  }
  function setRole(next, announce=true) {
    if (!['accused','victim'].includes(next)) return;
    const previousRole=role;
    // Keep the current reading position when switching from the fixed status bar.
    const stages=[...document.querySelectorAll('[data-stage]')];
    const readingBoundary=$('.sw-status').getBoundingClientRect().bottom+70;
    const anchor=stages.findLast(el=>el.getBoundingClientRect().top<=readingBoundary);
    const anchorTop=anchor?.getBoundingClientRect().top;
    role=next;
    document.body.dataset.role=role;
    document.querySelectorAll('[data-role-choice]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.roleChoice===role)));
    $('#hero-description').innerHTML = role==='accused'?'학교에서 연락을 받은 순간, 막막하셨나요?<br>사실을 정리하는 첫걸음부터 함께하겠습니다.':'아이의 힘든 이야기를 들은 순간, 막막하셨나요?<br>안전한 일상을 되찾는 첫걸음부터 함께하겠습니다.';
    $('#scenario-title').textContent = role==='accused'?'“이것도 우리 아이 책임인가요?”':'“이런 상황도 피해라고 말할 수 있을까요?”';
    $('#scenario-list').innerHTML = content.scenarios[role].map(([title,desc],i)=>`<details class="sw-scenario"><summary><span class="sw-scenario-no">${String(i+1).padStart(2,'0')}</span><h4>${title}</h4><p>${desc}</p><b aria-hidden="true">+</b></summary><div class="sw-scenario-answer">${scenariosAnswers[role][i]}</div></details>`).join('');
    $('#case-side').textContent=sideName();
    $('#evidence-intro').textContent = role==='accused'?'불리해 보인다고 지우면 절대 안 됩니다.':'사라지기 전에 자료부터 남겨두세요.';
    $('#warning-list').innerHTML = warnings[role].map(text=>`<li><span aria-hidden="true">×</span>${text}</li>`).join('');
    const vid=role==='accused'?'9r0ESX53e5Q':'qletpJsUEWU';
    $('#video-link').href=`https://www.youtube.com/watch?v=${vid}`;
    $('#video-image').src=`https://i.ytimg.com/vi/${vid}/hqdefault.jpg`;
    $('#video-title').textContent=role==='accused'?'학폭위 출석 전, 반드시 준비해야 할 5가지':'학폭 피해시 절대 하면 안 되는 5가지';
    $('#faq-side').textContent=sideName()+' Q&A';
    faqCategory=Object.keys(groups[role])[0];
    renderCases();renderCommittee();renderFAQs();
    if(announce) $('#role-announcement').textContent=`${sideName()} 안내로 전체 콘텐츠가 변경되었습니다.`;
    if(anchor && previousRole!==role) window.scrollBy({top:anchor.getBoundingClientRect().top-anchorTop,behavior:'instant'});
    updateStage();
  }
  function updateStage(){
    const boundary=$('.sw-status').getBoundingClientRect().bottom+70;
    let active=0;
    document.querySelectorAll('[data-stage]').forEach(section=>{if(section.getBoundingClientRect().top<=boundary) active=Number(section.dataset.stage);});
    document.querySelectorAll('.sw-steps a').forEach((a,i)=>{if(i===active)a.setAttribute('aria-current','step');else a.removeAttribute('aria-current');});
    $('.sw-steps').style.setProperty('--active-step',active);
  }
  $('#school-footer').outerHTML=window.siteFooterHTML;
  document.addEventListener('click',event=>{
    const choice=event.target.closest('[data-role-choice]');
    if(choice) setRole(choice.dataset.roleChoice);
    const tab=event.target.closest('[data-faq-category]');
    if(tab){faqCategory=tab.dataset.faqCategory;renderFAQs();$(`[data-faq-category="${faqCategory}"]`).focus({preventScroll:true});}
  });
  let ticking=false;
  window.addEventListener('scroll',()=>{if(!ticking){requestAnimationFrame(()=>{updateStage();ticking=false;});ticking=true;}},{passive:true});
  window.addEventListener('resize',updateStage);
  new ResizeObserver(updateStage).observe($('#school-main'));
  setRole('accused',false);
})();
