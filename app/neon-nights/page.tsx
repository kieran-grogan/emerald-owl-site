import { redirect } from 'next/navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Neon Nights | Emerald Owl Productions',
  description: 'Transform your event with our vibrant Neon Nights experience - glow in the dark entertainment that dazzles and excites.',
};

export default function NeonNightsRedirect() {
  redirect('/services/neon-nights');
  return null;
} 