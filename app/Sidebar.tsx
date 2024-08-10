"use client";
import React, { useState } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { Plus, Clock, BriefcaseBusiness } from "lucide-react";
import { FcExpired } from "react-icons/fc";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogFooter,
  DialogHeader,
  DialogClose,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Box, Flex } from "@radix-ui/themes";
enum Difficulty {
  high,
  low,
}
type formDetail = {
  title: string;
  description: string;
  date: Date;
  difficulty: Difficulty;
};
const Sidebar = () => {
  const [date, setDate] = useState<Date>();
  const { register, handleSubmit } = useForm<formDetail>();

  const onSubmit: SubmitHandler<formDetail> = (data) => {
    console.log(data);
  };
  return (
    <div className="lg:w-60 h-full fixed left-5 flex flex-col gap-4 ">
      <div className="h-1/5  bg-contBackground rounded-xl shadow-md p-4 flex flex-col gap-2">
        <div className=" w-10 h-10 rounded-full flex justify-center items-center bg-[#F42D20]">
          <FcExpired />
        </div>
        <h1 className="  text-sm font-bold text-[#797979]">Expired Tasks</h1>
        <p className=" text-2xl font-bold">5</p>
      </div>
      <div className="h-1/5  bg-contBackground rounded-xl shadow-md p-4 flex flex-col gap-2">
        <div className=" w-10 h-10 rounded-full flex justify-center items-center bg-[#E89271]">
          <BriefcaseBusiness color="white" size={"20px"} />
        </div>
        <h1 className="  text-sm font-bold text-[#797979]">All Active Tasks</h1>
        <p className=" text-2xl font-bold">5</p>
      </div>
      <div className="h-1/5  bg-contBackground rounded-xl shadow-md p-4 flex flex-col gap-2">
        <div className=" w-10 h-10 rounded-full flex justify-center items-center bg-[#70A1E5]">
          <Clock color="white" size={"20px"} />
        </div>
        <h1 className="  text-sm font-bold text-[#797979]">Completed Tasks</h1>
        <p className=" text-2xl font-bold">5</p>
      </div>
      <Dialog>
        <DialogTrigger>
          <Flex
            justify={"center"}
            align={"center"}
            gapX={"1"}
            p={"3"}
            className="bg-primary text-primary-foreground hover:bg-primary/90 rounded cursor-pointer"
          >
            <Plus /> Add Task
          </Flex>
        </DialogTrigger>
        <DialogContent style={{ borderRadius: "10px" }}>
          <form action="" onSubmit={handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>Add Note</DialogTitle>
            </DialogHeader>
            <DialogDescription>
              <input
                type="text"
                className=" py-2 my-2 px-4 focus:outline-none border rounded-lg w-full"
                placeholder="Title"
                required
                {...register("title")}
              />
            </DialogDescription>
            <DialogDescription>
              <textarea
                className=" py-2 px-4 my-2 focus:outline-none border rounded-lg w-full h-44"
                placeholder="Description"
                required
                {...register("description")}
              />
            </DialogDescription>
            <DialogFooter>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-[280px] justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Deadline</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                    {...register("date")}
                  />
                </PopoverContent>
              </Popover>
              <DialogClose
                className="bg-secondary text-secondary-foreground hover:bg-secondary/80 p-2 rounded"
                type="submit"
                color="blue"
              >
                Submit
              </DialogClose>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Sidebar;
