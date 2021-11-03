<template>

      <div class="home">

          <h1 style="padding-top: 1%">QUIZ</h1>
          <p>info om QUIZ?</p>
          <section class="grid-container">
      <main>
        <article>
          <h2>Addition</h2>
          <router-link to="/"><img src="../assets/subtraction.png"/></router-link>
        </article>

        <article>
          <h2>Subtraction</h2>
          <router-link to="/"><img src="../assets/subtraction.png"/></router-link>
        </article>

        <article>
          <h2>Multiplication</h2>
          <router-link to="/"><img src="../assets/subtraction.png"/></router-link>
        </article>

        <article>
          <h2>Division</h2>
          <router-link to="/"><img src="../assets/subtraction.png"/></router-link>
        </article>
      </main>
        </section>

        <footer>
          <p>Mathlingo &copy; 2021 All rights reserved.</p>
        </footer>
      </div>

</template>

<script>
export default {
  name: 'Home',
  components: {

  }
}
</script>