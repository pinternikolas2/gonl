import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder-url.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key'

// Placeholder pro MVP ucely. 
// V skutecnosti by se URL a KEY mely brat z prostredi (napr .env.local)
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export const uploadResume = async (file, userId) => {
  const fileExt = file.name.split('.').pop()
  const fileName = `${userId}_${Math.random()}.${fileExt}`
  const filePath = `${fileName}`

  const { error: uploadError } = await supabase.storage
    .from('resumes')
    .upload(filePath, file)

  if (uploadError) throw uploadError

  const { data: { publicUrl } } = supabase.storage
    .from('resumes')
    .getPublicUrl(filePath)

  return publicUrl
}
