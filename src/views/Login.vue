<template style="align-content: center">
  <div class="login" >
    <section class="grid-container">
      <main id="subPages">


        <h1>Login for Mathlingo</h1>

        <form id="login" v-on:submit.prevent="loginForm">

          <input type="text" id='email' placeholder="Email" v-model="form.email">
          <input type="password" id='psw' placeholder="Password" v-model="form.password" >
          <input type="submit" class ="btn" id="" value="Login">
          <p>No account? <router-link class=a-signUp to="/signup">Signup</router-link></p>
        </form>

        <p>This is a test text</p>
        
      </main>
      <footer>
        <h2>Mathlingo</h2>
        <hr>
        &copy; 2021 All rights reserved
        <a style="float:right" href="tel:070-000-0000">070-000-0000</a>
      </footer>
    </section>
  </div>
</template>
<script>


import axios from "axios";


export default {
  name: "Login",
  data(){
    return{
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
              localStorage.setItem('accessToken', JSON.stringify(response.data.accessToken))
              localStorage.setItem('refreshToken', JSON.stringify(response.data.refreshToken))
            }
          })
          .then(this.$router.push('/mypage'));
    }
  }
}


</script>