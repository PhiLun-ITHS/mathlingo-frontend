<template>
<!--  <div id="app">-->
    <section class="grid-container" id="app">
      <header>
        <h1>Mathlingo</h1>
      </header>
      <nav>
        <router-link class="a" to="/">Home</router-link>
        <router-link class="a" to="/mypage">My Page</router-link>
        <router-link class="a" to="/login">Login</router-link>
        <router-link class="a" to="/signup">Signup</router-link>
        <router-link class="a" to="/contact">Contact</router-link>
        <router-link class="a" to="/about">About</router-link>
      </nav>
    <router-view/>
    </section>
<!--  </div>-->
</template>

<style>
@import 'css/style.css';
</style>


<!--<style>-->
<!--#app {-->
<!--  font-family: Avenir, Helvetica, Arial, sans-serif;-->
<!--  -webkit-font-smoothing: antialiased;-->
<!--  -moz-osx-font-smoothing: grayscale;-->
<!--  text-align: center;-->
<!--  color: #2c3e50;-->
<!--}-->

<!--/*#nav {*/-->
<!--/*  padding: 30px;*/-->
<!--/*}*/-->

<!--/*#nav a {*/-->
<!--/*  font-weight: bold;*/-->
<!--/*  color: #2c3e50;*/-->
<!--/*}*/-->

<!--/*#nav a.router-link-exact-active {*/-->
<!--/*  color: #42b983;*/-->
<!--/*}*/-->
<!--</style>-->
