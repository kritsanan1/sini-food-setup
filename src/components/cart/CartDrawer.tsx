
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingCart, Plus, Minus, Trash2 } from "lucide-react";
import { useCartStore, CartItem } from "@/stores/useCartStore";
import { Button } from "@/components/ui/button";
import { 
  Drawer, 
  DrawerClose, 
  DrawerContent, 
  DrawerDescription, 
  DrawerFooter, 
  DrawerHeader, 
  DrawerTitle, 
  DrawerTrigger 
} from "@/components/ui/drawer";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

export function CartDrawer() {
  const { items, removeItem, updateQuantity, clearCart, totalItems, totalPrice } = useCartStore();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleCheckout = () => {
    if (items.length === 0) {
      toast({
        title: "กรุณาเพิ่มสินค้าก่อนชำระเงิน",
        variant: "destructive",
      });
      return;
    }
    
    setOpen(false);
    navigate("/checkout");
  };

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline" className="relative">
          <ShoppingCart className="h-5 w-5" />
          {totalItems() > 0 && (
            <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {totalItems()}
            </span>
          )}
        </Button>
      </DrawerTrigger>
      <DrawerContent className="px-4">
        <DrawerHeader>
          <DrawerTitle>ตะกร้าสินค้า</DrawerTitle>
          <DrawerDescription>
            {items.length > 0 
              ? `มี ${totalItems()} รายการในตะกร้า` 
              : "ตะกร้าของคุณว่างเปล่า"}
          </DrawerDescription>
        </DrawerHeader>
        
        {items.length > 0 ? (
          <div className="space-y-4 max-h-[60vh] overflow-auto py-2">
            {items.map((item) => (
              <CartItemCard 
                key={item.id} 
                item={item} 
                onRemove={removeItem} 
                onUpdateQuantity={updateQuantity} 
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-8">
            <ShoppingCart className="h-16 w-16 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">ตะกร้าของคุณว่างเปล่า</p>
          </div>
        )}
        
        {items.length > 0 && (
          <>
            <Separator className="my-4" />
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span>ยอดรวม</span>
                <span>฿{totalPrice().toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-semibold">
                <span>ยอดรวมสุทธิ</span>
                <span>฿{totalPrice().toFixed(2)}</span>
              </div>
            </div>
          </>
        )}
        
        <DrawerFooter>
          <Button onClick={handleCheckout} disabled={items.length === 0}>
            ชำระเงิน
          </Button>
          {items.length > 0 && (
            <Button 
              variant="outline" 
              onClick={() => {
                if (confirm("คุณต้องการล้างตะกร้าใช่หรือไม่?")) {
                  clearCart();
                }
              }}
            >
              ล้างตะกร้า
            </Button>
          )}
          <DrawerClose asChild>
            <Button variant="outline">ปิด</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

interface CartItemCardProps {
  item: CartItem;
  onRemove: (id: string) => void;
  onUpdateQuantity: (id: string, quantity: number) => void;
}

function CartItemCard({ item, onRemove, onUpdateQuantity }: CartItemCardProps) {
  return (
    <div className="flex items-center gap-3 p-2 border rounded-md">
      {item.image_url ? (
        <img 
          src={item.image_url} 
          alt={item.name} 
          className="h-16 w-16 object-cover rounded-md"
        />
      ) : (
        <div className="h-16 w-16 bg-muted rounded-md flex items-center justify-center">
          <span className="text-xs text-muted-foreground">No image</span>
        </div>
      )}
      
      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-sm truncate">{item.name}</h4>
        <p className="text-sm text-muted-foreground truncate">
          {item.restaurantName && `จาก ${item.restaurantName}`}
        </p>
        <p className="text-sm font-medium">฿{item.price.toFixed(2)}</p>
      </div>
      
      <div className="flex flex-col items-end gap-1">
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-6 w-6" 
          onClick={() => onRemove(item.id)}
        >
          <Trash2 className="h-4 w-4" />
          <span className="sr-only">ลบ</span>
        </Button>
        
        <div className="flex items-center border rounded-md">
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-7 w-7" 
            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
          >
            <Minus className="h-3 w-3" />
            <span className="sr-only">ลด</span>
          </Button>
          
          <span className="w-8 text-center text-sm">{item.quantity}</span>
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-7 w-7" 
            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
          >
            <Plus className="h-3 w-3" />
            <span className="sr-only">เพิ่ม</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
