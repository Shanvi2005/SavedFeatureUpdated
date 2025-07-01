import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Bookmark, BookOpenText, GraduationCap, Briefcase,
    Heart, FolderSearch2, ChevronRight, X
} from 'lucide-react';
import { useSavedPosts } from '../context/SavedPostsContext'; // Corrected path
import Avatar from '../components/Avatar'; // Corrected path
import Header from '../components/Header'; // Corrected path
import PostCard from '../components/PostCard'; // Corrected path

const categoryIcons: Record<string, JSX.Element> = {
    'Career Opportunities': <Briefcase />,
    'Tech Resources': <BookOpenText />,
    'Learning': <GraduationCap />,
    'Inspiration': <Heart />,
    'Industry News': <FolderSearch2 />,
    'General': <Bookmark />
};

const bgColors: Record<string, string> = {
    'Career Opportunities': 'bg-blue-500', // Changed to match HomePage gradients
    'Tech Resources': 'bg-green-500',
    'Learning': 'bg-purple-500',
    'Inspiration': 'bg-orange-500',
    'Industry News': 'bg-red-500',
    'General': 'bg-gray-600' // Changed to match HomePage gradients
};

const Saved = () => {
    const navigate = useNavigate();
    const {
        categorizedPosts,
        savedPosts // Added savedPosts to check for empty state
    } = useSavedPosts();

    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    const handleCategoryClick = (category: string) => {
        setSelectedCategory(category);
    };

    const handleBackToCategories = () => {
        setSelectedCategory(null);
    };

    const currentCategoryPosts = selectedCategory ? categorizedPosts[selectedCategory] || [] : [];

    return (
        <div className="min-h-screen bg-gray-50">
            <Header /> {/* Reusable Header component */}

            <div className="max-w-6xl mx-auto px-4 py-6 pt-20">
                {selectedCategory ? (
                    // Category Posts Page
                    <div className="max-w-4xl mx-auto"> {/* Adjusted max-width for consistency */}
                        {/* Back button and header */}
                        <div className="mb-6">
                            <button
                                onClick={handleBackToCategories}
                                className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 mb-4"
                            >
                                <ChevronRight className="w-4 h-4 transform rotate-180" />
                                <span>Back to Categories</span>
                            </button>

                            <div className="flex items-center space-x-4">
                                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${bgColors[selectedCategory]}`}>
                                    {selectedCategory === 'Career Insights' && <Briefcase className="w-6 h-6 text-white" />}
                                    {selectedCategory === 'Tech Resources' && <div className="text-white font-mono text-lg">&lt;/&gt;</div>}
                                    {selectedCategory === 'Learning' && <div className="w-6 h-6 border-2 border-white rounded-full flex items-center justify-center"><div className="w-2 h-2 bg-white rounded-full"></div></div>}
                                    {selectedCategory === 'Inspiration' && <div className="w-6 h-6 border-2 border-white rounded-full flex items-center justify-center"><div className="w-3 h-3 border-t-2 border-l-2 border-white transform rotate-45"></div></div>}
                                    {selectedCategory === 'Industry News' && <div className="w-6 h-6 flex flex-col space-y-1"><div className="w-full h-1 bg-white rounded"></div><div className="w-4 h-1 bg-white rounded"></div><div className="w-full h-1 bg-white rounded"></div></div>}
                                    {selectedCategory === 'General' && <Bookmark className="w-6 h-6 text-white" />}
                                </div>
                                <div>
                                    <h1 className="text-2xl font-bold text-gray-900">{selectedCategory}</h1>
                                    <p className="text-gray-600">{currentCategoryPosts.length} saved post{currentCategoryPosts.length !== 1 ? 's' : ''}</p>
                                </div>
                            </div>
                        </div>

                        {/* Posts List */}
                        {currentCategoryPosts.length > 0 ? (
                            <div className="space-y-6">
                                {currentCategoryPosts.map((post) => (
                                    <PostCard key={post.id} post={post} isSavedView={true} />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-16">
                                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <Bookmark className="w-12 h-12 text-gray-400" />
                                </div>
                                <h3 className="text-xl font-medium text-gray-900 mb-2">No posts in this category yet</h3>
                                <p className="text-gray-500">Our AI will categorize your saved posts here automatically.</p>
                            </div>
                        )}
                    </div>
                ) : (
                    // Main Saved Posts Categories View
                    <>
                        <div className="mb-8">
                            <div className="flex items-center space-x-3 mb-4">
                                <Bookmark className="w-8 h-8 text-blue-600" />
                                <div>
                                    <h1 className="text-2xl font-bold text-gray-900">Smart Saved Posts</h1>
                                    <p className="text-gray-600">AI-organized content for better discovery and learning</p>
                                </div>
                            </div>
                        </div>

                        {/* Category Tabs */}
                        <div className="flex items-center space-x-6 mb-8 border-b">
                            <button className="pb-3 border-b-2 border-gray-300 text-gray-600 font-medium">Categories</button>
                            <button className="pb-3 text-gray-400">All Posts</button>
                            <button className="pb-3 text-gray-400">Digests</button>
                        </div>

                        {/* Categories Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                            {Object.keys(categorizedPosts).map((category) => (
                                <div
                                    key={category}
                                    onClick={() => handleCategoryClick(category)}
                                    className={`bg-gradient-to-br ${bgColors[category]} to-${bgColors[category].replace('bg-', '')}-700 rounded-lg p-4 text-white cursor-pointer hover:shadow-lg transition-all transform hover:scale-105`}
                                >
                                    <div className="text-center">
                                        <div className="w-10 h-10 bg-white bg-opacity-20 rounded-lg flex items-center justify-center mx-auto mb-2">
                                            {categoryIcons[category]}
                                        </div>
                                        <h3 className="text-sm font-semibold mb-1">{category}</h3>
                                        <p className="text-white text-opacity-70 text-xs">{categorizedPosts[category].length} posts</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Show recently categorized posts when not empty */}
                        {savedPosts.length > 0 && (
                            <div className="mt-8">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recently Categorized Posts</h3>
                                {Object.entries(categorizedPosts).map(([category, posts]) => (
                                    posts.length > 0 && (
                                        <div key={category} className="mb-6">
                                            <div className="flex items-center space-x-2 mb-3">
                                                <div className={`w-3 h-3 rounded-full ${bgColors[category]}`}></div>
                                                <h4 className="font-medium text-gray-900">{category}</h4>
                                                <span className="text-sm text-gray-500">({posts.length})</span>
                                            </div>
                                            <div className="grid gap-3">
                                                {posts.slice(0, 2).map((post) => (
                                                    <div key={post.id} className="bg-white border rounded-lg p-3 hover:shadow-md transition-shadow">
                                                        <div className="flex items-start space-x-3">
                                                            <Avatar name={post.author.name} src={post.author.avatar} size="w-8 h-8" />
                                                            <div className="flex-1 min-w-0">
                                                                <div className="flex items-center space-x-2">
                                                                    <h5 className="font-medium text-sm text-gray-900 truncate">{post.author.name}</h5>
                                                                    <span className="text-xs text-gray-500">{post.timeAgo}</span>
                                                                </div>
                                                                <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                                                                    {post.content.substring(0, 120)}...
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )
                                ))}
                            </div>
                        )}

                        {/* Empty State Message */}
                        {savedPosts.length === 0 && (
                            <div className="text-center py-16 mt-12">
                                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <Bookmark className="w-12 h-12 text-gray-400" />
                                </div>
                                <h3 className="text-xl font-medium text-gray-900 mb-2">Start saving posts to see them organized here</h3>
                                <p className="text-gray-500 max-w-md mx-auto">Our AI will automatically categorize your saved posts to help you find and learn from them more effectively.</p>
                                <div className="mt-6 flex items-center justify-center space-x-2 text-sm text-gray-600">
                                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                                        <span className="text-green-600 font-bold text-xs">AI</span>
                                    </div>
                                    <span>Powered by intelligent content analysis</span>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default Saved;