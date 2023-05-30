import { SupabaseClient, createClient } from "@supabase/supabase-js";
import { Database } from "~/types/supabase";

let instance = ref<SupabaseClient<Database, "public">>();

export default (): SupabaseClient<Database, "public"> => {
    const config = useRuntimeConfig();
    if (instance.value == null) {
        instance.value = createClient<Database>(config.public.SupabaseUrl, config.public.SupabaseAnonKey, {
            auth: {
                autoRefreshToken: true,
            }
        });
    }
    return instance.value;
}
