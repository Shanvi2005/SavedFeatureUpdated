// src/context/SavedPostsContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react'; // Import useEffect
import type { PostType } from '../types/Post';
import { categorizePost, loadModel } from '../utils/categorize'; // Import categorizePost and loadModel

type SavedPostsContextType = {
    savedPosts: PostType[];
    categorizedPosts: { [category: string]: PostType[] };
    handleSavePost: (post: PostType) => void;
    removePost: (postId: number) => void;
    isPostSaved: (postId: number) => boolean;
    isCategorizing: (postId: number) => boolean;
};

const SavedPostsContext = createContext<SavedPostsContextType | undefined>(undefined);

export const SavedPostsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [savedPosts, setSavedPosts] = useState<PostType[]>([]);
    const [categorizedPosts, setCategorizedPosts] = useState<{ [category: string]: PostType[] }>({
        'Career Opportunities': [],
        'Tech Resources': [],
        'Learning': [],
        'Inspiration': [],
        'Industry News': [],
        'General': []
    });

    const [loadingPostIds, setLoadingPostIds] = useState<number[]>([]);
    const [isModelLoading, setIsModelLoading] = useState(true); // New state for model loading

    // Load model once when the provider mounts
    useEffect(() => {
        const initModel = async () => {
            try {
                await loadModel();
                setIsModelLoading(false);
            } catch (error) {
                console.error("Failed to load AI model:", error);
                setIsModelLoading(false); // Even if failed, stop loading state
            }
        };
        initModel();
    }, []); // Empty dependency array means this runs once on mount

    // Save + categorize post with AI simulation
    const handleSavePost = async (post: PostType) => { // Made async
        if (savedPosts.some(p => p.id === post.id)) return;
        if (isModelLoading) {
            console.warn('AI model is still loading. Please wait.');
            // Optionally show a message to the user that model is loading
            return;
        }

        setLoadingPostIds(prev => [...prev, post.id]);

        try {
            // Use the new semantic categorization
            const category = await categorizePost(post);

            setSavedPosts(prev => [...prev, post]);
            setCategorizedPosts(prev => ({
                ...prev,
                [category]: [...prev[category], post]
            }));
        } catch (error) {
            console.error('Error during post categorization:', error);
            // Fallback if AI categorization fails
            setSavedPosts(prev => [...prev, post]);
            setCategorizedPosts(prev => ({
                ...prev,
                'General': [...prev['General'], post] // Add to general category on error
            }));
        } finally {
            setLoadingPostIds(prev => prev.filter(id => id !== post.id));
        }
    };

    // Remove post from everywhere
    const removePost = (postId: number) => {
        setSavedPosts(prev => prev.filter(p => p.id !== postId));
        setCategorizedPosts(prev => {
            const updated = { ...prev };
            Object.keys(updated).forEach(cat => {
                updated[cat] = updated[cat].filter(p => p.id !== postId);
            });
            return updated;
        });
    };

    const isPostSaved = (postId: number) => savedPosts.some(p => p.id === postId);
    const isCategorizing = (postId: number) => loadingPostIds.includes(postId);

    return (
        <SavedPostsContext.Provider
            value={{
                savedPosts,
                categorizedPosts,
                handleSavePost,
                removePost,
                isPostSaved,
                isCategorizing // You might want to combine this with isModelLoading for a complete loading state
            }}
        >
            {children}
        </SavedPostsContext.Provider>
    );
};

export const useSavedPosts = () => {
    const context = useContext(SavedPostsContext);
    if (!context) {
        throw new Error('useSavedPosts must be used within a SavedPostsProvider');
    }
    return context;
};