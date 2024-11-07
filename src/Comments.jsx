import useFetchData from './hooks/useFetchData';

function Comments({ postId }) {
  const {
    data: comments,
    loading,
    error,
  } = useFetchData(
    `https://jsonplaceholder.typicode.com/posts/${postId}/comments`
  );

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
