<template>

  <div class="quiz">

    <h1>QUIZ</h1>

    <div id="quizBackground">

      <div v-if="currentQuestion">

      <!--
      <p v-if="loading" id="question">Loading...</p>
      <p v-else v-html="questions[0].question" id="question"></p>-->

      <p v-html="questions[index]" id="question"></p>

      <section class="button-container">
        <!--
        <button
            v-for="answer in currentQuestion.answers"
            :index="currentQuestion.key"
            :key="answer"
            v-html="answer"
            @click.prevent="handleButtonClick"
        ></button>-->

       <button class="quiz-btn"
               v-on:click="nextQuestion()">
          <span v-html="this.choices[0]"></span>
       </button>

        <button class="quiz-btn"
                v-on:click="nextQuestion()">
          <span v-html="this.choices[1]"></span>
        </button>

        <button class="quiz-btn"
                v-on:click="nextQuestion()">
          <span v-html="this.choices[2]"></span>
        </button>

        <button class="quiz-btn"
                v-on:click="nextQuestion()">
          <span v-html="this.choices[3]"></span>
        </button>

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
      questions: ["Vad är 1+1?", "Vad är 2+2?", "Vad är 2+3?"],
      choices: [1, 0, 3, 2],
      //questions: [],
      //loading: true,
      index: 0,
    };
  },
  computed: {
    currentQuestion() {
      if (this.questions !== []) {
        return this.questions[this.index];
      }
      return null;
    }
  },
  methods: {

    nextQuestion: function() {
      this.next();
      if (this.index === 1) {
        return this.choices = [3, 5, 4 ,6];
      } else if (this.index === 2) {
        return this.choices = [7, 5, 4 ,6];
      }
},
    next: function(){
      return this.index++;
    }
    /*
    async fetchQuestions() {
      this.loading = true;
      let response = await fetch(
          'https://opentdb.com/api.php?amount=10&category=9'
      );
      let jsonResponse = await response.json();
      let data = jsonResponse.results.map((question) => {
        // put answers on question into single array
        question.answers = [
          question.correct_answer,
          ...question.incorrect_answers
        ];
        return question;
      });
      this.questions = data;
      this.loading = false;
    }
    */
  },
  mounted() {
    //this.fetchQuestions();
  }
};
</script>