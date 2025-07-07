// src/lib/supabase.js
import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL   = 'https://eblkvfqboefgajgnichi.supabase.co'
const SUPABASE_ANON  = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVibGt2ZnFib2VmZ2FqZ25pY2hpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU1MTQ1MDcsImV4cCI6MjA2MTA5MDUwN30.THqD45aUNAJeelzOmwq5_1D_4OKlCzeqla-eTUCUJgY'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON)
