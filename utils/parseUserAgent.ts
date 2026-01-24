import { UAParser } from 'ua-parser-js'

export function parseUserAgent(userAgent: string | null) {
    if (!userAgent) {
        return {
            deviceType: 'desktop',
            browser: 'Unknown',
            os: 'Unknown',
        }
    }

    const parser = new UAParser(userAgent)
    const result = parser.getResult()

    return {
        deviceType: result.device.type || 'desktop',
        browser: result.browser.name || 'Unknown',
        os: result.os.name || 'Unknown',
    }
}
