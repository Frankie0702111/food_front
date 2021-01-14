// import Layout_admin from '@/layout/admin';
// /** When your routing table is too long, you can split it into small modules**/
// function loadView(view) {
//   return () => import(/* webpackChunkName: 'loadview/[request]' */ `@/views/admin/${view}`)
// }

// export const constantRoutes = [
//   // {
//   //   path: '/admin',
//   //   name: 'dashboard',
//   //   redirect: '/admin/dashboard',
//   //   meta: { title: '首頁', icon: 'fas fa-border-none'},
//   //   component: Layout_admin,
//   //   children: [
//   //     {
//   //       path: 'dashboard',
//   //       name: 'dashboard',
//   //       meta: { title: '首頁'},
//   //       component: loadView('Dashboard'),
//   //     } 
//   //   ]
//   // }, {
//   //   path: '/admin/information',
//   //   name: 'user',
//   //   redirect: '/admin/information/info',
//   //   meta: { title: '個人設定', icon: 'fas fa-user'},
//   //   component: Layout_admin,
//   //   children: [
//   //     {
//   //       path: 'info',
//   //       name: 'info',
//   //       meta: { title: '個人資訊'},
//   //       component: loadView('UserInfo'),
//   //     }, {
//   //       path: 'change_passwd',
//   //       name: 'change_passwd',
//   //       meta: { title: '修改密碼'},
//   //       component: loadView('Change_password'),
//   //     }, {
//   //       path: 'schedule',
//   //       name: 'schedule',
//   //       meta: { title: '個人班表設定'},
//   //       component: loadView('Schedule'),
//   //     }
//   //   ],
//   // }
// ]

// export const asyncRoutes = [
//   {
//     path: '/admin/user',
//     name: 'user',
//     component: Layout_admin,
//     meta: { title: '人事管理系統', icon: 'fa-users'},
//     children: [
//       {
//         path: 'login',
//         name: 'login',
//         meta: { title: '登入日誌' ,key: 'user_login'},
//         component: loadView('user/Login'),
//       },
//       {
//         path: 'list',
//         name: 'list',
//         meta: { title: '人員管理' ,key: 'user'},
//         component: loadView('user/List')
//       },
      
//       {
//         path: 'group',
//         name: 'group',
//         meta: { title: '部門管理' ,key: 'group'},
//         component: loadView('user/Group'),
//       },
//       {
//         path: 'role',
//         name: 'role',
//         meta: { title: '身分管理' ,key: 'group_role'},
//         component: loadView('user/Role'),
//       },      
//       {
//         path: 'class_setting',
//         name: 'class_setting',
//         meta: { title: '設定人員班別' ,key: 'user_class'},
//         component: loadView('user/ClassSetting'),
//       },
//       {
//         path: 'class_calendar_setting',
//         name: 'class_calendar_setting',
//         meta: { title: '設定人員班表' ,key: 'user_leave'},
//         component: loadView('user/ClassCalendarSetting'),
//       },
//     ]
//   },
//   {
//     path: '/admin/user',
//     name: 'report',
//     redirect: '/admin/user/punch_report',
//     component: Layout_admin,
//     meta: { title: '報表系統', icon: 'fa-table'},
//     children: [
//       {
//         path: 'punch_report',
//         name: 'punch_report',
//         meta: { title: '打卡報表' ,key: 'user_report'},
//         component: loadView('user/PunchReport'),
//       },{
//         path: 'department_schedule',
//         name: 'department_schedule',
//         meta: { title: '部門班表' ,key: 'user_report'},
//         component: loadView('user/DepartmentSchedule'),
//       },{
//         path: 'excel_schedule',
//         name: 'excel_schedule',
//         meta: { title: '班表Excel' ,key: 'user_excel'},
//         component: loadView('user/ClassExcel'),
//       },
//     ]
//   },
//   {
//     path: '/admin/user',
//     name: 'check',
//     redirect: '/admin/user/sing_off',
//     component: Layout_admin,
//     meta: { title: '簽核系統', icon: 'fa-check'},
//     children: [
//       {
//         path: 'sing_off',
//         name: 'sing_off',
//         meta: { title: '請休假申請' ,key: 'order'},
//         component: loadView('user/SignOff'),
//       },{
//         path: 'announcement',
//         name: 'announcement',
//         meta: { title: '公告' ,key: 'announcement'},
//         component: loadView('user/Announcement'),
//       },
//     ]
//   },
// ];

// export default constantRoutes
