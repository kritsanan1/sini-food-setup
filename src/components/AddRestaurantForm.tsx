
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { Restaurant } from "@/services/restaurantService";

const formSchema = z.object({
  name: z.string().min(3, "ชื่อร้านต้องมีอย่างน้อย 3 ตัวอักษร"),
  cuisine: z.string().min(2, "ประเภทอาหารต้องมีอย่างน้อย 2 ตัวอักษร"),
  image_url: z.string().url("URL ไม่ถูกต้อง").optional().or(z.literal("")),
  rating: z.coerce.number().min(0, "คะแนนต้องอยู่ระหว่าง 0-5").max(5, "คะแนนต้องอยู่ระหว่าง 0-5").optional(),
  delivery_time: z.string().optional(),
  distance: z.string().optional(),
  is_promoted: z.boolean().default(false),
});

type FormValues = z.infer<typeof formSchema>;

interface AddRestaurantFormProps {
  onSubmit: (data: Omit<Restaurant, "id" | "created_at" | "updated_at">) => void;
  isLoading: boolean;
}

const AddRestaurantForm = ({ onSubmit, isLoading }: AddRestaurantFormProps) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      cuisine: "",
      image_url: "",
      rating: 4.0,
      delivery_time: "20-35 นาที",
      distance: "1.0 กม.",
      is_promoted: false,
    },
  });

  const handleSubmit = (data: FormValues) => {
    onSubmit({
      name: data.name,
      cuisine: data.cuisine,
      image_url: data.image_url || null,
      rating: data.rating || 0,
      delivery_time: data.delivery_time || null,
      distance: data.distance || null,
      is_promoted: data.is_promoted,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">เพิ่มร้านอาหารใหม่</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ชื่อร้าน *</FormLabel>
                    <FormControl>
                      <Input placeholder="ชื่อร้านอาหาร" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="cuisine"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ประเภทอาหาร *</FormLabel>
                    <FormControl>
                      <Input placeholder="เช่น อาหารไทย, อาหารอีสาน" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="image_url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>URL รูปภาพ</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="https://example.com/image.jpg" 
                        {...field} 
                        value={field.value || ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="rating"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>คะแนน (0-5)</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        step="0.1" 
                        min="0" 
                        max="5" 
                        placeholder="4.5" 
                        {...field}
                        value={field.value?.toString() || ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="delivery_time"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>เวลาส่ง</FormLabel>
                    <FormControl>
                      <Input placeholder="20-35 นาที" {...field} value={field.value || ""} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="distance"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ระยะทาง</FormLabel>
                    <FormControl>
                      <Input placeholder="1.2 กม." {...field} value={field.value || ""} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="is_promoted"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>แนะนำร้านนี้</FormLabel>
                  </div>
                </FormItem>
              )}
            />

            <div className="flex justify-end">
              <Button 
                type="submit" 
                className="bg-brand-orange hover:bg-brand-orange/90"
                disabled={isLoading}
              >
                {isLoading ? "กำลังบันทึก..." : "เพิ่มร้านอาหาร"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default AddRestaurantForm;
