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
    posts: [
	{ 	name: 'Keya soap', 
		sku: 'SKU-1234', 
		stockable: 'yes', 
		category: 'lg', 
		brand: 'Unilever', 
		usp: 'USP', 
		description: 'best seller', 
		variant: 'White', 
		image: 'book.png'
	}]
  },
  mutations: {
    addPost (state, post) {
      state.posts.push(post);
    },
	updatePost (state, post) {
	let updateIndex = state.posts.findIndex(element => element.name === post.name);
	state.posts.splice(updateIndex, 1, post);
	},
	deletePost (state, deleteIndex) {
	state.posts.splice(deleteIndex, 1);
	}
  },
  actions: {
    addPost (context, post) {
      context.commit('addPost', post);
    },
	updatePost (context, post) {
	context.commit('updatePost', post);
	},
	deletePost (context, deleteIndex) {
	context.commit('deletePost', deleteIndex);
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
