<template>
  <div class="MyPage">

    <section class="grid-container">
      <main id="subPages">

     <span class="logout-btn" v-on:click="logout"><a></a></span>
      </main>
    </section>

      <footer>
        <p>Mathlingo &copy; 2021 All rights reserved.</p>
      </footer>

  </div>
</template>

<script>


export default {
  name: "MyPage",
  data(){
    return{

    }
  },
  methods:{
    logout(){
     let token = window.localStorage.getItem('refreshToken')
      let token1 = window.localStorage.getItem('accessToken')
      console.log(token1);
      console.log(token);

  //   axios.post('http://localhost:4000/auth/logout', token)
  window.localStorage.clear()
this.$router.push('/home')
      .then(location.reload());









    }
  }
}
</script>