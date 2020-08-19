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
	<div class="mt-3">
	<b-button class="ml-3" type="submit" variant="primary">Submit</b-button>
	<b-button class="ml-2" type="reset" variant="danger">Reset</b-button>
	</div>
	</div>
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
	posts: state => state.posts
	}),
	props: ['editPost', 'updateIndex'],
    data() {
	if(this.editPost) {
	return {
	form: {
          name: this.editPost.name,
          stockable: this.editPost.stockable,
          brand: this.editPost.brand, description: this.editPost.description, image: null,
          sku: this.editPost.sku, category: this.editPost.category, usp: this.editPost.usp, variant: this.editPost.variant
        },
	brands: [{ text: 'Select Product Brand', value: null }, 'Unilever', 'Create New'],
	categories: [{ text: 'Select Product Category', value: null }, 'xl', 'lg', 'md', 'sm'],
	variants: [{ text: 'Select Variant Category', value: null }, 'Black', 'White', 'Blue', 'Red', 'Yellow', 'Orange'],
    show: true
	};
	} else {
	return {
        form: {
          name: '',
          stockable: '',
          brand: null, description: '', image: null,
          sku: '', category: null, usp: '', variant: null
        },
        brands: [{ text: 'Select Product Brand', value: null }, 'Unilever', 'Create New'],
		categories: [{ text: 'Select Product Category', value: null }, 'xl', 'lg', 'md', 'sm'],
		variants: [{ text: 'Select Variant Category', value: null }, 'Black', 'White', 'Blue', 'Red', 'Yellow', 'Orange'],
        show: true
      }
	}
    },
    methods: {
    ...mapMutations([
	'addPost',
	'updatePost'
	]),
	...mapActions([
      'addPost', 'updatePost'
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
		if(this.editPost) {
		this.$store.dispatch('updatePost', formData);
		} else {
		this.$store.dispatch('addPost', formData);
		}
      },
      onReset(event) {
        event.preventDefault();
        // Reset our form values
        this.form.name = '';
        this.form.stockable = '';
        this.form.brand = null;
        this.form.description = '';
		this.form.image = null;
		this.form.sku = '';
		this.form.category = null;
		this.form.usp = null;
		this.form.variant = null;
        // Trick to reset/clear native browser form validation state
        this.show = false
        this.$nextTick(() => {
          this.show = true
        })
      }
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
