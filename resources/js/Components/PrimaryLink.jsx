import {Link} from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton.jsx";

export default function PrimaryLink({
    className = '',
    disabled,
    children,
    href,
    ...props
}) {
    return (
        <PrimaryButton className={className} disabled={disabled} children={children} {...props}>
            {! disabled ? <Link href={href}>{children}</Link> : children}
        </PrimaryButton>
    );
}
