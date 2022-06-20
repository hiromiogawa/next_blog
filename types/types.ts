export interface categoresType {
    contents: [{
        id:  string
        name: string
    }][]
}

export interface categoryType {
    id: string
    name: string
}

export interface blogsTypes {
    contents: [{
        id: string
        createdAt: string
        updatedAt: string
        publishedAt: string
        revisedAt: string
        title: string
        eyecatch: {
        url: string
        }
        category: {
            id: string
            name: string
        }
    }]
}


export interface blogTypes {
    blog: {
        id: string
        createdAt: string
        updatedAt: string
        publishedAt: string
        revisedAt: string
        title: string
        content: string
        eyecatch: {
            url: string
        }
    }
}


