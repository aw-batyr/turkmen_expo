'use client';

import React from 'react';
import { Title } from '../home/Title';
import { BreadCrumbs } from '../ui/BreadCrumbs';

interface Props {
  title: string;
  second: string;
  third?: string;
  path?: string;
  path2?: string;
  cursor?: boolean;
  children: React.ReactNode;
}

export const LayoutWithSidebar = ({
  title,
  second,
  path,
  path2,
  third,
  children,
  cursor = false,
}: Props) => {
  return (
    <div className="flex bg-white px-6 py-4 rounded-lg flex-col md:gap-6 gap-10 section-mb w-full">
      <div>
        <BreadCrumbs second={second} path={path} path2={path2} third={third ? third : ''} />
        <Title text={title} />
      </div>
      {children}
    </div>
  );
};
