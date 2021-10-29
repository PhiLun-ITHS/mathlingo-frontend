<template style="align-content: center">
  <div class="login" >



    <section class="grid-container">
      <main id="subPages">
        <form>
          <h1>Login to your account</h1>
          <label><input type="text" id='email' placeholder="Email"></label>
          <label><input type="password" id='psw' placeholder="Password"></label>
          <input type="submit" class ="btn" id="btn-save" value="Login">
          <p>No account? <router-link class=a-login to="/signup">Signup</router-link></p>
        </form>
      </main>
    </section>

      <footer>
        <p>Mathlingo &copy; 2021 All rights reserved.</p>
      </footer>

  </div>
</template>

<script>
export default {
  name: "Login"
}
</script>