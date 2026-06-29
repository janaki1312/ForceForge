import { Outlet, createFileRoute } from "@tanstack/react-router";
import { AppSidebar } from "@/components/app/sidebar";
import { Topbar } from "@/components/app/topbar";
import { QuickCapture } from "@/components/app/quick-capture";

export const Route = createFileRoute("/_app")({
  component: AppLayout,
});

function AppLayout() {
  return (
    <div className="flex min-h-screen w-full bg-background text-foreground">
      <AppSidebar />
      <div className="relative flex min-h-screen flex-1 flex-col">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-[420px] opacity-60"
          style={{ background: "var(--gradient-glow)" }}
        />
        <Topbar />
        <main className="relative flex-1 px-6 pb-32 pt-8 md:px-10">
          <Outlet />
        </main>
        <QuickCapture />
      </div>
    </div>
  );
}
