<template style="align-content: center">
  <div class="login" >
    <section class="grid-container">
      <main>
        <form>
          <input type="submit" class ="btn" id="btn-save" value="Login">
          <label><input type="text" id='email' placeholder="Email"></label>
          <label><input type="password" id='psw' placeholder="Password"></label>
          <p>No account? <router-link class=a-signUp to="/signup">Signup</router-link></p>
        </form>
      </main>
      <footer>
        <h2>Mathlingo</h2>
        <hr>
        &copy; 2021 All rights reserved
        <a style="float:right" href="tel:070-000-0000">070-000-0000</a>
      </footer>
    </section>
  </div>
</template>

<script>
export default {
  name: "Login"
}
</script>