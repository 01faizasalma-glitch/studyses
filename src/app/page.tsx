import { WorkspaceTabs } from "@/components/workspace-tabs";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="border-b bg-card/80">
        <div className="mx-auto flex w-full max-w-5xl items-center gap-3 px-4 py-4 sm:px-8">
          <div
            aria-hidden="true"
            className="grid size-10 shrink-0 place-items-center rounded-xl bg-primary text-lg font-semibold text-primary-foreground"
          >
            S
          </div>
          <div>
            <p className="text-lg font-semibold tracking-tight">Studyses</p>
            <p className="text-sm text-muted-foreground">Ruang produktivitasmu</p>
          </div>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col px-4 py-8 sm:px-8 sm:py-12">
        <div className="mb-6 space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Pilih alat produktivitas yang ingin kamu gunakan.
          </h1>
        </div>
        <WorkspaceTabs />
      </main>
    </div>
  );
}
