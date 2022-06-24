import requests
from bs4 import BeautifulSoup as bs
import bs4
import json

COOKIES = {
    "PHPSESSID": "7keppj07p0ufv93qv7r9uap4f4"
}

target = "190949"

requests.post("https://fystudent.foonyew.edu.my/login.php", data={
    "txt_user": target,
    "txt_pass": "123456",
}, cookies=COOKIES)

soup = bs(requests.get('https://fystudent.foonyew.edu.my/main.php',
          cookies=COOKIES).text, "lxml")

_, _class, name, _ = soup.find("h1").text.split()


def getPaymentItems():
    payment_items = {}
    for i in "fmlp":
        soup = bs(requests.post("https://fystudent.foonyew.edu.my/jf_inquiry_list.php", headers={
            "Content-Type": "application/x-www-form-urlencoded"
        }, cookies=COOKIES, data={
            "action": "change",
            "jfil_cbo_FCODE": i*3,
            "submit": "+确定游览+"
        }).text, 'html.parser')

        title = soup.select_one(f"option[value='{i*3}']").text
        content = [[col.text.strip() for col in row.select("td")]
                   for row in soup.select("table.w100 tr")[1:]]
        payment_items[title] = content

    return payment_items


def getCardRecord():
    soup = bs(requests.get("https://fystudent.foonyew.edu.my/jf_128sales_list.php",
              cookies=COOKIES).text, "html.parser")
    content = [[col.text.strip() for col in row.select("td")]
               for row in soup.select("table.w100 tr")[1:]]
    return content


def getCardRecordDetails():
    soup = bs(requests.get("https://fystudent.foonyew.edu.my/jf_detail_sales_list.php",
              cookies=COOKIES).text, "html.parser")
    content = [[col.text.strip() for col in row.select("td")]
               for row in soup.select("table.w100 tr")[1:]]
    return content

def getExamRecord():
    exam_res = {}
    soup = bs(requests.get("https://fystudent.foonyew.edu.my/jw_result_trans.php",
            cookies=COOKIES).text, "html.parser")

    items = [i.text for i in soup.select("table")[-1].select("div")][3:]
    years = [int(items[i].replace("年", '').strip())
            for i in range(0, len(items), 2)]

    for i in years:
        soup = bs(requests.post(
            f"https://fystudent.foonyew.edu.my/jw_result_hist.php?YEAR={i}", cookies=COOKIES).text, "html.parser")

        class_ = soup.select_one("table table tr:last-child td:nth-child(2)").text

        table = (i for i in soup.select("table tr")[7:])
        results = []
        while True:
            row = next(table)
            if (row.select_one("hr")):
                break
            results.append([int(col.text.strip()) if col.text.strip().isdigit(
            ) else col.text.strip().replace("\u3000", '') for col in row.select("td")])
        _, _, atti1, atti2, *_ = next(table).select("td")
        _, _, comm1, comm2, _, avg = next(table).select("td")
        _, _, attn, _, _, deduct = next(table).select("td")

        attitude = [int(i.text.strip()) for i in [atti1, atti2]]
        comm = [i.text.strip() for i in [comm1, comm2]]
        avg = float(avg.text.strip())
        attn = dict(zip(["val", "total"], [i.strip()
                    for i in attn.text.split("/")]))
        deduct = float(deduct.text.strip())
        real = float([i.text.strip() for i in next(
            table).children if type(i) == bs4.element.Tag and i.text][-1])
        lift, _, rank = [i for i in next(
            table).children if type(i) == bs4.element.Tag]

        lift = [int(i.text.strip()) for i in lift.select("tr")[1].select("td")]
        rank = dict(zip(["val", "total"], [i.strip()
                    for i in rank.text.split("/")]))
        next(table)
        next(table)
        _, final = next(table).select("td")
        final = final.text.strip()

        exam_res[i] = {
            "class": class_,
            "attitude": attitude,
            "comm": comm,
            "avg": avg,
            "attn": attn,
            "deduct": deduct,
            "real": real,
            "lift": lift,
            "rank": rank,
            "results": results,
            "final": final
        }

json.dump({
    "stud_no": target,
    "name": name,
    "class": _class,
    "payment_items": getPaymentItems(),
    "card_record": getCardRecord(),
    "card_record_details": getCardRecordDetails(),
    "exam_res": getExamRecord(),
}, open(f"{target}.json", "w"), indent=2, ensure_ascii=False)
