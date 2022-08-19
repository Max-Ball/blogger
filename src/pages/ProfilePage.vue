<template>
    <div class="profile-page">
        <div class="cover-img">
            <div>
                <img :src="profile.picture" alt="" height="120">
                <h3>{{ profile.name }}</h3>
                <h6> {{ profile.body }} </h6>
                <p>{{ profile.bio }}</p>
            </div>
        </div>
        <div class=container>
            <div class="row justify-content-center">
                <div class="col-md-10 my-3" v-for="b in blogs" :key="b.id">
                    <BlogCard :blog="b" />
                </div>
            </div>

        </div>
    </div>
</template>


<script>
import { onMounted } from 'vue';
import { AppState } from '../AppState.js';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import { profilesService } from '../services/ProfilesService.js'
import { useRoute } from 'vue-router';
import { computed } from '@vue/reactivity';
import BlogCard from '../components/BlogCard.vue';
import { blogsService } from '../services/BlogsService';

export default {
    setup() {
        const route = useRoute();

        async function getBlogsByProfileId() {
            try {
                await blogsService.getBlogsByProfileId(route.params.profileId)
            } catch (error) {
                logger.error('[getting blogs by profile]', error)
                Pop.error(error)
            }
        }
        async function getProfileById() {
            try {
                await profilesService.getProfileById(route.params.profileId);
            }
            catch (error) {
                logger.error("[Getting Profile by Id]", error);
                Pop.error(error);
            }
        }
        onMounted(() => {
            getProfileById();
            getBlogsByProfileId()
        });
        return {
            profile: computed(() => AppState.activeProfile),
            cover: computed(() => `url(${AppState.activeProfile?.coverImg})`),
            blogs: computed(() => AppState.profileBlogs)
        };
    },
    components: { BlogCard }
}
</script>


<style lang="scss" scoped>
.cover-img {
    height: 300px;
    background-position: center;
    background-attachment: fixed;
    background-size: cover;
    display: grid;
    place-content: center;
    color: aliceblue;
    background-image: v-bind(cover);
}
</style>