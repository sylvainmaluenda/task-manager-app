import { CircleCheckBig, FileText, Folders } from 'lucide-react';
import type { ComponentType } from 'react';

export type Section = {
  id: string;
  label: string;
  icon: ComponentType;
  path: string;
};

export const dashboardSections: Section[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: FileText,
    path: '/dashboard',
  },
  {
    id: 'tasks',
    label: 'Tasks',
    icon: CircleCheckBig,
    path: '/dashboard/tasks',
  },
  {
    id: 'categories',
    label: 'Categories',
    icon: Folders,
    path: '/dashboard/categories',
  },
];
