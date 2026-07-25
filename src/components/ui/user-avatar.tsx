import Image from "next/image";

import { cn } from "@/lib/utils";

interface UserAvatarProps {
  name?: string | null;
  image?: string | null;
  className?: string;
}

export function UserAvatar({ name, image, className }: UserAvatarProps) {
  const initials = getUserInitials(name);

  if (image) {
    return (
      <Image
        src={image}
        alt={name ? `${name} avatar` : "User avatar"}
        width={36}
        height={36}
        unoptimized
        className={cn("size-9 rounded-md object-cover", className)}
      />
    );
  }

  return (
    <span
      className={cn(
        "flex size-9 shrink-0 items-center justify-center rounded-md bg-secondary text-sm font-semibold text-secondary-foreground",
        className,
      )}
      aria-label={name ? `${name} avatar` : "User avatar"}
    >
      {initials}
    </span>
  );
}

export function getUserInitials(name?: string | null) {
  const parts = name?.trim().split(/\s+/).filter(Boolean) ?? [];

  if (parts.length === 0) {
    return "DU";
  }

  return parts
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}
