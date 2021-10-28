<template>

      <div class="home">
        <p id="padding">TAKE A QUIZ</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet assumenda aut consectetur<br> deserunt, esse excepturi exercitationem, expedita, facere magni molestiae nam<br> non perspiciatis quidem sequi soluta tempora ut velit voluptatibus.</p>
        <section class="grid-container">
      <main>
        <article>
          <p>Addition </p>
          <router-link to="/"><img src="../assets/subtraction.png"/></router-link>
        </article>
        <article>
          <p>Subtraction</p>
          <router-link to="/"><img src="../assets/subtraction.png"/></router-link>
        </article>
        <article>
          <p>Multiplication</p>
          <router-link to="/"><img src="../assets/subtraction.png"/></router-link>
        </article>
        <article>
          <p>Division</p>
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