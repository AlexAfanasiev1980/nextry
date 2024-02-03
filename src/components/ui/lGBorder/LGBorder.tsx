import React from "react";

interface IBorder {
  children: React.ReactNode;
  styles: {
    padding: string;
    borderRadius: string;
    colorTop: string;
    colorBottom: string;
  };
  className?: string;
}

export default function LGBorder({ children, styles, className }: IBorder) {
  const stylesTransform = {
    padding: styles.padding,
    background: `linear-gradient(180deg, ${styles.colorTop} -4.56%, ${styles.colorBottom} 100%)`,
    borderRadius: styles.borderRadius
  }

  return <div style={stylesTransform} className={className && className}>{children}</div>;
}
