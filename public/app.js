// Initialize Firebase
var firebaseConfig = {
  apiKey: "AIzaSyBOA4_TtqzQyVFPvRbVZWHcR8byGLIRHRk",
  authDomain: "quizapp-8-b44b8.firebaseapp.com",
  projectId: "quizapp-8-b44b8",
  storageBucket: "quizapp-8-b44b8.firebasestorage.app",
  messagingSenderId: "970064903090",
  appId: "1:970064903090:web:b597857728aa0da82542ab"
};

firebase.initializeApp(firebaseConfig);

// Quiz data
const questions = [
  {
    question: "Q1: HTML stands for?",
    option1: "Hyper Text Markup Language",
    option2: "High Text Markup Language",
    option3: "Hyperlinks and Text Markup Language",
    corrAnswer: "Hyper Text Markup Language"
  },
  {
    question: "Q2: CSS stands for?",
    option1: "Cascading Style Sheets",
    option2: "Cascoding Style Sheets",
    option3: "Cascating Style Sheets",
    corrAnswer: "Cascading Style Sheets"
  },
  {
    question: "Q3: Which tag is used for the largest heading?",
    option1: "<h1>",
    option2: "<h2>",
    option3: "<h6>",
    corrAnswer: "<h1>"
  },
  
  {
    question: "Which tag is used to make element unique ",
    option1: "id",
    option2: "class",
    option3: "label",
    corrAnswer: "id",
  },
  {
    question: "Any element assigned with id, can be get in css ",
    option1: "by # tag",
    option2: "by @ tag",
    option3: "by & tag",
    corrAnswer: "by # tag",
  },
  {
    question: "CSS can be used with __ methods ",
    option1: "8",
    option2: "3",
    option3: "4",
    corrAnswer: "3",
  },
  {
    question: "In JS variable types are ____ ",
    option1: "6",
    option2: "3",
    option3: "8",
    corrAnswer: "8",
  },
  {
    question: "In array we can use key name and value ",
    option1: "True",
    option2: "False",
    option3: "None of above",
    corrAnswer: "False",
  },
  {
    question: "toFixed() is used to define length of decimal ",
    option1: "True",
    option2: "False",
    option3: "None of above",
    corrAnswer: "True",
  },
  {
    question: "push() method is used to add element in the start of array ",
    option1: "True",
    option2: "False",
    option3: "None of above",
    corrAnswer: "False",
  },
];

let index = 0;
let score = 0;

// DOM elements
const quizSection = document.getElementById("quizSection");
const authSection = document.getElementById("authSection");
const signupForm = document.getElementById("signupForm");
const loginForm = document.getElementById("loginForm");
const questionElement = document.getElementById("ques");
const timerElement = document.getElementById("timer");
const button = document.getElementById("btn");

// Handle Sign Up
function signUp() {
  const email = document.getElementById("signupEmail").value;
  const password = document.getElementById("signupPassword").value;

  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      console.log("Signed up successfully:", userCredential);
      showQuizSection();
    })
    .catch((error) => {
      alert(error.message);
    });
}

// Handle Login
function login() {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      console.log("Logged in successfully:", userCredential);
      showQuizSection();
    })
    .catch((error) => {
      alert(error.message);
    });
}

// Show Quiz Section after Login/Signup
function showQuizSection() {
  authSection.style.display = "none";
  quizSection.style.display = "block";
  startTimer();  // Start the timer once the quiz section is shown
  showNextQuestion();  // Show the first question
}

// Log Out
function logout() {
  firebase.auth().signOut()
    .then(() => {
      console.log("Logged out successfully");
      authSection.style.display = "block";
      quizSection.style.display = "none";
    })
    .catch((error) => {
      alert(error.message);
    });
}

// Show Signup Form
function showSignupForm() {
  signupForm.style.display = "block";
  loginForm.style.display = "none";
}

// Show Login Form
function showLoginForm() {
  signupForm.style.display = "none";
  loginForm.style.display = "block";
}

// Timer function (to be used in quiz section)
function startTimer() {
  let min = 1;
  let sec = 59;

  setInterval(() => {
    timerElement.innerText = `${min}:${sec}`;
    sec--;
    if (sec < 0) {
      min--;
      sec = 59;

      if (min < 0) {
        min = 1;
        sec = 59;
        showNextQuestion();
      }
    }
  }, 1000);
}

// Show next question logic
// Next Question logic
function showNextQuestion() {
  const options = document.getElementsByClassName("options");

  // Check if there's a question to access
  if (index >= questions.length) {
    alert("Quiz Over! Your score is: " + score);
    return;
  }

  // Check the selected option
  for (let i = 0; i < options.length; i++) {
    if (options[i].checked) {
      const selectedOption = options[i].value;
      const getOption = questions[index][`option${selectedOption}`];  // Fix here: access the current question
      const corrAnswer = questions[index]["corrAnswer"];  // Fix here: access the current question

      if (getOption === corrAnswer) {
        score++;
      }
    }

    // Reset the options for the next question
    options[i].checked = false;
    document.getElementById("label" + options[i].value).classList.remove("selected");
  }

  button.disabled = true;

  // Set the current question and options
  questionElement.innerText = questions[index].question;
  document.getElementById("label1").innerText = questions[index].option1;
  document.getElementById("label2").innerText = questions[index].option2;
  document.getElementById("label3").innerText = questions[index].option3;
  

  // Increment the index to go to the next question
  index++;
}


// Option clicked logic
function clicked() {
  button.disabled = false;

  const labels = document.querySelectorAll("label");
  labels.forEach((label) => {
    label.classList.remove("selected");
  });

  const selectedLabel = document.querySelector(`label[for='opt${event.target.value}']`);
  selectedLabel.classList.add("selected");
}
