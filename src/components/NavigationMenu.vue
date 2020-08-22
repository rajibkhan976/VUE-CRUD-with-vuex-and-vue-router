<template>
	<ul class="nav nav-tabs">
		<li class="nav-item">
			<router-link to="/posts" class="nav-link">Posts</router-link>
		</li>
		<li class="nav-item">
			<router-link to="/add" class="nav-link" @click.native="openModal">Add post</router-link>
		</li>
	</ul>
</template>

<script>
import { mapState } from 'vuex';
import { mapMutations } from 'vuex';
import { mapActions } from 'vuex';

export default {
  name: 'NavigationMenu',
  computed: mapState({
	cardModals: state => state.cardModals
	}),
    data() {
      return {
        addProductModal: null
      };
    },
  methods: {
	...mapMutations([
	'showCardModal'
	]),
	...mapActions([
    'showCardModal'
    ]),
	openModal(){
	this.addProductModal = { key: 0, show: true };
	this.$store.dispatch('showCardModal', 0);
	}
  }
}
</script>