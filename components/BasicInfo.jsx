/* eslint-disable react/prop-types */
import React from 'react';
import students from '../assets/students.json';

export default function BasicInfo({ data, id }) {
  return (
    <div className="border-2 border-neutral-600 w-full p-8 mt-12">
      <h2 className="text-2xl border-l-4 border-neutral-600 font-medium pl-2">
        基本信息
      </h2>
      <div className="w-full mt-6 divide-y divide-neutral-200">
        <div className="flex flex-col sm:flex-row w-full p-2 divide-y sm:divide-none divide-neutral-200">
          <div className="sm:w-1/2 flex gap-6 pb-2 sm:pb-0">
            <p className="text-neutral-400 w-20 flex-shrink-0">姓名（中）</p>
            <p>{data.name}</p>
          </div>
          <div className="sm:w-1/2 flex gap-6 pt-2 sm:pt-0">
            <p className="text-neutral-400 w-20 flex-shrink-0">姓名（英）</p>
            <p>{(students.filter((e) => e[0] === id)[0] || [])[2]}</p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row w-full p-2 divide-y sm:divide-none divide-neutral-200">
          <div className="sm:w-1/2 flex gap-6 pb-2 sm:pb-0">
            <p className="text-neutral-400 w-20 flex-shrink-0">学号</p>
            <p>{id}</p>
          </div>
          <div className="sm:w-1/2 flex gap-6 pt-2 sm:pt-0">
            <p className="text-neutral-400 w-20 flex-shrink-0">班级</p>
            <p>{data.class}</p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row w-full p-2 divide-y sm:divide-none divide-neutral-200">
          <div className="sm:w-1/2 flex gap-6 pb-2 sm:pb-0">
            <p className="text-neutral-400 w-20 flex-shrink-0">联课活动</p>
            <p>
              {Object.values(data.examRes)?.length
                ? Object.values(data.examRes).pop().cocurr[0]
                : ''}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
