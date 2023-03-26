export function milisecToFormat(milisec: number) {
    var date = new Date(0);
    date.setMilliseconds(milisec);
    var timeString = date.toISOString().substring(14, 19);
    return timeString;
}

export function convertToFormatDate(date: any) {
    var d = new Date(date);
    return d.toLocaleDateString();
}
