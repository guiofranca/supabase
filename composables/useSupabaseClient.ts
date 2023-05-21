import { SupabaseClient, createClient } from "@supabase/supabase-js";
import { Database } from "~/libs/types/Supabase.types";

let instance = ref<SupabaseClient<Database, "public">>();

export default (): SupabaseClient<Database, "public"> => {
    const config = useRuntimeConfig();
    if(instance.value == null) {
        console.log("Criando instancia");
        instance.value = createClient<Database>(config.public.SupabaseUrl, config.public.SupabaseAnonKey, {
            auth:{
                autoRefreshToken: true,
            }
        });
    }
    return instance.value;
}
