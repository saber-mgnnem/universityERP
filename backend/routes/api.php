<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\Api\StudentProfileController;
use App\Http\Controllers\Api\StaffProfileController;
use App\Http\Controllers\Api\CourseController;
use App\Http\Controllers\Api\CourseOfferingController;
use App\Http\Controllers\Api\AcademicSessionController;
use App\Http\Controllers\Api\SemesterController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\DepartmentController;
use App\Http\Controllers\Api\DepartmentBudgetController;
use App\Http\Controllers\Api\EnrollmentController;
use App\Http\Controllers\Api\TimetableController;
use App\Http\Controllers\Api\CourseMaterialController;
use App\Http\Controllers\Api\MaterialController;
use App\Http\Controllers\Api\StudentPaymentController;
use App\Http\Controllers\Api\AttendanceRecordController;
use App\Http\Controllers\Api\CourseGradeController;

use App\Http\Controllers\Api\EmploymentContractController;
use App\Http\Controllers\Api\LeaveRequestController;
use App\Http\Controllers\Api\JobPostingController;
use App\Http\Controllers\Api\JobApplicationController;
use App\Http\Controllers\Api\StaffAttendanceController;
use App\Http\Controllers\Api\PayrollRecordController;


/*
|--------------------------------------------------------------------------
| 🔐 AUTH ROUTES
|--------------------------------------------------------------------------
*/
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::middleware(['auth:api', 'role:admin'])->group(function () {
    Route::get('/users', [UserController::class, 'index']);
    Route::post('/users', [UserController::class, 'store']);
    Route::get('/users/{id}', [UserController::class, 'show']);
    Route::put('/users/{id}', [UserController::class, 'update']);
    Route::delete('/users/{id}', [UserController::class, 'destroy']);
});
// public data (or shared auth users)
Route::middleware('auth:api')->group(function () {
    Route::get('/users', [UserController::class, 'index']);
});

// rector-only admin system
Route::middleware(['auth:api','role:rector'])->group(function () {
    Route::apiResource('departments', DepartmentController::class);
    Route::apiResource('department-budgets', DepartmentBudgetController::class);
    Route::apiResource('academic-sessions', AcademicSessionController::class);
    Route::apiResource('semesters', SemesterController::class);
});

Route::middleware(['auth:api'])->group(function () {
    Route::apiResource('courses', CourseController::class);
        Route::apiResource('departments', DepartmentController::class);

});
Route::middleware(['auth:api'])->group(function () {

    Route::apiResource('course-offerings', CourseOfferingController::class);
    Route::get('/professor/course-offerings', [CourseOfferingController::class, 'professorOfferings']);
    Route::get('professor-schedule', [CourseOfferingController::class, 'professorSchedule']);
        Route::get('professors', [CourseOfferingController::class, 'professors']);
        Route::get('current-semesters', [CourseOfferingController::class, 'currentSemesters']);
        Route::get('/students', [UserController::class, 'students']);
        Route::get('/dedepartments', [DepartmentController::class, 'index']);
        Route::put('/students/{id}/assign-department', [StudentProfileController::class, 'assignDepartment']);
});

Route::middleware(['auth:api','role:professor'])->group(function () {
        Route::get('/professor/offerings', function () {
            return \App\Models\CourseOffering::with(['course'])
                ->where('instructor_id', auth()->id())
                ->get();
        });
    Route::get('/materials', function () {
        return \App\Models\CourseMaterial::with('courseOffering.course')
            ->whereHas('courseOffering', function ($q) {
                $q->where('instructor_id', auth()->id());
            })
            ->get();
    });
    Route::get('/materials/{offeringId}', [CourseMaterialController::class, 'index']);
    Route::post('/materials', [CourseMaterialController::class, 'store']);
    Route::put('/materials/{id}', [CourseMaterialController::class, 'update']);
    Route::delete('/materials/{id}', [CourseMaterialController::class, 'destroy']);
      Route::get('/attendance', [AttendanceRecordController::class, 'index']);
    Route::get('/enrolled-students', [AttendanceRecordController::class, 'enrolledStudents']);
    Route::post('/attendance', [AttendanceRecordController::class, 'store']);
    Route::put('/attendance/{id}', [AttendanceRecordController::class, 'update']);
    Route::delete('/attendance/{id}', [AttendanceRecordController::class, 'destroy']);
  Route::post('/course-grades', [CourseGradeController::class, 'store']);
Route::put('/course-grades/{id}', [CourseGradeController::class, 'update']);
Route::delete('/course-grades/{id}', [CourseGradeController::class, 'destroy']);
 // PROFESSOR ONLY (new)
    Route::get('/my-leave-requests', [LeaveRequestController::class, 'myRequests']);

    // create leave (both HR & staff if needed)
    Route::post('/my-leave-requests', [LeaveRequestController::class, 'store']);
});


Route::middleware(['auth:api','role:student'])->group(function () {

    Route::get('/student-offerings', [CourseOfferingController::class, 'studentOfferings']);

    Route::get('/enrollments', [EnrollmentController::class, 'index']);
    Route::post('/enrollments', [EnrollmentController::class, 'store']);
    Route::delete('/enrollments/{id}', [EnrollmentController::class, 'destroy']);
    Route::get('/student-timetable', [TimetableController::class, 'studentTimetable']);
    Route::get('/student/courses/{offeringId}/materials', [CourseMaterialController::class, 'studentindex']);
    Route::post('/student/materials/{id}/complete',[MaterialController::class, 'markDone']);
    Route::get('/student/materials/completed',[MaterialController::class, 'getCompleted']);
    Route::get('/student/payments', [StudentPaymentController::class, 'index']);
    Route::post('/student/payments/stripe-session', [StudentPaymentController::class, 'createStripeSession']);
    Route::get('/student/payments/{id}/receipt', [StudentPaymentController::class, 'receipt']);
    Route::get('/student/grades', [CourseGradeController::class, 'myGrades']);
});
    Route::post('/stripe/webhook', [StudentPaymentController::class, 'stripeWebhook']);

