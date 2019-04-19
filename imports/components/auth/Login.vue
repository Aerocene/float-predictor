<template>
  <form @submit.prevent="submitForm">
    <h3>Login</h3>
    <fieldset>
      <label>email</label>
      <input v-model="formData.username" />
    </fieldset>
    <fieldset>
      <label>password</label>
      <input type="password" v-model="formData.password" />
    </fieldset>
    <button>Login</button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    submitForm() {
      this.$store.dispatch('submitLoginForm', this.formData)
    }
  }
}
</script>
