<template>
 <div id="app">
   <header>

     <!-- logo & text ska göras till en gemensam img  -->
   <div id="logo"><img src="../src/assets/logo.png">Mathlingo</div>

   <nav>
     <router-link class="a" to="/">Home</router-link>
     <router-link class="a" to="/mypage">My page</router-link>
     <router-link class="a" to="/contact">Contact us</router-link>
     <router-link class="a" to="/about">About</router-link>
     <router-link class="a" to="/signup">Sign up</router-link>
     <router-link class="a" to="/login">Login</router-link>
   </nav>
   </header>
    <router-view/>
</div>
</template>

<style>
@import 'css/style.css';
</style>