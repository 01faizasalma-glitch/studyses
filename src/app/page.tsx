import {
  Card,
  CardContent,
  CardDescription,
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
  { value: "kalender", label: "Kalender" },
  { value: "todo", label: "To-Do" },
  { value: "timer", label: "Timer" },
  { value: "stopwatch", label: "Stopwatch" },
] as const;

export default function Home() {
  return (
    <main className="min-h-screen px-4 py-8 sm:px-6 sm:py-12">
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-8 sm:gap-10">
        <header className="space-y-3">
          <p className="text-sm font-semibold tracking-[0.2em] text-muted-foreground">
            Studyses
          </p>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Ruang produktivitas Anda
          </h1>
          <p className="max-w-2xl text-base leading-7 text-muted-foreground">
            Kalender, daftar tugas, dan alat fokus dalam satu tempat.
          </p>
        </header>

        <Tabs defaultValue="kalender" className="w-full">
          <TabsList
            aria-label="Pilih alat produktivitas"
            className="grid h-auto w-full grid-cols-2 gap-1 p-1 sm:grid-cols-4"
          >
            {tools.map((tool) => (
              <TabsTrigger
                key={tool.value}
                value={tool.value}
                className="h-11 px-2 text-sm sm:px-4"
              >
                {tool.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {tools.map((tool) => (
            <TabsContent key={tool.value} value={tool.value} className="mt-5">
              <Card>
                <CardHeader>
                  <CardTitle>{tool.label}</CardTitle>
                  <CardDescription>
                    Fitur {tool.label.toLowerCase()} akan tersedia di tahap
                    berikutnya.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="rounded-lg bg-muted px-4 py-8 text-center text-sm text-muted-foreground">
                    Segera hadir
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </main>
  );
}
