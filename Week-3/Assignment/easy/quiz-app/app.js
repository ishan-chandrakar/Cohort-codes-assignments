import { quizData } from './data.js';

const quiz = document.getElementById('quiz');
const questionEl = document.getElementById('question');
const answerEls = document.querySelectorAll('input[name="answer"]');
const a_text = document.getElementById('a_text');
const b_text = document.getElementById('b_text');
const c_text = document.getElementById('c_text');
const d_text = document.getElementById('d_text');
const submitBtn = document.getElementById('submit');

let currentQuiz = 0;
let score = 0;

function loadQuiz() {
  deselectAnswers();
  const currentData = quizData[currentQuiz];
  questionEl.innerText = currentData.question;
  a_text.innerText = currentData.a;
  b_text.innerText = currentData.b;
  c_text.innerText = currentData.c;
  d_text.innerText = currentData.d;
}

function deselectAnswers() {
  answerEls.forEach(el => el.checked = false);
}

function getSelected() {
  let selected = null;
  answerEls.forEach(el => {
    if (el.checked) selected = el.value;
  });
  return selected;
}

submitBtn.addEventListener('click', () => {
  const selected = getSelected();
  if (selected) {
    if (selected === quizData[currentQuiz].correct) {
      score++;
    }

    currentQuiz++;

    if (currentQuiz < quizData.length) {
      loadQuiz();
    } else {
      quiz.innerHTML = `
        <h2>You answered ${score}/${quizData.length} questions correctly.</h2>
        <button onclick="location.reload()">Reload Quiz</button>
      `;
    }
  } else {
    alert('Please select an answer before submitting.');
  }
});

loadQuiz();
