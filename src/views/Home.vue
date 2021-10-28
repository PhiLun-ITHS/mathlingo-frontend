<template>

      <div class="home">

        <h2>Take a quiz</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet assumenda aut consectetur<br> deserunt, esse excepturi exercitationem, expedita, facere magni molestiae nam<br> non perspiciatis quidem sequi soluta tempora ut velit voluptatibus.</p>
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
          <p><router-link style="margin: 5px" to="/contact">Contact us</router-link>| <router-link to="/about">About</router-link></p>
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