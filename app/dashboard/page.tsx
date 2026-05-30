import { Suspense } from "react";
import { getCourses } from "@/lib/data";
import { BentoGrid } from "@/components/dashboard/BentoGrid";
import { CoursesSection } from "@/components/dashboard/CoursesSection";
import DashboardLoading from "./loading";

// Force dynamic rendering so Supabase is called fresh each request
export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const { data: courses, error } = await getCourses();

  return (
    <Suspense fallback={<DashboardLoading />}>
      <BentoGrid courses={courses} error={error} />
    </Suspense>
  );
}
