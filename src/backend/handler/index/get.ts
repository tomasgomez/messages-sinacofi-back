import axios from 'axios';
import {
  envVariables
} from '../../utils/variables';
import { User } from '@/backend/entities/user/user';
import { NextApiRequest, NextApiResponse } from 'next';
import { Index, Observation, formatBCChDate, getClosestValue, indexType, series } from '@/backend/entities/index/interface';

// get message function
export async function get(req: NextApiRequest, res: NextApiResponse < any > ){

    // get values
    let { index } = req.query
    if (!index){
        res.status(400).json({})
        return;
    } 

    // cast index
    index = index as string

    if (!(index in indexType)) {
        res.status(400).json({})
        return;
    }

    const serie = series[index as keyof typeof series];

    // create request BCCh
    let baseUrl = process.env.BANCO_CENTRAL_URL || ''
    let user = process.env.BANCO_CENTRAL_USER || ''
    let pass = process.env.BANCO_CENTRAL_PASS || ''

    let currentDate = new Date();
    let pastDays = new Date();
    pastDays.setDate(currentDate.getDate() - 3);
    const lastdate = formatBCChDate(currentDate);
    const initDate = formatBCChDate(pastDays);
    let url: string = baseUrl + "?user="+ user +"&pass="+ pass + "&firstdate=" + initDate + "&lastdate=" + lastdate + "&timeseries=" + serie

    let response = await axios.get(url);
    /* Check if the response status is not 200 */
    if (response.status !== 200 || response.data.length == 0) {
      console.error('Error fetching users:', response.statusText);
      return new Error(response.statusText);
    }

    // get values
    let dataResponse: Observation[] = response.data.Series.Obs;

    if (!dataResponse || dataResponse.length == 0){
        res.status(400).json({})
        return;
    }

    const closestValue: Observation = getClosestValue(dataResponse);

    const indexResponse: Index = {
        value: closestValue.value,
        type: indexType[index as keyof typeof indexType], 
        lastDate: closestValue.indexDateString
    }


    res.status(200).json(indexResponse);
    return


    
}