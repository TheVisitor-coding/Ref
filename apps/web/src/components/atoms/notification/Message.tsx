function Message({ type, children }: { type: "success" | "error" | "info"; children: React.ReactNode }) {

    const getBackgroundColor = () => {
        switch (type) {
            case "success":
                return "bg-green-100 text-green-800";
            case "error":
                return "bg-red-100 text-red-800";
            case "info":
                return "bg-information-light";
            default:
                return "";
        }
    };

    return (
        <div className={`p-6 rounded-lg ${getBackgroundColor()}`}>
            {children}
        </div>
    );
}

export default Message;