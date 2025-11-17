import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Lamp, Blocks, Car } from "lucide-react";
import { ProductGrid } from "./ProductGrid";

const categories = [
  {
    id: "lamparas",
    name: "Lámparas",
    icon: Lamp,
    description: "Diseños únicos en impresión 3D",
    query: "tag:lampara OR tag:lamparas OR tag:luz"
  },
  {
    id: "jugueteria",
    name: "Juguetería",
    icon: Blocks,
    description: "Juguetes personalizados y creativos",
    query: "tag:juguete OR tag:juguetes OR tag:toy"
  },
  {
    id: "autopartes",
    name: "Autopartes",
    icon: Car,
    description: "Piezas de repuesto a medida",
    query: "tag:autoparte OR tag:autopartes OR tag:auto"
  }
];

export const CategoryTabs = () => {
  return (
    <div className="w-full">
      <Tabs defaultValue="lamparas" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <HoverCard key={category.id} openDelay={200}>
                <HoverCardTrigger asChild>
                  <TabsTrigger 
                    value={category.id}
                    className="flex items-center gap-2"
                  >
                    <Icon className="w-4 h-4" />
                    {category.name}
                  </TabsTrigger>
                </HoverCardTrigger>
                <HoverCardContent className="w-80" align="center">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Icon className="w-5 h-5 text-primary" />
                      <h4 className="font-semibold">{category.name}</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {category.description}
                    </p>
                    <div className="pt-2">
                      <p className="text-xs text-muted-foreground italic">
                        Haz clic para ver todos los productos
                      </p>
                    </div>
                  </div>
                </HoverCardContent>
              </HoverCard>
            );
          })}
        </TabsList>

        {categories.map((category) => (
          <TabsContent key={category.id} value={category.id}>
            <ProductGrid query={category.query} categoryName={category.name} />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};
