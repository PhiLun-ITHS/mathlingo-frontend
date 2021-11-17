<template>
  <div class="signup">
    <div id="content">

    <section class="grid-container">
      <main id="subPages">

          <h1>Sign up for Mathlingo</h1>
        <!--<p id="answer"></p>-->
          <form v-on:submit.prevent="submitForm">
            <input type="text" placeholder="Enter Name" name="uname" required id="userName" v-model="name">

            <input type="text" placeholder="Enter Email" name="email" required id="email" v-model="email">


            <input type="password" placeholder="Enter Password" name="psw" required id="password" v-model="password">

            <input type="password" placeholder="Confirm Password" name="psw" required id="rePassword" v-model="rePassword">

            <input type="submit" class ="btn" id="btn-signup" value="Register">

          </form>

          <p>Already have an account? <router-link class=a-signUp to="/login">Login</router-link></p>

      </main>
    </section>

    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: "Signup",
  data() {
    return{
      name:'',
      email:'',
      password:'',
      rePassword:'',
      formFilled: false,
      matchingPass: false,
    }
  },
  watch: {
    name: this.formFilled = this.checkForm(),
    email: this.formFilled = this.checkForm(),
    password: function () {
      this.matchingPass = (this.password === this.rePassword);
      this.formFilled = this.checkForm(),
    },
    
    
    
  },
  methods: {
    submitForm(){
        let user = {name: this.form.name, email: this.form.email, password: this.form.password};
        axios.post('http://localhost:4000/auth/signup', user)
            .then(response => {
              if(response.data === 403) {
                console.log(response);
                document.getElementById('answer').innerHTML = "Account already exists";
              }else{
                console.log(response);
                document.getElementById('answer').innerHTML = "Account created";
              }
            })
    },
    checkForm() {
      if (this.name == '') {
        return false;
      }
      else if (!(/\S+@\S+\.\S+/.test(this.email))) {
        return false;
      }
      else if (this.password == '' || this.matchingPass == false) {
        return false;
      }
    },
    checkPassMatch(password, rePassword) {
      if 
    }
  }
}
</script>