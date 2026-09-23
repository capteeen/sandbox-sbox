"use client";

import { EmptyState } from "@/components/empty-state";
import { Button } from "@/components/ui/button";

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <EmptyState
      title="The queue hiccuped."
      body="Try that view again."
      action={
        <Button className="h-10 px-4" onClick={reset}>
          Try again
        </Button>
      }
    />
  );
}
