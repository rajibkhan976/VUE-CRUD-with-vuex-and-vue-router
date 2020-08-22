<template>
  <div>
  <div v-for="cardmodal in cardModals" v-bind:key="cardmodal.key">
  <b-modal id="modal-lg" v-model="cardmodal.show" hide-header-close hide-footer :no-stacking="brandModal ? false : true" :title="modalTitle">
    <PostForm />
  </b-modal>
  </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
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
  }
}
</script>