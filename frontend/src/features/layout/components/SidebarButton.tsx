import type { ButtonHTMLAttributes, ComponentType } from "react";

type MenuButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  active?: boolean;
  icon?: ComponentType<{ className?: string }>;
};

export default function SidebarButton({
  active = false,
  children,
  icon: Icon,
  className = "",
  ...props
}: MenuButtonProps) {
  return (
    <button
      className={`
        flex items-center gap-2
        text-left
        px-2
        py-1
        rounded-md
        transition-colors
        hover:bg-mist-600
        cursor-pointer
        ${active ? "bg-mist-600 cursor-default" : ""}
        ${className}
      `}
      {...props}
    >
      {Icon && <Icon className="w-4 h-4" />}
      <span>{children}</span>
    </button>
  );
}
