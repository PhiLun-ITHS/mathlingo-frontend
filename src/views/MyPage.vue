<template>
  <div v-if="auth" class="MyPage">
    <div id="content">
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
          <div class="settings"  @click.prevent="removeAccount">Remove Account</div>
        </article>
      </section>

      <section class="grid-container">
      <main id="subPages">

        <div v-if="changePass">
          <form v-on:submit.prevent="passwordChange">
          <h1 style="text-decoration: underline">Change password</h1>
            <input type="password" placeholder="New Password"  name="psw" required id="newPassword" v-model="newPassword">
            <input type="password" placeholder="Confirm Password"  name="psw" required id="reNewPassword" v-model="confirmNewPassword">
            <input type="submit" class ="btn" value="Change password">
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

      <h1 class="myPage-title">Statistics</h1>
      <h1 class="statistic-title">Easy</h1>

    <section class="statistic-container">

      <article>
        <div class="statistic"
             v-bind:style="{background: statisticBoxColor[0], color: textColor[0]}">
          <div v-if="isLocked[0]" class="lock"></div>
          <div v-else-if="isUnlocked[0]" class="unlock"></div>
          <div v-else>{{ boxValue[0] }}</div>
        </div>
        <p class="statistic-text">Addition</p>
      </article>

      <article>
        <div class="statistic"
             v-bind:style="{background: statisticBoxColor[1], color: textColor[1]}">
          <div v-if="isLocked[1]" class="lock"></div>
          <div v-else-if="isUnlocked[1]" class="unlock"></div>
          <div v-else>{{ boxValue[1] }}</div>
        </div>
        <p class="statistic-text">Subtraction</p>
      </article>

      <article>
        <div class="statistic"
             v-bind:style="{background: statisticBoxColor[2], color: textColor[2]}">
          <div v-if="isLocked[2]" class="lock"></div>
          <div v-else-if="isUnlocked[2]" class="unlock"></div>
          <div v-else>{{ boxValue[2] }}</div>
        </div>
        <p class="statistic-text">Multiplication</p>
      </article>

      <article>
        <div class="statistic"
             v-bind:style="{background: statisticBoxColor[3], color: textColor[3]}">
          <div v-if="isLocked[3]" class="lock"></div>
          <div v-else-if="isUnlocked[3]" class="unlock"></div>
          <div v-else>{{ boxValue[3] }}</div>
        </div>
        <p class="statistic-text">Division</p>
      </article>

      <article>
        <div class="statistic"
             v-bind:style="{background: statisticBoxColor[4], color: textColor[4]}">
          <div v-if="isLocked[4]" class="lock"></div>
          <div v-else-if="isUnlocked[4]" class="unlock"></div>
          <div v-else>{{ boxValue[4] }}</div>
        </div>
        <p class="statistic-text">Final</p>
      </article>

    </section>

      <h1 class="statistic-title">Hard</h1>
    <section class="statistic-container">

      <article>
        <div class="statistic"
             v-bind:style="{background: statisticBoxColor[5], color: textColor[5]}">
          <div v-if="isLocked[5]" class="lock"></div>
          <div v-else-if="isUnlocked[5]" class="unlock"></div>
          <div v-else>{{ boxValue[5] }}</div>
        </div>
        <p class="statistic-text">Addition</p>
      </article>

      <article>
        <div class="statistic"
             v-bind:style="{background: statisticBoxColor[6], color: textColor[6]}">
          <div v-if="isLocked[6]" class="lock"></div>
          <div v-else-if="isUnlocked[6]" class="unlock"></div>
          <div v-else>{{ boxValue[6] }}</div>
        </div>
        <p class="statistic-text">Subtraction</p>
      </article>

      <article>
        <div class="statistic"
             v-bind:style="{background: statisticBoxColor[7], color: textColor[7]}">
          <div v-if="isLocked[7]" class="lock"></div>
          <div v-else-if="isUnlocked[7]" class="unlock"></div>
          <div v-else>{{ boxValue[7] }}</div>
        </div>
        <p class="statistic-text">Multiplication</p>
      </article>

      <article>
        <div class="statistic"
             v-bind:style="{background: statisticBoxColor[8], color: textColor[8]}">
          <div v-if="isLocked[8]" class="lock"></div>
          <div v-else-if="isUnlocked[8]" class="unlock"></div>
          <div v-else>{{ boxValue[8] }}</div>
        </div>
        <p class="statistic-text">Division</p>
      </article>

      <article>
        <div class="statistic"
             v-bind:style="{background: statisticBoxColor[9], color: textColor[9]}">
          <div v-if="isLocked[9]" class="lock"></div>
          <div v-else-if="isUnlocked[9]" class="unlock"></div>
          <div v-else>{{ boxValue[9] }}</div>
        </div>
        <p class="statistic-text">Final</p>
      </article>

    </section>

    </div>
  </div>
  <div v-else>
    <section>
    <button class="btn" @click.prevent="notAuth" >You are not logged in, try to login!</button>
    </section>
  </div>


