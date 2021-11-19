<template>
  <div class="login">
    <div id="content">

    <section class="grid-container" >
      <main id="subPages">

        <h1>Login for Mathlingo</h1>

        <form id="login" v-on:submit.prevent="loginForm">
          <p id="answer"></p>
          <input type="text" id='email' placeholder="Email" v-model="email">
          <input type="password" id='psw' placeholder="Password" v-model="password" >
          <input type="submit" class ="btn" id="" value="Log in">
          <p>No account? <router-link class=a-signUp to="/signup">Signup</router-link></p>
        </form>
      </main>
    </section>
    </div>
  </div>

</template>

<script>

import axios from "axios";
import swal from 'sweetalert2';

export default {
  name: "Login",
  data(){
    return{
      email:'',
      password:''
    }
  },
  methods:{
    loginForm(){
      let user = {email : this.email, password : this.password};
      axios.post('http://localhost:4000/auth/login', user)
          .then((response) => {
            if (response.data) {
              localStorage.setItem('accessToken', response.data.accessToken)
              localStorage.setItem('refreshToken', response.data.refreshToken)
              swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Your have been signed in!',
                showConfirmButton: false,
                timer: 800
              })
              .then(() => {
                window.location = ("/");
              })
            }
          })
          .catch((error) => {
            if (error.response) {
              swal.fire({
                position: 'center',
                icon: 'error',
                title: "Login failed.",
                text: "Check email and password."
              }).then(this.password = '')
            }
          })
    }
  }
}

</script>