export default function convertHourToMinutes(time: string){
    // time: 8:00 (hour : min)
    const [hour, minutes] = time.split(':').map(Number);
    const timeInMinutes = (hour * 60) + minutes;

    return timeInMinutes;
}