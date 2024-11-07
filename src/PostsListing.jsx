import { useEffect, useState } from 'react';
import PostsDetail from './PostDetail';

function PostsListing() {
  const [posts, setPosts] = useState({
    data: null,
    error: null,
    loading: false,
    selectedPost: null,
  });

  useEffect(() => {
    setPosts((prevState) => ({ ...prevState, loading: true }));
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok, unable to load posts');
        }
        return response.json();
      })
      .then((data) => {
        setPosts((prevState) => ({
          ...prevState,
          data: data,
          loading: false,
        }));
      })
      .catch((error) => {
        setPosts((prevState) => ({
          ...prevState,
          error: error.message,
          loading: false,
        }));
        console.error('Error:', error);
      });
  }, []);

  const handleSelectPost = (postId) => [
    setPosts((prevState) => ({
      ...prevState,
      selectedPost: postId,
    })),
  ];

  const handleBack = () => {
    setPosts((prevState) => ({
      ...prevState,
      selectedPost: null,
    }));
  };

  if (posts.loading)
    return (
      <h4 className="py-10 text-center text-sm leading-6 font-semibold text-slate-900">
        Loading...
      </h4>
    );

  if (posts.error)
    return (
      <h4 className="py-10 text-center text-sm leading-6 font-semibold text-slate-900">
        {posts.error}
      </h4>
    );

  console.log(posts.selectedPost);

  return (
    <div className="flex flex-col h-screen overflow-y-auto px-5">
      <div className="mx-auto flex flex-col items-center">
        <h3 className="sticky top-0 w-[420px] bg-white py-5 text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          List of all the Posts
        </h3>
        {posts.selectedPost ? (
          <PostsDetail postId={posts.selectedPost} onBackClick={handleBack} />
        ) : (
          posts?.data?.length > 0 && (
            <div className="grid grid-cols-1 max-w-[400px] py-4 gap-4">
              {posts?.data?.map((post) => {
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
