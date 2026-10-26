import { ArchiveX } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { MDPreview } from '@/components/ui/md-preview';
import { Spinner } from '@/components/ui/spinner';
import { useUser } from '@/lib/auth';
import { POLICIES, Authorization } from '@/lib/authorization';
import { User } from '@/types/api';
import { formatDate } from '@/utils/format';

import { useInfiniteComments } from '../api/get-comments';

import { DeleteComment } from './delete-comment';

type CommentsListProps = {
  discussionId: string;
};

export const CommentsList = ({ discussionId }: CommentsListProps) => {
  const user = useUser();
  const commentsQuery = useInfiniteComments({ discussionId });

  if (commentsQuery.isLoading) {
    return (
      <div className="flex h-48 w-full items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  const comments = commentsQuery.data?.pages.flatMap((page) => page.data);

  if (!comments?.length)
    return (
      <div
        role="list"
        aria-label="comments"
        className="flex h-40 flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-white text-slate-500"
      >
        <ArchiveX className="size-10" />
        <h4>No Comments Found</h4>
      </div>
    );

  return (
    <>
      <ul aria-label="comments" className="flex flex-col space-y-3">
        {comments.map((comment, index) => (
          <li
            aria-label={`comment-${comment.body}-${index}`}
            key={comment.id || index}
            className="w-full rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="flex size-8 shrink-0 items-center justify-center rounded-full bg-teal-50 text-xs font-semibold text-teal-800"
                >
                  {comment.author
                    ? `${comment.author.firstName?.[0] ?? ''}${comment.author.lastName?.[0] ?? ''}`
                    : '?'}
                </span>
                <div className="leading-tight">
                  {comment.author && (
                    <span className="block text-sm font-semibold text-slate-900">
                      {comment.author.firstName} {comment.author.lastName}
                    </span>
                  )}
                  <span className="text-xs text-slate-500">
                    {formatDate(comment.createdAt)}
                  </span>
                </div>
              </div>
              <Authorization
                policyCheck={POLICIES['comment:delete'](
                  user.data as User,
                  comment,
                )}
              >
                <DeleteComment discussionId={discussionId} id={comment.id} />
              </Authorization>
            </div>

            <div className="mt-2 pl-11">
              <MDPreview value={comment.body} />
            </div>
          </li>
        ))}
      </ul>
      {commentsQuery.hasNextPage && (
        <div className="flex items-center justify-center py-4">
          <Button onClick={() => commentsQuery.fetchNextPage()}>
            {commentsQuery.isFetchingNextPage ? (
              <Spinner />
            ) : (
              'Load More Comments'
            )}
          </Button>
        </div>
      )}
    </>
  );
};
