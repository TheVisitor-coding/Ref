import Badge from '@/components/atoms/badge/Badge';
import Card from '../card/Card';

interface NotificationCardProps {
    title: string;
    description: string;
    urgencyLevel?: 'urgent' | 'normal' | 'low';
    className?: string;
}

const NotificationCard = ({
    title,
    description,
    urgencyLevel = 'normal',
    className = ''
}: NotificationCardProps) => {
    const getBadgeVariant = (level: string) => {
        switch (level) {
            case 'urgent':
                return 'error';
            case 'low':
                return 'info';
            default:
                return 'warning';
        }
    };

    const getBadgeText = (level: string) => {
        switch (level) {
            case 'urgent':
                return 'Urgent';
            case 'low':
                return 'Faible';
            default:
                return 'Normal';
        }
    };

    return (
        <div className={`flex flex-col gap-4 ${className}`}>
            {urgencyLevel !== 'normal' && (
                <Badge variant={getBadgeVariant(urgencyLevel)}>
                    {getBadgeText(urgencyLevel)}
                </Badge>
            )}

            <Card>
                <div className="p-4">
                    <h3 className="font-medium text-primary mb-2 text-lg">{title}</h3>
                    <p className="text-secondary text-sm">{description}</p>
                </div>
                <div className='p-4 bg-white flex justify-between items-center gap-4'>

                </div>
            </Card>
        </div>
    );
};

export default NotificationCard;
