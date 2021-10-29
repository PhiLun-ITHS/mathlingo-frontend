<template>
  <div class="signup">

    <section class="grid-container">
      <main id="subPages">
          <form id="signUp"  method="post">

            <h1>Sign up for Mathlingo</h1>
            <input type="text" placeholder="Enter Username" name="uname" required id="userName">
            <div id="userNameHint" class="warning"></div>

            <input type="text" placeholder="Enter Email" name="email" required id="email">

            <input type="password" placeholder="Enter Password" name="psw" required id="password">

            <input type="password" placeholder="Confirm Password" name="psw" required id="rePassword">

            <input type="submit" class ="btn" id="btn-signup" value="Register">

            <div id="passwordHint" class="warning"></div>

            <p>Already have an account? <router-link class=a-signUp to="/login">Login</router-link></p>
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
  name: "Signup"
}
</script>