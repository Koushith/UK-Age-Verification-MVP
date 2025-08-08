import { Rocket } from 'lucide-react';
import { Button } from '../ui/button';

export const ComingSoonTab = ({ country, waitlistUrl }: { country: string; waitlistUrl?: string }) => (
  <div
    className="rounded-lg p-8 text-center h-full flex flex-col items-center justify-center border border-white/20"
    style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
  >
    <div className="h-12 w-12 mx-auto mb-4 rounded-full bg-white/20 flex items-center justify-center">
      <Rocket className="h-6 w-6 text-white/80" />
    </div>
    <h3 className="text-lg font-medium text-white">Coming to {country}</h3>
    <p className="text-sm text-white/70 mt-2 mb-6">Join the waitlist for early access</p>
    <Button
      onClick={() => {
        if (waitlistUrl) {
          window.open(waitlistUrl, '_blank');
        }
      }}
      size="sm"
      className="bg-white/20 border border-white/30 text-white hover:bg-white/30 hover:text-white px-4 py-2 text-sm font-medium rounded-lg backdrop-blur-sm"
    >
      Join Waitlist
    </Button>
  </div>
);

export const IndustryCard = ({ icon: Icon, title, description }: { icon: any; title: string; description: string }) => (
  <div className="flex items-start gap-4 rounded-xl border border-gray-100 bg-white p-6 transition-all hover:border-primary/20 hover:shadow-lg">
    <div
      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-white shadow-md"
      style={{ backgroundColor: 'rgb(0, 0, 238)' }}
    >
      <Icon className="h-5 w-5" />
    </div>
    <div>
      <h3 className="font-semibold text-gray-900">{title}</h3>
      <p className="mt-2 text-base text-gray-600">{description}</p>
    </div>
  </div>
);
