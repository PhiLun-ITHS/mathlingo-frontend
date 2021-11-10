<template>
  <div class="MyPage">

    <section class="grid-container">
      <main id="subPages">
        <button v-on:click="logout">logout</button>
        <h1>My page</h1>

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
      window.localStorage.clear();
      this.$router.push('/login');

    }
  }
}
</script>