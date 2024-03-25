1. API 명세서: https://teamsparta.notion.site/1f9996c2cb664e60b2375f5f8aeaa873
2. ERD: https://www.erdcloud.com/d/H7PGvjffLTHGH3cRF

<환경변수 일람>

- 새로 추가해야할 환경변수가 있다면 여기에 기입해주세요.

- 작성 양식:

-  ##환경변수가 적용되는 의존성 종류

- #(환경 변수가 디렉토리)

-  환경 변수 이름 = 

- <여기서부터 추가하고 싶은 실제 환경변수를 작성해주세요>

  #main.ts
  SERVER_PORT = 
  
  ##mysql2
  #(./configs/database.config.ts)
  
  DB_HOST =
   
  DB_PORT =
   
  DB_USERNAME =
   
  DB_PASSWORD =
   
  DB_NAME =
   
  DB_SYNC = 

  ##bcrypt
  
  PASSWORD_HASH_ROUND = 

  ##jwt
  
  JWT_SECRET =
  
  JWT_ACCESS_TOKEN_SECRET =
  
  JWT_REFRESH_TOKEN_SECRET = 

  ##nodemailer
  
  GMAIL_USER =
  
  GMAIL_PASS =
  
  GMAIL_USER_BOARD =
  
  GMAIL_PASS_BOARD =
  
  JWT_SECRET_BOARD =

  ##redis
  
  REDIS_USERNAME =
  
  REDIS_PASSWORD =
  
  REDIS_HOST =
  
  REDIS_PORT =

  ##S3 Multer
  
  S3ACCESSKEY =
  
  S3SECRETKEY =
  
  S3REGION =
  
  S3BUCKET = 

