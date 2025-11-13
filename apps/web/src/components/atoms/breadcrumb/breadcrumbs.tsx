import { Fragment, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { BreadcrumbsProps } from "@/types/Breadcrumb";

const DEFAULT_SEPARATOR = "/";

const defaultHomeIcon = (
    <Image src="/icons/home.svg" alt="" width={16} height={16} aria-hidden="true" />
);

function Breadcrumbs({
    items,
    className = "",
    showHome = true,
    homeHref = "/",
    homeAriaLabel = "Retour à l'accueil",
    homeIcon,
    separator = DEFAULT_SEPARATOR,
}: BreadcrumbsProps) {
    const breadcrumbs = items;

    if (!showHome && breadcrumbs.length === 0) {
        return null;
    }

    return (
        <nav aria-label="Fil d'Ariane" className={className}>
            <ol className="flex items-center gap-1 text-xs text-primary">
                {showHome && (
                    <>
                        <li>
                            <Link
                                href={homeHref}
                                aria-label={homeAriaLabel}
                                className="flex items-center gap-1 px-2 py-1 transition-colors hover:text-primary/80"
                            >
                                {homeIcon ?? defaultHomeIcon}
                            </Link>
                        </li>
                        {breadcrumbs.length > 0 && (
                            <li aria-hidden="true" className="px-1 text-primary/40">
                                {separator}
                            </li>
                        )}
                    </>
                )}

                {breadcrumbs.map((item, index) => {
                    const isLast = index === breadcrumbs.length - 1;
                    const icon = item.icon;
                    const content = item.href && !isLast ? (
                        <Link
                            href={item.href}
                            aria-label={item.ariaLabel ?? item.label}
                            className="flex items-center gap-1 px-2 py-1 transition-colors hover:text-primary/80"
                        >
                            {icon}
                            <span>{item.label}</span>
                        </Link>
                    ) : (
                        <span className="flex items-center gap-1 px-2 py-1">
                            {icon}
                            <span>{item.label}</span>
                        </span>
                    );

                    return (
                        <Fragment key={`${item.label}-${index}`}>
                            <li className="flex items-center" aria-current={isLast ? "page" : undefined}>
                                {content}
                            </li>
                            {!isLast && (
                                <li aria-hidden="true" className="px-1 text-primary/40">
                                    {separator}
                                </li>
                            )}
                        </Fragment>
                    );
                })}
            </ol>
        </nav>
    );
}

export default Breadcrumbs;