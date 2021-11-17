<template>
 <div id="app">

   <header>
   <div><router-link to="/"><img src="../src/assets/logo.png"></router-link></div>
   <nav>
     <router-link class="a" to="/">Home</router-link>
     <router-link class="a" to="/mypage" v-if="isLoggedIn">My page</router-link>
     <router-link class="a" to="/signup" v-if="isLoggedIn===null">Sign up</router-link>
     <router-link class="a" to="/login" v-if="isLoggedIn===null">Login</router-link>
     <a class="a" id="logout" v-on:click="logout" v-if="isLoggedIn !== null">Logout</a>
   
   </nav>
   </header>
    <router-view/>

   <footer>
     <p id="copyright">
       <router-link to="/contact" style="margin-right: 3px">Contact</router-link>
       <router-link to="/about" style="margin-left: 3px">About</router-link><br>
       &copy; 2021 Mathlingo
     </p>
   </footer>

</div>
</template>
<script>

import swal from 'sweetalert2';
import axios from "axios";


export default {
  name: 'app',
  data(){
    return {
      isLoggedIn: localStorage.getItem('accessToken')
    }
  },
  methods: {
    logout: function logout(){
        swal.fire({
          title: 'Are you sure you want to logout?',
          confirmButtonText: 'Logout',
          cancelButtonText: 'Stay Quizzing',
          showCancelButton: true,
          confirmButtonColor: 'dark red',
          cancelButtonColor: 'dark green',
        }).then ((result)=>{
        if(result['isConfirmed']){
          let data = {
            accessToken: localStorage.getItem('accessToken')            
          };
          if (data.accessToken == null) {
              localStorage.clear();
              location.reload();
          }
          else {
            axios.post('http://localhost:4000/auth/logout',data)
            .then(() => {
              console.log("POSTED");
              localStorage.clear();
              location.reload();
            })
          }
          this.$router.push('/')
        }
        else
        {
          swal.fire('Cancelled')
        }
      })
    },
  },
  beforeCreated() {
    let data = {
      accessToken: localStorage.getItem('accessToken')            
    };
    axios.post('http://localhost:4000/auth/logout',data)
      .catch(function (error) {
        if (error.response) {
          localStorage.clear();
          location.reload();
        }
      })
  },
}

</script>
<style>
@import 'css/style.css';
</style>