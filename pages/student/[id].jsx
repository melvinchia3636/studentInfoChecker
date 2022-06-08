/* eslint-disable react/prop-types */
import { Icon } from '@iconify/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import BasicInfo from '../../components/BasicInfo';
import CardDetailsRecord from '../../components/CardDetailsRecord';
import CardRecord from '../../components/CardRecord';
import ExamRes from '../../components/ExamRes';
import PaymentRecord from '../../components/PaymentRecord';
import students from '../../assets/students.json';

function StudentData() {
  const router = useRouter();
  const { id } = router.query;

  const [data, setData] = useState();

  useEffect(() => {
    if (id) {
      fetch(`/api/fetch/${id}`)
        .then((res) => res.json())
        .then((res) => setData(res));
    }
  }, [id]);

  return (
    <div className="bg-neutral-50 text-neutral-600 w-full min-h-screen flex flex-col p-6 sm:p-12">
      <Link href="/">
        <div className="flex items-center gap-1 cursor-pointer">
          <Icon icon="uil:arrow-left" className="w-6 h-6" />
          <span className="font-medium">返回首页</span>
        </div>
      </Link>
      <div className="w-full h-full flex-1 flex flex-col items-center justify-center">
        {data ? (
          <div className="w-full h-full mt-8 flex flex-col items-center">
            <p className="mb-2 font-medium">{data.class}</p>
            <h1 className="text-4xl">
              {data.name}
              {' '}
              {(students.filter((e) => e[0] === id)[0] || [])[2]}
            </h1>
            <BasicInfo id={id} data={data} />
            <PaymentRecord data={data} />
            <CardRecord data={data} />
            <CardDetailsRecord data={data} />
            <ExamRes data={data} />
          </div>
        ) : (
          <p className="text-neutral-300">获取资料中，请稍等...</p>
        )}
      </div>
    </div>
  );
}

export default StudentData;
