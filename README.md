# 부산학폭전문변호사 랜딩페이지

실행: 이 폴더에서 `python -m http.server 4317 --bind 127.0.0.1` 후 http://127.0.0.1:4317 접속.

## 구성

- `index.html`: 페이지 구조와 SEO 메타데이터.
- `school.css`: 신규 학교 안내서 디자인. 공통 UI를 덮어쓰지 않도록 `sw-` 접두사 사용.
- `school.js`: 신고/피해 단일 상태, 스크롤 단계 표시, 상황별 사례·결과·FAQ 렌더링.
- `school-content.js`: 사용자 제공 상황 9개씩과 Q&A 15개씩. 피해 측 보호조치 미이행 질문은 실행 시 추가.
- `shared-header.js`, `footer-data.js`, `quick-ui.js` 및 기존 CSS: 형사_광고(뉴2) 원본. 상단바·푸터·모바일 메뉴 내 사이트 명칭만 부산학폭전문변호사로 변경.
- `shared-links.js`: 복사하지 않은 형사 분야·자가진단·오시는길 페이지는 기존 형사 사이트의 같은 경로로 연결.

공통 UI의 색상과 기능은 원본을 유지했습니다. 새 본문의 상태 선택은 페이지를 새로 열면 ‘신고 받았어요’로 시작하며 브라우저 저장소나 서버로 전송하지 않습니다.

## 콘텐츠 출처 (2026-09-29 확인)

- 율마루 신고 측 학폭위 사례: https://yulmaru.co.kr/bbs/board.php?bo_table=case&wr_id=122
- 율마루 신고 측 행정심판 사례: https://yulmaru.co.kr/bbs/board.php?bo_table=case&wr_id=113
- 율마루 신고 측 소년보호 사례: https://yulmaru.co.kr/bbs/board.php?bo_table=case&wr_id=98
- 율마루 피해 측 학폭위 사례: https://yulmaru.co.kr/bbs/board.php?bo_table=case&wr_id=110
- 부산지방법원 동부지원 민사 판결: https://www.newsis.com/view/NISX20250421_0003146698 (2025-04-21 뉴시스 보도). 판결문 원문이나 사건번호는 확인되지 않았으므로 **보도 사례**로 표시. 율마루 수행사례가 아님. 신고 측에서는 책임 범위 참고, 피해 측에서는 배상 참고로 표시.
- 법령: https://www.law.go.kr/법령/학교폭력예방및대책에관한법률 — 제16조, 제17조, 제17조의2. 보호조치 미이행 대응과 제17조제16항의 한정된 신고 범위를 구분.
- 변호사 소개: https://yulmaru.co.kr/page/member_list.php
- 유튜브: https://www.youtube.com/@yulmaru_d/videos — 기존 학폭 프로젝트의 채널 및 영상 ID 재사용. 조회수·게시일 등 변동 정보는 표시하지 않음.

## 이미지

기존 프로젝트의 율마루 로고·변호사 사진·학교 복도 이미지 재사용. 학교 복도는 설명용 이미지. 증거자료 오브젝트 10종은 신규 SVG 일러스트. 영상 썸네일은 YouTube 원본 URL 사용.

현재는 로컬 미리보기이며 외부 사이트에 배포하지 않았습니다.
