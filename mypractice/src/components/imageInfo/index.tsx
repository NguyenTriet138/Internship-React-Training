import React, { ReactNode } from 'react';

type ImageInfoProps = {
  imageSrc: string;
  fallbackSrc: string;
  alt: string;
  text: ReactNode;
  variant?: 'product' | 'brand';
};

const ImageInfo: React.FC<ImageInfoProps> = ({
  imageSrc,
  fallbackSrc,
  alt,
  text,
  variant = 'product',
}) => {
  const baseClass = variant === 'product' ? 'product' : 'brand';

  return (
    <div className={`${baseClass}-info`}>
      <img
        src={imageSrc}
        alt={alt}
        className={`${baseClass}-image`}
        onError={(e) => {
          e.currentTarget.src = fallbackSrc;
        }}
      />
      <span className={`${baseClass}-name`}>{text}</span>
    </div>
  );
};

export default ImageInfo;
