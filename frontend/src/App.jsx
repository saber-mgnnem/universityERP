// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from '@/contexts/AuthContext'
import { ProtectedRoute } from '@/components/ProtectedRoute'

// Public pages
import { Home } from '@/pages/Home'
import { Login } from '@/pages/Login'
import { Contact } from '@/pages/Contact'
import { Pricing } from '@/pages/Pricing'

// Admin dashboard
import AdminLayout from '@/pages/dashboard/admin/AdminLayout'
import DashboardHome from '@/pages/dashboard/admin/DashboardHome'
import AdminUsers from '@/pages/dashboard/admin/userManagement/UserManagementPage'
import AdminSettings from '@/pages/dashboard/admin/system-settings/SystemSettingsPage'
import AdminAnalytics from '@/pages/dashboard/admin/analytics/AnalyticsPage'
import LogsPage from '@/pages/dashboard/admin/logs/LogsPage'
import SecurityPage from '@/pages/dashboard/admin/security/SecurityPage'
import DatabasePage from '@/pages/dashboard/admin/database/DatabasePage'


import RectorLayout from '@/pages/dashboard/rector/RectorLayout'
import RectorDashboardHome from '@/pages/dashboard/rector/DashboardHome'
import RectorAnalyticsPage from '@/pages/dashboard/rector/analytics/AnalyticsPage'
import RectorBudgetPage from '@/pages/dashboard/rector/budget/BudgetPage'
import RectorDepartmentsPage from '@/pages/dashboard/rector/departments/DepartmentsPage'
import RectorAcademicSessionsPage from '@/pages/dashboard/rector/performance/AcademicSessionsPage'
import RectorReportsPage from '@/pages/dashboard/rector/reports/ReportsPage'


import DepartmentLayout from '@/pages/dashboard/department/DepartmentLayout'
import DepartmentDashboardHome from '@/pages/dashboard/department/DashboardHome'
import DepartmentBudgetPage from '@/pages/dashboard/department/budget/BudgetPage'
import DepartmentCoursesPage from '@/pages/dashboard/department/courses/CoursesPage'
import DepartmentCourseOfferingPage from '@/pages/dashboard/department/CourseOffering/CourseOfferingPage'
import DepartmentReportsPage from '@/pages/dashboard/department/reports/ReportsPage'
import DepartmentStudentsPage from '@/pages/dashboard/department/students/StudentsPage'


import HrLayout from '@/pages/dashboard/hr/HRLayout'
import HrDashboardHome from '@/pages/dashboard/hr/DashboardHome'
import HrLeaveManagementPage from '@/pages/dashboard/hr/leave-management/LeaveManagementPage'
import HrPayrollPage from '@/pages/dashboard/hr/payroll/PayrollPage'
import HrRecruitmentPage from '@/pages/dashboard/hr/recruitment/RecruitmentPage'
import StaffProfilesPage from '@/pages/dashboard/hr/staff-directory/StaffProfilesPage'
import HRContractsPage from '@/pages/dashboard/hr/contracts/ContractsPage'
import HRAttendancePage from '@/pages/dashboard/hr/attendance/AttendancePage'
import HRDepartmentsPage from '@/pages/dashboard/hr/departments/DepartmentsPage'


import ProfessorLayout from '@/pages/dashboard/professor/ProfessorLayout'
import ProfessorDashboardHome from '@/pages/dashboard/professor/DashboardHome'
import ProfessorAttendancePage from '@/pages/dashboard/professor/attendance/AttendancePage'
import ProfessorGradesPage from '@/pages/dashboard/professor/grades/GradesPage'
import ProfessorMaterialsPage from '@/pages/dashboard/professor/materials/MaterialsPage'
import ProfessorMyCoursesPage from '@/pages/dashboard/professor/my-courses/MyCoursesPage'
import ProfessorSchedulePage from '@/pages/dashboard/professor/schedule/SchedulePage'
import ProfessorLeaveManagementPage from '@/pages/dashboard/professor/leave-management/LeaveManagementPage'

import StudentLayout from '@/pages/dashboard/student/StudentLayout'
import StudentDashboardHome from '@/pages/dashboard/student/DashboardHome'
import StudentAIAdvisorPage from '@/pages/dashboard/student/ai-advisor/AIAdvisorPage'
import StudentEnrollmentPage from '@/pages/dashboard/student/enrollment/EnrollmentPage'
import StudentMyGradesPage from '@/pages/dashboard/student/my-grades/MyGradesPage'
import StudentPaymentsPage from '@/pages/dashboard/student/payments/PaymentsPage'
import StudentTimetablePage from '@/pages/dashboard/student/timetable/TimetablePage'
import StudentCoursesPage from '@/pages/dashboard/student/courses/StudentCoursesPage'




