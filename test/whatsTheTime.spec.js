const whatsTheTime = require('../lib/whatsTheTime')
const { getStrWeekday, getStrMonth, formatLong, formatTime } = require('../lib/whatsTheTime/funcs.js')
const expect = require('chai').expect
const t = 141274327
const lang = 'en'

    describe('Should return the correct date and time for different timezones', function () {
        it('should return the time for the Local Time Zone', function () {
            expect(whatsTheTime({t, zone: true, lang })).to.eql('Sunday 23 June 1974 22:52:07')
        })
        it('should return the local time when zone is not set', function () {
            expect(whatsTheTime({t, lang})).to.eql('Sunday 23 June 1974 22:52:07')
        })
        it('should return the UTC time', function () {
            expect(whatsTheTime({t, zone: false, lang})).to.eql('Monday 24 June 1974 2:52:07')
        })
        it('should return the local time when language is not set', function () {
            expect(whatsTheTime({t, zone: true})).to.eql('Sunday 23 June 1974 22:52:07')
        })
    })

    describe('Should return the correct time only for different timezones', function () {
        it('should return the time for the Local Time Zone', function () {
            expect(whatsTheTime({t, zone: true, lang, format: 'time' })).to.eql('22:52:07')
        })
        it('should return the local time when zone is not set', function () {
            expect(whatsTheTime({t, lang, format: 'time'})).to.eql('22:52:07')
        })
        it('should return the UTC time', function () {
            expect(whatsTheTime({t, zone: false, lang, format: 'time'})).to.eql('2:52:07')
        })
        it('should return the local time when language is not set', function () {
            expect(whatsTheTime({t, zone: true, format: 'time'})).to.eql('22:52:07')
        })
    })

    describe('Should return false when the timestamp is invalid', function () {
        it('should return an error', function () {
            expect(whatsTheTime({t: 'aardvark'})).to.be.an('error')
        })
    })

    describe('Should return correct month', function () {
        it('should return January', function () {
            expect(getStrMonth({ mon: 0 })).to.eql('January')
        })
        it('should return July', function () {
            expect(getStrMonth({ mon: 6 })).to.eql('July')
        })
    })

    describe('Should return correct weekday', function () {
        it('should return Sunday', function () {
            expect(getStrWeekday({ wday: 0 })).to.eql('Sunday')
        })
        it('should return Monday', function () {
            expect(getStrWeekday({ wday: 1 })).to.eql('Monday')
        })
    })

    describe('Should format a long date', function () {
        const JSONdate = {
            hour: 10,
            min: '029',
            sec: '021',
            mon: 1,
            dom: 24,
            year: 2020,
            wday: 2
        }
        const expectedResult = 'Tuesday 24 February 2020 10:29:21'
        it('should return Tuesday 24 February 2020 10:29:21', function () {
            expect(formatLong(JSONdate)).to.eql(expectedResult)
        })
    })

    describe('Should format time', function () {
        const JSONdate = {
            hour: 10,
            min: '029',
            sec: '021',
        }
        const expectedResult = '10:29:21'
        it('should return 10:29:21', function () {
            expect(formatTime(JSONdate)).to.eql(expectedResult)
        })
    })

