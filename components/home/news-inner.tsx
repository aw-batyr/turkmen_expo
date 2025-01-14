import { FC } from 'react';

interface Props {
  className?: string;
}

export const NewsInner: FC<Props> = ({ className }) => {
  return <div className={className}></div>;
};
