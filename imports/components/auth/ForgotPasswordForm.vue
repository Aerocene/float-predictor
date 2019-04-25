<template>
  <form class="session-form" @submit.prevent="submitForm">
    <fieldset>
      <label>email</label>
      <input type="email" required v-model="formData.email" placeholder="email@example.com" />
      <footer class="form-text text-danger" v-show="lastSessionError">{{lastSessionError && lastSessionError.reason}}</footer>
    </fieldset>
    <button>Send password reset instructions</button>
  </form>
</template>

<script>
import router from '../../router';
import { forgotPassword } from '../../vuex/auth';
export default {
  mounted() {
    this.$store.commit('auth/setLastSessionError', null);
  },
  computed: {
    lastSessionError() {
      return this.$store.state.auth.lastSessionError;
    }
  },
  data() {
    return {
      formData: {
        email: '',
      }
    }
  },
  methods: {
    submitForm() {
      this.$store.commit('auth/setLastSessionError', null);
      return forgotPassword(this.formData)
        .then(() => { this.$emit('success'); })
        .catch((error) => { this.$store.commit('auth/setLastSessionError', error); });
    }
  }
}
</script>
