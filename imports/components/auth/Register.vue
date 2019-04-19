<template>
  <form @submit.prevent="submitForm">
    <h3>Get started!</h3>
    <fieldset>
      <label>email</label>
      <input v-model="formData.email"/>
    </fieldset>
    <fieldset>
      <label>password</label>
      <input type="password" v-model="formData.password" />
    </fieldset>
    <button>Register</button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    submitForm() {
      this.$store.dispatch('submitRegisterForm', this.formData)
    }
  }
}
</script>
