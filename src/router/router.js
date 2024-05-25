export const dashboardChildrenRoutes = [
  {
    name: "Dashboard",
    path: "/admin/dashboard",
    component: () => import("@/views/Admin/Dashboard.vue"),
    children: [
      {
        name: "Students",
        path: "/admin/dashboard/students",
        component: () => import("@/views/Admin/Students/Students.vue"),
        childSelectableList: ["Create Student", "Edit Student"],
        children: [
          {
            name: "Create Student",
            path: "/admin/dashboard/students/create",
            component: () => import("@/views/Admin/Students/CreateStudent.vue"),
            hideFromSideBar: true,
          },

          {
            name: "Edit Student",
            path: "/admin/dashboard/students/edit/:studentId",
            component: () => import("@/views/Admin/Students/EditStudent.vue"),
            hideFromSideBar: true,
          },
        ],
      },
      {
        name: "Tutors",
        path: "/admin/dashboard/tutors",
        component: () => import("@/views/Admin/Tutors/Tutors.vue"),
        childSelectableList: ["Create Tutor", "Edit Tutor", "View Tutor"],
        children: [
          {
            name: "Create Tutor",
            path: "/admin/dashboard/tutors/create",
            component: () => import("@/views/Admin/Tutors/CreateTutor.vue"),
            hideFromSideBar: true,
          },

          {
            name: "Edit Tutor",
            path: "/admin/dashboard/tutors/edit/:tutorId",
            component: () => import("@/views/Admin/Tutors/EditTutor.vue"),
            hideFromSideBar: true,
          },

          {
            name: "View Tutor",
            path: "/admin/dashboard/tutors/view/:tutorId",
            component: () => import("@/views/Admin/Tutors/ViewTutor.vue"),
            hideFromSideBar: true,
          },
        ],
      },
      {
        name: "Courses",
        path: "/admin/dashboard/courses",
        component: () => import("@/views/Admin/Courses/Courses.vue"),
        childSelectableList: ["Create Course", "Edit Course"],
        children: [
          {
            name: "Create Course",
            path: "/admin/dashboard/courses/create",
            component: () => import("@/views/Admin/Courses/CreateCourse.vue"),
            hideFromSideBar: true,
          },

          {
            name: "Edit Course",
            path: "/admin/dashboard/courses/edit/:courseId",
            component: () => import("@/views/Admin/Courses/EditCourse.vue"),
            hideFromSideBar: true,
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
        path: "/student/tutor-details/:tutorId",
        component: () => import("@/views/Student/ViewTutorDetail.vue"),
      },
    ],
  },
  {
    path: "*",
    component: () => import("@/views/Login.vue"),
    redirect: "/",
  },
];
export default routes;
