
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchRestaurants, addRestaurant } from "@/services/restaurantService";
import { Restaurant } from "@/services/restaurantService";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RestaurantCard from "@/components/RestaurantCard";
import AddRestaurantForm from "@/components/AddRestaurantForm";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Plus } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useAuth } from "@/contexts/AuthContext";

const RestaurantList = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isAddingRestaurant, setIsAddingRestaurant] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const restaurantsPerPage = 8;

  // Get QueryClient from the context
  const queryClient = useQueryClient();

  // Fetch restaurants with React Query
  const {
    data: restaurants = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["restaurants"],
    queryFn: fetchRestaurants,
  });

  // Add new restaurant mutation
  const addRestaurantMutation = useMutation({
    mutationFn: addRestaurant,
    onSuccess: () => {
      // Invalidate and refetch restaurants list
      queryClient.invalidateQueries({ queryKey: ["restaurants"] });
      toast({
        title: "เพิ่มร้านอาหารสำเร็จ",
        description: "ร้านอาหารใหม่ถูกเพิ่มเข้าสู่ระบบแล้ว",
      });
      setIsAddingRestaurant(false);
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "เกิดข้อผิดพลาด",
        description: `ไม่สามารถเพิ่มร้านอาหารได้: ${error.message}`,
      });
    },
  });

  // Calculate pagination
  const indexOfLastRestaurant = currentPage * restaurantsPerPage;
  const indexOfFirstRestaurant = indexOfLastRestaurant - restaurantsPerPage;
  const currentRestaurants = restaurants.slice(
    indexOfFirstRestaurant,
    indexOfLastRestaurant
  );
  const totalPages = Math.ceil(restaurants.length / restaurantsPerPage);

  const handleSubmit = (data: Omit<Restaurant, "id" | "created_at" | "updated_at">) => {
    addRestaurantMutation.mutate(data);
  };

  // Generate page numbers
  const getPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - 1 && i <= currentPage + 1)
      ) {
        pages.push(i);
      } else if (i === currentPage - 2 || i === currentPage + 2) {
        pages.push("ellipsis");
      }
    }
    return pages.filter((page, index, self) => {
      return (
        (page !== "ellipsis" || self[index - 1] !== "ellipsis") &&
        self.indexOf(page) === index
      );
    });
  };

  if (isError) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <div className="bg-destructive/10 text-destructive p-4 rounded-md my-8">
            <h2 className="text-xl font-semibold">เกิดข้อผิดพลาด</h2>
            <p>{(error as Error).message}</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-brand-brown mb-2">
              ร้านอาหารทั้งหมด
            </h1>
            <p className="text-foreground/70">
              ค้นพบร้านอาหารยอดนิยมในวังสามหมอ
            </p>
          </div>
          {user && (
            <Button
              onClick={() => setIsAddingRestaurant(!isAddingRestaurant)}
              className="bg-brand-orange text-white hover:bg-brand-orange/90"
            >
              {isAddingRestaurant ? "ยกเลิก" : <><Plus size={16} className="mr-2" /> เพิ่มร้านอาหาร</>}
            </Button>
          )}
        </div>

        {isAddingRestaurant && user && (
          <div className="mb-8">
            <AddRestaurantForm onSubmit={handleSubmit} isLoading={addRestaurantMutation.isPending} />
          </div>
        )}

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="space-y-3">
                <Skeleton className="h-48 w-full rounded-md" />
                <Skeleton className="h-7 w-3/4 rounded-md" />
                <Skeleton className="h-5 w-1/2 rounded-md" />
                <div className="flex justify-between">
                  <Skeleton className="h-5 w-1/4 rounded-md" />
                  <Skeleton className="h-5 w-1/4 rounded-md" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {currentRestaurants.map((restaurant) => (
                <RestaurantCard
                  key={restaurant.id}
                  name={restaurant.name}
                  image={restaurant.image_url || ""}
                  cuisine={restaurant.cuisine}
                  rating={restaurant.rating || 0}
                  deliveryTime={restaurant.delivery_time || ""}
                  distance={restaurant.distance || ""}
                  isPromoted={restaurant.is_promoted || false}
                />
              ))}
            </div>

            {totalPages > 1 && (
              <Pagination className="mt-8">
                <PaginationContent>
                  {currentPage > 1 && (
                    <PaginationItem>
                      <PaginationPrevious
                        onClick={() => setCurrentPage(currentPage - 1)}
                      />
                    </PaginationItem>
                  )}

                  {getPageNumbers().map((page, index) =>
                    page === "ellipsis" ? (
                      <PaginationItem key={`ellipsis-${index}`}>
                        <PaginationEllipsis />
                      </PaginationItem>
                    ) : (
                      <PaginationItem key={page}>
                        <PaginationLink
                          isActive={page === currentPage}
                          onClick={() => setCurrentPage(page as number)}
                        >
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    )
                  )}

                  {currentPage < totalPages && (
                    <PaginationItem>
                      <PaginationNext
                        onClick={() => setCurrentPage(currentPage + 1)}
                      />
                    </PaginationItem>
                  )}
                </PaginationContent>
              </Pagination>
            )}
          </>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default RestaurantList;
