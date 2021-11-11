<template>
  <div class="MyPage">

    <section class="grid-container">
      <main id="subPages">
     <h1><span class="logout-btn" v-on:click="logout"><a></a></span></h1>


      </main>
    </section>

      <footer>
        <p>Mathlingo &copy; 2021 All rights reserved.</p>
      </footer>

  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "MyPage",
  data(){
    return{

    }
  },
  methods:{
    logout(){
     let token = window.localStorage.getItem('accessToken')
      axios.post('http://localhost:4000/auth/logout', token);
      window.localStorage.clear();
      this.$router.push('/contact');
      location.reload();



    }
  }
}
</script>