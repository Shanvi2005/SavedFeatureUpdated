export type PostType = {
    id: number;
    content: string;
    author: {
        name: string;
        title: string;
        avatar?: string;
    };
    timeAgo: string;
    image?: string;
    likes: number;
    comments: number;
    reposts: number;
    reactions?: string[];
};
