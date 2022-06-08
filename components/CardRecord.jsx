/* eslint-disable react/prop-types */
import React from 'react';

export default function CardRecord({ data }) {
  return (
    <div className="border-2 border-neutral-600 w-full p-8 mt-12">
      <h2 className="text-2xl border-l-4 border-neutral-600 font-medium pl-2">
        存款与刷卡记录
      </h2>
      <div className="w-full overflow-x-auto">
        <table className="w-full min-w-[20rem] mt-6 whitespace-nowrap">
          <thead>
            <tr className="text-neutral-400 !font-medium text-left border-b-2 border-neutral-200">
              <th className="p-2">日期</th>
              <th className="p-2">时间</th>
              <th className="p-2">收据编号</th>
              <th className="p-2">交易员</th>
              <th className="bg-green-100 p-2">数额(IN)</th>
              <th className="bg-yellow-100 p-2">数额(OUT)</th>
              <th className="p-2">数额(BAL)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200">
            {data.cardRecord.length
              ? data.cardRecord.map((e) => (
                <tr key={e}>
                  {e.map((f, i) => (
                    <td key={f} className={`p-2 ${'456'.includes(i) && 'text-right'} ${i === 4 && 'bg-green-100'} ${i === 5 && 'bg-yellow-100'}`}>
                      {f}
                    </td>
                  ))}
                </tr>
              )) : (
                <tr>
                  <td colSpan="9" className="py-4 text-center text-neutral-400">
                    暂无数据
                  </td>
                </tr>
              )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
