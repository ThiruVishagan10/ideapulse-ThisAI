"use server";

import { supabase } from "@/lib/supabase";

// 1️⃣ CREATE IDEA
export async function createIdeaAction(title: string, body: string) {

  const { data, error } = await supabase
    .from("ideas")
    .insert({
      title,
      body,
      is_draft: true,
      user_id: "temp-user-123", // Temporary fix for RLS
    })
    .select("*")
    .single();

  if (error) throw new Error("Error creating idea: " + error.message);

  return data;
}
