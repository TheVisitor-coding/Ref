'use server'

export async function addLogAction({ userId, affectedUserId, tableName, recordId, action, old_values, new_values, authCookie }: {
    userId: number;
    affectedUserId?: number;
    tableName: string;
    recordId: string;
    action: 'create' | 'update' | 'delete' | 'view';
    old_values?: Record<string, any>;
    new_values?: Record<string, any>;
    authCookie: string;
}) {
    try {
        const payload = {
            data: {
                user: userId,
                ...(affectedUserId ? { affected_user: affectedUserId } : {}),
                table_name: tableName,
                record_id: recordId,
                action,
                ...(old_values ? { old_values } : {}),
                ...(new_values ? { new_values } : {}),
            }
        };

        const response = await fetch(`${process.env.STRAPI_INTERNAL_URL}/api/audit-logs`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${authCookie}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
            cache: 'no-store',
        })

        if (!response.ok) {
            console.error(`Failed to add log action: ${response.statusText} + ${await response.text()}`);
        } else {
            console.log('Log action added successfully');
        }
    } catch (error) {
        console.error('Error adding log action:', error);
    }
}