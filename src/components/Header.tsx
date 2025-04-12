
import { useState } from "react";
import { ShoppingCart, Search, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <a href="/" className="flex items-center space-x-2">
            <img 
              src="/public/lovable-uploads/c7a157bc-173e-442b-81f6-e38c3107edb7.png" 
              alt="Tour Der Wang Logo" 
              className="h-10 w-auto"
            />
            <span className="text-xl font-bold text-brand-orange hidden sm:inline-block">
              Tour Der Wang
            </span>
          </a>
        </div>

        {/* Mobile menu button */}
        <div className="lg:hidden">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleMenu}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center space-x-8">
          <a href="/" className="text-foreground hover:text-brand-orange font-medium transition-colors">
            หน้าแรก
          </a>
          <a href="#" className="text-foreground hover:text-brand-orange font-medium transition-colors">
            เมนูอาหาร
          </a>
          <a href="#" className="text-foreground hover:text-brand-orange font-medium transition-colors">
            ร้านอาหาร
          </a>
          <a href="#" className="text-foreground hover:text-brand-orange font-medium transition-colors">
            โปรโมชั่น
          </a>
          <a href="#" className="text-foreground hover:text-brand-orange font-medium transition-colors">
            ติดต่อเรา
          </a>
        </nav>

        <div className="hidden lg:flex items-center space-x-4">
          <Button variant="ghost" size="icon" aria-label="Search">
            <Search size={20} />
          </Button>
          <Button variant="outline" size="icon" aria-label="Cart">
            <ShoppingCart size={20} />
          </Button>
          <Button className="bg-brand-orange hover:bg-brand-orange/90 text-white">
            เข้าสู่ระบบ
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      <div 
        className={cn(
          "fixed inset-0 bg-white z-40 lg:hidden transition-transform duration-300 ease-in-out", 
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-end mb-8">
            <Button variant="ghost" size="icon" onClick={toggleMenu} aria-label="Close menu">
              <X size={24} />
            </Button>
          </div>
          <nav className="flex flex-col space-y-6">
            <a href="/" className="text-xl font-medium text-foreground hover:text-brand-orange transition-colors" onClick={toggleMenu}>
              หน้าแรก
            </a>
            <a href="#" className="text-xl font-medium text-foreground hover:text-brand-orange transition-colors" onClick={toggleMenu}>
              เมนูอาหาร
            </a>
            <a href="#" className="text-xl font-medium text-foreground hover:text-brand-orange transition-colors" onClick={toggleMenu}>
              ร้านอาหาร
            </a>
            <a href="#" className="text-xl font-medium text-foreground hover:text-brand-orange transition-colors" onClick={toggleMenu}>
              โปรโมชั่น
            </a>
            <a href="#" className="text-xl font-medium text-foreground hover:text-brand-orange transition-colors" onClick={toggleMenu}>
              ติดต่อเรา
            </a>
            <div className="pt-6 flex flex-col space-y-4">
              <Button className="w-full bg-brand-orange hover:bg-brand-orange/90 text-white">
                เข้าสู่ระบบ
              </Button>
              <Button variant="outline" className="w-full flex items-center justify-center space-x-2">
                <ShoppingCart size={20} />
                <span>ตะกร้าสินค้า</span>
              </Button>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
