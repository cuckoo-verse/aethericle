import 'overlayscrollbars/overlayscrollbars.css'
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import { Options } from "overlayscrollbars";

export function Scrollbar({ 
    children, 
    className,
    options,
    hideX = true,
    hideY = false,
    autoHide = true,
}: { 
    children: React.ReactNode, 
    className?: string,
    options?: Options,
    hideX?: boolean,
    hideY?: boolean,
    autoHide?: boolean,
}) {
  const mergedOptions = {
    ...options,
    ...( (hideX || hideY) ? {
      overflow: {
        ...(options?.overflow || {}),
        ...(hideX ? { x: 'hidden' } : {}),
        ...(hideY ? { y: 'hidden' } : {}),
      },
    } : {} ),
    ...( autoHide ? {
      scrollbars: {
        ...(options?.scrollbars || {}),
        autoHide: 'scroll',
        autoHideDelay: 3000,
      },
    } : {} ),
  } as Options;

  return (
    <OverlayScrollbarsComponent
      defer
      className={className}
      options={mergedOptions}
    >
      {children}
    </OverlayScrollbarsComponent>
  )
}