function LayoutCard({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <div className="bg-white rounded-2xl border border-grey-button w-full p-1">
            <div className="px-6 py-4 bg-backeground-hover rounded-xl">
                <h2 className="text-primary text-sm font-semibold">{title}</h2>
            </div>
            {children}
        </div>
    );
}

export default LayoutCard;