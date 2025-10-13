import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'
const supabaseUrl = "https://hrwaanrvbvmistwqfjdx.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhyd2FhbnJ2YnZtaXN0d3FmamR4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkxNTM4NzYsImV4cCI6MjA3NDcyOTg3Nn0.ldfpNhDLAH-JpmY4CtEqAdHdQYUm0o3tsyPCwagfxNU"
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
        storage: AsyncStorage,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
    },
})