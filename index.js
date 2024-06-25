const $startGameButton = document.querySelector(".start-quiz")
const $nextQuestionButton = document.querySelector(".next-question")
const $questionsContainer = document.querySelector(".questions-container")
const $questionText = document.querySelector(".question")
const $answersContainer = document.querySelector(".answers-container")
const $answers = document.querySelectorAll(".answer")

let currentQuestionIndex = 0
let totalCorrect = 0

$startGameButton.addEventListener("click", startGame)
$nextQuestionButton.addEventListener("click", displayNextQuestion)

function startGame() {
  $startGameButton.classList.add("hide")
  $questionsContainer.classList.remove("hide")
  displayNextQuestion()
}

function displayNextQuestion() {
  resetState()
  
  if (questions.length === currentQuestionIndex) {
    return finishGame()
  }

  $questionText.textContent = questions[currentQuestionIndex].question
  questions[currentQuestionIndex].answers.forEach(answer => {
    const newAsnwer = document.createElement("button")
    newAsnwer.classList.add("button", "answer")
    newAsnwer.textContent = answer.text
    if (answer.correct) {
      newAsnwer.dataset.correct = answer.correct
    }
    $answersContainer.appendChild(newAsnwer)

    newAsnwer.addEventListener("click", selectAnswer)
  })
}

function resetState() {
  while($answersContainer.firstChild) {
    $answersContainer.removeChild($answersContainer.firstChild)
  }

  document.body.removeAttribute("class")
  $nextQuestionButton.classList.add("hide")
}

function selectAnswer(event) {
  const answerClicked = event.target

  if (answerClicked.dataset.correct) {
    document.body.classList.add("correct")
    totalCorrect++
  } else {
    document.body.classList.add("incorrect") 
  }

  document.querySelectorAll(".answer").forEach(button => {
    button.disabled = true

    if (button.dataset.correct) {
      button.classList.add("correct")
    } else {
      button.classList.add("incorrect")
    }
  })
  
  $nextQuestionButton.classList.remove("hide")
  currentQuestionIndex++
}

function finishGame() {
  const totalQuestions = questions.length
  const performance = Math.floor(totalCorrect * 100 / totalQuestions)
  
  let message = ""

  switch (true) {
    case (performance >= 90):
      message = "Excelente"
      break
    case (performance >= 70):
      message = "Muito bom"
      break
    case (performance >= 50):
      message = "Bom"
      break
    default:
      message = "Pode melhorar"
  }

  $questionsContainer.innerHTML = 
  `
    <p class="final-message">
      Você acertou ${totalCorrect} de ${totalQuestions} questões!
      <span>Resultado: ${message}</span>
    </p>
    <button 
      onclick=window.location.reload() 
      class="button"
    >
      Refazer teste
    </button>
  `
}

const questions = [
    {
      question: "Em que ano foi lançado o primeiro filme da Barbie?",
      answers: [
        { text: "2003", correct: false },
        { text: "1990", correct: false },
        { text: "1987", correct: true },
        { text: "1980", correct: false }
      ]
    },
    {
      question: "Qual o primeiro filme da Barbie?",
      answers: [
        { text: "Barbie em o quebra-nozes.", correct: true },
        { text: "barbie escola de princesas.", correct: false },
        { text: "barbie moda e magia.", correct: false },
        { text: "Barbie e as 12 princesas bailarinas.", correct: false }
      ]
    },
    {
      question: "Qual a cor preferida da Barbie?",
      answers: [
        { text: "Rosa.", correct: true },
        { text: "Preto.", correct: false },
        { text: "Roxo.", correct: false },
        { text: "Branco.", correct: false }
      ]
    },
    {
      question: "Qual o verdadeiro nome da Barbie?",
      answers: [
        { text: "Barbie Barbosa.", correct: false },
        { text: "Barbara da Silva.", correct: false },
        { text: "Barbara cavalcante.", correct: false },
        { text: "Barbara Milicent Roberts.", correct: true}
      ]
    },
    {
      question: "Qual o nome do namorado da Barbie?",
      answers: [
        { text: "Bread.", correct: false },
        { text: "Max Steel.", correct: false },
        { text: "Ken.", correct: true },
        { text: "Bryan.", correct: false}
      ]
    },
    {
      question: "Quantos filmes a Barbie tem?",
      answers: [
        { text: "30.", correct: false },
        { text: "25.", correct: false },
        { text: "42.", correct: true },
        { text: "50.", correct: false}
      ]
    },
    {
      question: "Quantas irmãs a Barbie tem?",
      answers: [
        { text: "3.", correct: true },
        { text: "2.", correct: false },
        { text: "4.", correct: false},
        { text: "5.", correct: false}
      ]
    },
    {
      question: "Quem é a atriz que interpretou a Barbie no live Action?",
      answers: [
        { text: "Margot Robbie.", correct: true },
        { text: "Selena Gomez.", correct: false },
        { text: "Emma Macrey.", correct: false},
        { text: "Jenifer Lopez.", correct: false}
      ]
    },
    {
      question: "Qual foi a primeira profissão da Barbie?",
      answers: [
        { text: "Aeromoça.", correct: true },
        { text: "Veterinária.", correct: false },
        { text: "Médica.", correct: false},
        { text: "Juíza.", correct: false}
      ]
    },
    {
      question: "Em que ano foi lançado o live action da Barbie?",
      answers: [
        { text: "2021.", correct: false},
        { text: "2022.", correct: false },
        { text: "2023.", correct: true},
        { text: "2023.", correct: false}
      ]
    }
  ]
  