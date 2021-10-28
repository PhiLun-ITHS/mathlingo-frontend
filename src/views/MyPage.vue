<template>
  <div class="MyPage">

    <h2>My page</h2>

    <section class="grid-container">
      <main id="subPages">
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
  name: "MyPage"
}
</script>