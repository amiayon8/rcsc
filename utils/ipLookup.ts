type BatchRequest = {
    query: string
    fields: string
}

type IpApiResponse = {
    status: 'success' | 'fail'
    country?: string
    countryCode?: string
    regionName?: string
    city?: string
    lat?: number
    lon?: number
    query?: string
    message?: string
}

export async function lookupIpsBatch(ips: string[]) {
    const payload: BatchRequest[] = ips.map(ip => ({
        query: ip,
        fields: 'status,country,countryCode,regionName,city,query',
    }))

    const res = await fetch('http://ip-api.com/batch', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    })

    if (!res.ok) {
        throw new Error('Batch IP lookup failed')
    }

    const data = (await res.json()) as IpApiResponse[]

    return data
        .filter(r => r.status === 'success')
        .map(r => ({
            ip: r.query!,
            country: r.country!,
            country_code: r.countryCode!,
            city: r.city!,
            region: r.regionName!,
        }))
}
