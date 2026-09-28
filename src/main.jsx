import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { createPortal } from "react-dom";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Volume2,
  VolumeX,
  X,
  Target,
  Filter,
  Layers,
  ShieldCheck,
} from "lucide-react";
import { useLessonAudio } from "../../shared/useLessonAudio";
import "./styles.css";

const illustrationFiles = import.meta.glob("./assets/illustrations/*.png", {
  eager: true,
  query: "?url",
  import: "default",
});
const img = (n) => illustrationFiles[`./assets/illustrations/${n}.png`];

const tabs = [
  "The potluck rule",
  "Where deposits come from",
  "The three-step pipeline",
  "Don't wait for closure",
  "Exam lens",
];

const reveals = {
  hook: {
    title: "Lesson 7.2.6 — Update Organizational Process Assets (OPAs)",
    text: "Organizational process assets work the same way. Every project withdraws from this shared library on day one — templates, checklists, playbooks, policies, estimating databases, risk and trigger libraries, the lessons repository. Enabler 6.3 names the matching deposit obligation: projects that only withdraw leave the organization exactly as smart as they found it.",
    image: "potluck-table-deposit",
  },
  monitoring: {
    title: "Where the Deposits Actually Come From",
    text: "OPA updates appear as an output of nearly every monitoring process in this module, because monitoring is where practice gets tested hard enough to learn from. It's the friction of actually running the work — not the planning of it — that produces something worth depositing back into the library.",
    image: "monitoring-deposits-feed",
  },
  timing: {
    title: "Timing: Don't Wait for Closure",
    text: "Do not wait for closure — assets ship when the learning is proven. A lesson that's genuinely validated in month three of a project shouldn't sit in someone's notes until the project wraps up months later. The moment it's proven, it's ready to deposit — for the current project's own later phases, and for whichever other project might need it next week.",
    image: "proven-midproject-timing",
  },
  exam: {
    title: "Synthesis (Exam Lens)",
    text: "Organizational process assets are the organization's accumulated project capability — templates, checklists, playbooks, policies, estimating databases, risk and trigger libraries, the lessons repository. Every project withdraws from this library; enabler 6.3 names the matching deposit obligation. OPA updates come out of monitoring processes, because monitoring is where practice gets tested hard enough to learn from. The pipeline turns raw lessons into real assets: curate for reuse value, generalize to strip project specifics and keep the pattern, and version and own through a named steward. And the timing rule is simple: assets ship when the learning is proven, not when the project happens to close.",
    image: "exam-opa-potluck",
    bullets: [
      "OPAs: templates, checklists, playbooks, policies, estimating databases, risk/trigger libraries, lessons repository",
      "Every project withdraws; enabler 6.3 names the matching deposit obligation",
      "OPA updates come from monitoring processes — where practice gets tested hard enough to learn from",
      "Three-step pipeline: curate (reuse value), generalize (strip specifics, keep the pattern), version and own (named steward, credited project)",
      "Assets ship when the learning is proven, not held until project closure",
    ],
  },
};

const pipelineSteps = [
  {
    title: "1. Curate",
    text: "Select the learning with reuse value. Ten excellent assets beat a hundred entries nobody reads — asset libraries die of volume more often than scarcity.",
    image: "pipeline-curate",
    icon: Filter,
  },
  {
    title: "2. Generalize",
    text: "Strip the project specifics, keep the pattern. A lesson tied too tightly to one project's exact circumstances helps nobody else.",
    image: "pipeline-generalize",
    icon: Layers,
  },
  {
    title: "3. Version and Own",
    text: "Assets enter through a steward — the PMO or a named owner — versioned, with the contributing project credited. Governance light enough not to deter contribution, firm enough to keep the library trustworthy.",
    image: "pipeline-version-own",
    icon: ShieldCheck,
  },
];

