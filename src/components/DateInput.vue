<template>
	<date-picker
		mode="single"
		v-model="date"
		:attributes="attributes"
		:popover="{ visibility: 'click' }"
	>
		<div
			class="field"
			slot-scope="{ inputValue, updateValue }"
		>
			<label class='label'>
				{{dateName}}
			</label>
			<div class="control has-icons-left">
				<input
					type="text"
					class="input"
					:value="inputValue"
					@input="updateDate($event.target.value)"
					@change="updateDate($event.target.value)"
				/>
				<span class="icon is-small is-left">
					<i class="fas fa-calendar"></i>
				</span>
			</div>
			<p
				class="help"
				v-if="description!=''"
			>{{description}}</p>
		</div>
	</date-picker>
</template>

<script>
export default {
	name: 'DateInput',
	data() {
		return {
			date: null,
			attributes: [
				{
					key: 'today',
					highlight: true,
					dates: new Date()
				}
			]
		};
	},
	props: {
		dateName: { type: String, default: 'Date' },
		description: { type: String, default: '' }
	},
	methods: {
		updateDate(e) {
			console.log("test", this.updateValue)
			this.$emit('changed', this.formatDate(e, 'yyyy/mm/dd'));
		}
	}
}
</script>
