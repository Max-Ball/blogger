export class Blog {
    constructor(data) {
        this.id = data.id || ''
        this.title = data.title || ''
        this.body = data.body
        this.imgUrl = data.imgUrl
        this.creator = data.creator || {}
        this.creatorId = data.creatorId || {}
        this.createdAt = data.createdAt
    }
}