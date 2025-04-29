import { FC, useEffect, useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { ArrowRightIcon } from 'lucide-react';

import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '../ui/dialog';
import { Progress } from '../ui/progress';

import { cn } from '@/lib/utils';
import { useDelegateStore } from '@/stores/delegate-store';

const MAX_STEP = 2;

const DelegateTypeSection = dynamic(() => import('./DelegateTypeSection'));
const DelegateForm = dynamic(() => import('./DelegateForm'));
const FinalRound = dynamic(() => import('./FinalRound'));

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
    if (step === 2) {
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
    return step === 1 && !isFormValidate;
  }, [step, isFormValidate]);

  return (
    <Dialog open={subOpen} onOpenChange={setSubOpen}>
      <DialogContent
        className={cn(
          'top-[10vh] translate-y-0  py-4 [&>button.absolute]:hidden max-h-[80vh] flex flex-col',
          step === 1 && 'sm:!max-w-[900px]'
        )}
      >
        <Progress value={(step / MAX_STEP) * 100} className="h-1" />
        <VisuallyHidden>
          <DialogTitle>Choose delegate type</DialogTitle>
          <DialogDescription>Choose delegate type</DialogDescription>
        </VisuallyHidden>
        <div className="flex-1 min-h-0 overflow-y-auto stylized-scroll">
          {step === 1 && (
            <>
              <DelegateTypeSection />
              <DelegateForm
                onFormUpdate={({ isValid }) => {
                  setFormValidate(isValid);
                }}
              />
            </>
          )}
          {step === 2 && <FinalRound />}
        </div>
        <div className="w-full flex items-end justify-end gap-2 mt-6">
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
                {step === 1 ? 'Go forward' : 'Finish'}
                <ArrowRightIcon />
              </span>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
