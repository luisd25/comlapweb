export const PAGES_MENU = [
  {
    path: 'pages',
    children: [
      {
        path: 'dashboard',
        data: {
          menu: {
            title: 'Inicio',
            icon: 'ion-android-home',
            selected: false,
            expanded: false,
            order: 0
          }
        }
      },
      {
        path: 'profile',
        data: {
          menu: {
            title: 'Profile',
            icon: 'ion-edit',
            selected: false,
            expanded: false,
            order: 150,
          }
        },
        children: [
          {
            path: 'layouts',
            data: {
              menu: {
                title: 'User Profile',
              }
            }
          }
        ]
      },
      {
        path: 'maps',
        data: {
          menu: {
            title: 'Hospital',
            icon: 'ion-ios-location-outline',
            selected: false,
            expanded: false,
            order: 600,
          }
        },
        children: [
          {
            path: 'googlemaps',
            data: {
              menu: {
                title: 'Hospitales',
              }
            }
          },
          {
            path: 'appointment',
            data: {
              menu: {
                title: 'Citas',
              }
            }
          }
        ]
      }
    ]
  }
];