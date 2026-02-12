import React from 'react';

export type PostMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  image: string;
  readingTime: number; // in minutes
  component: React.LazyExoticComponent<React.ComponentType>;
};

export const Posts: PostMeta[] = [
  {
    slug: 'my-first-blog-post',
    title: 'My First Blog Post!',
    description: "Why I made the blog and what I'll write about.",
    date: 'March 6th, 2025',
    tags: ['Personal', 'Web Development'],
    image: '/assets/images/logo.jpg',
    readingTime: 6,
    component: React.lazy(() => import('../posts/intro')),
  },
  {
    slug: 'sinners',
    title: 'Sinners judging other sinners',
    description:
      'A small rant about a society full of sinners, judging other sinners for sinning differently',
    date: 'April 4th, 2025',
    tags: ['Personal', 'Philosophy'],
    image: '/assets/images/sinner.jpg',
    readingTime: 6,
    component: React.lazy(() => import('../posts/judgement')),
  },
  {
    slug: 'burn-out',
    title: "Don't Burn Yourself Out",
    description:
      'Feeling drained and overwhelmed by work is a tough spot. This post explores the dangers of pushing yourself too hard and hitting burnout.',
    date: 'April 29th, 2025',
    tags: ['Mental Health', 'Career'],
    image: '/assets/images/burnout.jpg',
    readingTime: 9,
    component: React.lazy(() => import('../posts/burnout')),
  },
  {
    slug: 'comparison',
    title: 'Comparing yourself to Others',
    description:
      'This post talks about not comparing yourself to others and unlocking greater self-acceptance by letting go of comparisons.',
    date: 'April 30th, 2025',
    tags: ['Mental Health', 'Self-Improvement'],
    image: '/assets/images/comparison.jpg',
    readingTime: 8,
    component: React.lazy(() => import('../posts/comparison')),
  },
  {
    slug: 'tailwindcss',
    title: 'Why I switched from SASS to TailwindCSS',
    description:
      'This post talks about why I switched over my styles from SASS to TailwindCSS in all my future projects.',
    date: 'May 2nd, 2025',
    tags: ['Web Development', 'Programming'],
    image: '/assets/images/tailwind.png',
    readingTime: 1,
    component: React.lazy(() => import('../posts/Tailwind')),
  },
  {
    slug: 'pride',
    title: 'Pride is the deadliest sin of all',
    description:
      'This post talks about how pride almost destroyed my entire life and how the journey toward humility helped rebuild what I lost',
    date: 'May 3rd, 2025',
    tags: ['Personal', 'Self-Improvement'],
    image: '/assets/images/pride.jpg',
    readingTime: 11,
    component: React.lazy(() => import('../posts/Pride')),
  },
  {
    slug: 'genesis',
    title: 'Genesis Update 0.9.3',
    description:
      'This post talks about production updates for the Genesis programming Language version 0.9.3',
    date: 'June 16th, 2025',
    tags: ['Programming', 'TypeScript'],
    image: '/assets/images/genesis.png',
    readingTime: 5,
    component: React.lazy(() => import('../posts/genv093')),
  },
  {
    slug: 'reactjs',
    title: 'React.js update after 1 year',
    description:
      'This post talks about my experience and overall feelings with the React.js library',
    date: 'June 23rd, 2025',
    tags: ['Web Development', 'React'],
    image: '/assets/images/React.webp',
    readingTime: 5,
    component: React.lazy(() => import('../posts/ReactUpdate')),
  },
  {
    slug: 'betrayal',
    title: 'Betrayal',
    description:
      'This post is a story on a betrayal I endured and how I overcame it, and so can you.',
    date: 'September 25th, 2025',
    tags: ['Personal', 'Relationships'],
    image: '/assets/images/betrayal.jpg',
    readingTime: 8,
    component: React.lazy(() => import('../posts/Betrayal')),
  },
  {
    slug: 'Love',
    title: 'Love',
    description:
      "This post is an introspective look at love, what it is, what it isn't, and learning to live fully even when love no longer stays.",
    date: 'October 5th, 2025',
    tags: ['Personal', 'Relationships'],
    image: '/assets/images/love.jpg',
    readingTime: 8,
    component: React.lazy(() => import('../posts/Love')),
  },
  {
    slug: 'healing',
    title: 'The Sound of Healing',
    description:
      "This post talks about a sound that follows heartbreak, not the echo of loss, but the whisper of something new growing in its place. That's the sound I learned to listen for.",
    date: 'October 7th, 2025',
    tags: ['Personal', 'Self-Improvement'],
    image: '/assets/images/healing.jpg',
    readingTime: 7,
    component: React.lazy(() => import('../posts/Healing')),
  },
  {
    slug: 'trauma',
    title: 'The Weight of Holding On',
    description:
      'This post is about understanding the pull of toxic love, the weight of staying out of fear, and the peace that comes when you finally choose yourself.',
    date: 'October 9th, 2025',
    tags: ['Personal', 'Relationships'],
    image: '/assets/images/trauma.jpg',
    readingTime: 5,
    component: React.lazy(() => import('../posts/trauma')),
  },
  {
    slug: 'right-or-wrong',
    title: 'What Makes Someone a Bad Person?',
    description:
      "This post challenges the idea of absolute morality by asking uncomfortable questions about judgment, justice, and human behavior. It explores whether 'good' and 'bad' are fixed truths, or just reflections of what society chooses to believe.",
    date: 'October 15th, 2025',
    tags: ['Personal', 'Philosophy'],
    image: '/assets/images/right-and-wrong.jpg',
    readingTime: 7,
    component: React.lazy(() => import('../posts/Badpeople')),
  },
  {
    slug: 'education',
    title: "Education isn't broken, it's Misunderstood",
    description:
      "This post counters the way we think about education. From failing grades to a passion for teaching, I share how real learning doesn't come from passing tests, it comes from curiosity, failure, and the courage to think differently.",
    date: 'October 17th, 2025',
    tags: ['Personal', 'Philosophy'],
    image: '/assets/images/education.jpg',
    readingTime: 9,
    component: React.lazy(() => import('../posts/Education')),
  },
  {
    slug: 'death',
    title: 'Before the Credits Roll',
    description:
      "This post asks what it truly means to live while knowing we'll die. It challenges the fear of mortality, celebrates the beauty of existence, and reminds us that our time here, brief as it may be, is the most precious thing we'll ever have.",
    date: 'October 25th, 2025',
    tags: ['Personal', 'Philosophy'],
    image: '/assets/images/death.jpg',
    readingTime: 9,
    component: React.lazy(() => import('../posts/Death')),
  },
  {
    slug: 'happiness',
    title: 'The Pursuit of Happiness',
    description:
      'This post explores the difference between chasing happiness and finding contentment, diving into the loneliness of pursuit, the fear of stillness, and the quiet peace that comes when we stop running from ourselves.',
    date: 'November 18th, 2025',
    tags: ['Personal', 'Philosophy'],
    image: '/assets/images/happiness.jpg',
    readingTime: 9,
    component: React.lazy(() => import('../posts/Happiness')),
  },
  // {
  //   slug: "gender",
  //   title: "Who Am I Without Your Expectations?",
  //   description:
  //     "This post dives into the emotional toll of gender roles, from suppressing feelings to losing yourself in a persona, and why breaking free from these expectations matters for our mental health.",
  //   date: "November 20th, 2025",
  //   tags: ["Personal", "Mental Health"],
  //   image: "/assets/images/gender.jpg",
  //   readingTime: 14,
  //   component: React.lazy(() => import("../posts/GenderWars")),
  // },
  {
    slug: 'thanksgiving',
    title: 'Happy Thanksgiving🧡🍂',
    description:
      'This post is a simple moment to pause and appreciate the people, memories, and growth that made this year meaningful.',
    date: 'November 27th, 2025',
    tags: ['Personal'],
    image: '/assets/images/thanksgiving.jpg',
    readingTime: 5,
    component: React.lazy(() => import('../posts/Thanksgiving')),
  },
  // {
  //   slug: "loud-dreams",
  //   title: "The Quiet Cost of Loud Dreams",
  //   description:
  //     "This post is a reminder that dreaming big means nothing without consistency, effort, and the willingness to show up on the hard days.",
  //   date: "January 14th, 2025",
  //   tags: ["Personal", "Self-Improvement", "Philosophy"],
  //   image: "/assets/images/hardwork.jpg",
  //   readingTime: 7,
  //   component: React.lazy(() => import("../posts/Hardwork")),
  // },
  {
    slug: 'loving-your-child',
    title: 'The Responsibility of Loving Your Child',
    description:
      'This post examines parenthood through the lens of love, identity, and expectation. Questioning what children truly need from the people raising them.',
    date: 'January 14th, 2026',
    tags: ['Personal', 'Mental Health', 'Philosophy'],
    image: '/assets/images/parenthood.jpg',
    readingTime: 11,
    component: React.lazy(() => import('../posts/Parent')),
  },
  {
    slug: 'family-betrayal',
    title: 'Waiting for the Storm to Apologize',
    description:
      'This post explores the quiet cost of staying loyal to people who hurt us, and the complicated line between love, obligation, and self-preservation. Through one story, it asks when family stops being a refuge and starts becoming a wound.',
    date: 'February 5th, 2026',
    tags: ['Personal', 'Mental Health', 'Philosophy'],
    image: '/assets/images/family.jpg',
    readingTime: 12,
    component: React.lazy(() => import('../posts/Family')),
  },
  {
    slug: 'bethany',
    title: 'Grace Is Not Conditional',
    description:
      'This post is about what happens when beliefs become conditions, and how easily compassion can be replaced by judgment. It is a reminder that love does not require agreement, only humility.',
    date: 'February 8th, 2026',
    tags: ['Personal', 'Mental Health', 'Philosophy'],
    image: '/assets/images/bethany.jpg',
    readingTime: 15,
    component: React.lazy(() => import('../posts/Bethany')),
  },
];
