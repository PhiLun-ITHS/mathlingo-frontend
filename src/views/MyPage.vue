<template>
  <div class="MyPage">
    <div id="content">

      <h1 class="myPage-title" style="border: none">My page</h1>
      <section class="MyPage">

        <article>
          <h1 style="text-decoration: underline">Account info</h1>
          <div class="account-info">Username: <div style="float:right">{{ accountName }}</div></div>
          <div class="account-info">E-mail: <div style="float:right; margin-left: 20px">{{ accountEmail }}</div></div>
          <div class="account-info">Completion: <div style="float: right">{{ accountCompletion }}%</div></div>
        </article>

        <article>
          <h1 style="text-decoration: underline">Settings</h1>
          <div class="settings" @click="clickPasswordChange">Change password</div>
          <div class="settings" @click="clickRemoveAccount">Remove Account</div>
        </article>
      </section>

      <section class="grid-container">
      <main id="subPages">
        <div v-if="changePass">
          <form>
          <h1 style="text-decoration: underline">Change password</h1>
          <input type="password" id='oldPsw' placeholder="Old password">
          <input type="password" placeholder="New Password" name="psw" required id="password">
          <input type="password" placeholder="Confirm Password" name="psw" required id="rePassword">
          <input type="submit" class ="btn" value="Change password" @click="changePass=false">
          </form>
        </div>

        <div v-if="removeAcc">
          <form>
          <h1 style="text-decoration: underline">Remove account</h1>
          <p class="account-info">Enter your password to confirm</p>
          <input type="password" id='psw' placeholder="Password">
          <input type="submit" class ="btn" value="Remove account" @click="removeAcc=false">
          </form>
        </div>
      </main>
      </section>
      <h1 class="myPage-title">Statistik</h1>
      <h1 class="statistic-title">Easy</h1>

    <section class="statistic-container">

      <article>
        <div class="statistic">{{statisticAnswers[0]}}/{{statisticQuestions[0]}}</div>
        <p class="statistic-text">Addition</p>
      </article>

      <article>
        <div class="statistic">{{statisticAnswers[1]}}/{{statisticQuestions[1]}}</div>
        <p class="statistic-text">Subtraction</p>
      </article>

      <article>
        <div class="statistic">{{statisticAnswers[2]}}/{{statisticQuestions[2]}}</div>
        <p class="statistic-text">Multiplication</p>
      </article>

      <article>
        <div class="statistic">{{statisticAnswers[3]}}/{{statisticQuestions[3]}}</div>
        <p class="statistic-text">Division</p>
      </article>

      <article>
        <div class="statistic">{{statisticAnswers[4]}}/{{statisticQuestions[4]}}</div>
        <p class="statistic-text">Final</p>
      </article>

    </section>

      <h1 class="statistic-title">Hard</h1>
    <section class="statistic-container">

      <article>
        <div class="statistic">{{statisticAnswers[5]}}/{{statisticQuestions[5]}}</div>
        <p class="statistic-text">Addition</p>
      </article>

      <article>
        <div class="statistic">{{statisticAnswers[6]}}/{{statisticQuestions[6]}}</div>
        <p class="statistic-text">Subtraction</p>
      </article>

      <article>
        <div class="statistic">{{statisticAnswers[7]}}/{{statisticQuestions[7]}}</div>
        <p class="statistic-text">Multiplication</p>
      </article>

      <article>
        <div class="statistic">{{statisticAnswers[8]}}/{{statisticQuestions[8]}}</div>
        <p class="statistic-text">Division</p>
      </article>

      <article>
        <div class="statistic" >{{statisticAnswers[9]}}/{{statisticQuestions[9]}}</div>
        <p class="statistic-text">Final</p>
      </article>

    </section>

    </div>
  </div>
</template>

<script>
export default {
  name: "MyPage",
  data() {
    return {
      changePass: false,
      removeAcc: false,
      accountName: 'testProp',
      accountEmail: 'testProp@gmail.com',
      accountCompletion: '50',

      //statistik från databas ska in i dessa arrays
      //statisticAnswers: [],
      //statisticQuestions: [],
      statisticAnswers: [1, 3, 5, 5, 0, 2, 3, 4, 5, 2],
      statisticQuestions: [5, 5, 5, 5, 10, 5, 5, 5, 5, 10],
    }
  },
  methods: {
    clickPasswordChange() {
      if (this.removeAcc === true) {
        this.removeAcc = false;
      }
      this.changePass = this.changePass !== true;
    },
    clickRemoveAccount() {
      if (this.changePass === true) {
        this.changePass = false;
      }
      this.removeAcc = this.removeAcc !== true;
    }
  },
}
</script>

