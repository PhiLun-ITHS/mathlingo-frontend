<template>
  <div v-if="auth" class="MyPage">
    <div id="content">

<!--      <h1 class="myPage-title" style="border: none">My page</h1>-->
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
      accountName: name,
      accountEmail: email,
      accountCompletion: '50',
      remove: localStorage.getItem('accessToken'),
      //statistik från databas ska in i dessa arrays
     //statisticAnswers: [],
      //statisticQuestions: [],
      statisticAnswers: [1, 3, 5, 5, 0, 2, 3, 4, 5, 2],
      statisticQuestions: [5, 5, 5, 5, 10, 5, 5, 5, 5, 10],

    }
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
      if(this.changePass === false)
        this.changePass = true;
      else
        this.changePass = false;


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
        if(result['isConfirmed']){
          let data = {
            accessToken: localStorage.getItem('accessToken'),
            refreshToken: localStorage.getItem('refreshToken')
          };
          axios.post('http://localhost:4000/auth/logout',data)
          .then(response=>{
            if(response.data){
              localStorage.clear();
              location.reload();
            }
          })
        }else{
          swal.fire('cancelled')
        }
      })

      this.$router.push('/login')
    }

    }



}
</script>

