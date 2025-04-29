'use client';
import { CogIcon, MoveRightIcon, RainbowIcon, SearchIcon, ShieldPlusIcon } from 'lucide-react';

import { DelegateDialog } from '@/components/delegate-dialog/DelegateDialog';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useDelegateStore } from '@/stores/delegate-store';

export default function Home() {
  const { setOpen } = useDelegateStore();

  const handleOpenDelegateModal = () => {
    setOpen(true);
  };
  return (
    <main className="min-h-screen bg-black text-white h-svh flex flex-col">
      <div
        onClick={handleOpenDelegateModal}
        className="flex w-full min-h-auto items-center justify-between gap-1 p-3 text-white  bg-de-light rounded-none hover:bg-de-light cursor-pointer"
      >
        <div className="flex-1 text-center">
          Migrate your assets & delegations to Delegate v2 to take advantage of lower gas costs &
          more features
        </div>
        <MoveRightIcon className="w-10 opacity-70 shrink-0" />
      </div>
      {/* header */}
      <Header />
      <section className="z-10 flex w-full flex-col justify-between h-svh overflow-visible">
        <div className="pb-5 sm:pb-10 gap-10 w-full flex flex-1 flex-col items-center justify-center ">
          {/* Hero Section */}
          <section className="mx-auto text-center w-full max-w-2xl">
            <h2 className="text-5xl font-bold leading-[1.3]">Secure your onchain identity</h2>
            <p className="w-full text-sm md:text-base lg:text-lg max-auto mt-3 px-8 text-center tracking-normal text-white/70">
              Keep your vaulted NFTs and ERC20s safe by linking wallets together. Claim airdrops,
              prove token ownership, and more from your hot wallet.
            </p>
            <div className="mt-6 mx-auto w-[90%] max-w-lg">
              <Button
                onClick={handleOpenDelegateModal}
                className="h-auto w-full flex items-center cursor-pointer justify-start gap-3 rounded-xl border border-red-50 bg-white p-5 text-lg leading-0 font-medium shadow-md text-slate-900"
              >
                <div className="rounded-full bg-de-shadow p-2">
                  <SearchIcon className="w-4 h-4" />
                </div>
                <p>
                  Tap to using <span className="font-semibold">Delegate.xyz</span>
                </p>
              </Button>
            </div>
          </section>

          {/* Features */}
          <section className="px-5 md:px-10 lg:px-24 gap-2 md:gap-5 grid grid-cols-1 md:grid-cols-3 text-black">
            {[
              {
                title: 'Control',
                desc: 'Delegate access without giving up ownership.',
                colorClass: 'bg-de-yellow',
                icon: <CogIcon className="w-5 h-5" />,
              },
              {
                title: 'Security',
                desc: 'Protect your assets with smart contract permissions.',
                colorClass: 'bg-de-green',
                icon: <ShieldPlusIcon className="w-5 h-5" />,
              },
              {
                title: 'Simplicity',
                desc: 'Easy to use interface to manage everything.',
                colorClass: 'bg-de-purple',
                icon: <RainbowIcon className="w-5 h-5" />,
              },
            ].map(({ title, desc, colorClass, icon }, i) => (
              <div key={i} className="bg-gray-100 p-6 rounded-lg">
                <div className={cn('p-2 rounded-lg text-white w-fit mb-3', colorClass)}>{icon}</div>
                <h3 className="text-2xl font-semibold mb-2">{title}</h3>
                <p className="text-gray-700">{desc}</p>
              </div>
            ))}
          </section>

          <Footer />
        </div>
      </section>

      <DelegateDialog />
    </main>
  );
}
