# Ambiguous handler methods mapped for HTTP path 오류



![image-20210511014040921](Ambiguous handler methods mapped for HTTP path 오류/image-20210511014040921.png)

- 자격증 이름을 통해 자격증 검색을 하고 싶으나, 지속적인 500 에러가 발생.

> 해결책!

![image-20210511014125250](Ambiguous handler methods mapped for HTTP path 오류/image-20210511014125250.png)

- 두 GetMapping을 보면 하나의 URL을 여러개의 컨트롤러에서 매핑하는 것과 같게 된다.
- 즉, **하나의 URL을 여러개의 콘트롤러에서 매핑할 수 없다. 중복되는 url이 없도록 하나의 콘트롤러에서만 사용한다.**