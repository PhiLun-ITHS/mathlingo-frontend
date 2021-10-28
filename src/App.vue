<template>
 <div id="app">
   <header>
   <nav>
     <router-link style="padding-right: 1%" to="/"><img src="../src/assets/logo.png"></router-link>
     <router-link class="a" to="/">Home</router-link>
     <router-link class="a" to="/mypage">My page</router-link>
     <router-link class="a" to="/signup">Sign up</router-link>
     <router-link class="b" to="/login">Login</router-link>
   </nav>
   </header>
    <router-view/>
</div>
</template>

<style>
@import 'css/style.css';
</style>