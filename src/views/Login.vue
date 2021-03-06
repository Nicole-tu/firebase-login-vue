<template>
  <div class="login-page">
    <PasswordReset :is-show-modal="showPasswordReset" @close="togglePasswordReset()" />
    <div class="container has-text-centered">
      <div class="column is-8 is-offset-2">
        <h3 class="title has-text-white">Welcome</h3>
        <hr class="login-hr" />
        <p class="subtitle has-text-white">
          A PWA project using
          <strong>Vue</strong>,
          <strong>Firebase</strong> and
          <strong>Bulma</strong>.
        </p>
        <div class="box">
          <div :class="{ 'signup-form': !showLoginForm }">
            <form v-if="showLoginForm" @submit.prevent>
              <h4>Login</h4>
              <br />
              <br />
              <div class="field">
                <p class="control has-icons-left has-icons-right">
                  <input
                    id="email1"
                    class="input"
                    type="email"
                    placeholder="Email"
                    v-model.trim="loginForm.email"
                  />
                  <span class="icon is-small is-left">
                    <i class="fas fa-envelope" />
                  </span>
                  <span class="icon is-small is-right">
                    <template v-if="loginForm.email.length>0">
                      <i v-if="validation.email" class="fas fa-times has-text-danger" />
                      <i v-else class="fas fa-check has-text-success" />
                    </template>
                  </span>
                </p>
              </div>
              <div class="field">
                <p class="control has-icons-left">
                  <input
                    id="password"
                    class="input"
                    type="password"
                    placeholder="Password"
                    v-model.trim="loginForm.password"
                  />
                  <span class="icon is-small is-left">
                    <i class="fas fa-lock"></i>
                  </span>
                </p>
              </div>

              <a @click="login" class="button is-primary is-rounded is-medium is-fullwidth">Log In</a>
              <br />
              <span>OR</span>
              <br />
              <br />
              <a
                class="button is-outlined is-info is-rounded is-medium is-fullwidth"
                @click="loginWithGoogle"
              >
                <span class="icon">
                  <i class="fab fa-google"></i>
                </span>
                <span>Sign in with Google</span>
              </a>
            </form>
            <form v-else @submit.prevent>
              <h2 class="is-size-4">Create a new account</h2>
              <br />
              <br />
              <div class="field">
                <p class="control has-icons-left">
                  <input
                    id="name"
                    class="input"
                    type="text"
                    placeholder="Name"
                    v-model.trim="signupForm.name"
                  />
                  <span class="icon is-small is-left">
                    <i class="fa fa-user"></i>
                  </span>
                </p>
              </div>
              <div class="field">
                <p class="control has-icons-left has-icons-right">
                  <input
                    id="email2"
                    class="input"
                    type="email"
                    placeholder="you@email.com"
                    v-model.trim="signupForm.email"
                  />
                  <span class="icon is-small is-left">
                    <i class="fas fa-envelope" />
                  </span>
                  <span class="icon is-small is-right">
                    <template v-if="signupForm.email.length>0">
                      <i v-if="validation.email" class="fas fa-times has-text-danger" />
                      <i v-else class="fas fa-check has-text-success" />
                    </template>
                  </span>
                </p>
              </div>
              <div class="field">
                <p class="control has-icons-left has-icons-right">
                  <input
                    id="password2"
                    class="input"
                    type="password"
                    placeholder="Password"
                    v-model.trim="signupForm.password"
                  />
                  <span class="icon is-small is-left">
                    <i class="fas fa-lock"></i>
                  </span>
                  <span class="icon is-small is-right">
                    <template v-if="signupForm.password.length>0">
                      <i
                        v-if="validation.password"
                        class="fa fa-exclamation-triangle has-text-danger"
                      />
                      <i v-else class="fas fa-check has-text-success" />
                    </template>
                  </span>
                </p>
                <p
                  v-if="signupForm.password.length>0 && validation.password"
                  class="help"
                  :class="validation.password?'has-text-danger':null"
                >Passwords must be at least 8 characters long. And must contain at least one uppercase.</p>
              </div>

              <a @click="signup" class="button is-primary is-rounded is-medium is-fullwidth">Sign Up</a>
            </form>
          </div>
        </div>
        <p class="has-text-grey">
          <template v-if="showLoginForm">
            <a @click="toggleForm">Sign Up</a> &nbsp;・&nbsp;
            <a
              data-target="modal-forget-password"
              @click="togglePasswordReset"
            >Forgot Password</a>
          </template>
          <template v-else>
            <a @click="toggleForm">Log In</a> &nbsp;&nbsp;
          </template>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { firebase } from "@/firebase";
import PasswordReset from '@components/PasswordReset.vue'


export default {
  name: "Login",
  components: {
    PasswordReset
  },
  data() {
    return {
      loginForm: {
        email: '',
        password: ''
      },
      signupForm: {
        name: '',
        email: '',
        password: ''
      },
      showLoginForm: true,
      showPasswordReset: false,
      validation: {
        email: true,
        password: true
      }
    }
  },
  watch: {
    "loginForm.email"(to) {
      if (this.checkEmail(to)) {
        this.validation.email = false
      } else {
        this.validation.email = true
      }
    },
    "loginForm.password"(to) {
      if (this.checkPassword(to)) {
        this.validation.password = false
      } else {
        this.validation.password = true
      }
    },
    "signupForm.email"(to) {
      if (this.checkEmail(to)) {
        this.validation.email = false
      } else {
        this.validation.email = true
      }
    },
    "signupForm.password"(to) {
      if (this.checkPassword(to)) {
        this.validation.password = false
      } else {
        this.validation.password = true
      }
    }
  },
  methods: {
    toggleForm() {
      this.showLoginForm = !this.showLoginForm;
      this.loginForm = {
        email: '',
        password: ''
      };
      this.signupForm = {
        name: '',
        email: '',
        password: ''
      };
      this.validation = {
        email: true,
        password: true
      }
    },
    togglePasswordReset() {
      this.showPasswordReset = !this.showPasswordReset
    },
    checkEmail(email) {
      return /\S/.test(email) && /^.+@.+\..+$/.test(email);
    },
    checkPassword(password) {
      return /^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?!([^(0-9a-zA-Z)])+$).{8,}$/.test(password);
    },
    login() {
      const { email, password } = this.loginForm;
      if (this.checkEmail(email) && this.checkPassword(password)) {
        this.$store.dispatch('login', {
          email,
          password
        }).then(() => this.toRootPage())
      } else {
        alert('error');
        return;
      }
    },
    loginWithGoogle() {
      const provider = new firebase.auth.GoogleAuthProvider();
      this.$store.dispatch('loginWithProvider', provider).then(() => this.toRootPage())
    },
    signup() {
      const { name, email, password } = this.signupForm;
      if (this.checkEmail(email) && this.checkPassword(password) && name.length > 0) {
        this.$store.dispatch('signup', {
          email: this.signupForm.email,
          password: this.signupForm.password,
          name: this.signupForm.name
        }).then(() => this.toRootPage())
      } else {
        alert('error');
        return;
      }
    },
    toRootPage() {
      this.$router.push({ name: "Dashboard" });
    }
  }
}
</script>
