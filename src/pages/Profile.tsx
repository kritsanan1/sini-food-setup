
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchUserProfile, updateUserProfile, ProfileUpdateData } from "@/services/profileService";
import ProfileForm from "@/components/ProfileForm";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Profile = () => {
  const { user, isLoading: isAuthLoading } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!isAuthLoading && !user) {
      navigate("/login", { replace: true });
    }
  }, [user, isAuthLoading, navigate]);

  const {
    data: profile,
    isLoading: isProfileLoading,
    error: profileError,
  } = useQuery({
    queryKey: ["profile"],
    queryFn: fetchUserProfile,
    enabled: !!user,
  });

  const mutation = useMutation({
    mutationFn: updateUserProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      toast({
        title: "อัปเดตโปรไฟล์สำเร็จ",
        description: "ข้อมูลโปรไฟล์ของคุณถูกอัปเดตเรียบร้อยแล้ว",
      });
    },
    onError: (error) => {
      toast({
        title: "เกิดข้อผิดพลาด",
        description: error instanceof Error ? error.message : "ไม่สามารถอัปเดตโปรไฟล์ได้",
        variant: "destructive",
      });
    },
  });

  const handleProfileUpdate = (data: ProfileUpdateData) => {
    mutation.mutate(data);
  };

  const isLoading = isAuthLoading || isProfileLoading;

  if (isLoading) {
    return (
      <>
        <Header />
        <div className="container max-w-4xl mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold mb-6">โปรไฟล์ของฉัน</h1>
          <div className="space-y-4">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
      </>
    );
  }

  if (profileError) {
    return (
      <>
        <Header />
        <div className="container max-w-4xl mx-auto px-4 py-8">
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">เกิดข้อผิดพลาด: </strong>
            <span className="block sm:inline">
              {profileError instanceof Error ? profileError.message : "ไม่สามารถโหลดข้อมูลโปรไฟล์ได้"}
            </span>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="container max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">โปรไฟล์ของฉัน</h1>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="profile">ข้อมูลส่วนตัว</TabsTrigger>
            <TabsTrigger value="account">บัญชีผู้ใช้</TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>ข้อมูลส่วนตัว</CardTitle>
                <CardDescription>
                  จัดการข้อมูลส่วนตัวของคุณ รวมถึงชื่อ ที่อยู่ และเบอร์โทรศัพท์
                </CardDescription>
              </CardHeader>
              <CardContent>
                {profile && (
                  <ProfileForm
                    profile={profile}
                    isSubmitting={mutation.isPending}
                    onSubmit={handleProfileUpdate}
                  />
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="account">
            <Card>
              <CardHeader>
                <CardTitle>ข้อมูลบัญชี</CardTitle>
                <CardDescription>
                  จัดการการตั้งค่าบัญชีผู้ใช้ของคุณ
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium">อีเมล</h3>
                    <p className="text-sm text-muted-foreground">{user?.email}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium">วันที่สมัคร</h3>
                    <p className="text-sm text-muted-foreground">
                      {user?.created_at 
                        ? new Date(user.created_at).toLocaleDateString('th-TH', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })
                        : '-'}
                    </p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button 
                  variant="outline" 
                  onClick={() => 
                    toast({
                      title: "ฟีเจอร์นี้ยังไม่เปิดให้บริการ",
                      description: "ขออภัยในความไม่สะดวก"
                    })
                  }
                >
                  เปลี่ยนรหัสผ่าน
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default Profile;
