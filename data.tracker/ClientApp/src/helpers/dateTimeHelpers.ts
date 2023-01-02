export function FormatDateTime(inputDate: Date | null) {
    let date = new Date(inputDate);
    return date
        ? `${date.getDate()} ${date.toLocaleString('default', { month: 'short' })} ${date.getFullYear()} ${date.getHours()}:${(date.getMinutes() < 10 ? '0' : '')}${date.getMinutes()}`
        : '';
}

export function CalculateHoursDifference(beginDate: Date, finishDate: Date): number {
    let startDate = new Date(beginDate),
        stopDate = new Date(finishDate);

    let diffMs = Math.abs((startDate as any) - (stopDate as any));
    return (diffMs) / 36e5;
}

export function FormatHoursDifference(hours: number): string {
    return hours.toFixed(2);
}
