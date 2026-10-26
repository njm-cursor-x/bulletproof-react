import { db, persistDb } from './db';
import { hash } from './utils';

// Sample workspace content for demos. Fictional people, fictional product.
const TEAMMATES = [
  {
    key: 'priya',
    firstName: 'Priya',
    lastName: 'Raman',
    bio: 'Product manager, onboarding.',
  },
  {
    key: 'marco',
    firstName: 'Marco',
    lastName: 'Lindqvist',
    bio: 'Support operations lead.',
  },
  {
    key: 'dana',
    firstName: 'Dana',
    lastName: 'Okafor',
    bio: 'Release engineering.',
  },
] as const;

type AuthorKey = (typeof TEAMMATES)[number]['key'] | 'admin';

const DISCUSSIONS: {
  title: string;
  body: string;
  daysAgo: number;
  comments: { author: AuthorKey; body: string; hoursAfter: number }[];
}[] = [
  {
    title: 'Q4 onboarding checklist refresh',
    body: 'The current onboarding checklist has 14 steps and most new workspaces stop at step 6. Proposal: cut it to 7 steps, move integrations to a later nudge, and add a sample discussion so the first screen is never empty.\n\n**Decision needed by Friday.**',
    daysAgo: 3,
    comments: [
      {
        author: 'priya',
        body: 'Agree on 7 steps. Step 6 is "invite teammates" — can we move it earlier? People invite when they have something to show.',
        hoursAfter: 2,
      },
      {
        author: 'marco',
        body: 'Support sees most tickets on the integrations step. Moving it later should cut those.',
        hoursAfter: 5,
      },
      {
        author: 'admin',
        body: 'Draft is in the doc. I kept "invite teammates" at step 3. Final review Thursday.',
        hoursAfter: 20,
      },
    ],
  },
  {
    title: 'Weekly ops review: support queue and response times',
    body: 'Queue is up after the notifications release. Most new tickets are about digest emails arriving twice. Tracking the fix in the release thread.',
    daysAgo: 2,
    comments: [
      {
        author: 'marco',
        body: 'Added a macro for the duplicate-digest reply so agents can close these quickly.',
        hoursAfter: 1,
      },
      {
        author: 'dana',
        body: 'Root cause is a retry on the digest job. Patch is ready for the next release window.',
        hoursAfter: 6,
      },
    ],
  },
  {
    title: 'Release 2.8 go/no-go',
    body: 'Scope: comment reactions, the digest retry fix, and the new empty states.\n\nOpen question: ship reactions behind a flag or on by default?',
    daysAgo: 1,
    comments: [
      {
        author: 'dana',
        body: 'All checks green on the release branch. Rollback plan is the standard one.',
        hoursAfter: 3,
      },
      {
        author: 'priya',
        body: 'Behind a flag for one week, then on by default if feedback is good.',
        hoursAfter: 4,
      },
    ],
  },
  {
    title: 'Proposal: rename "Teams" to "Workspaces" in the UI',
    body: 'Customers already say "workspace" in tickets and calls. This is a copy change only; the API stays the same.',
    daysAgo: 0,
    comments: [
      {
        author: 'priya',
        body: 'Supportive. Let us check the help center articles before we switch.',
        hoursAfter: 1,
      },
    ],
  },
];

const HOUR = 60 * 60 * 1000;

export const seedDemoWorkspace = async ({
  teamId,
  adminId,
}: {
  teamId: string;
  adminId: string;
}) => {
  const authorIds: Record<AuthorKey, string> = { admin: adminId } as Record<
    AuthorKey,
    string
  >;

  TEAMMATES.forEach((mate) => {
    const user = db.user.create({
      firstName: mate.firstName,
      lastName: mate.lastName,
      email: `${mate.key}.${teamId.slice(0, 6)}@threadmere.example`,
      password: hash(`${mate.key}-demo`),
      teamId,
      role: 'USER',
      bio: mate.bio,
    });
    authorIds[mate.key] = user.id;
  });

  const now = Date.now();
  DISCUSSIONS.forEach((item) => {
    const createdAt = now - item.daysAgo * 24 * HOUR - 6 * HOUR;
    const discussion = db.discussion.create({
      title: item.title,
      body: item.body,
      authorId: adminId,
      teamId,
      createdAt,
    });
    item.comments.forEach((comment) => {
      db.comment.create({
        body: comment.body,
        authorId: authorIds[comment.author],
        discussionId: discussion.id,
        createdAt: Math.min(createdAt + comment.hoursAfter * HOUR, now),
      });
    });
  });

  await persistDb('user');
  await persistDb('discussion');
  await persistDb('comment');
};
