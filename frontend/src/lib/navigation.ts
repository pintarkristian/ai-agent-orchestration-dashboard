export interface NavigationItem {
  label: string;
  href: string;
  description: string;
}

export const navigationItems: NavigationItem[] = [
  {
    label: 'Dashboard',
    href: '/',
    description: 'Project overview and API status',
  },
  {
    label: 'Run Workflow',
    href: '/workflows/run',
    description: 'Prepare a new orchestration request',
  },
  {
    label: 'History',
    href: '/workflows',
    description: 'Review saved workflow runs',
  },
];
