
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Clock, MapPin } from "lucide-react";

interface RestaurantCardProps {
  name: string;
  image: string;
  cuisine: string;
  rating: number;
  deliveryTime: string;
  distance: string;
  isPromoted?: boolean;
}

const RestaurantCard = ({
  name,
  image,
  cuisine,
  rating,
  deliveryTime,
  distance,
  isPromoted = false,
}: RestaurantCardProps) => (
  <Card className="overflow-hidden card-hover">
    <div className="relative h-48 overflow-hidden">
      <img
        src={image || "https://placehold.co/600x400/e2e8f0/cbd5e1?text=ไม่มีรูปภาพ"}
        alt={name}
        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.src = "https://placehold.co/600x400/e2e8f0/cbd5e1?text=ไม่มีรูปภาพ";
        }}
      />
      {isPromoted && (
        <Badge className="absolute top-2 right-2 bg-brand-orange text-white border-none">
          แนะนำ
        </Badge>
      )}
    </div>
    <CardHeader className="pb-2">
      <CardTitle className="text-xl">{name}</CardTitle>
      <CardDescription>{cuisine}</CardDescription>
    </CardHeader>
    <CardContent className="pb-2">
      <div className="flex items-center text-sm text-foreground/70 mb-1">
        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
        <span>
          <strong>{rating.toFixed(1)}</strong>/5
        </span>
      </div>
    </CardContent>
    <CardFooter className="flex justify-between text-sm text-foreground/70">
      <div className="flex items-center">
        <Clock className="h-4 w-4 mr-1" />
        <span>{deliveryTime}</span>
      </div>
      <div className="flex items-center">
        <MapPin className="h-4 w-4 mr-1" />
        <span>{distance}</span>
      </div>
    </CardFooter>
  </Card>
);

export default RestaurantCard;
