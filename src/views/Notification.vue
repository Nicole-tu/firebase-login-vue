<template>
	<div>
		<div class="settings-header is-hidden-mobile">
			<h5 class="title">Email Notification</h5>
		</div>
		<div class="columns">
			<div class="column is-7">
				<div class="field">
					<input
						class="is-checkradio is-circle"
						id="exampleCheckbox"
						type="checkbox"
						name="exampleCheckbox"
						checked="checked"
					>
					<label for="exampleCheckbox">Notify me when the due date is comming</label>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'Notification'
}
</script>
