'use client';

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Users,
  FileText,
  Calendar,
  UserPlus,
  Clock,
  Briefcase,
  CheckCircle,
  XCircle,
  AlertCircle,
} from 'lucide-react';

import API from '@/services/api';

import { StatCard } from '@/components/dashboard/stat-card';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { Button } from '@/components/ui/button';

import { Badge } from '@/components/ui/badge';

export default function DashboardHome() {

  // ================= STATES =================
  const [staff, setStaff] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [contracts, setContracts] = useState([]);
  const [recentHires, setRecentHires] = useState([]);
const navigate = useNavigate();
  const authHeaders = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  };

  // ================= FETCH DASHBOARD DATA =================
  const fetchDashboardData = async () => {

    try {

      const [
        staffRes,
        jobsRes,
        leaveRes,
        contractsRes,
      ] = await Promise.all([
        API.get('/staff-profiles', authHeaders),
        API.get('/job-postings', authHeaders),
        API.get('/leave-requests', authHeaders),
        API.get('/employment-contracts', authHeaders),
      ]);

      setStaff(staffRes.data);

      setJobs(jobsRes.data);

      setLeaveRequests(leaveRes.data);

      setContracts(contractsRes.data);

      // recent hires
      const hires = [...staffRes.data]
        .sort(
          (a, b) =>
            new Date(b.created_at) -
            new Date(a.created_at)
        )
        .slice(0, 3);

      setRecentHires(hires);

    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  // ================= STATS =================
  const totalEmployees = staff.length;

  const openPositions = jobs.filter(
    (j) => j.position_status === 'Open'
  ).length;

  const pendingRequests = leaveRequests.filter(
    (r) => r.approval_status === 'Pending'
  ).length;

  // contracts expiring in next 30 days
  const contractsExpiring = contracts.filter((c) => {

    if (!c.contract_end_date) return false;

    const end = new Date(c.contract_end_date);

    const today = new Date();

    const diff =
      (end - today) / (1000 * 60 * 60 * 24);

    return diff <= 30 && diff >= 0;
  });

  // ================= STATUS COLORS =================
  const getLeaveBadge = (status) => {

    switch (status) {

      case 'Approved':
        return 'bg-green-500/10 text-green-700 border-green-500/20';

      case 'Rejected':
        return 'bg-red-500/10 text-red-700 border-red-500/20';

      default:
        return 'bg-yellow-500/10 text-yellow-700 border-yellow-500/20';
    }
  };

  // ================= APPROVE =================
  const handleApprove = async (id) => {

    try {

      await API.put(
        `/leave-requests/${id}`,
        {
          approval_status: 'Approved',
        },
        authHeaders
      );

      fetchDashboardData();

    } catch (err) {
      console.error(err);
    }
  };

  // ================= REJECT =================
  const handleReject = async (id) => {

    try {

      await API.put(
        `/leave-requests/${id}`,
        {
          approval_status: 'Rejected',
        },
        authHeaders
      );

      fetchDashboardData();

    } catch (err) {
      console.error(err);
    }
  };

  return (

    <main className="p-6 space-y-6">

      {/* ================= STATS ================= */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">

        <StatCard
          title="Total Employees"
          value={totalEmployees}
          icon={Users}
        />

        <StatCard
          title="Open Positions"
          value={openPositions}
          icon={Briefcase}
        />

        <StatCard
          title="Pending Requests"
          value={pendingRequests}
          icon={Clock}
        />

        <StatCard
          title="Contracts Expiring"
          value={contractsExpiring.length}
          icon={FileText}
        />

      </div>

      {/* ================= TOP SECTION ================= */}
      <div className="grid lg:grid-cols-2 gap-6">

        {/* ================= LEAVE REQUESTS ================= */}
        <Card className="border-border">

          <CardHeader className="flex flex-row items-center justify-between">

            <div>
              <CardTitle>
                Leave Requests
              </CardTitle>

              <CardDescription>
                Pending approval
              </CardDescription>
            </div>

<Button
  onClick={() => navigate('/hr/leave')}
>
  <UserPlus className="w-4 h-4 mr-2" />
   View All
</Button>
          </CardHeader>

          <CardContent>

            <div className="space-y-4">

              {leaveRequests
                .slice(0, 4)
                .map((request) => (

                  <div
                    key={request.id}
                    className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
                  >

                    <div className="flex items-center gap-3">

                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Users className="w-5 h-5 text-primary" />
                      </div>

                      <div>

                        <p className="font-medium text-foreground">

                          {
                            request.staff?.user
                              ?.first_name
                          }{' '}

                          {
                            request.staff?.user
                              ?.last_name
                          }

                        </p>

                        <p className="text-sm text-muted-foreground">

                          {request.leave_type}

                          {' | '}

                          {request.start_date}

                        </p>

                      </div>

                    </div>

                    <div className="flex items-center gap-2">

                      {request.approval_status ===
                      'Pending' ? (

                        <>

                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-8 w-8 text-green-600"
                            onClick={() =>
                              handleApprove(
                                request.id
                              )
                            }
                          >

                            <CheckCircle className="w-4 h-4" />

                          </Button>

                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-8 w-8 text-red-600"
                            onClick={() =>
                              handleReject(
                                request.id
                              )
                            }
                          >

                            <XCircle className="w-4 h-4" />

                          </Button>

                        </>

                      ) : (

                        <Badge
                          className={`${getLeaveBadge(
                            request.approval_status
                          )} border`}
                        >

                          {
                            request.approval_status
                          }

                        </Badge>

                      )}

                    </div>

                  </div>

                ))}

            </div>

          </CardContent>

        </Card>

        {/* ================= CONTRACTS ================= */}
        <Card className="border-border">

          <CardHeader>

            <CardTitle className="flex items-center gap-2">

              <AlertCircle className="w-5 h-5 text-yellow-500" />

              Contracts Expiring Soon

            </CardTitle>

            <CardDescription>
              Requires attention
            </CardDescription>

          </CardHeader>

          <CardContent>

            <div className="space-y-4">

              {contractsExpiring.length > 0 ? (

                contractsExpiring
                  .slice(0, 4)
                  .map((contract) => (

                    <div
                      key={contract.id}
                      className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
                    >

                      <div>

                        <p className="font-medium text-foreground">

                          {
                            contract.staff?.user
                              ?.first_name
                          }{' '}

                          {
                            contract.staff?.user
                              ?.last_name
                          }

                        </p>

                        <p className="text-sm text-muted-foreground">

                          {
                            contract.contract_type
                          }

                        </p>

                      </div>

                      <div className="text-right">

                        <p className="text-sm text-yellow-600">
                          Expires
                        </p>

                        <p className="text-sm text-muted-foreground">

                          {
                            contract.contract_end_date
                          }

                        </p>

                      </div>

                    </div>

                  ))

              ) : (

                <p className="text-muted-foreground">
                  No expiring contracts
                </p>

              )}

            </div>

            <Button
              className="w-full mt-4"
              variant="outline"
            >
              Manage Contracts
            </Button>

          </CardContent>

        </Card>

      </div>

      {/* ================= RECENT HIRES ================= */}
      <Card className="border-border">

        <CardHeader className="flex flex-row items-center justify-between">

          <div>

            <CardTitle>
              Recent Hires
            </CardTitle>

            <CardDescription>
              Newly added staff
            </CardDescription>

          </div>

        <Button
  onClick={() => navigate('/hr/staff')}
>
  <UserPlus className="w-4 h-4 mr-2" />
  Add Employee
</Button>
        </CardHeader>

        <CardContent>

          <div className="grid sm:grid-cols-3 gap-4">

            {recentHires.map((hire) => (

              <div
                key={hire.id}
                className="p-4 rounded-lg border border-border"
              >

                <div className="flex items-center gap-3 mb-3">

                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">

                    <Users className="w-5 h-5 text-primary" />

                  </div>

                  <div>

                    <p className="font-medium text-foreground">

                      {
                        hire.user?.first_name
                      }{' '}

                      {
                        hire.user?.last_name
                      }

                    </p>

                    <p className="text-sm text-muted-foreground">

                      {
                        hire.designation_title
                      }

                    </p>

                  </div>

                </div>

                <div className="text-sm">

                  <p className="text-muted-foreground">

                    Department:{' '}

                    {
                      hire.department
                        ?.department_name
                    }

                  </p>

                  <p className="text-muted-foreground">

                    Joined:{' '}

                    {new Date(
                      hire.created_at
                    ).toLocaleDateString()}

                  </p>

                </div>

              </div>

            ))}

          </div>

        </CardContent>

      </Card>

      {/* ================= QUICK ACTIONS ================= */}
      <div className="grid sm:grid-cols-4 gap-4">

       <Button
  className="h-auto py-4 flex flex-col gap-2"
  onClick={() => navigate('/hr/staff')}
>
  <UserPlus className="w-6 h-6" />
  <span>Add staff profile</span>
</Button>

      <Button
  variant="outline"
  className="h-auto py-4 flex flex-col gap-2"
  onClick={() => navigate('/hr/contracts')}
>
  <FileText className="w-6 h-6" />
  <span>Create Contract</span>
</Button>

<Button
  variant="outline"
  className="h-auto py-4 flex flex-col gap-2"
  onClick={() => navigate('/hr/leave')}
>
  <Calendar className="w-6 h-6" />
  <span>Manage Leave</span>
</Button>

      <Button
  variant="outline"
  className="h-auto py-4 flex flex-col gap-2"
  onClick={() => navigate('/hr/recruitment')}
>
  <Briefcase className="w-6 h-6" />
  <span>Post Job</span>
</Button>

      </div>

    </main>
  );
}