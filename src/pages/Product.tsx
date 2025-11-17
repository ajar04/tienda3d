import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { storefrontApiRequest } from "@/lib/shopify";
import { Button } from "@/components/ui/button";
import { CartDrawer } from "@/components/CartDrawer";
import { ArrowLeft, ShoppingCart, Loader2, Printer } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";
import type { ShopifyProduct } from "@/stores/cartStore";

const PRODUCT_QUERY = `
  query GetProduct($handle: String!) {
    product(handle: $handle) {
      id
      title
      description
      handle
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
      }
      images(first: 5) {
        edges {
          node {
            url
            altText
          }
        }
      }
      variants(first: 10) {
        edges {
          node {
            id
            title
            price {
              amount
              currencyCode
            }
            availableForSale
            selectedOptions {
              name
              value
            }
          }
        }
      }
      options {
        name
        values
      }
    }
  }
`;

const Product = () => {
  const { handle } = useParams();
  const addItem = useCartStore(state => state.addItem);

  const { data, isLoading, error } = useQuery({
    queryKey: ['product', handle],
    queryFn: async () => {
      const response = await storefrontApiRequest(PRODUCT_QUERY, { handle });
      return response.data.product;
    },
    enabled: !!handle
  });

  const handleAddToCart = () => {
    if (!data) return;
    
    const variant = data.variants.edges[0]?.node;
    if (!variant) return;

    const product: ShopifyProduct = {
      node: data
    };

    const cartItem = {
      product,
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions || []
    };
    
    addItem(cartItem);
    toast.success("Producto agregado", {
      description: `${data.title} se agregó al carrito`
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">Producto no encontrado</p>
          <Link to="/">
            <Button>Volver a la tienda</Button>
          </Link>
        </div>
      </div>
    );
  }

  const imageUrl = data.images.edges[0]?.node.url;
  const price = data.priceRange.minVariantPrice;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Printer className="w-8 h-8 text-primary" />
            <div>
              <h1 className="text-2xl font-bold">Print & Play Makers</h1>
              <p className="text-sm text-muted-foreground">Impresión 3D a tu medida</p>
            </div>
          </div>
          <CartDrawer />
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Link to="/">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver a la tienda
          </Button>
        </Link>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="aspect-square overflow-hidden rounded-lg bg-secondary/10">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={data.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <ShoppingCart className="w-24 h-24 text-muted-foreground" />
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">{data.title}</h1>
              <p className="text-2xl font-bold text-primary">
                {price.currencyCode} ${parseFloat(price.amount).toFixed(2)}
              </p>
            </div>

            <div className="prose prose-sm max-w-none">
              <p className="text-muted-foreground">{data.description}</p>
            </div>

            <Button onClick={handleAddToCart} size="lg" className="w-full md:w-auto">
              <ShoppingCart className="w-5 h-5 mr-2" />
              Agregar al carrito
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
