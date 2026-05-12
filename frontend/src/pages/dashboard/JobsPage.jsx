'use client';

import { useEffect, useState } from 'react';

import Link from 'next/link';

import API from '@/services/api';

export default function JobsPage() {

  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {

    try {

      const res = await API.get(
        '/public/jobs'
      );

      setJobs(res.data);

    } catch (err) {
      console.error(err);
    }
  };

  return (

    <main className="max-w-6xl mx-auto p-10">

      <h1 className="text-4xl font-bold mb-8">

        Careers

      </h1>

      <div className="grid gap-6">

        {jobs.map((job) => (

          <div
            key={job.id}
            className="border rounded-xl p-6"
          >

            <h2 className="text-2xl font-bold">

              {job.job_title}

            </h2>

            <p className="text-muted-foreground">

              {job.department?.department_name}

            </p>

            <p className="mt-4">

              {job.job_description}
            </p>

            <div className="mt-4">

              <Link
                href={`/jobs/${job.id}`}
                className="bg-black text-white px-4 py-2 rounded-lg"
              >
                Apply Now
              </Link>

            </div>

          </div>

        ))}

      </div>

    </main>
  );
}