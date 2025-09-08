'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface User {
  id: number;
  name: string;
  email: string;
  subscription: 'free' | 'premium' | 'expired';
}

export default function SubscriptionPage() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      router.push('/login');
    }
    setIsLoading(false);
  }, [router]);

  if (isLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
       <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-black font-heading">Subscription</h1>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <div className="bg-white shadow-md rounded-lg p-8">
                <h2 className="text-2xl font-bold text-black mb-4 font-heading">Your Current Plan</h2>
                <p className="text-lg capitalize">You are currently on the <span className="font-bold text-[rgb(var(--primary))]">{user.subscription}</span> plan.</p>
                
                <div className="mt-10">
                    <h2 className="text-2xl font-bold text-black mb-6 font-heading">Upgrade Your Plan</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="border rounded-lg p-6 flex flex-col">
                            <h3 className="text-xl font-bold font-heading">Premium Monthly</h3>
                            <p className="text-4xl font-bold my-4">$10<span className="text-lg font-normal">/month</span></p>
                            <ul className="space-y-2 text-gray-600">
                                <li>Access to all premium templates</li>
                                <li>Unlimited resume and cover letter creation</li>
                                <li>Priority support</li>
                            </ul>
                            <button className="mt-auto bg-[rgb(var(--primary))] text-white py-3 px-4 rounded-lg hover:bg-[rgb(var(--primary-dark))] transition-colors font-medium mt-6">Upgrade to Monthly</button>
                        </div>
                        <div className="border rounded-lg p-6 flex flex-col">
                            <h3 className="text-xl font-bold font-heading">Premium Yearly</h3>
                            <p className="text-4xl font-bold my-4">$100<span className="text-lg font-normal">/year</span></p>
                            <ul className="space-y-2 text-gray-600">
                                <li>Access to all premium templates</li>
                                <li>Unlimited resume and cover letter creation</li>
                                <li>Priority support</li>
                                <li className="font-bold text-[rgb(var(--primary))]">Save 2 months!</li>
                            </ul>
                            <button className="mt-auto bg-[rgb(var(--primary))] text-white py-3 px-4 rounded-lg hover:bg-[rgb(var(--primary-dark))] transition-colors font-medium mt-6">Upgrade to Yearly</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </main>
    </div>
  );
}
