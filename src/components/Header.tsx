import { useState } from "react";
import { ShoppingCart, Search, Menu, X, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { CartDrawer } from "./cart/CartDrawer";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleAuthAction = () => {
    if (user) {
      // Show a profile menu or navigate to profile page
      navigate("/profile");
    } else {
      navigate("/login");
    }
  };

  const handleLogout = async () => {
    await signOut();
    toggleMenu(); // Close mobile menu if open
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <a href="/" className="flex items-center space-x-2">
            <img 
              src="/lovable-uploads/c7a157bc-173e-442b-81f6-e38c3107edb7.png" 
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
          <Link to="/" className="text-foreground hover:text-brand-orange font-medium transition-colors">
            หน้าแรก
          </Link>
          <Link to="#" className="text-foreground hover:text-brand-orange font-medium transition-colors">
            เมนูอาหาร
          </Link>
          <Link to="/restaurants" className="text-foreground hover:text-brand-orange font-medium transition-colors">
            ร้านอาหาร
          </Link>
          <Link to="#" className="text-foreground hover:text-brand-orange font-medium transition-colors">
            โปรโมชั่น
          </Link>
          <Link to="#" className="text-foreground hover:text-brand-orange font-medium transition-colors">
            ติดต่อเรา
          </Link>
        </nav>

        <div className="hidden lg:flex items-center space-x-4">
          <Button variant="ghost" size="icon" aria-label="Search">
            <Search size={20} />
          </Button>
          <Button variant="outline" size="icon" aria-label="Cart">
            <ShoppingCart size={20} />
          </Button>
          <CartDrawer />
          {user ? (
            <div className="flex items-center space-x-2">
              <Button 
                onClick={handleAuthAction}
                className="bg-brand-orange hover:bg-brand-orange/90 text-white"
              >
                <User size={18} className="mr-2" />
                โปรไฟล์
              </Button>
              <Button 
                variant="outline" 
                onClick={handleLogout}
                className="border-brand-orange text-brand-orange hover:bg-brand-orange/10"
              >
                <LogOut size={18} className="mr-2" />
                ออกจากระบบ
              </Button>
            </div>
          ) : (
            <Button 
              onClick={handleAuthAction}
              className="bg-brand-orange hover:bg-brand-orange/90 text-white"
            >
              เข้าสู่ระบบ
            </Button>
          )}
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
            <Link to="/" className="text-xl font-medium text-foreground hover:text-brand-orange transition-colors" onClick={toggleMenu}>
              หน้าแรก
            </Link>
            <Link to="#" className="text-xl font-medium text-foreground hover:text-brand-orange transition-colors" onClick={toggleMenu}>
              เมนูอาหาร
            </Link>
            <Link to="/restaurants" className="text-xl font-medium text-foreground hover:text-brand-orange transition-colors" onClick={toggleMenu}>
              ร้านอาหาร
            </Link>
            <Link to="#" className="text-xl font-medium text-foreground hover:text-brand-orange transition-colors" onClick={toggleMenu}>
              โปรโมชั่น
            </Link>
            <Link to="#" className="text-xl font-medium text-foreground hover:text-brand-orange transition-colors" onClick={toggleMenu}>
              ติดต่อเรา
            </Link>
            <div className="pt-6 flex flex-col space-y-4">
              {user ? (
                <>
                  <Button 
                    className="w-full bg-brand-orange hover:bg-brand-orange/90 text-white"
                    onClick={() => {
                      handleAuthAction();
                      toggleMenu();
                    }}
                  >
                    <User size={18} className="mr-2" />
                    โปรไฟล์
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full border-brand-orange text-brand-orange hover:bg-brand-orange/10"
                    onClick={handleLogout}
                  >
                    <LogOut size={18} className="mr-2" />
                    ออกจากระบบ
                  </Button>
                </>
              ) : (
                <Button 
                  className="w-full bg-brand-orange hover:bg-brand-orange/90 text-white"
                  onClick={() => {
                    navigate("/login");
                    toggleMenu();
                  }}
                >
                  เข้าสู่ระบบ
                </Button>
              )}
              <Button 
                variant="outline" 
                className="w-full flex items-center justify-center space-x-2"
                onClick={toggleMenu}
              >
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
