import ChartBar from './core/ChartBar';
import { mockMonthlyRevenue, monthLabels } from '@/data/budgetChart';
import { BUDGET_CHART_CONFIG } from '@/config/budgetChartConfig';

function BudgetChart() {
    const formatCurrencyValue = (value: number): string => {
        return `${value.toLocaleString('fr-FR')} €`;
    };

    const formatAxisValue = (value: number): string => {
        return value >= 1000 ? `${value / 1000}k` : value.toString();
    };

    return (
        <ChartBar
            labels={monthLabels}
            data={mockMonthlyRevenue}
            datasetLabel="Chiffre d'affaires"
            config={{
                height: BUDGET_CHART_CONFIG.height,
                barThickness: BUDGET_CHART_CONFIG.barThickness,
                barColor: BUDGET_CHART_CONFIG.barColor,
                borderRadius: BUDGET_CHART_CONFIG.borderRadius,
                maxTicksLimit: BUDGET_CHART_CONFIG.maxTicksLimit,
                yAxisPosition: 'right',
                showGridLines: true,
                showLegend: false,
            }}
            formatTooltip={formatCurrencyValue}
            formatYAxis={formatAxisValue}
        />
    );
}

export default BudgetChart;