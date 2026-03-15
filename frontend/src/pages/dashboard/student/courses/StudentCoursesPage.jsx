'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Clock, Users, FileText, Calendar, AlertCircle, CheckCircle } from 'lucide-react';

const sidebarItems = [
  { label: 'Dashboard', href: '/dashboard/student', icon: BookOpen },
  { label: 'Enrollment', href: '/dashboard/student/enrollment', icon: FileText },
  { label: 'My Grades', href: '/dashboard/student/my-grades', icon: AlertCircle },
  { label: 'Timetable', href: '/dashboard/student/timetable', icon: Calendar },
  { label: 'AI Advisor', href: '/dashboard/student/ai-advisor', icon: Users },
  { label: 'Courses', href: '/dashboard/student/courses', icon: BookOpen },
  { label: 'Payments', href: '/dashboard/student/payments', icon: Clock },
];

const enrolledCourses = [
  {
    id: 1,
    code: 'CS101',
    name: 'Introduction to Programming',
    instructor: 'Dr. John Smith',
    credits: 4,
    grade: 'A',
    progress: 85,
    status: 'active',
    semester: 'Fall 2024',
    schedule: 'MWF 10:00 AM - 11:30 AM',
    room: 'Hall A-201',
    description: 'Learn the fundamentals of programming with Python',
    materials: 12,
    assignments: 5,
    submitted: 4,
  },
  {
    id: 2,
    code: 'MATH201',
    name: 'Linear Algebra',
    instructor: 'Prof. Sarah Johnson',
    credits: 4,
    grade: 'B+',
    progress: 72,
    status: 'active',
    semester: 'Fall 2024',
    schedule: 'TTh 2:00 PM - 3:30 PM',
    room: 'Room B-102',
    description: 'Advanced linear algebra concepts and applications',
    materials: 15,
    assignments: 6,
    submitted: 5,
  },
  {
    id: 3,
    code: 'PHYS101',
    name: 'Physics I',
    instructor: 'Dr. Michael Brown',
    credits: 3,
    grade: 'A-',
    progress: 78,
    status: 'active',
    semester: 'Fall 2024',
    schedule: 'MWF 1:00 PM - 2:30 PM',
    room: 'Lab C-301',
    description: 'Introduction to mechanics and thermodynamics',
    materials: 10,
    assignments: 5,
    submitted: 4,
  },
  {
    id: 4,
    code: 'ENG102',
    name: 'Technical Writing',
    instructor: 'Ms. Emily Davis',
    credits: 3,
    grade: 'B',
    progress: 65,
    status: 'active',
    semester: 'Fall 2024',
    schedule: 'TTh 10:00 AM - 11:30 AM',
    room: 'Room D-105',
    description: 'Professional writing for technical fields',
    materials: 8,
    assignments: 7,
    submitted: 5,
  },
];

const availableCourses = [
  {
    id: 5,
    code: 'CS201',
    name: 'Data Structures',
    instructor: 'Dr. John Smith',
    credits: 4,
    semester: 'Spring 2025',
    schedule: 'MWF 10:00 AM - 11:30 AM',
    description: 'Advanced data structures and algorithms',
    students: 42,
    spots: 8,
  },
  {
    id: 6,
    code: 'CHEM101',
    name: 'General Chemistry',
    instructor: 'Prof. Robert Wilson',
    credits: 4,
    semester: 'Spring 2025',
    schedule: 'TTh 1:00 PM - 2:30 PM',
    description: 'Fundamental principles of chemistry',
    students: 55,
    spots: 5,
  },
  {
    id: 7,
    code: 'BIO102',
    name: 'Biology II',
    instructor: 'Dr. Jennifer Lee',
    credits: 3,
    semester: 'Spring 2025',
    schedule: 'MWF 2:00 PM - 3:30 PM',
    description: 'Advanced biology and genetics',
    students: 38,
    spots: 12,
  },
];

