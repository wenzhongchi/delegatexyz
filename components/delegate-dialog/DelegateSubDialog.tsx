import { FC } from 'react';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { ArrowRightIcon, Columns3Icon, SignatureIcon, WalletIcon } from 'lucide-react';

import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '../ui/dialog';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';

import { cn } from '@/lib/utils';
import { useDelegateStore } from '@/stores/delegate-store';
import { DelegateType } from '@/types/enum';

const DelegateTypes = [
  {
    key: DelegateType.WALLET,
    label: 'Wallet',
    baseColor: 'de-yellow',
    icon: <WalletIcon className="w-4 h-4" />,
    info: 'Grant access to another wallet address.',
    description:
      'Authorize a trusted wallet to act on your behalf—such as managing assets, signing messages, or interacting with dApps—without transferring ownership.',
  },
  {
    key: DelegateType.CONTRACT,
    label: 'Contract',
    baseColor: 'de-purple',
    icon: <SignatureIcon className="w-4 h-4" />,
    info: 'Allow a smart contract to act on your behalf.',
    description:
      'Give permission to a contract—like a marketplace, DAO, or automation tool—to perform specific actions securely under defined rules.',
  },
  {
    key: DelegateType.ASSET,
    label: 'Asset',
    baseColor: 'de-blue',
    icon: <Columns3Icon className="w-4 h-4" />,
    info: 'Delegate control of specific assets.',
    description:
      'Limit access to selected tokens or NFTs. This is ideal when you want to authorize someone or something to use or transfer only certain assets, not your entire wallet.',
  },
] as const;

export const DelegateSubDialog: FC = () => {
  const { subOpen, setSubOpen, delegateType, setDelegateType } = useDelegateStore();
  // const [selectedType, setSelectedType] = useState<DelegateType>(DelegateType.WALLET);

  const handleSetDelegateType = (value: string) => {
    setDelegateType(value as DelegateType);
  };

  return (
    <Dialog open={subOpen} onOpenChange={setSubOpen}>
      <DialogContent className="top-[10vh] translate-y-0  !max-w-[900px] py-4">
        <VisuallyHidden>
          <DialogTitle>Choose delegate type</DialogTitle>
          <DialogDescription>Choose delegate type</DialogDescription>
        </VisuallyHidden>
        <div className="flex flex-col gap-6 mt-6">
          <div className="w-full text-3xl font-light">What type do you want to delegate?</div>
          <RadioGroup
            value={delegateType}
            onValueChange={handleSetDelegateType}
            className="grid grid-cols-3 gap-2"
          >
            {DelegateTypes.map((type) => (
              <label key={type.key} htmlFor={type.key} className="h-full">
                <RadioGroupItem value={type.key} id={type.key} className="hidden" />
                <Card
                  key={type.key}
                  className={cn(
                    'h-full cursor-pointer',
                    `bg-${type.baseColor}/30`,
                    delegateType === type.key && `ring-1 ring-${type.baseColor}`
                  )}
                  onClick={() => handleSetDelegateType(type.key)}
                >
                  <CardHeader>
                    <div className={cn('p-2 rounded-full w-fit', `bg-${type.baseColor}`)}>
                      {type.icon}
                    </div>
                    <CardTitle className={`text-${type.baseColor}`}>{type.label}</CardTitle>
                    <CardDescription>{type.info}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>{type.description}</p>
                  </CardContent>
                </Card>
              </label>
            ))}
          </RadioGroup>
          <div className="w-full flex items-end justify-end">
            <Button variant="outline" className=" cursor-pointer">
              Next Step <ArrowRightIcon />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
