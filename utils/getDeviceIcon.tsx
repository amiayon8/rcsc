import {
    Laptop,
    Smartphone,
    Tablet,
    HelpCircle,
} from 'lucide-react'

export function getDeviceIcon(deviceType: string) {
    switch (deviceType) {
        case 'mobile':
            return Smartphone
        case 'tablet':
            return Tablet
        case 'desktop':
            return Laptop
        default:
            return HelpCircle
    }
}
