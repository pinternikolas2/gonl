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

export const getProfile = async (userId) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single()
  
  if (error) throw error
  return data
}

export const updateProfile = async (userId, updates) => {
  const { data, error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', userId)
    .select()
    .single()
  
  if (error) throw error
  return data
}

export const applyForJob = async (userId, jobId) => {
  const { data, error } = await supabase
    .from('applications')
    .insert([{ user_id: userId, job_id: jobId }])
    .select()
    .single()
  
  if (error) throw error
  return data
}

export const getUserApplications = async (userId) => {
  const { data, error } = await supabase
    .from('applications')
    .select(`
      *,
      job:jobs(*)
    `)
    .eq('user_id', userId)
  
  if (error) throw error
  return data
}
