// Server component — экспортирует generateStaticParams для статического экспорта (Capacitor).
// Рендерит SceneClient внутри PhoneFrame.
import PhoneFrame from "@/components/PhoneFrame";
import { SCENES } from "@/lib/scenes";
import SceneClient from "./SceneClient";

export function generateStaticParams() {
  return SCENES.map(s => ({ id: s.id }));
}

export default async function ScenePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <PhoneFrame>
      <SceneClient sceneId={id} />
    </PhoneFrame>
  );
}
