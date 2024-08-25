import React from "react";

interface SkillBarProps {
  skill: string;
  level: number;
}

const SkillBar: React.FC<SkillBarProps> = ({ skill, level }) => {
  return (
    <div className="mb-4">
      <div className="flex justify-between mb-1">
        <span className="text-space-white">{skill}</span>
        <span className="text-space-pink">{level}%</span>
      </div>
      <div className="w-full bg-space-blue rounded">
        <div
          className="bg-space-purple h-2 rounded"
          style={{ width: `${level}%` }}
        ></div>
      </div>
    </div>
  );
};

export default SkillBar;
