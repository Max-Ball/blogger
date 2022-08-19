<template>
    <div class="blog-card card">
        <div class="card-body">
            <div class="card-title">
                <h6>
                    <div v-if="blog.creator.id == account.id">
                        <i class="mdi mdi-pencil selectable" data-bs-toggle="modal" data-bs-target="#blog-form" @click="
                        editBlog()"></i>
                        <i class="mdi mdi-delete selectable px-3" @click="deleteBlog()"></i>
                        <BlogForm v-if="editing" />
                    </div>
                    {{ blog.title }} || {{ new Date(blog.createdAt).toLocaleDateString('en-US') }}
                </h6>
                <div class="blog-creator" v-if="blog.creator">
                    <router-link :to="{ name: 'Profile', params: { profileId: blog.creator.id } }">
                        <img class="selectable" :src="blog.creator.picture" alt="blog creator pic"
                            :title="blog.creator.name">
                    </router-link>
                </div>

            </div>
        </div>
        <div>
            <img class="img-fluid" :src="blog.imgUrl" alt="blog image">
        </div>
    </div>
</template>


<script>
import { computed } from '@vue/reactivity';
import { AppState } from '../AppState';
import { Blog } from '../models/Blog.js';
import { blogsService } from '../services/BlogsService';
import { logger } from '../utils/Logger';
import Pop from '../utils/Pop';

export default {
    props: {
        blog: { type: Blog, required: true }
    },
    setup(props) {
        return {
            account: computed(() => AppState.account),
            // async deleteBlog(blog) {
            //     try {
            //         const yes = await Pop.confirm('Delete the car?')
            //         if (!yes) { return }
            //         await blogsService.deleteBlog(blog.id)
            //     } catch (error) {
            //         logger.error('[deleting blog]', error)
            //         Pop.error(error)
            //     }
            // }

        }
    }
}
</script>


<style lang="scss" scoped>
.blog-creator {
    position: absolute;
    top: 5px;
    right: 1rem;

    img {
        transition: all .15s linear;
        border-radius: 50px;
        height: 45px;
        width: 45px;
        object-fit: cover;
        object-position: center;

        &:hover {
            transform: translateY(-3px);
        }
    }
}
</style>