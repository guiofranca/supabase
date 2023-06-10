import dayjs from "dayjs";
import { useTheme } from "~/stores/ThemeStore";

export default (): any => {
    const theme = useTheme();

    const chartOptions = {
        chart: {
            fontFamily:
                'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
            foreColor: "hsl(var(--bc)",
            type: "line",
            stacked: false,
            zoom: {
                type: "x",
                enabled: true,
                autoScaleYaxis: true,
            },
            toolbar: {
                autoSelected: "zoom",
                export: {
                    csv: {
                        headerCategory: 'timestamp',
                        dateFormatter: (val: string) => dayjs(val).format('YYYY-MM-DDTHH:mm:ssZ'),
                    }
                }
            },
            animations: {
                easing: "linear",
                speed: 100
            }
        },
        grid: {
            borderColor: "hsl(var(--b3)",
        },
        stroke: {
            curve: 'smooth'
        },
        dataLabels: {
            enabled: false,
        },
        markers: {
            size: 0,
        },
        // title: {
        //     text: "Gráfico das medidas",
        //     align: "left",
        //     style: {
        //         color: "hsl(var(--bc)",
        //     },
        // },
        yaxis: {
            labels: {
                formatter: function (val: any) {
                    return val.toFixed(0);
                },
                style: {
                    color: "hsl(var(--bc)",
                },
            },
            // title: {
            //     text: "Valor",
            //     style: {
            //         color: "hsl(var(--bc)",
            //     },
            // },
        },
        xaxis: {
            type: "datetime",
            labels: {
                format: "dd/MM/yyyy HH:mm",
                datetimeUTC: false
            },
            style: {
                color: "hsl(var(--bc)",
            },
        },
        tooltip: {
            theme: theme.dark ? "dark" : "light",
            x: {
                format: "dd/MM/yyyy HH:mm",
            },
            y: {
                formatter: (val: number) => val.toFixed(4)
            }
        },
    };

    return chartOptions;
}
