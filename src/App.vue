<template>
 <div id="app">
   <header>
   <nav>
     <router-link style="padding-right: 1%" to="/"><img src="../src/assets/logo.png"></router-link>
     <router-link class="a" to="/">Home</router-link>
     <router-link class="a" to="/mypage">My Page</router-link>
     <router-link class="a" to="/login">Login</router-link>
     <router-link class="a" to="/signup">Signup</router-link>
     <router-link class="a" to="/contact">Contact</router-link>
     <router-link class="a" to="/about">About</router-link>
   </nav>
   </header>
    <router-view/>
</div>
</template>

<style>
@import 'css/style.css';
</style>