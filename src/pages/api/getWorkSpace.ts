import type { NextApiRequest, NextApiResponse } from 'next';
import { getWorkSpace } from '../../getWorkSpace';

type ResponseData = {
    message: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
) {
    //const workSpace = await getWorkSpace("ted6n5", "HMI")
    //console.log(workSpace);
    console.log(req.body);
    const userObj = JSON.parse(req.body);
    const user: string = userObj.username;
    const workSpace = await getWorkSpace(user, "HMI")
    res.status(200).json({message: JSON.stringify(workSpace)})
}