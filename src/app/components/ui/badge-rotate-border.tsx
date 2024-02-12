import { ReactNode } from "react";

type BadgeBackgroundShine = {
    children: ReactNode;
  };

export function BadgeRotateBorder({children} : BadgeBackgroundShine) {
    return (
        <div className="relative inline-flex overflow-hidden rounded-full p-px">
        <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#c2c2c2_0%,#505050_50%,#bebebe_100%)]" />
        <span className="inline-flex h-full w-full items-center justify-center rounded-full bg-neutral-950 px-3 py-1 text-xs font-medium text-gray-50 backdrop-blur-3xl">
         {children}
        </span>
      </div>
    );
  }
  