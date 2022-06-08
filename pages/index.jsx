import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import student from '../students.json';

export default function Main() {
  const [filteredStudent, setFilteredStudent] = useState([]);
  const [query, setQuery] = useState('');
  let timeout = null;

  useEffect(() => {
    setFilteredStudent(query === ''
      ? []
      : student.filter((stu) => stu.join().toLowerCase().includes(query.toLowerCase())));
  }, [query]);

  return (
    <main className="w-full h-screen bg-neutral-50 flex px-8 flex-col items-center py-32 text-neutral-600">
      <p className="text-xl mb-2">新山宽柔中学</p>
      <h1 className="text-4xl">学生资料查询系统</h1>
      <p className="mt-4 mb-6 text-neutral-400 text-center">
        所有数据皆从学校官网获得，仅供参考，不得用于非法活动
      </p>
      <div className="w-full lg:w-1/2 h-full min-h-0 flex flex-col">
        <input
          type="text"
          placeholder="输入中文姓名、英文姓名、班级或学号进行查询"
          className="border-2 border-neutral-600 bg-transparent p-4 w-full focus:outline-none placeholder-neutral-300"
          onChange={(event) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
              setQuery(event.target.value);
            }, 500);
          }}
        />
        {filteredStudent.length ? (
          <div className="h-full overflow-y-auto overflow-x-hidden w-full divide-y divide-neutral-300">
            {filteredStudent.map((person) => (
              <Link
                href="/student/[id]"
                as={`/student/${person[0]}`}
                key={person[0]}
              >
                <div
                  value={person}
                  className="p-4 flex items-center gap-4 justify-between hover:bg-neutral-100 cursor-pointer"
                >
                  <div className="flex flex-col sm:flex-row">
                    <span className="w-24">{person[0]}</span>
                    <span className="mr-2">{person[1]}</span>
                    <span>{person[2]}</span>
                  </div>
                  <span className="whitespace-nowrap">{person[3]}</span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="h-full flex items-center justify-center">
            {query ? (
              <span className="text-center text-neutral-300">
                没有搜索到相关信息
              </span>
            ) : (
              <span className="text-center text-neutral-300">请输入查询条件</span>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
