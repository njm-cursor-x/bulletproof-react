import { MDPreview } from '@/components/ui/md-preview';
import { Spinner } from '@/components/ui/spinner';
import { formatDate } from '@/utils/format';

import { useDiscussion } from '../api/get-discussion';
import { UpdateDiscussion } from '../components/update-discussion';

export const DiscussionView = ({ discussionId }: { discussionId: string }) => {
  const discussionQuery = useDiscussion({
    discussionId,
  });

  if (discussionQuery.isLoading) {
    return (
      <div className="flex h-48 w-full items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  const discussion = discussionQuery?.data?.data;

  if (!discussion) return null;

  return (
    <div>
      <p className="text-sm text-slate-500">
        <span>{formatDate(discussion.createdAt)}</span>
        {discussion.author && (
          <span className="ml-2 font-medium text-slate-700">
            by {discussion.author.firstName} {discussion.author.lastName}
          </span>
        )}
      </p>
      <div className="mt-6 flex flex-col space-y-6">
        <div className="flex justify-end">
          <UpdateDiscussion discussionId={discussionId} />
        </div>
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="px-4 py-5 sm:px-6">
            <div className="max-w-3xl text-sm text-slate-700">
              <MDPreview value={discussion.body} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
