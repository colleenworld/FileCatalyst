const { formatLong, formatTime } = require('./funcs.js')

const whatsTheTime = ({ t, lang = 'en', zone = true, format = 'long'}) => {
   if (!Number.isSafeInteger(t)) {
      return new TypeError('invalid input')
   }
   else {
      const dt = new Date(t * 1000)
      const JSONdate = {}
      JSONdate.hour = zone ? dt.getHours() : dt.getUTCHours()
      JSONdate.min = '0' + (zone ? dt.getMinutes() : dt.getUTCMinutes())
      JSONdate.sec = '0' + dt.getSeconds()
      JSONdate.mon = zone ? dt.getMonth() : dt.getUTCMonth()
      JSONdate.dom = zone ? dt.getDate() : dt.getUTCDate()
      JSONdate.year = dt.getFullYear()
      JSONdate.wday = zone ? dt.getDay() : dt.getUTCDay()

      switch (format) {
         case 'time':
            return formatTime(JSONdate)
         case 'long':
            return formatLong(JSONdate)
         case 'default':
            return formatLong(JSONdate)
      }
   }
}

module.exports = whatsTheTime