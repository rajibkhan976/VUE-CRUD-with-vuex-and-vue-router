<template>
  <div>
    <b-form enctype="multipart/form-data" @submit="onSubmit" @reset="onReset" v-if="show">
	<div class="container">
	<div class="row">
	<div class="col-md-6">
      <b-form-group
        id="input-group-1"
        label="Name"
        label-for="input-1"
      >
        <b-form-input
          id="input-1"
          v-model="form.name"
          required
          placeholder="e.g. Lux"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2"> <b-form-checkbox v-model="form.stockable" id="checkboxes-2" value="yes" unchecked-value="no">Stockable</b-form-checkbox>
      </b-form-group>
		<b-form-group id="input-group-3" label="Product Brand" label-for="input-3">
        <b-form-select
        id="input-3"
        v-model="form.brand"
        :options="brands" 
		multiple 
		v-on:change="openCreateBrandModal"
        required
        ></b-form-select>
      </b-form-group>
		<b-form-group id="input-group-4" label="Description" label-for="input-4">
		<b-form-textarea
		id="input-4"
		v-model="form.description"
		placeholder="Product Description"
		rows="3"
		max-rows="6"
		></b-form-textarea>
		</b-form-group>
		<b-form-group id="input-group-5" label="Image" label-for="input-5">
		<b-form-file 
		id="input-5" 
		v-model="form.image" 
		class="mt-3" 
		accept=".jpg, .png, .gif"
		plain
		></b-form-file>
		</b-form-group>
	</div>
	
	<div class="col-md-6">
      <b-form-group id="input-group-6" label="SKU" label-for="input-6">
        <b-form-input
          id="input-6"
          v-model="form.sku"
          required
          placeholder="e.g. SKU-1234"
        ></b-form-input>
      </b-form-group>
		<b-form-group id="input-group-7" label="Product Category" label-for="input-7">
        <b-form-select
          id="input-7"
          v-model="form.category"
          :options="categories"
          required
        ></b-form-select>
      </b-form-group>
		<b-form-group id="input-group-8" label="USP" label-for="input-8">
		<b-form-textarea
		id="input-8"
		v-model="form.usp"
		placeholder="Product Description"
		rows="3"
		max-rows="6"
		></b-form-textarea>
		</b-form-group>
		<b-form-group id="input-group-9" label="Variant Category" label-for="input-9">
        <b-form-select
          id="input-9"
          v-model="form.variant"
          :options="variants"
          required
        ></b-form-select>
      </b-form-group>
    </div>
	<div class="mt-3" v-bind:style="{marginLeft: '51%'}">
	<b-button class="ml-3" v-bind:style="{boxShadow: '0px 0px 0px 2px #f2f2f2'}" variant="default" @click="hideModal">Close</b-button>
	<b-button class="ml-2" type="submit" variant="success">Save</b-button>
	<b-button class="ml-2" type="reset" variant="warning">Reset</b-button>
	</div>
	</div>
	</div>
    </b-form>
	<BrandModal />
	</div>
</template>

<script>
import { mapState } from 'vuex';
import { mapMutations } from 'vuex';
import { mapActions } from 'vuex';
import BrandModal from './BrandModal.vue';

  export default {
	name: 'PostForm',
	computed: mapState({
	products: state => state.products,
	cardModals: state => state.cardModals,
	updateproduct: state => state.updateproduct,
	productbrands: state => state.productbrands
	}),
    data() {
	if(this.$store.state.updateproduct !== null) {
	return {
	form: {
        name: this.$store.state.updateproduct.name,
        stockable: this.$store.state.updateproduct.stockable,
        brand: this.$store.state.updateproduct.brand, 
		description: this.$store.state.updateproduct.description, 
		image: null,
        sku: this.$store.state.updateproduct.sku, 
		category: this.$store.state.updateproduct.category, 
		usp: this.$store.state.updateproduct.usp, 
		variant: this.$store.state.updateproduct.variant
        },
	brands: this.$store.state.productbrands,
	categories: [{ text: 'Select Product Category', value: null }, 'xl', 'lg', 'md', 'sm'],
	variants: [{ text: 'Select Variant Category', value: null }, 'Black', 'White', 'Blue', 'Red', 'Yellow', 'Orange'],
    show: true
	};
	} else {
	return {
        form: {
        name: '',
        stockable: '',
        brand: [], 
		description: '', 
		image: null,
        sku: '', 
		category: null, 
		usp: '', 
		variant: null
        },
        brands: this.$store.state.productbrands,
		categories: [{ text: 'Select Product Category', value: null }, 'xl', 'lg', 'md', 'sm'],
		variants: [{ text: 'Select Variant Category', value: null }, 'Black', 'White', 'Blue', 'Red', 'Yellow', 'Orange'],
        show: true
      }
	}
    },
    methods: {
    ...mapMutations([
	'addPost',
	'updatePost',
	'hideCardModal',
	'showBrandModal'
	]),
	...mapActions([
    'addPost', 
	'updatePost', 
	'hideCardModal',
	'showBrandModal'
    ]),
      onSubmit(event) {
        event.preventDefault();
		let formData = {
		name: this.form.name,
		sku: this.form.sku,
		stockable: this.form.stockable,
		category: this.form.category,
		brand: this.form.brand,
		usp: this.form.usp,
		description: this.form.description,
		variant: this.form.variant,
		image: this.form.image
		};
		if(this.$store.state.updateproduct !== null) {
		this.$store.dispatch('updatePost', formData);
		this.$store.dispatch('hideCardModal');
		} else {
		this.$store.dispatch('addPost', formData);
		this.$store.dispatch('hideCardModal');
		this.$router.push('dashboard');
		}
      },
      onReset(event) {
        event.preventDefault();
        // Reset our form values
        this.form.name = '';
        this.form.stockable = '';
        this.form.brand = [];
        this.form.description = '';
		this.form.image = null;
		this.form.sku = '';
		this.form.category = null;
		this.form.usp = null;
		this.form.variant = null;
        // Trick to reset/clear native browser form validation state
        this.show = false;
        this.$nextTick(() => {
          this.show = true
        });
      },
	hideModal() {
		if(this.$store.state.cardModals.length !== 0 &&
		this.$store.state.cardModals[0].key === -1
		) {
		this.$router.push('dashboard');
		}
		this.$store.dispatch('hideCardModal');
		this.updateIndex = null;
	},
	openCreateBrandModal() {
	const createNew = this.form.brand.find(element => element === 'Create New');
	if(createNew) {
	this.$store.dispatch('showBrandModal');
	}
	}
    },
	components: {
	BrandModal
	}
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
