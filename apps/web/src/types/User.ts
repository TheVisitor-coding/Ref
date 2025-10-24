export type User = {
    id: number;
    documentId: string;
    username: string;
    email: string;
    first_name: string | null;
    last_name: string | null;
    company_name: string | null;
    phone: string | null;
    language: string;
    country: string;
    statusUser: string;
    lastPredashboardSeenAt?: string | null;
};

export type AuthStoreType = {
    user: User | null;
    isAuthenticated: boolean;
    setUser: (user: User) => void;
    setToken: (token: string) => void;
    setIsAuthenticated: (isAuthenticated: boolean) => void;
    logout: () => void;
};

export type Athlete = User & {
    avatar: {
        url: string;
    };
    tag: string;
}
