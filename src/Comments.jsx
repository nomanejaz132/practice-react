import { useEffect, useState } from 'react';

function Comments({ postId }) {
  const [comments, setComments] = useState(null);
  const [errorComments, setErrorComments] = useState(null);
  const [isLoadingComments, setIsLoadingComments] = useState(false);

  useEffect(() => {
    setIsLoadingComments(true);
    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Something went wrong, unable to load comments');
        }
        return response.json();
      })
      .then((data) => {
        setComments(data);
        setIsLoadingComments(false);
      })
      .catch((error) => {
        setErrorComments(error.message);
        console.error('Error:', error);
        setIsLoadingComments(false);
      });

    return () => {
      console.log('Comment is unmounted');
    };
  }, [postId]);

  console.log('comment');

  if (isLoadingComments)
    return (
      <h4 className="py-10 text-center text-sm leading-6 font-semibold text-slate-900">
        Loading...
      </h4>
    );

  if (errorComments)
    return (
      <h4 className="py-10 text-center text-sm leading-6 font-semibold text-slate-900">
        {errorComments}
      </h4>
    );

  return (
    <div className="flex flex-wrap gap-4 h-[60vh] overflow-auto px-5">
      {comments?.map((comment) => {
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
