import React from 'react';
import OnboardingFlow from '../components/OnboardingFlow';
import { useNavigate } from 'react-router-dom';

export default function OnboardingPage() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen">
      <OnboardingFlow onComplete={() => {
        sessionStorage.setItem('gonl_role', 'candidate');
        navigate('/dashboard');
      }} />
    </div>
  );
}
