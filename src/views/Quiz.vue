<template>
  <div class="quiz">
    <div id="content">


      <h1>QUIZ</h1>

      <div v-if="showStart || complete || showQuizStartingInfo">
      <section class="grid-container">
        <div id="homeBackground">
          <main id="subPages">

            <div v-if="showStart">
              <p style="font-size: 20px">You will now be challenged by four quiz.</p>
              <p>Quiz contains addition, subtraction, multiplication, division.<br>
              When you have passed all you will unlock a final quiz.<br>
              There are two difficulties available. HAVE FUN!</p>
            </div>

            <article v-if="showStart">
              <button class="quiz-btn"
              @click="startQuiz">START
              </button>
            </article>


            <article v-if="showQuizStartingInfo && !allQuizCompleted">
              <div>
              <h2 style="font-size: 28px; text-decoration: underline">Next quiz</h2>
              <h2 style="font-size: 28px; color: rgba(1,250,182,0.8995973389355743);text-shadow: 2px 2px rgba(0,0,0,0.75)">{{this.category}}</h2>
              </div>
              <div style="padding-top: 5px">
              <h2 style="font-size: 28px; text-decoration: underline;">Difficulty</h2>
              <h2 style="font-size: 28px; color: rgba(1,250,182,0.8995973389355743); text-shadow: 2px 2px rgba(0,0,0,0.75)">{{this.difficulty}}</h2>
              </div>
              <div class="round-time-bar" data-style="smooth" style="--duration: 2;">
                <div></div>
              </div>
            </article>

            <h1 v-if="complete && !finalComplete && !showQuizStartingInfo" style="font-size: 26px">Correct {{ userCorrect }} of {{ this.questions.length }}</h1>
            <h1 v-if="complete && !finalComplete && !showQuizStartingInfo" style="font-size: 30px" v-bind:style="{color: feedbackColor}">{{ this.feedback }}</h1>
            <article v-if="complete && !finalComplete">
              <button v-if="checkIfPassed"
                      class="home-btn"
                      @click="nextQuiz"
              >Next</button>
              <button v-else
                      class="home-btn"
                      @click="nextQuiz"
              >Again</button>
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
    <div id="quizBackground" v-bind:style="{background: quizBackgroundColorSwitch}">
      <p v-if="!finalComplete" style="font-size: 16px;">{{ this.category }} - {{ this.difficulty }} - {{ index + 1 }} of {{ questions.length }}</p>

      <h1 v-if="!finalComplete && !loading" style="font-size: 30px">What is {{currentQuestion.question}}?</h1>

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
      showQuizStartingInfo: false,
      category: '',
      difficulty: '',
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
      quizEasyScoreNotStored: [true, true, true, true],
      quizHardScoreNotStored: [true, true, true, true],
      lastClicked: 0,
      startFinal: false,
      allQuizCompleted: false,
      quizBackgroundColorSwitch: 'white',
      checkIfPassed: false,
    };
  },
  beforeMount() {
    let token = localStorage.getItem('accessToken');
    let checkEasyDatabaseProgress = [];
    let checkHardDatabaseProgress = [];
    let checkFinalDatabaseProgress = [];
    //get all database tables
    let urlEasy = `http://localhost:4000/auth/results_easy_token/${token}`;
    let urlHard = `http://localhost:4000/auth/results_hard_token/${token}`;
    let urlFinal = `http://localhost:4000/auth/results_final_token/${token}`;

    let reqOne = axios.get(urlEasy);
    let reqTwo = axios.get(urlHard);
    let reqThree = axios.get(urlFinal);

    axios.all([reqOne, reqTwo, reqThree]).then(axios.spread((...responses) => {
      let responseOne = responses[0]
      let responseTwo = responses[1]
      let responseThree = responses[2]

      checkEasyDatabaseProgress.push(
          responseOne.data.addition,
          responseOne.data.subtraction,
          responseOne.data.multiplication,
          responseOne.data.division,
      );

      checkHardDatabaseProgress.push(
          responseTwo.data.addition,
          responseTwo.data.subtraction,
          responseTwo.data.multiplication,
          responseTwo.data.division,
      );

      checkFinalDatabaseProgress.push(
          responseThree.data.final_easy,
          responseThree.data.final_hard
      );

      // setting every undefined element as 0
      for (let i = 0; i < checkEasyDatabaseProgress.length; i++) {
        if (checkEasyDatabaseProgress[i] >= 4) {
          this.quizEasyProgress[i] = true;
        }
      }
      for (let i = 0; i < checkHardDatabaseProgress.length; i++) {
        if (checkHardDatabaseProgress[i] >= 4) {
          this.quizHardProgress[i] = true;
        }
      }
      for (let i = 0; i < checkFinalDatabaseProgress.length; i++) {
        if (checkFinalDatabaseProgress[i] >= 8) {
          this.quizFinalProgress[i] = true;
        }
      }
    }));
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
      this.showQuizStartingInfo = true;
      let checkProgressEasy = this.quizEasyProgress.every(v => v === true);
      let checkProgressHard = this.quizHardProgress.every(v => v === true);
      let checkProgressFinal = this.quizFinalProgress.every(v => v === true);
      let index = 0;
      if (!checkProgressEasy) {
        for (let i = 0; i < this.quizEasyProgress.length; i++){
            index = this.quizEasyProgress.indexOf(false);
            this.quizCategoryIndex = index;
            this.difficulty = 'Easy';
        }
      } else if (checkProgressEasy && this.quizFinalProgress[0] && !checkProgressHard) {
        for (let i = 0; i < this.quizHardProgress.length; i++){
            index = this.quizHardProgress.indexOf(false);
            this.quizCategoryIndex = index;
            this.difficulty = 'Hard';
        }
      } else if (checkProgressEasy && !this.quizFinalProgress[0]){
        this.difficulty = 'Easy';
        this.category = 'Final';
        this.startFinal = true;
      }
      else if (checkProgressEasy && checkProgressHard) {
        this.difficulty = 'Hard';
        this.category = 'Final';
        this.startFinal = true;
      }

      if (checkProgressEasy && checkProgressHard && checkProgressFinal) {
        this.allQuizCompleted = true;
        this.finalComplete = true;
        this.complete = true;
      } else {
        this.initializeCategory();
        this.fetchQuestions();
      }
    },
    initializeCategory(checkProgressEasy, checkProgressHard) {
      if (checkProgressEasy && !checkProgressHard) {
        this.category = 'Final';
        this.difficulty = 'Easy';
        this.quizCategoryIndex = 0;
      } else if (checkProgressHard) {
        this.category = 'Final';
        this.difficulty = 'Hard';
        this.quizCategoryIndex = 0;
      } else {
        this.passed = false;
        if (this.quizCategoryIndex < 4 && !this.startFinal) {
          this.category = this.quizCategory[this.quizCategoryIndex];
        }
      }
    },
    handleButtonClick: function(event) {
      //prevent double-click
      if (Date.now() - this.lastClicked < 301) return;
      this.lastClicked = Date.now();

      // user clicks get feedback background-color
      this.quizBackgroundColorSwitch = 'aliceblue';
      setTimeout(function (){
        this.quizBackgroundColorSwitch = 'white';
      }.bind(this), 100);

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
          setTimeout(function (){
            this.complete = true;
            this.showQuiz = false;
          }.bind(this), 300);
          // this.complete = true;
          let passedQuiz = false;
          if (this.userCorrect / this.questions.length >= 0.8) {
            passedQuiz = true;
            this.passed = true;
          }
          this.checkIfPassed = this.passed;
          this.quizFeedback(passedQuiz);
            if (this.difficulty === 'Easy' && this.quizEasyScoreNotStored[this.quizCategoryIndex] && this.category !== 'Final') {
              this.quizEasyScoreNotStored[this.quizCategoryIndex] = false;
              this.quizEasyProgress[this.quizCategoryIndex] = passedQuiz;
              this.quizEasyScore[this.quizCategoryIndex] = this.userCorrect;
              this.storeUserScoreEasy();

            } else if (this.difficulty === 'Easy' && this.category === 'Final') {
              this.quizFinalProgress[0] = passedQuiz;
              this.quizFinalScore[0] = this.userCorrect;
              //send results_final (EASY)
              this.storeUserFinalEasyScore();

              if (passedQuiz) {
                this.difficulty = 'Hard';
                this.quizCategoryIndex = 0;
                this.startFinal = false;
                this.initializeCategory();
              }
            } else if (this.difficulty === 'Hard' && this.quizHardScoreNotStored[this.quizCategoryIndex] && this.category !== 'Final') {
              this.quizHardScoreNotStored[this.quizCategoryIndex] = false;
              this.quizHardProgress[this.quizCategoryIndex] = passedQuiz;
              this.quizHardScore[this.quizCategoryIndex] = this.userCorrect;
              //sending results_hard
              this.storeUserScoreHard();

            } else if (this.difficulty === 'Hard' && this.category === 'Final') {
              this.quizFinalProgress[1] = passedQuiz;
              this.quizFinalScore[1] = this.userCorrect;
              //send results_final (HARD)
              this.storeUserFinalHardScore();

              //all quiz done
              if (passedQuiz) {
                setTimeout(function () {
                  this.category = '';
                  this.finalComplete = true;
                  this.showQuiz = false;
                  this.allQuizCompleted = true;
                }.bind(this), 300);
              }
            }
        }
      }
    },
    nextQuiz() {
        if (this.passed) {
          this.quizCategoryIndex++;
        }
        let checkProgressEasy = false;
        let checkProgressHard = false;

        checkProgressEasy = this.quizEasyProgress.every(v => v === true);
        checkProgressHard = this.quizHardProgress.every(v => v === true);
        if (checkProgressEasy && !this.quizFinalProgress[0]) {
          this.initializeCategory(checkProgressEasy, checkProgressHard);
        } else if (checkProgressHard) {
          this.initializeCategory(checkProgressEasy, checkProgressHard);
        } else {
          this.initializeCategory();
        }


      if (this.category != null) {
        this.complete = false;
        this.userCorrect = 0;
        this.index = 0;
        if(this.checkIfPassed) {
          this.showQuizStartingInfo = true;
          this.quizBackgroundColorSwitch = 'white';
        } else {
          this.showQuiz = true;
        }
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

      // shows showQuizStartingInfo for timeout duration. then shows quiz
      if (this.showQuizStartingInfo) {
        setTimeout(function () {
          this.showQuizStartingInfo = false;
          this.showQuiz = true;
        }.bind(this), 2000);
      }
    },
    storeUserScoreEasy() {
      let token = localStorage.getItem('accessToken');
      let result = [];
      if (this.quizCategoryIndex === 0) {
        result = {
              "addition": this.quizEasyScore[0],
              "subtraction": this.quizEasyScore[1],
              "multiplication": this.quizEasyScore[2],
              "division": this.quizEasyScore[3],
              "accessToken": token};
          axios.post(`http://localhost:4000/auth/results_easy`, result);

      } else {
        let userProgress = [];
        axios.get(`http://localhost:4000/auth/results_easy_token/${token}`)
            .then(response => {

              userProgress.push(
                  response.data.addition,
                  response.data.subtraction,
                  response.data.multiplication,
                  response.data.division);

              for (let i = 0; i < userProgress.length; i++) {
                if (this.quizCategoryIndex === i)  {
                  userProgress[i] = this.quizEasyScore[i];
                } else {
                  result[i] = userProgress[i];
                }
                result = {
                  "addition": userProgress[0],
                  "subtraction": userProgress[1],
                  "multiplication": userProgress[2],
                  "division": userProgress[3],
                  "accessToken": token
                };
              }
              axios.post(`http://localhost:4000/auth/results_easy`, result);

            });
      }
    },
    storeUserScoreHard() {
      let token = localStorage.getItem('accessToken');
      let result = [];
      if (this.quizCategoryIndex === 0) {
        result = {
          "addition": this.quizHardScore[0],
          "subtraction": this.quizHardScore[1],
          "multiplication": this.quizHardScore[2],
          "division": this.quizHardScore[3],
          "accessToken": token};
        axios.post(`http://localhost:4000/auth/results_hard`, result);

      } else {

        let userProgress = [];
        axios.get(`http://localhost:4000/auth/results_hard_token/${token}`)
            .then(response => {

              userProgress.push(
                  response.data.addition,
                  response.data.subtraction,
                  response.data.multiplication,
                  response.data.division);

              for (let i = 0; i < userProgress.length; i++) {
                if (this.quizCategoryIndex === i)  {
                  userProgress[i] = this.quizHardScore[i];
                } else {
                  result[i] = userProgress[i];
                }
                result = {
                  "addition": userProgress[0],
                  "subtraction": userProgress[1],
                  "multiplication": userProgress[2],
                  "division": userProgress[3],
                  "accessToken": token
                };
              }
              axios.post(`http://localhost:4000/auth/results_hard`, result);

            });
      }
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