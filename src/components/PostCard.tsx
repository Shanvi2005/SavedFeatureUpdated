import React, { useState } from 'react';
import { Bookmark, MessageSquare, MoreHorizontal, Share, ThumbsUp, X } from 'lucide-react';
import Avatar from './Avatar'; // Correct if Avatar.tsx is in the same 'components' folder
import { useSavedPosts } from '../context/SavedPostsContext'; // Corrected path (from components to context)
import type { PostType } from '../types/Post';

type PostCardProps = {
    post: PostType;
    isSavedView?: boolean; // To differentiate between home feed and saved feed behavior
};

const PostCard: React.FC<PostCardProps> = ({ post, isSavedView = false }) => {
    const { handleSavePost, removePost, isPostSaved, isCategorizing } = useSavedPosts();
    const [liked, setLiked] = useState(false); // Local state for liked status
    const [isExpanded, setIsExpanded] = useState(false); // Local state for text expansion

    // Initial check for liked status if it were persisted or passed down
    // For now, it defaults to false as per previous implementation logic.

    const toggleLike = () => {
        setLiked(prev => !prev);
    };

    const toggleExpandPost = () => {
        setIsExpanded(prev => !prev);
    };

    const truncateText = (text: string, maxLength = 200) => {
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength) + '...';
    };

    const postIsSaved = isPostSaved(post.id);
    const postIsCategorizing = isCategorizing(post.id);

    return (
        <div key={post.id} className="bg-white rounded-lg shadow-sm">
            {/* Post Header */}
            <div className="p-4 pb-0">
                {post.hasPromotedContent && post.promotedPage && (
                    <div className="mb-3 p-3 bg-gray-50 rounded-lg border">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-xs text-gray-500">Follow</span>
                            <button className="text-blue-600 text-sm font-medium hover:bg-blue-50 px-3 py-1 rounded">
                                + Follow
                            </button>
                        </div>
                        <div className="flex items-start space-x-3">
                            <div className="w-12 h-12 bg-blue-600 rounded flex items-center justify-center">
                                <span className="text-white font-bold text-sm">SDS</span>
                            </div>
                            <div className="flex-1">
                                <h3 className="font-semibold text-gray-900">{post.promotedPage.name}</h3>
                                <p className="text-sm text-gray-600">{post.promotedPage.followers}</p>
                                <p className="text-xs text-gray-500 mt-1">{post.promotedPage.timePosted} • 🌍</p>
                            </div>
                        </div>
                    </div>
                )}
                <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                        <Avatar name={post.author.name} src={post.author.avatar} size="w-12 h-12" />
                        <div className="flex-1">
                            <h3 className="font-semibold text-gray-900">{post.author.name}</h3>
                            <p className="text-sm text-gray-600">{post.author.title}</p>
                            <p className="text-xs text-gray-500 mt-1">{post.timeAgo} • 🌍</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-2">
                        {isSavedView ? (
                            <div className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                                Saved
                            </div>
                        ) : (
                            <button className="text-blue-600 text-sm font-medium hover:bg-blue-50 px-3 py-1 rounded">
                                + Follow
                            </button>
                        )}
                        <button className="p-2 hover:bg-gray-100 rounded-full">
                            <MoreHorizontal className="w-4 h-4 text-gray-600" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Post Content */}
            <div className="px-4 py-3">
                <div className="text-gray-800 whitespace-pre-line text-sm leading-relaxed">
                    {isExpanded || post.content.length <= 200
                        ? post.content
                        : truncateText(post.content, 200)
                    }
                    {post.content.length > 200 && (
                        <button
                            onClick={toggleExpandPost}
                            className="text-blue-600 hover:text-blue-800 font-medium ml-2"
                        >
                            {isExpanded ? 'Show less' : 'Read more'}
                        </button>
                    )}
                </div>
            </div>

            {/* Post Image */}
            {post.image && (
                <div className="px-4 pb-3">
                    <img src={post.image} alt="Post content" className="w-full rounded-lg" />
                </div>
            )}

            {/* Post Stats */}
            <div className="px-4 py-2 border-t border-gray-100">
                <div className="flex items-center justify-between text-sm text-gray-600">
                    <div className="flex items-center space-x-4">
                        {post.likes > 0 && (
                            <span className="flex items-center space-x-1">
                                <div className="flex -space-x-1">
                                    {post.reactions ? (
                                        post.reactions.map((reaction, idx) => (
                                            <div key={idx} className="w-4 h-4 bg-blue-600 rounded-full flex items-center justify-center text-xs border border-white">
                                                {reaction === '👍' ? (
                                                    <ThumbsUp className="w-2 h-2 text-white fill-current" />
                                                ) : (
                                                    <span className="text-[8px]">{reaction}</span>
                                                )}
                                            </div>
                                        ))
                                    ) : (
                                        <div className="w-4 h-4 bg-blue-600 rounded-full flex items-center justify-center">
                                            <ThumbsUp className="w-2 h-2 text-white fill-current" />
                                        </div>
                                    )}
                                </div>
                                <span>{post.likes}</span>
                            </span>
                        )}
                    </div>
                    <div className="flex items-center space-x-4">
                        {post.comments > 0 && <span>{post.comments} comments</span>}
                        {post.reposts > 0 && <span>{post.reposts} reposts</span>}
                    </div>
                </div>
            </div>

            {/* Post Actions */}
            <div className="px-4 py-3 border-t border-gray-100">
                <div className="flex items-center justify-between">
                    <button
                        onClick={toggleLike}
                        className={`flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-100 ${liked ? 'text-blue-600' : 'text-gray-600'
                            }`}
                    >
                        <ThumbsUp className={`w-5 h-5 ${liked ? 'fill-current' : ''}`} />
                        <span className="text-sm font-medium">Like</span>
                    </button>
                    <button className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                        <MessageSquare className="w-5 h-5" />
                        <span className="text-sm font-medium">Comment</span>
                    </button>
                    <button className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                        <Share className="w-5 h-5" />
                        <span className="text-sm font-medium">Repost</span>
                    </button>
                    {isSavedView ? (
                        <button
                            onClick={() => removePost(post.id)}
                            className="flex items-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg"
                        >
                            <X className="w-5 h-5" />
                            <span className="text-sm font-medium">Remove</span>
                        </button>
                    ) : (
                        <button
                            onClick={() => handleSavePost(post)}
                            className={`relative flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-100 ${postIsSaved ? 'text-blue-600' : 'text-gray-600'
                                }`}
                            disabled={postIsCategorizing}
                        >
                            {postIsCategorizing ? (
                                <div className="flex items-center space-x-2">
                                    <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                                    <span className="text-sm font-medium">AI Categorizing...</span>
                                </div>
                            ) : (
                                <>
                                    <Bookmark className={`w-5 h-5 ${postIsSaved ? 'fill-current' : ''}`} />
                                    <span className="text-sm font-medium">Save</span>
                                </>
                            )}
                            {postIsCategorizing && (
                                <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                                    AI
                                </div>
                            )}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PostCard;