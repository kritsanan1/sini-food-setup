
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/stores/useCartStore";

const OrderConfirmation = () => {
  const navigate = useNavigate();
  const { items } = useCartStore();
  
  // Redirect to home if they directly access this page without placing an order
  useEffect(() => {
    const timer = setTimeout(() => {
      if (items.length > 0) {
        navigate("/");
      }
    }, 100);
    
    return () => clearTimeout(timer);
  }, [items, navigate]);
  
  return (
    <>
      <Header />
      <div className="container max-w-lg mx-auto px-4 py-12 text-center">
        <CheckCircle className="h-24 w-24 text-green-500 mx-auto mb-6" />
        
        <h1 className="text-2xl font-bold mb-2">คำสั่งซื้อสำเร็จ!</h1>
        <p className="text-muted-foreground mb-8">
          ขอบคุณสำหรับคำสั่งซื้อของคุณ กรุณาเตรียมเงินสดให้พร้อมสำหรับการจัดส่ง
        </p>
        
        <div className="border rounded-lg p-6 mb-6 bg-muted/30">
          <p className="text-sm mb-2">รหัสคำสั่งซื้อ</p>
          <p className="text-xl font-mono font-semibold">
            {Math.random().toString(36).substring(2, 10).toUpperCase()}
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button onClick={() => navigate("/")}>
            กลับไปหน้าหลัก
          </Button>
          <Button variant="outline" onClick={() => navigate("/profile")}>
            ดูประวัติคำสั่งซื้อ
          </Button>
        </div>
      </div>
    </>
  );
};

export default OrderConfirmation;
