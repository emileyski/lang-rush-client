import React from "react";

const WordOverview = () => {
  return (
    <div
      className="w-[400px]
    rounded-[10px] bg-[#CEE6FE]"
    >
      <div className="h-[65px] rounded-tl-[10px] rounded-tr-[10px] bg-[#2C3659] py-[22px] pl-[20px]">
        <span className="font-sourceSansPro text-[20px] font-[600] text-[#fff]">
          Test word
        </span>
      </div>
      <div className="flex h-[360px] flex-col overflow-y-scroll p-[20px]">
        <span className="font-sourceSansPro text-[22px] text-[#333C66]">
          UA: Тестове слово
        </span>
        <span className="mt-[20px] font-sourceSansPro text-[22px] font-[600] text-[#333C66]">
          Definition:
        </span>
        <span className="mt-[10px] font-sourceSansPro text-[16px] text-[#333C66]">
          A piece of electronic equipment that makes it possible for you to
          speak to someone in another place who has similar equipment.
        </span>
        <span className="mt-[20px] font-sourceSansPro text-[22px] font-[600] text-[#333C66]">
          Context:
        </span>
        <span className="mt-[10px] font-sourceSansPro text-[16px] text-[#333C66]">
          She spends hours and hours on the telephone. She hurried to answer the
          telephone. I like to have a telephone at my bedside.
        </span>
      </div>
    </div>
  );
};

export default WordOverview;
