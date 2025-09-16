import React, { JSX } from 'react';

type HeadingProps = {
  as?: keyof JSX.IntrinsicElements;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  value?: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
};

const sizeToClass = (size?: HeadingProps['size']) => {
  switch (size) {
    case 'sm':
      return 'heading--sm';
    case 'md':
      return 'heading--md';
    case 'lg':
      return 'heading--lg';
    case 'xl':
      return 'heading--xl';
    default:
      return '';
  }
};

const Heading: React.FC<HeadingProps> = ({
  as = 'h2',
  size = 'md',
  value,
  className = '',
  children,
}) => {
  const Tag: any = as;
  const cls = ['heading', sizeToClass(size), className].filter(Boolean).join(' ');
  return <Tag className={cls}>{value ?? children}</Tag>;
};

export default Heading;
