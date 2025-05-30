import { create } from 'zustand';

import { DelegateType } from '@/types/enum';

interface DelegateState {
  open: boolean;
  setOpen: (open: boolean) => void;
  subOpen: boolean;
  setSubOpen: (open: boolean) => void;
  delegateType: DelegateType;
  setDelegateType: (type: DelegateType) => void;
  walletAddress: string;
  setWalletAddress: (address: string) => void;
}

export const useDelegateStore = create<DelegateState>((set) => ({
  walletAddress: '',
  open: false,
  subOpen: false,
  delegateType: DelegateType.WALLET,
  setOpen: (open) => set({ open }),
  setSubOpen: (open) => set({ subOpen: open, open: false }),
  setDelegateType: (type) => set({ delegateType: type }),
  setWalletAddress: (address) => set({ walletAddress: address }),
}));
