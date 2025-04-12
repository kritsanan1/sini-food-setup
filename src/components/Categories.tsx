
import { Card, CardContent } from "@/components/ui/card";
import { 
  UtensilsCrossed, 
  Coffee, 
  Soup, 
  Pizza, 
  Beef, 
  Fish, 
  Salad, 
  IceCream 
} from "lucide-react";

interface CategoryCardProps {
  title: string;
  icon: React.ReactNode;
}

const CategoryCard = ({ title, icon }: CategoryCardProps) => (
  <Card className="card-hover border-2 border-transparent hover:border-brand-orange/30">
    <CardContent className="flex flex-col items-center justify-center p-6">
      <div className="w-16 h-16 rounded-full bg-brand-orange/10 flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-medium text-foreground">{title}</h3>
    </CardContent>
  </Card>
);

const Categories = () => {
  const categories = [
    { title: "อาหารตามสั่ง", icon: <UtensilsCrossed size={32} className="text-brand-orange" /> },
    { title: "เครื่องดื่ม", icon: <Coffee size={32} className="text-brand-orange" /> },
    { title: "ก๋วยเตี๋ยว", icon: <Soup size={32} className="text-brand-orange" /> },
    { title: "ฟาสต์ฟู้ด", icon: <Pizza size={32} className="text-brand-orange" /> },
    { title: "อาหารอีสาน", icon: <Beef size={32} className="text-brand-orange" /> },
    { title: "อาหารทะเล", icon: <Fish size={32} className="text-brand-orange" /> },
    { title: "สลัด", icon: <Salad size={32} className="text-brand-orange" /> },
    { title: "ของหวาน", icon: <IceCream size={32} className="text-brand-orange" /> },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-brand-brown mb-4">หมวดหมู่อาหาร</h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            เลือกประเภทอาหารที่คุณชื่นชอบจากร้านอาหารชั้นนำในวังสามหมอ
          </p>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
          {categories.map((category, index) => (
            <CategoryCard 
              key={index} 
              title={category.title} 
              icon={category.icon} 
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
