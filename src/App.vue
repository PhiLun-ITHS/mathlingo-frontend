<template>
 <div id="app">

   <header>
   <div><router-link to="/"><img src="../src/assets/logo.png"></router-link></div>
   <nav>
     <router-link class="a" to="/">Home</router-link>
     <router-link class="a" to="/mypage" v-if="isLoggedIn">My page</router-link>
     <router-link class="a" to="/signup" v-if="isLoggedIn===null">Sign up</router-link>
     <router-link class="a" to="/login" v-if="isLoggedIn===null">Login</router-link>
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


export default {
  name: 'app',
  data(){
    return{
      isLoggedIn: localStorage.getItem('accessToken'),

    }
  },
  methods:{

    }

}

</script>
<style>
@import 'css/style.css';
</style>