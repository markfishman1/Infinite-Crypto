function numberWithCommas(x, type) {
    if (x === null) return;
    if (x < 10000) {
        x = x.toFixed(3);
    } else if (x > 10000 && x < 1000000) {
        x = x.toFixed(2);
    }
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function convertDate(publishDate) {
    const date = new Date(publishDate);
    const timestamp = date.getTime();
    const currDate = Date.now();
    const timeDiff = currDate - timestamp;
    const timeDiffInMinutes = timeDiff / 60000;
    let time;
    if (Math.trunc(timeDiffInMinutes / 60) < 1) {
        time = `${Math.trunc(timeDiffInMinutes / 60)} minutes ago`;
    } else if (Math.trunc(timeDiffInMinutes / 60) > 1 && Math.trunc(timeDiffInMinutes / 60) < 2) {
        time = 'an hour ago';
    } else if (Math.trunc(timeDiffInMinutes / 60) > 1 && Math.trunc(timeDiffInMinutes / 60) < 24) {
        time = `${Math.trunc(timeDiffInMinutes / 60)} hours ago`;
    } else if (Math.trunc(timeDiff / 60) > 24) {
        time = 'More than a day ago';
    }
    return time;
}
function convertNumbers(num) {
    if (num >= 1000000000) {
        num = `${numberWithCommas(num / 1000000000)}B`;
    }
    if (num > 1000000 && num < 1000000000) {
        num = `${numberWithCommas(num / 1000000)}M`;
    } else return numberWithCommas(num);
    return num;
}
export const utilService = {
    numberWithCommas,
    convertDate,
    convertNumbers,
};
