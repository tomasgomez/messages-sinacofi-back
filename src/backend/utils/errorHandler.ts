import { NextApiRequest, NextApiResponse } from 'next';

// Create a custom error middleware
export const errorHandler = (err: Error, req: NextApiRequest, res: NextApiResponse<Error>): void => {
    console.error(err.stack); // Log the error for debugging purposes

    // Check if the headers have already been sent
    if (res.headersSent) {
        return;
    }

    // Return the error in JSON format
    res.status(500).json(err);
};
