/* eslint-disable react/prop-types */
import React, { useState } from 'react';

export default function ExamRes({ data }) {
  const [currentYear, setCurrentYear] = useState(
    Object.keys(data.examRes)[Object.keys(data.examRes).length - 1],
  );

  return (
    <div className="border-2 border-neutral-600 w-full p-8 mt-12">
      <div className="flex flex-col md:flex-row md:items-center gap-6 justify-between">
        <h2 className="text-2xl border-l-4 border-neutral-600 font-medium pl-2">
          历年考试成绩
        </h2>
        <div className="flex items-center gap-8 sm:gap-12 gap-y-3 flex-wrap">
          {Object.keys(data.examRes).map((e) => (
            <button onClick={() => setCurrentYear(e)} type="button" className={`relative after:absolute after:w-0 after:h-[2px] after:rounded-full after:bg-neutral-600 hover:after:!w-4 hover:font-medium hover:text-neutral-600 transition-all after:transition-all after:-bottom-1 after:left-1/2 after:-translate-x-1/2 ${currentYear === e ? 'after:!w-4 font-medium' : 'text-neutral-400'}`}>
              {e}
            </button>
          ))}
        </div>
      </div>
      <div className="w-full overflow-x-auto">
        <table className="w-full min-w-[20rem] mt-6 whitespace-nowrap">
          <thead>
            <tr className="text-neutral-400 !font-medium text-left border-b-2 border-neutral-200">
              <th className="p-2 text-center" colSpan="2">科目</th>
              <th className="p-2 text-center">上半年</th>
              <th className="p-2 text-center">下半年</th>
              <th className="p-2 text-center">平均</th>
              <th className="p-2 text-center">每周节数</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200">
            {data.examRes[currentYear].results.map((e, ir) => (
              <tr
                key={e}
              >
                {e.map((f, i) => (
                  <td
                    key={f}
                    className={`p-2 ${!'01'.includes(i) && 'text-center'} ${'234'.includes(i) && f < 60 && 'text-rose-400'} ${ir === data.examRes[currentYear].results.length - 1
                    && 'border-b-2 border-neutral-200'}`}
                  >
                    {f}
                  </td>
                ))}
              </tr>
            ))}
            <tr className="!border-0">
              <td className="p-2 text-right font-medium text-neutral-400" colSpan="2">
                操行
              </td>
              {data.examRes[currentYear].attitude.map((e) => (
                <td
                  key={Math.random()}
                  className="p-2 text-center"
                >
                  {e}
                </td>
              ))}
              <td className="p-2 text-center font-medium text-neutral-400">
                合计
              </td>
              <td className="p-2 text-center">
                {data.examRes[currentYear].results.map((e) => e[5]).reduce((a, b) => a + b, 0)}
              </td>
            </tr>
            <tr className="!border-0">
              <td className="p-2 text-right font-medium text-neutral-400" colSpan="2">
                评语
              </td>
              {data.examRes[currentYear].comm.map((e) => (
                <td
                  key={Math.random()}
                  className="p-2 text-center"
                >
                  {e || '-'}
                </td>
              ))}
              <td className="p-2 text-right font-medium text-neutral-400">
                平均分数
              </td>
              <td className={`p-2 text-right ${data.examRes[currentYear].avg < 60 && 'text-rose-400'}`}>
                {data.examRes[currentYear].avg.toFixed(2)}
              </td>
            </tr>
            <tr className="!border-0">
              <td className="p-2 text-right font-medium text-neutral-400" colSpan="2">
                上课节数
              </td>
              <td
                key={Math.random()}
                className="p-2 text-center"
                colSpan={2}
              >
                {data.examRes[currentYear].attn.val}
                {' '}
                /
                {' '}
                {data.examRes[currentYear].attn.total}
              </td>
              <td className="p-2 text-right font-medium text-neutral-400">
                缺席扣分
              </td>
              <td className="p-2 text-right">
                {data.examRes[currentYear].deduct.toFixed(2)}
              </td>
            </tr>
            <tr className="!border-0">
              <td className="p-2 text-right font-medium text-neutral-400" colSpan={5}>
                实得分数
              </td>
              <td className={`p-2 text-right ${data.examRes[currentYear].real < 60 && 'text-rose-400'}`}>
                {data.examRes[currentYear].real.toFixed(2)}
              </td>
            </tr>
            <tr className="!border-0">
              <td colSpan={2} rowSpan={2}>
                <table className="w-full">
                  <thead>
                    <tr className="text-neutral-400 !font-medium text-left border-b-2 border-neutral-200">
                      <th className="p-2 text-center">公假</th>
                      <th className="p-2 text-center">特病</th>
                      <th className="p-2 text-center">病假</th>
                      <th className="p-2 text-center">特假</th>
                      <th className="p-2 text-center">丧假</th>
                      <th className="p-2 text-center">事假</th>
                      <th className="p-2 text-center">迟到</th>
                      <th className="p-2 text-center">旷课</th>
                      <th className="p-2 text-center">总缺席节数</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-200">
                    <tr>
                      {data.examRes[currentYear].lift.map((e) => (
                        <td
                          key={Math.random()}
                          className="p-2 text-center"
                        >
                          {e}
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </td>
              <td className="p-2 text-right font-medium text-neutral-400" colSpan={3}>
                班级名次
              </td>
              <td className="p-2 text-right">
                {data.examRes[currentYear].rank.val}
                {' '}
                /
                {' '}
                {data.examRes[currentYear].rank.total}
              </td>
            </tr>
            <tr className="!border-0">
              <td className="p-2 text-right font-medium text-neutral-400" colSpan={3}>
                升留级
              </td>
              <td className="p-2 text-right">
                {data.examRes[currentYear].final}
              </td>
            </tr>
            <tr className="!border-0">
              <td colSpan={6} className="pt-4">
                <span className="mb-1 block font-medium text-neutral-400">奖励 / 惩罚</span>
                {data.examRes[currentYear].awpn.join(', ')}
              </td>
            </tr>
            <tr className="!border-0">
              <td colSpan={6} className="pt-4">
                <span className="mb-1 block font-medium text-neutral-400">课外活动</span>
                {data.examRes[currentYear].cocurr.join(', ')}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
