'use client';

import { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';

import API from '@/services/api';
import FormModal from '@/components/dashboard/dep-form-modal';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function RecruitmentPage() {
  const [jobPostings, setJobPostings] = useState([]);
  const [applications, setApplications] = useState([]);
  const [departments, setDepartments] = useState([]);

  const [filterStatus, setFilterStatus] = useState('All');

  const [isJobModalOpen, setIsJobModalOpen] = useState(false);
  const [isAppModalOpen, setIsAppModalOpen] = useState(false);

  const [selectedJob, setSelectedJob] = useState(null);
  const [selectedApplication, setSelectedApplication] = useState(null);

  const authHeaders = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  };

  // ================= FETCH JOBS =================
  const fetchJobs = async () => {
    const res = await API.get('/job-postings', authHeaders);
    setJobPostings(res.data);
  };

  // ================= FETCH APPLICATIONS =================
  const fetchApplications = async () => {
    const res = await API.get('/job-applications', authHeaders);
    setApplications(res.data);
  };

  // ================= FETCH DEPARTMENTS =================
  const fetchDepartments = async () => {
    const res = await API.get('/departments', authHeaders);
    setDepartments(res.data);
  };

  useEffect(() => {
    fetchJobs();
    fetchApplications();
    fetchDepartments();
  }, []);

  // ================= JOB CREATE =================
  const handleCreateJob = async (data) => {
    await API.post('/job-postings', data, authHeaders);
    fetchJobs();
    setIsJobModalOpen(false);
  };

  // ================= JOB UPDATE =================
  const handleUpdateJob = async (data) => {
    await API.put(`/job-postings/${selectedJob.id}`, data, authHeaders);
    fetchJobs();
    setIsJobModalOpen(false);
    setSelectedJob(null);
  };

  // ================= JOB DELETE =================
  const handleDeleteJob = async (id) => {
    if (!confirm('Delete job?')) return;
    await API.delete(`/job-postings/${id}`, authHeaders);
    fetchJobs();
  };

  // ================= APPLICATION UPDATE =================
  const handleUpdateApplication = async (data) => {
    await API.put(
      `/job-applications/${selectedApplication.id}`,
      data,
      authHeaders
    );

    fetchApplications();
    setIsAppModalOpen(false);
    setSelectedApplication(null);
  };

  // ================= FILTER JOBS =================
  const filtered = jobPostings.filter((j) =>
    filterStatus === 'All' ? true : j.position_status === filterStatus
  );

  // ================= STATUS COLORS =================
  const getStatusColor = (status) => {
    switch (status) {
      case 'Open':
        return 'bg-green-500/10 text-green-700 border-green-500/20';
      case 'Closed':
        return 'bg-gray-500/10 text-gray-700 border-gray-500/20';
      case 'On Hold':
        return 'bg-yellow-500/10 text-yellow-700 border-yellow-500/20';
      default:
        return 'bg-blue-500/10 text-blue-700 border-blue-500/20';
    }
  };

  const getAppStatusColor = (status) => {
    switch (status) {
      case 'Offered':
      case 'Accepted':
        return 'bg-green-500/10 text-green-700 border-green-500/20';

      case 'Rejected':
      case 'Declined':
        return 'bg-red-500/10 text-red-700 border-red-500/20';

      case 'Interview':
        return 'bg-blue-500/10 text-blue-700 border-blue-500/20';

      default:
        return 'bg-yellow-500/10 text-yellow-700 border-yellow-500/20';
    }
  };

  // ================= JOB FORM =================
  const jobFields = [
    { name: 'job_title', label: 'Job Title', type: 'text', required: true },
    { name: 'job_description', label: 'Description', type: 'textarea', required: true },

    {
      name: 'job_category',
      label: 'Category',
      type: 'select',
      options: ['Faculty','Administrative','Support','Research','Other']
        .map(v => ({ value: v, label: v })),
    },

    {
      name: 'department_id',
      label: 'Department',
      type: 'select',
      options: departments.map(d => ({
        value: d.id,
        label: d.name,
      })),
    },

    {
      name: 'employment_type',
      label: 'Employment Type',
      type: 'select',
      options: ['Full-time','Part-time','Contract']
        .map(v => ({ value: v, label: v })),
    },

    { name: 'posting_date', label: 'Posting Date', type: 'date' },
    { name: 'closing_date', label: 'Closing Date', type: 'date' },

    {
      name: 'position_status',
      label: 'Status',
      type: 'select',
      options: ['Open','On Hold','Closed','Filled']
        .map(v => ({ value: v, label: v })),
    },

    { name: 'qualification_requirements', label: 'Qualifications', type: 'textarea' },
    { name: 'experience_required', label: 'Experience (years)', type: 'number' },
    { name: 'salary_range_min', label: 'Min Salary', type: 'number' },
    { name: 'salary_range_max', label: 'Max Salary', type: 'number' },
    { name: 'number_of_positions', label: 'Positions', type: 'number' },

    {
      name: 'is_active',
      label: 'Active',
      type: 'select',
      options: [
        { value: true, label: 'Yes' },
        { value: false, label: 'No' },
      ],
    },
  ];

  // ================= APPLICATION FORM =================
  const applicationFields = [
    {
      name: 'application_status',
      label: 'Status',
      type: 'select',
      options: [
        { value: 'Submitted', label: 'Submitted' },
        { value: 'Under Review', label: 'Under Review' },
        { value: 'Shortlisted', label: 'Shortlisted' },
        { value: 'Interview', label: 'Interview' },
        { value: 'Offered', label: 'Offered' },
        { value: 'Rejected', label: 'Rejected' },
        { value: 'Accepted', label: 'Accepted' },
        { value: 'Declined', label: 'Declined' },
      ],
    },

    { name: 'interview_date', label: 'Interview Date', type: 'datetime-local' },
    { name: 'interview_location', label: 'Interview Location', type: 'text' },
    { name: 'interview_notes', label: 'Notes', type: 'textarea' },
    { name: 'rejection_reason', label: 'Rejection Reason', type: 'textarea' },
  ];

  return (
    <main className="p-6 space-y-6">

      {/* HEADER */}
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold">Recruitment Dashboard</h1>

        <Button onClick={() => {
          setSelectedJob(null);
          setIsJobModalOpen(true);
        }}>
          <Plus className="w-4 h-4 mr-2" />
          New Job
        </Button>
      </div>

      {/* FILTER */}
      <div className="flex gap-2">
        {['All','Open','On Hold','Closed'].map(s => (
          <Button
            key={s}
            variant={filterStatus === s ? 'default' : 'outline'}
            onClick={() => setFilterStatus(s)}
          >
            {s}
          </Button>
        ))}
      </div>

      {/* JOB LIST */}
      <Card>
        <CardHeader>
          <CardTitle>Job Postings</CardTitle>
        </CardHeader>

        <CardContent className="space-y-3">
          {filtered.map(job => (
            <div key={job.id} className="flex justify-between border p-3 rounded">

              <div>
                <h3 className="font-semibold">{job.job_title}</h3>

                <p className="text-sm text-muted-foreground">
                  {job.department?.name}
                </p>

                <Badge className={`${getStatusColor(job.position_status)} border mt-2`}>
                  {job.position_status}
                </Badge>
              </div>

              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setSelectedJob(job);
                    setIsJobModalOpen(true);
                  }}
                >
                  <Edit2 className="w-4 h-4" />
                </Button>

                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleDeleteJob(job.id)}
                >
                  <Trash2 className="w-4 h-4 text-red-500" />
                </Button>
              </div>

            </div>
          ))}
        </CardContent>
      </Card>

      {/* APPLICATIONS */}
      <Card>
        <CardHeader>
          <CardTitle>Applications</CardTitle>
        </CardHeader>

        <CardContent className="space-y-3">
          {applications.map(app => (
            <div key={app.id} className="flex justify-between border p-3 rounded">

              <div>
                <h3 className="font-semibold">
                  {app.applicant_first_name} {app.applicant_last_name}
                </h3>

                <p className="text-sm text-muted-foreground">
                  {app.job_posting?.job_title}
                </p>
              </div>

              <div className="flex gap-2 items-center">
                <Badge className={`${getAppStatusColor(app.application_status)} border`}>
                  {app.application_status}
                </Badge>

                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setSelectedApplication(app);
                    setIsAppModalOpen(true);
                  }}
                >
                  <Edit2 className="w-4 h-4" />
                </Button>
              </div>

            </div>
          ))}
        </CardContent>
      </Card>

      {/* JOB MODAL */}
      <FormModal
        isOpen={isJobModalOpen}
        onClose={() => {
          setIsJobModalOpen(false);
          setSelectedJob(null);
        }}
        title={selectedJob ? 'Update Job' : 'Create Job'}
        fields={jobFields}
        initialData={selectedJob}
        onSubmit={selectedJob ? handleUpdateJob : handleCreateJob}
      />

      {/* APPLICATION MODAL */}
      <FormModal
        isOpen={isAppModalOpen}
        onClose={() => {
          setIsAppModalOpen(false);
          setSelectedApplication(null);
        }}
        title="Update Application"
        fields={applicationFields}
        initialData={selectedApplication}
        onSubmit={handleUpdateApplication}
      />

    </main>
  );
}