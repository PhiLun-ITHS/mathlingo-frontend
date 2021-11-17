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

            <h1 v-if="finalComplete">
              EASY<br>
              Quiz Addition: {{this.quizEasyScore[0]}} / 5<br>
              Quiz Subtraktion: {{this.quizEasyScore[1]}} / 5<br>
              Quiz Multiplikation: {{this.quizEasyScore[2]}} / 5<br>
              Quiz Division: {{this.quizEasyScore[3]}} / 5<br>
              Quiz Final: {{this.quizEasyFinalScore}} / 10<br>
              HARD<br>
              Quiz Addition: {{this.quizHardScore[0]}} / 5<br>
              Quiz Subtraktion: {{this.quizHardScore[1]}} / 5<br>
              Quiz Multiplikation: {{this.quizHardScore[2]}} / 5<br>
              Quiz Division: {{this.quizHardScore[3]}} / 5<br>
              Quiz Final: {{this.quizHardFinalScore}} / 10<br>
            </h1>

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
      category: '',
      showStart: true,
      difficulty: 'Easy',
      showQuiz: false,
      quizCategory: ['Addition', 'Subtraction', 'Multiplication', 'Division'],
      quizCategoryIndex: 0,
      quizEasyProgress: [false, false, false, false],
      quizEasyScore: [0, 0, 0, 0],
      quizEasyFinalScore: 0,
      finalEasyProgress: false,
      quizHardProgress: [false, false, false, false],
      quizHardScore: [0, 0, 0, 0],
      quizHardFinalScore: 0,
      finalHardProgress: false,
      showScore: false,
      scoreIndex: 0,
      feedback: '',
      feedbackColor: '',
      passed: false,
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
    initializeCategory() {
      this.passed = false;
      if (this.quizCategoryIndex < 4) {
        this.category = this.quizCategory[this.quizCategoryIndex];
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
    nextQuiz() {
      if (this.passed) {
        this.initializeCategory();
        if (this.finalEasyProgress && !this.quizHardProgress) {
          this.difficulty = 'Hard';
        }
        let checkProgress;
        if (this.difficulty === 'Easy') {
          checkProgress = this.quizEasyProgress.every(v => v === true);
          if (checkProgress) {
            this.category = 'Final';
            this.difficulty = 'Final_Easy';
            this.quizCategoryIndex = 0;
          }
        } else if (this.difficulty === 'Hard') {
          checkProgress = this.quizHardProgress.every(v => v === true);
          if (checkProgress) {
            this.category = 'Final';
            this.difficulty = 'Final_Hard';
            this.quizCategoryIndex = 0;
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
    startQuiz() {
      this.showStart = false;
      this.initializeCategory();
      this.fetchQuestions();
      this.showQuiz = true;
    },
    async fetchQuestions() {
      this.loading = true;
      let response = await fetch(
          "http://192.168.1.200:4000/auth/quiz");

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
    handleButtonClick: function(event) {
      // user input
      let index = event.target.getAttribute("index");
      let pollutedUserAnswer = event.target.innerHTML;
      let userAnswer = pollutedUserAnswer.replace(/'/, "&#039;");

      this.questions[index].userAnswer = userAnswer;
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
          if (this.userCorrect / this.questions.length >= 0.8) {
            passedQuiz = true;
            this.passed = true;
          }
          this.quizFeedback(passedQuiz);

          if(passedQuiz) {

            console.log(this.userCorrect);

            if (this.difficulty === 'Easy') {
              this.quizEasyProgress[this.quizCategoryIndex] = passedQuiz;
              this.quizEasyScore[this.quizCategoryIndex] = this.userCorrect;
              this.quizCategoryIndex++;
            } else if (this.difficulty === 'Final_Easy') {
              this.finalEasyProgress = passedQuiz;
              this.quizEasyFinalScore = this.userCorrect;
              if (passedQuiz) {
                this.difficulty = 'Hard';
                this.initializeCategory();
              }
            } else if (this.difficulty === 'Hard') {
              this.quizHardProgress[this.quizCategoryIndex] = passedQuiz;
              this.quizHardScore[this.quizCategoryIndex] = this.userCorrect;
              this.quizCategoryIndex++;
            } else if (this.difficulty === 'Final_Hard') {
              this.finalHardProgress = passedQuiz;
              this.quizHardFinalScore = this.userCorrect;
              if (passedQuiz) {
                this.category = '';
                this.finalComplete = true;
                this.showQuiz = false;

                this.showScore = true;
              }
            }
          }
        }
      }
    },
  },
};
</script>