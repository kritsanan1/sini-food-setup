
import { useState } from "react";
import { ShoppingCart, Plus, Minus } from "lucide-react";
import { useCartStore, CartItem } from "@/stores/useCartStore";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface AddToCartButtonProps {
  item: Omit<CartItem, 'quantity'>;
  variant?: "default" | "outline" | "secondary";
  size?: "default" | "sm" | "lg" | "icon";
}

export function AddToCartButton({ 
  item, 
  variant = "default", 
  size = "default" 
}: AddToCartButtonProps) {
  const { items, addItem, updateQuantity } = useCartStore();
  const [isAdding, setIsAdding] = useState(false);
  const { toast } = useToast();
  
  // Check if item is already in cart
  const existingItem = items.find(cartItem => cartItem.id === item.id);
  const quantity = existingItem?.quantity || 0;
  
  const handleAddToCart = () => {
    addItem(item);
    toast({
      title: "เพิ่มลงตะกร้าแล้ว",
      description: `${item.name} ถูกเพิ่มลงในตะกร้าแล้ว`,
    });
    setIsAdding(true);
  };
  
  const handleIncrease = () => {
    updateQuantity(item.id, quantity + 1);
  };
  
  const handleDecrease = () => {
    if (quantity > 1) {
      updateQuantity(item.id, quantity - 1);
    } else {
      setIsAdding(false);
    }
  };
  
  if (!isAdding && quantity === 0) {
    return (
      <Button 
        variant={variant} 
        size={size} 
        onClick={handleAddToCart}
        className="w-full"
      >
        <ShoppingCart className="mr-2 h-4 w-4" />
        เพิ่มลงตะกร้า
      </Button>
    );
  }
  
  return (
    <div className="flex items-center justify-between border rounded-md w-full">
      <Button 
        variant="ghost" 
        size="icon" 
        className="h-9 w-9" 
        onClick={handleDecrease}
      >
        <Minus className="h-4 w-4" />
        <span className="sr-only">ลด</span>
      </Button>
      
      <span className="text-sm font-medium">{quantity}</span>
      
      <Button 
        variant="ghost" 
        size="icon" 
        className="h-9 w-9" 
        onClick={handleIncrease}
      >
        <Plus className="h-4 w-4" />
        <span className="sr-only">เพิ่ม</span>
      </Button>
    </div>
  );
}
