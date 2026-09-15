import React from "react";
import { SectionHeader } from "../ui/SectionHeader";
import { TechnicalFrame } from "../ui/TechnicalFrame";
import { Badge } from "../ui/Badge";
import { ArrowRight, Droplets, Gauge, Settings, ShieldCheck } from "lucide-react";

export const FlowSystemScaffold: React.FC = () => {
  const stages = [
    {
      step: "01",
      name: "SOURCE",
      icon: Droplets,
      desc: "Open well, sump, groundwater source, or water inlet.",
      meta: "WATER SOURCE",
    },
    {
      step: "02",
      name: "PUMP",
      icon: Settings,
      desc: "Motor and impeller system transferring mechanical energy to fluid.",
      meta: "PUMP UNIT",
    },
    {
      step: "03",
      name: "WATER MOVEMENT",
      icon: Gauge,
      desc: "Dynamic pressure and volumetric flow directing water through delivery lines.",
      meta: "WATER MOVEMENT",
    },
    {
      step: "04",
      name: "APPLICATION",
      icon: ShieldCheck,
      desc: "Delivered water for domestic, agricultural, or general water-handling applications.",
      meta: "APPLICATION",
    },
  ];

  return (
    <section id="flow-system" className="py-8 sm:py-12 border-b border-graphite-800 bg-graphite-900/60 technical-grid-dense">
      <div className="container">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
          <SectionHeader
            index="02.1"
            tag="CONCEPTUAL OVERVIEW"
            title="FROM SOURCE TO APPLICATION"
            description="A visual overview of how pumping systems connect water sources with their intended applications."
            className="mb-0"
          />
          <Badge variant="accent" indicator className="mt-4 md:mt-0 self-start md:self-auto">
            CONCEPTUAL FLOW
          </Badge>
        </div>

        {/* Schematic Step Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stages.map((stage, idx) => {
            const Icon = stage.icon;
            return (
              <TechnicalFrame
                key={stage.step}
                headerLabel={`PHASE ${stage.step}`}
                headerMeta={stage.meta}
                className="relative group hover:border-precision-cyan/40 transition-all"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-sm bg-graphite-850 border border-graphite-800 flex items-center justify-center text-precision-cyan group-hover:bg-precision-cyan/10 transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                  {idx < stages.length - 1 && (
                    <ArrowRight className="hidden lg:block w-4 h-4 text-steel-600 group-hover:text-precision-cyan transition-colors" />
                  )}
                </div>

                <h3 className="text-lg font-bold font-display text-white mb-2">
                  {stage.name}
                </h3>
                <p className="text-xs text-steel-400 leading-relaxed">
                  {stage.desc}
                </p>
              </TechnicalFrame>
            );
          })}
        </div>
      </div>
    </section>
  );
};