const quizzes = [
  {
    q: "Scenario: A project team dumps every raw lesson from their retrospectives and post-mortems directly into the organization's asset library, without filtering, generalizing, or removing project-specific details. Within a year, the library has thousands of entries, and most team members have stopped checking it because it's too cluttered to be useful. What does this scenario best illustrate?",
    a: [
      "The library failed because it didn't have enough entries to be genuinely useful",
      "Asset libraries die of volume more often than scarcity — raw, uncurated lessons dumped in without curation or generalization make the library too cluttered to actually use",
      "The team should have waited until project closure to add anything to the library",
      "The problem is that no steward or owner reviewed the individual project's contributions for credit",
    ],
    c: 1,
    g: "Correct! This is exactly the volume failure mode this lesson warns about — raw lessons, uncurated and ungeneralized, don't become assets just by being added to a shared space. Ten excellent, curated assets are worth more than thousands of raw, cluttered entries.",
    b: "Reconsider — the library had plenty of entries, so scarcity wasn't the problem; timing (waiting for closure) isn't what's being tested here; and the core issue is curation and generalization, not simply a missing credit step.",
  },
  {
    q: "Scenario: A project team validates a genuinely useful estimating adjustment in month three of a twelve-month project. The project manager decides to hold onto this learning and add it to the organization's estimating database only once the project formally closes, reasoning that \"we'll do all our OPA updates at the end.\" What is the drawback of this approach?",
    a: [
      "There is no drawback — OPA updates are meant to be batched and submitted only at project closure",
      "Waiting until closure means the proven learning sits unused for months, unavailable to other projects (or even this project's own later phases) that could benefit from it sooner",
      "The drawback is that estimating databases specifically should never be updated mid-project, regardless of when a lesson is proven",
      "There is no drawback, since organizational process assets only have value once a project is fully closed",
    ],
    c: 1,
    g: "Correct! Assets ship when the learning is proven, not when the project happens to close — waiting means a validated, useful lesson sits idle for months instead of helping other projects (or this one) right away.",
    b: "Reconsider — OPA updates aren't meant to be batched only at closure; nothing about estimating databases specifically requires waiting; and assets have value the moment they're proven, not only once a project ends.",
  },
];

