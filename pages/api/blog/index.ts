import {client} from "../../../libs/client"
import type { NextApiHandler } from 'next'

export const getSearchBlogs: NextApiHandler = async (req, res) => {
  // 検索したいキーワードをqueryから取得
    const keyword = (typeof(req.query.keyword) === 'string') ? req.query.keyword : "";
    console.log(req.query.keyword)

    // 検索キーワードを設定した状態でmicroCMSにリクエストを送信。
    const response = await client.get({
        endpoint: "blogs",
        queries: {
        q: decodeURI(keyword),
        },
    });
    return res.status(200).json(response);
};

export default getSearchBlogs;