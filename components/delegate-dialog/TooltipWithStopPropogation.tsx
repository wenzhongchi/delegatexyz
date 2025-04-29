'use client';

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { ReactNode, useState } from 'react';

type Props = {
  children: ReactNode;
  content: ReactNode;
};

export function TooltipWithStopPropagation({ children, content }: Props) {
  const [open, setOpenChange] = useState(false);
  return (
    <TooltipProvider>
      <Tooltip open={open} onOpenChange={setOpenChange}>
        <TooltipTrigger
          asChild
          onClick={(e) => {
            setOpenChange((prev) => !prev);
            e.stopPropagation();
          }}
          className="shrink-0"
        >
          {children}
        </TooltipTrigger>
        <TooltipContent className="max-w-[200px]">{content}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
