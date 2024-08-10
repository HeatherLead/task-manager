import { Badge } from "@radix-ui/themes";
import React from "react";
import { IoEllipsisHorizontalSharp } from "react-icons/io5";

const Note = () => {
  return (
    <div className=" w-full h-40 rounded-[10px] shadow-md bg-white p-4 relative">
      <div className=" flex  justify-between items-center">
        <Badge color="brown">High</Badge>
        <IoEllipsisHorizontalSharp className=" cursor-pointer" size={"20px"} />
      </div>
      <h1 className=" font-bold mt-3">BrainStroming</h1>
      <p className=" text-xs text-muted-foreground text-[#787486] mb-5">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus,
        corrupti!
      </p>
      <p className=" text-sm font-bold text-[#5A5A5A] inline-block">
        Deadline:
        <span className=" text-xs tracking-widest font-normal"> 7/4/3</span>
      </p>
    </div>
  );
};

export default Note;
