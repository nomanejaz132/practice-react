import { useState } from 'react';
import PostsDetail from './PostDetail';
import useFetchData from './hooks/useFetchData';
import { Search } from 'lucide-react';

function PostsListing() {
  const [selectedPost, setSelectedPost] = useState(null);

  const {
    data: posts,
    loading,
    error,
  } = useFetchData(
    'https://jsonplaceholder.typicode.com/posts?_page=1&_per_page=25'
  );

  const handleSelectPost = (postId) => setSelectedPost(postId);

  const handleBack = () => setSelectedPost(null);

  if (loading)
    return (
      <h4 className="py-10 text-center text-sm leading-6 font-semibold text-slate-900">
        Loading...
      </h4>
    );

  if (error)
    return (
      <h4 className="py-10 text-center text-sm leading-6 font-semibold text-slate-900">
        {error}
      </h4>
    );

  return (
    <div className="flex flex-col h-screen overflow-y-auto px-5">
      <div className="mx-auto flex flex-col items-center">
        <div className="py-5 sticky flex flex-col gap-4 items-center top-0 bg-white">
          <h3 className=" w-[420px] text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            List of all the Posts
          </h3>
          <label className="relative block w-[25rem]">
            <span className="sr-only">Search</span>
            <span className="absolute inset-y-0 left-0 flex items-center pl-2">
              <Search color="#94a3b8" className="w-5 h-5" />
            </span>
            <input
              className="placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500  focus:ring-0 sm:text-sm"
              placeholder="Search for anything..."
              type="text"
              name="search"
            />
          </label>
        </div>
        {selectedPost ? (
          <PostsDetail postId={selectedPost} onBackClick={handleBack} />
        ) : (
          posts?.length > 0 && (
            <div className="grid grid-cols-1 max-w-[400px] pb-4 gap-4">
              {posts?.map((post) => {
                return (
                  <div
                    key={post.id}
                    onClick={() => handleSelectPost(post.id)}
                    className="bg-white shadow-md rounded-xl p-5 h-auto border border-gray-300 cursor-pointer"
                  >
                    <div className="flex flex-col gap-2">
                      <div className="flex flex-col gap-1">
                        <span className="text-slate-600 text-[11px]">
                          Title
                        </span>
                        <h4 className="text-sm text-black text-left truncate">
                          {post.title}
                        </h4>
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="text-slate-600 text-[11px]">
                          Description
                        </span>
                        <p className="w-auto text-xs text-gray-700 text-left">
                          {post.body}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default PostsListing;
