import fs from 'fs';
import csvParser from 'csv-parser';
import Axios from 'axios'

// Define the type for each row of the CSV
export interface CSVRow {
  // Define the structure of your CSV rows
  Date: string
  'Verida DAO': string
  'Network Growth Rewards': string
  'Community Res': string
  'Storage Credits': string
  'Project Development': string
  'Token Launch': string
  'Advisors - A': string
  'Advisors - B': string
  'Private Round': string
  'Seed Round': string
  Total: string
}

// Path to your CSV file
const csvFilePath: string = './assets/vda-token-supply.csv';

export async function getMonthValues(month: number, year: number) {
    //console.log(`getMonthValues ${month} / ${year}`)
    const date = new Date(year, month-1)
    // Get the month name from the Date object
    const monthName = date.toLocaleString('default', { month: 'short' })
    // Combine the month name and year to form the desired string
    const dateString = `16 ${monthName} ${year}`

    // Read CSV file
    const promise = new Promise((resolve, reject) => {
        let lastRow: CSVRow
        fs.createReadStream(csvFilePath)
            .pipe(csvParser())
            .on('data', (row: CSVRow) => {
                if (row.Date == dateString) {
                    resolve(row)
                }

                lastRow = row
            })
            .on('end', () => {
                resolve(lastRow)
            })
    })
    
    const resultRow: CSVRow = <CSVRow> await promise
    return resultRow
}

export async function getAllocations() {
    const API_KEY = process.env.MAGNA_KEY
    const URL = process.env.MAGNA_ENDPOINT_URL
    const VDA_TOKEN_ID = process.env.MAGNA_VDA_TOKEN_ID

    const headers = {
        'Content-Type': 'application/json',
        'x-magna-api-token': API_KEY
    }
    const requestData = {
        tokenId: VDA_TOKEN_ID,
        limit: 100
    };

    try {
        const response = await Axios.post(URL, requestData, { headers })
        return response.data.result.items
    } catch (err) {
        console.log(err)
    }
}

export async function getDistributedFromMagna() {
    const allocations = await getAllocations()
    let total = 0

    allocations.forEach((allocation: any) => {
        total += parseInt(allocation.received)
    })

    return total
}