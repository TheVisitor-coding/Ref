import { NextResponse } from 'next/server';
import { getTokenFromCookie } from '@/actions/auth-actions';

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const token = await getTokenFromCookie();
        if (!token) {
            return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
        }

        const { id } = await params;
        const userId = parseInt(id);

        if (!Number.isFinite(userId)) {
            return NextResponse.json({ error: 'ID utilisateur invalide' }, { status: 400 });
        }

        const response = await fetch(`${process.env.STRAPI_INTERNAL_URL}/api/users/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            cache: 'no-store',
        });

        if (!response.ok) {
            console.error('Failed to fetch user:', response.status, response.statusText);
            return NextResponse.json(
                { error: 'Utilisateur non trouvé' },
                { status: response.status }
            );
        }

        const userData = await response.json();

        return NextResponse.json(
            { data: userData },
            {
                headers: {
                    'Cache-Control': 'no-store',
                },
            }
        );
    } catch (error) {
        console.error('Error in GET /api/users/[id]:', error);
        return NextResponse.json(
            { error: 'Erreur lors de la récupération des données utilisateur' },
            { status: 500 }
        );
    }
}
