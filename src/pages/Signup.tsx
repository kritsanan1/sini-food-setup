
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/hooks/use-toast";
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent, 
  CardFooter 
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Mail, Lock, UserPlus } from "lucide-react";

const signupSchema = z.object({
  email: z.string().email("อีเมลไม่ถูกต้อง"),
  password: z.string().min(6, "รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร"),
  confirmPassword: z.string().min(6, "รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "รหัสผ่านไม่ตรงกัน",
  path: ["confirmPassword"],
});

type SignupFormValues = z.infer<typeof signupSchema>;

const Signup = () => {
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: SignupFormValues) => {
    setIsLoading(true);
    try {
      const { error, data } = await signUp(values.email, values.password);
      
      if (error) {
        toast({
          title: "เกิดข้อผิดพลาด",
          description: error.message === "User already registered" 
            ? "อีเมลนี้ถูกใช้งานแล้ว" 
            : error.message,
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "สมัครสมาชิกสำเร็จ",
        description: "กรุณาตรวจสอบอีเมลของคุณเพื่อยืนยันการสมัครสมาชิก",
      });
      
      // If email confirmation is not enabled in Supabase, navigate to login
      navigate("/login");
    } catch (error) {
      toast({
        title: "เกิดข้อผิดพลาด",
        description: "ไม่สามารถสมัครสมาชิกได้ โปรดลองอีกครั้ง",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">สมัครสมาชิก</CardTitle>
          <CardDescription className="text-center">
            กรอกข้อมูลเพื่อสร้างบัญชีใหม่
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>อีเมล</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input 
                          placeholder="อีเมลของคุณ" 
                          className="pl-10" 
                          {...field} 
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>รหัสผ่าน</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input 
                          type="password" 
                          placeholder="รหัสผ่านของคุณ" 
                          className="pl-10" 
                          {...field} 
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ยืนยันรหัสผ่าน</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input 
                          type="password" 
                          placeholder="ยืนยันรหัสผ่านของคุณ" 
                          className="pl-10" 
                          {...field} 
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button 
                type="submit" 
                className="w-full bg-brand-orange hover:bg-brand-orange/90"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    กำลังสมัครสมาชิก
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <UserPlus className="h-4 w-4" />
                    สมัครสมาชิก
                  </span>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-sm text-center text-muted-foreground">
            มีบัญชีอยู่แล้ว?{" "}
            <Link to="/login" className="text-brand-orange hover:underline">
              เข้าสู่ระบบ
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Signup;
