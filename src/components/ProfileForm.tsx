
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Profile, ProfileUpdateData } from "@/services/profileService";
import { useToast } from "@/hooks/use-toast";

const profileFormSchema = z.object({
  username: z
    .string()
    .min(3, {
      message: "ชื่อผู้ใช้ต้องมีอย่างน้อย 3 ตัวอักษร",
    })
    .nullable()
    .optional(),
  full_name: z
    .string()
    .min(2, {
      message: "ชื่อ-นามสกุลต้องมีอย่างน้อย 2 ตัวอักษร",
    })
    .nullable()
    .optional(),
  phone_number: z
    .string()
    .min(10, {
      message: "กรุณากรอกหมายเลขโทรศัพท์ให้ถูกต้อง",
    })
    .nullable()
    .optional(),
  address: z.string().nullable().optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

interface ProfileFormProps {
  profile: Profile;
  isSubmitting: boolean;
  onSubmit: (data: ProfileUpdateData) => void;
}

const ProfileForm = ({ profile, isSubmitting, onSubmit }: ProfileFormProps) => {
  const { toast } = useToast();
  
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      username: profile.username || "",
      full_name: profile.full_name || "",
      phone_number: profile.phone_number || "",
      address: profile.address || "",
    },
  });

  const handleSubmit = (values: ProfileFormValues) => {
    const updatedData: ProfileUpdateData = {};
    
    // Only include changed fields
    if (values.username !== profile.username) updatedData.username = values.username || null;
    if (values.full_name !== profile.full_name) updatedData.full_name = values.full_name || null;
    if (values.phone_number !== profile.phone_number) updatedData.phone_number = values.phone_number || null;
    if (values.address !== profile.address) updatedData.address = values.address || null;
    
    // Check if any data has changed
    if (Object.keys(updatedData).length === 0) {
      toast({
        title: "ไม่มีข้อมูลที่เปลี่ยนแปลง",
        description: "ไม่มีการแก้ไขข้อมูลโปรไฟล์",
      });
      return;
    }
    
    onSubmit(updatedData);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ชื่อผู้ใช้</FormLabel>
              <FormControl>
                <Input placeholder="ชื่อผู้ใช้" {...field} value={field.value || ""} />
              </FormControl>
              <FormDescription>
                ชื่อผู้ใช้สำหรับแสดงในโปรไฟล์ของคุณ
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="full_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ชื่อ-นามสกุล</FormLabel>
              <FormControl>
                <Input placeholder="ชื่อ-นามสกุล" {...field} value={field.value || ""} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="phone_number"
          render={({ field }) => (
            <FormItem>
              <FormLabel>เบอร์โทรศัพท์</FormLabel>
              <FormControl>
                <Input placeholder="เบอร์โทรศัพท์" {...field} value={field.value || ""} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ที่อยู่</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="ที่อยู่สำหรับการจัดส่ง" 
                  className="resize-none" 
                  {...field} 
                  value={field.value || ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "กำลังบันทึก..." : "บันทึกข้อมูล"}
        </Button>
      </form>
    </Form>
  );
};

export default ProfileForm;
