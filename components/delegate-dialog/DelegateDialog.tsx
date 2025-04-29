'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { DialogTitle } from '@radix-ui/react-dialog';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { FileTextIcon } from 'lucide-react';

import { DelegateSubDialog } from './DelegateSubDialog';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useDelegateStore } from '@/stores/delegate-store';

const wallets = [
  { address: '0x1234567890abcdef', label: 'Vitalik.eth' },
  { address: '0xabcdef1234567890', label: 'User123' },
  { address: '0xfeedbeefdeadbeef', label: 'Delegate Fan' },
];

export function DelegateDialog() {
  const { open, setOpen, setSubOpen } = useDelegateStore();
  const [query, setQuery] = useState('');
  const router = useRouter();

  const filtered = wallets.filter((w) =>
    `${w.address}${w.label}`.toLowerCase().includes(query.toLowerCase())
  );

  const goToWallet = (address: string) => {
    setOpen(false);
    router.push(`/wallet/${address}`);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="top-[10vh] translate-y-0">
          <VisuallyHidden>
            <DialogTitle>delegate dialog</DialogTitle>
            <DialogDescription>delegate dialog</DialogDescription>
          </VisuallyHidden>
          <div className="flex flex-col gap-4">
            <Input
              placeholder="Search for a collection, wallet, cluster, or ENS"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <div className="rounded border p-2 space-y-1">
              {query?.length > 0 ? (
                <div className="max-h-64 overflow-y-auto ">
                  {/* TODO */}
                  {filtered.length > 0 ? (
                    filtered.map((wallet) => (
                      <Button
                        key={wallet.address}
                        variant="ghost"
                        className="w-full justify-start text-left"
                        onClick={() => goToWallet(wallet.address)}
                      >
                        <div className="text-sm font-medium">{wallet.label}</div>
                        <div className="text-xs text-muted-foreground">{wallet.address}</div>
                      </Button>
                    ))
                  ) : (
                    <div className="text-sm text-muted-foreground px-2 py-4 text-center">
                      No matching wallets.
                    </div>
                  )}
                </div>
              ) : (
                <Button
                  onClick={() => setSubOpen(true)}
                  variant="ghost"
                  className="w-full justify-start text-left flex gap-3 rounded-none px-3 py-2 h-auto cursor-pointer"
                >
                  <div className="p-3 rounded-full bg-de-shadow text-black">
                    <FileTextIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-sm font-medium">Delegate a wallet, contract, or asset</div>
                    <div className="text-xs text-muted-foreground">
                      Choose a hot wallet to act on your behalf.
                    </div>
                  </div>
                </Button>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
      <DelegateSubDialog />
    </>
  );
}
