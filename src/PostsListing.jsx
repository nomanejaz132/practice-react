import { useEffect, useState } from 'react';
import PostsDetail from './PostDetail';

function PostsListing() {
  const [postListing, setPostListing] = useState(null);
  const [errorPosts, setErrorPosts] = useState(null);
  const [isLoadingPosts, setIsLoadingPosts] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    setIsLoadingPosts(true);
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok, unable to load posts');
        }
        return response.json();
      })
      .then((data) => {
        setPostListing(data);
        setIsLoadingPosts(false);
      })
      .catch((error) => {
        setErrorPosts(error.message);
        console.error('Error:', error);
        setIsLoadingPosts(false);
      });
  }, []);

  const handleBack = () => {
    setSelectedPost(null);
  };

  if (isLoadingPosts)
    return (
      <h4 className="py-10 text-center text-sm leading-6 font-semibold text-slate-900">
        Loading...
      </h4>
    );

  if (errorPosts)
    return (
      <h4 className="py-10 text-center text-sm leading-6 font-semibold text-slate-900">
        {errorPosts}
      </h4>
    );

  return (
    <div className="flex flex-col h-screen overflow-y-auto px-5">
      <div className="mx-auto flex flex-col items-center">
        <h3 className="sticky top-0 w-[420px] bg-white py-5 text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          List of all the Posts
        </h3>
        {selectedPost ? (
          <PostsDetail postId={selectedPost} onBackClick={handleBack} />
        ) : (
          postListing?.length > 0 && (
            <div className="grid grid-cols-1 max-w-[400px] py-4 gap-4">
              {postListing.map((post) => {
                return (
                  <div
                    key={post.id}
                    onClick={() => setSelectedPost(post.id)}
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
