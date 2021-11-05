<template>
 <div id="app">

   <header>
     <!-- logo & text ska göras till en gemensam img  -->
   <div id="logo"> <router-link to="/"><img src="../src/assets/logo.png"></router-link>Mathlingo</div>
   <nav>
     <router-link class="a" to="/">Home</router-link>
     <router-link class="a" to="/mypage">My page</router-link>
     <router-link class="a" to="/contact">Contact</router-link>
     <router-link class="a" to="/about">About</router-link>
     <router-link class="a" to="/signup">Sign up</router-link>
     <router-link class="a" to="/login">Login</router-link>
   </nav>
   </header>
    <router-view/>

   <footer>
     <p id="copyright">Mathlingo &copy; 2021 All rights reserved.</p>
   </footer>

</div>
</template>

<style>
@import 'css/style.css';
</style>