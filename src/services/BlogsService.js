import { AppState } from "../AppState.js"
import { Blog } from "../models/Blog.js"
import { logger } from "../utils/Logger.js"
import { bcwSandbox } from "./AxiosService.js"


class BlogsService {
    async getBlogsByProfileId(creatorId) {
        const res = await bcwSandbox.get('/api/blogs/', {
            params: {
                creatorId
            }
        })
        logger.log('getting blogs from creator', res.data)
        AppState.profileBlogs = res.data.map(b => new Blog(b))
    }
    async getBlogs() {
        const res = await bcwSandbox.get('/api/blogs')
        logger.log(res.data)
        AppState.blogs = res.data.map(b => new Blog(b))
    }

    async createBlog(blogData) {
        const res = await bcwSandbox.post('/api/blogs/', blogData)
        AppState.blogs.unshift(new Blog(res.data))
    }

    async editBlog(blogData) {
        const res = await bcwSandbox.put(`/api/blogs/${blogData.id}`, blogData)
        const index = AppState.blogs.findIndex(b => b.id != blogData.id)
        AppState.blogs.splice(index, 1, new Blog(res.data))
    }

    async deleteBlog(blogId) {
        const res = await bcwSandbox.delete(`api/blogs/${blogId}`)
        AppState.blogs = res.data.filter(b => b.id != blogId)
    }
}


export const blogsService = new BlogsService()