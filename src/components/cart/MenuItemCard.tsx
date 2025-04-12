
import { useCartStore } from "@/stores/useCartStore";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { AddToCartButton } from "./AddToCartButton";

interface MenuItem {
  id: string;
  name: string;
  description?: string;
  price: number;
  image_url?: string;
  restaurantId: string;
  restaurantName?: string;
}

interface MenuItemCardProps {
  item: MenuItem;
}

export function MenuItemCard({ item }: MenuItemCardProps) {
  return (
    <Card className="overflow-hidden">
      {item.image_url && (
        <div className="aspect-video w-full overflow-hidden">
          <img 
            src={item.image_url} 
            alt={item.name} 
            className="h-full w-full object-cover transition-all hover:scale-105"
          />
        </div>
      )}
      
      <CardContent className="p-4">
        <h3 className="font-medium">{item.name}</h3>
        {item.description && (
          <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
            {item.description}
          </p>
        )}
        <p className="mt-2 font-medium">฿{item.price.toFixed(2)}</p>
      </CardContent>
      
      <CardFooter className="p-4 pt-0">
        <AddToCartButton 
          item={{
            id: item.id,
            name: item.name,
            price: item.price,
            image_url: item.image_url,
            restaurantId: item.restaurantId,
            restaurantName: item.restaurantName,
          }} 
        />
      </CardFooter>
    </Card>
  );
}
