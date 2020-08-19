<template>
  <div>
  <b-modal id="modal-lg" title="Post">
    <PostForm :editPost="editPost" :updateIndex="updateIndex" />
  </b-modal>
</div>
</template>

<script>
import PostForm from './PostForm.vue';

export default {
  name: 'PostModal',
  props: ['post', 'editIndex'],
    data() {
      return {
        editPost: this.post,
		updateIndex: this.editIndex
      };
    },
  components: {
	PostForm
  }
}
</script>