import { getVideoSrc } from '../../lib/assetMap';

interface ResponsiveVideoProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
  srcBase: string;
  className?: string;
}

export default function ResponsiveVideo({
  srcBase,
  className = '',
  ...props
}: ResponsiveVideoProps) {
  const src = getVideoSrc(srcBase);

  if (!src) {
    console.warn(`No video asset found for base name: ${srcBase}`);
    return null;
  }

  return (
    <video
      src={src}
      className={className}
      {...props}
    />
  );
} 