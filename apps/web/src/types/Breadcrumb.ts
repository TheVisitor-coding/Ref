import { ReactNode } from "react";

type BreadcrumbItem = {
    label: string;
    href?: string;
    ariaLabel?: string;
    icon?: ReactNode;
};

type BreadcrumbsProps = {
    items: BreadcrumbItem[];
    className?: string;
    showHome?: boolean;
    homeHref?: string;
    homeLabel?: string;
    homeAriaLabel?: string;
    homeIcon?: ReactNode;
    separator?: ReactNode;
};

export type { BreadcrumbItem, BreadcrumbsProps };