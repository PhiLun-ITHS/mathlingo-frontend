<template>
  <div class="login" v-if="!auth">
    <div id="content">

    <section class="grid-container" >
      <main id="subPages">

        <h1>Login for Mathlingo</h1>

        <form id="login" v-on:submit.prevent="loginForm">
          <p id="answer"></p>
          <input type="text" id='email' placeholder="Email" v-model="form.email">
          <input type="password" id='psw' placeholder="Password" v-model="form.password" >
          <input type="submit" class ="btn" id="" value="Log in">
          <p>No account? <router-link class=a-signUp to="/signup">Signup</router-link></p>
        </form>

      </main>
    </section>


    </div>
  </div>

  <section v-else>
    <p>you are logged in, go start a quiz <router-link to="/">Quiz</router-link></p>
  </section>

</template>

<script>

import axios from "axios";


export default {
  name: "Login",
  data(){
    return{
      auth: window.localStorage.getItem('accessToken'),
      form: {
        email:'',
        password:''
      }
    }
  },
  methods:{
    loginForm(){
      let user = {email : this.form.email, password : this.form.password};
      axios.post('http://localhost:4000/auth/login', user)
          .then(response => {
            if (response.data) {
              localStorage.setItem('accessToken', response.data.accessToken)
              localStorage.setItem('refreshToken', response.data.refreshToken)
              location.reload();
            }
          })
    //  .catch((error) => this.handle(error,
    //    document.getElementById('answer').innerHTML = "No such account!"));



    }
  }
}


</script>