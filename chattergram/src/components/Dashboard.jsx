import React, { useMemo, useState } from "react";
import { getAllpost } from "../services/apiServices";
import { useEffect } from "react";

// --- Dummy Response (same shape as your API) ---
const dummyApiResponse = {
  status: true,
  message: "Data Fetched Successfully.",
  result: {
    _id: "6985d1a4b8f39779735fbda6",
    title: "The Future of Decentralized Finance",
    content:
      "Exploring how blockchain technology is reshaping global banking systems through transparency and peer-to-peer protocols.",
    user: {
      _id: "69859ab31be2f29519c3f820",
      name: "Alex Johnson",
      username: "alex_99",
      avatar: "https://i.pravatar.cc/150?img=12",
    },
    media: [
      "https://res.cloudinary.com/dk900kd01/image/upload/v1770377635/chattergram/egfqvv7gekztrbb8ce25.jpg",
      "https://res.cloudinary.com/dk900kd01/image/upload/v1770377635/chattergram/nszkmu9indjwwcmmtaab.jpg",
    ],
    comments: [
      {
        _id: "c1",
        user: { username: "maya.design" },
        text: "This is super interesting 🔥",
        createdAt: "2026-02-06T12:10:00.000Z",
      },
      {
        _id: "c2",
        user: { username: "john.codes" },
        text: "Web3 adoption is going to be huge.",
        createdAt: "2026-02-06T12:18:00.000Z",
      },
    ],
    hashTag: "#DeFi #Blockchain #Web3",
    likes: [{ userId: "u1" }, { userId: "u2" }, { userId: "u3" }, { userId: "u4" }],
    share: [{ userId: "u2" }, { userId: "u6" }],
    views: Array.from({ length: 124 }, (_, i) => ({ userId: `v${i + 1}` })),
    createdAt: "2026-02-06T11:33:56.957Z",
    updatedAt: "2026-02-06T11:33:56.957Z",
    __v: 0,
  },
};

// --- Dummy stories ---
const stories = [
  { id: 1, name: "Alex" },
  { id: 2, name: "Maya" },
  { id: 3, name: "John" },
  { id: 4, name: "Emma" },
  { id: 5, name: "Chris" },
   { id: 1, name: "Alex" },
  { id: 2, name: "Maya" },
  { id: 3, name: "John" },
  { id: 4, name: "Emma" },
  { id: 5, name: "Chris" },
   { id: 1, name: "Alex" },
  { id: 2, name: "Maya" },
  { id: 3, name: "John" },
  { id: 4, name: "Emma" },
  { id: 5, name: "Chris" },
];

export default function Dashboard() {
  // Convert API single post into feed array (easy to scale later)
  const getPosts = async() =>{
   const posts = await getAllpost();
   console.log("posts",posts);
   setFeed(posts);
  }
  useEffect(()=>{
    getPosts();
  },[])

  const [feed,setFeed] = useState([dummyApiResponse.result,dummyApiResponse.result,dummyApiResponse.result,dummyApiResponse.result]);

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Navbar */}
      <div className="border-b border-slate-800 px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-semibold">
          Social<span className="text-indigo-500">Hub</span>
        </h1>

        {/* User Icon */}
        <div className="flex items-center gap-3">
          <span className="text-sm text-slate-300 hidden sm:block">alex_99</span>
          <img
            src="https://i.pravatar.cc/150?img=12"
            alt="user"
            className="w-9 h-9 rounded-full border border-slate-800 object-cover"
          />
        </div>
      </div>

      {/* Content */}
      <div className="max-w-2xl mx-auto px-4">
        {/* Stories */}
        <div className="flex gap-4 overflow-x-auto py-6">
          {stories.map((story) => (
            <div key={story.id} className="flex flex-col items-center shrink-0">
              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-indigo-500 to-pink-500 p-[2px]">
                <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center text-sm font-medium">
                  {story.name[0]}
                </div>
              </div>
              <span className="text-xs text-slate-400 mt-1">{story.name}</span>
            </div>
          ))}
        </div>

        {/* Feed */}
        <div className="space-y-8 pb-10">
          {feed.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
}

function PostCard({ post }) {
  const [activeMediaIndex, setActiveMediaIndex] = useState(0);

  const tags = useMemo(() => {
    // "#DeFi #Blockchain #Web3" -> ["#DeFi", "#Blockchain", "#Web3"]
    if (!post?.hashTag) return [];
    return post.hashTag.split(" ").map((t) => t.trim()).filter(Boolean);
  }, [post?.hashTag]);

  const likesCount = post?.likes?.length || 0;
  const commentsCount = post?.comments?.length || 0;
  const sharesCount = post?.share?.length || 0;
  const viewsCount = post?.views?.length || 0;

  const createdDate = useMemo(() => {
    try {
      return new Date(post.createdAt).toLocaleString();
    } catch {
      return "";
    }
  }, [post.createdAt]);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3">
        <img
          src={post?.user?.avatar || "https://i.pravatar.cc/150?img=3"}
          alt="avatar"
          className="w-9 h-9 rounded-full border border-slate-800 object-cover"
        />
        <div className="leading-tight">
          <div className="font-medium">{post?.user?.userName || "user"}</div>
          <div className="text-xs text-slate-400">{createdDate}</div>
        </div>
      </div>

      {/* Media */}
      <div className="relative bg-slate-800">
        {post?.media?.length ? (
          <img
            src={post.media[activeMediaIndex]}
            alt="post-media"
            className="w-full h-72 object-cover"
          />
        ) : (
          <div className="h-72 flex items-center justify-center text-slate-500">
            No Media
          </div>
        )}

        {/* Media Dots */}
        {post?.media?.length > 1 && (
          <div className="absolute bottom-3 left-0 right-0 flex items-center justify-center gap-2">
            {post.media.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveMediaIndex(idx)}
                className={`w-2 h-2 rounded-full ${
                  idx === activeMediaIndex ? "bg-indigo-500" : "bg-slate-500"
                }`}
                aria-label={`media-${idx}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Body */}
      <div className="px-4 py-4 space-y-3">
        {/* Title */}
        {post?.title && (
          <h2 className="text-base font-semibold">{post.title}</h2>
        )}

        {/* Actions counts */}
        <div className="flex flex-wrap gap-4 text-sm text-slate-300">
          <span>❤️ {likesCount}</span>
          <span>💬 {commentsCount}</span>
          <span>🔁 {sharesCount}</span>
          <span>👁 {viewsCount}</span>
        </div>

        {/* Content */}
        <p className="text-sm text-slate-300 leading-relaxed">
          {post?.content}
        </p>

        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex gap-2 flex-wrap">
            {tags.map((tag, i) => (
              <span key={i} className="text-xs text-indigo-400">
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Recent comments preview */}
        {post?.comments?.length > 0 && (
          <div className="pt-2 border-t border-slate-800">
            <div className="text-xs text-slate-400 mb-2">
              Recent comments
            </div>
            <div className="space-y-2">
              {post.comments.slice(0, 2).map((c) => (
                <div key={c._id} className="text-sm">
                  <span className="font-medium">{c.user?.username}</span>{" "}
                  <span className="text-slate-300">{c.text}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
