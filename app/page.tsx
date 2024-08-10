import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Note from "./(components)/Note";

export default function Home() {
  return (
    <div className=" w-screen h-screen overflow-hidden p-4 ">
      <Navbar />
      <Sidebar />
      <div className=" w-full lg:ml-72 h-[75vh] flex gap-7">
        <div className=" w-1/4  bg-contBackground rounded-xl shadow-md p-4 flex flex-col gap-2">
          <div className=" flex justify-center items-center gap-3">
            <div className=" w-2 aspect-square rounded-full bg-[#5030E5]"></div>
            <h1 className=" text-center font-semibold">To Do</h1>
            <div className=" w-4 aspect-square rounded-full  bg-[#E0E0E0] text-[10px] text-center  ">
              3
            </div>
          </div>
          <hr className=" h-1 rounded-full mb-2" color="#5030E5" />
          <Note />
        </div>
        <div className=" w-1/4  bg-contBackground rounded-xl shadow-md p-4 flex flex-col gap-2"></div>
        <div className=" w-1/4  bg-contBackground rounded-xl shadow-md p-4 flex flex-col gap-2"></div>
      </div>
    </div>
  );
}
