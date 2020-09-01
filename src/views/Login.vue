<template>
	<div>
		<div class="columns is-centered">
			<div class="column is-half has-background-white has-text-centered">
				<h1 class="title">Welcome</h1>
				<br />

				<p>
					A basic social login PWA project using
					<strong>Vue</strong>,
					<strong>Firebase</strong> and
					<strong>Bulma</strong>.
				</p>
				<br />

				<PasswordReset
					v-if="showPasswordReset"
					@close="togglePasswordReset()"
				></PasswordReset>
				<div :class="{ 'signup-form': !showLoginForm }">
					<form
						v-if="showLoginForm"
						@submit.prevent
					>
						<h2 class="is-size-4">Login</h2>
						<div class="field">
							<p class="control has-icons-left has-icons-right">
								<input
									id="email1"
									class="input"
									type="email"
									placeholder="Email"
									v-model.trim="loginForm.email"
								>
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
								>
								<span class="icon is-small is-left">
									<i class="fas fa-lock"></i>
								</span>
							</p>
						</div>

						<a
							@click="login()"
							class="button is-primary is-outlined is-link is-rounded is-medium"
						>Log In</a>
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
			</div>
			<!-- /Notification -->
		</div>
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
