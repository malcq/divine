import React from 'react';
import { Link } from 'i18n';

import { MAIN_DOMAIN, PROTOCOL } from "@utils/constants";

const options = {
  root: null,
  rootMargin: '0px',
  threshold: 1.0
}

interface Props extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  to: string,
  as: string,
  className?: string,
}

const CustomLink: React.FC<Props> = ({
  as,
  to,
  className,
  children,
  ...props
}) => {
  const anchorRef = React.useRef<HTMLAnchorElement>(null);
  const [isShowLink, setIsShowLink] = React.useState(false);

  const anchorUrl = React.useMemo(() => `${PROTOCOL}://${MAIN_DOMAIN}${as}`, [as]);

  React.useEffect(() => {
    let isDone = false;
    if (!anchorRef.current) return;

    const linkLoader = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (!anchorRef.current || isDone) return;
          isDone = true;
          setIsShowLink(true);
        }
      })
    };

    const linkObserver = new IntersectionObserver(linkLoader, options);
    linkObserver.observe(anchorRef.current);

  }, []);

  return (
    <>
      {isShowLink
        ? (
          <Link href={to} as={as}>
            <a className={className} {...props} ref={anchorRef}>
              {children}
            </a>
          </Link>
        ) : (
          <a
            href={anchorUrl}
            className={className}
            {...props}
            ref={anchorRef}
          >
            {children}
          </a>
        )
      }
    </>
  )
};

export default CustomLink;