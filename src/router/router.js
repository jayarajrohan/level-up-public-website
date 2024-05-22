export const dashboardChildrenRoutes = [
  {
    name: "Dashboard",
    path: "/dashboard",
    component: () => import("@/views/Admin/Dashboard.vue"),
    meta: { requiresAuth: true },
  },

  {
    name: "Students",
    path: "/students",
    component: () => import("@/views/Admin/Students/Students.vue"), //
    meta: { requiresAuth: true },
    childSelectableList: ["Create Student", "Edit Student"],
    children: [
      {
        name: "Create Student",
        path: "/students/create-student",
        component: () => import("@/views/Admin/Students/CreateStudent.vue"),
        hideFromSideBar: true,
        meta: { requiresAuth: true },
      },

      {
        name: "Edit Student",
        path: "/students/edit-student",
        component: () => import("@/views/Admin/Students/EditStudent.vue"),
        hideFromSideBar: true,
        meta: { requiresAuth: true },
      },
    ],
  },
  {
    name: "Tutors",
    path: "/tutors",
    component: () => import("@/views/Admin/Tutors/Tutors.vue"), //
    meta: { requiresAuth: true },
    childSelectableList: ["Create Tutor", "Edit Tutor"],
    children: [
      {
        name: "Create Tutor",
        path: "/tutors/create-tutor",
        component: () => import("@/views/Admin/Tutors/CreateTutor.vue"),
        hideFromSideBar: true,
        meta: { requiresAuth: true },
      },

      {
        name: "Edit Tutor",
        path: "/tutors/edit-tutor",
        component: () => import("@/views/Admin/Tutors/EditTutor.vue"),
        hideFromSideBar: true,
        meta: { requiresAuth: true },
      },
    ],
  },
  {
    name: "Courses",
    path: "/courses",
    component: () => import("@/views/Admin/Courses/Courses.vue"), //
    meta: { requiresAuth: true },
    childSelectableList: ["Create Course", "Edit Course"],
    children: [
      {
        name: "Create Course",
        path: "/courses/create-course",
        component: () => import("@/views/Admin/Courses/CreateCourse.vue"),
        hideFromSideBar: true,
        meta: { requiresAuth: true },
      },

      {
        name: "Edit Course",
        path: "/courses/edit-course",
        component: () => import("@/views/Admin/Courses/EditCourse.vue"),
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
    component: () => import("@/views/Login.vue"),
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
  {
    name: "ViewersScreen",
    path: "/tutor/viewersScreen",
    component: () => import("@/views/Tutor/ViewersScreen.vue"),
  },
  {
    name: "ProfileScreen",
    path: "/tutor/profileScreen",
    component: () => import("@/views/Tutor/ProfileDetail.vue"),
  },
  {
    name: "ProfileScreen",
    path: "/student/profileScreen",
    component: () => import("@/views/Student/StudentProfile.vue"),
  },
  {
    name: "SearchTutorScreen",
    path: "/student/searchTutor",
    component: () => import("@/views/Student/SearchTutor.vue"),
  },
  {
    name: "TutorDetailViewScreen",
    path: "/student/tutorDetailViewScreen",
    component: () => import("@/views/Student/ViewTutorDetail.vue"),
  },
];
export default routes;
