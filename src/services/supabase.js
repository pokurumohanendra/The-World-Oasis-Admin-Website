import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://vktwoahyxelqhgmeimjd.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZrdHdvYWh5eGVscWhnbWVpbWpkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM0ODQzMjIsImV4cCI6MjA5OTA2MDMyMn0.nriQpgHjy_wpJ6dEpmO9_7q4zgk_Tj50ZipCvxZkZTU";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
