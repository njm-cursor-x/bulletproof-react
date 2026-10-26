import { MessagesSquare, ShieldCheck, Users } from 'lucide-react';
import { useNavigate } from 'react-router';

import logo from '@/assets/logo.svg';
import { Head } from '@/components/seo';
import { Button } from '@/components/ui/button';
import { paths } from '@/config/paths';
import { useUser } from '@/lib/auth';

const features = [
  {
    icon: MessagesSquare,
    title: 'Threaded discussions',
    body: 'Start a discussion for a launch, a runbook change, or a weekly review. Every reply stays attached to the decision it informs.',
  },
  {
    icon: Users,
    title: 'Built for teams',
    body: 'Invite teammates into a shared workspace. Admins create discussions; everyone can comment.',
  },
  {
    icon: ShieldCheck,
    title: 'Role-aware by default',
    body: 'Members delete only their own comments. Admins can moderate any thread.',
  },
];

const LandingRoute = () => {
  const navigate = useNavigate();
  const user = useUser();

  const handleStart = () => {
    if (user.data) {
      navigate(paths.app.dashboard.getHref());
    } else {
      navigate(paths.auth.login.getHref());
    }
  };

  return (
    <>
      <Head description="Threadmere — threaded discussions and comments for product and operations teams." />
      <div className="min-h-screen bg-gradient-to-b from-teal-50 via-white to-white">
        <header className="mx-auto flex max-w-6xl items-center justify-between p-6">
          <div className="flex items-center gap-2">
            <img className="size-9" src={logo} alt="" />
            <span className="text-lg font-semibold tracking-tight text-slate-900">
              Threadmere
            </span>
          </div>
          <Button variant="outline" size="sm" onClick={handleStart}>
            {user.data ? 'Open workspace' : 'Sign in'}
          </Button>
        </header>

        <main className="mx-auto max-w-6xl px-6 pb-24 pt-12 text-center lg:pt-20">
          <p className="mx-auto inline-flex items-center rounded-full border border-teal-200 bg-white px-3 py-1 text-xs font-medium text-teal-800">
            Discussions and comments for product and ops teams
          </p>
          <h1 className="mx-auto mt-6 max-w-3xl text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            Keep every decision and the conversation behind it{' '}
            <span className="bg-gradient-to-r from-teal-600 to-indigo-600 bg-clip-text text-transparent">
              in one thread
            </span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-600">
            Threadmere gives your team one place to propose a change, discuss
            it, and leave a clear trail of comments that anyone can follow
            later.
          </p>
          <div className="mt-10 flex justify-center">
            <Button size="lg" onClick={handleStart}>
              Get started
            </Button>
          </div>

          <div className="mt-20 grid gap-6 text-left sm:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className="flex size-10 items-center justify-center rounded-lg bg-teal-50 text-teal-700">
                  <feature.icon className="size-5" aria-hidden="true" />
                </div>
                <h2 className="mt-4 text-base font-semibold text-slate-900">
                  {feature.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {feature.body}
                </p>
              </div>
            ))}
          </div>
        </main>

        <footer className="border-t border-slate-200 py-6 text-center text-xs text-slate-500">
          Threadmere is a fictional demo product. Open source under the MIT
          License.
        </footer>
      </div>
    </>
  );
};

export default LandingRoute;
