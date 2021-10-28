<template style="align-content: center">
  <div class="login" >



    <section class="grid-container">
      <main id="subPages">
        <form>
          <h2>Login to your account</h2>
          <label><input type="text" id='email' placeholder="Email"></label>
          <label><input type="password" id='psw' placeholder="Password"></label>
          <input type="submit" class ="btn" id="btn-save" value="Login">
          <p>No account? <router-link class=a-signUp style="color: blue; font-size: 18px" to="/signup">Signup</router-link></p>
        </form>
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
  name: "Login"
}
</script>