function Modal({ d, close, onComplete }) {
  const [step, setStep] = useState(0);
  useEffect(() => {
    const esc = (e) => e.key === "Escape" && close();
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [close]);

  return createPortal(
    <div className="modal-backdrop" onClick={close}>
      <section className="focus-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-x" onClick={close} aria-label="Close modal">
          <X size={20} />
        </button>
        {step === 0 ? (
          <>
            <img className="modal-illustration" src={img(d.image)} alt="" />
            <h3>{d.title}</h3>
            <div className="modal-copy">
              <p>{d.text}</p>
            </div>
          </>
        ) : (
          <div className="modal-summary">
            <h3>Exam-Relevant Enablers to Remember</h3>
            <ul>
              {d.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </div>
        )}
        {d.bullets && step === 0 ? (
          <button className="modal-action" onClick={() => setStep(1)}>
            Next <ArrowRight size={18} />
          </button>
        ) : (
          <button
            className="modal-action"
            onClick={() => {
              if (onComplete) onComplete();
              close();
            }}
          >
            Mark as read <Check size={18} />
          </button>
        )}
      </section>
    </div>,
    document.body
  );
}

function Quiz({ d, review = false, finish }) {
  const [p, setP] = useState(review ? d.c : null);
  return createPortal(
    <div className="knowledge-backdrop">
      <section className="knowledge-modal">
        <p className="quiz-label">
          <Target size={18} /> MICRO KNOWLEDGE CHECK
        </p>
        <h3>{d.q}</h3>
        <div className="answers">
          {d.a.map((x, i) => (
            <button
              key={x}
              disabled={review}
              onClick={() => setP(i)}
              className={p === i ? (i === d.c ? "correct" : "wrong") : ""}
            >
              <span>{String.fromCharCode(65 + i)}</span>
              {x}
            </button>
          ))}
        </div>
        {p !== null && (
          <>
            <p className={`feedback ${p === d.c ? "good" : "bad"}`}>
              {p === d.c ? d.g : d.b}
            </p>
            <button className="finish-check" onClick={finish}>
              {review ? "Done" : "Finish check"} {review ? <Check size={18} /> : <ArrowRight size={18} />}
            </button>
          </>
        )}
      </section>
    </div>,
    document.body
  );
}

function KnowledgeActions({ complete, onOpen, centered = false }) {
  if (!complete) {
    return <button className={`knowledge-cta ${centered ? "centered" : ""}`} onClick={() => onOpen(false)}><Target size={18} /> Start knowledge check <ArrowRight size={18} /></button>;
  }
  return (
    <div className={`knowledge-actions completed ${centered ? "centered" : ""}`}>
      <div className="knowledge-complete"><span><Check size={18} /></span><div><strong>Knowledge check completed</strong><small>You can review your answer or try again.</small></div></div>
      <div className="knowledge-action-buttons">
        <button className="knowledge-cta" onClick={() => onOpen(true)}><Target size={18} /> Review answers</button>
        <button className="knowledge-retake" onClick={() => onOpen(false)}>Retake</button>
      </div>
    </div>
  );
}

function App() {
  const [s, setS] = useState(0);
  const [done, setDone] = useState(Array(5).fill(false));
  const [modal, setModal] = useState(null);
  const [quiz, setQuiz] = useState(null);
  const [quizReview, setQuizReview] = useState(false);
  const [sound, setSound] = useState(true);
  const [pipelineRead, setPipelineRead] = useState(Array(3).fill(false));
  const [timingReviewed, setTimingReviewed] = useState(false);

  useLessonAudio(sound);

  const mark = (i = s) =>
    setDone((d) => d.map((x, j) => (j === i ? true : x)));
  const go = (i) => i >= 0 && i < 5 && (i <= s + 1 || done[i - 1]) && setS(i);

  let c;

  if (s === 0)
    c = (
      <div className="hero-layout">
        <div>
          <p className="eyebrow">Lesson 7.2.6 — Update Organizational Process Assets (OPAs)</p>
          <h1>A neighborhood potluck works only because people also bring a dish.</h1>
          <p className="lead">
            A neighborhood potluck works only because the people who eat from the table also bring a dish. If everyone just showed up hungry and never contributed anything, the table would be empty within a month.
          </p>
          <button
            className="primary-cta"
            disabled={done[0]}
            onClick={() => !done[0] && setModal("hook")}
          >
            {done[0] ? "Matching deposit obligation reviewed" : "Reveal matching deposit obligation"}{" "}
            <ArrowRight size={18} />
          </button>
        </div>
        <img className="lesson-art" src={img("potluck-table-deposit")} alt="Potluck table OPA analogy" />
      </div>
    );

  if (s === 1)
    c = (
      <div className="hero-layout">
        <div>
          <h2>Where the Deposits Actually Come From</h2>
          <p className="lead">
            OPA updates aren't a separate task bolted onto the end of a project. They come from somewhere very specific.
          </p>
          <button
            className="primary-cta"
            disabled={done[1]}
            onClick={() => !done[1] && setModal("monitoring")}
          >
            {done[1] ? "Monitoring output engine reviewed" : "Reveal where deposits come from"}{" "}
            <ArrowRight size={18} />
          </button>
        </div>
        <img className="lesson-art" src={img("monitoring-deposits-feed")} alt="Monitoring feeding OPA" />
      </div>
    );

  if (s === 2)
    c = (
      <div className="wide-page">
        <h2>The Pipeline: Curate, Generalize, Version</h2>
        <p className="lead">
          Raw lessons do not belong in the asset library — assets do. Three honest steps turn one into the other. Click each to explore.
        </p>
        <div className="card-grid three">
          {pipelineSteps.map((step, i) => {
            const Icon = step.icon;
            const isRead = pipelineRead[i];
            return (
              <button
                className={`click-card ${isRead ? "read" : ""}`}
                onClick={() => {
                  setPipelineRead((r) => r.map((v, j) => (j === i ? true : v)));
                  setModal({
                    title: step.title,
                    text: step.text,
                    image: step.image,
                  });
                }}
                key={step.title}
              >
                <span className="card-icon">
                  <Icon size={28} />
                </span>
                <strong>{step.title}</strong>
                {isRead ? (
                  <Check className="card-arrow check" size={20} />
                ) : (
                  <ArrowRight className="card-arrow" size={20} />
                )}
              </button>
            );
          })}
        </div>
        {pipelineRead.every(Boolean) && (
          <KnowledgeActions centered complete={done[2]} onOpen={(review) => { setQuizReview(review); setQuiz(0); }} />
        )}
      </div>
    );

  if (s === 3)
    c = (
      <div className="hero-layout">
        <div>
          <h2>Timing: Don't Wait for Closure</h2>
          <p className="lead">
            One more detail changes when a deposit actually happens — and it isn't at the end.
          </p>
          <button
            className="primary-cta"
            onClick={() => setModal("timing")}
          >
            {timingReviewed ? "Timing rule reviewed" : "Reveal timing rule"}{" "}
            <ArrowRight size={18} />
          </button>
          {timingReviewed && (
            <KnowledgeActions complete={done[3]} onOpen={(review) => { setQuizReview(review); setQuiz(1); }} />
          )}
        </div>
        <img className="lesson-art" src={img("proven-midproject-timing")} alt="Proven learning timing" />
      </div>
    );

  if (s === 4)
    c = (
      <div className="exam-layout">
        <div className="exam-visual">
          <img src={img("exam-opa-potluck")} alt="Potluck exam synthesis" />
        </div>
        <div>
          <h2>Synthesis (Exam Lens)</h2>
          <p className="lead">
            Back to that potluck table one more time — because a project that only ever eats leaves the organization exactly as hungry as it found it.
          </p>
          <button
            className="primary-cta"
            disabled={done[4]}
            onClick={() => setModal("exam")}
          >
            {done[4] ? "Exam review complete" : "Reveal exam enablers"}{" "}
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    );

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="course-select">
          <span className="crumb">Module 7</span>
          <span className="crumb-sep">/</span>
          <span className="crumb-current">Lesson 7.2.6 — Update Organizational Process Assets (OPAs)</span>
        </div>
        <div className="module-progress">
          <div>
            {Array.from({ length: 10 }, (_, i) => (
              <span
                className={`progress-dot ${
                  i < 6 ? "done" : i === 6 ? "active" : ""
                }`}
                key={i}
              >
                {i < 6 ? <Check size={10} /> : <span />}
              </span>
            ))}
          </div>
        </div>
        <div className="top-actions">
          <button className="ghost-button" onClick={() => setSound(!sound)}>
            {sound ? <Volume2 size={16} /> : <VolumeX size={16} />}
            <span>{sound ? "Sound on" : "Sound off"}</span>
          </button>
          <button className="ghost-button">
            <X size={16} />
            <span>Quit</span>
          </button>
        </div>
      </header>
      <main className="workspace">
        <section className="lesson-stage">
          <article className="lesson-card">
            <div className="section-tabs">
              <p>SECTION {s + 1} OF 5</p>
              <div>
                {tabs.map((x, i) => (
                  <button
                    className={`${done[i] ? "done" : ""} ${
                      s === i ? "active" : ""
                    }`}
                    key={x}
                    onClick={() => go(i)}
                  >
                    {done[i] && <Check size={14} />}
                    {x}
                  </button>
                ))}
              </div>
            </div>
            <div className="lesson-content">{c}</div>
            {done[s] && (
              <p className="completion">
                <Check size={16} /> Section complete — continue when ready.
              </p>
            )}
            <footer className="nav-footer">
              <button
                className="secondary-button"
                disabled={!s}
                onClick={() => go(s - 1)}
              >
                <ArrowLeft size={16} /> Previous
              </button>
              <button
                className={`primary-button ${done[s] ? "unlocked" : ""}`}
                disabled={!done[s]}
                onClick={() => s < 4 && go(s + 1)}
              >
                Continue <ArrowRight size={16} />
              </button>
            </footer>
          </article>
        </section>
      </main>
      {modal && (
        <Modal
          d={typeof modal === "string" ? reveals[modal] : modal}
          close={() => setModal(null)}
          onComplete={() => {
            if (modal === "hook") mark(0);
            if (modal === "monitoring") mark(1);
            if (modal === "timing") setTimingReviewed(true);
            if (modal === "exam") mark(4);
          }}
        />
      )}
      {quiz !== null && (
        <Quiz
          d={quizzes[quiz]}
          review={quizReview}
          finish={() => {
            mark(quiz === 0 ? 2 : 3);
            setQuiz(null);
          }}
        />
      )}
    </div>
  );
}

const root = createRoot(document.getElementById("root"));
root.render(<App />);
