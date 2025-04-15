
import { 
  Facebook, 
  Instagram, 
  Twitter, 
  MapPin, 
  Phone, 
  Mail,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Footer = () => {
  return (
    <footer className="bg-brand-brown text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center mb-6">
              <img 
                src="/public/lovable-uploads/c7a157bc-173e-442b-81f6-e38c3107edb7.png" 
                alt="Tour Der Wang Logo" 
                className="h-12 w-auto mr-3"
              />
              <h3 className="text-xl font-bold">Tour Der Wang</h3>
            </div>
            <p className="text-white/70 mb-6">
              บริการจัดส่งอาหารในพื้นที่วังสามหมอและใกล้เคียง ด้วยความใส่ใจในทุกรายละเอียด
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-brand-orange transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-white hover:text-brand-orange transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-white hover:text-brand-orange transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-6">ลิงก์ด่วน</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-white/70 hover:text-brand-orange transition-colors inline-flex items-center">
                  <ChevronRight size={16} className="mr-2" />
                  หน้าแรก
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-brand-orange transition-colors inline-flex items-center">
                  <ChevronRight size={16} className="mr-2" />
                  เมนูอาหาร
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-brand-orange transition-colors inline-flex items-center">
                  <ChevronRight size={16} className="mr-2" />
                  ร้านอาหาร
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-brand-orange transition-colors inline-flex items-center">
                  <ChevronRight size={16} className="mr-2" />
                  โปรโมชั่น
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-brand-orange transition-colors inline-flex items-center">
                  <ChevronRight size={16} className="mr-2" />
                  เกี่ยวกับเรา
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-6">ติดต่อเรา</h4>
            <ul className="space-y-4">
              <li className="flex">
                <MapPin size={20} className="mr-3 flex-shrink-0 text-brand-orange" />
                <span className="text-white/70">ตำบลวังสามหมอ อำเภอวังสามหมอ จังหวัดอุดรธานี 41280</span>
              </li>
              <li className="flex">
                <Phone size={20} className="mr-3 flex-shrink-0 text-brand-orange" />
                <span className="text-white/70">099-999-9999</span>
              </li>
              <li className="flex">
                <Mail size={20} className="mr-3 flex-shrink-0 text-brand-orange" />
                <span className="text-white/70">info@tourderwang.com</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-6">รับข่าวสารและโปรโมชั่น</h4>
            <p className="text-white/70 mb-4">
              ลงทะเบียนรับข่าวสารและโปรโมชั่นพิเศษจากเรา
            </p>
            <div className="flex space-x-2">
              <Input 
                type="email" 
                placeholder="อีเมลของคุณ" 
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
              />
              <Button className="bg-brand-orange hover:bg-brand-orange/90 text-white">
                สมัคร
              </Button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-8 text-center text-white/50 text-sm">
          <p>© {new Date().getFullYear()} Tour Der Wang. สงวนลิขสิทธิ์ทั้งหมด.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
