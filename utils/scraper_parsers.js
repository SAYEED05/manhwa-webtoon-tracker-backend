import { URL } from "url";
import cheerio from "cheerio";

const mangaTxParser = ({ url, html }) => {
  const $ = cheerio.load(html);
  const title = $("title").text();
  const description = $('meta[name="description"]').attr("content");
  const imgSrc = $("div.summary_image a img").attr("data-src");
  const latestChapter = $("li.wp-manga-chapter")
    ?.first()
    .find("a")
    .text()
    .trim()
    .replace("Chapter ", "");
  const is_finished = false;

  const res_object_to_send = {
    title,
    description,
    imgSrc,
    latestChapter: Number(latestChapter),
    is_finished,
    site_you_read_at: url,
  };

  return res_object_to_send;
};
const asuraScanParser = ({ url, html }) => {
  const $ = cheerio.load(html);
  const title = $("title").text();
  const description = $('meta[name="description"]').attr("content");
  // const imgSrc = $(".thumbook .thumb img").attr("src");
  // const latestChapter = $(".epcurlast").text().trim().replace("Chapter ", "");
  // const is_finished = false;

  const res_object_to_send = {
    title,
    description,
  };

  return res_object_to_send;
};
const returnofthelegendaryspearknight = ({ url, html }) => {
  const $ = cheerio.load(html);
  const title = $("title").text();
  const description = $(".Content").text();
  const imgSrc = $("div.wp-block-image figure img").attr("src");
  const is_finished = false;
  const latestChapter = $("li.su-post ").first().find("a").text().trim();
  const hasChapterNumber = latestChapter.match(/\d+/);
  const latestChapterNumber = hasChapterNumber ? hasChapterNumber[0] : null;

  const res_object_to_send = {
    title,
    description,
    imgSrc: `${url}${imgSrc}`,
    is_finished,
    latestChapter: latestChapterNumber ? Number(latestChapterNumber) : null,
  };

  return res_object_to_send;
};

const selectParserFunction = ({ url, html }) => {
  const domain = new URL(url).hostname.replace("www.", "");
  switch (domain) {
    case "mangatx.com":
      return mangaTxParser({ url, html });
    case "asurascans.com":
      return asuraScanParser({ url, html });
    case "returnofthelegendaryspearknight.online":
      return returnofthelegendaryspearknight({ url, html });

    default:
      return null;
  }
};
export {
  selectParserFunction,
  mangaTxParser,
  asuraScanParser,
  returnofthelegendaryspearknight,
};
