const whatsTheTime = require('../whatsTheTime')

const getLabels = ({ labelRow }) => {
    let labels = []
    for (let i = 0; i < labelRow.length; i++) {
        labels.push(whatsTheTime({t: labelRow[i]/1000, format: 'time'}))
    }
    return labels
}

const getRow = ({ points, labels }) => {
    let row = []
    for (let i = 0; i < labels.length; i++) {
        row.push({label: labels[i], y: points[i]})
    }
    return row.reverse()
}

module.exports = { getRow, getLabels }