function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/pricing" element={<Pricing />} />

          {/* Admin protected routes */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            {/* Default route for /admin */}
            <Route index element={<DashboardHome />} />
            <Route path="dashboard" element={<DashboardHome />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="settings" element={<AdminSettings />} />
            <Route path="analytics" element={<AdminAnalytics />} />
            <Route path="security" element={<SecurityPage />} />
            <Route path="database" element={<DatabasePage />} />
            <Route path="logs" element={<LogsPage />} />

            
          </Route>



          <Route
            path="/rector"
            element={
              <ProtectedRoute>
                <RectorLayout />
              </ProtectedRoute>
            }
          >
            {/* Default route for /admin */}
            <Route index element={<RectorDashboardHome />} />
            <Route path="dashboard" element={<RectorDashboardHome />} />
            <Route path="analytics" element={<RectorAnalyticsPage />} />
            <Route path="AcademicSessionsPage" element={<RectorAcademicSessionsPage />} />
            <Route path="reports" element={<RectorReportsPage />} />
            <Route path="departments" element={<RectorDepartmentsPage />} />
            <Route path="budget" element={<RectorBudgetPage />} />

            
          </Route> 
          {/* Other protected dashboards */}
          <Route
            path="/department"
            element={
              <ProtectedRoute>
                <DepartmentLayout />
              </ProtectedRoute>
            }
          >
            {/* Default route for /admin */}
            <Route index element={<DepartmentDashboardHome />} />
            <Route path="dashboard" element={<DepartmentDashboardHome />} />
            <Route path="analytics" element={<DepartmentBudgetPage />} />
            <Route path="courses" element={<DepartmentCoursesPage />} />
            <Route path="CourseOffering" element={<DepartmentCourseOfferingPage />} />
            <Route path="reports" element={<DepartmentReportsPage />} />
            <Route path="student" element={<DepartmentStudentsPage />} />


            
          </Route> 
  
          <Route
            path="/hr"
            element={
              <ProtectedRoute>
                <HrLayout />
              </ProtectedRoute>
            }
          >
            {/* Default route for /admin */}
            <Route index element={<HrDashboardHome />} />
            <Route path="dashboard" element={<HrDashboardHome />} />
            <Route path="staff" element={<StaffProfilesPage />} />
            <Route path="contracts" element={<HRContractsPage />} />
            <Route path="leave" element={<HrLeaveManagementPage />} />
            <Route path="recruitment" element={<HrRecruitmentPage />} />
            <Route path="attendance" element={<HRAttendancePage />} />
            <Route path="departments" element={<HRDepartmentsPage />} />
            <Route path="payroll" element={<HrPayrollPage />} />


            
          </Route> 
          <Route
            path="/professor"
            element={
              <ProtectedRoute>
                <ProfessorLayout />
              </ProtectedRoute>
            }
          >
            {/* Default route for /admin */}
            <Route index element={<RectorDashboardHome />} />
            <Route path="dashboard" element={<ProfessorDashboardHome />} />
            <Route path="courses" element={<ProfessorMyCoursesPage />} />
            <Route path="grades" element={<ProfessorGradesPage />} />
            <Route path="attendance" element={<ProfessorAttendancePage />} />
            <Route path="schedule" element={<ProfessorSchedulePage />} />
            <Route path="materials" element={<ProfessorMaterialsPage />} />
            <Route path="leave" element={<ProfessorLeaveManagementPage />} />


            
          </Route> 
          <Route
            path="/student"
            element={
              <ProtectedRoute>
                <StudentLayout />
              </ProtectedRoute>
            }
          >
            {/* Default route for /admin */}
            <Route index element={<RectorDashboardHome />} />
            <Route path="dashboard" element={<StudentDashboardHome />} />
            <Route path="enrollment" element={<StudentEnrollmentPage />} />
            <Route path="grades" element={<StudentMyGradesPage />} />
            <Route path="timetable" element={<StudentTimetablePage />} />
            <Route path="advisor" element={<StudentAIAdvisorPage />} />
            <Route path="courses" element={<StudentCoursesPage />} />
            <Route path="payments" element={<StudentPaymentsPage />} />

            
          </Route> 

          {/* Fallback redirects */}
          <Route path="/dashboard" element={<Navigate to="/" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App