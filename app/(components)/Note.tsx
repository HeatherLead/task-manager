"use client";
import { Badge } from "@radix-ui/themes";
import React from "react";
import { IoEllipsisHorizontalSharp } from "react-icons/io5";
import { Difficulty, Progress } from "../page";
import { DropdownMenu } from "@radix-ui/themes";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Calendar as CalendarIcon } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogTrigger,
  AlertDialogTitle,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
} from "@/components/ui/alert-dialog";
import axios from "axios";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

interface NoteProps {
  id: string;
  title: string;
  description: string;
  deadline: Date;
  difficulty: Difficulty;
  progress: Progress;
}

type FormDetail = {
  title: string;
  description: string;
  deadline?: Date;
  difficulty: Difficulty;
  progress: Progress;
};

const Note = ({
  id,
  title,
  deadline,
  description,
  difficulty,
  progress,
}: NoteProps) => {
  const date = new Date(deadline);

  const handleDelete = async () => {
    try {
      const response = await axios.delete("/api/notes/note", {
        data: { id },
      });
      if (response.status === 200) {
        console.log("Note deleted successfully");
      }
    } catch (error) {
      console.error("Error deleting note:", error);
    } finally {
      window.location.reload();
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<FormDetail>({
    defaultValues: {
      difficulty: Difficulty.low,
    },
  });

  const onSubmit: SubmitHandler<FormDetail> = async (data) => {
    try {
      const response = await axios.patch("/api/notes/note", {
        data,
        id,
      });
      console.log("Note updated successfully:", response.data);
    } catch (error) {
      console.error("Error updating note:", error);
    } finally {
      window.location.reload();
    }
  };

  return (
    <div className="w-full h-40 rounded-[10px] shadow-md bg-white p-4 relative my-2">
      <div className="flex justify-between items-center">
        <Badge color="brown">{difficulty}</Badge>
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            <h1>
              <IoEllipsisHorizontalSharp
                className="cursor-pointer"
                size={"20px"}
              />
            </h1>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content>
            <DropdownMenu.Item asChild>
              <AlertDialog>
                <AlertDialogTrigger className="text-sm pl-3 py-2 text-left hover:bg-blue-600 hover:text-white rounded pr-3">
                  Delete Note
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Do you want to delete the note?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This will delete the note. This action cant be reverted.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDelete}>
                      Confirm
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </DropdownMenu.Item>
            <DropdownMenu.Item asChild>
              <Dialog>
                <DialogTrigger className="text-sm pl-3 py-2 text-left hover:bg-blue-600 hover:text-white rounded pr-3">
                  Edit
                </DialogTrigger>
                <DialogContent>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <DialogHeader>
                      <DialogTitle>Edit Note</DialogTitle>
                    </DialogHeader>
                    <DialogDescription>
                      <input
                        type="text"
                        className="py-2 my-2 px-4 focus:outline-none border rounded-lg w-full"
                        placeholder="Title"
                        {...register("title")}
                      />
                    </DialogDescription>
                    <DialogDescription>
                      <textarea
                        className="py-2 px-4 my-2 focus:outline-none border rounded-lg w-full h-44"
                        placeholder="Description"
                        {...register("description")}
                      />
                      <Controller
                        control={control}
                        name="progress"
                        render={({ field: { onChange, value } }) => (
                          <Select value={value} onValueChange={onChange}>
                            <SelectTrigger className="w-[140px]">
                              <SelectValue placeholder="Progress" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value={Progress.active}>
                                Active
                              </SelectItem>
                              <SelectItem value={Progress.inProcess}>
                                In Process
                              </SelectItem>
                              <SelectItem value={Progress.completed}>
                                Completed
                              </SelectItem>
                              <SelectItem value={Progress.expired}>
                                Expired
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        )}
                      />
                      <h1 className="py-2">Difficulty</h1>
                      <Controller
                        control={control}
                        name="difficulty"
                        render={({ field: { onChange, value } }) => (
                          <RadioGroup value={value} onValueChange={onChange}>
                            <div className="flex gap-5 mb-3">
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem
                                  value={Difficulty.low}
                                  id="low"
                                />
                                <Label htmlFor="low">Low</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem
                                  value={Difficulty.high}
                                  id="high"
                                />
                                <Label htmlFor="high">High</Label>
                              </div>
                            </div>
                          </RadioGroup>
                        )}
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
                            <span>Deadline</span>
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
                                  onChange(selectedDate);
                                }}
                                initialFocus
                              />
                            )}
                          />
                        </PopoverContent>
                      </Popover>
                      <DialogClose
                        className="bg-secondary text-secondary-foreground hover:bg-secondary/80 p-2 rounded"
                        type="submit"
                      >
                        Submit
                      </DialogClose>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </div>
      <h1 className="font-bold mt-3">{title}</h1>
      <p className="text-xs text-muted-foreground text-[#787486] mb-5">
        {description}
      </p>
      <p className="text-sm font-bold text-[#5A5A5A] inline-block">
        Deadline:
        <span className="text-xs tracking-widest font-normal">{` ${date.toLocaleDateString()}`}</span>
      </p>
    </div>
  );
};

export default Note;
