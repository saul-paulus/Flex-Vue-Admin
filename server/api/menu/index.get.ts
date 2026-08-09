import { defineEventHandler } from 'h3';

export default defineEventHandler((_event) => {
  return [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: 'bi-grid-fill',
      route: '/dashboard',
      badge: 'MAIN',
      badgeVariant: 'primary',
    },
    {
      id: 'users',
      label: 'Users',
      icon: 'bi-people',
      children: [
        { id: 'users-list', label: 'Users List', route: '/users' },
        { id: 'users-view', label: 'User View', route: '/users/view' },
        { id: 'users-roles', label: 'Roles & Permissions', route: '/users/roles' },
      ],
    },
  ];
});
