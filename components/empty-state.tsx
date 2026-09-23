import Image from "next/image";
import type { ReactNode } from "react";

export function EmptyState({
  title,
  body,
  action,
}: {
  title: string;
  body: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center rounded-2xl border border-dashed border-border bg-card px-6 py-10 text-center">
      <Image
        src="/brand/boxi-face.webp"
        alt="Boxi, the sandbox pet"
        width={512}
        height={512}
        className="size-24 rounded-2xl"
      />
      <p className="mt-4 text-base font-medium">{title}</p>
      <p className="mt-1 max-w-sm text-sm text-muted-foreground">{body}</p>
      {action ? <div className="mt-4">{action}</div> : null}
    </div>
  );
}

export function Celebration({ id, detail }: { id: string; detail?: string }) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-mint/40 bg-mint/10 p-4">
      <span className="spark left-8 top-5" />
      <span className="spark left-20 top-8 [animation-delay:180ms]" />
      <span className="spark right-10 top-4 [animation-delay:320ms]" />
      <span className="spark right-24 top-9 [animation-delay:80ms]" />
      <div className="relative flex items-center gap-4">
        <Image
          src="/brand/boxi-face.webp"
          alt="Boxi celebrating a shipped sandbox"
          width={512}
          height={512}
          className="size-16 rounded-xl"
        />
        <div>
          <p className="text-lg font-medium text-mint">Shipped.</p>
          <p className="font-mono text-sm text-ice">{id}</p>
          {detail ? <p className="mt-1 text-sm text-muted-foreground">{detail}</p> : null}
        </div>
      </div>
    </div>
  );
}
