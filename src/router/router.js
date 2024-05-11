export const dashboardChildrenRoutes = [
  {
    name: "Dashboard",
    path: "/dashboard",
    component: () => import("@/components/Admin/Dashboard.vue"),
    meta: { requiresAuth: true },
  },

  {
    name: "Students",
    path: "/students",
    component: () => import("@/components/Admin/Students/Students.vue"), //
    meta: { requiresAuth: true },
    childSelectableList: ["Create Student", "Edit Student"],
    children: [
      {
        name: "Create Student",
        path: "/students/create-student",
        component: () =>
          import("@/components/Admin/Students/CreateStudent.vue"),
        hideFromSideBar: true,
        meta: { requiresAuth: true },
      },

      {
        name: "Edit Student",
        path: "/students/edit-student",
        component: () => import("@/components/Admin/Students/EditStudent.vue"),
        hideFromSideBar: true,
        meta: { requiresAuth: true },
      },
    ],
  },
  {
    name: "Tutors",
    path: "/tutors",
    component: () => import("@/components/Admin/Tutors/Tutors.vue"), //
    meta: { requiresAuth: true },
    childSelectableList: ["Create Tutor", "Edit Tutor"],
    children: [
      {
        name: "Create Tutor",
        path: "/tutors/create-tutor",
        component: () => import("@/components/Admin/Tutors/CreateTutor.vue"),
        hideFromSideBar: true,
        meta: { requiresAuth: true },
      },

      {
        name: "Edit Tutor",
        path: "/tutors/edit-tutor",
        component: () => import("@/components/Admin/Tutors/EditTutor.vue"),
        hideFromSideBar: true,
        meta: { requiresAuth: true },
      },
    ],
  },
  {
    name: "Courses",
    path: "/courses",
    component: () => import("@/components/Admin/Courses/Courses.vue"), //
    meta: { requiresAuth: true },
    childSelectableList: ["Create Course", "Edit Course"],
    children: [
      {
        name: "Create Course",
        path: "/courses/create-course",
        component: () => import("@/components/Admin/Courses/CreateCourse.vue"),
        hideFromSideBar: true,
        meta: { requiresAuth: true },
      },

      {
        name: "Edit Course",
        path: "/courses/edit-course",
        component: () => import("@/components/Admin/Courses/EditCourse.vue"),
        hideFromSideBar: true,
        meta: { requiresAuth: true },
      },
    ],
  },
];

const routes = [
  {
    path: "/",
    name: "Login",
    component: () => import("@/components/Login.vue"),
  },

  {
    path: "/dashboard-home",
    name: "Dashboard Home",
    component: () => import("@/shared/layout.vue"),
    meta: { requiresAuth: true },
    children: [
      ...dashboardChildrenRoutes.map((route) => {
        return {
          name: route.name,
          path: route.path,
          component: route.component,
          children: route?.children,
        };
      }),
    ],
  },
];
export default routes;
