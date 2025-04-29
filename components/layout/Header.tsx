import { FC } from 'react';
import Link from 'next/link';
import { BookOpenTextIcon, GithubIcon, MenuIcon, ShareIcon, TwitterIcon } from 'lucide-react';

import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

const DropdownItems = [
  {
    key: 'document',
    icon: <BookOpenTextIcon className="w-4 h-4" />,
    label: 'Document',
  },
  {
    key: 'github',
    icon: <GithubIcon className="w-4 h-4" />,
    label: 'Github',
  },
  {
    key: 'twitter',
    icon: <TwitterIcon className="w-4 h-4" />,
    label: 'Twitter',
  },
  {
    key: 'view',
    icon: <ShareIcon className="w-4 h-4" />,
    label: 'View on Etherscan',
  },
];

export const Header: FC = () => {
  return (
    <div className="p-5 md:p-10">
      <header className="relative flex w-full justify-between z-20">
        {/* logo */}
        <div className="flex items-center">
          <Link className="flex gap-3 items-center" href="/">
            <div className="w-9 h-9 bg-de-blue" />
            <h1 className="hidden sm:block text-white text-xl font-bold">Delegate.xyz</h1>
          </Link>
        </div>
        {/* TODO connect wallet */}
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button size="icon" variant="ghost">
              <MenuIcon className="w-5 h-5 text-white cursor-pointer" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" side="bottom" align="end">
            <DropdownMenuGroup>
              {DropdownItems.map((menu) => (
                <DropdownMenuItem key={menu.key}>
                  {menu.icon} {menu.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>
    </div>
  );
};
