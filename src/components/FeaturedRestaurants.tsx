
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
        src={image}
        alt={name}
        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
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
          <strong>{rating}</strong>/5
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

const FeaturedRestaurants = () => {
  const restaurants = [
    {
      name: "ครัวคุณแม่",
      image: "https://images.unsplash.com/photo-1617196701537-7329482cc9fe",
      cuisine: "อาหารไทย",
      rating: 4.8,
      deliveryTime: "20-35 นาที",
      distance: "1.2 กม.",
      isPromoted: true,
    },
    {
      name: "บ้านข้าวหอม",
      image: "https://images.unsplash.com/photo-1562565652-a0d8f0c59eb4",
      cuisine: "อาหารอีสาน",
      rating: 4.5,
      deliveryTime: "25-40 นาที",
      distance: "1.5 กม.",
    },
    {
      name: "สเต็กดีต่อใจ",
      image: "https://images.unsplash.com/photo-1544025162-d76694265947",
      cuisine: "สเต็ก",
      rating: 4.7,
      deliveryTime: "30-45 นาที",
      distance: "2.1 กม.",
    },
    {
      name: "ก๋วยเตี๋ยวเรือนายหงา",
      image: "https://images.unsplash.com/photo-1569562211093-4ed0d0758f12",
      cuisine: "ก๋วยเตี๋ยว",
      rating: 4.6,
      deliveryTime: "15-30 นาที",
      distance: "0.8 กม.",
      isPromoted: true,
    },
  ];

  return (
    <section className="py-16 bg-brand-cream/30">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-bold text-brand-brown mb-2">ร้านแนะนำ</h2>
            <p className="text-lg text-foreground/70">
              ร้านอาหารยอดนิยมในวังสามหมอที่คุณไม่ควรพลาด
            </p>
          </div>
          <a
            href="#"
            className="text-brand-orange font-medium hover:underline hidden md:block"
          >
            ดูทั้งหมด
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {restaurants.map((restaurant, index) => (
            <RestaurantCard
              key={index}
              name={restaurant.name}
              image={restaurant.image}
              cuisine={restaurant.cuisine}
              rating={restaurant.rating}
              deliveryTime={restaurant.deliveryTime}
              distance={restaurant.distance}
              isPromoted={restaurant.isPromoted}
            />
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <a
            href="#"
            className="text-brand-orange font-medium hover:underline"
          >
            ดูร้านอาหารทั้งหมด
          </a>
        </div>
      </div>
    </section>
  );
};

export default FeaturedRestaurants;
