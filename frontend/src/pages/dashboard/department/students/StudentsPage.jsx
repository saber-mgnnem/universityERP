'use client';

import { useEffect, useState } from 'react';
import API from '@/services/api';

import { StatCard } from "@/components/dashboard/stat-card";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import {
  BookOpen,
  BarChart3,
  Users,
  GraduationCap,
} from "lucide-react";

export default function DashboardHome() {

  const [students, setStudents] = useState([]);
  const [departments, setDepartments] = useState([]);

  const [loading, setLoading] = useState(true);

  // MODAL STATE
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [selectedDepartment, setSelectedDepartment] = useState("");

  // ================= FETCH STUDENTS =================
  const fetchStudents = async () => {
    try {
      const res = await API.get('/students');
      setStudents(res.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // ================= FETCH DEPARTMENTS =================
  const fetchDepartments = async () => {
    try {
      const res = await API.get('/dedepartments');
      setDepartments(res.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchStudents();
    fetchDepartments();
  }, []);

  // ================= OPEN MODAL =================
  const openAssignModal = (student) => {
    setSelectedStudent(student);
    setSelectedDepartment("");
    setIsModalOpen(true);
  };

  // ================= ASSIGN DEPARTMENT =================
  const assignDepartment = async () => {
    try {
      if (!selectedStudent || !selectedDepartment) return;

      await API.put(`/students/${selectedStudent.id}/assign-department`, {
        department_id: selectedDepartment
      });

      setIsModalOpen(false);
      setSelectedStudent(null);

      fetchStudents();

    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <main className="p-6 space-y-6">

      {/* ================= STATS ================= */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Students"
          value={students.length}
          icon={GraduationCap}
        />

        <StatCard title="Faculty Members" value="24" icon={Users} />
        <StatCard title="Active Courses" value="18" icon={BookOpen} />
        <StatCard title="Avg. Class Size" value="68" icon={BarChart3} />
      </div>

      {/* ================= STUDENTS ================= */}
      <Card>
        <CardHeader>
          <CardTitle>Students</CardTitle>
          <CardDescription>All registered students</CardDescription>
        </CardHeader>

        <CardContent>
          <div className="space-y-3">

            {students.map((student) => {

              const isAssigned = Boolean(student.department_id);

              return (
                <div
                  key={student.id}
                  className="flex justify-between items-center p-3 bg-muted/50 rounded-lg"
                >

                  <div>
                    <p className="font-medium">
                      {student.first_name} {student.last_name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {student.email}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">

                    {isAssigned ? (
                      <Badge>Assigned</Badge>
                    ) : (
                      <Badge variant="destructive">
                        Not Assigned
                      </Badge>
                    )}

                    {!isAssigned && (
                      <Button
                        size="sm"
                        onClick={() => openAssignModal(student)}
                      >
                        Assign Department
                      </Button>
                    )}

                  </div>

                </div>
              );
            })}

          </div>
        </CardContent>
      </Card>

      {/* ================= MODAL ================= */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-[400px]">

            <h2 className="text-lg font-bold mb-4">
              Assign Department
            </h2>

            <p className="mb-2 text-sm text-muted-foreground">
              Student: {selectedStudent?.first_name} {selectedStudent?.last_name}
            </p>

            <select
              className="w-full border p-2 rounded mb-4"
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
            >
              <option value="">Select Department</option>

              {departments.map((dept) => (
                <option key={dept.id} value={dept.id}>
                  {dept.department_name}
                </option>
              ))}

            </select>

            <div className="flex justify-end gap-2">

              <Button
                variant="outline"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </Button>

              <Button onClick={assignDepartment}>
                Save
              </Button>

            </div>

          </div>
        </div>
      )}

    </main>
  );
}