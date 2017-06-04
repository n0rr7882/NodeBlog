# NodeBlog
Node.js express와 mongodb로 작성한 개인 블로그
## Install
우선 `setting.json`에 관리자계정 정보를 입력한다.
```js
{
  "adminId": [adminId],
  "password": [password]
}
```
그 다음 `previews` 폴더와 `uploads`폴더를 생성한다.
```bash
$ mkdir previews
$ mkdir uploads
```
그리고 실행시키면 80번 포트에 열린다.
```bash
$ sudo npm install
$ sudo npm start
```
## Demo
- [n0rr.iptime.org](http://n0rr.iptime.org)
