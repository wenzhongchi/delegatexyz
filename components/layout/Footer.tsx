import { FC } from 'react';

export const Footer: FC = () => {
  return (
    <footer className="w-full mt-5">
      <div className="flex items-center justify-center px-5 mx-auto w-full flex-wrap text-muted-foreground text-center">
        <h3 className="text-muted-foreground text-center">
          <span>Securing</span>
          <span className="font-semibold text-white mx-1">$570m assets</span>
          <span>across</span>
          <span className="font-semibold text-white mx-1">218k wallets</span>
        </h3>
      </div>
    </footer>
  );
};
