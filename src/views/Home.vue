  <template>
  <div v-if="!auth" class="signup">
    <div id="content">

    <section class="grid-container">
      <main id="subPages">


        <div>
          <h1>QUIZ MATEMATIK</h1>

          <p>
            Welcome to Mathlingo<br>
            You have to create an account and log in, to get access to the Quiz.<br>

          <h2>Let the games begin!</h2>

          <p>Already have an account? <router-link class=a-signUp to="/login">Login</router-link></p>
        </div>
          <h1>Sign up for Mathlingo</h1>
          <!--<p id="answer"></p>-->
          <form v-on:submit.prevent="submitForm">
            <input type="text" placeholder="Enter Name" name="uname" id="userName" v-model="name">

            <input type="text" placeholder="Enter Email" name="email" id="email" v-model="email">

            <input type="password" placeholder="Enter Password" name="psw" id="password" v-model="password">

            <input type="password" placeholder="Confirm Password" name="psw" id="rePassword" v-model="rePassword">


            <input type="submit" class ="btn" id="btn-signup" value="Register">


          </form>


      </main>
    </section>

    </div>
  </div>

    <div v-else>
      <section>
        <button class="btn" @click.prevent="notAuth" >You are already logged in</button>
      </section>
    </div>
</template>

<script>
import axios from 'axios';
import swal from 'sweetalert2';
export default {
  name: "Home",
  data() {
    return{
      auth: window.localStorage.getItem('accessToken'),
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

      if (this.matchingPass == this.validName && this.matchingPass == true && this.matchingPass == this.validEmail) {
        this.validForm = true;
      }
      else {
        this.validForm = false;
      }

    },
    deep: true
  },
  methods: {
    notAuth(){
      this.$router.push('/myPage');
    },
    submitForm(){
      if (this.validForm) {
        let jsonEmail = {email: this.email};
        axios.post('http://localhost:4000/auth/available', jsonEmail)
          .then(response => {
            this.emailAvailable = response.data;
            if (this.emailAvailable) {
              let user = {name: this.name, email: this.email, password: this.password};
              axios.post('http://localhost:4000/auth/signup', user)
              .then(() => {
                swal.fire({
                  title: 'Account Created Successfully!',
                  text: 'Login to continue',
                  icon: 'success',
                  confirmButtonText: 'Login',
                }).then((result) => {
                  if (result.isConfirmed) {
                    this.$router.push('/login');
                  }
                  else this.resetForm();
                })
              })
            }else{
              swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Email already exists. Try another one...'
              }).then(()=>{
                this.email = '';
              })
            }
          })
      }
      else {
        if (!this.validName) {
          swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Name is too short. Has to be at least 3 characters.'
          })
          .then(() => {
            this.password = '';
            this.rePassword = '';
          })
        }
        else if (!this.validEmail) {
          swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Email is not valid.'
          })
          .then(() => {
            this.password = '';
            this.rePassword = '';
          })
        }
        else if (!this.matchingPass) {
          swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'The passwords do not seem to match. Try again!'
          })
          .then(() => {
            this.password = '';
            this.rePassword = '';
          })
        }
      }
    },
    resetForm(){
      this.name = '';
      this.email = '';
      this.password = '';
      this.rePassword = '';
    }
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