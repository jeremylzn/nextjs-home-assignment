import cheerio from 'cheerio' // import cheerio for scrapping
import type { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') { // Create GET request 
    try {
      const url = req.body.url
      const response = await fetch(`https://populareverything.com${url}`)
      const data = await scrappingData(response)
      res.statusCode = 200
      return res.json(data)
    } catch (e) { // If error
      res.statusCode = 404
      return res.json({
        message: e,
        error: 1,
      })
    }
  }
}

export const scrappingData = async (response: Response) => {
  const htmlString = await response.text()
  const $ = cheerio.load(htmlString)
  const data = ($("#__NEXT_DATA__")[0] as any).children[0].data // Get JSON data
  return data
};
