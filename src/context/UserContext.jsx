import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase, getProfile, getUserApplications } from '../lib/supabase';

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check active session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setUser(session.user);
        fetchUserData(session.user.id);
      } else {
        setLoading(false);
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        setUser(session.user);
        fetchUserData(session.user.id);
      } else {
        setUser(null);
        setProfile(null);
        setApplications([]);
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchUserData = async (userId) => {
    try {
      setLoading(true);
      const [profileData, appsData] = await Promise.all([
        getProfile(userId),
        getUserApplications(userId)
      ]);
      setProfile(profileData);
      setApplications(appsData);
    } catch (err) {
      console.error('Error fetching user data:', err);
    } finally {
      setLoading(false);
    }
  };

  const refreshProfile = async () => {
    if (user) {
      const data = await getProfile(user.id);
      setProfile(data);
    }
  };

  const refreshApplications = async () => {
    if (user) {
      const data = await getUserApplications(user.id);
      setApplications(data);
    }
  };

  const applyToJob = async (jobId) => {
    if (!user) return false;
    try {
      await import('../lib/supabase').then(m => m.applyForJob(user.id, jobId));
      await refreshApplications();
      return true;
    } catch (err) {
      console.error('Error applying for job:', err);
      return false;
    }
  };

  const value = {
    user,
    profile,
    applications,
    loading,
    refreshProfile,
    refreshApplications,
    applyToJob,
    isAdmin: profile?.role === 'admin',
    isPartner: profile?.role === 'partner'
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
