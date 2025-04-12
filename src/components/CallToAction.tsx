
import { Button } from "@/components/ui/button";
import { ChevronRight, Smartphone } from "lucide-react";

const CallToAction = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-brand-orange to-brand-orange/80 text-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-8 md:mb-0 md:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              ดาวน์โหลดแอปพลิเคชัน Tour Der Wang
            </h2>
            <p className="text-lg md:text-xl mb-6 text-white/80 max-w-lg">
              สั่งอาหารได้ง่ายขึ้น รับโปรโมชั่นพิเศษ และติดตามคำสั่งซื้อได้แบบเรียลไทม์
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Button size="lg" variant="secondary" className="bg-white text-brand-orange hover:bg-white/90">
                <Smartphone className="mr-2 h-5 w-5" />
                ดาวน์โหลดเลย
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                ดูเพิ่มเติม 
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <div className="relative w-64 h-64">
              <div className="absolute inset-0 bg-white/20 rounded-full blur-3xl"></div>
              <div className="relative z-10 flex items-center justify-center h-full">
                <Smartphone className="h-32 w-32" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
