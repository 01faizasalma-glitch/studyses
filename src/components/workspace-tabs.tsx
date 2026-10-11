"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

const tools = [
  { value: "calendar", label: "Kalender" },
  { value: "todo", label: "To-Do" },
  { value: "timer", label: "Timer" },
  { value: "stopwatch", label: "Stopwatch" },
] as const;

export function WorkspaceTabs() {
  return (
    <Tabs defaultValue="calendar" className="w-full">
      <TabsList
        aria-label="Pilih alat produktivitas"
        className="grid h-auto w-full grid-cols-2 gap-1 rounded-xl p-1 sm:grid-cols-4"
      >
        {tools.map((tool) => (
          <TabsTrigger
            key={tool.value}
            value={tool.value}
            className="h-10 px-3"
          >
            {tool.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {tools.map((tool) => (
        <TabsContent key={tool.value} value={tool.value} className="mt-4">
          <Card className="min-h-64">
            <CardHeader>
              <CardTitle className="text-xl">{tool.label}</CardTitle>
            </CardHeader>
            <CardContent className="pt-8">
              <p className="py-10 text-center text-muted-foreground">
                Segera hadir
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      ))}
    </Tabs>
  );
}
