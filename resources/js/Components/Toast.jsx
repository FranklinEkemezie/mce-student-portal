
export default function Toast({ children }) {

    return (
        <div className="fixed mt-4 me-4 space-y-1 end-0 flex flex-col z-40">
            {children}
        </div>
    )
}
