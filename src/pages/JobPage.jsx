import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import JobDetail from '../components/JobDetail';
import RoleSwitcher from '../components/RoleSwitcher';

import { useUser } from '../context/UserContext';
import { supabase } from '../lib/supabase';

export default function JobPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { profile, applyToJob } = useUser();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    async function fetchJob() {
      try {
        const { data, error } = await supabase
          .from('jobs')
          .select('*')
          .eq('id', id)
          .single();
        if (error) throw error;
        setJob(data);
      } catch (err) {
        console.error('Error fetching job:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchJob();
  }, [id]);

  if (loading) return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center">
      <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }} className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full" />
    </div>
  );

  if (!job) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Práce nenalezena</h2>
          <button onClick={() => navigate('/dashboard')} className="text-orange-600 font-medium hover:underline">
            Zpět na dashboard
          </button>
        </div>
      </div>
    );
  }

  const handleApply = async () => {
    if (!profile) {
      // Not logged in, save and redirect
      sessionStorage.setItem('gonl_applied_job_id', job.id);
      navigate('/auth');
      return;
    }

    const success = await applyToJob(job.id);
    if (success) {
      sessionStorage.setItem('gonl_applied_job', 'true'); // For dashboard welcome msg
      navigate('/dashboard');
    } else {
      alert('Chyba při odesílání přihlášky.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <main className="max-w-2xl mx-auto px-6 pt-28 pb-16 flex justify-center">
        <JobDetail 
          job={job}
          onBack={() => navigate(-1)}
          onApply={handleApply}
          isApplied={false}
        />
      </main>
    </div>
  );
}
