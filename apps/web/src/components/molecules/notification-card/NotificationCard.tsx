import Badge from '@/components/atoms/badge/Badge';
import Card from '../card/Card';
import IconBtn from '@/components/atoms/buttons/IconBtn';

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

            <Card className='p-2 flex flex-col bg-white-100'>
                <IconBtn src="/icons/Close.svg" alt="close" className="absolute top-1 right-1" />

                <div className="p-4">
                    <h3 className="font-medium text-primary mb-2 text-lg">{title}</h3>
                    <p className="text-secondary text-sm">{description}</p>
                </div>
                <div className='p-4 bg-white flex justify-between items-center gap-4'>
                    <div className='flex items-center'>
                        <img src={'/icons/Calendar.svg'} alt='calendar icon' className='w-5 h-5 mr-3' />
                        <span className='flex items-center text-sm'>
                            <p className='text-disabled line-through'>Aujourd&apos;hui 11h</p>
                            <img src={'/icons/chevron-right.svg'} alt='chevron right icon' className='inline w-5 h-5 mx-1' />
                            <p className='text-secondary'>Aujourd&apos;hui 16h</p>
                        </span>
                    </div>
                    <IconBtn src="/icons/arrow-up.svg" alt="arrow up" className=' bg-primary-blue rounded-lg outline-4 outline-primary-blue/20' />
                </div>
            </Card>
        </div>
    );
};

export default NotificationCard;
