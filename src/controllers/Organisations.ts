import {NextFunction, Request, Response} from "express";
import {db} from "../helpers/db";
import axios from "axios";

class Organisations {
  
  public async organizations(req: Request, res: Response, next: NextFunction) {
    try {
      const response = {
        status: 'success',
        message: 'Please search by query',
        data: {}
      }
      const { s } = req.query;
      const url = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/findById/party";
      const token = "b0e88db57973d446c7d9f50c670b018f6151863b";
      // const query = "7707083893" , "784806113663"

      const options = {
        headers: {
          "Authorization": "Token " + token
        },
      }
      if (s) {
        const [findOrganization] = await db.query(`select * from organization where find_id = '${s}'`) as string[];
        if (!findOrganization) {
          const {data} = await axios.post<any>(url, { query: s }, options)
          const result = data?.suggestions[0];
          if (result) {
            await db.query(`INSERT INTO organization(value, find_id) VALUES ('${result.value}', '${result.data.inn}');`)
            const [findOrganization] = await db.query(`select * from organization where find_id = '${s}'`) as string[];
            response.data = findOrganization;
            return res.status(200).send(response);
          }
          response.status = 'fail';
          response.message = 'Not found';
          return res.status(404).send(response);
        }
        response.data = findOrganization;
        return res.status(200).send(response);
      }
      return res.status(200).send(response);
    } catch (e) {
      return next(e)
    }
  }

}

export default new Organisations();