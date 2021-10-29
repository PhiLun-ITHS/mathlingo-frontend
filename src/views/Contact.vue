<template>
  <div class="contact">
    <section class="grid-container">
      <main id="subPages">

        <form id="contact"  method="post">

          <h1>Contact the team</h1>
          <input type="text" placeholder="Enter Name" name="contactname" required id="contactName">

          <input type="text" placeholder="Enter Email" name="email" required id="contactEmail">

          <input type="text" placeholder="Topic" name="topic" required id="contactTopic">

          <textarea name="message" rows="5" placeholder="Message.." required id="contactMessage"></textarea>

          <input type="submit" class ="btn" id="btn-contact" value="Send">

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
  name: "Contact"
}
</script>