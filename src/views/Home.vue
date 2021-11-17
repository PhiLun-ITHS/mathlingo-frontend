<template>
      <div class="home">
      <!--<div class="home" v-if="auth">-->
        <div id="content">

          <h1>Home</h1>



  <!--<div v-else>-->
  <section class="grid-container">

    <main id="subPages">

      <div>
        <h1>QUIZ MATEMATIK</h1>

        <p>
          Välkommen till Mathlingo<br>
          För att få tillgång till Quiz behöver du skapa ett konto och logga in.<br>
          Om du redan har ett konto vänligen <router-link to="/login">logga in.</router-link></p>

        <h2>Let the games begin!</h2>
      </div>

    </main>

  </section>
  </div>
  </div>

</template>

<script>
export default {
  name: 'Home',
  data(){
    return{
      auth: window.localStorage.getItem('accessToken')
    }
  }
}
</script>