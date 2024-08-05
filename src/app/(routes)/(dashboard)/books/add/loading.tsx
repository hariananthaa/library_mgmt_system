/**
 * Loading component that displays a skeleton for this section.
 * Used to provide a visual indication of loading while data is being fetched.
 *
 * @returns The JSX element representing the loading skeleton.
 */
import { LatestbooksSkeleton } from "@/app/common/skeletons";

export default function Loading() {
  return <LatestbooksSkeleton />;
}
