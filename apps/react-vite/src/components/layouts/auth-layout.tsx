import * as React from 'react';
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router';

import logo from '@/assets/logo.svg';
import { Head } from '@/components/seo';
import { Link } from '@/components/ui/link';
import { paths } from '@/config/paths';
import { useUser } from '@/lib/auth';

type LayoutProps = {
  children: React.ReactNode;
  title: string;
};

export const AuthLayout = ({ children, title }: LayoutProps) => {
  const user = useUser();
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get('redirectTo');

  const navigate = useNavigate();

  useEffect(() => {
    if (user.data) {
      navigate(redirectTo ? redirectTo : paths.app.dashboard.getHref(), {
        replace: true,
      });
    }
  }, [user.data, navigate, redirectTo]);

  return (
    <>
      <Head title={title} />
      <div className="flex min-h-screen flex-col justify-center bg-gradient-to-b from-teal-50 to-white py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="flex justify-center">
            <Link
              className="flex items-center text-white"
              to={paths.home.getHref()}
            >
              <img className="size-14" src={logo} alt="Threadmere" />
            </Link>
          </div>

          <h2 className="mt-3 text-center text-2xl font-bold tracking-tight text-slate-900">
            {title}
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="border border-slate-200 bg-white px-4 py-8 shadow-sm sm:rounded-xl sm:px-10">
            {children}
          </div>
        </div>
      </div>
    </>
  );
};
