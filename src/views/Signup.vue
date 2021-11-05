<template>
  <div class="signup">
    <div id="content">

    <section class="grid-container">
      <main id="subPages">



          <h1>Sign up for Mathlingo</h1>
        <p id="answer"></p>
          <form v-on:submit.prevent="submitForm">
            <input type="text" placeholder="Enter Username" name="uname" required id="userName" v-model="form.name">

            <input type="text" placeholder="Enter Email" name="email" required id="email" v-model="form.email">


            <input type="password" placeholder="Enter Password" name="psw" required id="password" v-model="form.password">

            <input type="password" placeholder="Confirm Password" name="psw" required id="rePassword">

            <input type="submit" class ="btn" id="btn-signup" value="Register">

          </form>

          <p>Already have an account? <router-link class=a-signUp to="/login">Login</router-link></p>

      </main>
    </section>

    <footer>
      <p>Mathlingo &copy; 2021 All rights reserved.</p>
    </footer>

    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: "Signup",
  data() {
    return{
      form: {
        name:'',
        email:'',
        password:''
      }
    }
  },
  methods: {
    submitForm(){
      let user = {name : this.form.name, email : this.form.email, password : this.form.password};
      axios.post('http://localhost:4000/auth/signup', user);
          document.getElementById('answer').innerHTML = "registration has been successfully completed " + this.form.name + "!";
    }
  }
}
</script>