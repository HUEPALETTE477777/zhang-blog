export const format_date = (iso_date) => {
    const date = new Date(iso_date);
    
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        weekday: 'short',
        hour: '2-digit',
        minute: '2-digit',
        timeZoneName: 'short', 
        timeZone: 'PST' 
    });
}
