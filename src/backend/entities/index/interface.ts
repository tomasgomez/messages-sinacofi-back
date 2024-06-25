export enum indexType {
    UF = 'UF',
    USD = 'USD',
    IPV = 'IPV'
 }

type IndexType = indexType;
 
// Banco Central Series

export enum series {
    USD = 'F073.TCO.PRE.Z.D',
    UF = 'F073.UFF.PRE.Z.D',
    IPV = 'F073.IVP.PRE.Z.D'
}


export type Index  = {
    value: string,
    type: IndexType,
    lastDate: string
}

export type Observation = {
    indexDateString: string;
    value: string;
    statusCode: string;
};


export function getClosestValue(observations: Observation[]): Observation {
    const today = new Date();

    const parseDate = (dateString: string): Date => {
        const [day, month, year] = dateString.split('-').map(Number);
        return new Date(year, month - 1, day); 
    };

    let closestObservation = observations[0];
    let closestDifference = Math.abs(parseDate(observations[0].indexDateString).getTime() - today.getTime());

    for (const observation of observations) {
        const observationDate = parseDate(observation.indexDateString);
        const difference = Math.abs(observationDate.getTime() - today.getTime());

        if (difference < closestDifference) {
            closestDifference = difference;
            closestObservation = observation;
        }
    }

    return closestObservation;
}

export function formatBCChDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Meses son 0-indexed
    const day = String(date.getDate()).padStart(2, '0');
  
    return `${year}-${month}-${day}`;
}