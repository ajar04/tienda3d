import { useQuery } from "@tanstack/react-query";
import { storefrontApiRequest, STOREFRONT_QUERY } from "@/lib/shopify";
import { ProductCard } from "./ProductCard";
import { Loader2 } from "lucide-react";
import type { ShopifyProduct } from "@/stores/cartStore";

interface ProductGridProps {
  query?: string;
  categoryName: string;
}

export const ProductGrid = ({ query, categoryName }: ProductGridProps) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['products', query],
    queryFn: async () => {
      const response = await storefrontApiRequest(STOREFRONT_QUERY, {
        first: 12,
        query: query || null
      });
      return response.data.products.edges as ShopifyProduct[];
    }
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Error al cargar los productos</p>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground mb-4">
          No hay productos en la categoría {categoryName}
        </p>
        <p className="text-sm text-muted-foreground">
          Crea productos y etiquétalos apropiadamente para mostrarlos aquí
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {data.map((product) => (
        <ProductCard key={product.node.id} product={product} />
      ))}
    </div>
  );
};
