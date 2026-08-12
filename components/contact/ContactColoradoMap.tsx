import Image from "next/image";

import { CONTACT_OFFICE } from "@/lib/contact";
import { img } from "@/lib/images";

/**
 * Contact office map — uses the processed Colorado HQ plate as-is.
 */
export function ContactColoradoMap({ className }: { className?: string }) {
  const map = img("map-denver");

  return (
    <div className={className}>
      <Image
        src={map.src}
        width={map.width}
        height={map.height}
        alt={CONTACT_OFFICE.mapAlt}
        sizes="(min-width: 1024px) 28rem, 100vw"
        className="aspect-[5/4] w-full object-cover"
      />
    </div>
  );
}
