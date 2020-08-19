<template>
  <div class="container mt-5">
  <div class="row">
  <div v-for="(post, index) in posts" v-bind:key="index">
    <b-card
    no-body
    tag="article"
    style="width: 70em;"
    class="mb-2 ml-4 overflow-hidden"
	:items="post"
  >
  <b-row no-gutters>
	<b-col md="6">
        <b-card-img src="https://picsum.photos/400/400/?image=20" alt="Image" class="rounded-0"></b-card-img>
	</b-col>
	<b-col md="6">
	<b-card-body title="Post">
    <b-card-text>
	Name: {{ post.name }}
    </b-card-text>
	<b-card-text>
	SKU: {{ post.sku }}
    </b-card-text>
	<b-card-text>
	Stockable: {{ post.stockable }}
    </b-card-text>
	<b-card-text >
	Category: {{ post.category }}
    </b-card-text>
	<b-card-text>
	Brand: {{ post.brand }}
    </b-card-text>
	<b-card-text>
	{{ post.usp }}
    </b-card-text>
	<b-card-text>
	Description: {{ post.description }}
    </b-card-text>
	<b-card-text>
	Variant: {{ post.variant }}
    </b-card-text>
	</b-card-body>
	<div class="mt-3">
	<b-button @click="editPost(index)" variant="warning" v-b-modal.modal-lg>Edit</b-button>
	<b-button class="ml-3" @click="deletePost(index)" variant="danger">Delete</b-button>
	</div>
	</b-col>
	</b-row>
  </b-card>
  <PostModal v-bind:post="post" />
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
	computed: mapState({
	posts: state => state.posts
	}),
    data() {
      return {
        post: {}
      };
    },
	methods: {
	...mapMutations([
	'deletePost'
	]),
	...mapActions([
      'deletePost'
    ]),
	editPost(id) {
	this.editIndex = id;
	let selectedPost = this.$store.state.posts.find((element, index) => {
	if (index === id) {
	return element;
	} else {
	return {};
	} 
	});
	this.post = {
	name: selectedPost.name,
	sku: selectedPost.sku,
	stockable: selectedPost.stockable,
	category: selectedPost.category,
	brand: selectedPost.brand,
	usp: selectedPost.usp,
	description: selectedPost.description,
	variant: selectedPost.variant,
	image: null
	};
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