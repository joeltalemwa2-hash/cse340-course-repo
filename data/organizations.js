// data/organizations.js
// Placeholder organization data rendered on the Organizations page.

const organizations = [
  {
    id: 'riverside-community-garden',
    name: 'Riverside Community Garden',
    category: 'Environmental',
    accent: 'moss',
    image: '/images/garden.svg',
    description:
      'Grows fresh produce for neighborhood food pantries and teaches sustainable gardening to local schools.',
  },
  {
    id: 'bright-path-tutoring',
    name: 'Bright Path Tutoring',
    category: 'Educational',
    accent: 'denim',
    image: '/images/tutoring.svg',
    description:
      'Pairs volunteer tutors with elementary students who need extra support in reading and math.',
  },
  {
    id: 'helping-hands-pantry',
    name: 'Helping Hands Pantry',
    category: 'Community Service',
    accent: 'brick',
    image: '/images/pantry.svg',
    description:
      'Packs and distributes weekly grocery boxes for families facing food insecurity.',
  },
  {
    id: 'wellness-bridge-clinic',
    name: 'Wellness Bridge Clinic',
    category: 'Health and Wellness',
    accent: 'rose',
    image: '/images/clinic.svg',
    description:
      'Offers free health screenings and wellness workshops in underserved neighborhoods.',
  },
];

export const getOrganizations = async () => organizations;
