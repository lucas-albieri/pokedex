import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ChartData,
    ChartOptions
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

// Registrar os componentes necessários do Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ChartDataLabels);

type ChartProps = {
    values: number[];
};

export const BarChart = ({ values }: ChartProps) => {
    const data: ChartData<'bar'> = {
        labels: ['HP', 'Attack', 'Defense', 'Sp. Attack', 'Sp. Defense', 'Speed'],
        datasets: [
            {
                label: 'Stats',
                data: values,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.5)',  // Cor para HP
                    'rgba(54, 162, 235, 0.5)',  // Cor para Attack
                    'rgba(255, 206, 86, 0.5)',  // Cor para Defense
                    'rgba(75, 192, 192, 0.5)',  // Cor para Sp. Attack
                    'rgba(153, 102, 255, 0.5)', // Cor para Sp. Defense
                    'rgba(255, 159, 64, 0.5)',  // Cor para Speed
                ],  // Cor de preenchimento
                borderColor: [
                    'rgb(255, 99, 132)',
                    'rgb(54, 162, 235)',
                    'rgb(255, 206, 86)',
                    'rgb(75, 192, 192)',
                    'rgb(153, 102, 255)',
                    'rgb(255, 159, 64)',
                ],  // Cor da borda
                borderWidth: 3,  // Largura da borda
            },
        ],
    };

    const options: ChartOptions<'bar'> = {
        scales: {
            x: {
                grid: {
                    display: false,
                },
                ticks: {
                    color: '#282829', // Cor do texto do eixo X
                },
            },
            y: {
                grid: {
                    display: true,
                },
                ticks: {
                    color: '#282829', // Cor do texto do eixo Y
                },
            },

        },
        plugins: {
            legend: {
                labels: {
                    color: '#000', // Cor do texto da legenda
                },
            },
            tooltip: {
                titleColor: '#fff', // Cor do título do tooltip
                bodyColor: '#fff', // Cor do corpo do tooltip
                backgroundColor: '#000', // Cor de fundo do tooltip
                borderColor: '#fff', // Borda branca
            },
            datalabels: {
                color: '#282829', // Cor do texto
                font: {
                    size: 11, // Tamanho da fonte
                },
            }
        },
        maintainAspectRatio: true,
    };

    return <Bar
        data={data}
        options={options}
    />;
};
