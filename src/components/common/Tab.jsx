import React from 'react'

const Tab = ({ tabData, field, setField }) => {
  return (
    <div
      style={{
        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
      }}
      className="flex bg-slate-800 p-1 gap-x-1 my-6 rounded-full max-w-max"
    >
      {tabData.map((tab) => (
        <div
          key={tab.id}
          onClick={() => setField(tab.type)}
          className={`${
            field === tab.type
              ? "bg-slate-950 text-white"
              : "bg-transparent text-gray-400"
          } py-2 px-5 rounded-full transition-all duration-200`}
        >
          {tab?.tabName}
        </div>
      ))}
    </div>
  );
};

export default Tab
