<template>
  <div class="quiz">

    <h1>QUIZ</h1>

    <div id="quizBackground">

      <div class="questionTrack">
        <p style="font-size: 16px;">Question {{ index + 1 }} / {{ questions.length }}</p>
      </div>

      <div>
        <!--<h1 v-html="loading ? 'Loading...' : currentQuestion.question"></h1>-->
        <h1 v-if="complete">Correct {{ userCorrect }} of {{ this.questions.length }}</h1>
        <h1 v-else v-html="currentQuestion.question"></h1>

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

    <footer>
      <p>Mathlingo &copy; 2021 All rights reserved.</p>
    </footer>

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
    async fetchQuestions() {
      let response = await fetch(
          "https://api.jsonbin.io/b/6182cf84aa02be1d4463734f");

      let jsonResponse = await response.json();
      let index = 0;
      let data = jsonResponse.results.map((question) => {

        question.answers = [
          question.correct_answer,
          ...question.incorrect_answers,
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

      if(question.userAnswer == question.correct_answer) {
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
  mounted() {
    this.fetchQuestions();
  },
};
</script>