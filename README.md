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

  ##nodemailer

  GMAIL_USER =
  
  GMAIL_PASS =

  GMAIL_USER_BOARD =
  
  GMAIL_PASS_BOARD =
  
  JWT_SECRET_BOARD =
