import AuthListItem from "@/components/atoms/list/AuthListItem";

function AuthList() {
    return (
        <div className="flex flex-col gap-3">
            <AuthListItem content="Divisez par 2 votre temps de planification" />
            <AuthListItem content="Centralisez tous vos échanges" />
            <AuthListItem content="Analysez la progression avec des données claires" />
            <AuthListItem content="Gérez votre budget" />
        </div>
    );
}

export default AuthList;