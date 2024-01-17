import style from './layout.module.scss';


export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main className={style.authLayout}>{children}</main>;
}
