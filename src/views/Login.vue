<template>
  <div>
    <div class="hero is-fullheight is-primary">
      <div class="hero-body">
        <div class="container has-text-centered">
          <div class="column is-8 is-offset-2">
            <h3 class="title has-text-white">Welcome</h3>
            <hr class="login-hr" />
            <p class="subtitle has-text-white">
              A basic social login PWA project using
              <strong>Vue</strong>,
              <strong>Firebase</strong> and
              <strong>Bulma</strong>.
            </p>
            <div class="box">
              <div :class="{ 'signup-form': !showLoginForm }">
                <form v-if="showLoginForm" @submit.prevent>
                  <h2 class="is-size-4">Login</h2>
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
                        <i class="fas fa-envelope"></i>
                      </span>
                      <span class="icon is-small is-right">
                        <i class="fas fa-check"></i>
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

                  <a
                    @click="login()"
                    class="button is-primary is-outlined is-link is-rounded is-medium is-fullwidth"
                  >Log In</a>
                  <br />
                  <span>OR</span>
                  <br />
                  <br />
                  <a
                    class="button is-google is-outlined is-info is-rounded is-medium is-fullwidth"
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
                  <div class="field">
                    <p class="control has-icons-left has-icons-right">
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
                        <i class="fas fa-envelope"></i>
                      </span>
                      <span class="icon is-small is-right">
                        <i class="fas fa-check"></i>
                      </span>
                    </p>
                  </div>
                  <div class="field">
                    <p class="control has-icons-left">
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
                    </p>
                  </div>

                  <a
                    @click="signup()"
                    class="button is-secondary is-outlined is-link is-rounded is-medium"
                  >Sign Up</a>
                </form>
              </div>
            </div>
            <p class="has-text-grey">
              <template v-if="showLoginForm">
                <a @click="toggleForm">Sign Up</a> &nbsp;・&nbsp;
                <a @click="togglePasswordReset">Forgot Password</a>
              </template>
              <template v-else>
                <a @click="toggleForm">Log In</a> &nbsp;&nbsp;
              </template>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { firebase } from "@/firebase";
import PasswordReset from '@/components/PasswordReset'

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
        title: '',
        email: '',
        password: ''
      },
      showLoginForm: true,
      showPasswordReset: false
    }
  },
  methods: {
    toggleForm() {
      this.showLoginForm = !this.showLoginForm
    },
    togglePasswordReset() {
      this.showPasswordReset = !this.showPasswordReset
    },
    login() {
      this.$store.dispatch('login', {
        email: this.loginForm.email,
        password: this.loginForm.password
      })
    },
    loginWithGoogle() {
      const provider = new firebase.auth.GoogleAuthProvider();
      this.$store.dispatch('loginWithGoogle', provider).then(() => {
        this.$router.push({ name: "Profile" });
      })
    },
    signup() {
      this.$store.dispatch('signup', {
        email: this.signupForm.email,
        password: this.signupForm.password,
        name: this.signupForm.name
      })
    }
  }
}
</script>
