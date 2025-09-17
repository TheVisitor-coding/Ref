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
};

export type AuthStoreType = {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    setUser: (user: User) => void;
    setToken: (token: string) => void;
    setIsAuthenticated: (isAuthenticated: boolean) => void;
    logout: () => void;
};