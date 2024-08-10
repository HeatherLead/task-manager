import React from "react";
import { Button, DropdownMenu } from "@radix-ui/themes";
import { Search, Filter } from "lucide-react";

const Navbar = () => {
  return (
    <div className=" bg-[#ECEDEE] flex justify-between items-center p-4 gap-3 rounded-2xl shadow-md my-5 ">
      <div className=" flex items-center relative w-44 md:w-1/5">
        <input
          className=" pl-10 pr-5 py-2 border rounded-full w-full shadow-md "
          type="text"
          placeholder="Search project"
        />
        <Search className=" absolute left-2" />
      </div>

      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Button color="gray" variant="outline" style={{ cursor: "pointer" }}>
            <Filter size={"14px"} />
            Filter
          </Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Item shortcut="⌘ E">Edit</DropdownMenu.Item>
          <DropdownMenu.Item shortcut="⌘ D">Duplicate</DropdownMenu.Item>
          <DropdownMenu.Separator />
          <DropdownMenu.Item shortcut="⌘ N">Archive</DropdownMenu.Item>

          <DropdownMenu.Sub>
            <DropdownMenu.SubTrigger>More</DropdownMenu.SubTrigger>
            <DropdownMenu.SubContent>
              <DropdownMenu.Item>Move to project…</DropdownMenu.Item>
              <DropdownMenu.Item>Move to folder…</DropdownMenu.Item>

              <DropdownMenu.Separator />
              <DropdownMenu.Item>Advanced options…</DropdownMenu.Item>
            </DropdownMenu.SubContent>
          </DropdownMenu.Sub>

          <DropdownMenu.Separator />
          <DropdownMenu.Item>Share</DropdownMenu.Item>
          <DropdownMenu.Item>Add to favorites</DropdownMenu.Item>
          <DropdownMenu.Separator />
          <DropdownMenu.Item shortcut="⌘ ⌫" color="red">
            Delete
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </div>
  );
};

export default Navbar;
