export const menuTree = [
  {
    title: 'Profile',
    link: '/profile',
    component: 'Profile',
    children: [
      {
        title: 'Privacy & Privacy',
        link: '/profile/privacy',
        component: 'Privacy'
      }
    ]
  },
  {
    title: 'Messages',
    link: '/messages',
    component: 'Home'
  },
  {
    title: 'Settings',
    link: '/settings',
    component: 'Home',
    children: [
      {
        title: 'Internet',
        link: '/settings/internet',
        component: 'Home'
      },
      {
        title: 'Notifications',
        link: '/settings/notifications',
        component: 'Home'
      }
    ]
  },
  {
    title: 'Help',
    link: '/help',
    component: 'Home'
  },
  {
    title: 'Logout',
    link: '/logout',
    component: 'Home'
  }
];
