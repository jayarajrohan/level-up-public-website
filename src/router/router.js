export const dashboardChildrenRoutes = [
  {
    name: "Dashboard",
    path: "/admin/dashboard",
    component: () => import("@/views/Admin/Dashboard.vue"),
    meta: { requiresAuth: true },
    children: [
      {
        name: "Students",
        path: "/admin/dashboard/students",
        component: () => import("@/views/Admin/Students/Students.vue"), //
        meta: { requiresAuth: true },
        childSelectableList: ["Create Student", "Edit Student"],
        children: [
          {
            name: "Create Student",
            path: "/admin/dashboard/students/create",
            component: () => import("@/views/Admin/Students/CreateStudent.vue"),
            hideFromSideBar: true,
            meta: { requiresAuth: true },
          },

          {
            name: "Edit Student",
            path: "/admin/dashboard/students/edit",
            component: () => import("@/views/Admin/Students/EditStudent.vue"),
            hideFromSideBar: true,
            meta: { requiresAuth: true },
          },
        ],
      },
      {
        name: "Tutors",
        path: "/admin/dashboard/tutors",
        component: () => import("@/views/Admin/Tutors/Tutors.vue"), //
        meta: { requiresAuth: true },
        childSelectableList: ["Create Tutor", "Edit Tutor"],
        children: [
          {
            name: "Create Tutor",
            path: "/admin/dashboard/tutors/create",
            component: () => import("@/views/Admin/Tutors/CreateTutor.vue"),
            hideFromSideBar: true,
            meta: { requiresAuth: true },
          },

          {
            name: "Edit Tutor",
            path: "/admin/dashboard/tutors/edit",
            component: () => import("@/views/Admin/Tutors/EditTutor.vue"),
            hideFromSideBar: true,
            meta: { requiresAuth: true },
          },
        ],
      },
      {
        name: "Courses",
        path: "/admin/dashboard/courses",
        component: () => import("@/views/Admin/Courses/Courses.vue"), //
        meta: { requiresAuth: true },
        childSelectableList: ["Create Course", "Edit Course"],
        children: [
          {
            name: "Create Course",
            path: "/admin/dashboard/courses/create",
            component: () => import("@/views/Admin/Courses/CreateCourse.vue"),
            hideFromSideBar: true,
            meta: { requiresAuth: true },
          },

          {
            name: "Edit Course",
            path: "/admin/dashboard/courses/edit",
            component: () => import("@/views/Admin/Courses/EditCourse.vue"),
            hideFromSideBar: true,
            meta: { requiresAuth: true },
          },
        ],
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
    path: "/admin/dashboard-home",
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
    path: "/tutor",
    name: "Tutor",
    component: () => import("@/views/Tutor/Tutor.vue"),
    meta: { requiresAuth: true },
    children: [
      {
        name: "Tutor Viewed Students",
        path: "/tutor/students-viewed",
        component: () => import("@/views/Tutor/ViewersScreen.vue"),
      },
      {
        name: "Tutor Profile",
        path: "/tutor/profile",
        component: () => import("@/views/Tutor/ProfileDetail.vue"),
      },
    ],
  },
  {
    path: "/student",
    name: "Student",
    component: () => import("@/views/Student/Student.vue"),
    meta: { requiresAuth: true },
    children: [
      {
        name: "Student Profile",
        path: "/student/profile",
        component: () => import("@/views/Student/StudentProfile.vue"),
      },
      {
        name: "Search Tutor",
        path: "/student/search-tutor",
        component: () => import("@/views/Student/SearchTutor.vue"),
      },
      {
        name: "Student Tutor View",
        path: "/student/tutor-details",
        component: () => import("@/views/Student/ViewTutorDetail.vue"),
      },
    ],
  },
];
export default routes;
