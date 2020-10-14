<template>
	<date-picker
		mode="single"
		v-model="date"
		ref="datepicker"
		:attributes="attributes"
		:popover="{ visibility: 'click' }"
	>
		<div
			class="field"
			slot-scope="{ updateValue }"
		>
			<label class='label'>
				{{dateName}}
			</label>
			<div class="control has-icons-left">
				<input
					type="text"
					class="input"
					:value="inputValue"
					@input="updateValue($event.target.value)"
					@change="updateValue($event.target.value)"
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
					bar: true,
					dates: new Date()
				}
			]
		};
	},
	props: {
		dateName: { type: String, default: 'Date' },
		description: { type: String, default: '' },
		inputValue: { type: [Date, String], default: null }
	},
	watch: {
		date(to) {
			this.$refs.datepicker.updateValue(to);
			this.$emit('changed', this.formatDate(to, 'yyyy/MM/dd'));
		},
		inputValue(to) {
			if (to == null || to.lengh == 0) {
				this.date = null
				return
			}
			this.date = new Date(to);
			this.inputValue = this.formatDate(to, 'yyyy/MM/dd');

		}
	}
}
</script>
