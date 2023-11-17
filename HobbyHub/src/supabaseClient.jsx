// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://epeubbazjpxtzmlthkcr.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVwZXViYmF6anB4dHptbHRoa2NyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTk5NDU1NjMsImV4cCI6MjAxNTUyMTU2M30.chicwztU19qLtsFlz3ronDPkeU_ecvl3cqYafbB5yEw';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;

