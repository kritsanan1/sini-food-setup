
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "@/stores/useCartStore";
import { useAuth } from "@/contexts/AuthContext";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useToast } from "@/hooks/use-toast";

const Checkout = () => {
  const { items, totalItems, totalPrice, clearCart } = useCartStore();
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  useEffect(() => {
    if (!isLoading && !user) {
      navigate("/login", { state: { from: "/checkout" } });
    }
    
    if (items.length === 0) {
      navigate("/");
    }
  }, [user, isLoading, items, navigate]);
  
  const handlePlaceOrder = () => {
    // This would normally connect to an API to create the order
    toast({
      title: "คำสั่งซื้อสำเร็จ!",
      description: "ขอบคุณสำหรับคำสั่งซื้อของคุณ",
    });
    
    clearCart();
    navigate("/order-confirmation");
  };
  
  if (isLoading || items.length === 0) {
    return null;
  }

  return (
    <>
      <Header />
      <div className="container max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">ชำระเงิน</h1>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-8">
            {/* Delivery Address */}
            <div className="border rounded-lg p-4">
              <h2 className="text-lg font-semibold mb-4">ที่อยู่จัดส่ง</h2>
              
              {user?.email ? (
                <div className="space-y-2">
                  <p>อีเมล: {user.email}</p>
                  <p>ที่อยู่: กรุณาเพิ่มที่อยู่</p>
                  
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button variant="outline" size="sm">แก้ไขที่อยู่</Button>
                    </SheetTrigger>
                    <SheetContent>
                      <SheetHeader>
                        <SheetTitle>ที่อยู่จัดส่ง</SheetTitle>
                        <SheetDescription>
                          เพิ่มหรือแก้ไขที่อยู่จัดส่งของคุณ
                        </SheetDescription>
                      </SheetHeader>
                      <div className="py-4">
                        <p className="text-muted-foreground">
                          จะเพิ่มฟอร์มที่อยู่ในอนาคต
                        </p>
                      </div>
                    </SheetContent>
                  </Sheet>
                </div>
              ) : (
                <p>กรุณาเข้าสู่ระบบเพื่อดำเนินการต่อ</p>
              )}
            </div>
            
            {/* Payment Method */}
            <div className="border rounded-lg p-4">
              <h2 className="text-lg font-semibold mb-4">วิธีการชำระเงิน</h2>
              
              <RadioGroup defaultValue="cod">
                <div className="flex items-center space-x-2 mb-3">
                  <RadioGroupItem value="cod" id="cod" />
                  <Label htmlFor="cod">เก็บเงินปลายทาง (COD)</Label>
                </div>
                <div className="flex items-center space-x-2 mb-3">
                  <RadioGroupItem value="credit_card" id="credit_card" disabled />
                  <Label htmlFor="credit_card" className="text-muted-foreground">บัตรเครดิต/เดบิต (เร็วๆ นี้)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="prompt_pay" id="prompt_pay" disabled />
                  <Label htmlFor="prompt_pay" className="text-muted-foreground">พร้อมเพย์ (เร็วๆ นี้)</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="md:col-span-1">
            <div className="border rounded-lg p-4 sticky top-4">
              <h2 className="text-lg font-semibold mb-4">สรุปคำสั่งซื้อ</h2>
              
              <div className="space-y-4 max-h-[300px] overflow-auto">
                {items.map(item => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span>
                      {item.name} <span className="text-muted-foreground">x{item.quantity}</span>
                    </span>
                    <span>฿{(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              
              <Separator className="my-4" />
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>รวมสินค้า ({totalItems()} รายการ)</span>
                  <span>฿{totalPrice().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>ค่าจัดส่ง</span>
                  <span>ฟรี</span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between font-semibold">
                  <span>ยอดรวมสุทธิ</span>
                  <span>฿{totalPrice().toFixed(2)}</span>
                </div>
              </div>
              
              <Button 
                className="w-full mt-4"
                onClick={handlePlaceOrder}
              >
                ยืนยันคำสั่งซื้อ
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
