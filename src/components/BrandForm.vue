<template>
	<div>
    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
      <b-form-group id="input-group-1" label="Name" label-for="input-1">
        <b-form-input
          id="input-1"
          v-model="form.name"
          required
          placeholder="e.g. Unilever"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Parent (Optional)" label-for="input-2">
        <b-form-select
          id="input-2"
          v-model="form.parent"
          :options="parents"
        ></b-form-select>
      </b-form-group>
	<div v-bind:style="{marginLeft: '56%'}">
		<b-button v-bind:style="{boxShadow: '0px 0px 0px 2px #f2f2f2'}" variant="default" v-on:click="closeModal">Close</b-button>
		<b-button class="ml-2" type="submit" variant="success">Save</b-button>
		<b-button class="ml-2" type="reset" variant="warning">Reset</b-button>
	</div>
    </b-form>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { mapMutations } from 'vuex';
import { mapActions } from 'vuex';

  export default {
	computed: mapState({
	brandModal: state => state.brandModal,
	parentBrands: state => state.parentBrands
	}),
    data() {
      return {
        form: {
          name: '',
          parent: null
        },
        parents: this.$store.state.parentBrands,
        show: true
      }
    },
    methods: {
	...mapMutations([
	'hideBrandModal',
	'addProductBrand'
	]),
	...mapActions([
	'hideBrandModal',
	'addProductBrand'
    ]),
      onSubmit(event) {
        event.preventDefault()
		let newBrand = {
		name: this.form.name,
		parent: this.form.parent
		};
        this.$store.dispatch('addProductBrand', newBrand);
		this.$store.dispatch('hideBrandModal');
      },
      onReset(event) {
        event.preventDefault()
        // Reset our form values
        this.form.name = '';
        this.form.parent = null;
        // Trick to reset/clear native browser form validation state
        this.show = false
        this.$nextTick(() => {
          this.show = true
        })
      },
	closeModal() {
	this.$store.dispatch('hideBrandModal');
	}
    }
  }
</script>