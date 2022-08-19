<template>
  <form @submit.prevent="handleSubmit()">
    <p>Create a blog</p>
    <input type="text" placeholder="title" v-model="editable.title" />
    <input type="text" placeholder="body" v-model="editable.body" />
    <input type="text" placeholder="cover image url" v-model="editable.imgUrl" />
    <button class="btn btn-primary">{{ editable.id ? 'Save' : 'Create' }}</button>
  </form>
</template>



<script>
import { ref, watchEffect } from 'vue';
import { AppState } from '../AppState';
import { blogsService } from '../services/BlogsService';
import { logger } from '../utils/Logger';
import Pop from '../utils/Pop';

export default {

  setup() {
    const editable = ref({})
    watchEffect(() => {
      if (!AppState.activeBlog) { return }
      editable.value = { ...AppState.activeBlog }
    })
    return {
      editable,
      async handleSubmit() {
        try {
          if (editable.value.id) {
            await blogsService.editBlog(editable.value)
          } else {
            await blogsService.createBlog(editable.value)
          }
        } catch (error) {
          logger.error('[handling blog submit]', error)
          Pop.error(error)
        }
      }

    };
  },
};
</script>



<style>
</style>