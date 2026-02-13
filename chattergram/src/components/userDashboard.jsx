import React, { useMemo, useState } from "react";
import {
  getAllpost,
  toggleLikeToPost,
  viewPost,
} from "../services/apiServices";
import { useEffect } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";

// Dummy Customer Data (simulate fetching from backend)
const fetchCustomerData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        userName: "alex_99",
        name: "Alex Johnson",
        bio: "Web Developer | Blockchain Enthusiast | Digital Nomad",
        dob: "1992-06-15",
        followers: 500,
        following: 180,
        posts: 35,
        image: "https://i.pravatar.cc/150?img=12", // User's profile image
      });
    }, 1000); // simulate network delay
  });
};

export default function UserDashboard() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const getUserData = async () => {
      const data = await fetchCustomerData();
      setUserData(data);
    };
    getUserData();
  }, []);

  if (!userData)
    return <div className="text-white text-center">Loading...</div>; // Show loading message

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6 ">
      {/* Profile Section */}
      <div className="bg-slate-900 rounded-2xl shadow-xl p-8 flex flex-col items-center gap-6">
        {/* Profile Header */}
        {/* <div className="flex items-center gap-6">
          <img
            src={userData.image}
            alt="profile"
            className="w-48 h-48 rounded-full object-cover"
          />
          <div className="flex flex-col">
            <h2 className="text-2xl font-semibold">@{userData.userName}</h2>
            <h3 className="text-lg font-medium">{userData.name}</h3>
            <p className="text-sm text-slate-400">{userData.bio}</p>
            <p className="text-xs text-slate-500">
              DOB: {new Date(userData.dob).toLocaleDateString()}
            </p>
          </div>
        </div> */}
<div className="flex items-center gap-6 p-4">
  {/* Profile Image */}
  <img
    src={userData.image}
    alt="profile"
    className="w-24 h-24 rounded-full object-cover border-4 border-blue-500" 
  />
  
  {/* User Info Section */}
  <div className="flex flex-col">
    {/* Username and Full Name */}
    <h2 className="text-xl font-semibold">@{userData.userName}</h2>
    <h3 className="text-lg font-medium">{userData.name}</h3>
    
    {/* Bio */}
    <p className="text-sm text-slate-400 mt-1">{userData.bio}</p>
    
    {/* Date of Birth */}
    <p className="text-xs text-slate-500 mt-1">DOB: {new Date(userData.dob).toLocaleDateString()}</p>
    
    {/* Additional Profile Stats */}
    <div className="flex gap-6 mt-3">
      <div className="flex flex-col items-center">
        <p className="text-sm">1,217</p>
        <p className="text-xs text-slate-500">Posts</p>
      </div>
      <div className="flex flex-col items-center">
        <p className="text-sm">270M</p>
        <p className="text-xs text-slate-500">Followers</p>
      </div>
      <div className="flex flex-col items-center">
        <p className="text-sm">279</p>
        <p className="text-xs text-slate-500">Following</p>
      </div>
    </div>
  </div>
</div>

        {/* Stats Section */}
        {/* <div className="flex gap-8 mt-6">
          <div className="text-center">
            <span className="text-xl font-bold">{userData.posts}</span>
            <p className="text-sm text-slate-400">Posts</p>
          </div>
          <div className="text-center">
            <span className="text-xl font-bold">{userData.followers}</span>
            <p className="text-sm text-slate-400">Followers</p>
          </div>
          <div className="text-center">
            <span className="text-xl font-bold">{userData.following}</span>
            <p className="text-sm text-slate-400">Following</p>
          </div>
        </div> */}
      </div>

      {/* Posts Section */}
      <div className="mt-12 bg-slate-900 rounded-2xl shadow-xl p-8">
        <h3 className="text-xl font-semibold mb-4">Recent Posts</h3>

        {/* Dummy posts */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
          <PostCard />
          <PostCard />
          <PostCard />
          <PostCard />
          <PostCard />
          <PostCard />
          <PostCard />
          <PostCard />
          <PostCard />
          <PostCard />
          <PostCard />
          <PostCard />
          <PostCard />
          <PostCard />
        </div>
      </div>
    </div>
  );
}

// Post Card Component (for displaying posts)

function PostCard() {
  const post = {
    title: "The Future of Decentralized Finance",
    content:
      "Exploring how blockchain technology is reshaping global banking systems through transparency and peer-to-peer protocols.",
    media: [
      "https://res.cloudinary.com/dk900kd01/image/upload/v1770377635/chattergram/egfqvv7gekztrbb8ce25.jpg",
      "https://res.cloudinary.com/dk900kd01/image/upload/v1770377635/chattergram/nszkmu9indjwwcmmtaab.jpg",
    ],
    likes: [],
    comments: [],
    shares: [],
    views: [],
    hashTag: "#DeFi #Blockchain #Web3",
  };

  const user = JSON.parse(localStorage.getItem("USER"));
  const id = user._id;
  const [activeMediaIndex, setActiveMediaIndex] = useState(0);

  const tags = useMemo(() => {
    // "#DeFi #Blockchain #Web3" -> ["#DeFi", "#Blockchain", "#Web3"]
    if (!post?.hashTag) return [];
    return post.hashTag
      .split(" ")
      .map((t) => t.trim())
      .filter(Boolean);
  }, [post?.hashTag]);

  const [likesCount, setLikesCount] = useState(post?.likes?.length || 0);
  const [viewsCount, setViewsCount] = useState(post?.views?.length || 0);

  const [isLiked, setIsLiked] = useState(false);
  const commentsCount = post?.comments?.length || 0;
  const sharesCount = post?.share?.length || 0;
  // const viewsCount = post?.views?.length || 0;

  const createdDate = useMemo(() => {
    try {
      return new Date(post.createdAt).toLocaleString();
    } catch {
      return "";
    }
  }, [post.createdAt]);

  async function handleLike() {
    const updatedPost = await toggleLikeToPost(post._id);
    setLikesCount(updatedPost?.likes?.length);
    const Liked = () => {
      return Boolean(updatedPost.likes.find((u) => u._id == id));
    };
    setIsLiked(Liked);
  }

  useEffect(() => {
    const Liked = () => {
      return Boolean(post.likes.find((u) => u._id == id));
    };
    setIsLiked(Liked);
  }, []);

  async function handlePostView() {
    // alert("viewd");
    const updatedPost = await viewPost(post._id);
    setViewsCount(updatedPost.views.length);
  }

  useEffect(() => {
    // Intersection Observer logic
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Call the function when post comes into view
            handlePostView();
            observer.unobserve(entry.target); // Unobserve once the post is in view
          }
        });
      },
      {
        threshold: 0.5, // Trigger when 50% of the post is in view
      },
    );

    const postElement = document.getElementById(post._id);
    if (postElement) {
      observer.observe(postElement);
    }

    return () => {
      if (postElement) {
        observer.unobserve(postElement); // Clean up the observer when the component unmounts
      }
    };
  }, [post._id]);
  return (
    <div
      className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden max-w-lg mx-auto"
      id={post._id}
    >
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
        <div className="flex flex-wrap gap-4 text-sm text-slate-300 cursor-pointer">
          <span onClick={() => handleLike()}>
            {isLiked ? (
              <div>
                <FaHeart />
              </div>
            ) : (
              <div>
                <FaRegHeart />
              </div>
            )}
            {likesCount}
          </span>
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
            <div className="text-xs text-slate-400 mb-2">Recent comments</div>
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