export default function StudentCoursesPage() {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [activeTab, setActiveTab] = useState('enrolled');
  const [enrolledList, setEnrolledList] = useState(enrolledCourses);
  const [availableList, setAvailableList] = useState(availableCourses);

  const handleEnrollCourse = (course) => {
    setEnrolledList([...enrolledList, { ...course, grade: 'N/A', progress: 0, status: 'active', materials: 0, assignments: 0, submitted: 0 }]);
    setAvailableList(availableList.filter(c => c.id !== course.id));
    setSelectedCourse(null);
  };

  const handleDropCourse = (courseId) => {
    const droppedCourse = enrolledList.find(c => c.id === courseId);
    setEnrolledList(enrolledList.filter(c => c.id !== courseId));
    if (droppedCourse && !droppedCourse.code.startsWith('CS') && !droppedCourse.code.startsWith('MATH') && !droppedCourse.code.startsWith('PHYS') && !droppedCourse.code.startsWith('ENG')) {
      setAvailableList([...availableList, droppedCourse]);
    }
  };

  return (


        <main className="p-6 space-y-6">
          {/* Header */}
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">My Courses</h1>
              <p className="text-muted-foreground mt-1">Manage your enrolled and available courses</p>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex gap-2 border-b border-border">
            <button
              onClick={() => setActiveTab('enrolled')}
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                activeTab === 'enrolled'
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Enrolled Courses ({enrolledList.length})
            </button>
            <button
              onClick={() => setActiveTab('available')}
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                activeTab === 'available'
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Available Courses ({availableList.length})
            </button>
          </div>

          {/* Enrolled Courses */}
          {activeTab === 'enrolled' && (
            <div className="space-y-4">
              {enrolledList.length === 0 ? (
                <Card className="border-border">
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <BookOpen className="w-12 h-12 text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">No enrolled courses</p>
                  </CardContent>
                </Card>
              ) : (
                enrolledList.map((course) => (
                  <Card key={course.id} className="border-border hover:border-primary/50 transition-colors">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="font-bold text-lg">{course.code}</span>
                            <Badge>{course.grade}</Badge>
                            <Badge variant="outline">{course.semester}</Badge>
                          </div>
                          <CardTitle>{course.name}</CardTitle>
                          <CardDescription className="mt-2">
                            Instructor: {course.instructor} | {course.credits} Credits
                          </CardDescription>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDropCourse(course.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          Drop Course
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-muted-foreground mb-2">Progress</p>
                          <div className="w-full bg-muted rounded-full h-2">
                            <div
                              className="bg-primary h-2 rounded-full transition-all"
                              style={{ width: `${course.progress}%` }}
                            ></div>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">{course.progress}% complete</p>
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                          <div className="p-3 rounded-lg bg-muted/50">
                            <p className="text-xs text-muted-foreground">Materials</p>
                            <p className="text-lg font-bold">{course.materials}</p>
                          </div>
                          <div className="p-3 rounded-lg bg-muted/50">
                            <p className="text-xs text-muted-foreground">Assignments</p>
                            <p className="text-lg font-bold">{course.assignments}</p>
                          </div>
                          <div className="p-3 rounded-lg bg-muted/50">
                            <p className="text-xs text-muted-foreground">Submitted</p>
                            <p className="text-lg font-bold">{course.submitted}</p>
                          </div>
                        </div>
                      </div>
                      <div className="grid sm:grid-cols-2 gap-4 pt-4 border-t border-border">
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Schedule</p>
                          <p className="text-sm font-medium">{course.schedule}</p>
                          <p className="text-xs text-muted-foreground mt-1">{course.room}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Description</p>
                          <p className="text-sm">{course.description}</p>
                        </div>
                      </div>
                      <div className="flex gap-2 pt-2">
                        <Button size="sm" variant="outline">
                          View Materials
                        </Button>
                        <Button size="sm" variant="outline">
                          Submit Assignment
                        </Button>
                        <Button size="sm" variant="outline">
                          Contact Instructor
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          )}

          {/* Available Courses */}
          {activeTab === 'available' && (
            <div className="space-y-4">
              {availableList.length === 0 ? (
                <Card className="border-border">
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <AlertCircle className="w-12 h-12 text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">No available courses for enrollment</p>
                  </CardContent>
                </Card>
              ) : (
                availableList.map((course) => (
                  <Card key={course.id} className="border-border hover:border-primary/50 transition-colors">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="font-bold text-lg">{course.code}</span>
                            <Badge variant="outline">{course.semester}</Badge>
                            <Badge variant={course.spots > 5 ? 'default' : 'destructive'}>
                              {course.spots} spots left
                            </Badge>
                          </div>
                          <CardTitle>{course.name}</CardTitle>
                          <CardDescription className="mt-2">
                            Instructor: {course.instructor} | {course.credits} Credits | {course.students} students enrolled
                          </CardDescription>
                        </div>
                        <Button
                          size="sm"
                          onClick={() => handleEnrollCourse(course)}
                          disabled={course.spots === 0}
                        >
                          {course.spots === 0 ? 'Full' : 'Enroll'}
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Schedule</p>
                          <p className="text-sm font-medium">{course.schedule}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Description</p>
                          <p className="text-sm">{course.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          )}

          {/* Course Statistics */}
          <div className="grid sm:grid-cols-4 gap-4 pt-4">
            <Card className="border-border">
              <CardContent className="pt-6">
                <div className="text-center">
                  <BookOpen className="w-8 h-8 text-primary mx-auto mb-2" />
                  <p className="text-3xl font-bold">{enrolledList.length}</p>
                  <p className="text-sm text-muted-foreground">Enrolled Courses</p>
                </div>
              </CardContent>
            </Card>
            <Card className="border-border">
              <CardContent className="pt-6">
                <div className="text-center">
                  <CheckCircle className="w-8 h-8 text-primary mx-auto mb-2" />
                  <p className="text-3xl font-bold">{enrolledList.reduce((sum, c) => sum + (c.submitted || 0), 0)}</p>
                  <p className="text-sm text-muted-foreground">Assignments Done</p>
                </div>
              </CardContent>
            </Card>
            <Card className="border-border">
              <CardContent className="pt-6">
                <div className="text-center">
                  <AlertCircle className="w-8 h-8 text-primary mx-auto mb-2" />
                  <p className="text-3xl font-bold">{enrolledList.reduce((sum, c) => sum + (c.assignments - c.submitted), 0)}</p>
                  <p className="text-sm text-muted-foreground">Pending</p>
                </div>
              </CardContent>
            </Card>
            <Card className="border-border">
              <CardContent className="pt-6">
                <div className="text-center">
                  <Users className="w-8 h-8 text-primary mx-auto mb-2" />
                  <p className="text-3xl font-bold">{Math.round(enrolledList.reduce((sum, c) => sum + c.progress, 0) / enrolledList.length) || 0}%</p>
                  <p className="text-sm text-muted-foreground">Avg Progress</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
     
  );
}
