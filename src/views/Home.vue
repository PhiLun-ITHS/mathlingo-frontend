<template>

      <div class="home">
        <div id="content">

      <section class="grid-container">
          <main id="subPages">

          <div>
          <h1>QUIZ MATEMATIK</h1>

          <p>
            Du möts nu av fyra spännande Quiz!<br>
            När du har klarat alla fyra kommer du låsa upp ett slutquiz.<br>
            Välj mellan addition, subtraktion, multiplikation eller division.</p>

          <h2>Gör ett val nedan för att börja!</h2>
          </div>

          </main>
      </section>

      <section class="grid-container">
      <div id="homeBackground">
        <main>

        <article>
          <h2>Addition</h2>
          <router-link to="/quiz">
            <button class="home-btn">+</button>
          </router-link>
        </article>

        <article>
          <h2>Subtraktion</h2>
          <router-link to="/quiz">
            <button class="home-btn">-</button>
          </router-link>
        </article>

        <article>
          <h2>Multiplikation</h2>
          <router-link to="/quiz">
            <button class="home-btn">x</button>
          </router-link>
        </article>

        <article>
          <h2>Division</h2>
          <router-link to="/quiz">
            <button class="home-btn">÷</button>
          </router-link>
        </article>

        </main>
      </div>
      </section>

      </div>
      </div>

</template>

<script>
export default {
  name: 'Home'
}
</script>