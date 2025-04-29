'use client';

import { useState } from 'react';
import { DialogTitle } from '@radix-ui/react-dialog';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { FileTextIcon } from 'lucide-react';

import { DelegateSubDialog } from './DelegateSubDialog';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useDelegateStore } from '@/stores/delegate-store';

const wallets = [
  { address: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e', label: 'Vitalik.eth' },
  { address: '0x5A98FcBEA516Cf06857215779Fd812CA3beF1B32', label: 'User123' },
  { address: '0x267be1c1d684f78cb4f6a176c4911b741e4ffdc0', label: 'Delegate Fan' },
  { address: '0xfe9e8709d3215310075d67e3ed32a380ccf451c8', label: 'Zinc' },
  { address: '0x53d284357ec70ce289d6d64134dfac8e511c8a3d', label: 'Anonymous' },
];

export function DelegateDialog() {
  const { open, setOpen, setSubOpen, setWalletAddress } = useDelegateStore();
  const [query, setQuery] = useState('');

  const filtered = wallets.filter((w) =>
    `${w.address}${w.label}`.toLowerCase().includes(query.toLowerCase())
  );

  const handleAddressClick = (address: string) => {
    setWalletAddress(address);
    setSubOpen(true);
  };

  const handelEntranceClick = () => {
    setWalletAddress('');
    setSubOpen(true);
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
              className="w-full"
            />
            <div className="rounded border p-2 space-y-1">
              {query?.length > 0 ? (
                <div className="max-h-64 overflow-y-auto ">
                  {filtered.length > 0 ? (
                    filtered.map((wallet) => (
                      <Button
                        key={wallet.address}
                        variant="ghost"
                        className="flex-wrap w-full justify-start text-left rounded-none px-3 py-2 h-auto cursor-pointer"
                        onClick={() => handleAddressClick(wallet.address)}
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
                  onClick={handelEntranceClick}
                  variant="ghost"
                  className="flex-wrap w-full justify-start text-left flex gap-3 rounded-none px-3 py-2 h-auto cursor-pointer"
                >
                  <div className="p-3 rounded-full bg-de-shadow text-black hidden sm:block">
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
