<template>
	<div class="login-page">
		<div class="container">
			<div class="notification has-background-white has-text-centered">
				<h1 class="title">Login</h1>
				<br>

				<p>
					A basic social login PWA project using
					<strong>Vue</strong>,
					<strong>Firebase</strong> and
					<strong>Bulma</strong>.
				</p>
				<br>

				<a
					class="button is-outlined is-link is-rounded is-medium is-fullwidth"
					@click="loginWithFacebook"
				>
					<span class="icon">
						<i class="fab fa-facebook"></i>
					</span>
					<span>Sign in with Facebook</span>
				</a>
				<br />
				<a
					class="button is-outlined is-danger is-rounded is-medium is-fullwidth"
					@click="loginWithInstagram"
				>
					<span class="icon">
						<i class="fab fa-instagram"></i>
					</span>
					<span>Sign in with Instagram</span>
				</a>
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
			</div>
			<!-- /Notification -->
		</div>
		<PasswordReset
			v-if="showPasswordReset"
			@close="togglePasswordReset()"
		></PasswordReset>
		<section>
			<div
				:class="{ 'signup-form': !showLoginForm }"
				class="col2"
			>
				<form
					v-if="showLoginForm"
					@submit.prevent
				>
					<h1>Welcome Back</h1>
					<div>
						<label for="email1">Email</label>
						<input
							v-model.trim="loginForm.email"
							type="text"
							placeholder="you@email.com"
							id="email1"
						/>
					</div>
					<div>
						<label for="password1">Password</label>
						<input
							v-model.trim="loginForm.password"
							type="password"
							placeholder="******"
							id="password1"
						/>
					</div>
					<button
						@click="login()"
						class="button"
					>Log In</button>
					<div class="extras">
						<a @click="togglePasswordReset()">Forgot Password</a>
						<a @click="toggleForm()">Create an Account</a>
					</div>
				</form>
				<form
					v-else
					@submit.prevent
				>
					<h1>Get Started</h1>
					<div>
						<label for="name">Name</label>
						<input
							v-model.trim="signupForm.name"
							type="text"
							placeholder="Savvy Apps"
							id="name"
						/>
					</div>
					<div>
						<label for="title">Title</label>
						<input
							v-model.trim="signupForm.title"
							type="text"
							placeholder="Company"
							id="title"
						/>
					</div>
					<div>
						<label for="email2">Email</label>
						<input
							v-model.trim="signupForm.email"
							type="text"
							placeholder="you@email.com"
							id="email2"
						/>
					</div>
					<div>
						<label for="password2">Password</label>
						<input
							v-model.trim="signupForm.password"
							type="password"
							placeholder="min 6 characters"
							id="password2"
						/>
					</div>
					<button
						@click="signup()"
						class="button"
					>Sign Up</button>
					<div class="extras">
						<a @click="toggleForm()">Back to Log In</a>
					</div>
				</form>
			</div>
		</section>
	</div>
</template>

<script>
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
		signup() {
			this.$store.dispatch('signup', {
				email: this.signupForm.email,
				password: this.signupForm.password,
				name: this.signupForm.name,
				title: this.signupForm.title
			})
		}
	}
}
</script>
