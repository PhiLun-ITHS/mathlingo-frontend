<template>
  <div class="contact">
    <section class="grid-container">
      <main id="subPages">

        <form id="contact"  method="post" >

          <h1>Contact the team</h1>
          <form v-on:submit.prevent="sendEmail">
          <input type="text" placeholder="Enter Name" name="contactname" required id="contactName" v-model="name">

          <input type="text" placeholder="Enter Email" name="email" required id="contactEmail" v-model="email">

          <input type="text" placeholder="Topic" name="topic" required id="contactTopic" v-model="topic">

          <textarea name="message" rows="5" placeholder="Message.." required id="contactMessage" v-model="message"></textarea>

          <input type="submit" class ="btn" id="btn-contact" value="Send">
          </form>
        </form>
      </main>
    </section>

      <footer>
        <p>Mathlingo &copy; 2021 All rights reserved.</p>
      </footer>
  </div>
</template>

<script>

import emailjs from 'emailjs-com'


export default {
  name: "Contact",
  data() {
  return {
  name: '',
  email: '',
    topic: '',
  message: ''
}
},
  methods: {
  sendEmail(e) {
  try {
  emailjs.sendForm("service_tvhngis","template_fhsa8jj", e.target,
  'user_bnBXIIaeuVCqOyhwxRJ5I', {
  name: this.name, email: this.email, topic: this.topic, message: this.message
})

} catch(error) {
  console.log({error})
}
    this.name = ''
    this.email = ''
    this.topic = ''
    this.message = ''
},
}
}
</script>

