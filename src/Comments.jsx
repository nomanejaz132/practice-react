import { useEffect, useState } from 'react';

function Comments({ postId }) {
  const [comments, setComments] = useState({
    data: null,
    error: null,
    loading: false,
  });

  useEffect(() => {
    setComments((prevState) => ({ ...prevState, loading: true }));
    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Something went wrong, unable to load comments');
        }
        return response.json();
      })
      .then((data) => {
        setComments((prevState) => ({
          ...prevState,
          data: data,
          loading: false,
        }));
      })
      .catch((error) => {
        setComments((prevState) => ({
          ...prevState,
          error: error.message,
          loading: false,
        }));
        console.error('Error:', error);
      });

    return () => {
      console.log('Comment is unmounted');
    };
  }, [postId]);

  if (comments.loading)
    return (
      <h4 className="py-10 text-center text-sm leading-6 font-semibold text-slate-900">
        Loading...
      </h4>
    );

  if (comments.error)
    return (
      <h4 className="py-10 text-center text-sm leading-6 font-semibold text-slate-900">
        {comments.error}
      </h4>
    );

  return (
    <div className="flex flex-wrap gap-4 h-[60vh] overflow-auto px-5">
      {comments?.data?.map((comment) => {
        return (
          <div
            key={comment.id}
            className="p-3 border border-gray-300 shadow-sm rounded-md"
          >
            <div className="flex flex-col gap-1.5">
              <h5 className="text-sm text-slate-900">{comment?.name}</h5>
              <span className="text-xs text-slate-600">{comment?.email}</span>
            </div>
            <p className="text-sm mt-3">{comment?.body}</p>
          </div>
        );
      })}
    </div>
  );
}

export default Comments;
