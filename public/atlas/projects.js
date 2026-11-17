window.projects = [
  {
    "name": "말이음 · SpeechBridge",
    "slug": "mj_dialog",
    "icon": "🗣️",
    "state": "미확인",
    "purpose": "발화·의사소통 연습",
    "desc": "읽기·구강·호흡 훈련과 녹음 비교, AI 대화를 제공하는 Flutter 연습 보조 앱.",
    "flow": [
      "목표·피로도 설정",
      "오늘의 연습 선택",
      "발화·녹음",
      "재생·비교",
      "기록 확인"
    ],
    "version": "소스 1.0.0+1",
    "repo": "https://github.com/clevekim00/mj_dialog",
    "live": null,
    "note": "소스 구현 및 기기 release 실행 안내 있음. 스토어 출시 확인 없음."
  },
  {
    "name": "SignBridge · LinguaSign",
    "slug": "mj_sign",
    "icon": "🤟",
    "state": "미확인",
    "purpose": "수어 입력 플랫폼",
    "desc": "SignInputKit SDK의 landmark 입력을 백엔드·모델로 연결하고 문장으로 보정하는 플랫폼.",
    "flow": [
      "landmark 입력",
      "WebSocket Protobuf",
      "세션 버퍼·모델 라우팅",
      "인식",
      "LLM 문장 보정"
    ],
    "version": "소스 0.0.1",
    "repo": "https://github.com/clevekim00/mj_sign",
    "live": null,
    "note": "SDK manifest 버전. 기본 샘플은 demo landmark/mock 모델이며 실모델·카메라 제품화는 후속."
  },
  {
    "name": "MJ Video Intelligence",
    "slug": "mj_video_intelligence",
    "icon": "🎞️",
    "state": "미확인",
    "purpose": "선택적 영상 분석",
    "desc": "허용된 자막·프레임 근거를 제한된 모델 도구 루프로 분석하는 독립 Python 패키지와 CLI.",
    "flow": [
      "근거 준비",
      "목적·스키마 지정",
      "필요한 근거 탐색",
      "구조화 결과·근거 검증"
    ],
    "version": "소스 0.1.0",
    "repo": "https://github.com/clevekim00/mj_video_intelligence",
    "live": null,
    "note": "README와 manifest가 Alpha 명시. OCR·비전 미지원; 안정 릴리스 확인 없음."
  },
  {
    "name": "MJ Local LLM Hub",
    "slug": "mj_llm_wapper",
    "icon": "🧠",
    "state": "미확인",
    "purpose": "로컬 모델 설치·대화",
    "desc": "기기 사양에 맞는 모델을 추천·설치하고 로컬 대화·임베딩 API를 제공하는 Rust 도구.",
    "flow": [
      "기기 확인",
      "모델 추천",
      "무결성 검증 설치",
      "로컬 서버",
      "짧은 대화·임베딩"
    ],
    "version": "소스 0.1.0",
    "repo": "https://github.com/clevekim00/mj_llm_wapper",
    "live": null,
    "note": "macOS CPU 짧은 대화 미리보기. mj-llm 내장 LiteRT-LM 기본, Ollama는 명시적 선택. 모바일 native 미지원."
  },
  {
    "name": "SpacePals",
    "slug": "mj_space",
    "icon": "🪐",
    "state": "미확인",
    "purpose": "macOS 플로팅 런처",
    "desc": "Spaces 사이에서도 보이는 작은 런처로 VS Code·Notion·Chrome 등 앱을 활성화.",
    "flow": [
      "런처 실행",
      "대상 앱 설정",
      "버튼 선택",
      "해당 앱·Space로 이동"
    ],
    "version": "버전 미확인",
    "repo": "https://github.com/clevekim00/mj_space",
    "live": null,
    "note": "소스 실행 안내 있음. manifest 제품 버전 없음; Swift 6.0은 도구 버전이지 앱 버전 아님."
  },
  {
    "name": "Desktop Avatar Toy",
    "slug": "mj_desktop_avatar",
    "icon": "👾",
    "state": "미확인",
    "purpose": "데스크톱 캐릭터",
    "desc": "캐릭터가 걷고 반응하는 macOS Swift/AppKit 토이. 공통 C++/Cocos2d-x 경로는 이식 방향.",
    "flow": [
      "실행",
      "캐릭터·언어 선택",
      "클릭·드래그·포인터 반응",
      "메뉴바 제어"
    ],
    "version": "README v1.0",
    "repo": "https://github.com/clevekim00/mj_desktop_avatar",
    "live": null,
    "note": "README v1.0 표기, 실행 가능한 macOS 프로토타입. manifest 제품 버전 없음; GitHub release 없음."
  },
  {
    "name": "ApiLens",
    "slug": "ApiLens",
    "icon": "🔬",
    "state": "공개 확인",
    "purpose": "시각적 API 개발·자동화",
    "desc": "REST·WebSocket·GraphQL 요청과 시각적 워크플로를 묶는 Flutter 도구.",
    "flow": [
      "워크그룹 생성·스펙 가져오기",
      "요청 구성",
      "노드 연결",
      "실행·응답 디버깅"
    ],
    "version": "배포 파일 v1.0.0",
    "repo": "https://github.com/clevekim00/ApiLens",
    "live": null,
    "note": "저장소에 macOS v1.0.0 ZIP 배포 파일 존재(63,606,417 bytes). GitHub Release/tag는 없음. 다른 플랫폼 소스 빌드 안내."
  },
  {
    "name": "MJ LLM",
    "slug": "mj-llm",
    "icon": "⚙️",
    "state": "미확인",
    "purpose": "내장 로컬 멀티모달 AI 런타임",
    "desc": "Ollama/Python 별도 설치 없는 제품을 목표로 하는 Rust·LiteRT-LM 프로젝트.",
    "flow": [
      "모델 무결성 검증",
      "native 로드",
      "텍스트·이미지 임베딩/생성",
      "unload"
    ],
    "version": "소스 0.1.0",
    "repo": "https://github.com/clevekim00/mj-llm",
    "live": null,
    "note": "N0 macOS CPU 기술검증 단계. 사용자 앱과 다른 플랫폼 adapter는 미구현. mj_llm과 동일 프로젝트인지 추가 확인 필요."
  },
  {
    "name": "MJ Call",
    "slug": "mj_call",
    "icon": "📞",
    "state": "미확인",
    "purpose": "접근성 통화 도우미",
    "desc": "말이음에서 분리한 플랫폼 네이티브 앱. 준비 문장·TTS·동의 후 마이크 녹음·결과 메모 제공.",
    "flow": [
      "문의 목적·문장 준비",
      "별도 전화 스피커폰",
      "보조 기기 TTS·선택 녹음",
      "결과 기록"
    ],
    "version": "버전 미확인",
    "repo": "https://github.com/clevekim00/mj_call",
    "live": null,
    "note": "수동 보조 초기 구현. 자동 발신·종료 및 AI 자동 통화 없음. 서명·배포·실기기 통화 품질 별도 검증."
  },
  {
    "name": "MJ Proto Assist",
    "slug": "mj_proto_assist",
    "icon": "📐",
    "state": "미확인",
    "purpose": "로컬 HTTP Protobuf 도구",
    "desc": "Kotlin Core·CLI/stdio·Spring Boot API·React UI로 ProtoJSON/Protobuf를 변환하고 HTTP POST를 확인.",
    "flow": [
      "descriptor 등록",
      "메시지 타입 선택",
      "JSON 인코딩",
      "명시적 POST",
      "응답 디코딩"
    ],
    "version": "버전 미확인",
    "repo": "https://github.com/clevekim00/mj_proto_assist",
    "live": null,
    "note": "초기 구현. 전체 MVP·ApiLens 실제 연동 미완료. root build 파일에서 제품 버전 확인 안 됨."
  }
];

window.projects.push({
  "name": "mj_repo_saas",
  "slug": "mj_repo_saas",
  "icon": "▦",
  "state": "미확인",
  "purpose": "개인 프로젝트와 저장소 현황 정리",
  "desc": "여러 저장소를 프로젝트 단위로 정리하는 대시보드.",
  "flow": [
    "저장소 주소 입력",
    "GitHub 또는 GitLab 조회",
    "프로젝트 카드 표시"
  ],
  "repo": "https://github.com/clevekim00/mj_repo_saas",
  "note": "공개 커밋 365ab5b의 코드 구조를 분석했습니다."
});
