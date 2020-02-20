const extract = require('../lib/extract')
const { getRow, getLabels } = require('../lib/extract/funcs.js')
const expect = require('chai').expect
let keys = ['one', 'two']
const one = [4988,4989,4991]
const two = [9770,9772,9774]
const labels = [1559153541000,1559153540000,1559153539000]
const labelRow = ['one','two','three']
let rawData

const expectedResult = {
    "finish": "Wednesday 29 May 2019 14:12:21",
    "start": "Wednesday 29 May 2019 14:12:19",
    "one": [
        {
            "label": "14:12:19",
            "y": 4991
        },
        {
            "label": "14:12:20",
            "y": 4989
        },
        {
            "label": "14:12:21",
            "y": 4988
        }
    ],
    "two": [
        {
            "label": "14:12:19",
            "y": 9774
        },
        {
            "label": "14:12:20",
            "y": 9772
        },
        {
            "label": "14:12:21",
            "y": 9770
        }
    ]
}

    describe('Should return the correctly formatted data', function () {
        it('should return two rows', function () {
            rawData = {
                labels,
                one,
                two
            }
            keys = ['one', 'two']
            let result = extract({keys, rawData})
            expect(result).to.eql(expectedResult)
        })
        it('should return one row', function () {
            rawData = {
                labels,
                one,
                two
            }
            delete expectedResult['two']
            keys = ['one']
            let result = extract({keys, rawData})
            expect(result).to.eql(expectedResult)
        })
        it('should return no rows', function () {
            rawData = {
                labels,
            }
            keys = []
            delete expectedResult['one']
            let result = extract({keys, rawData})
            expect(result).to.eql(expectedResult)
        })
    })

    describe('Should return labels', function () {
        it('return correct labels', function () {
            const expectedResult = [ '14:12:21', '14:12:20', '14:12:19' ]
            expect(getLabels({ labelRow: labels })).to.eql(expectedResult)
        })
    })

    describe('Should return a formatted row', function () {
        const expectedResult = [
            {
                "label": 1559153539000,
                "y": 4991
            },
            {
                "label": 1559153540000,
                "y": 4989
            },
            {
                "label": 1559153541000,
                "y": 4988
            }
        ]
        it('should return January', function () {
            expect(getRow({points: one, labels})).to.eql(expectedResult)
        })
    })
