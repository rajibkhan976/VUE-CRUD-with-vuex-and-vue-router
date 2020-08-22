<template>
  <div id="app">
	<NavigationMenu />
	<router-view />
  </div>
</template>

<script>
import Vue from 'vue';
import Vuex from 'vuex';
import NavigationMenu from './components/NavigationMenu.vue';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    products: [
	{ 	name: 'Keya soap', 
		sku: 'SKU-1234', 
		stockable: 'yes', 
		category: 'lg', 
		brand: ['Unilever'], 
		usp: 'USP', 
		description: 'best seller', 
		variant: 'White', 
		image: 'book.png'
	}],
	updateproduct: null,
	cardModals: [],
	brandModal: false,
	productbrands: [{ text: 'Select Product Brand', value: null }, 'Create New', 'Unilever'],
	parentBrands: [{ text: 'Select Parent', value: null }, 'Unilever' ],
	productbrandparentchildpair: []
  },
  mutations: {
    addPost (state, product) {
	state.products.push(product);
    },
	updatePost (state, product) {
	let updateIndex = state.products.findIndex(element => element.name === state.updateproduct.name);
	state.products.splice(updateIndex, 1, product);
	},
	deletePost (state, deleteIndex) {
	state.products.splice(deleteIndex, 1);
	state.cardModals.pop();
	},
	addUpdateProduct (state, id) {
	let postToEdit = state.products.find((element, index) => {
	if (index === id) {
	return element;
	}
	});
	let selectedpost = {
	name: postToEdit.name,
	sku: postToEdit.sku,
	stockable: postToEdit.stockable,
	category: postToEdit.category,
	brand: postToEdit.brand,
	usp: postToEdit.usp,
	description: postToEdit.description,
	variant: postToEdit.variant,
	image: null
	};
	state.updateproduct = Object.assign({}, selectedpost);
	},
	showCardModal (state, cardIndex) {
	state.updateproduct = null;
	state.cardModals.push({key: cardIndex, show: true});
	},
	hideCardModal (state) {
	state.updateproduct = null;
	state.cardModals.pop();
	},
	showBrandModal (state) {
	state.brandModal = true;
	},
	hideBrandModal (state) {
	state.brandModal = false;
	},
	addProductBrand (state, newBrand) {
	state.productbrands.push(newBrand.name);
	state.parentBrands.push(newBrand.name);
	state.productbrandparentchildpair.push(newBrand);
	}
  },
  actions: {
    addPost (context, product) {
      context.commit('addPost', product);
    },
	updatePost (context, product) {
	context.commit('updatePost', product);
	},
	deletePost (context, deleteIndex) {
	context.commit('deletePost', deleteIndex);
	},
	addUpdateProduct (context, id) {
	context.commit('addUpdateProduct', id);
	},
	showCardModal (context, cardIndex) {
	context.commit('showCardModal', cardIndex);
	},
	hideCardModal (context) {
	context.commit('hideCardModal');
	},
	showBrandModal (context) {
	context.commit('showBrandModal');
	},
	hideBrandModal (context) {
	context.commit('hideBrandModal');
	},
	addProductBrand (context, newBrand) {
	context.commit('addProductBrand', newBrand);
	}
	}
});

export default {
  name: 'App',
  store: store,
  components: {
	NavigationMenu
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
