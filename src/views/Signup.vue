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
import swal from 'sweetalert2';
export default {
  name: "Signup",
  data() {
    return{
      name:'',
      email:'',
      password:'',
      rePassword:'',
      matchingPass: null,
      validName: false,
      validEmail: null,
      validForm: false,
      emailAvailable: false,
    }
  },
  watch: {
    changeFormData() {
      if (this.password == this.rePassword && this.password != '') {
        this.matchingPass = true;
      }
      else this.matchingPass = false;

      if (this.email != '' && (/\S+@\S+\.\S+/.test(this.email))) {
        this.validEmail = true;
      }
      else this.validEmail = false;

      if (this.name.length >= 3) {
        this.validName = true;
      }
      else this.validName = false;

      if (this.matchingPass == this.validName == this.validEmail == true) {
        this.validForm = true;
      } else {
        this.validForm = false;
      }

    },
    deep: true
  },
  methods: {
    submitForm(){
      if (this.validForm) {
        let jsonEmail = {email: this.email};
        axios.post('http://localhost:4000/auth/available', jsonEmail)
          .then(response => {
            this.emailAvailable = response.data;
            if (this.emailAvailable) {
              let user = {name: this.name, email: this.email, password: this.password};
              console.log(user);
              axios.post('http://localhost:4000/auth/signup', user)
              .then(() => {
                swal.fire({
                  title: "Account Created Successfully!",
                  confirmButtonText: 'Proceed',
                  confirmButtonColor: 'blue'
                })
              })
            }
          })
      }
    },
  },
  computed: {
    changeFormData() {
      this.password;
      this.rePassword;
      this.email;
      this.name;

      return Date.now()
    }
  }
}
</script>