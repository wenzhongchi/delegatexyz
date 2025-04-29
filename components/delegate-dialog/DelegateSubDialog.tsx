import { FC, useMemo, useState } from 'react';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react';

import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '../ui/dialog';
import { Progress } from '../ui/progress';

import { useDelegateStore } from '@/stores/delegate-store';
import { DelegateType } from '@/types/enum';
import { DelegateTypeSection } from './DelegateTypeSection';
import { FinalRound } from './FinalRound';
import { ChartFillingSection } from './ChartFillingSection';

const MAX_STEP = 3;

const STEPS = [
  {
    key: 1,
    component: <DelegateTypeSection />,
  },
  {
    key: 2,
    component: <ChartFillingSection />,
  },
  {
    key: 3,
    component: <FinalRound />,
  },
];

export const DelegateSubDialog: FC = () => {
  const { subOpen, setSubOpen, delegateType, setDelegateType } = useDelegateStore();

  const [step, setStep] = useState(1);

  const handleSetDelegateType = (value: string) => {
    setDelegateType(value as DelegateType);
  };

  const StepSection = useMemo(() => {
    return STEPS.find((s) => s.key === step)?.component;
  }, [step]);

  const onNextStep = () => {
    setStep((prev) => Math.min(MAX_STEP, prev + 1));
  };

  const onPreviousStep = () => {
    setStep((prev) => Math.max(1, prev - 1));
  };

  return (
    <Dialog open={subOpen} onOpenChange={setSubOpen}>
      <DialogContent className="top-[10vh] translate-y-0  !max-w-[900px] py-4 [&>button.absolute]:hidden">
        <Progress value={(step / MAX_STEP) * 100} className="h-1" />
        <VisuallyHidden>
          <DialogTitle>Choose delegate type</DialogTitle>
          <DialogDescription>Choose delegate type</DialogDescription>
        </VisuallyHidden>
        {StepSection}
        <div className="w-full flex items-end justify-end gap-2 mt-6">
          {step > 1 && (
            <Button className=" cursor-pointer" onClick={onPreviousStep}>
              <ArrowLeftIcon /> Back
            </Button>
          )}
          <Button variant="outline" className="cursor-pointer" onClick={onNextStep}>
            Next Step <ArrowRightIcon />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
