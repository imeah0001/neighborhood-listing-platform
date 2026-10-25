import Image from "next/image";
import type { Sponsor } from "../types";

interface SponsorBannerProps {
  sponsor: Sponsor;
}

export default function SponsorBanner({ sponsor }: SponsorBannerProps) {
  return (
    <aside
      aria-label={`Sponsored content from ${sponsor.name}`}
      className="my-8 flex flex-col gap-5 rounded-xl border border-amber-200 bg-amber-50 p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative h-16 w-28 shrink-0 overflow-hidden rounded-lg bg-white">
          <Image
            src={sponsor.imageUrl}
            alt={sponsor.altText}
            fill
            unoptimized
            sizes="112px"
            className="object-contain"
          />
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-amber-900">
            Sponsored
          </p>

          <h2 className="mt-1 text-lg font-semibold text-slate-900">
            {sponsor.name}
          </h2>

          <p className="mt-1 text-sm text-slate-700">
            {sponsor.headline}
          </p>
        </div>
      </div>

      <a
        href={sponsor.websiteUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Visit ${sponsor.name} website (opens in a new tab)`}
        className="inline-flex min-h-11 shrink-0 items-center justify-center rounded-lg bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-700"
      >
        Visit {sponsor.name}
      </a>
    </aside>
  );
}
