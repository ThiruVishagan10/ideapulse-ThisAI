"use server";

import { supabase } from "@/lib/supabase";
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

// 1️⃣ CREATE IDEA
export async function createIdeaAction(title: string, body: string) {
  // Input validation
  if (!title?.trim() || !body?.trim()) {
    throw new Error("Title and body are required");
  }

  // Get authenticated user
  const cookieStore = await cookies()
  const supabaseServer = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return  cookieStore.get(name)?.value
        },
      },
    }
  )

  const { data: { user }, error: authError } = await supabaseServer.auth.getUser()
  
  if (authError || !user) {
    throw new Error("Authentication required");
  }

  const { data, error } = await supabase
    .from("ideas")
    .insert({
      title: title.trim(),
      body: body.trim(),
      is_draft: true,
      user_id: user.id,
    })
    .select("*")
    .single();

  if (error) {
    console.error('Database error:', error);
    throw new Error("Failed to create idea");
  }

  return data;
}
