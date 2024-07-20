## 개발 환경 세팅

- Node.js 18+를 설치합니다.
- 터미널을 열고 `npm install`을 입력하여 패키지를 모두 설치합니다.
- `npm run start` 명령어로 개발 서버를 실행합니다.

## 작업 방식

0. merge한 사람이 merge 했다고 하면 dev에서 pull 받아서 최신화 하기 (git pull upstream dev)
1. 작업할 기능에 대해 이슈 생성
2. master브랜치에서 feat/이슈번호 브랜치 생성 (git switch dev -> git switch -c feat/이슈번호)
3. 기능 개발 완료 후 `[#이슈번호] 커밋 메시지 내용` 형식으로 commit 및 push (git commit -m "[#이슈번호] 커밋 내용" -> git push origin feat/이슈번호)
4. github 사이트 와서 pull & request 생성하기 (dev <- feat/이슈번호)
5. 팀장 코드 피드백 완료 후 본인이 merge 하기
6. "feat/이슈번호" 브랜치 -> dev 브랜치로 이동 (git switch dev) 
7. dev브랜치에서 master로 푸쉬 (git add . 후에 git push origin dev)
8. master<-dev로 PR 작성
**(6~8은 팀장만 추가로 진행합니다)**

## PR Convention

PR 제목은 커밋 요약과 동일하게 "(type): (content)" 형식으로 작성하며, 내용은 다음을 포함하여 작성합니다.

### Changes 📝

이 PR에서 작업한 사항을 적어주세요.

### Issues 🚩

이 PR과 연관된 Issue를 작성해주세요. 해당 PR이 Issue를 해결한다면 Issue도 꼭 닫아주세요! <br/>
**"close #이슈번호" 를 써주면 PR을 닫을때 Isuue도 함께 닫힙니다!**

### Screenshot 📷 (선택)

작업한 사항을 스크린샷으로 찍을 수 있다면 (예: 신규 페이지 구현, 새로운 컴포넌트 구현) 스크린샷을 찍어서 올려주세요.
