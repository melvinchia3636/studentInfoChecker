/* eslint-disable react/prop-types */
import React, { useState } from 'react';

export default function PaymentRecord({ data }) {
  const [currentSection, setCurrentSection] = useState(0);
  return (
    <div className="border-2 border-neutral-600 w-full p-8 mt-12">
      <div className="flex flex-col md:flex-row md:items-center gap-6 justify-between">
        <h2 className="text-2xl border-l-4 border-neutral-600 font-medium pl-2">
          收费项目
        </h2>
        <div className="flex items-center gap-12 gap-y-3 flex-wrap">
          {Object.keys(data.paymentItems).map((e, i) => (
            <button onClick={() => setCurrentSection(i)} type="button" className={`relative after:absolute after:w-0 after:h-[2px] after:rounded-full after:bg-neutral-600 hover:after:!w-4 hover:font-medium hover:text-neutral-600 transition-all after:transition-all after:-bottom-1 after:left-1/2 after:-translate-x-1/2 ${currentSection === i ? 'after:!w-4 font-medium' : 'text-neutral-400'}`}>
              {e}
            </button>
          ))}
        </div>
      </div>
      <div className="w-full overflow-x-auto">
        <table className="w-full min-w-[20rem] mt-6 whitespace-nowrap">
          <thead>
            <tr className="text-neutral-400 !font-medium text-left border-b-2 border-neutral-200">
              <th className="p-2">日期</th>
              <th className="p-2">时间</th>
              <th className="p-2">收据编号</th>
              <th className="p-2">学号</th>
              <th className="p-2 text-center">学期</th>
              <th className="p-2">班级</th>
              <th className="p-2">编号</th>
              <th className="p-2">收费项目</th>
              <th className="p-2">数额</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200">
            {Object.values(data.paymentItems)[currentSection].length
              ? Object.values(data.paymentItems)[currentSection].map((e) => (
                <tr key={e}>
                  {e.map((f, i) => (
                    <td key={f} className={`p-2 ${i === 4 && 'text-center'} ${i === 8 && 'text-right'}`}>
                      {i === 8 ? parseFloat(f).toFixed(2) : f}
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
