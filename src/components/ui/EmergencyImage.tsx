import React from "react";
import Image from "next/image";

interface EmergencyImageProps {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
}

export default function EmergencyImage({
  src,
  alt,
  priority = true,
  className = "",
}: EmergencyImageProps) {
  return (
    <div className={`w-full rounded-2xl overflow-hidden border border-slate-200/80 shadow-xs bg-white ${className}`}>
      <div className="relative w-full aspect-4/3 max-h-72">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover object-center"
          priority={priority}
          sizes="(max-width: 640px) 100vw, 448px"
        />
      </div>
    </div>
  );
}
