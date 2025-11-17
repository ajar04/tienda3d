import { CartDrawer } from "@/components/CartDrawer";
import { CategoryTabs } from "@/components/CategoryTabs";
import { Printer } from "lucide-react";

const Index = () => {
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

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary/5 to-background py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Innovación en Impresión 3D
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Lámparas únicas, juguetes personalizados y autopartes de calidad.
            Todo fabricado con la mejor tecnología de impresión 3D.
          </p>
        </div>
      </section>

      {/* Products Section */}
      <section className="container mx-auto px-4 py-12">
        <CategoryTabs />
      </section>

      {/* Footer */}
      <footer className="border-t mt-16 py-8 bg-muted/30">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2024 Print & Play Makers. Todos los derechos reservados.</p>
          <p className="mt-2">Impresión 3D profesional para tus proyectos</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
