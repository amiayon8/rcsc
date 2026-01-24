import { createClient } from '@/utils/supabase/server';
import { lookupIpsBatch } from '@/utils/ipLookup';

export async function enrichUserSessions(userId: string) {
    const supabase = await createClient();

    const { data: sessions, error: fetchError } = await supabase
        .from('user_sessions')
        .select('id, ip')
        .eq('user_id', userId)
        .is('country', null)
        .not('ip', 'is', null);

    if (fetchError || !sessions || sessions.length === 0) return;
    const uniqueIps = [...new Set(sessions.map(s => s.ip.replace(/\/\d+$/, '')))];
    const locations = await lookupIpsBatch(uniqueIps);
    if (!locations || locations.length === 0) return;
    const locationMap = new Map(locations.map(l => [l.ip.replace(/\/\d+$/, ''), l]));

    const updates = sessions
        .map(s => {
            const cleanIp = s.ip.replace(/\/\d+$/, '');
            const loc = locationMap.get(cleanIp);
            if (!loc) return null;

            return supabase
                .from('user_sessions')
                .update({
                    city: loc.city,
                    region: loc.region,
                    country: loc.country,
                    country_code: loc.country_code,
                })
                .eq('id', s.id);
        })
        .filter(Boolean);

    if (updates.length === 0) return;

    await Promise.all(updates);
}
