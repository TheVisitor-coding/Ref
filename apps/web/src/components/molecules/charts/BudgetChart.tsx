import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { mockMonthlyRevenue, monthLabels } from '@/data/budgetChart';
import { getBudgetChartOptions, BUDGET_CHART_CONFIG } from '@/config/budgetChartConfig';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function BudgetChart() {
    const options = getBudgetChartOptions();

    const data = {
        labels: monthLabels,
        datasets: [
            {
                label: 'Chiffre d\'affaires',
                data: mockMonthlyRevenue,
                backgroundColor: BUDGET_CHART_CONFIG.barColor,
                borderColor: BUDGET_CHART_CONFIG.barColor,
                borderWidth: 0,
                barThickness: BUDGET_CHART_CONFIG.barThickness,
                borderRadius: BUDGET_CHART_CONFIG.borderRadius,
            },
        ],
    };

    return (
        <div style={{ height: `${BUDGET_CHART_CONFIG.height}px`, width: '100%' }}>
            <Bar options={options} data={data} />
        </div>
    );
}

export default BudgetChart;