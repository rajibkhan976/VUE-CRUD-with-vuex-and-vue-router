<template>
	<b-modal id="modal-center" centered  v-model="brandModal" hide-header-close hide-footer>
	<template v-slot:modal-header>
		<div class="w-100">
		<h5 class="modal-title d-inline-block">{{ modalTitle }}</h5>
		<button type="button" class="close" @click="closeModal" aria-label="Close">
		<span aria-hidden="true">&times;</span>
		</button>
		</div>
	</template>
    <BrandForm />
	</b-modal>
</template>

<script>
import { mapState } from 'vuex';
import { mapMutations } from 'vuex';
import { mapActions } from 'vuex';
import BrandForm from './BrandForm.vue';

export default {
  name: 'BrandModal',
  computed: mapState({
	brandModal: state => state.brandModal
	}),
    data() {
      return {
        modalTitle: 'Add New Product Brand'
      };
    },
  components: {
	BrandForm
  },
  methods: {
  ...mapMutations([
	'hideBrandModal'
	]),
	...mapActions([
	'hideBrandModal'
    ]),
	closeModal() {
	this.$store.dispatch('hideBrandModal');
	}
  }
}
</script>