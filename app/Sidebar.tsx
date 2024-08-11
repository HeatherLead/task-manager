"use client";
import React, { useState } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { Plus, Clock, BriefcaseBusiness } from "lucide-react";
import { FcExpired } from "react-icons/fc";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
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
import { Label } from "@/components/ui/label";
import { Difficulty, Note, Progress } from "./page";
type formDetail = {
  title: string;
  description: string;
  deadline?: Date;
  difficulty: Difficulty;
};
const Sidebar = () => {
  const [date, setDate] = useState<Date>();
  const [expiredNumber, setExpiredNumber] = useState(0);
  const [completedNumber, setCompletedNumber] = useState(0);
  const [activeNumber, setActiveNumber] = useState(0);
  const {
    register,
    handleSubmit,
    formState: { errors, isLoading },
    control,
    setValue,
  } = useForm<formDetail>({
    defaultValues: {
      difficulty: Difficulty.low,
    },
  });

  const fetchTasks = async () => {
    try {
      const response = await axios.get("/api/notes");
      const data: Note[] = response.data;
      if (data) {
        const active = data.filter(
          (value) => value.progress === Progress.active || Progress.inProcess
        );
        const completed = data.filter(
          (value) => value.progress === Progress.completed
        );
        const expired = data.filter(
          (value) => value.progress === Progress.expired
        );

        setActiveNumber(active.length);
        setCompletedNumber(completed.length);
        setExpiredNumber(expired.length);
      }
    } catch (error) {}
  };
  fetchTasks();
  const onSubmit: SubmitHandler<formDetail> = async (data) => {
    try {
      const response = await axios.post("/api/notes/note", data);
    } catch (error) {
      console.error("Error creating note:", error);
    } finally {
      window.location.reload();
    }
  };

  return (
    <div className="lg:w-60 h-full fixed left-5 flex flex-col gap-4 ">
      <div className="h-1/5  bg-contBackground rounded-xl shadow-md p-4 flex flex-col gap-2">
        <div className=" w-10 h-10 rounded-full flex justify-center items-center bg-[#F42D20]">
          <FcExpired />
        </div>
        <h1 className="  text-sm font-bold text-[#797979]">Expired Tasks</h1>
        <p className=" text-2xl font-bold">{expiredNumber}</p>
      </div>
      <div className="h-1/5  bg-contBackground rounded-xl shadow-md p-4 flex flex-col gap-2">
        <div className=" w-10 h-10 rounded-full flex justify-center items-center bg-[#E89271]">
          <BriefcaseBusiness color="white" size={"20px"} />
        </div>
        <h1 className="  text-sm font-bold text-[#797979]">All Active Tasks</h1>
        <p className=" text-2xl font-bold">{activeNumber}</p>
      </div>
      <div className="h-1/5  bg-contBackground rounded-xl shadow-md p-4 flex flex-col gap-2">
        <div className=" w-10 h-10 rounded-full flex justify-center items-center bg-[#70A1E5]">
          <Clock color="white" size={"20px"} />
        </div>
        <h1 className="  text-sm font-bold text-[#797979]">Completed Tasks</h1>
        <p className=" text-2xl font-bold">{completedNumber}</p>
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
                {...register("title", { required: "Title is required" })}
              />
              {errors.title && (
                <div className=" text-xs text-red-500">
                  {errors.title.message}
                </div>
              )}
            </DialogDescription>
            <DialogDescription>
              <textarea
                className=" py-2 px-4 my-2 focus:outline-none border rounded-lg w-full h-44"
                placeholder="Description"
                {...register("description", {
                  required: "Description is required",
                })}
              />
              <h1 className=" py-2">Difficulty</h1>
              <Controller
                control={control}
                name="difficulty"
                render={({ field: { onChange, value } }) => (
                  <RadioGroup value={value} onValueChange={onChange}>
                    <div className="flex gap-5 mb-3">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value={Difficulty.low} id="low" />
                        <Label htmlFor="low">Low</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value={Difficulty.high} id="high" />
                        <Label htmlFor="high">High</Label>
                      </div>
                    </div>
                  </RadioGroup>
                )}
              />
              {errors.description && (
                <div className=" mb-2 text-xs text-red-500">
                  {errors.description.message}
                </div>
              )}
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
                  <Controller
                    control={control}
                    name="deadline"
                    render={({ field: { onChange, value } }) => (
                      <Calendar
                        mode="single"
                        selected={value}
                        onSelect={(selectedDate) => {
                          setDate(selectedDate);
                          onChange(selectedDate);
                        }}
                        initialFocus
                      />
                    )}
                  />
                </PopoverContent>
              </Popover>
              <DialogClose
                disabled={errors.title || errors.description ? true : false}
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
