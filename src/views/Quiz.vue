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
    },
/*
    score() {
      if (this.questions !== []) {
        // Here, we want to collect data in an object about the users statistics - later be emitted on an event when users finishes quiz
        return {
          allQuestions: this.questions.length,
          answeredQuestions: this.questions.reduce((count, currentQuestion) => {
            if (currentQuestion.userAnswer) {
              // userAnswer is set when user has answered a question, no matter if right or wrong
              count++;
            }
            return count;
          }, 0),
          correctlyAnsweredQuestions: this.questions.reduce(
              (count, currentQuestion) => {
                if (currentQuestion.rightAnswer) {
                  // rightAnswer is true, if user answered correctly
                  count++;
                }
                return count;
              },
              0
          ),
        };
      } else {
        return {
          allQuestions: 0,
          answeredQuestions: 0,
          correctlyAnsweredQuestions: 0,
        };
      }
    },
      correctAnswers() {
        if (this.questions && this.questions.length > 0) {
          let streakCounter = 0;
          this.questions.forEach(function (question) {
            if (!question.rightAnswer) {
              return;
            } else if (question.rightAnswer === true) {
              streakCounter++;
            }
          });
          return streakCounter;
        } else {
          return "--";
        }
      }
      */
  },
  methods: {
    async fetchQuestions() {
      this.loading = true;
      let response = await fetch(
          "https://opentdb.com/api.php?amount=5&category=9"
      );
      let jsonResponse = await response.json();
      let index = 0; // index is used to identify single answer
      let data = jsonResponse.results.map((question) => {
        // put answers on question into single array
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

        question.rightAnswer = null;
        question.key = index;
        index++;

        return question;
      });
      this.questions = data;
      this.loading = false;
    },
/*
    handleButtonClick: function(event) {
      // Find index to identiy question object in data
      let index = event.target.getAttribute("index");
      let pollutedUserAnswer = event.target.innerHTML; // innerHTML is polluted with decoded HTML entities e.g ' from &#039;
      // Clear from pollution with '
      let userAnswer = pollutedUserAnswer.replace(/'/, "&#039;");
      // Set userAnswer on question object in data
      this.questions[index].userAnswer = userAnswer;
      //Set class "clicked" on button with userAnswer -> for CSS Styles; Disable other sibling buttons
      event.target.classList.add("clicked");
      let allButtons = document.querySelectorAll(`[index="${index}"]`);
      for (let i = 0; i < allButtons.length; i++) {
        if (allButtons[i] === event.target) continue;
        allButtons[i].setAttribute("disabled", "");
      }
      // Invoke checkAnswer to check Answer
      this.checkAnswer(event, index);
    },
    checkAnswer: function(event, index) {
      let question = this.questions[index];
      if (question.userAnswer) {
        if (this.index < this.questions.length - 1) {
          setTimeout(
              function() {
                this.index += 1;
              }.bind(this),
              3000
          );
        }
        if (question.userAnswer === question.correct_answer) {
          // Set class on Button if user answered right, to celebrate right answer with animation joyfulButton
          event.target.classList.add("rightAnswer");
          // Set rightAnswer on question to true, computed property can track a streak out of 10 questions
          this.questions[index].rightAnswer = true;
        } else {
          // Mark users answer as wrong answer
          event.target.classList.add("wrongAnswer");
          this.questions[index].rightAnswer = false;
          // Show right Answer
          let correctAnswer = this.questions[index].correct_answer;
          let allButtons = document.querySelectorAll(`[index="${index}"]`);
          allButtons.forEach(function(button) {
            if (button.innerHTML === correctAnswer) {
              button.classList.add("showRightAnswer");
            }
          });
        }
      }
    },
*/
  },
  mounted() {
    this.fetchQuestions();
  }
};
</script>