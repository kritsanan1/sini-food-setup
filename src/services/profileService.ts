
import { supabase } from "@/integrations/supabase/client";
import { Tables } from "@/integrations/supabase/types";

export type Profile = Tables<"profiles">;

export const fetchUserProfile = async () => {
  const { data: session } = await supabase.auth.getSession();

  if (!session.session) {
    throw new Error("ไม่พบข้อมูลผู้ใช้ กรุณาเข้าสู่ระบบ");
  }

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", session.session.user.id)
    .single();

  if (error) {
    console.error("Error fetching profile:", error);
    throw new Error(error.message);
  }

  return data;
};

export type ProfileUpdateData = {
  username?: string;
  full_name?: string;
  phone_number?: string;
  address?: string;
};

export const updateUserProfile = async (profileData: ProfileUpdateData) => {
  const { data: session } = await supabase.auth.getSession();

  if (!session.session) {
    throw new Error("ไม่พบข้อมูลผู้ใช้ กรุณาเข้าสู่ระบบ");
  }

  const { data, error } = await supabase
    .from("profiles")
    .update({
      ...profileData,
      updated_at: new Date().toISOString(),
    })
    .eq("id", session.session.user.id)
    .select()
    .single();

  if (error) {
    console.error("Error updating profile:", error);
    throw new Error(error.message);
  }

  return data;
};
