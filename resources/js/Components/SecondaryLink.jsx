import {Link} from "@inertiajs/react";
import SecondaryButton from "@/Components/SecondaryButton.jsx";
import PrimaryButton from "@/Components/PrimaryButton.jsx";

export default function SecondaryLink({
    className = '',
    disabled,
    children,
    href,
    ...props
}) {
    return (
        <SecondaryButton className={className} disabled={disabled} children={children} {...props}>
            {! disabled ? <Link href={href}>{children}</Link> : children}
        </SecondaryButton>
    );
}
