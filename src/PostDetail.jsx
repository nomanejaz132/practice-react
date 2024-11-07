import { ChevronLeft } from 'lucide-react';
import { useEffect, useState } from 'react';
import Comments from './Comments';

function PostsDetail({ postId, onBackClick }) {
  const [postDetail, setPostDetail] = useState(null);
  const [errorPost, setErrorPost] = useState(null);
  const [isLoadingPost, setIsLoadingPost] = useState(false);

  useEffect(() => {
    setIsLoadingPost(true);
    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            'Network response was not ok, unable to load post detail'
          );
        }
        return response.json();
      })
      .then((data) => {
        setPostDetail(data);
        setIsLoadingPost(false);
      })
      .catch((error) => {
        setErrorPost(error.message);
        console.error('Error:', error);
        setIsLoadingPost(false);
      });
  }, [postId]);

  if (isLoadingPost)
    return (
      <h4 className="py-10 text-center text-sm leading-6 font-semibold text-slate-900">
        Loading...
      </h4>
    );

  if (errorPost)
    return (
      <h4 className="py-10 text-center text-sm leading-6 font-semibold text-slate-900">
        {errorPost}
      </h4>
    );

  return (
    <div className="flex flex-col items-center">
      <div className="bg-white shadow-md rounded-xl py-4 w-[420px] h-auto border border-gray-300 cursor-pointer">
        <div className="px-5">
          <h4 className=" flex items-center gap-3 text-lg text-black text-left truncate mb-3">
            <div className="cursor-pointer" onClick={onBackClick}>
              <ChevronLeft />
            </div>
            Post Detail
          </h4>
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <span className="text-slate-600 text-xs">Title</span>
              <h4 className="text-base text-black text-left truncate">
                {postDetail?.title}
              </h4>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-slate-600 text-xs">Description</span>
              <p className="w-auto text-sm text-black text-left">
                {postDetail?.body}
              </p>
            </div>
          </div>
          <h4 className="text-lg text-black text-left truncate my-3">
            Comments
          </h4>
        </div>
        <Comments postId={postId} />
      </div>
    </div>
  );
}

export default PostsDetail;