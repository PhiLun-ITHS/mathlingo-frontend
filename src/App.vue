<template>
 <div id="app">
   <header>

     <!-- logo & text ska göras till en gemensam img  -->
   <div id="logo"> <router-link to="/"><img src="../src/assets/logo.png"></router-link>Mathlingo</div>

   <nav>
     <router-link class="a" to="/">Home</router-link>
     <router-link class="a" to="/mypage" v-if="isLoggedIn">My page</router-link>
     <router-link class="a" to="/contact">Contact</router-link>
     <router-link class="a" to="/about">About</router-link>
     <router-link class="a" to="/signup" v-if="isLoggedIn===null">Sign up</router-link>
     <router-link class="a" to="/login" v-if="isLoggedIn===null">Login</router-link>
     <router-link class="a" to="/login" v-if="isLoggedIn" v-on:click="logout">Logout</router-link>



   </nav>
   </header>
    <router-view/>
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
    logout(){
      window.localStorage.clear();
      this.$router.push('/login');
    }
  }



}

</script>
<style>
@import 'css/style.css';
</style>