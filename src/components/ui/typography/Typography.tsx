import style from './typography.module.scss';

const defaultVariantMapping = {
    h1: 'h1',
    h2: 'h2',
    h3: 'h3',
    h4: 'h4',
    h5: 'h5',
    h6: 'h6',
    p1: 'p',
    p2: 'p',
    p3: 'p',
    p4: 'p',
    subtitle: 'p'
  };

export type IVariant = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p1' | 'p2' | 'p3' | 'p4' | 'subtitle';

export interface IProps {
  variant?: IVariant;
  className?: string;
  children: string | React.ReactNode;
}

const  Typography = ({ variant = 'p1', className, children }: IProps): JSX.Element => {
  const Tag: any = defaultVariantMapping[variant];

  return (
    <Tag className={[style.typography, style['typography__' + `${variant}`], className && className].join(" ")}>
        {children}
    </Tag>
  );
}

export default Typography;