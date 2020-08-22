<template>
	<b-modal id="modal-sm" v-model="brandModal" :title="modalTitle" hide-header-close hide-footer>
    <BrandForm />
	</b-modal>
</template>

<script>
import { mapState } from 'vuex';
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
  }
}
</script>