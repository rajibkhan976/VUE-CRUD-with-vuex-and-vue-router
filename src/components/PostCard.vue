<template>
  <div class="container mt-5">
  <div class="row">
  <div v-for="(product, index) in products" v-bind:key="index">
    <b-card
    no-body
    tag="article"
    style="width: 70em;"
    class="mb-2 ml-4 overflow-hidden"
	:items="product"
  >
  <b-row no-gutters>
	<b-col md="6">
        <b-card-img src="https://picsum.photos/400/400/?image=20" alt="Image" class="rounded-0"></b-card-img>
	</b-col>
	<b-col md="6">
	<b-card-body title="Product">
    <b-card-text>
	Name: {{ product.name }}
    </b-card-text>
	<b-card-text>
	SKU: {{ product.sku }}
    </b-card-text>
	<b-card-text>
	Stockable: {{ product.stockable }}
    </b-card-text>
	<b-card-text >
	Category: {{ product.category }}
    </b-card-text>
	<b-card-text>
	Brand: {{ product.brand }}
    </b-card-text>
	<b-card-text>
	{{ product.usp }}
    </b-card-text>
	<b-card-text>
	Description: {{ product.description }}
    </b-card-text>
	<b-card-text>
	Variant: {{ product.variant }}
    </b-card-text>
	</b-card-body>
	<div class="mt-3">
	<b-button @click="editPost(index)" variant="warning">Edit</b-button>
	<b-button class="ml-3" @click="deletePost(index)" variant="danger">Delete</b-button>
	</div>
	</b-col>
	</b-row>
  </b-card>
  <PostModal />
  </div>
  </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { mapMutations } from 'vuex';
import { mapActions } from 'vuex';
import PostModal from './PostModal.vue';

  export default {
	name: 'PostCard',
	computed: mapState({
	products: state => state.products,
	cardModals: state => state.cardModals
	}),
    data() {
      return {
		editindex: null
      };
    },
	methods: {
	...mapMutations([
	'deletePost', 'addUpdateProduct', 'showCardModal'
	]),
	...mapActions([
      'deletePost', 'addUpdateProduct', 'showCardModal'
    ]),
	editPost(id) {
	this.$store.dispatch('showCardModal', id);
	this.$store.dispatch('addUpdateProduct', id);
	},
	deletePost(index) {
	this.$store.dispatch('deletePost', index);
	}
	},
	components: {
	PostModal
	}
  }
</script>