"use client";
import Navbar from "./Navbar";
import Note from "./(components)/Note";
import axios from "axios";
import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
export enum Progress {
  active = "active",
  inProcess = "inProcess",
  completed = "completed",
  expired = "expired",
}

export enum Difficulty {
  low = "low",
  high = "high",
}

export interface Note {
  id: string;
  title: string;
  description: string;
  deadline: Date;
  difficulty: Difficulty;
  progress: Progress;
}

export default function Home() {
  const [notes, setNotes] = useState<Note[] | null>(null);
  const [activeNotes, setActiveNotes] = useState<Note[] | null>(null);
  const [inProcessNotes, setInProcessNotes] = useState<Note[] | null>(null);
  const [completedNotes, setCompletedNotes] = useState<Note[] | null>(null);

  useEffect(() => {
    const getNotes = async () => {
      try {
        const response = await axios.get("/api/notes");
        if (response.data) {
          setNotes(response.data);
        }
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    };
    getNotes();
  }, []);

  useEffect(() => {
    if (notes) {
      setActiveNotes(notes.filter((note) => note.progress === Progress.active));
      setInProcessNotes(
        notes.filter((note) => note.progress === Progress.inProcess)
      );
      setCompletedNotes(
        notes.filter((note) => note.progress === Progress.completed)
      );
    }
  }, [notes]);

  const deleteNote = (id: string) => {
    setNotes((prevNotes) => prevNotes!.filter((note) => note.id !== id));
  };

  return (
    <div className="w-screen h-screen overflow-hidden p-4">
      <Navbar />
      <Sidebar />
      <div className="w-full lg:ml-72 h-[75vh] flex gap-7">
        <div className="w-1/4 bg-contBackground rounded-xl shadow-md p-4 flex flex-col gap-2">
          <div className="flex justify-center items-center gap-3">
            <div className="w-2 aspect-square rounded-full bg-[#5030E5]"></div>
            <h1 className="text-center font-semibold">To Do</h1>
            <div className="w-4 aspect-square rounded-full bg-[#E0E0E0] text-[10px] text-center">
              {activeNotes ? activeNotes.length : 0}
            </div>
          </div>
          <hr className="h-1 rounded-full mb-2" color="#5030E5" />
          <ScrollArea>
            {activeNotes &&
              activeNotes.map((note) => (
                <Note
                  key={note.id}
                  id={note.id}
                  title={note.title}
                  description={note.description}
                  deadline={note.deadline}
                  difficulty={note.difficulty}
                  progress={note.progress}
                  onDelete={() => {
                    deleteNote;
                  }}
                />
              ))}
          </ScrollArea>
        </div>
        <div className="w-1/4 bg-contBackground rounded-xl shadow-md p-4 flex flex-col gap-2">
          <div className="flex justify-center items-center gap-3">
            <div className="w-2 aspect-square rounded-full bg-[#FFA500]"></div>
            <h1 className="text-center font-semibold">In Process</h1>
            <div className="w-4 aspect-square rounded-full bg-[#E0E0E0] text-[10px] text-center">
              {inProcessNotes ? inProcessNotes.length : 0}
            </div>
          </div>
          <hr className="h-1 rounded-full mb-2" color="#FFA500" />
          <ScrollArea>
            {inProcessNotes &&
              inProcessNotes.map((note) => (
                <Note
                  key={note.id}
                  id={note.id}
                  title={note.title}
                  description={note.description}
                  deadline={note.deadline}
                  difficulty={note.difficulty}
                  progress={note.progress}
                  onDelete={() => {
                    deleteNote;
                  }}
                />
              ))}
          </ScrollArea>
        </div>
        <div className="w-1/4 bg-contBackground rounded-xl shadow-md p-4 flex flex-col gap-2">
          <div className="flex justify-center items-center gap-3">
            <div className="w-2 aspect-square rounded-full bg-[#8BC48A]"></div>
            <h1 className="text-center font-semibold">Completed</h1>
            <div className="w-4 aspect-square rounded-full bg-[#E0E0E0] text-[10px] text-center">
              {completedNotes ? completedNotes.length : 0}
            </div>
          </div>
          <hr className="h-1 rounded-full mb-2" color="#8BC48A" />
          <ScrollArea>
            {completedNotes &&
              completedNotes.map((note) => (
                <Note
                  key={note.id}
                  id={note.id}
                  title={note.title}
                  description={note.description}
                  deadline={note.deadline}
                  difficulty={note.difficulty}
                  progress={note.progress}
                  onDelete={() => {
                    deleteNote;
                  }}
                />
              ))}
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}