/*
|--------------------------------------------------------------------------
| 🏫 ACADEMIC SESSIONS
|--------------------------------------------------------------------------
*/

// Everyone authenticated can view
Route::get('/sessions', [AcademicSessionController::class, 'index']);
Route::get('/sessions/{id}', [AcademicSessionController::class, 'show']);

// Only admin can manage
Route::middleware('role:admin')->group(function () {
    Route::post('/sessions', [AcademicSessionController::class, 'store']);
    Route::put('/sessions/{id}', [AcademicSessionController::class, 'update']);
    Route::delete('/sessions/{id}', [AcademicSessionController::class, 'destroy']);
});
/*
|--------------------------------------------------------------------------
| 📅 SEMESTERS
|--------------------------------------------------------------------------
*/

// Everyone authenticated can view
Route::get('/semesters', [SemesterController::class, 'index']);
Route::get('/semesters/{id}', [SemesterController::class, 'show']);

// Only admin can manage
Route::middleware('role:admin')->group(function () {
    Route::post('/semesters', [SemesterController::class, 'store']);
    Route::put('/semesters/{id}', [SemesterController::class, 'update']);
    Route::delete('/semesters/{id}', [SemesterController::class, 'destroy']);
});

Route::middleware(['auth:api','role:admin,hr_manager'])->group(function () {
 Route::apiResource(
        'job-postings',
        JobPostingController::class
    );
Route::get('/departments', function () {
    return \App\Models\Department::all();
});
    Route::apiResource(
        'job-applications',
        JobApplicationController::class
    );

    Route::patch(
        'job-applications/{id}/status',
        [JobApplicationController::class, 'updateStatus']
    );
    Route::apiResource(
        'employment-contracts',
        EmploymentContractController::class
    );
       Route::apiResource(
        'leave-requests',
        LeaveRequestController::class
    );
    Route::patch(
    'leave-requests/{id}/status',
    [LeaveRequestController::class, 'updateStatus']);
   Route::get('/staff-attendance', [StaffAttendanceController::class, 'index']);

    Route::post('/staff-attendance/check-in', [StaffAttendanceController::class, 'checkIn']);
    Route::post('/staff-attendance/check-out', [StaffAttendanceController::class, 'checkOut']);

    Route::post('/staff-attendance/auto-absence', [StaffAttendanceController::class, 'autoMarkAbsence']);

    Route::apiResource(
    'payroll-records',
    PayrollRecordController::class
);
// ================= DEPARTMENTS =================
Route::apiResource(
    'departments',
    DepartmentController::class
);

// ================= DEPARTMENT BUDGETS =================
Route::apiResource(
    'department-budgets',
    DepartmentBudgetController::class
);
});

/*
|--------------------------------------------------------------------------
| 🔐 PROTECTED ROUTES (JWT REQUIRED)
|--------------------------------------------------------------------------
*/
Route::middleware(['auth:api'])->group(function () {

    /*
    |--------------------------------------------------------------------------
    | 👤 CURRENT USER
    |--------------------------------------------------------------------------
    */
    Route::get('/me', [AuthController::class, 'me']);

    /*
    |--------------------------------------------------------------------------
    | 🎓 STUDENT PROFILE
    |--------------------------------------------------------------------------
    */

    // 👨‍🎓 Student own profile
Route::middleware('role:student')->group(function () {
    Route::get('/my-profile', [StudentProfileController::class, 'myProfile']);
    Route::put('/my-profile', [StudentProfileController::class, 'updateMyProfile']);
});
    // 🛠 Admin full control
    Route::middleware('role:admin')->group(function () {
        Route::get('/student-profiles', [StudentProfileController::class, 'index']);
        Route::post('/student-profiles', [StudentProfileController::class, 'store']);
        Route::get('/student-profiles/{id}', [StudentProfileController::class, 'show']);
        Route::put('/student-profiles/{id}', [StudentProfileController::class, 'update']);
        Route::delete('/student-profiles/{id}', [StudentProfileController::class, 'destroy']);
    });


    /*
    |--------------------------------------------------------------------------
    | 👨‍🏫 STAFF PROFILE
    |--------------------------------------------------------------------------
    */

    // 👨‍🏫 Staff update own profile
    Route::middleware('role:professor')->group(function () {
        Route::get('/staff-profiles/{id}', [StaffProfileController::class, 'show']);
        Route::put('/staff-profiles/{id}', [StaffProfileController::class, 'update']);
    });

    // 🛠 Admin + HR
    Route::middleware('role:admin,hr_manager')->group(function () {
        Route::get('/staff-profiles', [StaffProfileController::class, 'index']);
        Route::post('/staff-profiles', [StaffProfileController::class, 'store']);
        Route::get('/staff-profiles/{id}', [StaffProfileController::class, 'show']);
        Route::delete('/staff-profiles/{id}', [StaffProfileController::class, 'destroy']);

    });

       

Route::get('/public/jobs', [JobPostingController::class, 'publicJobs']);

Route::get('/public/jobs/{id}', [JobPostingController::class, 'show']);

Route::post('/public/job-applications', [
    JobApplicationController::class,
    'store'
]);


});