# 당근마켓 클론코딩

- firebase를 이용하여 로그인 , 회원 가입 , CRUD 
- useForm hook을 이용하여 form을 좀 더 간단하게 만들었습니다.
- Region.jsx >> 지역 버튼을 누르면 해당 지역에서 파는 상품만 보여주도록 filter 기능을 추가하였음
- Home.jsx >> 화면에서 닉네임을 누르면 내 정보 수정 페이지로 이동하고 정보를 수정할 수 있도록 추가하였습니다.
- Detail.jsx >> 상품을 눌렀을 때 자신이 올린 상품만 수정 , 판매완료 버튼을 보여주도록 만들었습니다.
- Profile.jsx >> profile 페이지에서 자신이 판매중인 상품과 판매완료된 상품을 볼 수 있도록 만들었습니다.
- Home.jsx >> 페이지에서 판매중인 모든 상품만 보여주도록 수정하였습니다. 
- Write.jsx >>글쓰기 페이지에서 선택한 사진을 미리보고, 삭제할 수 있도록 만들었습니다.
- Cart.jsx >> 상품을 장바구니에 담고, 전체 합계와 각 상품을 삭제할 수 있도록 만들었습니다.
- Search.jsx >> 검색창에 입력한 값이 포함된 상품들을 보여주도록 만들었습니다.
- js로 작성한 코드를 ts로 변경
- redux 추가
- react helmet async 사용하여 페이지 제목 변경



## 힘들었던 점 

- firebase를 typescript로 바꾸는데 좀 어려웠습니다.
- useform hook을 기존 form과 똑같이 type을 지정하는 줄 알았는데 다른 방법이 있다는 것을 알게되었습니다. 
- input file을 typescript로 바꾸는데 어려움을 겪었습니다.
- data filter를 redux로 바꾸는데 어려움을 겪었습니다. 
- react-helmet을 사용했더니 unsafe componentwillmount 에러를 react-helmet-async를 사용하여 해결