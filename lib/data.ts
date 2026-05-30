import { createSupabaseServerClient } from "./supabase-server";
import type { Course } from "@/types";

export async function getCourses(): Promise<{ data: Course[] | null; error: string | null }> {
  try {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase
      .from("courses")
      .select("*")
      .order("created_at", { ascending: true });

    if (error) {
      console.error("Supabase error:", error.message);
      return { data: null, error: error.message };
    }

    return { data: data as Course[], error: null };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("Failed to fetch courses:", message);
    return { data: null, error: message };
  }
}
