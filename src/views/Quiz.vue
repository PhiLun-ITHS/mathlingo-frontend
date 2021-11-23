<template>
  <div class="quiz">
    <div id="content">


      <h1>QUIZ</h1>

      <div v-if="showStart || complete">
      <section class="grid-container">
        <div id="homeBackground">
          <main id="subPages">

            <p v-if="showStart">
                Du möts nu av fyra spännande Quiz!<br>
                När du har klarat alla fyra kommer du låsa upp ett slutquiz.<br><br>
            </p>

            <article v-if="showStart">
              <button class="quiz-btn"
              @click="startQuiz">START QUIZ ->
              </button>
            </article>

            <h1 v-if="complete && !finalComplete" style="font-size: 26px">Correct {{ userCorrect }} of {{ this.questions.length }}</h1>
            <h1 v-if="complete && !finalComplete" style="font-size: 30px" v-bind:style="{color: feedbackColor}">{{ this.feedback }}</h1>
            <article v-if="complete && !finalComplete">
              <button class="home-btn"
                      @click="nextQuiz"
              >Next</button>
            </article>

            <div v-if="finalComplete">
              <h1>Quiz finished!</h1><br>
              <router-link style="text-decoration: none;" to="/mypage">
              <button class="quiz-btn">Your statistics</button>
              </router-link>
            </div>

          </main>
        </div>
      </section>
      </div>

    <div v-if="showQuiz">
    <div id="quizBackground">
      <p v-if="!finalComplete" style="font-size: 16px;">{{ this.category }} - {{ this.difficulty }} - {{ index + 1 }} of {{ questions.length }}</p>

      <h1 v-if="!finalComplete && !loading" style="font-size: 30px">Vad är {{currentQuestion.question}}</h1>

      <div v-if="!complete && !loading">
      <section class="button-container">

            <button class="quiz-btn"
                    v-for="answer in currentQuestion.answers"
                    :index="currentQuestion.key"
                    :key="answer"
                    v-html="answer"
                    @click.prevent="handleButtonClick"
            ></button>

      </section>
      </div>

    </div>
    </div>

    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Quiz",
  data() {
    return {
      questions: [],
      index: 0,
      complete: false,
      finalComplete: false,
      userCorrect: 0,
      loading: true,
      showStart: true,
      showQuiz: false,
      category: '',
      difficulty: 'Easy',
      quizCategory: ['Addition', 'Subtraction', 'Multiplication', 'Division'],
      quizCategoryIndex: 0,
      quizEasyProgress: [false, false, false, false],
      quizHardProgress: [false, false, false, false],
      quizFinalProgress: [false, false],
      quizEasyScore: [0, 0, 0, 0],
      quizHardScore: [0, 0, 0, 0],
      quizFinalScore: [0, 0],
      feedback: '',
      feedbackColor: '',
      passed: false,
      quizEasyScoreNotStored: true,
      quizHardScoreNotStored: true,
      lastClicked: 0,
    };
  },
  computed: {
    currentQuestion() {
      if (this.questions !== []) {
        return this.questions[this.index];
      }
      return null;
    },
  },
  methods: {
    startQuiz() {
      this.showStart = false;
      this.initializeCategory();
      this.fetchQuestions();
      this.showQuiz = true;
    },
    initializeCategory(checkProgressEasy, checkProgressHard) {
      if (checkProgressEasy) {
        this.category = 'Final';
        this.difficulty = 'Easy';
        this.quizCategoryIndex = 0;
      } else if (checkProgressHard) {
        this.category = 'Final';
        this.difficulty = 'Hard';
        this.quizCategoryIndex = 0;
      } else {
        this.passed = false;
        if (this.quizCategoryIndex < 4) {
          this.category = this.quizCategory[this.quizCategoryIndex];
        }
      }
    },
    handleButtonClick: function(event) {
      //prevent double-click
      if (Date.now() - this.lastClicked < 301) return;
      this.lastClicked = Date.now();

      // user input
      let index = event.target.getAttribute("index");
      let pollutedUserAnswer = event.target.innerHTML;
      let userAnswer = pollutedUserAnswer.replace(/'/, "&#039;");

      this.questions[index].userAnswer = userAnswer;
      //checking if answer is CORRECT and adding point
      this.checkAnswer(event, index);
    },
    checkAnswer: function(event, index) {

      let question = this.questions[index];

      if(question.userAnswer === question.correct_answer) {
        this.userCorrect++;
      }

      if (question.userAnswer) {
        if (this.index < this.questions.length - 1) {
          setTimeout(function() {
            this.index += 1;
          }.bind(this), 300);
        }
        else {
          this.complete = true;
          this.showQuiz = false;
          let passedQuiz = false;
          if (this.userCorrect / this.questions.length >= 0.1) {
            passedQuiz = true;
            this.passed = true;
          }
          this.quizFeedback(passedQuiz);

          if(passedQuiz) {
            if (this.difficulty === 'Easy' && this.category !== 'Final') {
              this.quizEasyProgress[this.quizCategoryIndex] = passedQuiz;
              this.quizEasyScore[this.quizCategoryIndex] = this.userCorrect;
              this.quizCategoryIndex++;
            } else if (this.difficulty === 'Easy' && this.category === 'Final') {
              this.quizFinalProgress[0] = passedQuiz;
              this.quizFinalScore[0] = this.userCorrect;

              //send results_final (EASY)
              this.storeUserFinalEasyScore();

              if (passedQuiz) {
                this.difficulty = 'Hard';
                this.initializeCategory();
              }
            } else if (this.difficulty === 'Hard' && this.category !== 'Final') {
              this.quizHardProgress[this.quizCategoryIndex] = passedQuiz;
              this.quizHardScore[this.quizCategoryIndex] = this.userCorrect;
              this.quizCategoryIndex++;
            } else if (this.difficulty === 'Hard' && this.category === 'Final') {
              this.quizFinalProgress[1] = passedQuiz;
              this.quizFinalScore[1] = this.userCorrect;
              //send results_final (HARD)
              this.storeUserFinalHardScore();

              //all quiz done
              if (passedQuiz) {
                this.category = '';
                this.finalComplete = true;
                this.showQuiz = false;
              }
            }
          }
        }
      }
    },
    nextQuiz() {
      if (this.passed) {
        this.initializeCategory();
        let checkProgressEasy = false;
        let checkProgressHard = false;

        if (this.difficulty === 'Easy' && this.quizEasyScoreNotStored) {
          checkProgressEasy = this.quizEasyProgress.every(v => v === true);
          if (checkProgressEasy) {
            checkProgressEasy = true;
            this.quizEasyScoreNotStored = false;
            //sending results_easy
            this.storeUserScore(checkProgressEasy, checkProgressHard);
            this.initializeCategory(checkProgressEasy, checkProgressHard);
          }
        }
        else if (this.difficulty === 'Hard' && this.quizHardScoreNotStored) {
          checkProgressHard = this.quizHardProgress.every(v => v === true);
          if (checkProgressHard) {
            checkProgressHard = true;
            this.quizHardScoreNotStored = true;
            //sending results_hard
            this.storeUserScore(checkProgressEasy, checkProgressHard);
            this.initializeCategory(checkProgressEasy, checkProgressHard);
          }
        }
      }
      if (this.category != null) {
        this.complete = false;
        this.userCorrect = 0;
        this.index = 0;
        this.fetchQuestions();
      }
    },
    quizFeedback(quizPassed) {
      if (quizPassed) {
        this.feedback = 'PASSED :-)';
        this.feedbackColor = '#0CFA34';
      } else {
        this.feedback = 'FAILED :-(';
        this.feedbackColor = '#FA8F19';
      }
    },
    async fetchQuestions() {
      this.loading = true;
      let response = await fetch(
          "http://localhost:4000/auth/quiz");

      let jsonResponse = await response.json();

      //sorting by category & difficulty
      jsonResponse = jsonResponse.quiz.filter(el => el.category.includes(this.category));
      jsonResponse = jsonResponse.filter(el => el.difficulty.includes(this.difficulty));

      let index = 0;
      let data = jsonResponse.map((question) => {

        let max = Number.parseInt(question.correct_answer) + 3;
        let min = Number.parseInt(question.correct_answer) - 1;

        let incorrect1 = Math.floor(Math.random() * (max - min) + min);
        while(incorrect1 === Number.parseInt(question.correct_answer)) {
          incorrect1 = Math.floor(Math.random() * (max - min) + min);
        }

        let incorrect2 = Math.floor(Math.random() * (max - min) + min);
        while((incorrect2 === Number.parseInt(question.correct_answer) || incorrect2 === incorrect1)) {
          incorrect2 = Math.floor(Math.random() * (max - min) + min);
        }

        let incorrect3 = Math.floor(Math.random() * (max - min) + min);
        while((incorrect3 === Number.parseInt(question.correct_answer) || incorrect3 === incorrect1 || incorrect2 === incorrect3)) {
          incorrect3 = Math.floor(Math.random() * (max - min) + min);
        }

        // correct & incorrect answer linked to each question
        question.answers = [question.correct_answer, incorrect1, incorrect2, incorrect3];

        //answer shuffle
        for (let i = question.answers.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [question.answers[i], question.answers[j]] = [
            question.answers[j],
            question.answers[i],
          ];
        }
        question.key = index;
        index++;
        return question;
      });
      this.questions = data;
      this.loading = false;
      this.showQuiz = true;
    },
    storeUserScore(checkProgressEasy, checkProgressHard) {

      let token = localStorage.getItem('accessToken');
      let result;
      let urlEndpoint;

      if(checkProgressEasy && !checkProgressHard) {
        let results_easy;
        urlEndpoint = 'results_easy';
        results_easy = {
          "addition": this.quizEasyScore[0],
          "subtraction": this.quizEasyScore[1],
          "multiplication": this.quizEasyScore[2],
          "division": this.quizEasyScore[3],
          "accessToken": token};

        result = results_easy;
      } else if (checkProgressHard) {
        let results_hard;
        urlEndpoint = 'results_hard';
        results_hard = {
          "addition": this.quizHardScore[0],
          "subtraction": this.quizHardScore[1],
          "multiplication": this.quizHardScore[2],
          "division": this.quizHardScore[3],
          "accessToken": token};

        result = results_hard;
      }

      axios.post(`http://localhost:4000/auth/${urlEndpoint}`, result);
    },
    storeUserFinalEasyScore() {

      let token = localStorage.getItem('accessToken');

      let result = {
          "final_easy": this.quizFinalScore[0],
          "final_hard": 0,
          "accessToken": token
      };
      axios.post(`http://localhost:4000/auth/results_final`, result);
    },
    storeUserFinalHardScore() {

      let token = localStorage.getItem('accessToken');

      // get user final_easy score from DB
      axios.get(`http://localhost:4000/auth/results_final_token/${token}`)
      .then(response => {
        let finalEasyScore = response.data.final_easy;

        // post final_hard and old final_easy score
        let result = {
          "final_hard": this.quizFinalScore[1],
           "final_easy": finalEasyScore,
          "accessToken": token
        };

        axios.post(`http://localhost:4000/auth/results_final`, result);
      });
    },
  },
};
</script>