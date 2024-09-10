// Tableau des questions du quiz
const questions = [
  {
    question: "Je suis un langage de programmation le plus utilisé",
    answers: [
      { text: "Python", correct: false },
      { text: "Java", correct: false },
      { text: "Javascript", correct: true },
      { text: "DOM", correct: false },
    ]
  },
  {
    question: "Quel est le plus grand océan du monde ?",
    answers: [
      { text: "Pacifique", correct: true },
      { text: "Indien", correct: false },
      { text: "Atlantique", correct: false },
      { text: "Arctique", correct: false },
    ]
  },
  {
    question: "Quel est le but de la fonction buildQuiz() dans le script?",
    answers: [
      { text: "Générer dynamiquement le HTML pour les questions et les réponses", correct: true },
      { text: "Afficher les résultats du quiz", correct: false },
      { text: "Réinitialiser le quiz", correct: false },
      { text: "Autres", correct: false },
    ]
  },
  {
    question: "Quelle est la capitale de l'Espagne ?",
    answers: [
      { text: "Dakar", correct: false },
      { text: "Paris", correct: false },
      { text: "Madrid", correct: true },
      { text: "Rome", correct: false },
    ]
  },
];

// Sélection des éléments du DOM
const questionElement = document.getElementById("question"); // Élément pour afficher la question
const answerButtons = document.getElementById("answer-buttons"); // Élément pour les boutons de réponse
const nextButton = document.getElementById("next-btn"); // Bouton pour passer à la question suivante
const restartButton = document.getElementById("restart-btn"); // Bouton pour recommencer le quiz

let currentQuestionIndex = 0; // Index de la question actuelle
let score = 0; // Score du joueur

// Fonction pour démarrer le quiz
function startQuiz() {
  currentQuestionIndex = 0; // Réinitialiser l'index des questions
  score = 0; // Réinitialiser le score
  nextButton.style.display = "none"; // Masquer le bouton "Next" au début
  restartButton.style.display = "none"; // Masquer le bouton "Recommencer" au début
  showQuestion(); // Afficher la première question
}

// Fonction pour afficher la question actuelle
function showQuestion() {
  resetState(); // Réinitialiser l'état (enlever les boutons précédents)
  let currentQuestion = questions[currentQuestionIndex]; // Obtenir la question actuelle
  let questionNo = currentQuestionIndex + 1; // Numéro de la question (commence à 1)
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question; // Afficher la question

  // Créer un bouton pour chaque réponse
  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct; // Ajouter un attribut pour indiquer la réponse correcte
    }
    button.addEventListener("click", selectAnswer); // Ajouter un écouteur d'événement pour chaque bouton
  });
}

// Fonction pour réinitialiser l'état des boutons
function resetState() {
  nextButton.style.display = "none"; // Masquer le bouton "Next"
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild); // Enlever tous les boutons de réponse précédents
  }
}

// Fonction pour gérer la sélection d'une réponse
function selectAnswer(e) {
  const selectedBtn = e.target; // Obtenir le bouton sélectionné
  const isCorrect = selectedBtn.dataset.correct === "true"; // Vérifier si la réponse est correcte
  if (isCorrect) {
    selectedBtn.classList.add("correct"); // Ajouter une classe pour les réponses correctes
    score++; // Incrémenter le score
  } else {
    selectedBtn.classList.add("incorrect"); // Ajouter une classe pour les réponses incorrectes
  }
  // Désactiver tous les boutons de réponse après la sélection
  Array.from(answerButtons.children).forEach(button => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct"); // Afficher la réponse correcte
    }
    button.disabled = true; // Désactiver le bouton
  });
  nextButton.style.display = "block"; // Afficher le bouton "Next"
}

// Écouteur d'événement pour le bouton "Next"
nextButton.addEventListener("click", () => {
  currentQuestionIndex++; // Passer à la question suivante
  if (currentQuestionIndex < questions.length) {
    showQuestion(); // Afficher la question suivante
  } else {
    showScore(); // Afficher le score final si toutes les questions ont été posées
  }
});

// Fonction pour afficher le score final
function showScore() {
  resetState(); // Réinitialiser l'état
  questionElement.innerHTML = `Votre score est ${score} sur ${questions.length}`; // Afficher le score
  nextButton.style.display = "none"; // Masquer le bouton "Next"
  restartButton.style.display = "block"; // Afficher le bouton "Recommencer"
}

// Écouteur d'événement pour le bouton "Recommencer"
restartButton.addEventListener("click", startQuiz); // Appeler startQuiz pour recommencer le quiz

// Démarrer le quiz au chargement de la page
startQuiz();
