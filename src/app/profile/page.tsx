"use client";

import { useUser } from '@clerk/nextjs';
import { useQuery } from 'convex/react';
import React, { useState } from 'react'
import { api } from '../../../convex/_generated/api';
import ProfileHeader from '@/components/ProfileHeader';

const ProfilePage = () => {

  const {user} = useUser();
  const userId = user?.id as string;

  const allPlans= useQuery(api.plans.getUserPlans, {userId});
  const {selectedPlanId, setSelectedPlanId} = useState<null | string>(null);
  const activePlan = allPlans.find(plan => plan.isActive);

  const currentPlan = selectedPlanId ? allPlans?.find(plan => plan._id === selectedPlanId) : activePlan;
  return (
    <section className="relative z-10 pt-12 pb-32 flex-grow container mx-auto px-4">
       <ProfileHeader user={user} />
     {allPlans && allPlans?.length > 0 ? (
      <div>
        you got the plans
      </div>
     ) : (
      <NoFitnessPlan />
     )}
    </section>
  )
  
}

export default ProfilePage