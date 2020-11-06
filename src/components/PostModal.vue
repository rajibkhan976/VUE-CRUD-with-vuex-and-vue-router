<template>
  <div>
  <div v-for="cardmodal in cardModals" v-bind:key="cardmodal.key">
  <b-modal id="modal-lg" v-model="cardmodal.show" hide-header-close hide-footer :no-stacking="brandModal ? false : true">
	<template v-slot:modal-header>
		<div class="w-100">
		<h5 class="modal-title d-inline-block">{{ modalTitle }}</h5>
		<button type="button" class="close" @click="hideModal" aria-label="Close">
		<span aria-hidden="true">&times;</span>
		</button>
		</div>
	</template>
    <PostForm />
  </b-modal>
  </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { mapMutations } from 'vuex';
import { mapActions } from 'vuex';
import PostForm from './PostForm.vue';

export default {
  name: 'PostModal',
  computed: mapState({
	cardModals: state => state.cardModals,
	brandModal: state => state.brandModal
	}),
    data() {
      return {
        modalTitle: 'Add New Product'
      };
    },
  components: {
	PostForm
  },
  methods: {
  ...mapMutations([
	'hideCardModal'
	]),
	...mapActions([
	'hideCardModal'
    ]),
  hideModal() {
		if(this.$store.state.cardModals.length !== 0 &&
		this.$store.state.cardModals[0].key === -1
		) {
		this.$router.push('dashboard');
		}
		this.$store.dispatch('hideCardModal');
		this.updateIndex = null;
	},
  }
}
</script>