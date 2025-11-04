import { Outlet } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function MainLayout() {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-80 bg-white border-r flex flex-col">
        {/* Header */}
        <div className="p-4 border-b flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-teal-600 flex items-center justify-center text-white font-bold">
              C
            </div>
            <span className="font-semibold text-gray-800">Messages</span>
          </div>
          <Button variant="ghost" size="icon">
            ✉️
          </Button>
        </div>

        {/* Search */}
        <div className="p-3">
          <Input placeholder="Search for chats..." className="text-sm" />
        </div>

        {/* Contact List */}
        <ScrollArea className="flex-1">
          <ul className="space-y-2 p-2">
            {[
              "Cameron Williamson",
              "Bessie Cooper",
              "Kathryn Murphy",
              "Jenny Wilson",
            ].map((name) => (
              <li
                key={name}
                className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-gray-100 cursor-pointer transition"
              >
                <div className="w-10 h-10 rounded-full bg-gray-200" />
                <div>
                  <p className="font-medium text-gray-800 text-sm">{name}</p>
                  <p className="text-xs text-gray-500 truncate w-48">
                    Hey, are we meeting today?
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </ScrollArea>
      </aside>

      {/* Chat Content */}
      <section className="flex-1 flex flex-col">
        <Outlet />
      </section>
    </div>
  );
}
