'use client';
import DataTable from '@/components/dashboard/data-table';

const mockGrades = [
  { id: 1, code: 'CS101', title: 'Introduction to Programming', semester: 'Spring 2024', grade: 'A', gpa: 4.0, credits: 3 },
  { id: 2, code: 'MATH101', title: 'Calculus I', semester: 'Spring 2024', grade: 'A-', gpa: 3.7, credits: 4 },
  { id: 3, code: 'CS301', title: 'Algorithms', semester: 'Fall 2023', grade: 'B+', gpa: 3.3, credits: 3 },
  { id: 4, code: 'PHY101', title: 'Physics I', semester: 'Fall 2023', grade: 'A', gpa: 4.0, credits: 3 },
  { id: 5, code: 'ENG101', title: 'English Composition', semester: 'Spring 2023', grade: 'B', gpa: 3.0, credits: 3 },
];

export default function MyGradesPage() {
  const columns = [
    { key: 'code', label: 'Course Code' },
    { key: 'title', label: 'Course Title' },
    { key: 'semester', label: 'Semester' },
    { key: 'grade', label: 'Grade', render: (val) => <span className="font-bold text-lg">{val}</span> },
    { key: 'gpa', label: 'GPA' },
    { key: 'credits', label: 'Credits' },
  ];

  const cumulativeGPA = 3.64;
  const semesterGPA = 3.85;

  return (

        <main className="p-8">
          <div className="space-y-6">
            <h1 className="text-3xl font-bold">Academic Grades</h1>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-card border border-border rounded-lg p-4">
                <p className="text-sm text-muted-foreground">Cumulative GPA</p>
                <p className="text-3xl font-bold">{cumulativeGPA}</p>
              </div>
              <div className="bg-card border border-border rounded-lg p-4">
                <p className="text-sm text-muted-foreground">Semester GPA</p>
                <p className="text-3xl font-bold">{semesterGPA}</p>
              </div>
              <div className="bg-card border border-border rounded-lg p-4">
                <p className="text-sm text-muted-foreground">Total Courses</p>
                <p className="text-3xl font-bold">{mockGrades.length}</p>
              </div>
              <div className="bg-card border border-border rounded-lg p-4">
                <p className="text-sm text-muted-foreground">Total Credits</p>
                <p className="text-3xl font-bold">{mockGrades.reduce((sum, g) => sum + g.credits, 0)}</p>
              </div>
            </div>

            <DataTable
              columns={columns}
              data={mockGrades}
              searchable={true}
              pagination={true}
            />

            <div className="bg-card border border-border rounded-lg p-6">
              <h2 className="text-2xl font-semibold mb-4">GPA History</h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-muted rounded">
                  <span>Spring 2024</span>
                  <span className="font-bold">3.85</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted rounded">
                  <span>Fall 2023</span>
                  <span className="font-bold">3.65</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted rounded">
                  <span>Spring 2023</span>
                  <span className="font-bold">3.40</span>
                </div>
              </div>
            </div>
          </div>
        </main>
    
  );
}