</template>

<script>

import swal from 'sweetalert2';
import axios from "axios";
import jwt_decode from 'jwt-decode';

export default {
  name: "MyPage",
  data() {
    let token_info = jwt_decode(localStorage.getItem('accessToken'));
    let name = token_info.name;
    let email = token_info.email;
    return {
      auth: localStorage.getItem('accessToken'),
      newPassword: '',
      confirmNewPassword: '',
      changePass: false,
      removeAcc: false,
      accountName: name,
      accountEmail: email,
      accountCompletion: '',
      remove: localStorage.getItem('accessToken'),
      statisticAnswers: [],
      statisticQuestions: [5, 5, 5, 5, 10, 5, 5, 5, 5, 10],
      statisticBoxColor: [],
      boxValue: [],
      isLocked: [],
      isUnlocked: [],
      textColor: [],
    }
  },
  beforeMount() {

    let token = localStorage.getItem('accessToken');
    let incomingStatistics = [];
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

      incomingStatistics.push(
          //quiz easy
          responseOne.data.addition,
          responseOne.data.subtraction,
          responseOne.data.multiplication,
          responseOne.data.division,
          //quiz final_easy
          responseThree.data.final_easy,
          //quiz hard
          responseTwo.data.addition,
          responseTwo.data.subtraction,
          responseTwo.data.multiplication,
          responseTwo.data.division,
          //quiz final_hard
          responseThree.data.final_hard);

      // setting every undefined element as 0
      let statistics = incomingStatistics.map(v => v === undefined ? 0 : v);
      // first 0 value i db tables
      let findUnlockedQuiz = statistics.indexOf(0);
      this.statisticAnswers = statistics;
          //change box colors and values
          for (let i = 0; i < this.statisticAnswers.length; i++) {
            if (this.statisticAnswers[i] === this.statisticQuestions[i] || this.statisticAnswers[i] / this.statisticQuestions[i] >= 0.8) {
              this.statisticBoxColor[i] = 'rgba(0,0,0,0.75)';
              this.boxValue[i] = this.statisticAnswers[i]  + '/' + this.statisticQuestions[i];
              this.textColor[i] = 'rgba(1,250,182,0.8995973389355743)';
            } else if (this.statisticAnswers[i] >= 1 && this.statisticAnswers[i] < this.statisticQuestions[i]) {
              this.statisticBoxColor[i] = 'rgba(0,0,0,0.75)'; // #FA1947   röd
              this.boxValue[i] = this.statisticAnswers[i] + '/' + this.statisticQuestions[i];
              this.textColor[i] = '#FA8F19';
            } else {
              this.statisticBoxColor[i] = 'rgba(0,0,0,0.75)';
              if (this.statisticAnswers[i] === 0) {
                this.isLocked[i] = true;
              }
              if (findUnlockedQuiz) {
                this.isUnlocked[findUnlockedQuiz] = true;
                this.isLocked[findUnlockedQuiz] = false;
              }
            }
          }
          //CalculateUserProgress (percentage)
          let totalQuest = 60;
          let totalAnswer = 0;

          for (let i = 0; i < statistics.length; i++) {
            totalAnswer = totalAnswer + statistics[i];
          }
          let percentage = totalAnswer * 100 / totalQuest;
          percentage = Math.round((percentage + Number.EPSILON));
          this.accountCompletion = percentage;
    }));
  },
  methods: {

    removeAccount(){

      swal.fire({
        title: 'Are you sure you want to remove account?',
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        cancelButtonColor: 'green',
        confirmButtonColor: 'red',
        showCancelButton: true
      }).then((result) => {
        if (result['isConfirmed']) {
          let data = {
            accessToken: localStorage.getItem('accessToken'),
            refreshToken: localStorage.getItem('refreshToken')
          };
          axios.post('http://localhost:4000/auth/removeAccount', data);
          localStorage.clear();
          swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Your account have been successfully removed.',
            showConfirmButton: false,
            timer: 1000,
          }) .then(() => {
            window.location = ("/");
          })
        }
      })

    },

    passwordChange(){
      if(this.newPassword === this.confirmNewPassword) {
        let data = {
          accessToken: localStorage.getItem('accessToken'),
          refreshToken: localStorage.getItem('refreshToken'),
          newPassword: this.newPassword
        };

        let email = jwt_decode(localStorage.getItem('accessToken')).email;

        axios.put('http://localhost:4000/auth/updateUser', data)
        .then(() => {
          let user = {email : email, password : this.newPassword};
          console.log("USER:");
          console.log(user);
          axios.post('http://localhost:4000/auth/login', user)
          .then((response) => {
        //  if  (response.data) {
              localStorage.setItem('accessToken', response.data.accessToken)
              localStorage.setItem('refreshToken', response.data.refreshToken)
            swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Your have successfully changed the password!',
              showConfirmButton: false,
              timer: 800
              }).then(this.newPassword = '', this.confirmNewPassword = '');
          })
          //}
          })
          .catch((error) => {
            if (error.response) {
              swal.fire({
                position: 'center',
                icon: 'error',
                title: "Something went wrong",
                text: "Refresh the website and try again."
              }).then(() => {
                this.password = '';
                this.newPassword = '';
              });
            }
          })
      }
      else {
        swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'The passwords do not seem to match. Try again!'
        }).then(() => {
          this.newPassword = '';
          this.confirmNewPassword = '';
        })
      }
    },
    clickPasswordChange() {
      if (this.removeAcc === true) {
        this.removeAcc = false;
      }
      this.changePass = this.changePass !== true;
    },
    clickRemoveAccount() {
     //  let data = {accessToken : localStorage.getItem('accessToken'), refreshToken : localStorage.getItem('refreshToken')};
     // let answer = axios.post('http://localhost:4000/auth/removeAccount', data)
     //  console.log(answer);
      if (this.changePass === true) {
        this.changePass = false;
      }
      this.removeAcc = this.removeAcc !== true;
    },

    notAuth(){
      this.$router.push('/login');
    },

    logout(){
        swal.fire({
          title: 'Are you sure you want to logout?',
          confirmButtonText: 'logout',
          cancelButtonText: 'Stay quizzing',
          showCancelButton: true,
          confirmButtonColor: 'dark red',
          cancelButtonColor: 'dark green',
        }).then ((result)=>{
        if(result['isConfirmed']) {
          let data = {
            accessToken: localStorage.getItem('accessToken'),
            refreshToken: localStorage.getItem('refreshToken')
          };
          axios.post('http://localhost:4000/auth/logout', data)
              .then(response => {
                if (response.data) {
                  localStorage.clear();
                  location.reload();
                }
              })
        }else{
          swal.fire('cancelled')
        }
      })
      this.$router.push('/login');
    }
  }
}
</script>

