import { FC, useEffect, useMemo, useState } from 'react';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react';

import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '../ui/dialog';
import { Progress } from '../ui/progress';

import { useDelegateStore } from '@/stores/delegate-store';
import { DelegateTypeSection } from './DelegateTypeSection';
import { FinalRound } from './FinalRound';
import { DelegateForm } from './DelegateForm';
import { cn } from '@/lib/utils';

const MAX_STEP = 3;

export const DelegateSubDialog: FC = () => {
  const { subOpen, setSubOpen } = useDelegateStore();
  const [isFormValidate, setFormValidate] = useState(false);

  const [step, setStep] = useState(1);

  useEffect(() => {
    if (subOpen) {
      setStep(1);
      setFormValidate(false);
    }
  }, [subOpen]);

  const onNextStep = () => {
    if (step === 3) {
      setSubOpen(false);
      return;
    }
    if (step === 1) {
      setFormValidate(false);
    }
    if (isNextDisabled) {
      return;
    }
    setStep((prev) => Math.min(MAX_STEP, prev + 1));
  };

  const isNextDisabled = useMemo(() => {
    return step === 2 && !isFormValidate;
  }, [step, isFormValidate]);

  const onPreviousStep = () => {
    if (step === 3) {
      setFormValidate(false);
    }
    setStep((prev) => Math.max(1, prev - 1));
  };

  return (
    <Dialog open={subOpen} onOpenChange={setSubOpen}>
      <DialogContent
        className={cn(
          'top-[10vh] translate-y-0  py-4 [&>button.absolute]:hidden',
          step === 1 && '!max-w-[900px]'
        )}
      >
        <Progress value={(step / MAX_STEP) * 100} className="h-1" />
        <VisuallyHidden>
          <DialogTitle>Choose delegate type</DialogTitle>
          <DialogDescription>Choose delegate type</DialogDescription>
        </VisuallyHidden>
        {step === 1 && <DelegateTypeSection />}
        {step === 2 && (
          <DelegateForm
            onFormUpdate={({ isValid, values }) => {
              setFormValidate(isValid);
            }}
          />
        )}
        {step === 3 && <FinalRound />}
        <div className="w-full flex items-end justify-end gap-2 mt-6">
          {step === 2 && (
            <Button className=" cursor-pointer" onClick={onPreviousStep}>
              <ArrowLeftIcon /> Back
            </Button>
          )}
          <Button
            variant="outline"
            className={cn(isNextDisabled ? 'cursor-not-allowed' : 'cursor-pointer')}
            onClick={onNextStep}
            disabled={isNextDisabled}
          >
            {isNextDisabled ? (
              'Fill all required fields'
            ) : (
              <span className="flex items-center gap-1">
                {step < 3 ? 'Go forward' : 'Finish'}
                <ArrowRightIcon />
              </span>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
