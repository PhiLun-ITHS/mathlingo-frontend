<template>
  <div class="quiz">
    <div id="content">

    <h1>QUIZ</h1>
      <div v-if="showCategoryButtons">

        <p>
          Du möts nu av fyra spännande Quiz!<br>
          När du har klarat alla fyra kommer du låsa upp ett slutquiz.<br>
          Välj mellan addition, subtraktion, multiplikation eller division.</p>

        <h2>Gör ett val nedan för att börja!</h2>
      <section class="grid-container">
        <div id="homeBackground">
          <main>

            <article>
              <h2>Addition</h2>
                <button class="home-btn"
                @click="changeCategory('Addition')">+</button>
            </article>

            <article>
              <h2>Subtraktion</h2>
                <button class="home-btn"
                @click="changeCategory('Subtraktion')">-</button>
            </article>

            <article>
              <h2>Multiplikation</h2>
                <button class="home-btn"
                @click="changeCategory('Multiplikation')">x</button>
            </article>

            <article>
              <h2>Division</h2>
                <button class="home-btn"
                @click="changeCategory('Division')">÷</button>
            </article>

          </main>
        </div>
      </section>
        </div>
    <div v-if="showQuiz">
    <div id="quizBackground">

      <p style="font-size: 16px;">Question {{ index + 1 }} / {{ questions.length }}</p>

      <h1 v-if="complete">Correct {{ userCorrect }} of {{ this.questions.length }}</h1>
      <h1 v-else v-html="loading ? 'Loading...' : 'Vad är ' + currentQuestion.question"></h1>

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
      userCorrect: 0,
      loading: true,
      category: '',
      showCategoryButtons: true,
      showQuiz: false,
      //difficulty: 'hard'
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
    changeCategory(category) {
      this.category = category;
      console.log(this.category);
      this.showCategoryButtons = false;
      this.fetchQuestions();
      this.showQuiz = true;
    },
    async fetchQuestions() {
      this.loading = true;
      let response = await fetch(
          "http://192.168.1.200:4000/auth/quiz");

      let jsonResponse = await response.json();

      //sorting by user choice
      jsonResponse = jsonResponse.quiz.filter(el => el.category.includes(this.category));
      //jsonResponse = jsonResponse.filter(el => el.difficulty.includes(this.difficulty));

      let index = 0;
      let data = jsonResponse.map((question) => {

        let incorrect1;
        let incorrect2;
        let incorrect3;

        let max = Number.parseInt(question.correct_answer) + 3;
        let min = Number.parseInt(question.correct_answer) - 1;

        incorrect1 = Math.floor(Math.random() * (max - min) + min);
        while(incorrect1 === Number.parseInt(question.correct_answer)) {
          incorrect1 = Math.floor(Math.random() * (max - min) + min);
        }

        incorrect2 = Math.floor(Math.random() * (max - min) + min);
        while((incorrect2 === Number.parseInt(question.correct_answer) || incorrect2 === incorrect1)) {
          incorrect2 = Math.floor(Math.random() * (max - min) + min);
        }

        incorrect3 = Math.floor(Math.random() * (max - min) + min);
        while((incorrect3 === Number.parseInt(question.correct_answer) || incorrect3 === incorrect1 || incorrect2 === incorrect3)) {
          incorrect3 = Math.floor(Math.random() * (max - min) + min);
        }

        question.answers = [
          question.correct_answer,
            incorrect1,
            incorrect2,
            incorrect3
          //...question.incorrect_answers,
        ];

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
          }.bind(this), 100);
        } else {
          this.complete = true;
        }
      }
    },
  },
};
</script>