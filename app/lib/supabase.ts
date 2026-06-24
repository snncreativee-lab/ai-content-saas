import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://fvqgrpmerfmbedqkrsds.supabase.co";

const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ2cWdycG1lcmZtYmVkcWtyc2RzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MjE5NTQ1OCwiZXhwIjoyMDk3NzcxNDU4fQ.XxeIW4RbNCC7SCKQmarcvyWLq6pojkUZe5wQHxHDeIE";

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
);