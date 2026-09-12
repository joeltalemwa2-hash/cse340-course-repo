// data/projects.js
// Placeholder service project data rendered on the Service Projects page.

const projects = [
  {
    id: 'garden-build-days',
    name: 'Community Garden Build Days',
    category: 'Environmental',
    accent: 'moss',
    organization: 'Riverside Community Garden',
    schedule: 'Saturdays, twice a month',
    description:
      'Volunteers build raised beds, turn compost, and expand the plots that supply the food pantry.',
  },
  {
    id: 'reading-buddies',
    name: 'Weekend Reading Buddies',
    category: 'Educational',
    accent: 'denim',
    organization: 'Bright Path Tutoring',
    schedule: 'Sunday afternoons',
    description:
      'One-on-one reading sessions with elementary students, matched to their grade level and interests.',
  },
  {
    id: 'neighborhood-food-drive',
    name: 'Neighborhood Food Drive',
    category: 'Community Service',
    accent: 'brick',
    organization: 'Helping Hands Pantry',
    schedule: 'Last weekend of each season',
    description:
      'A door-to-door and drop-off collection that restocks the pantry shelves before they run low.',
  },
  {
    id: 'free-clinic-days',
    name: 'Free Clinic Days',
    category: 'Health and Wellness',
    accent: 'rose',
    organization: 'Wellness Bridge Clinic',
    schedule: 'First Friday of each month',
    description:
      'Blood pressure checks, basic screenings, and short wellness workshops open to walk-ins.',
  },
];

export const getProjects = async () => projects;
