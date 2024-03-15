import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";


interface ChartProps {
  coinId: string;
  isDark: boolean;
}

interface IHistorical {
    time_open: string;
    time_close: string;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
    market_cap: number;
}

function Chart({ coinId, isDark }: ChartProps) {
    const { isLoading, data } = useQuery<IHistorical[]>(
        ["ohlcv", coinId],
        () => fetchCoinHistory(coinId),
        {
          refetchInterval: 10000,
        }
    );
    const mappedOhlcvData = data?.map((data: IHistorical) => ({
        x: data.time_open,
        y: [data.open, data.high, data.low, data.close],
        }));
    return (
        <div>
          {isLoading ? (
            "Loading chart..."
          ) : (
            <ApexChart
            type="candlestick"
            series={[{ data: mappedOhlcvData }] as unknown as number[]} 
            options={{
                theme: {
                mode: isDark ? "dark" : "light",
                },
                chart: {
                height: 500,
                width: 500,
                toolbar: {
                    tools: {},
                },
                background: "transparent",
                },
                grid: {
                show: false,
                },
                plotOptions: {
                candlestick: {
                    wick: {
                    useFillColor: true,
                    },
                },
                },
                xaxis: {
                labels: {
                    show: false,
                    datetimeFormatter: {
                    month: "mmm 'yy",
                    },
                },
                type: "datetime",
                categories: data?.map(date => date.time_close),
                axisBorder: {
                    show: false,
                },
                axisTicks: {
                    show: false,
                },
                },
                yaxis: {
                show: false,
                },
                tooltip: {
                y: {
                    formatter: v => `$ ${v.toFixed(2)}`,
                },
                },
            }}
            />
          )}
        </div>
      );
}
  
export default Chart;
