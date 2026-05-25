import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Lamp, Blocks, Car, Wrench, Package, FlaskConical, Printer } from "lucide-react";
import { ProductGrid } from "./ProductGrid";

const categories = [
  {
    id: "lamparas",
    name: "Lámparas",
    icon: Lamp,
    description: "Diseños únicos en impresión 3D",
    query: "tag:lampara OR tag:lamparas OR tag:luz",
  },
  {
    id: "jugueteria",
    name: "Juguetería",
    icon: Blocks,
    description: "Juguetes personalizados y creativos",
    query: "tag:juguete OR tag:juguetes OR tag:toy",
  },
  {
    id: "autopartes",
    name: "Autopartes",
    icon: Car,
    description: "Piezas de repuesto a medida",
    query: "tag:autoparte OR tag:autopartes OR tag:auto",
  },
  {
    id: "repuestos-impresoras",
    name: "Repuestos 3D",
    icon: Wrench,
    description: "Repuestos y accesorios para impresoras 3D",
    query: "tag:repuesto OR tag:repuestos OR tag:impresora OR tag:printer",
  },
  {
    id: "filamentos",
    name: "Filamentos",
    icon: Package,
    description:
      "Filamentos PLA, PETG, ABS y TPU de marcas top: Bambu Lab, Polymaker, eSUN, Sunlu, Prusament, Hatchbox y Overture",
    query:
      "tag:filamento OR tag:filamentos OR tag:pla OR tag:petg OR tag:abs OR tag:tpu OR tag:bambulab OR tag:polymaker OR tag:esun OR tag:sunlu OR tag:prusament",
  },
  {
    id: "resinas",
    name: "Resinas UV",
    icon: FlaskConical,
    description:
      "Resinas UV para impresión SLA/DLP de marcas líderes: Anycubic, Elegoo, Siraya Tech, Phrozen, eSUN y Sunlu",
    query:
      "tag:resina OR tag:resinas OR tag:uv OR tag:sla OR tag:dlp OR tag:anycubic OR tag:elegoo OR tag:sirayatech OR tag:phrozen",
  },
  {
    id: "impresoras",
    name: "Impresoras 3D",
    icon: Printer,
    description:
      "Impresoras 3D FDM y resina de marcas top: Bambu Lab, Prusa, Creality, Anycubic, Elegoo, Phrozen y Flashforge",
    query:
      "tag:impresora3d OR tag:printer3d OR tag:fdm OR tag:sla OR tag:bambulab OR tag:prusa OR tag:creality OR tag:anycubic OR tag:elegoo OR tag:phrozen OR tag:flashforge",
  },
];

export const CategoryTabs = () => {
  return (
    <div className="w-full">
      <Tabs defaultValue="lamparas" className="w-full">
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 mb-8 h-auto">
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
