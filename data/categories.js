// data/categories.js
// Placeholder category data for the Service Project Categories page.
// In a later assignment this will likely be replaced by a real database call,
// which is why it is already exposed through an async function.

const categories = [
  {
    id: 'environmental',
    name: 'Environmental',
    accent: 'moss',
    description: 'Projects that protect green spaces, reduce waste, and teach sustainable habits.',
  },
  {
    id: 'educational',
    name: 'Educational',
    accent: 'denim',
    description: 'Tutoring, mentoring, and literacy projects that support learners of every age.',
  },
  {
    id: 'community-service',
    name: 'Community Service',
    accent: 'brick',
    description: 'General neighborhood support, from food drives to clean-up days.',
  },
  {
    id: 'health-and-wellness',
    name: 'Health and Wellness',
    accent: 'rose',
    description: 'Screenings, workshops, and outreach that help neighbors stay healthy.',
  },
];

export const getCategories = async () => categories;
