<template>
  <div v-if="auth && statisticAnswers.length" class="MyPage">
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
          <form>
          <h1 style="text-decoration: underline">Change password</h1>
            <input type="password" placeholder="New Password"  name="psw" required id="newPassword" v-model="newPassword">
            <input type="password" placeholder="Confirm Password"  name="psw" required id="reNewPassword" v-model="confirmNewPassword">
            <input type="submit" class ="btn" value="Change password" @click="passwordChange">
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
        <div class="statistic" v-bind:style="{background: statisticBoxColor[0]}">{{statisticAnswers[0]}}/{{statisticQuestions[0]}}</div>
        <p class="statistic-text">Addition</p>
      </article>

      <article>
        <div class="statistic" v-bind:style="{background: statisticBoxColor[1]}">{{statisticAnswers[1]}}/{{statisticQuestions[1]}}</div>
        <p class="statistic-text">Subtraction</p>
      </article>

      <article>
        <div class="statistic" v-bind:style="{background: statisticBoxColor[2]}">{{statisticAnswers[2]}}/{{statisticQuestions[2]}}</div>
        <p class="statistic-text">Multiplication</p>
      </article>

      <article>
        <div class="statistic" v-bind:style="{background: statisticBoxColor[3]}">{{statisticAnswers[3]}}/{{statisticQuestions[3]}}</div>
        <p class="statistic-text">Division</p>
      </article>

      <article>
        <div class="statistic" v-bind:style="{background: statisticBoxColor[4]}">{{statisticAnswers[4]}}/{{statisticQuestions[4]}}</div>
        <p class="statistic-text">Final</p>
      </article>

    </section>

      <h1 class="statistic-title">Hard</h1>
    <section class="statistic-container">

      <article>
        <div class="statistic" v-bind:style="{background: statisticBoxColor[5]}">{{statisticAnswers[5]}}/{{statisticQuestions[5]}}</div>
        <p class="statistic-text">Addition</p>
      </article>

      <article>
        <div class="statistic" v-bind:style="{background: statisticBoxColor[6]}">{{statisticAnswers[6]}}/{{statisticQuestions[6]}}</div>
        <p class="statistic-text">Subtraction</p>
      </article>

      <article>
        <div class="statistic" v-bind:style="{background: statisticBoxColor[7]}">{{statisticAnswers[7]}}/{{statisticQuestions[7]}}</div>
        <p class="statistic-text">Multiplication</p>
      </article>

      <article>
        <div class="statistic" v-bind:style="{background: statisticBoxColor[8]}">{{statisticAnswers[8]}}/{{statisticQuestions[8]}}</div>
        <p class="statistic-text">Division</p>
      </article>

      <article>
        <div class="statistic" v-bind:style="{background: statisticBoxColor[9]}">{{statisticAnswers[9]}}/{{statisticQuestions[9]}}</div>
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
  // beforeMount() {
  //
  // },
  name: "MyPage",
  data() {
    let token_info = jwt_decode(localStorage.getItem('accessToken'));
    let name = token_info.name;
    let email = token_info.email;
    return {
      easyScore: [],
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
      statisticBoxColor: ['', '', '', '', '', '', '', '', '', ''],
    }
  },
  beforeMount() {

    let token = localStorage.getItem('accessToken');
    let url = `http://localhost:4000/auth/results_easy_token/${token}`;
    let statistics = [];
    //get database
    axios.get(url)
        .then(response => {
          statistics.push(response.data.addition, response.data.subtraction, response.data.multiplication, response.data.division);
          this.statisticAnswers = statistics;
          //changeStatisticColor
          for (let i = 0; i < statistics.length; i++) {
            if (statistics[i] === this.statisticQuestions[i]) {
              this.statisticBoxColor[i] = '#0CFA34';
            } else if (statistics[i] >= 1 && statistics[i] < this.statisticQuestions[i]) {
              this.statisticBoxColor[i] = '#FA8F19'; // #FA1947   röd
            } else {
              this.statisticBoxColor[i] = 'white';
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
        });
  },
  methods: {
    removeAccount(){

      swal.fire({
        title: 'Are you sure you want to remove account?',
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        cancelButtonColor: 'red',
        showCancelButton: true
      }).then((result) => {
        if (result['isConfirmed']) {
          let data = {
            accessToken: localStorage.getItem('accessToken'),
            refreshToken: localStorage.getItem('refreshToken')
          };
          console.log(data);
          axios.post('http://localhost:4000/auth/removeAccount', data);
          localStorage.clear();
          location.reload();

        } else{
            swal.fire('Cancelled');
          }


      })
      this.$router.push('/login');
    },

    passwordChange(){
      if(this.newPassword === this.confirmNewPassword) {
        let data = {
          accessToken: localStorage.getItem('accessToken'),
          refreshToken: localStorage.getItem('refreshToken'),
          newPassword: this.newPassword
        };

        axios.put('http://localhost:4000/auth/updateUser', data);

        localStorage.clear();
        this.$router.push('/login');
      }else
        alert('Password didnt match!')

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

