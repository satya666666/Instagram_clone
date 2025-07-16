// ReelsDto class to match the backend DTO structure
export class ReelsDto {
    constructor(data) {
        this.reelsId = data.reelsId;
        this.title = data.title;
        this.video = data.video;
        this.user = data.user;
        this.likedByUsers = data.likedByUsers || [];
        this.comments = data.comments || [];
        this.createdAt = data.createdAt;
        
        // Computed properties for frontend use
        this.isLiked = data.isLiked || false;
        this.isSaved = data.isSaved || false;
    }
}

// ReelsCommentDto class to match the backend DTO structure
export class ReelsCommentDto {
    constructor(data) {
        this.id = data.id;
        this.content = data.content;
        this.user = data.user;
        this.reelsId = data.reelsId;
        this.createdAt = data.createdAt;
    }
}
