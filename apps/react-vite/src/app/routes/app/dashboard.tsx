import { MessagesSquare, Trash2, PencilLine, ShieldCheck } from 'lucide-react';

import { ContentLayout } from '@/components/layouts';
import { Link } from '@/components/ui/link';
import { paths } from '@/config/paths';
import { useUser } from '@/lib/auth';
import { ROLES } from '@/lib/authorization';

const userAbilities = [
  { icon: MessagesSquare, label: 'Create comments in discussions' },
  { icon: Trash2, label: 'Delete own comments' },
];

const adminAbilities = [
  { icon: MessagesSquare, label: 'Create discussions' },
  { icon: PencilLine, label: 'Edit discussions' },
  { icon: Trash2, label: 'Delete discussions' },
  { icon: MessagesSquare, label: 'Comment on discussions' },
  { icon: ShieldCheck, label: 'Delete all comments' },
];

const DashboardRoute = () => {
  const user = useUser();
  const abilities =
    user.data?.role === ROLES.ADMIN ? adminAbilities : userAbilities;

  return (
    <ContentLayout title="Dashboard">
      <div className="grid gap-6 lg:grid-cols-3">
        <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">
          <p className="text-sm font-medium text-teal-700">Welcome back</p>
          <h2 className="mt-1 text-xl font-semibold text-slate-900">
            Welcome <b>{`${user.data?.firstName} ${user.data?.lastName}`}</b>
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Your role is :{' '}
            <span className="rounded-full bg-teal-50 px-2 py-0.5 text-xs font-semibold text-teal-800">
              {user.data?.role}
            </span>
          </p>
          <Link
            to={paths.app.discussions.getHref()}
            className="mt-6 inline-flex items-center text-sm font-medium text-teal-700 hover:text-teal-900"
          >
            Browse threads →
          </Link>
        </section>

        <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-slate-900">
            In this workspace you can:
          </p>
          <ul className="mt-4 space-y-3">
            {abilities.map((ability) => (
              <li
                key={ability.label}
                className="flex items-center gap-3 text-sm text-slate-700"
              >
                <ability.icon
                  className="size-4 text-teal-600"
                  aria-hidden="true"
                />
                {ability.label}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </ContentLayout>
  );
};

export default DashboardRoute;
