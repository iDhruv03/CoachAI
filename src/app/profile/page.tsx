"use client";

import { useUser } from '@clerk/nextjs';
import { useQuery } from 'convex/react';
import React, { useState } from 'react'
import { api } from '../../../convex/_generated/api';
import ProfileHeader from '@/components/ProfileHeader';
import NoFitnessPlan from '@/components/NoFitnessPlan';
import CornerElements from '@/components/CornerElements';

const ProfilePage = () => {

  const {user} = useUser();
  const userId = user?.id as string;

  const allPlans= useQuery(api.plans.getUserPlans, {userId});
  const {selectedPlanId, setSelectedPlanId} = useState<null | string>(null);
  const activePlan = allPlans?.find(plan => plan.isActive);

  const currentPlan = selectedPlanId ? allPlans?.find(plan => plan._id === selectedPlanId) : activePlan;
  return (
    <section className="relative z-10 pt-12 pb-32 flex-grow container mx-auto px-4">
       <ProfileHeader user={user} />

      {allPlans && allPlans?.length > 0 ? (
        <div className="space-y-8">
          {/* PLAN SELECTOR */}
          <div className="relative backdrop-blur-sm border border-border p-6">
            <CornerElements />

            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold tracking-tight">
                <span className="text-primary">Your</span>{" "}
                <span className="text-foreground">Fitness Plans</span>
              </h2>
              <div className="font-mono text-xs text-muted-foreground">
                TOTAL: {allPlans.length}
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {allPlans.map(plan => (
                <Button key={plan._id}
                onClick={()=> setSelectedPlanId(plan._id)}
                className={`text-foreground border hover:text-white ${
                    selectedPlanId === plan._id
                      ? "bg-primary/20 text-primary border-primary"
                      : "bg-transparent border-border hover:border-primary/50"
                  }`}
                >

                </Button>
              ))}

            </div>
          </div>

      </div>
     ) : (
      <NoFitnessPlan />
     )}
    </section>
  )
  
}

export default ProfilePage