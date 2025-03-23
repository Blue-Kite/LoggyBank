const createTimeBlocks = (): TimeBlock[] => {
  return [
    {
      startTime: '09:00',
      endTime: '10:00',
      description: '일일 스크럼 미팅 참석',
    },
    {
      startTime: '10:00',
      endTime: '11:00',
      description: '이메일 확인 및 응답',
    },
    { startTime: '11:00', endTime: '12:00', description: '프로젝트 문서 작성' },
    { startTime: '13:00', endTime: '14:00', description: '팀 회의' },
    { startTime: '14:00', endTime: '15:00', description: '코드 리뷰' },
    { startTime: '15:00', endTime: '16:00', description: '버그 수정' },
    { startTime: '16:00', endTime: '17:00', description: '테스트 작성' },
    { startTime: '17:00', endTime: '18:00' },
  ];
};

const createEmptyTimeBlocks = (): TimeBlock[] => {
  return [
    { startTime: '09:00', endTime: '10:00' },
    { startTime: '10:00', endTime: '11:00' },
    { startTime: '11:00', endTime: '12:00' },
    { startTime: '13:00', endTime: '14:00' },
    { startTime: '14:00', endTime: '15:00' },
    { startTime: '15:00', endTime: '16:00' },
    { startTime: '16:00', endTime: '17:00' },
    { startTime: '17:00', endTime: '18:00' },
  ];
};

export const mockTasks: Task[] = [
  {
    id: '1',
    title: '프론트엔드 개발 작업',
    timeline: createTimeBlocks(),
    todoDescription:
      '로그인 페이지 UI 구현, 사용자 인증 로직 추가, 테스트 코드 작성',
    doneDescription:
      '로그인 페이지 UI 완성, 기본 폼 검증 추가, 로그인 API 연동 완료',
    createdAt: new Date('2025-03-22T09:00:00'),
    updatedAt: new Date('2025-03-22T18:30:00'),
  },
  {
    id: '2',
    title: 'API 설계 및 문서화',
    timeline: [
      {
        startTime: '09:00',
        endTime: '10:00',
        description: 'API 요구사항 분석',
      },
      { startTime: '10:00', endTime: '12:00', description: 'RESTful API 설계' },
      {
        startTime: '13:00',
        endTime: '15:00',
        description: 'Swagger 문서 작성',
      },
      {
        startTime: '15:00',
        endTime: '17:00',
        description: '팀 리뷰 및 피드백 반영',
      },
      {
        startTime: '17:00',
        endTime: '18:00',
        description: '최종 문서 업데이트',
      },
    ],
    todoDescription:
      '사용자 관리 API 설계, 인증/인가 프로세스 정의, API 문서화',
    doneDescription:
      '사용자 CRUD API 설계 완료, JWT 기반 인증 플로우 정의, Swagger 문서 초안 작성',
    createdAt: new Date('2025-03-21T08:30:00'),
    updatedAt: new Date('2025-03-21T18:15:00'),
  },
  {
    id: '3',
    title: '데이터베이스 스키마 설계',
    timeline: [
      { startTime: '09:00', endTime: '11:00', description: 'ERD 작성' },
      { startTime: '11:00', endTime: '12:00', description: '데이터 모델링' },
      { startTime: '13:00', endTime: '15:00', description: '스키마 최적화' },
      {
        startTime: '15:00',
        endTime: '18:00',
        description: '마이그레이션 스크립트 작성',
      },
    ],
    todoDescription:
      '사용자, 게시물, 댓글 테이블 스키마 설계, 인덱스 전략 수립, 초기 마이그레이션 스크립트 작성',
    doneDescription:
      '전체 ERD 완성, 인덱스 생성 스크립트 작성, 초기 데이터 시드 스크립트 작성 완료',
    createdAt: new Date('2025-03-20T09:15:00'),
    updatedAt: new Date('2025-03-20T17:45:00'),
  },
  {
    id: '4',
    title: '프로젝트 기획 회의',
    timeline: createEmptyTimeBlocks(),
    todoDescription: '프로젝트 범위 정의, 주요 기능 논의, 일정 계획 수립',
    doneDescription:
      '프로젝트 범위 합의, 핵심 기능 5개 정의, 2개월 일정 계획 수립 완료',
    createdAt: new Date('2025-03-19T10:00:00'),
    updatedAt: new Date('2025-03-19T16:30:00'),
  },
  {
    id: '5',
    title: '사용자 테스트 및 피드백 수집',
    timeline: createEmptyTimeBlocks(),
    todoDescription:
      '5명의 테스트 사용자 모집, 테스트 시나리오 작성, 피드백 수집 및 분석',
    doneDescription:
      '7명의 테스트 사용자로부터 피드백 수집 완료, 주요 UX 이슈 3개 발견 및 문서화',
    createdAt: new Date('2025-03-18T09:30:00'),
    updatedAt: new Date('2025-03-18T17:00:00'),
  },
];
