<template>
  <form style="width: 500px; margin: 5% auto">
    <h1 style="margin: 2px auto">Sign Up</h1>
    <v-text-field
      v-model="email"
      :error-messages="emailErrors"
      :counter="50"
      label="E-mail"
      required
      @input="$v.email.$touch()"
      @blur="$v.email.$touch()"
    ></v-text-field>

    <v-text-field
      v-model="password"
      :error-messages="passwordErrors"
      :counter="50"
      label="Password"
      required
      @input="$v.password.$touch()"
      @blur="$v.password.$touch()"
    ></v-text-field>
    <v-btn class="mr-4" @click.prevent="submit" :disabled="emailErrors.length > 0 || passwordErrors.length > 0 ">submit</v-btn>
    <v-btn @click="clear">clear</v-btn>
  </form>
</template>
<script>
import { validationMixin } from 'vuelidate'
import { required, minLength, email, maxLength } from 'vuelidate/lib/validators'

export default {
  mixins: [validationMixin],

  validations: {
    email: { required, email, minLength: minLength(8), maxLength: maxLength(50) },
    password: { required, minLength: minLength(8), maxLength: maxLength(50) }
  },

  data: () => ({
    email: '',
    password: ''
  }),

  computed: {
    emailErrors () {
      const errors = []
      if (!this.$v.email.$dirty) return errors
      !this.$v.email.required && errors.push('E-mail is required')
      !this.$v.email.minLength &&
        errors.push('Email must be at least 8 characters long')
      !this.$v.email.email && errors.push('Must be valid e-mail')
      !this.$v.email.maxLength &&
        errors.push('Email must be at most 50 characters long')
      return errors
    },
    passwordErrors () {
      const errors = []
      if (!this.$v.password.$dirty) return errors
      !this.$v.password.required && errors.push('Password is required')
      !this.$v.password.minLength &&
        errors.push('Password must be at least 8 characters long')
      !this.$v.password.maxLength &&
        errors.push('Password must be at most 50 characters long')
      return errors
    }
  },

  methods: {
    async submit () {
      const email = this.email
      const password = this.password
      await this.$store.dispatch('signUp', { email, password })
    },
    clear () {
      this.email = ''
      this.password = ''
    }
  }
}
</script>
