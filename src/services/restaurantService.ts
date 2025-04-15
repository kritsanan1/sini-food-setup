
import { supabase } from "@/integrations/supabase/client";
import { Tables } from "@/integrations/supabase/types";

export type Restaurant = Tables<"restaurants">;

export const fetchRestaurants = async () => {
  const { data, error } = await supabase
    .from("restaurants")
    .select("*")
    .order("name", { ascending: true });

  if (error) {
    console.error("Error fetching restaurants:", error);
    throw new Error(error.message);
  }

  return data;
};

export const addRestaurant = async (restaurant: Omit<Restaurant, "id" | "created_at" | "updated_at">) => {
  const { data, error } = await supabase
    .from("restaurants")
    .insert(restaurant)
    .select()
    .single();

  if (error) {
    console.error("Error adding restaurant:", error);
    throw new Error(error.message);
  }

  return data;
};
