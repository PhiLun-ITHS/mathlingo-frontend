<template>
  <div class="quiz">

    <h1>QUIZ</h1>

    <div id="quizBackground">
      <div>
        <h1 v-html="loading ? 'Loading...' : currentQuestion.question"></h1>
        <h1 v-if="currentQuestion"></h1>

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
      loading: true,
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
  },
  mounted() {
    this.fetchQuestions();
  }
};
</script>