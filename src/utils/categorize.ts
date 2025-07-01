// src/utils/categorize.ts
import * as tf from '@tensorflow/tfjs';
import * as use from '@tensorflow-models/universal-sentence-encoder';
import type { PostType } from '../types/Post';

// Define your categories and optionally, more descriptive text for better embeddings
// Refined descriptions for better distinction
const CATEGORIES: { [key: string]: string } = {
    'Career Opportunities': 'Job listings, employment openings, hiring announcements, internship programs, recruitment drives, how to apply for roles, interview processes, and career advancement paths focusing on available positions and job search strategies.',
    'Tech Resources': 'Technical tutorials, coding guides, software development practices, programming languages (Python, JavaScript, Java, Go, Rust), data science, artificial intelligence, machine learning, deep learning, web development frameworks, cybersecurity, cloud computing, and specific technical tools or platforms. Content for engineers, developers, and IT professionals focused on technical skills and knowledge.',
    'Learning': 'Educational content, academic subjects, skill development (non-tech specific, e.g., communication, leadership), online courses, study techniques, personal development, general knowledge expansion, and research methodologies. Broader learning and self-improvement.',
    'Inspiration': 'Motivational stories, leadership insights, personal success journeys, inspiring quotes, mental resilience, mindset development, and content designed to encourage perseverance, growth and positivity.',
    'Industry News': 'Current events, economic trends, market analysis, business updates, company news, mergers and acquisitions, financial reports, stock market insights, and general news across various sectors like finance, healthcare, retail, marketing, etc. Focus on market and business developments.',
    // FURTHER REFINED: General description
    'General': 'Miscellaneous topics, personal life updates, daily experiences, broad social commentary, community discussions, lighthearted content, or anything that does not fit into professional, technical, career, or specific industry news categories. This is the catch-all for diverse, non-specialized, and general interest posts.'
};

type CategoryName = keyof typeof CATEGORIES; // Type for category names

let model: use.UniversalSentenceEncoder | null = null;
let categoryEmbeddings: { [key: string]: tf.Tensor } = {};

/**
 * Loads the Universal Sentence Encoder model.
 * This should be called once, ideally when the app starts.
 */
export async function loadModel() {
    if (!model) {
        console.log('Loading Universal Sentence Encoder model...');
        model = await use.load();
        console.log('Model loaded.');

        // Pre-compute embeddings for category names/descriptions
        const categoryTexts = Object.values(CATEGORIES);
        const categoryNames = Object.keys(CATEGORIES); // Get category names in order

        const embeddings = await model.embed(categoryTexts);

        // Store embeddings by category name
        categoryNames.forEach((categoryName, index) => {
            // Slicing here to get individual tensor for each category, and keep it in memory
            categoryEmbeddings[categoryName] = embeddings.slice([index, 0], [1, embeddings.shape[1]]);
            // console.log(`Category: ${categoryName}, Embedding shape: ${categoryEmbeddings[categoryName].shape}`); // Debugging
        });
        embeddings.dispose(); // Dispose of the main embeddings tensor after slicing
        console.log('Category embeddings pre-computed and stored.');
    }
}

/**
 * Calculates cosine similarity between two tensors.
 * @param a - First embedding tensor (query).
 * @param b - Second embedding tensor (document).
 * @returns Cosine similarity score.
 */
function cosineSimilarity(a: tf.Tensor, b: tf.Tensor): number {
    // Ensure tensors are 1D for dot product and norm calculations
    const aFlat = a.flatten();
    const bFlat = b.flatten();

    return tf.tidy(() => {
        const dotProduct = aFlat.dot(bFlat);
        const normA = aFlat.norm();
        const normB = bFlat.norm();
        const denominator = normA.mul(normB);

        // Handle case where denominator might be zero (e.g., zero vector) to avoid NaN
        if (denominator.arraySync() === 0) {
            return 0;
        }

        return dotProduct.div(denominator).arraySync() as number;
    });
}

/**
 * Categorizes a given post based on semantic similarity to predefined categories.
 * @param post - The post object to categorize.
 * @returns The determined category name.
 */
export async function categorizePost(post: PostType): Promise<CategoryName> {
    if (!model) {
        console.warn('AI model not loaded. Attempting to load model...');
        await loadModel(); // Ensure model is loaded if not already
        if (!model) {
            console.error('Failed to load model. Cannot categorize post.');
            return 'General'; // Fallback category
        }
    }

    const postText = `${post.author.title || ''} ${post.content || ''}`.trim(); // Combine title and content. Use trim()

    if (!postText) {
        console.warn(`Post with ID ${post.id} has no content or title for categorization. Assigning to General.`);
        return 'General';
    }

    let postEmbedding: tf.Tensor | null = null;

    try {
        // Embed the post text
        const embeddingsResult = await model.embed([postText]);
        postEmbedding = embeddingsResult.slice([0, 0], [1, embeddingsResult.shape[1]]); // Ensure correct slicing and full dimension
        embeddingsResult.dispose(); // Dispose immediately after slicing

        console.log(`Categorizing post ID: ${post.id}`);
        console.log('Post Content Snippet:', postText.substring(0, 100) + (postText.length > 100 ? '...' : ''));

        let maxSimilarity = -1;
        let bestCategory: CategoryName = 'General';
        let similarityScores: { [key: string]: number } = {};

        // Compare post embedding with each category embedding
        for (const categoryName in CATEGORIES) {
            if (CATEGORIES.hasOwnProperty(categoryName)) {
                const categoryEmbed = categoryEmbeddings[categoryName];
                // Ensure both tensors are of compatible shape (e.g., [1, D])
                const similarity = cosineSimilarity(postEmbedding, categoryEmbed);
                similarityScores[categoryName] = similarity;

                if (similarity > maxSimilarity) {
                    maxSimilarity = similarity;
                    bestCategory = categoryName as CategoryName;
                }
            }
        }
        console.log('Similarity Scores:', similarityScores);
        console.log(`Chosen Category: ${bestCategory} with similarity: ${maxSimilarity}`);
        return bestCategory;
    } catch (error) {
        console.error(`Error categorizing post ID ${post.id}:`, error);
        return 'General'; // Fallback category on error
    } finally {
        if (postEmbedding) {
            postEmbedding.dispose(); // Clean up tensor memory
        }
    }
}