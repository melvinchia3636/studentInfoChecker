/* eslint-disable react/prop-types */
import React from 'react';

export default function CardDetailsRecord({ data }) {
  return (
    <div className="border-2 border-neutral-600 w-full p-8 mt-12">
      <h2 className="text-2xl border-l-4 border-neutral-600 font-medium pl-2">
        刷卡明细
      </h2>
      <div className="w-full overflow-x-auto">
        <table className="w-full min-w-[20rem] mt-6 whitespace-nowrap">
          <thead>
            <tr className="text-neutral-400 !font-medium text-left border-b-2 border-neutral-200">
              <th className="p-2">日期</th>
              <th className="p-2">时间</th>
              <th className="p-2">收据编号</th>
              <th className="p-2">货物名</th>
              <th className="p-2">数量</th>
              <th className="p-2">价额</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200">
            {data.cardRecordDetails.length
              ? data.cardRecordDetails.map((e) => (
                <tr key={e}>
                  {e.map((f, i) => (
                    <td key={f} className={`p-2 ${'45'.includes(i) && 'text-right'}`}>
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
