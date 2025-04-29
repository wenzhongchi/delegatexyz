import { FC } from 'react';
import Link from 'next/link';
import { ArrowRightIcon } from 'lucide-react';

import { Button } from '../ui/button';

export const Footer: FC = () => {
  return (
    <footer className="bg-black text-white py-20 text-center">
      <h2 className="text-3xl md:text-4xl font-semibold mb-4">Get Started Today</h2>
      <p className="text-lg text-gray-400 mb-8">Take control of your on-chain identity now.</p>
      <Link href="/app">
        <Button className="text-lg px-6 py-4">
          Launch App <ArrowRightIcon className="ml-2 w-5 h-5" />
        </Button>
      </Link>
    </footer>
  );
};
