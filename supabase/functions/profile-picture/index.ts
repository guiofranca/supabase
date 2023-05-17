import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.21.0"

serve(async (req: Request) => {
    try {
        const content = await req.json();

        const supabase = createClient(
            Deno.env.get('SUPABASE_URL') ?? '',
            Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
        );

        const user = await supabase.auth.admin.getUserById(content.record.id);

        if(user.data.user?.app_metadata?.provider != 'google') {
            return new Response(JSON.stringify({message: 'no action'}), {
                headers: { 'Content-Type': 'application/json' },
                status: 200,
            });
        }

        const pictureUrl = user.data.user?.user_metadata?.avatar_url;

        const download = await fetch(pictureUrl);
        const blob = await download.blob();

        await supabase.storage.from('avatars').upload(`public/${content.record.id}`, blob);

        const profile = await supabase.from('profiles').update({has_avatar: true}).eq('id', content.record.id);

        return new Response(JSON.stringify(profile), {
            headers: { 'Content-Type': 'application/json' },
            status: 200,
        })
    } catch (error) {
        console.log(error);
        return new Response(JSON.stringify({ error: error.message }), {
            headers: { 'Content-Type': 'application/json' },
            status: 400,
        })
    }
})