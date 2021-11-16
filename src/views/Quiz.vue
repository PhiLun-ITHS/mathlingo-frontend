<template>
  <div class="quiz">
    <div id="content">

    <h1>QUIZ</h1>
      <div v-if="showStart">

        <p>
          Du möts nu av fyra spännande Quiz!<br>
          När du har klarat alla fyra kommer du låsa upp ett slutquiz.<br>
        </p>
      <section class="grid-container">
        <div id="homeBackground">
          <main id="subPages">

            <article>
              <button class="quiz-btn"
              @click="startQuiz">START QUIZ ->
              </button>
            </article>

          </main>
        </div>
      </section>
        </div>
    <div v-if="showQuiz">
    <div id="quizBackground">

      <p v-if="!finalComplete" style="font-size: 16px;">Question {{ index + 1 }} / {{ questions.length }}</p>
      <h1 v-if="complete && !finalComplete">Correct {{ userCorrect }} of {{ this.questions.length }}</h1>
      <h1 v-else-if="!finalComplete && !loading">Vad är {{currentQuestion.question}}</h1>
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


      <div v-if="complete && !finalComplete">
        <button class="home-btn"
                @click="nextQuiz"
        >Next</button>
      </div>

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
      difficulty: 'easy',
      showQuiz: false,
      quizCategory: ['Addition', 'Subtraktion', 'Multiplikation', 'Division'],
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
      if (this.quizCategoryIndex < 4) {
        this.category = this.quizCategory[this.quizCategoryIndex];
      }
    },
    nextQuiz() {
      this.initializeCategory();
      if (this.finalEasyProgress && !this.quizHardProgress) {
        this.difficulty = 'hard';
      }
      let checkProgress;
      if (this.difficulty === 'easy') {
        checkProgress = this.quizEasyProgress.every(v => v === true);
          if (checkProgress) {
            this.category = 'Final';
            this.difficulty = 'finalEasy';
            this.quizCategoryIndex = 0;
          }
      } else if (this.difficulty === 'hard') {
        checkProgress = this.quizHardProgress.every(v => v === true);
          if (checkProgress) {
            this.category = 'Final';
            this.difficulty = 'finalHard';
            this.quizCategoryIndex = 0;
          }
      }
      console.log('Category ' + this.category);
      console.log('Difficulty ' + this.difficulty);
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
      console.log('Category ' + this.category);
      console.log('Difficulty ' + this.difficulty);
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
          }.bind(this), 200);
        }
        else {
          this.complete = true;
          let passedQuiz = false;
          if (this.userCorrect / this.questions.length >= 0) {
            passedQuiz = true;
          }
          if (this.difficulty === 'easy') {
            this.quizEasyProgress[this.quizCategoryIndex] = passedQuiz;
            this.quizEasyScore[this.quizCategoryIndex] = this.userCorrect;
            this.quizCategoryIndex++;
          } else if (this.difficulty === 'finalEasy') {
            this.finalEasyProgress = passedQuiz;
            this.quizEasyFinalScore = this.userCorrect;
            if (passedQuiz) {
              this.difficulty = 'hard';
              this.initializeCategory();
            }
          } else if (this.difficulty === 'hard') {
            this.quizHardProgress[this.quizCategoryIndex] = passedQuiz;
            this.quizHardScore[this.quizCategoryIndex] = this.userCorrect;
            this.quizCategoryIndex++;
          } else if (this.difficulty === 'finalHard') {
            this.finalHardProgress = passedQuiz;
            this.quizHardFinalScore = this.userCorrect;
            if (passedQuiz) {
              this.category = '';
              this.finalComplete = true;
              this.showScore = true;
            }
          }
          console.log(this.quizEasyProgress);
          console.log(this.finalEasyProgress);
          console.log(this.quizHardProgress);
          console.log(this.finalHardProgress);
          console.log('-----------------------------------------------------');
        }
      }
    },
  },
};
</script>