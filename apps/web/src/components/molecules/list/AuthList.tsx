import AuthListItem from "@/components/atoms/list/AuthListItem";

function AuthList() {
    return (
        <div className="flex flex-col gap-3">
            <AuthListItem content="Co-construisez vos programmes d’entrainements" />
            <AuthListItem content="Analysez plus rapidement les séances" />
            <AuthListItem content="Optimisez votre planning" />
            <AuthListItem content="Gérez votre budget" />
        </div>
    );
}

export default AuthList;