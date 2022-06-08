/* eslint-disable no-loop-func */
/* eslint-disable no-inner-declarations */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
const axios = require("axios");
const { JSDOM } = require("jsdom");
const fs = require("fs");

axios.defaults.withCredentials = true;

const COOKIES = {
  PHPSESSID: "kcd1mm146u8k4o8d174fk0qbs2",
  "Content-Type": "application/x-www-form-urlencoded"
};

const HEADERS = {
  Cookie: Object.keys(COOKIES)
    .map((key) => `${key}=${COOKIES[key]}`)
    .join("; "),
};
const target = "200156";

(async function scrapeData() {
  await axios("https://fystudent.foonyew.edu.my/login.php", {
    method: "POST",
    data: `txt_user=${target}&txt_password=123456&send.x=12&send.y=22`,
    headers: HEADERS,
  }).then((e) => console.log(e.data));

  const mainRAW = await axios("https://fystudent.foonyew.edu.my/main.php", {
    method: "GET",
    headers: HEADERS,
    withCredentials: true,
  }).then((res) => res.data);

  const mainDOM = new JSDOM(mainRAW).window.document;
  const [, _class, name] = mainDOM.querySelector("h1").textContent.split(" ");

  async function getPaymentItems() {
    const paymentItems = {};

    for (const i of "fmlp") {
      const paymentItemsRAW = await axios(
        "https://fystudent.foonyew.edu.my/jf_inquiry_list.php",
        {
          method: "POST",
          data: `action=change&jfil_cbo_FCODE=${i.repeat(
            3
          )}&submit=+%E7%A1%AE%E5%AE%9A%E6%B8%B8%E8%A7%88+`,
          headers: HEADERS,
        }
      ).then((res) => res.data);

      const paymentItemsDOM = new JSDOM(paymentItemsRAW).window.document;

      const title = paymentItemsDOM.querySelector(
        `option[value='${i.repeat(3)}']`
      ).textContent;
      const content = Array.from(
        paymentItemsDOM.querySelectorAll("table.w100 tr")
      )
        .slice(1)
        .map((row) =>
          Array.from(row.querySelectorAll("td")).map((col) =>
            col.textContent.trim()
          )
        );
      paymentItems[title] = content;
    }

    return paymentItems;
  }

  async function getCardRecord() {
    const cardRecordRAW = await axios(
      "https://fystudent.foonyew.edu.my/jf_128sales_list.php",
      {
        method: "GET",
        headers: HEADERS,
      }
    ).then((res) => res.data);

    const cardRecordDOM = new JSDOM(cardRecordRAW).window.document;

    const content = Array.from(cardRecordDOM.querySelectorAll("table.w100 tr"))
      .slice(1)
      .map((row) =>
        Array.from(row.querySelectorAll("td")).map((col) =>
          col.textContent.trim()
        )
      );

    return content;
  }

  async function getCardDetails() {
    const cardRecordRAW = await axios(
      "https://fystudent.foonyew.edu.my/jf_detail_sales_list.php",
      {
        method: "GET",
        headers: HEADERS,
      }
    ).then((res) => res.data);

    const cardRecordDOM = new JSDOM(cardRecordRAW).window.document;

    const content = Array.from(cardRecordDOM.querySelectorAll("table.w100 tr"))
      .slice(1)
      .map((row) =>
        Array.from(row.querySelectorAll("td")).map((col) =>
          col.textContent.trim()
        )
      );

    return content;
  }

  async function getExamRecord() {
    const examRes = {};
    const examResListRAW = await axios(
      "https://fystudent.foonyew.edu.my/jw_result_trans.php",
      {
        method: "GET",
        headers: HEADERS,
      }
    ).then((res) => res.data);

    const examResListDOM = new JSDOM(examResListRAW).window.document;

    const years = Array.from(
      Array.from(examResListDOM.querySelectorAll("table"))
        .pop()
        .querySelectorAll("div")
    )
      .map((e) => e.textContent.trim())
      .slice(3)
      .filter((_, i) => !(i % 2))
      .map((e) => parseInt(e, 10));

    for (const year of years) {
      const examResRAW = await axios(
        `https://fystudent.foonyew.edu.my/jw_result_hist.php?YEAR=${year}`,
        {
          method: "GET",
          headers: HEADERS,
        }
      ).then((res) => res.data);

      const examResDOM = new JSDOM(examResRAW).window.document;

      const class_ = examResDOM.querySelector(
        "table table tr:last-child td:nth-child(2)"
      ).textContent;

      function* tableGenerator() {
        const table = Array.from(examResDOM.querySelectorAll("table tr")).slice(
          7
        );
        for (const item of table) {
          yield item;
        }
      }

      const table = tableGenerator();

      const results = [];

      while (true) {
        const row = table.next();
        if (row.value.querySelector("hr")) break;
        results.push(
          Array.from(row.value.querySelectorAll("td"))
            .map((e) => e.textContent.trim().replace(/\u3000/g, ""))
            .map((e) => parseInt(e, 10) || e)
        );
      }

      const [, , atti1, atti2] = table.next().value.querySelectorAll("td");
      const [, , comm1, comm2, , _avg] = table
        .next()
        .value.querySelectorAll("td");
      let [, , attn, , , deduct] = table.next().value.querySelectorAll("td");
      let real = Array.from(table.next().value.querySelectorAll("td")).pop();
      let [lift, , rank] = table.next().value.children;
      table.next();
      table.next();
      let [, final] = table.next().value.querySelectorAll("td");

      const attitude = [atti1, atti2].map((e) => parseInt(e.textContent, 10));
      const comm = [comm1, comm2].map((e) => e.textContent.trim());
      const avg = parseFloat(_avg.textContent);
      attn = Object.fromEntries(
        attn.textContent
          .split("/")
          .map((e, i) => [["val", "total"][i], parseInt(e, 10)])
      );
      deduct = parseFloat(deduct.textContent.trim());
      real = parseFloat(real.textContent);
      lift = Array.from(
        lift.querySelectorAll("tr")[1].querySelectorAll("td")
      ).map((e) => parseInt(e.textContent, 10));
      rank = Object.fromEntries(
        rank.textContent
          .split("/")
          .map((e, i) => [["val", "total"][i], parseInt(e, 10)])
      );
      final = final.textContent.trim();

      examRes[class_] = {
        attitude,
        comm,
        avg,
        attn,
        deduct,
        real,
        lift,
        rank,
        final,
        results,
      };
    }

    return examRes;
  }

  const final = {
    stud_no: target,
    name,
    class: _class,
    paymentItems: await getPaymentItems(),
    cardRecord: await getCardRecord(),
    cardRecordDetails: await getCardDetails(),
    exam_res: await getExamRecord(),
  };

  // write final into json file
  fs.writeFileSync(`./${target}.json`, JSON.stringify(final, null, 2));
})(target);
