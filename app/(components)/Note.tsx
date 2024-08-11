import { Badge } from "@radix-ui/themes";
import React from "react";
import { IoEllipsisHorizontalSharp } from "react-icons/io5";
import { Difficulty } from "../page";
import { Progress } from "../page";
interface NoteProps {
  id: string;
  title: string;
  description: string;
  deadline: Date;
  difficulty: Difficulty;
  progress: Progress;
}

const Note = ({
  id,
  title,
  deadline,
  description,
  difficulty,
  progress,
}: NoteProps) => {
  const date = new Date(deadline);

  return (
    <div className=" w-full h-40 rounded-[10px] shadow-md bg-white p-4 relative">
      <div className=" flex  justify-between items-center">
        <Badge color="brown">{difficulty}</Badge>
        <IoEllipsisHorizontalSharp className=" cursor-pointer" size={"20px"} />
      </div>
      <h1 className=" font-bold mt-3">{title}</h1>
      <p className=" text-xs text-muted-foreground text-[#787486] mb-5">
        {description}
      </p>
      <p className=" text-sm font-bold text-[#5A5A5A] inline-block">
        Deadline:
        <span className=" text-xs tracking-widest font-normal">
          {` ${date.toLocaleDateString()}`}
        </span>
      </p>
    </div>
  );
};

export default Note;
