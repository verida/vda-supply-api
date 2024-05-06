import { Request, Response } from 'express'
import { CSVRow, getMonthValues } from './utils';


/**
 *
 */
export default class Controller {

    public static async circulating(req: Request, res: Response, next: any) {
        const currentDate = new Date()

        const monthValues: CSVRow = await getMonthValues(currentDate.getMonth()+1,currentDate.getFullYear())
        const INCLUDED_POOLS = [
            'Storage Credits',
            'Token Launch'
        ]

        let total = 0
        //console.log(monthValues)
        INCLUDED_POOLS.forEach((poolName: string) => {
            // @ts-ignore
            total += parseInt(monthValues[poolName].replace(/[^0-9]/g, ''))
        })

        // @todo: Add data from Magna API for the remaining token pools
        
        console.log(`Returning total: ${total}`)
        return res.status(200).send(total.toString());
    }

    public static async total(req: Request, res: Response, next: any) {
        return res.status(200).send("1000000000");
    }

}