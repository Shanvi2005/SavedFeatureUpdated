import React from 'react'; // useState is no longer directly used in Home.tsx, but good to keep if you add local state later
import { Video, Calendar, Plus, TrendingUp, Bookmark, Users, MessageCircle, Briefcase, ChevronRight, X, MoreHorizontal } from 'lucide-react'; // Added MoreHorizontal
import { useNavigate } from 'react-router-dom';
import Avatar from '../components/Avatar';
import Header from '../components/Header';
import PostCard from '../components/PostCard';
import type { PostType } from '../types/Post';

const posts: PostType[] = [
  {
    id: 1,
    author: {
      name: "Rishika Gupta",
      title: "Building scalable java backend systems || Senior Software Engineer @L...",
      avatar: "/api/placeholder/40/40",
      company: "Company"
    },
    timeAgo: "21h",
    content: `I had 3 months of free Spotify Premium and I didn't know about it???

I just found out that if you're a LinkedIn Premium user, you get free subscriptions to several apps including Spotify and Headspace.

Refer https://lnkd.in/dZpd55TH ✅ to know how to redeem.`,
    image: "https://images.unsplash.com/photo-1611339555312-e607c8352fd7?w=500&h=300&fit=crop",
    likes: 28,
    comments: 26,
    reposts: 1,
    reactions: ["👍", "❤️", "😲"]
  },
  {
    id: 2,
    author: {
      name: "Navdeep Singh",
      title: "Founder of NeetCode",
      subtitle: "Following",
      avatar: "/api/placeholder/40/40"
    },
    timeAgo: "3w",
    content: `Follow System Design School for some really high quality posts!

System Design Interview - 8 Ways to Scale Any System

(Steal these to become the top candidate)`,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=300&fit=crop",
    likes: 194,
    comments: 4,
    reposts: 8,
    reactions: ["👍", "❤️", "😍"],
    hasPromotedContent: true,
    promotedPage: {
      name: "System Design School",
      followers: "3,568 followers",
      timePosted: "3w"
    }
  },
  {
    id: 3,
    author: {
      name: "SMU Office of Research (ORe)",
      title: "20,574 followers",
      subtitle: "Following",
      avatar: "/api/placeholder/40/40"
    },
    timeAgo: "1d",
    content: `SMU Assistant Professor Ma Yunshan's latest research sets out to finetune the way AI predicts stock prices.

#SMUResearch #artificialintelligence #largelanguagemodels #stockpredictions

Follow us for updates on SMU's research!`,
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=500&h=300&fit=crop",
    likes: 179,
    comments: 6,
    reposts: 2,
    reactions: ["👍", "❤️", "😍"]
  },
  {
    id: 4,
    author: {
      name: "Upasana Singh",
      title: "Following",
      subtitle: "Exciting opportunity alert! We're hiring iOS interns (Proficient & Backend) for a 6-month on-site...",
      avatar: "/api/placeholder/40/40",
      company: "Company"
    },
    timeAgo: "1d",
    content: `Exciting opportunity alert! We're hiring iOS interns (Proficient & Backend) for a 6-month on-site...

Open Roles:
Frontend (React/NextJS)
Backend (Django)

What You'll Do:
Build user features
Write clean, scalable code
Work with cross-functional team

Requirements:
Interested React Js, Next Js, HTML/CSS
Proficiency in Python/Django. REST API development
Strong Git & learning mindset

Location: Noida (On site only)
Duration: 6 months

Apply now or DM to connect directly.

Follow Upasana Singh

#hiring #internship #jobs`,
    image: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=500&h=300&fit=crop",
    likes: 2,
    comments: 0,
    reposts: 0
  },
  {
    id: 5,
    author: {
      name: "Joy Vishwakarma",
      title: "Tech Enthusiast | Software Engineer | 🚀 Google, Microsoft...",
      subtitle: "5d • 🌍",
      avatar: "/api/placeholder/40/40"
    },
    timeAgo: "5d",
    content: `CTC: 5CR+ package for Tech Interview Prep

With THAT, you get:

✅ DSA: 100% LLD, Core CS Subjects
✅ AptiHub - > SQL (coming soon)
✅ Premium Problems with Company Tags
✅ Daily Hustle: Theory Mode, and more
✅ All in one affordable subscription

Now, if that's even another course, you would require:

- Uploaded videos to Clarity or Play
- Replay building a real platform experience
- Have our own mobile app
- Left out guided journeys and feature depth
- Never thought about gamification learning beyond

But that's not what we'll have for...

Our > # not content delivery. It's a full-fledged learn learning platform.

We are currently running a one day sale today on occasion of PGDAI day - X

👉 Check the Features section on the landing page to see what we'll post.

🔗 https://linkd.in/jxlxlz`,
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=300&fit=crop",
    likes: 26,
    comments: 26,
    reposts: 0
  },
  {
    id: 6,
    author: {
      name: "Srishrik Dutta",
      title: "Following",
      subtitle: "Software Engineer | Ex- Microsoft, Wells Fargo | ACM ICPC'20 Regionalist | 6⭐...",
      avatar: "/api/placeholder/40/40"
    },
    timeAgo: "8h",
    content: `Dissecting Problem Solving - Episode 2...

🟦 Difficulty Rating: 900

🟦 Problem Link: https://linkd.in/g_NadU2Q ✅

🟦 Time taken to solve: 7 mins

🟦 My thoughts:

My 1st thought seeing the problem that maybe we should try to maximize the max element, and try something by sorting.

Turns out to be wrong so I had missed the strong ordering of the indexes (i < j always). This gave me the direction that order matters and led to the observation that last element will always be in the finals. So it's best to try maximize that element.

How can I maximize an element? Reduce it by a small positive number or a large negative number. Since small positive numbers can be subtracted, that we know that thought was to try minimize the 2nd last element to use it in the finals.

Here, since all the elements are positive, its best to use this 2nd last element repeatedly and iterate to keep reducing it in each operation. This best element reduction amount turns out to be the prefix sum of the prefix of length n - 2.

Basically we find the sum till n - 2 elements, subtract that from a[n-2] then submit a[n-1] against it as the 2nd last element. Then we get that result we get. This solves the problem.

🟦 Submission Link: https://linkd.in/gVGoGx4 ✅

Next I'll take an 1000 rated problem and try to solve it in the next episode. Do share your suggestions in the comments for the series.

Stay tuned for more such content! 🚀`,
    likes: 15,
    comments: 3,
    reposts: 2
  }
];

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-6xl mx-auto px-4 py-6 pt-20">
        <div className="grid grid-cols-12 gap-6">
          {/* Left Sidebar */}
          <div className="col-span-3">
            {/* Profile Card */}
            <div className="bg-white rounded-lg shadow-sm mb-4 overflow-hidden">
              <div className="h-16 bg-gradient-to-r from-blue-500 to-purple-600"></div>
              <div className="px-4 pb-4">
                <div className="flex flex-col items-center -mt-8">
                  <Avatar name="Shantanu" src="/api/placeholder/64/64" size="w-16 h-16 border-4 border-white" />
                  <h3 className="font-semibold text-gray-900 mt-2 text-center">Shantanu</h3>
                  <p className="text-sm text-gray-600 text-center">LinkedIn Creator || CSE 2025 Future | former Engineer</p>
                </div>
                <div className="mt-4 pt-4 border-t">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">Profile viewers</span>
                    <span className="text-blue-600 font-medium">235</span>
                  </div>
                  <div className="flex justify-between items-center text-sm mt-1">
                    <span className="text-gray-600">Post impressions</span>
                    <span className="text-blue-600 font-medium">1,438</span>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t">
                  <div className="flex items-center text-sm text-gray-600">
                    <Bookmark className="w-4 h-4 mr-2" />
                    <span>Your Premium features</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
              <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 w-full text-left">
                  <TrendingUp className="w-4 h-4" />
                  <span className="text-sm">View Skill Timeline</span>
                </button>
                <button className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 w-full text-left">
                  <Bookmark className="w-4 h-4" />
                  <span className="text-sm">Organize Saved Posts</span>
                </button>
                <button className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 w-full text-left">
                  <Users className="w-4 h-4" />
                  <span className="text-sm">Sync GitHub Data</span>
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="col-span-6">
            {/* Create Post */}
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
              <div className="flex items-center space-x-3 mb-4">
                <Avatar name="Shantanu" src="/api/placeholder/40/40" />
                <button className="flex-1 text-left px-4 py-3 border border-gray-300 rounded-full text-gray-500 hover:bg-gray-50">
                  Start a post
                </button>
              </div>
              <div className="flex items-center justify-between">
                <button className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                  <Video className="w-5 h-5" />
                  <span className="text-sm font-medium">Video</span>
                </button>
                <button className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                  <div className="w-5 h-5 bg-gray-400 rounded"></div>
                  <span className="text-sm font-medium">Photo</span>
                </button>
                <button className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                  <Calendar className="w-5 h-5" />
                  <span className="text-sm font-medium">Write article</span>
                </button>
              </div>
            </div>

            {/* Posts Feed */}
            <div className="space-y-6">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} isSavedView={false} />
              ))}
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="col-span-3">
            {/* LinkedIn News */}
            <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">LinkedIn News</h3>
                <button className="text-gray-400 hover:text-gray-600">
                  <MoreHorizontal className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-3">
                <div className="cursor-pointer hover:bg-gray-50 p-2 rounded">
                  <h4 className="text-sm font-medium text-gray-900">Amazon to invest $2,000 crore in India</h4>
                  <p className="text-xs text-gray-500 mt-1">4hr ago • 94,394 readers</p>
                </div>
                <div className="cursor-pointer hover:bg-gray-50 p-2 rounded">
                  <h4 className="text-sm font-medium text-gray-900">Bollywood losing its stardom</h4>
                  <p className="text-xs text-gray-500 mt-1">3hr ago • 1,456 readers</p>
                </div>
                <div className="cursor-pointer hover:bg-gray-50 p-2 rounded">
                  <h4 className="text-sm font-medium text-gray-900">Fintech firms up for comment</h4>
                  <p className="text-xs text-gray-500 mt-1">5hr ago • 2,394 readers</p>
                </div>
                <div className="cursor-pointer hover:bg-gray-50 p-2 rounded">
                  <h4 className="text-sm font-medium text-gray-900">Power generation hits new high</h4>
                  <p className="text-xs text-gray-500 mt-1">4hr ago • 987 readers</p>
                </div>
              </div>
              <button className="text-sm text-gray-600 mt-3 hover:text-blue-600">Show more ↓</button>
            </div>

            {/* Promoted Content */}
            <div className="bg-white rounded-lg shadow-sm p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-gray-500">Promoted</span>
                <button className="text-gray-400 hover:text-gray-600">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=300&h=150&fit=crop" alt="Promoted content" className="w-full rounded-lg mb-3" />
              <h4 className="font-medium text-gray-900 mb-1">Advance your career with AI skills</h4>
              <p className="text-sm text-gray-600 mb-3">Learn machine learning and data science from industry experts.</p>
              <button className="w-full bg-blue-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-700">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;