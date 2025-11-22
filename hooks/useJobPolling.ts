"use client";
import { useEffect, useState } from "react";

interface Job {
  status: string;
  [key: string]: unknown;
}

export function useJobPolling(jobId: string | null) {
  const [job, setJob] = useState<Job | null>(null);

  useEffect(() => {
    if (!jobId) return;

    const interval = setInterval(async () => {
      const res = await fetch(`http://localhost:8000/api/ai/job/${jobId}`);
      const data = await res.json();
      setJob(data);

      if (data.status === "completed" || data.status === "failed") {
        clearInterval(interval);
      }
    }, 1500);

    return () => clearInterval(interval);
  }, [jobId]);

  return job;
}
