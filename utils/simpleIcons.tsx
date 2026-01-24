// components/icons/SimpleIcon.tsx
import * as icons from "simple-icons";

type SimpleIconProps = {
    name: keyof typeof icons;
    size?: number;
    color?: string;
    className?: string;
};

export function SimpleIcon({
    name,
    size = 24,
    color = "currentColor",
    className,
}: SimpleIconProps) {
    const icon = icons[name];

    if (!icon) return null;

    return (
        <svg
            role="img"
            viewBox="0 0 24 24"
            width={size}
            height={size}
            fill={color}
            className={className}
            dangerouslySetInnerHTML={{ __html: icon.svg }}
        />
    );
}
