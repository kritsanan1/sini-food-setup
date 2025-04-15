
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative bg-brand-cream py-16 md:py-24 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-brand-brown mb-4">
              <span className="text-brand-orange">ที่นี่</span> วังสามหมอ
            </h1>
            <p className="text-lg md:text-xl mb-6 text-foreground/80 max-w-md">
              บริการสั่งอาหารออนไลน์จากร้านอาหารชั้นนำในวังสามหมอ พร้อมจัดส่งถึงบ้านอย่างรวดเร็ว
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white">
                สั่งอาหารเลย
                <ArrowRight size={18} className="ml-2" />
              </Button>
              <Button size="lg" variant="outline" className="border-brand-orange text-brand-orange hover:bg-brand-orange/10">
                ดูร้านอาหาร
              </Button>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center md:justify-end">
            <img
              src="/public/lovable-uploads/c7a157bc-173e-442b-81f6-e38c3107edb7.png"
              alt="Tour Der Wang"
              className="w-full max-w-md object-contain"
            />
          </div>
        </div>
      </div>
      
      {/* Decorative shape */}
      <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-brand-orange/10 rounded-full blur-3xl"></div>
      <div className="absolute -top-16 -left-16 w-64 h-64 bg-brand-orange/10 rounded-full blur-3xl"></div>
    </section>
  );
};

export default Hero;
