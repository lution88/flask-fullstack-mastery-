(function () {
  const course = window.COURSE;
  const app = document.querySelector("#app");
  const page = document.body.dataset.page;
  const progressKey = "flask-fullstack-mastery-progress";

  if (!course || !app) {
    return;
  }

  const readProgress = () => {
    try {
      return JSON.parse(localStorage.getItem(progressKey) || "[]");
    } catch {
      return [];
    }
  };

  const writeProgress = (items) => {
    localStorage.setItem(progressKey, JSON.stringify(items));
  };

  const escapeHTML = (value) => String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

  const lessonUrl = (lesson) => `lesson-${String(lesson.id).padStart(2, "0")}.html`;

  const tags = (items) => `<div class="tag-row">${items.map((item) => `<span class="tag">${escapeHTML(item)}</span>`).join("")}</div>`;

  const lessonCard = (lesson) => `
    <a class="lesson-card" href="${lessonUrl(lesson)}" data-title="${escapeHTML(`${lesson.title} ${lesson.shortTitle} ${lesson.focus} ${lesson.sourceNotebook} ${lesson.tags.join(" ")}`)}">
      <span class="lesson-number">Lesson ${String(lesson.id).padStart(2, "0")}</span>
      <h3>${escapeHTML(lesson.title)}</h3>
      ${tags(lesson.tags)}
      <p class="card-focus">${escapeHTML(lesson.focus)}</p>
      <span class="card-action">페이지 열기</span>
    </a>
  `;

  const renderIndex = () => {
    const complete = readProgress().length;
    app.innerHTML = `
      <section class="intro-grid">
        <div class="panel">
          <p class="eyebrow">15 notebooks into one production-minded path</p>
          <h1>Flask를 배우는 데서 끝내지 않고, 서비스로 설계하고 운영하는 수준까지</h1>
          <p class="lead">${escapeHTML(course.meta.description)}</p>
          <div class="metric-grid" aria-label="커리큘럼 요약">
            <div class="metric"><strong>${course.lessons.length}</strong><span>번호별 학습 페이지</span></div>
            <div class="metric"><strong>${course.meta.examples}</strong><span>예제와 실습</span></div>
            <div class="metric"><strong>${complete}</strong><span>완료한 학습</span></div>
          </div>
        </div>
        <aside class="panel">
          <p class="eyebrow">학습 흐름</p>
          <h2>기초에서 운영까지</h2>
          <div class="track-map">
            <div class="track-node"><span>1</span><strong>웹 구조와 Flask 기본기</strong></div>
            <div class="track-node"><span>2</span><strong>REST, Jinja, Vue 연동</strong></div>
            <div class="track-node"><span>3</span><strong>블로그, DB, 로그인</strong></div>
            <div class="track-node"><span>4</span><strong>객체지향 설계와 배포</strong></div>
          </div>
        </aside>
      </section>
      <section id="curriculum">
        <div class="toolbar">
          <h2>커리큘럼</h2>
          <input class="search-box" type="search" placeholder="검색: REST, Jinja, 로그인, 배포..." aria-label="학습 검색">
        </div>
        <div class="lesson-grid">${course.lessons.map(lessonCard).join("")}</div>
        <p class="empty-state hidden">검색 결과가 없습니다.</p>
      </section>
      <section id="references" class="source-box">
        <h2>보강 참고문서</h2>
        <ul>
          ${course.sources.map((source) => `<li><a href="${source.url}" target="_blank" rel="noreferrer">${escapeHTML(source.label)}</a></li>`).join("")}
        </ul>
      </section>
    `;
  };

  const renderSideNav = (current) => `
    <aside class="side-nav" aria-label="학습 번호">
      ${course.lessons.map((lesson) => `<a class="${lesson.id === current.id ? "active" : ""}" href="${lessonUrl(lesson)}">${String(lesson.id).padStart(2, "0")} ${escapeHTML(lesson.shortTitle)}</a>`).join("")}
    </aside>
  `;

  const renderVisual = (lesson) => `
    <div class="visual-board" aria-label="${escapeHTML(lesson.visual.title)}">
      <strong>${escapeHTML(lesson.visual.title)}</strong>
      <div class="visual-flow">
        ${lesson.visual.steps.map((step) => `
          <div class="flow-cell">
            <strong>${escapeHTML(step.label)}</strong>
            <span>${escapeHTML(step.detail)}</span>
          </div>
        `).join("")}
      </div>
    </div>
  `;

  const renderConcepts = (lesson) => `
    <section class="content-section">
      <h2>핵심 개념</h2>
      <div class="concept-grid">
        ${lesson.concepts.map((concept) => `
          <article class="concept-block">
            <h3>${escapeHTML(concept.title)}</h3>
            <p>${escapeHTML(concept.body)}</p>
            <ul>${concept.bullets.map((item) => `<li>${escapeHTML(item)}</li>`).join("")}</ul>
          </article>
        `).join("")}
      </div>
      ${renderVisual(lesson)}
    </section>
  `;

  const renderCode = (lesson) => `
    <section class="code-card">
      <div class="code-head">
        <strong>${escapeHTML(lesson.example.title)}</strong>
        <button class="copy-button" type="button" data-copy="${lesson.id}">복사</button>
      </div>
      <pre><code id="code-${lesson.id}">${escapeHTML(lesson.example.code)}</code></pre>
    </section>
  `;

  const renderPractice = (lesson) => `
    <section class="practice-card">
      <h2>실습</h2>
      <h3>${escapeHTML(lesson.practice.title)}</h3>
      <p>${escapeHTML(lesson.practice.prompt)}</p>
      <ul>${lesson.practice.steps.map((step) => `<li>${escapeHTML(step)}</li>`).join("")}</ul>
      <p><strong>완료 기준:</strong> ${escapeHTML(lesson.practice.done)}</p>
    </section>
  `;

  const renderQuiz = (lesson) => `
    <section class="quiz-card">
      <h2>점검 질문</h2>
      <div class="quiz-list">
        ${lesson.quiz.map((item, index) => `
          <article>
            <h3>${escapeHTML(item.q)}</h3>
            <button class="answer-button" type="button" data-answer="${lesson.id}-${index}">답 보기</button>
            <p class="answer hidden" id="answer-${lesson.id}-${index}">${escapeHTML(item.a)}</p>
          </article>
        `).join("")}
      </div>
    </section>
  `;

  const renderLesson = () => {
    const id = Number(document.body.dataset.lesson);
    const lesson = course.lessons.find((item) => item.id === id);
    if (!lesson) {
      app.innerHTML = `<p class="empty-state">학습 페이지를 찾을 수 없습니다.</p>`;
      return;
    }

    document.title = `${String(lesson.id).padStart(2, "0")} ${lesson.title} | Flask Fullstack Mastery`;
    const progress = readProgress();
    const checked = progress.includes(lesson.id) ? "checked" : "";
    const prev = course.lessons.find((item) => item.id === lesson.id - 1);
    const next = course.lessons.find((item) => item.id === lesson.id + 1);

    app.innerHTML = `
      <div class="lesson-layout">
        ${renderSideNav(lesson)}
        <article>
          <header class="lesson-hero">
            <div class="lesson-meta">
              <span>Lesson ${String(lesson.id).padStart(2, "0")}</span>
              <span>${escapeHTML(lesson.sourceNotebook)}</span>
              <span>${escapeHTML(lesson.level)}</span>
            </div>
            <h1>${escapeHTML(lesson.title)}</h1>
            <p class="lead">${escapeHTML(lesson.focus)}</p>
            ${tags(lesson.tags)}
            <div class="progress-line">
              <label><input type="checkbox" data-complete="${lesson.id}" ${checked}> 이 학습 완료</label>
              <a class="button secondary" href="index.html#curriculum">목록</a>
            </div>
          </header>
          <section class="content-section">
            <h2>학습 목표</h2>
            <ul class="objectives">${lesson.objectives.map((item) => `<li>${escapeHTML(item)}</li>`).join("")}</ul>
          </section>
          ${renderConcepts(lesson)}
          ${renderCode(lesson)}
          ${renderPractice(lesson)}
          <section class="content-section">
            <h2>전문가 관점</h2>
            <ul class="expert-list">${lesson.expert.map((item) => `<li>${escapeHTML(item)}</li>`).join("")}</ul>
          </section>
          ${renderQuiz(lesson)}
          <nav class="pager" aria-label="이전 다음 학습">
            ${prev ? `<a class="button secondary" href="${lessonUrl(prev)}">이전: ${escapeHTML(prev.shortTitle)}</a>` : `<span></span>`}
            ${next ? `<a class="button" href="${lessonUrl(next)}">다음: ${escapeHTML(next.shortTitle)}</a>` : `<a class="button" href="index.html">완료</a>`}
          </nav>
        </article>
      </div>
    `;
  };

  document.addEventListener("click", async (event) => {
    const copyButton = event.target.closest("[data-copy]");
    if (copyButton) {
      const code = document.querySelector(`#code-${copyButton.dataset.copy}`)?.textContent || "";
      await navigator.clipboard.writeText(code);
      copyButton.textContent = "복사됨";
      setTimeout(() => {
        copyButton.textContent = "복사";
      }, 1200);
    }

    const answerButton = event.target.closest("[data-answer]");
    if (answerButton) {
      const answer = document.querySelector(`#answer-${answerButton.dataset.answer}`);
      if (answer) {
        answer.classList.toggle("hidden");
      }
    }
  });

  document.addEventListener("change", (event) => {
    const input = event.target.closest("[data-complete]");
    if (!input) return;
    const id = Number(input.dataset.complete);
    const progress = new Set(readProgress());
    if (input.checked) {
      progress.add(id);
    } else {
      progress.delete(id);
    }
    writeProgress([...progress].sort((a, b) => a - b));
  });

  document.addEventListener("input", (event) => {
    if (!event.target.matches(".search-box")) return;
    const query = event.target.value.trim().toLowerCase();
    const cards = [...document.querySelectorAll(".lesson-card")];
    let shown = 0;
    cards.forEach((card) => {
      const hit = card.dataset.title.toLowerCase().includes(query);
      card.classList.toggle("hidden", !hit);
      if (hit) shown += 1;
    });
    document.querySelector(".empty-state")?.classList.toggle("hidden", shown > 0);
  });

  if (page === "index") {
    renderIndex();
  } else if (page === "lesson") {
    renderLesson();
  }
})();
