const Fs = require('fs')
const whatsTheTime = require('../whatsTheTime')
const path = require('path')
const root = path.normalize(path.join(__dirname, '../../'))
const { getRow, getLabels } = require('./funcs')

const extract = ({ keys, rawData })=> {
    let data
    if (rawData) data = rawData
    else data = JSON.parse(Fs.readFileSync(path.join(root, 'data/data.json'), 'utf-8'))

    let labelRow = data.labels
    let labels = getLabels({ labelRow })
    let rows = {}
    rows.finish = whatsTheTime({ t: labelRow[0]/1000, format: 'long' })
    rows.start = whatsTheTime({t: labelRow[labelRow.length - 1]/1000, format: 'long' })

    for (let i = 0; i < keys.length; i++) {
        if (data[keys[i]]) {
            let points = data[keys[i]]
            rows[keys[i]] = getRow({points, labels})
        }
    }
    return rows
}

module.exports = extract