<template>
  <div class="MyPage">
    <div id="content">

      <h1>My page</h1>
      <section class="MyPage">

        <article>
          <h2 style="text-decoration: underline">Account info</h2>
          <p>Username: test</p>
          <p>Email: test@test.se</p>
          <p></p>
        </article>

        <article>
          <h2 style="text-decoration: underline">Settings</h2>
          <p @click="changePass=true; removeAcc=false">Change password</p>
          <p @click="removeAcc=true; changePass=false">Remove Account</p>
        </article>
      </section>

      <section class="grid-container">
      <main id="subPages">
        <div v-if="changePass">
          <input type="password" id='oldPsw' placeholder="Old password">
          <input type="password" placeholder="New Password" name="psw" required id="password">
          <input type="password" placeholder="Confirm Password" name="psw" required id="rePassword">
          <input type="submit" class ="btn" value="Change password" @click="changePass=false">
        </div>

        <div v-if="removeAcc">
          <p>Please enter your password to confirm</p>
          <input type="password" id='psw' placeholder="Password">
          <input type="submit" class ="btn" value="Change password" @click="removeAcc=false">
        </div>
      </main>
      </section>
      <h1 style="font-size: 35px;">Statistik</h1>
      <h1>Easy</h1>

    <section class="Statistic-container">

      <article>
        <div class="statistic">3/5</div>
        <p>test1</p>
      </article>

      <article>
        <div class="statistic">3/5</div>
        <p>test2</p>
      </article>

      <article>
        <div class="statistic">3/5</div>
        <p>test3</p>
      </article>

      <article>
        <div class="statistic">3/5</div>
        <p>test4</p>
      </article>

      <article>
        <div class="statistic">lock</div>
        <p>final</p>
      </article>

    </section>

      <h1>Hard</h1>
    <section class="Statistic-container">

      <article>
        <div class="statistic">3/5</div>
        <p>test1</p>
      </article>

      <article>
        <div class="statistic">3/5</div>
        <p>test2</p>
      </article>

      <article>
        <div class="statistic">3/5</div>
        <p>test3</p>
      </article>

      <article>
        <div class="statistic">3/5</div>
        <p>test4</p>
      </article>

      <article>
        <div class="statistic">lock</div>
        <p>final</p>
      </article>

    </section>

    </div>
  </div>
</template>

<script>
export default {
  name: "MyPage",
  data() {
    return {
      changePass: false,
      removeAcc: false,
    }
  }
}
</script>