1. API 명세서: https://teamsparta.notion.site/1f9996c2cb664e60b2375f5f8aeaa873
2. ERD: https://www.erdcloud.com/d/H7PGvjffLTHGH3cRF


# PotatoLand, 프로젝트 협업도구(Canvan Board) 제작 프로젝트.
- 프로젝트 인원 : BE(4)
- 프로젝트 기간 : 24.03~24.03(약1주)
  
## Introduction

- 칸반 보드
  - 토큰 기반 인증
  - 설립자의 보드 생성과 유저 초대
  - 보드에 가입 여부 확인
- AI 식단관리 서비스
- 운동 스케줄 관리 기능

## Skills
- Server
  - Nest JS
- Database
  - MySQL(TypeORM)
  - Redis

## CARD PART READ.ME
- 칸반 보드의 컬럼에 위치할 카드(메모지)의 CRUD
  - column에 종속시켜 관리, 권한은 board의 구성원인지 확인하여 부여
- 위치 이동(순서 재배치)을/를 위한  정렬
  - 입력된 배열과 현재 index+1을 사용하여 정렬
  - 컬럼간의 이동에도 동일한 정렬 방법 적용됨
- 카드 상세 기능
  - 댓글 CRUD
  - 날짜 지정(마감일 설정)

