'use client';

import { FC } from 'react';
import { Columns3Icon, SignatureIcon, WalletIcon } from 'lucide-react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';

import { cn } from '@/lib/utils';
import { useDelegateStore } from '@/stores/delegate-store';
import { DelegateType } from '@/types/enum';

const DelegateTypes = [
  {
    key: DelegateType.WALLET,
    label: 'Wallet',
    cardBgColor: 'bg-de-yellow/30',
    iconBgColor: 'bg-de-yellow',
    ringColor: 'ring-de-yellow',
    textColor: 'text-de-yellow',
    icon: <WalletIcon className="w-4 h-4" />,
    info: 'Grant access to another wallet address.',
    description:
      'Authorize a trusted wallet to act on your behalf—such as managing assets, signing messages, or interacting with dApps—without transferring ownership.',
  },
  {
    key: DelegateType.CONTRACT,
    label: 'Contract',
    cardBgColor: 'bg-de-purple/30',
    iconBgColor: 'bg-de-purple',
    ringColor: 'ring-de-purple',
    textColor: 'text-de-purple',
    icon: <SignatureIcon className="w-4 h-4" />,
    info: 'Allow a smart contract to act on your behalf.',
    description:
      'Give permission to a contract—like a marketplace, DAO, or automation tool—to perform specific actions securely under defined rules.',
  },
  {
    key: DelegateType.ASSET,
    label: 'Asset',
    cardBgColor: 'bg-de-blue/30',
    iconBgColor: 'bg-de-blue',
    ringColor: 'ring-de-blue',
    textColor: 'text-de-blue',
    icon: <Columns3Icon className="w-4 h-4" />,
    info: 'Delegate control of specific assets.',
    description:
      'Limit access to selected tokens or NFTs. This is ideal when you want to authorize someone or something to use or transfer only certain assets, not your entire wallet.',
  },
] as const;

const DelegateTypeSection: FC = () => {
  const { delegateType, setDelegateType } = useDelegateStore();

  const handleSetDelegateType = (value: string) => {
    setDelegateType(value as DelegateType);
  };

  return (
    <div className="flex flex-col gap-3 mt-6">
      <div className="w-full text-3xl font-light">What type do you want to delegate?</div>
      <RadioGroup
        value={delegateType}
        onValueChange={handleSetDelegateType}
        className="grid grid-cols-1 sm:grid-cols-3 gap-2 p-1"
      >
        {DelegateTypes.map((type) => (
          <label key={type.key} htmlFor={type.key} className="h-full">
            <RadioGroupItem value={type.key} id={type.key} className="hidden" />
            <Card
              key={type.key}
              className={cn(
                'h-full cursor-pointer',
                type.cardBgColor,
                delegateType === type.key && `ring-1 ${type.ringColor}`
              )}
              onClick={() => handleSetDelegateType(type.key)}
            >
              <CardHeader>
                <CardTitle className="flex flex-row items-center gap-x-2">
                  <div className={cn('p-2 rounded-full w-fit', type.iconBgColor)}>{type.icon}</div>
                  <div className={type.textColor}>{type.label}</div>
                </CardTitle>
                <CardDescription>{type.info}</CardDescription>
              </CardHeader>
              <CardContent className="hidden sm:block">
                <p>{type.description}</p>
              </CardContent>
            </Card>
          </label>
        ))}
      </RadioGroup>
    </div>
  );
};

export default DelegateTypeSection;
