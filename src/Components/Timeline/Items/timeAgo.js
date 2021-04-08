const timeSince = (date, id) => {

    let time = ''
    let status = new Date() - date > 0 ? 'ago' : 'later'
    let seconds = Math.abs(Math.floor((new Date() - date) / 1000));
    let interval = seconds / 31536000;
    if (interval > 1) {
        if (id === 1)
            return time + Math.floor(interval) + ` years ${status}...`;
        time = time + Math.floor(interval) + ` years,`;
        seconds = seconds - Math.floor(interval) * 31536000

    }
    interval = seconds / 2592000;
    if (interval > 1) {
        if (id === 1)
            return time + Math.floor(interval) + ` months ${status}...`;
        time = time + Math.floor(interval) + ` months,`;
        seconds = seconds - Math.floor(interval) * 2592000

    }
    interval = seconds / 86400;
    if (interval > 1) {
        if (id === 1)
            return time + Math.floor(interval) + ` days ${status}...`;
        time = time + Math.floor(interval) + ` days,`;
        seconds = seconds - Math.floor(interval) * 86400

    }
    interval = seconds / 3600;
    if (interval > 1) {
        if (id === 1)
            return time + Math.floor(interval) + ` hours ${status}...`;
        time = time + Math.floor(interval) + ` hours,`;
        seconds = seconds - Math.floor(interval) * 3600

    }
    interval = seconds / 60;
    if (interval > 1) {
        if (id === 1)
            return time + Math.floor(interval) + ` minutes ${status}...`;
        time = time + Math.floor(interval) + ` minutes,`;
        seconds = seconds - Math.floor(interval) * 60

    }
    if (id === 1)
        return time + Math.floor(interval) + ` seconds ${status}...`;
    time = time + Math.floor(seconds) + ` seconds...`;
    return time
}
export default timeSince