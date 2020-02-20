const localise = {
    en: {
        months: ['January','February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        weekdays: ['Sunday', 'Monday','Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    }
}

const getStrWeekday = ({ wday, lang = 'en' }) => {
    return localise[lang].weekdays[wday]
}

const getStrMonth = ({ mon, lang ='en'}) => {
    return localise[lang].months[mon]
}

const formatTime = (raw) => {
    const { hour, min, sec } = raw
    return hour + ':' + min.substr(-2) + ':' + sec.substr(-2)
}

const formatLong = (raw) => {
    const { hour, min, sec, wday, dom, mon, year, lang } = raw
    let weekday = getStrWeekday({ wday, lang })
    let month = getStrMonth({ mon, lang })
    return weekday + ' ' + dom + ' ' + month + ' ' + year + ' ' + hour + ':' + min.substr(-2) + ':' + sec.substr(-2)
}




module.exports = { getStrWeekday, getStrMonth, formatTime, formatLong }