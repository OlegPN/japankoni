"use client";
import { useRouter } from "next/navigation";
import ScenePlayer from "@/components/ScenePlayer";
import { findScene } from "@/lib/scenes";

export default function SceneClient({ sceneId }: { sceneId: string }) {
  const router = useRouter();
  const scene = findScene(sceneId);

  if (!scene) {
    return <div className="h-full flex items-center justify-center text-muted text-sm">Сцена не найдена</div>;
  }

  return <ScenePlayer scene={scene} onExit={() => router.push("/")} />;
}
