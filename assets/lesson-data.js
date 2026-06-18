(function () {
  window.COURSE = {
    meta: {
      description: "15개의 Flask 강의 노트북을 번호별 웹 학습 페이지로 재구성했습니다. 원래 흐름은 유지하면서 예제, 실습, 운영 관점, 보안과 설계 판단을 보강했습니다.",
      examples: "15+"
    },
    sources: [
      { label: "Flask 공식 문서 3.1.x", url: "https://flask.palletsprojects.com/" },
      { label: "Flask Blueprints", url: "https://flask.palletsprojects.com/en/stable/blueprints/" },
      { label: "Flask Application Factories", url: "https://flask.palletsprojects.com/en/stable/patterns/appfactories/" },
      { label: "Flask Deployment Options", url: "https://flask.palletsprojects.com/en/stable/deploying/" },
      { label: "Jinja Template Designer Documentation", url: "https://jinja.palletsprojects.com/en/stable/templates/" },
      { label: "Flask-Login Documentation", url: "https://flask-login.readthedocs.io/" },
      { label: "Flask-CORS Documentation", url: "https://flask-cors.readthedocs.io/en/latest/" },
      { label: "MDN HTTP Request Methods", url: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Methods" },
      { label: "MDN CORS Guide", url: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS" },
      { label: "Vue 공식 가이드", url: "https://vuejs.org/guide/introduction.html" },
      { label: "Flask-SQLAlchemy Documentation", url: "https://flask-sqlalchemy.readthedocs.io/en/stable/" },
      { label: "PyMongo Documentation", url: "https://pymongo.readthedocs.io/" }
    ],
    lessons: [
      {
        id: 1,
        shortTitle: "풀스택 구조",
        title: "풀스택 서비스와 프레임워크의 큰 그림",
        sourceNotebook: "1_understand_fullstack.ipynb",
        level: "Foundation to architecture",
        tags: ["Fullstack", "Framework", "Request Flow"],
        focus: "프론트엔드와 백엔드가 어떻게 계약을 맺고, Flask가 그 계약을 빠르게 구현하게 해주는지 이해합니다.",
        objectives: [
          "웹 서비스가 브라우저, 네트워크, 서버, 데이터베이스로 나뉘어 움직이는 과정을 설명한다.",
          "프레임워크가 반복 코드를 줄이는 대신 구조적 약속을 요구한다는 점을 이해한다.",
          "Flask를 선택하는 이유와 Django 같은 풀스택 프레임워크와의 차이를 말한다.",
          "처음부터 운영 가능한 서비스 관점으로 학습 로드맵을 세운다."
        ],
        concepts: [
          {
            title: "풀스택은 전부 직접 하는 것이 아니다",
            body: "풀스택 역량은 모든 코드를 혼자 외워 쓰는 능력이 아니라, 각 계층의 책임과 연결 계약을 정확히 이해하는 능력입니다.",
            bullets: [
              "브라우저는 HTML, CSS, JavaScript를 실행하고 서버에 HTTP 요청을 보낸다.",
              "백엔드는 요청을 검증하고 비즈니스 규칙을 실행한 뒤 응답을 만든다.",
              "데이터베이스는 상태를 오래 보관하며, 백엔드는 그 상태를 안전하게 다룬다."
            ]
          },
          {
            title: "프레임워크는 생산성을 위한 약속이다",
            body: "Flask는 라우팅, 요청/응답 객체, 템플릿 연결 같은 반복 구조를 제공합니다. 대신 파일 구조, 함수 이름, 실행 방식 같은 규칙을 존중해야 합니다.",
            bullets: [
              "프레임워크를 잘 쓴다는 것은 숨겨진 흐름을 이해하고 의도적으로 확장하는 것이다.",
              "작은 서비스는 단일 파일로 시작할 수 있지만, 기능이 늘면 블루프린트와 앱 팩토리로 나눈다.",
              "학습 초반부터 API 계약, 에러 형식, 설정 분리를 습관화한다."
            ]
          },
          {
            title: "Flask가 좋은 출발점인 이유",
            body: "Flask는 핵심만 얇게 제공하므로 HTTP와 서버 구조를 직접 관찰하기 좋습니다. 그래서 주니어가 웹의 동작 원리를 익히기에 적합합니다.",
            bullets: [
              "라우트 한 줄로 URL과 파이썬 함수를 연결할 수 있다.",
              "Jinja, SQLAlchemy, Flask-Login 같은 도구를 선택적으로 붙일 수 있다.",
              "작게 시작한 뒤 서비스 구조로 확장하는 훈련에 잘 맞는다."
            ]
          },
          {
            title: "전문가의 첫 번째 기준은 경계다",
            body: "서비스가 커질수록 HTML, API, 데이터 접근, 인증, 설정, 배포를 섞지 않는 것이 중요합니다.",
            bullets: [
              "브라우저와 서버 사이에는 명확한 URL, 메서드, 응답 형식이 있어야 한다.",
              "서버 내부에서도 라우트, 서비스, 저장소, 모델의 책임을 분리한다.",
              "운영에서는 로그와 헬스체크가 기능만큼 중요하다."
            ]
          }
        ],
        visual: {
          title: "요청이 서비스가 되는 흐름",
          steps: [
            { label: "Browser", detail: "사용자 입력과 화면 렌더링" },
            { label: "HTTP", detail: "URL, 메서드, 헤더, 바디로 의도 전달" },
            { label: "Flask", detail: "라우트와 함수가 요청 처리" },
            { label: "Storage", detail: "DB와 파일에 상태 저장" }
          ]
        },
        example: {
          title: "가장 작은 백엔드 계약",
          code: String.raw`from flask import Flask

app = Flask(__name__)

@app.get("/api/health")
def health():
    return {
        "status": "ok",
        "service": "learning-blog",
        "version": "0.1.0"
    }

# 실행
# flask --app app run --debug`
        },
        practice: {
          title: "요청-응답 지도 만들기",
          prompt: "간단한 프로필 API를 만든다고 가정하고 브라우저부터 DB까지 어떤 정보가 이동하는지 적어보세요.",
          steps: [
            "GET /api/profile/<user_id> 요청의 URL, 메서드, 응답 JSON 예시를 작성한다.",
            "HTML 화면에는 어떤 필드가 필요한지 정한다.",
            "서버가 검증해야 할 값과 DB에서 읽어야 할 값을 분리한다.",
            "장애가 났을 때 로그에 남길 정보를 3개 고른다."
          ],
          done: "요청, 처리, 응답, 저장소 책임이 한 문장씩 분리되어 설명된다."
        },
        expert: [
          "서비스 설계는 화면부터 시작해도 되지만, 서버 계약은 반드시 독립적으로 검토한다.",
          "Flask를 빨리 배우는 것보다 HTTP 요청 하나를 끝까지 추적하는 능력이 오래 간다.",
          "초기 MVP에서도 설정값과 비밀값을 코드에 직접 박아 넣지 않는 습관을 만든다."
        ],
        quiz: [
          { q: "Flask가 마이크로 프레임워크라는 말은 기능이 약하다는 뜻일까?", a: "아닙니다. 핵심 기능을 작게 제공하고 필요한 확장을 선택하게 한다는 뜻입니다." },
          { q: "프론트엔드와 백엔드 사이의 가장 중요한 계약은 무엇인가?", a: "URL, HTTP 메서드, 요청 데이터, 응답 형식, 상태 코드입니다." }
        ]
      },
      {
        id: 2,
        shortTitle: "Flask 기본",
        title: "Flask 기본 실행, 라우팅, 엔트리포인트",
        sourceNotebook: "2_flask_basic.ipynb",
        level: "Core Flask",
        tags: ["Flask", "Routing", "__name__"],
        focus: "Flask 앱을 만들고 실행하는 흐름, URL과 함수를 연결하는 라우팅, 파이썬 엔트리포인트의 의미를 정확히 잡습니다.",
        objectives: [
          "Flask 객체와 __name__이 템플릿, static 경로 탐색에 쓰이는 이유를 이해한다.",
          "라우트 데코레이터와 URL 변수 변환기를 사용할 수 있다.",
          "flask run과 app.run의 차이, 개발 서버의 한계를 설명한다.",
          "작은 단일 파일 앱을 앱 팩토리 구조로 옮길 준비를 한다."
        ],
        concepts: [
          {
            title: "앱 객체는 웹 애플리케이션의 중심이다",
            body: "Flask(__name__)으로 만든 객체가 라우트, 설정, 템플릿, static 파일, 확장 기능의 기준점이 됩니다.",
            bullets: [
              "__name__은 현재 모듈 위치를 알려주며 Flask가 리소스 경로를 찾는 데 도움을 준다.",
              "단일 파일 학습에서는 app = Flask(__name__)으로 충분하다.",
              "테스트와 설정 분리가 필요해지면 create_app() 팩토리로 옮긴다."
            ]
          },
          {
            title: "라우팅은 URL과 함수의 매핑이다",
            body: "라우트 데코레이터는 특정 URL 요청이 들어왔을 때 어떤 함수를 실행할지 등록합니다.",
            bullets: [
              "@app.get('/')은 GET 요청만 받는 읽기 라우트에 적합하다.",
              "<int:user_id> 같은 변환기는 URL 값을 타입까지 검증한다.",
              "라우트 함수의 반환값은 문자열, dict, Response, 템플릿 등으로 만들 수 있다."
            ]
          },
          {
            title: "개발 서버와 운영 서버는 다르다",
            body: "Flask 내장 서버는 개발 편의용입니다. 운영에서는 Waitress, Gunicorn 같은 WSGI 서버를 사용해야 합니다.",
            bullets: [
              "개발 중에는 flask --app app run --debug로 빠르게 확인한다.",
              "debug 모드는 상세 오류와 자동 재시작을 제공하지만 운영에 켜면 위험하다.",
              "운영에서는 프로세스 관리, 로그, 타임아웃, 리버스 프록시를 함께 고려한다."
            ]
          },
          {
            title: "엔트리포인트를 이해하면 import가 무섭지 않다",
            body: "if __name__ == '__main__'은 파일을 직접 실행했을 때만 동작하게 하는 파이썬 관용구입니다.",
            bullets: [
              "테스트나 다른 모듈에서 import할 때 서버가 갑자기 뜨는 일을 막는다.",
              "Flask CLI는 앱 객체 또는 create_app 함수를 찾아 실행할 수 있다.",
              "실무에서는 CLI 실행과 테스트 import가 모두 자연스럽게 되도록 구조를 잡는다."
            ]
          }
        ],
        visual: {
          title: "Flask 기본 앱의 구성 요소",
          steps: [
            { label: "App", detail: "Flask 객체와 설정" },
            { label: "Route", detail: "URL과 함수 연결" },
            { label: "View", detail: "요청 처리와 응답 생성" },
            { label: "Run", detail: "개발 서버 또는 WSGI 서버 실행" }
          ]
        },
        example: {
          title: "라우팅과 앱 팩토리 기본형",
          code: String.raw`from flask import Flask, request

def create_app():
    app = Flask(__name__)

    @app.get("/")
    def index():
        return "Hello Flask"

    @app.get("/users/<int:user_id>")
    def user_detail(user_id):
        verbose = request.args.get("verbose") == "1"
        return {"user_id": user_id, "verbose": verbose}

    return app

# 실행
# flask --app app:create_app run --debug`
        },
        practice: {
          title: "동적 URL 만들기",
          prompt: "이름을 URL로 받아 인사말 JSON을 돌려주는 라우트를 만드세요.",
          steps: [
            "GET /hello/<name> 라우트를 만든다.",
            "name이 너무 길면 400 상태로 거절하는 조건을 넣는다.",
            "응답은 {'message': 'Hello, name'} 형태로 만든다.",
            "브라우저와 curl 또는 httpie로 각각 확인한다."
          ],
          done: "정상 요청과 잘못된 요청이 서로 다른 상태 코드로 응답한다."
        },
        expert: [
          "라우트 함수가 커지기 시작하면 비즈니스 로직을 별도 함수나 서비스로 분리한다.",
          "초기부터 create_app()으로 시작하면 테스트와 운영 설정 전환이 쉬워진다.",
          "URL 설계는 코드보다 오래 남으므로 명사형 리소스와 일관된 메서드를 사용한다."
        ],
        quiz: [
          { q: "__name__이 Flask 앱 생성에 쓰이는 이유는?", a: "현재 모듈의 위치를 기준으로 템플릿과 static 파일 등 애플리케이션 리소스를 찾기 위해서입니다." },
          { q: "debug=True를 운영에 쓰면 안 되는 이유는?", a: "상세 오류와 디버거가 노출되어 보안 위험이 커지고, 개발 서버 자체도 운영 부하와 안정성을 목표로 하지 않기 때문입니다." }
        ]
      },
      {
        id: 3,
        shortTitle: "데코레이터",
        title: "중첩 함수, 클로저, 데코레이터로 Flask 내부 이해하기",
        sourceNotebook: "3_python_decorator.ipynb",
        level: "Python intermediate",
        tags: ["Decorator", "Closure", "Flask Route"],
        focus: "Flask의 @app.route를 자연스럽게 이해하기 위해 파이썬 함수가 값처럼 다뤄지는 방식을 익힙니다.",
        objectives: [
          "중첩 함수와 클로저가 상태를 보존하는 원리를 설명한다.",
          "함수를 인자로 받고 함수를 반환하는 first-class function 패턴을 쓴다.",
          "functools.wraps를 사용해 안전한 데코레이터를 작성한다.",
          "Flask 라우트, 인증, 로깅 데코레이터의 작동 방식을 추론한다."
        ],
        concepts: [
          {
            title: "함수도 값이다",
            body: "파이썬 함수는 변수에 담고, 인자로 넘기고, 반환할 수 있습니다. 이 성질이 데코레이터의 출발점입니다.",
            bullets: [
              "함수를 다른 함수에 넘기면 실행 시점을 제어할 수 있다.",
              "반환된 내부 함수는 나중에 호출될 수 있다.",
              "Flask는 라우트 등록 시점과 요청 처리 시점을 분리한다."
            ]
          },
          {
            title: "클로저는 필요한 기억만 들고 간다",
            body: "외부 함수가 끝난 뒤에도 내부 함수가 외부 변수 값을 기억할 수 있습니다. 이를 통해 설정값이 있는 함수를 만들 수 있습니다.",
            bullets: [
              "로그 레벨, 권한 이름, 제한 시간 같은 옵션을 감쌀 수 있다.",
              "상태를 숨길 수 있지만 과하면 디버깅이 어려워진다.",
              "변경 가능한 값을 클로저에 넣을 때는 부작용을 조심한다."
            ]
          },
          {
            title: "데코레이터는 함수 앞뒤의 공통 처리다",
            body: "인증 확인, 실행 시간 측정, 트랜잭션 처리처럼 여러 함수에 반복되는 코드를 한 곳으로 모을 수 있습니다.",
            bullets: [
              "wrapper 내부에서 원래 함수를 호출하기 전후 작업을 넣는다.",
              "*args와 **kwargs로 다양한 함수 서명을 받아낸다.",
              "@wraps를 써서 원래 함수의 이름과 메타데이터를 보존한다."
            ]
          },
          {
            title: "Flask 라우트도 등록 데코레이터다",
            body: "@app.route는 함수를 즉시 실행하는 것이 아니라 URL 규칙과 함수 객체를 앱에 등록합니다.",
            bullets: [
              "서버 시작 시점에 라우트 테이블이 만들어진다.",
              "요청이 들어오면 Flask가 URL을 매칭하고 해당 함수를 호출한다.",
              "커스텀 데코레이터는 @app.route 안쪽 또는 바깥쪽 순서에 따라 의미가 달라질 수 있다."
            ]
          }
        ],
        visual: {
          title: "데코레이터 실행 흐름",
          steps: [
            { label: "Define", detail: "원래 함수 정의" },
            { label: "Decorate", detail: "wrapper 함수로 감싸기" },
            { label: "Register", detail: "Flask 라우트에 등록" },
            { label: "Call", detail: "요청 시 wrapper가 실행" }
          ]
        },
        example: {
          title: "토큰 검사 데코레이터",
          code: String.raw`from functools import wraps
from flask import Flask, abort, current_app, request

app = Flask(__name__)
app.config["API_TOKEN"] = "dev-token"

def require_token(view):
    @wraps(view)
    def wrapper(*args, **kwargs):
        token = request.headers.get("X-Token")
        if token != current_app.config["API_TOKEN"]:
            abort(401)
        return view(*args, **kwargs)
    return wrapper

@app.get("/admin/report")
@require_token
def report():
    return {"sales": 128, "active_users": 42}`
        },
        practice: {
          title: "실행 시간 측정 데코레이터",
          prompt: "어떤 함수가 몇 ms 걸렸는지 출력하는 데코레이터를 작성하고 Flask 라우트에 붙여보세요.",
          steps: [
            "time.perf_counter()로 시작과 끝 시간을 잰다.",
            "@wraps를 적용한다.",
            "라우트 함수에 붙이고 브라우저 요청마다 로그가 찍히는지 확인한다.",
            "느린 함수가 있을 때 어떤 기준으로 경고할지 정한다."
          ],
          done: "원래 함수의 반환값은 유지되고 실행 시간만 추가로 기록된다."
        },
        expert: [
          "데코레이터는 강력하지만 흐름을 숨긴다. 팀 코드에서는 이름과 책임을 매우 분명하게 만든다.",
          "@wraps를 빼면 Flask endpoint 이름 충돌이나 문서화 문제가 생길 수 있다.",
          "인증 데코레이터는 반드시 실패 상태 코드와 에러 메시지 형식을 일관되게 반환해야 한다."
        ],
        quiz: [
          { q: "클로저가 데코레이터에서 유용한 이유는?", a: "외부 함수의 설정값을 wrapper가 기억하게 만들 수 있어 옵션이 있는 공통 처리를 만들기 좋기 때문입니다." },
          { q: "@app.route와 커스텀 데코레이터의 순서가 중요한 이유는?", a: "어떤 함수가 Flask에 등록되는지, 요청 시 어떤 wrapper가 먼저 실행되는지가 달라질 수 있기 때문입니다." }
        ]
      },
      {
        id: 4,
        shortTitle: "REST API",
        title: "Flask와 REST API, HTTP 요청/응답 설계",
        sourceNotebook: "4_flask_basic.ipynb",
        level: "API design",
        tags: ["REST", "HTTP", "JSON"],
        focus: "정적 HTML 반환에서 시작해 JSON API, 상태 코드, 메서드별 의미, 프론트엔드 연동까지 확장합니다.",
        objectives: [
          "HTTP 메서드와 상태 코드의 의미를 API 설계에 적용한다.",
          "Flask에서 JSON 요청을 읽고 JSON 응답을 반환한다.",
          "URL 변수, query string, request body의 차이를 구분한다.",
          "정적 파일과 템플릿, API 응답을 한 서비스 안에서 구분한다."
        ],
        concepts: [
          {
            title: "REST는 리소스 중심 설계다",
            body: "REST API는 동작 이름보다 리소스 이름을 URL로 표현하고, HTTP 메서드로 행위를 나타냅니다.",
            bullets: [
              "GET /posts는 목록 조회, POST /posts는 생성에 가깝다.",
              "PATCH /posts/1은 일부 수정, DELETE /posts/1은 삭제에 가깝다.",
              "URL에 동사를 많이 넣기 시작하면 리소스 모델을 다시 점검한다."
            ]
          },
          {
            title: "상태 코드는 클라이언트와의 신호다",
            body: "200, 201, 204, 400, 401, 404, 409, 500 같은 상태 코드는 프론트엔드가 다음 행동을 결정하는 기준이 됩니다.",
            bullets: [
              "생성 성공은 201 Created를 고려한다.",
              "입력 검증 실패는 400 또는 422 계열로 분리한다.",
              "예상 가능한 실패는 500이 아니라 명확한 클라이언트 오류로 돌려준다."
            ]
          },
          {
            title: "입력 위치를 구분한다",
            body: "URL 변수는 특정 리소스 식별, query string은 필터와 정렬, JSON body는 생성과 수정 데이터에 적합합니다.",
            bullets: [
              "GET 요청 body에 의존하지 않는다.",
              "민감 정보는 URL에 넣지 않는다.",
              "요청 데이터는 타입과 필수값을 반드시 검증한다."
            ]
          },
          {
            title: "API와 HTML은 응답 타입이 다르다",
            body: "HTML 페이지는 사람이 보는 문서를 반환하고, API는 프로그램이 읽는 데이터를 반환합니다. 둘을 같은 라우트에 섞으면 유지보수가 어렵습니다.",
            bullets: [
              "페이지 라우트와 /api 라우트를 분리하면 의도가 명확하다.",
              "API 응답에는 일관된 에러 포맷을 둔다.",
              "프론트엔드는 상태 코드와 JSON 필드를 기준으로 화면 상태를 바꾼다."
            ]
          }
        ],
        visual: {
          title: "REST 요청의 판단 기준",
          steps: [
            { label: "Resource", detail: "무엇을 다루는가" },
            { label: "Method", detail: "조회, 생성, 수정, 삭제" },
            { label: "Payload", detail: "검증할 입력 데이터" },
            { label: "Status", detail: "결과를 표현하는 코드" }
          ]
        },
        example: {
          title: "작은 Todo REST API",
          code: String.raw`from flask import Flask, abort, request

app = Flask(__name__)
todos = {1: {"id": 1, "title": "Flask route 복습", "done": False}}

@app.get("/api/todos")
def list_todos():
    return {"items": list(todos.values())}

@app.post("/api/todos")
def create_todo():
    data = request.get_json(silent=True) or {}
    title = data.get("title", "").strip()
    if not title:
        abort(400, description="title is required")
    todo_id = max(todos) + 1 if todos else 1
    todos[todo_id] = {"id": todo_id, "title": title, "done": False}
    return todos[todo_id], 201

@app.patch("/api/todos/<int:todo_id>")
def update_todo(todo_id):
    if todo_id not in todos:
        abort(404)
    data = request.get_json(silent=True) or {}
    if "done" in data:
        todos[todo_id]["done"] = bool(data["done"])
    return todos[todo_id]`
        },
        practice: {
          title: "에러 포맷 통일하기",
          prompt: "위 Todo API에 JSON 에러 핸들러를 추가해 모든 오류가 같은 구조로 나오게 만드세요.",
          steps: [
            "@app.errorhandler(400)과 @app.errorhandler(404)를 작성한다.",
            "응답 JSON을 {'error': {'code': 400, 'message': '...'}} 형태로 통일한다.",
            "title이 없는 POST와 없는 todo_id PATCH를 테스트한다.",
            "프론트엔드가 이 에러를 어떻게 표시할지 문장으로 적는다."
          ],
          done: "성공 응답과 실패 응답의 상태 코드, JSON 구조가 명확히 다르다."
        },
        expert: [
          "RESTful하다는 말보다 클라이언트가 예측 가능한 API인지가 더 중요하다.",
          "페이지네이션, 정렬, 필터, 에러 포맷은 API 초기에 약속해두면 이후 비용이 크게 줄어든다.",
          "실무에서는 marshmallow, pydantic, flask-smorest 같은 검증/문서화 도구도 검토한다."
        ],
        quiz: [
          { q: "POST 생성 성공에 201을 쓰는 이유는?", a: "클라이언트에게 새 리소스가 생성되었다는 의미를 명확히 전달하기 위해서입니다." },
          { q: "query string과 JSON body는 언제 구분해서 쓰나?", a: "query string은 조회 조건과 옵션, JSON body는 생성과 수정에 필요한 구조화 데이터를 담을 때 사용합니다." }
        ]
      },
      {
        id: 5,
        shortTitle: "Jinja2",
        title: "Jinja2 템플릿으로 HTML을 동적으로 만들기",
        sourceNotebook: "5_flask_jinja2.ipynb",
        level: "Template architecture",
        tags: ["Jinja", "Template", "HTML"],
        focus: "변수, 반복문, 조건문을 넘어 자동 이스케이프, 템플릿 상속, 매크로까지 다뤄 유지보수 가능한 화면 구조를 만듭니다.",
        objectives: [
          "render_template로 서버 데이터를 HTML에 전달한다.",
          "Jinja 변수, 반복문, 조건문, 필터, 주석을 사용할 수 있다.",
          "base.html과 block을 이용해 중복 레이아웃을 줄인다.",
          "템플릿에서 비즈니스 로직을 과하게 처리하지 않는 기준을 세운다."
        ],
        concepts: [
          {
            title: "템플릿은 HTML에 데이터를 끼워 넣는 층이다",
            body: "Jinja는 HTML 안에서 {{ variable }}과 {% for %} 같은 문법으로 서버 데이터를 렌더링합니다.",
            bullets: [
              "뷰 함수는 필요한 데이터만 준비하고 render_template에 넘긴다.",
              "템플릿은 표현 로직에 집중하고 DB 조회 같은 작업은 하지 않는다.",
              "변수 이름은 화면 의도가 드러나게 짓는다."
            ]
          },
          {
            title: "자동 이스케이프는 보안의 기본값이다",
            body: "Jinja는 HTML 템플릿에서 사용자 입력이 스크립트로 실행되지 않도록 escape 처리를 지원합니다.",
            bullets: [
              "사용자 입력을 |safe로 쉽게 풀지 않는다.",
              "HTML을 허용해야 한다면 서버에서 신뢰 가능한 정제 과정을 둔다.",
              "XSS는 로그인 기능보다 먼저 고려해야 할 기본 보안 문제다."
            ]
          },
          {
            title: "상속은 레이아웃 중복을 제거한다",
            body: "base.html에 공통 구조를 두고 각 페이지가 block만 채우면 nav, head, footer를 반복하지 않아도 됩니다.",
            bullets: [
              "{% extends 'base.html' %}로 부모 템플릿을 지정한다.",
              "{% block content %} 영역만 페이지별로 바꾼다.",
              "공통 폼 조각은 include나 macro로 분리할 수 있다."
            ]
          },
          {
            title: "필터와 매크로는 표현 전용 도구다",
            body: "날짜 포맷, 길이 제한, 폼 입력 컴포넌트처럼 화면 표현을 재사용할 때 필터와 매크로가 좋습니다.",
            bullets: [
              "복잡한 계산은 파이썬 서비스에서 끝낸 뒤 템플릿에 넘긴다.",
              "매크로는 작은 UI 함수를 만든다는 느낌으로 사용한다.",
              "템플릿이 조건문으로 가득해지면 뷰 모델을 재설계한다."
            ]
          }
        ],
        visual: {
          title: "Jinja 렌더링 흐름",
          steps: [
            { label: "View", detail: "데이터 준비" },
            { label: "Template", detail: "변수와 block 치환" },
            { label: "Escape", detail: "HTML 안전 처리" },
            { label: "Response", detail: "완성된 HTML 반환" }
          ]
        },
        example: {
          title: "상속과 반복문을 쓰는 블로그 목록",
          code: String.raw`# app.py
from flask import Flask, render_template

app = Flask(__name__)

@app.get("/posts")
def posts():
    items = [
        {"title": "Flask 시작", "author": "Ada", "views": 31},
        {"title": "Jinja 템플릿", "author": "Lin", "views": 18},
    ]
    return render_template("posts.html", posts=items)

# templates/base.html
<!doctype html>
<title>{% block title %}Blog{% endblock %}</title>
<main>{% block content %}{% endblock %}</main>

# templates/posts.html
{% extends "base.html" %}
{% block title %}글 목록{% endblock %}
{% block content %}
  <h1>글 목록</h1>
  {% for post in posts %}
    <article>
      <h2>{{ post.title }}</h2>
      <p>{{ post.author }} · {{ post.views }} views</p>
    </article>
  {% else %}
    <p>아직 글이 없습니다.</p>
  {% endfor %}
{% endblock %}`
        },
        practice: {
          title: "템플릿 상속으로 로그인 페이지 만들기",
          prompt: "base.html을 만들고 login.html, dashboard.html이 같은 레이아웃을 공유하게 하세요.",
          steps: [
            "base.html에 title, content block을 만든다.",
            "login.html에서 에러 메시지를 조건문으로 표시한다.",
            "dashboard.html에서 posts 리스트를 반복문으로 표시한다.",
            "사용자 입력값이 그대로 HTML로 실행되지 않는지 확인한다."
          ],
          done: "공통 HTML은 base.html에만 있고 각 페이지는 필요한 block만 채운다."
        },
        expert: [
          "서버 렌더링은 SEO, 초기 로딩, 단순 CRUD 화면에 강하다.",
          "템플릿은 똑똑해지기보다 예측 가능해야 한다. 복잡한 상태는 파이썬에서 정리한다.",
          "Jinja autoescape를 이해하면 XSS 방어의 기본 감각이 생긴다."
        ],
        quiz: [
          { q: "템플릿 상속을 쓰는 가장 큰 이유는?", a: "반복되는 HTML 레이아웃을 줄이고 페이지별 변경 지점을 block으로 제한하기 위해서입니다." },
          { q: "|safe를 조심해야 하는 이유는?", a: "이스케이프를 해제하여 사용자 입력이 HTML이나 스크립트로 실행될 수 있기 때문입니다." }
        ]
      },
      {
        id: 6,
        shortTitle: "Vue 연동",
        title: "Vue 프론트엔드와 Flask REST API 연결",
        sourceNotebook: "6_flask_restapi_with_vue.ipynb",
        level: "Frontend integration",
        tags: ["Vue", "Axios", "CORS"],
        focus: "CDN 기반 Vue 화면에서 Flask API를 호출하고, 브라우저 보안 정책인 CORS를 서버 관점에서 해결합니다.",
        objectives: [
          "프론트엔드와 백엔드가 다른 origin일 때 CORS가 왜 필요한지 설명한다.",
          "Flask-CORS로 개발 환경의 API 접근을 허용한다.",
          "Vue에서 API 호출 결과를 상태로 저장하고 화면에 표시한다.",
          "GET, POST, PATCH, DELETE 요청을 프론트엔드에서 구분해 보낸다."
        ],
        concepts: [
          {
            title: "CDN은 빠른 실험에 좋다",
            body: "Vue나 Axios를 CDN으로 불러오면 빌드 도구 없이도 브라우저에서 바로 실습할 수 있습니다.",
            bullets: [
              "학습 단계에서는 CDN으로 개념을 빠르게 확인한다.",
              "실무 앱은 Vite 같은 빌드 도구로 모듈화한다.",
              "CDN 의존성도 버전 고정과 장애 가능성을 고려해야 한다."
            ]
          },
          {
            title: "CORS는 프론트엔드 오류가 아니라 서버 정책이다",
            body: "브라우저는 다른 origin 요청을 보낼 때 서버가 허용했는지 확인합니다. 허용 헤더는 클라이언트가 아니라 서버가 내려줘야 합니다.",
            bullets: [
              "origin은 scheme, host, port 조합이다.",
              "개발에서는 http://localhost:5173과 http://localhost:5000도 서로 다른 origin이다.",
              "운영에서는 '*'보다 정확한 허용 origin을 지정한다."
            ]
          },
          {
            title: "프론트엔드는 응답 상태를 UI 상태로 바꾼다",
            body: "API 호출은 로딩, 성공, 실패라는 화면 상태를 만들어냅니다. 사용자는 이 상태를 볼 수 있어야 합니다.",
            bullets: [
              "요청 전 loading=true, 성공 후 data 갱신, 실패 후 error 표시가 기본 패턴이다.",
              "응답 JSON 구조가 안정적일수록 화면 코드가 단순해진다.",
              "네트워크 실패와 서버 검증 실패는 다르게 다룬다."
            ]
          },
          {
            title: "개발 편의와 운영 보안은 분리한다",
            body: "개발 중에는 CORS를 넓게 열 수 있지만, 운영에서는 허용 origin, 인증 쿠키, HTTPS, CSRF를 함께 설계해야 합니다.",
            bullets: [
              "쿠키 인증과 CORS를 같이 쓰면 credentials 설정이 필요하다.",
              "same-origin 배포 또는 reverse proxy를 쓰면 CORS 복잡도가 줄어든다.",
              "브라우저 콘솔 오류를 서버 로그와 함께 확인해야 빠르게 해결된다."
            ]
          }
        ],
        visual: {
          title: "Vue와 Flask의 분리 실행",
          steps: [
            { label: "Vue", detail: "화면 상태와 이벤트" },
            { label: "Fetch", detail: "HTTP 요청 생성" },
            { label: "CORS", detail: "서버 허용 정책 확인" },
            { label: "Flask", detail: "JSON API 응답" }
          ]
        },
        example: {
          title: "Vue CDN과 Flask-CORS",
          code: String.raw`# api.py
from flask import Flask, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:8080"}})

messages = [{"id": 1, "text": "Hello Vue"}]

@app.get("/api/messages")
def list_messages():
    return {"items": messages}

@app.post("/api/messages")
def add_message():
    data = request.get_json() or {}
    message = {"id": len(messages) + 1, "text": data["text"]}
    messages.append(message)
    return message, 201

<!-- index.html -->
<div id="app">
  <input v-model="text">
  <button @click="add">추가</button>
  <ul><li v-for="item in messages" :key="item.id">{{ item.text }}</li></ul>
</div>
<script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
<script>
Vue.createApp({
  data() {
    return { text: "", messages: [] }
  },
  async mounted() {
    const res = await fetch("http://localhost:5000/api/messages")
    this.messages = (await res.json()).items
  },
  methods: {
    async add() {
      const res = await fetch("http://localhost:5000/api/messages", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({text: this.text})
      })
      this.messages.push(await res.json())
      this.text = ""
    }
  }
}).mount("#app")
</script>`
        },
        practice: {
          title: "Todo 화면과 API 연결",
          prompt: "Flask Todo API를 Vue 화면에서 조회, 생성, 완료 처리까지 연결하세요.",
          steps: [
            "mounted에서 GET /api/todos를 호출한다.",
            "input 값으로 POST /api/todos를 호출한다.",
            "체크박스를 누르면 PATCH /api/todos/<id>를 호출한다.",
            "실패 시 error 메시지를 화면에 표시한다."
          ],
          done: "새로고침 없이 목록이 갱신되고, 서버 오류가 화면 상태로 표현된다."
        },
        expert: [
          "CORS 문제를 해결한다고 프론트 코드에 Access-Control-Allow-Origin을 넣는 것은 잘못된 방향이다.",
          "프론트엔드와 백엔드를 분리하면 계약 테스트와 API 문서화의 가치가 커진다.",
          "운영에서는 reverse proxy로 같은 origin 아래 /api를 붙이는 구조가 단순하고 안정적일 때가 많다."
        ],
        quiz: [
          { q: "CORS 허용 헤더는 어디에서 설정해야 하나?", a: "서버 응답에서 설정해야 합니다. 브라우저는 서버의 허용 여부를 확인합니다." },
          { q: "Vue에서 API 호출 결과를 곧바로 DOM 조작으로 처리하지 않는 이유는?", a: "상태를 바꾸면 Vue가 화면을 갱신하므로 데이터 흐름이 예측 가능하고 유지보수하기 쉽기 때문입니다." }
        ]
      },
      {
        id: 7,
        shortTitle: "에러와 로깅",
        title: "Flask 에러 처리, 로깅, 요청 훅",
        sourceNotebook: "7_flask_others.ipynb",
        level: "Reliability",
        tags: ["Error Handling", "Logging", "Hooks"],
        focus: "없는 페이지, 서버 오류, 요청 로그를 다루며 서비스가 실패할 때도 관찰 가능하고 친절하게 반응하도록 만듭니다.",
        objectives: [
          "errorhandler로 HTML 또는 JSON 오류 응답을 커스터마이징한다.",
          "logging 모듈로 요청과 예외를 기록한다.",
          "before_request, after_request 같은 Flask 훅의 용도를 이해한다.",
          "사용자에게 보여줄 오류와 개발자가 볼 로그를 분리한다."
        ],
        concepts: [
          {
            title: "좋은 에러는 다음 행동을 알려준다",
            body: "404, 400, 500은 모두 실패지만 원인과 사용자의 다음 행동이 다릅니다. 에러 응답은 이 차이를 드러내야 합니다.",
            bullets: [
              "404는 리소스가 없다는 뜻이지 서버가 망가졌다는 뜻이 아니다.",
              "400 계열은 요청을 고치면 해결 가능한 문제다.",
              "500은 내부 오류이므로 사용자에게 상세 스택을 노출하지 않는다."
            ]
          },
          {
            title: "로그는 운영자의 눈이다",
            body: "로그에는 요청 경로, 상태 코드, 처리 시간, 사용자 식별자, request id 같은 추적 단서를 남깁니다.",
            bullets: [
              "print 대신 logging을 사용해 레벨과 출력 대상을 제어한다.",
              "개인정보와 비밀번호는 로그에 남기지 않는다.",
              "장애 분석을 위해 같은 요청을 묶는 request id가 유용하다."
            ]
          },
          {
            title: "요청 훅은 공통 처리를 모으는 지점이다",
            body: "before_request는 요청 전 준비, after_request는 응답 후 헤더 추가나 로깅에 적합합니다.",
            bullets: [
              "인증, 언어 설정, 시작 시간 기록 등을 before_request에서 처리할 수 있다.",
              "CORS, 보안 헤더, 처리 시간 헤더를 after_request에서 붙일 수 있다.",
              "훅이 너무 많은 일을 하면 요청 흐름이 불투명해진다."
            ]
          },
          {
            title: "데코레이터와 훅을 구분한다",
            body: "특정 라우트에만 필요한 정책은 데코레이터, 모든 요청에 필요한 정책은 훅이 어울립니다.",
            bullets: [
              "관리자 권한 검사는 데코레이터가 명확하다.",
              "모든 응답에 request id를 붙이는 작업은 after_request가 자연스럽다.",
              "공통 처리의 범위를 좁게 잡을수록 예외 상황이 줄어든다."
            ]
          }
        ],
        visual: {
          title: "요청 관찰 가능성 흐름",
          steps: [
            { label: "Start", detail: "요청 시작 시간 기록" },
            { label: "Handle", detail: "라우트 처리" },
            { label: "Error", detail: "예외를 응답으로 변환" },
            { label: "Log", detail: "상태와 시간 기록" }
          ]
        },
        example: {
          title: "JSON 에러와 요청 시간 로깅",
          code: String.raw`import logging
import time
from flask import Flask, g, request
from werkzeug.exceptions import HTTPException

app = Flask(__name__)
logging.basicConfig(level=logging.INFO)

@app.before_request
def start_timer():
    g.started_at = time.perf_counter()

@app.after_request
def log_response(response):
    elapsed_ms = (time.perf_counter() - g.started_at) * 1000
    app.logger.info("%s %s %s %.1fms", request.method, request.path, response.status_code, elapsed_ms)
    response.headers["X-Response-Time-ms"] = f"{elapsed_ms:.1f}"
    return response

@app.errorhandler(HTTPException)
def handle_http_error(error):
    return {
        "error": {
            "code": error.code,
            "message": error.description
        }
    }, error.code`
        },
        practice: {
          title: "404와 500을 다르게 처리하기",
          prompt: "API 라우트에는 JSON 에러를, HTML 페이지에는 템플릿 에러 페이지를 반환하도록 분기해보세요.",
          steps: [
            "request.path가 /api/로 시작하는지 확인한다.",
            "API 오류는 JSON으로 반환한다.",
            "HTML 오류는 render_template('404.html')로 반환한다.",
            "의도적으로 예외를 발생시키는 /debug/error 라우트를 만들고 로그를 확인한다."
          ],
          done: "사용자 화면과 개발자 로그가 서로 다른 목적에 맞게 분리된다."
        },
        expert: [
          "에러 핸들러는 오류를 숨기는 도구가 아니라 일관된 응답으로 변환하는 도구다.",
          "로그 레벨 INFO, WARNING, ERROR의 기준을 팀에서 합의해야 운영 노이즈가 줄어든다.",
          "Sentry, OpenTelemetry 같은 도구는 기본 로깅 습관이 잡힌 뒤 붙일 때 효과가 크다."
        ],
        quiz: [
          { q: "404와 500을 같은 방식으로 처리하면 안 되는 이유는?", a: "404는 클라이언트가 요청한 리소스가 없다는 정상적인 실패이고, 500은 서버 내부 오류이므로 대응 방식과 로그 중요도가 다르기 때문입니다." },
          { q: "after_request에서 응답을 반드시 return해야 하는 이유는?", a: "Flask가 최종 응답 객체를 계속 사용해야 하므로 수정한 response를 반환해야 합니다." }
        ]
      },
      {
        id: 8,
        shortTitle: "블로그 MVP",
        title: "블로그 MVP와 Blueprint 기반 구조화",
        sourceNotebook: "8_flask_blog_start.ipynb",
        level: "Application structure",
        tags: ["MVP", "Blueprint", "MVC"],
        focus: "작은 블로그를 만들기 위해 기능을 쪼개고, MVC 관점과 Flask Blueprint로 유지보수 가능한 구조를 잡습니다.",
        objectives: [
          "MVP가 왜 최소 기능이 아니라 최소 검증 단위인지 이해한다.",
          "Flask에서 MVC를 현실적으로 해석한다.",
          "Blueprint로 기능별 라우트를 분리한다.",
          "프로젝트 폴더 구조를 서비스 성장에 맞게 설계한다."
        ],
        concepts: [
          {
            title: "MVP는 빠르게 배울 수 있는 제품이다",
            body: "MVP는 대충 만든 첫 버전이 아니라, 가장 중요한 가설을 가장 작은 기능으로 검증하는 버전입니다.",
            bullets: [
              "블로그라면 글 목록, 글 상세, 구독 같은 핵심 흐름부터 만든다.",
              "관리자 편집기, 검색, 추천은 검증 후 확장한다.",
              "사용자 행동을 기록해야 다음 개선이 가능하다."
            ]
          },
          {
            title: "Flask식 MVC는 유연하다",
            body: "Flask는 엄격한 MVC 프레임워크가 아니지만, 라우트, 템플릿, 모델, 서비스 책임을 나누는 사고가 중요합니다.",
            bullets: [
              "View 함수는 HTTP 요청과 응답을 연결하는 얇은 층으로 둔다.",
              "Template은 HTML 표현을 맡는다.",
              "Service나 repository가 업무 규칙과 DB 접근을 담당한다."
            ]
          },
          {
            title: "Blueprint는 기능 단위 라우트 묶음이다",
            body: "블로그, 인증, 관리자, API처럼 기능 경계가 보이면 Blueprint로 분리하면 좋습니다.",
            bullets: [
              "url_prefix로 기능별 URL 공간을 나눈다.",
              "각 Blueprint는 자체 라우트와 템플릿을 가질 수 있다.",
              "앱 팩토리에서 register_blueprint로 조립한다."
            ]
          },
          {
            title: "폴더 구조는 팀의 생각을 드러낸다",
            body: "좋은 구조는 파일을 찾기 쉽고 변경 범위를 예측하게 해줍니다.",
            bullets: [
              "app/blog/routes.py, app/auth/routes.py처럼 기능 기준으로 시작한다.",
              "공통 확장은 extensions.py에 모아 순환 import를 줄인다.",
              "테스트도 기능 구조를 따라가면 이해가 쉽다."
            ]
          }
        ],
        visual: {
          title: "블로그 앱 구조",
          steps: [
            { label: "App Factory", detail: "앱 생성과 설정" },
            { label: "Blueprint", detail: "기능별 라우트" },
            { label: "Service", detail: "업무 규칙" },
            { label: "Template", detail: "화면 표현" }
          ]
        },
        example: {
          title: "Blueprint로 블로그 라우트 분리",
          code: String.raw`# app/__init__.py
from flask import Flask

def create_app():
    app = Flask(__name__)

    from .blog.routes import bp as blog_bp
    app.register_blueprint(blog_bp, url_prefix="/blog")

    return app

# app/blog/routes.py
from flask import Blueprint, render_template

bp = Blueprint("blog", __name__, template_folder="templates")

POSTS = [
    {"id": 1, "title": "MVP 시작하기", "body": "핵심 흐름부터 만든다."}
]

@bp.get("/")
def index():
    return render_template("blog/index.html", posts=POSTS)

@bp.get("/<int:post_id>")
def detail(post_id):
    post = next((item for item in POSTS if item["id"] == post_id), None)
    return render_template("blog/detail.html", post=post)`
        },
        practice: {
          title: "블로그 기능 경계 나누기",
          prompt: "blog, auth, admin 세 Blueprint를 설계하고 URL 목록을 작성하세요.",
          steps: [
            "각 Blueprint가 담당할 URL을 3개 이상 적는다.",
            "중복되는 템플릿 조각을 base.html과 include로 분리한다.",
            "글 목록과 상세는 더미 데이터로 먼저 구현한다.",
            "다음 단계에서 DB로 바꿀 부분을 주석으로 표시한다."
          ],
          done: "기능별 파일 위치와 URL prefix가 한눈에 이해된다."
        },
        expert: [
          "Blueprint는 파일 나누기 이상의 의미가 있다. 기능 경계를 코드로 표현하는 도구다.",
          "MVP에서는 완벽한 아키텍처보다 변경 가능한 구조가 더 중요하다.",
          "라우트에서 DB 쿼리와 HTML 데이터를 모두 처리하기 시작하면 곧 테스트가 어려워진다."
        ],
        quiz: [
          { q: "Blueprint를 쓰면 자동으로 앱이 좋아질까?", a: "아닙니다. 기능 경계와 책임 분리가 명확할 때 Blueprint가 효과를 냅니다." },
          { q: "MVP에서 가장 먼저 구현할 기능은 어떻게 고르나?", a: "서비스의 핵심 가설을 검증하는 데 필요한 최소 사용자 흐름을 기준으로 고릅니다." }
        ]
      },
      {
        id: 9,
        shortTitle: "데이터베이스",
        title: "Flask와 MySQL, MongoDB 데이터 설계",
        sourceNotebook: "9_flask_mysql_mongodb.ipynb",
        level: "Data layer",
        tags: ["MySQL", "MongoDB", "SQLAlchemy"],
        focus: "구독 이메일처럼 구조가 안정적인 데이터와 접속 로그처럼 유연한 데이터를 구분하고, 안전한 DB 접근 패턴을 익힙니다.",
        objectives: [
          "관계형 DB와 문서형 DB의 사용 맥락을 구분한다.",
          "SQL injection을 피하는 파라미터 바인딩을 사용한다.",
          "연결, 커밋, 롤백, close의 책임을 이해한다.",
          "로그성 데이터의 인덱스와 보관 정책을 고려한다."
        ],
        concepts: [
          {
            title: "MySQL은 구조화된 핵심 데이터에 강하다",
            body: "사용자, 구독, 주문처럼 스키마와 관계가 중요한 데이터는 관계형 DB가 안정적입니다.",
            bullets: [
              "UNIQUE, NOT NULL 같은 제약으로 데이터 품질을 지킨다.",
              "트랜잭션으로 여러 변경을 하나의 작업처럼 처리한다.",
              "스키마 변경은 마이그레이션으로 추적한다."
            ]
          },
          {
            title: "MongoDB는 유연한 이벤트 데이터에 어울린다",
            body: "접속 로그, 행동 이벤트처럼 필드가 자주 바뀌는 데이터는 문서형 저장소가 편할 수 있습니다.",
            bullets: [
              "로그 조회 패턴에 맞는 인덱스를 설계한다.",
              "무한히 쌓이는 데이터는 TTL이나 보관 정책을 둔다.",
              "유연함이 검증 없음이라는 뜻은 아니다."
            ]
          },
          {
            title: "PyMySQL과 SQLAlchemy는 계층이 다르다",
            body: "PyMySQL은 드라이버에 가깝고 SQLAlchemy는 ORM과 SQL 표현 계층을 제공합니다. 학습에는 SQL을 직접 보는 것이 좋고, 실무에는 ORM이 생산성을 높일 수 있습니다.",
            bullets: [
              "초반에는 SQL을 직접 작성하며 데이터 모델을 이해한다.",
              "프로덕션 앱은 세션 관리와 마이그레이션을 포함한 구조가 필요하다.",
              "어떤 도구든 파라미터 바인딩은 필수다."
            ]
          },
          {
            title: "DB 코드는 실패를 전제로 작성한다",
            body: "네트워크, 제약조건, 중복 데이터, 타임아웃은 언제든 발생합니다. 커밋과 롤백 흐름을 명확히 해야 합니다.",
            bullets: [
              "비밀값은 환경변수나 설정 파일로 분리한다.",
              "연결 풀과 타임아웃을 운영 환경에 맞게 설정한다.",
              "DB 오류는 사용자 메시지와 내부 로그를 분리해 처리한다."
            ]
          }
        ],
        visual: {
          title: "데이터 저장소 선택",
          steps: [
            { label: "Schema", detail: "구조가 안정적인가" },
            { label: "Relation", detail: "관계와 제약이 중요한가" },
            { label: "Volume", detail: "로그처럼 많이 쌓이는가" },
            { label: "Query", detail: "어떤 방식으로 읽을 것인가" }
          ]
        },
        example: {
          title: "구독 저장과 접속 로그 기록",
          code: String.raw`# MySQL: 반드시 파라미터 바인딩 사용
import pymysql

def subscribe(email):
    conn = pymysql.connect(host="localhost", user="blog", password="secret", database="blog")
    try:
        with conn.cursor() as cur:
            cur.execute(
                "INSERT INTO subscribers (email) VALUES (%s)",
                (email,)
            )
        conn.commit()
    except Exception:
        conn.rollback()
        raise
    finally:
        conn.close()

# MongoDB: 로그성 이벤트 저장
from datetime import datetime, timezone
from pymongo import MongoClient

client = MongoClient("mongodb://localhost:27017")
logs = client.blog.access_logs

def record_visit(path, ip):
    logs.insert_one({
        "path": path,
        "ip": ip,
        "visited_at": datetime.now(timezone.utc)
    })`
        },
        practice: {
          title: "구독과 방문 로그 구현",
          prompt: "이메일 구독은 MySQL, 방문 로그는 MongoDB에 저장하는 작은 데이터 계층을 설계하세요.",
          steps: [
            "subscribers 테이블에 id, email, created_at, unique email을 정의한다.",
            "이메일 중복 시 409 Conflict를 반환하도록 설계한다.",
            "방문 로그에는 path, ip, user_agent, visited_at을 저장한다.",
            "로그 조회에 필요한 인덱스 후보를 2개 적는다."
          ],
          done: "구조화 데이터와 로그 데이터의 저장 이유가 다르게 설명된다."
        },
        expert: [
          "DB 선택은 유행이 아니라 데이터 무결성, 조회 패턴, 운영 역량으로 결정한다.",
          "SQL 문자열에 사용자 입력을 직접 연결하는 순간 보안 사고 가능성이 열린다.",
          "마이그레이션, 백업, 복구, 모니터링이 없는 DB 연동은 절반만 완성된 것이다."
        ],
        quiz: [
          { q: "파라미터 바인딩을 써야 하는 이유는?", a: "사용자 입력이 SQL 코드로 해석되는 SQL injection을 막고 타입 처리를 안전하게 맡기기 위해서입니다." },
          { q: "로그 데이터를 MongoDB에 저장할 때 꼭 고려할 점은?", a: "조회 패턴에 맞는 인덱스와 데이터 보관 기간입니다. 로그는 빠르게 커질 수 있습니다." }
        ]
      },
      {
        id: 10,
        shortTitle: "로그인",
        title: "Flask-Login으로 세션 기반 인증 구현",
        sourceNotebook: "10_flask_login.ipynb",
        level: "Authentication",
        tags: ["Flask-Login", "Session", "Security"],
        focus: "Flask-Login이 사용자 세션을 어떻게 관리하는지 이해하고, UserMixin, user_loader, login_required를 안전하게 사용합니다.",
        objectives: [
          "Flask-Login의 역할과 한계를 설명한다.",
          "UserMixin과 user_loader로 현재 사용자를 복원한다.",
          "login_user, logout_user, current_user, login_required를 사용한다.",
          "비밀번호 해시, CSRF, secure cookie 같은 보안 기본값을 챙긴다."
        ],
        concepts: [
          {
            title: "Flask-Login은 인증 세션 도구다",
            body: "Flask-Login은 로그인 상태 유지, 현재 사용자 접근, 보호 라우트 처리를 도와줍니다. 사용자 저장소나 권한 모델은 직접 설계해야 합니다.",
            bullets: [
              "로그인 성공 시 사용자 id를 세션에 저장한다.",
              "요청마다 user_loader가 id로 사용자를 다시 불러온다.",
              "권한, 회원가입, 비밀번호 정책은 별도 구현 영역이다."
            ]
          },
          {
            title: "UserMixin은 필요한 속성을 제공한다",
            body: "Flask-Login은 is_authenticated, is_active, is_anonymous, get_id 같은 인터페이스를 기대합니다. UserMixin은 기본 구현을 제공합니다.",
            bullets: [
              "get_id는 문자열 id를 반환한다.",
              "비활성 사용자를 막으려면 is_active 정책을 명확히 한다.",
              "DB 모델과 함께 사용할 때도 UserMixin을 상속할 수 있다."
            ]
          },
          {
            title: "비밀번호는 절대 평문 저장하지 않는다",
            body: "Werkzeug의 generate_password_hash와 check_password_hash 같은 검증된 함수를 사용해 해시를 저장합니다.",
            bullets: [
              "로그인 비교는 평문 대 평문 비교가 아니라 해시 검증이다.",
              "비밀번호 재설정과 로그인 실패 제한도 보안 설계에 포함된다.",
              "테스트 계정도 운영 설정과 분리한다."
            ]
          },
          {
            title: "세션 보안은 쿠키 보안과 연결된다",
            body: "Flask 기본 세션은 서명된 쿠키를 사용합니다. SECRET_KEY와 HTTPS, Secure, HttpOnly, SameSite 설정이 중요합니다.",
            bullets: [
              "SECRET_KEY는 환경변수로 관리한다.",
              "운영에서는 HTTPS와 secure cookie를 사용한다.",
              "폼 POST에는 CSRF 방어를 적용한다."
            ]
          }
        ],
        visual: {
          title: "로그인 상태 복원",
          steps: [
            { label: "Login", detail: "login_user 호출" },
            { label: "Session", detail: "사용자 id 저장" },
            { label: "Loader", detail: "id로 사용자 조회" },
            { label: "Protect", detail: "login_required 검사" }
          ]
        },
        example: {
          title: "Flask-Login 최소 구조",
          code: String.raw`from flask import Flask, redirect, request, url_for
from flask_login import LoginManager, UserMixin, current_user, login_required, login_user, logout_user
from werkzeug.security import check_password_hash, generate_password_hash

app = Flask(__name__)
app.config["SECRET_KEY"] = "replace-with-env-secret"

login_manager = LoginManager(app)
login_manager.login_view = "login"

class User(UserMixin):
    def __init__(self, user_id, email, password_hash):
        self.id = str(user_id)
        self.email = email
        self.password_hash = password_hash

USERS = {
    "ada@example.com": User(1, "ada@example.com", generate_password_hash("passw0rd"))
}

@login_manager.user_loader
def load_user(user_id):
    return next((user for user in USERS.values() if user.id == user_id), None)

@app.post("/login")
def login():
    user = USERS.get(request.form["email"])
    if user and check_password_hash(user.password_hash, request.form["password"]):
        login_user(user)
        return redirect(url_for("dashboard"))
    return "Invalid credentials", 401

@app.get("/dashboard")
@login_required
def dashboard():
    return f"Hello {current_user.email}"

@app.post("/logout")
@login_required
def logout():
    logout_user()
    return redirect(url_for("login"))`
        },
        practice: {
          title: "보호 페이지 만들기",
          prompt: "로그인하지 않으면 접근할 수 없는 /me 페이지를 만들고, 로그인 후 현재 사용자 이메일을 보여주세요.",
          steps: [
            "User 클래스에 email을 추가한다.",
            "user_loader가 id로 User를 반환하게 만든다.",
            "/me 라우트에 @login_required를 붙인다.",
            "잘못된 비밀번호일 때 401을 반환한다."
          ],
          done: "로그인 전에는 보호되고 로그인 후에는 current_user 값이 표시된다."
        },
        expert: [
          "Flask-Login은 세션 관리 도구이지 완성된 인증 시스템이 아니다.",
          "권한 관리는 login_required와 별개다. 관리자 권한은 별도 정책과 데코레이터가 필요하다.",
          "쿠키 기반 인증과 API 토큰 인증을 섞을 때 CSRF와 CORS를 함께 검토한다."
        ],
        quiz: [
          { q: "user_loader는 언제 호출되나?", a: "세션에 저장된 사용자 id를 바탕으로 요청마다 current_user를 복원할 때 호출됩니다." },
          { q: "비밀번호 해시를 쓰는 이유는?", a: "DB가 유출되어도 원래 비밀번호를 바로 알 수 없게 하기 위해서입니다." }
        ]
      },
      {
        id: 11,
        shortTitle: "클래스 기본",
        title: "클래스와 객체로 도메인 모델 만들기",
        sourceNotebook: "11_class_basic.ipynb",
        level: "Object-oriented basics",
        tags: ["Class", "Object", "self"],
        focus: "사각형 예제에서 출발해 웹서비스의 사용자, 글, 구독 같은 도메인 객체를 표현하는 방법으로 확장합니다.",
        objectives: [
          "클래스와 객체, 속성과 메서드의 차이를 이해한다.",
          "self가 현재 객체를 가리킨다는 점을 설명한다.",
          "__init__으로 객체 생성 시 필요한 상태를 초기화한다.",
          "웹서비스의 도메인 규칙을 메서드로 표현한다."
        ],
        concepts: [
          {
            title: "클래스는 객체를 만드는 설계도다",
            body: "클래스는 어떤 속성과 행동을 가진 객체를 만들지 정의합니다. 객체는 그 설계도로 만들어진 실제 값입니다.",
            bullets: [
              "속성은 객체가 기억하는 상태다.",
              "메서드는 객체가 수행할 수 있는 행동이다.",
              "같은 클래스에서 만들어도 객체마다 상태는 다를 수 있다."
            ]
          },
          {
            title: "self는 현재 객체다",
            body: "인스턴스 메서드의 첫 번째 인자인 self는 메서드를 호출한 객체 자신입니다.",
            bullets: [
              "self.email처럼 객체별 값을 읽고 쓴다.",
              "self를 빼면 메서드가 어느 객체의 상태를 다루는지 알 수 없다.",
              "파이썬이 메서드 호출 시 객체를 자동으로 첫 인자로 넘긴다."
            ]
          },
          {
            title: "__init__은 유효한 시작 상태를 만든다",
            body: "객체가 생성될 때 반드시 필요한 값을 받고, 잘못된 상태를 초기에 막는 곳입니다.",
            bullets: [
              "필수 필드는 생성자 인자로 받는다.",
              "간단한 검증은 생성 시점에 할 수 있다.",
              "외부 자원 연결 같은 무거운 작업은 생성자에 넣을지 신중히 판단한다."
            ]
          },
          {
            title: "도메인 객체는 규칙을 품는다",
            body: "웹서비스에서 클래스는 단순 데이터 묶음보다 규칙과 의도를 표현할 때 가치가 큽니다.",
            bullets: [
              "이메일 구독 객체가 이메일 정규화 규칙을 가질 수 있다.",
              "게시글 객체가 발행 가능 여부를 판단할 수 있다.",
              "라우트 함수보다 객체 메서드에 규칙을 두면 테스트가 쉬워진다."
            ]
          }
        ],
        visual: {
          title: "객체 모델의 구성",
          steps: [
            { label: "Class", detail: "설계도" },
            { label: "Instance", detail: "실제 객체" },
            { label: "Attribute", detail: "상태" },
            { label: "Method", detail: "행동" }
          ]
        },
        example: {
          title: "구독 도메인 객체",
          code: String.raw`class EmailSubscription:
    def __init__(self, email, source="blog"):
        normalized = email.strip().lower()
        if "@" not in normalized:
            raise ValueError("invalid email")
        self.email = normalized
        self.source = source
        self.active = True

    def unsubscribe(self):
        self.active = False

    def to_row(self):
        return {
            "email": self.email,
            "source": self.source,
            "active": self.active,
        }

subscription = EmailSubscription(" ADA@Example.com ")
print(subscription.email)      # ada@example.com
print(subscription.to_row())`
        },
        practice: {
          title: "Post 클래스 만들기",
          prompt: "블로그 글을 나타내는 Post 클래스를 만들고 발행 가능 여부를 메서드로 표현하세요.",
          steps: [
            "title, body, author를 __init__에서 받는다.",
            "title이 비어 있으면 ValueError를 발생시킨다.",
            "is_publishable() 메서드가 본문 길이와 제목 존재 여부를 검사한다.",
            "to_dict()로 API 응답에 쓸 dict를 반환한다."
          ],
          done: "객체 생성, 검증, 메서드 호출이 라우트 없이도 테스트된다."
        },
        expert: [
          "좋은 클래스는 데이터를 숨기는 것이 아니라 규칙이 흩어지지 않게 모은다.",
          "객체가 너무 많은 책임을 갖기 시작하면 서비스나 정책 클래스로 분리한다.",
          "도메인 객체를 잘 만들면 Flask와 무관하게 테스트할 수 있는 코드가 늘어난다."
        ],
        quiz: [
          { q: "self는 왜 필요한가?", a: "메서드가 어떤 객체의 속성을 읽고 바꿀지 알 수 있게 해주는 현재 객체 참조입니다." },
          { q: "__init__에 검증을 넣는 장점은?", a: "객체가 잘못된 상태로 만들어지는 것을 초기에 막을 수 있습니다." }
        ]
      },
      {
        id: 12,
        shortTitle: "상속",
        title: "상속, 오버라이드, super로 중복 줄이기",
        sourceNotebook: "12_inheritance.ipynb",
        level: "Object-oriented design",
        tags: ["Inheritance", "Override", "super"],
        focus: "공통 속성과 동작을 부모 클래스로 올리고, 자식 클래스가 다른 부분만 확장하는 법을 배웁니다.",
        objectives: [
          "상속과 추상화의 관계를 설명한다.",
          "자식 클래스에서 부모 메서드를 오버라이드한다.",
          "super()로 부모 초기화와 공통 동작을 재사용한다.",
          "상속보다 합성이 나은 상황을 구분한다."
        ],
        concepts: [
          {
            title: "상속은 is-a 관계에 어울린다",
            body: "학생은 사람이다, 관리자 사용자는 사용자다처럼 자식이 부모의 한 종류일 때 상속이 자연스럽습니다.",
            bullets: [
              "공통 속성은 부모에 둔다.",
              "다른 행동은 자식에서 오버라이드한다.",
              "단순 코드 재사용만을 위해 상속하면 구조가 꼬일 수 있다."
            ]
          },
          {
            title: "오버라이드는 차이를 명시한다",
            body: "부모의 기본 행동을 자식 클래스가 자신에게 맞게 다시 정의하는 것이 오버라이드입니다.",
            bullets: [
              "메서드 이름은 같지만 구현이 다르다.",
              "부모 계약을 깨지 않도록 반환 타입과 의미를 유지한다.",
              "오버라이드가 많아지면 계층 구조를 다시 검토한다."
            ]
          },
          {
            title: "super는 부모와 협력하는 방법이다",
            body: "자식이 부모의 초기화나 공통 처리를 재사용하면서 추가 동작을 넣을 수 있습니다.",
            bullets: [
              "부모 __init__을 직접 클래스명으로 호출하기보다 super()를 쓴다.",
              "다중 상속에서는 메서드 해석 순서와 연결된다.",
              "부모가 보장하는 상태를 자식이 이어받는 데 유용하다."
            ]
          },
          {
            title: "합성은 has-a 관계에 어울린다",
            body: "블로그가 로거를 가진다, 서비스가 저장소를 가진다처럼 부품 관계라면 상속보다 객체를 속성으로 두는 합성이 더 명확합니다.",
            bullets: [
              "권한 정책을 상속 계층으로 늘리기보다 정책 객체로 주입할 수 있다.",
              "합성은 런타임에 교체가 쉽다.",
              "테스트 대역을 넣기에도 유리하다."
            ]
          }
        ],
        visual: {
          title: "상속 판단 흐름",
          steps: [
            { label: "Common", detail: "공통 속성 찾기" },
            { label: "Is-a", detail: "종류 관계 확인" },
            { label: "Override", detail: "차이만 재정의" },
            { label: "Compose", detail: "부품 관계면 합성" }
          ]
        },
        example: {
          title: "알림 발송 클래스 계층",
          code: String.raw`class Notification:
    def __init__(self, recipient):
        self.recipient = recipient

    def render(self, message):
        return message.strip()

    def send(self, message):
        raise NotImplementedError

class EmailNotification(Notification):
    def __init__(self, recipient, subject):
        super().__init__(recipient)
        self.subject = subject

    def send(self, message):
        body = self.render(message)
        return f"Email to {self.recipient}: {self.subject} / {body}"

class SlackNotification(Notification):
    def send(self, message):
        body = self.render(message)
        return f"Slack DM to {self.recipient}: {body}"

sender = EmailNotification("ada@example.com", "Welcome")
print(sender.send("  Flask course started  "))`
        },
        practice: {
          title: "콘텐츠 타입별 렌더러 만들기",
          prompt: "PostRenderer 부모 클래스와 HtmlRenderer, JsonRenderer 자식 클래스를 만들어보세요.",
          steps: [
            "부모 클래스에 title 정규화 메서드를 둔다.",
            "HtmlRenderer.render는 h1과 p 태그 문자열을 반환한다.",
            "JsonRenderer.render는 dict를 반환한다.",
            "공통 정규화는 super 또는 부모 메서드로 재사용한다."
          ],
          done: "공통 로직은 한 곳에 있고 출력 형식만 자식 클래스에서 달라진다."
        },
        expert: [
          "상속은 계층이 깊어질수록 변경 비용이 커진다. 깊이보다 명확성이 먼저다.",
          "부모 클래스의 공개 메서드 의미를 자식이 깨면 리스코프 치환 원칙을 위반한다.",
          "웹 앱에서는 전략 객체, 서비스 주입, 함수 조합이 상속보다 단순할 때가 많다."
        ],
        quiz: [
          { q: "super()를 쓰는 이유는?", a: "부모 클래스의 초기화나 공통 동작을 재사용하면서 자식 클래스의 추가 동작을 더하기 위해서입니다." },
          { q: "상속보다 합성이 나은 예는?", a: "서비스가 저장소나 로거를 사용하는 관계처럼 is-a가 아니라 has-a 관계인 경우입니다." }
        ]
      },
      {
        id: 13,
        shortTitle: "클래스 메서드",
        title: "클래스 변수, 인스턴스 변수, staticmethod, classmethod",
        sourceNotebook: "13_class_method.ipynb",
        level: "Python object model",
        tags: ["Class Method", "Static Method", "Attribute"],
        focus: "객체별 상태와 클래스 공통 상태를 구분하고, 대체 생성자와 순수 유틸리티 메서드를 적절히 배치합니다.",
        objectives: [
          "클래스 변수와 인스턴스 변수의 차이를 설명한다.",
          "인스턴스 메서드, 정적 메서드, 클래스 메서드를 구분해 사용한다.",
          "classmethod로 from_row 같은 대체 생성자를 만든다.",
          "변경 가능한 클래스 변수의 함정을 피한다."
        ],
        concepts: [
          {
            title: "클래스 변수는 공유 상태다",
            body: "클래스 변수는 모든 인스턴스가 공유합니다. 카운터나 설정 상수에는 유용하지만 리스트나 dict 같은 변경 가능한 값은 조심해야 합니다.",
            bullets: [
              "ClassName.value로 접근하면 의도가 분명하다.",
              "self.value에 대입하면 인스턴스 변수가 생길 수 있다.",
              "공유 상태는 테스트 간 오염을 만들 수 있다."
            ]
          },
          {
            title: "인스턴스 메서드는 객체 상태를 다룬다",
            body: "self가 필요한 메서드는 특정 객체의 속성을 읽거나 바꾸는 행동입니다.",
            bullets: [
              "구독 해지, 글 발행, 비밀번호 검증처럼 객체 상태가 필요하다.",
              "대부분의 도메인 행동은 인스턴스 메서드에서 시작한다.",
              "상태 변경 메서드는 이름에 의도를 드러낸다."
            ]
          },
          {
            title: "staticmethod는 클래스 안에 둔 순수 함수다",
            body: "객체 상태도 클래스 상태도 쓰지 않지만, 도메인상 클래스와 가까운 유틸리티에 사용합니다.",
            bullets: [
              "이메일 형식 검사 같은 보조 함수에 적합하다.",
              "남용하면 그냥 모듈 함수보다 장점이 적다.",
              "테스트는 쉽지만 상태와 연결되지 않는다."
            ]
          },
          {
            title: "classmethod는 클래스를 받는 대체 생성자다",
            body: "cls를 받아 현재 클래스 또는 자식 클래스를 생성할 수 있어 from_dict, from_row 같은 생성 패턴에 적합합니다.",
            bullets: [
              "상속 구조에서도 cls(...)가 실제 호출 클래스를 따른다.",
              "DB row나 form data를 객체로 바꿀 때 유용하다.",
              "생성 규칙이 많아지면 별도 factory도 고려한다."
            ]
          }
        ],
        visual: {
          title: "메서드 선택 기준",
          steps: [
            { label: "self", detail: "객체 상태 필요" },
            { label: "cls", detail: "클래스 생성/공유 상태" },
            { label: "none", detail: "상태 없는 유틸리티" },
            { label: "module", detail: "클래스와 무관한 함수" }
          ]
        },
        example: {
          title: "User 클래스의 대체 생성자",
          code: String.raw`class User:
    count = 0

    def __init__(self, email, active=True):
        self.email = self.normalize_email(email)
        self.active = active
        User.count += 1

    def deactivate(self):
        self.active = False

    @staticmethod
    def normalize_email(email):
        return email.strip().lower()

    @classmethod
    def from_row(cls, row):
        return cls(email=row["email"], active=bool(row["active"]))

row = {"email": " ADA@Example.com ", "active": 1}
user = User.from_row(row)
print(user.email)
print(User.count)`
        },
        practice: {
          title: "Form 데이터로 객체 만들기",
          prompt: "Post 클래스에 from_form classmethod를 추가해 Flask request.form 데이터를 객체로 바꾸세요.",
          steps: [
            "title과 body를 정규화하는 staticmethod를 만든다.",
            "from_form(cls, form)에서 cls(title, body)를 반환한다.",
            "빈 제목이면 ValueError를 발생시킨다.",
            "클래스 변수 count로 생성된 Post 수를 추적한다."
          ],
          done: "인스턴스 메서드, staticmethod, classmethod가 각각 다른 책임을 가진다."
        },
        expert: [
          "클래스 변수에 리스트를 두고 인스턴스별 목록처럼 쓰면 모든 객체가 같은 리스트를 공유한다.",
          "classmethod는 상속까지 고려한 생성자이므로 하드코딩된 클래스명보다 유연하다.",
          "도메인과 무관한 유틸리티를 억지로 클래스에 넣으면 코드 탐색성이 떨어진다."
        ],
        quiz: [
          { q: "staticmethod와 classmethod의 핵심 차이는?", a: "staticmethod는 아무 자동 인자를 받지 않고, classmethod는 cls를 받아 클래스 자체를 사용할 수 있습니다." },
          { q: "변경 가능한 클래스 변수를 조심해야 하는 이유는?", a: "모든 인스턴스가 같은 객체를 공유해 예상치 못한 상태 공유가 생길 수 있기 때문입니다." }
        ]
      },
      {
        id: 14,
        shortTitle: "Control 클래스",
        title: "MVC Control 계층과 서비스 클래스 설계",
        sourceNotebook: "14_control_class.ipynb",
        level: "Service design",
        tags: ["Controller", "Service", "MVC"],
        focus: "라우트 함수가 모든 일을 떠안지 않도록 사용자 구독, 세션 관리, 블로그 로직을 클래스와 서비스로 분리합니다.",
        objectives: [
          "Controller, Service, Repository의 책임을 구분한다.",
          "라우트 함수에서 HTTP 처리와 업무 규칙을 분리한다.",
          "사용자 이메일 구독 클래스를 테스트 가능한 형태로 만든다.",
          "세션 관리와 DB 접근을 얇게 감싸 유지보수성을 높인다."
        ],
        concepts: [
          {
            title: "Controller는 HTTP 번역가다",
            body: "Flask 라우트 함수는 request를 읽고 service를 호출한 뒤 response를 만드는 얇은 층이면 충분합니다.",
            bullets: [
              "폼과 JSON 입력을 파싱한다.",
              "서비스 결과를 상태 코드와 템플릿 또는 JSON으로 바꾼다.",
              "DB 상세나 복잡한 규칙을 직접 품지 않는다."
            ]
          },
          {
            title: "Service는 업무 규칙의 집이다",
            body: "구독 가능 여부, 중복 처리, 세션 기록 같은 규칙은 서비스 클래스에 두면 라우트 밖에서도 테스트할 수 있습니다.",
            bullets: [
              "입력 검증과 정책 판단을 한 곳에 모은다.",
              "저장소를 주입받으면 테스트 대역을 넣기 쉽다.",
              "서비스 메서드는 사용 사례 이름으로 짓는다."
            ]
          },
          {
            title: "Repository는 저장소 세부사항을 숨긴다",
            body: "MySQL, MongoDB, 파일 저장소 같은 차이를 repository 뒤에 숨기면 서비스는 저장 방식보다 업무 의미에 집중할 수 있습니다.",
            bullets: [
              "save_subscriber, find_by_email 같은 메서드는 의도를 드러낸다.",
              "SQL 문자열이나 컬렉션 이름은 repository 안에 둔다.",
              "트랜잭션 경계는 서비스와 repository 책임을 명확히 정한다."
            ]
          },
          {
            title: "클래스는 이름공간이 아니라 책임 단위다",
            body: "관련 함수를 클래스에 묶는 것은 좋지만, 모든 함수를 staticmethod로만 넣는다면 모듈 함수와 차이가 적습니다.",
            bullets: [
              "상태나 의존성이 있으면 인스턴스 객체가 자연스럽다.",
              "정말 상태가 없다면 모듈 함수가 더 단순할 수 있다.",
              "클래스 이름은 맡은 책임을 문장처럼 드러내야 한다."
            ]
          }
        ],
        visual: {
          title: "요청에서 저장까지 책임 분리",
          steps: [
            { label: "Route", detail: "HTTP 입력/응답" },
            { label: "Service", detail: "업무 규칙" },
            { label: "Repository", detail: "DB 접근" },
            { label: "Model", detail: "도메인 데이터" }
          ]
        },
        example: {
          title: "구독 서비스로 라우트 얇게 만들기",
          code: String.raw`class DuplicateEmail(Exception):
    pass

class SubscriberRepository:
    def __init__(self):
        self.emails = set()

    def exists(self, email):
        return email in self.emails

    def add(self, email):
        self.emails.add(email)

class SubscriptionService:
    def __init__(self, repository):
        self.repository = repository

    def subscribe(self, raw_email):
        email = raw_email.strip().lower()
        if "@" not in email:
            raise ValueError("invalid email")
        if self.repository.exists(email):
            raise DuplicateEmail(email)
        self.repository.add(email)
        return {"email": email, "status": "subscribed"}

# Flask route는 이렇게 얇아진다.
@app.post("/api/subscribe")
def subscribe():
    try:
        result = subscription_service.subscribe(request.json["email"])
        return result, 201
    except DuplicateEmail:
        return {"error": "already subscribed"}, 409
    except ValueError:
        return {"error": "invalid email"}, 400`
        },
        practice: {
          title: "라우트 리팩터링",
          prompt: "DB insert와 이메일 검증이 섞인 라우트를 SubscriptionService와 Repository로 분리하세요.",
          steps: [
            "현재 라우트가 하는 일을 입력 파싱, 검증, 저장, 응답으로 나눈다.",
            "검증과 중복 처리는 서비스로 옮긴다.",
            "저장 코드는 repository로 옮긴다.",
            "서비스를 Flask 없이 단위 테스트할 수 있는지 확인한다."
          ],
          done: "라우트 함수가 15줄 안팎으로 줄고 업무 규칙은 서비스에서 테스트된다."
        },
        expert: [
          "레이어를 나누는 이유는 멋진 구조가 아니라 변경 비용을 낮추기 위해서다.",
          "작은 앱에서는 과한 추상화가 독이 될 수 있다. 반복과 변경 압력이 보일 때 분리한다.",
          "서비스 클래스는 Flask request 객체에 직접 의존하지 않게 만드는 편이 테스트에 좋다."
        ],
        quiz: [
          { q: "라우트 함수가 얇아야 하는 이유는?", a: "HTTP 처리와 업무 규칙을 분리하면 테스트와 변경이 쉬워지고 책임이 명확해지기 때문입니다." },
          { q: "Repository의 장점은?", a: "저장소 접근 세부사항을 숨겨 서비스가 업무 의미에 집중하게 하고, 테스트 대역을 넣기 쉽게 만듭니다." }
        ]
      },
      {
        id: 15,
        shortTitle: "배포",
        title: "Flask 서비스 배포: ngrok에서 WSGI 운영까지",
        sourceNotebook: "15_deployment.ipynb",
        level: "Deployment",
        tags: ["Deployment", "WSGI", "AWS"],
        focus: "학습용 외부 공개부터 운영 배포까지 연결합니다. Apache 중심의 오래된 흐름은 이해하되, 현재는 WSGI 서버와 reverse proxy, 환경변수, 관찰 가능성을 함께 봅니다.",
        objectives: [
          "개발 서버, 터널링, 운영 WSGI 서버의 차이를 설명한다.",
          "Waitress 또는 Gunicorn으로 Flask 앱을 실행하는 방법을 익힌다.",
          "환경변수, SECRET_KEY, DB URL을 코드에서 분리한다.",
          "배포 체크리스트와 롤백 기준을 만든다."
        ],
        concepts: [
          {
            title: "ngrok은 데모와 테스트용이다",
            body: "로컬 서버를 임시로 외부에 공개하는 데 유용하지만, 운영 배포를 대체하지는 않습니다.",
            bullets: [
              "웹훅 테스트나 짧은 데모에 적합하다.",
              "노출된 URL은 접근 제어와 로그를 확인해야 한다.",
              "장기 운영에는 클라우드 서버나 PaaS를 사용한다."
            ]
          },
          {
            title: "개발 서버는 운영 서버가 아니다",
            body: "Flask 내장 서버는 개발 편의를 위한 것입니다. 운영에서는 WSGI 서버가 요청을 안정적으로 처리해야 합니다.",
            bullets: [
              "Windows 학습 환경에서는 Waitress가 간단하다.",
              "Linux 서버에서는 Gunicorn과 Nginx 조합이 흔하다.",
              "uWSGI, mod_wsgi, Apache도 가능하지만 팀 운영 경험을 고려한다."
            ]
          },
          {
            title: "설정은 환경으로 분리한다",
            body: "SECRET_KEY, DB 비밀번호, API 키는 코드와 Git에 넣지 않고 환경변수나 비밀 관리 도구로 주입합니다.",
            bullets: [
              "개발, 테스트, 운영 설정을 분리한다.",
              "debug는 운영에서 반드시 끈다.",
              "로그 레벨과 DB URL도 환경별로 다르게 둔다."
            ]
          },
          {
            title: "운영은 실행보다 회복이 중요하다",
            body: "서비스는 언젠가 실패합니다. 헬스체크, 로그, 모니터링, 백업, 롤백 계획이 있어야 운영이라고 부를 수 있습니다.",
            bullets: [
              "GET /healthz 같은 헬스체크를 둔다.",
              "배포 전후 DB 마이그레이션 순서를 점검한다.",
              "문제가 생겼을 때 이전 버전으로 돌아가는 절차를 준비한다."
            ]
          }
        ],
        visual: {
          title: "배포 성숙도",
          steps: [
            { label: "Local", detail: "flask run으로 개발" },
            { label: "Tunnel", detail: "ngrok으로 임시 공개" },
            { label: "WSGI", detail: "Waitress/Gunicorn 실행" },
            { label: "Ops", detail: "로그, 헬스체크, 롤백" }
          ]
        },
        example: {
          title: "운영 실행을 위한 기본 명령",
          code: String.raw`# 1. 가상환경과 의존성
python -m venv .venv
.venv\Scripts\activate
pip install flask waitress

# 2. 개발 실행
flask --app app:create_app run --debug

# 3. Windows에서도 쓸 수 있는 WSGI 서버
waitress-serve --listen=127.0.0.1:8000 --call app:create_app

# 4. Linux 서버에서 자주 쓰는 Gunicorn 예시
pip install gunicorn
gunicorn "app:create_app()" --bind 127.0.0.1:8000 --workers 2

# 5. 환경변수 예시
set FLASK_SECRET_KEY=change-me
set DATABASE_URL=mysql+pymysql://user:pass@localhost/blog`
        },
        practice: {
          title: "배포 체크리스트 만들기",
          prompt: "블로그 앱을 클라우드 서버에 올린다고 가정하고 배포 전후 점검표를 작성하세요.",
          steps: [
            "필수 환경변수 목록을 적는다.",
            "헬스체크 URL과 기대 응답을 정의한다.",
            "로그 파일 또는 로그 수집 위치를 정한다.",
            "실패 시 롤백할 기준과 방법을 적는다."
          ],
          done: "앱 실행 명령뿐 아니라 비밀값, 로그, 헬스체크, 롤백까지 포함된다."
        },
        expert: [
          "처음 배포는 성공 여부보다 재현 가능성이 중요하다. 문서화되지 않은 수동 설정은 빚이 된다.",
          "Apache 설정을 배워도 좋지만, 현재 Flask 운영에서는 WSGI 서버와 reverse proxy 개념을 먼저 이해하는 편이 실용적이다.",
          "배포 자동화는 테스트, 마이그레이션, 롤백 전략이 함께 있을 때 진짜 힘을 낸다."
        ],
        quiz: [
          { q: "Flask 개발 서버를 운영에 쓰지 않는 이유는?", a: "개발 편의용 서버라 운영 부하, 안정성, 보안, 프로세스 관리 요구를 충족하도록 설계되지 않았기 때문입니다." },
          { q: "배포에서 환경변수가 중요한 이유는?", a: "비밀값과 환경별 설정을 코드와 분리해 보안과 재현성을 높이기 위해서입니다." }
        ]
      }
    ]
  };
})();
