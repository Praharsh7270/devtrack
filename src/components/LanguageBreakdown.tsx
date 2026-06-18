"use client";

import { useEffect, useState } from "react";
import { useAccount } from "@/components/AccountContext";
<<<<<<< HEAD
=======
import { useDashboardWidgetA11y } from "@/components/dashboard/DashboardWidgetA11yContext";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  type TooltipProps,
} from "recharts";
>>>>>>> 9af3a534735a3ac3d412933eec41fa59c7cc73e4

interface Language {
  name: string;
  bytes: number;
  percentage: number;
}

const LANG_COLORS: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f7df1e",
  Python: "#3572A5",
  Go: "#00ADD8",
  Rust: "#dea584",
  Java: "#b07219",
  CSS: "#563d7c",
  HTML: "#e34c26",
  Ruby: "#701516",
  Shell: "#89e051",
};

const FALLBACK_COLOR = "#6b7280";

function getColor(name: string): string {
  return LANG_COLORS[name] ?? FALLBACK_COLOR;
}

function LanguageDot({ color, label }: { color: string; label: string }) {
  return (
    <svg
      width="0.75rem"
      height="0.75rem"
      viewBox="0 0 8 8"
      className="shrink-0"
      role="img"
      aria-label={label}
    >
      <circle cx="4" cy="4" r="4" fill={color} />
    </svg>
  );
}

export default function LanguageBreakdown() {
  const { selectedAccount } = useAccount();
  const [languages, setLanguages] = useState<Language[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { setSummary, setIsUpdating } = useDashboardWidgetA11y("language-breakdown");

  useEffect(() => {
    setIsUpdating(loading);
  }, [loading, setIsUpdating]);

  useEffect(() => {
    if (languages.length === 0) {
      setSummary(null);
      return;
    }
    const top = languages[0];
    setSummary(
      `Top language: ${top.name}, ${top.percentage}%. ${languages.length} language${languages.length === 1 ? "" : "s"} tracked.`,
    );
  }, [languages, setSummary]);

  useEffect(() => {
    setLoading(true);
    setError(null);
    const url = selectedAccount !== null
      ? `/api/metrics/languages?accountId=${encodeURIComponent(selectedAccount)}`
      : "/api/metrics/languages";
    fetch(url)
      .then((r) => {
        if (!r.ok) {
          throw new Error("API error");
        }

        return r.json();
      })
      .then((d: { languages: Language[] }) => setLanguages(d.languages ?? []))
      .catch(() => {
        setError("Failed to load language statistics. Please try again later.");
      })
      .finally(() => setLoading(false));
  }, [selectedAccount]);

  const totalPercentage = languages.reduce((sum, lang) => sum + lang.percentage, 0);
  const roundedTotal = Math.round(totalPercentage * 10) / 10;
  
  const displayLanguages = [...languages];
  if (roundedTotal < 100 && languages.length > 0) {
    displayLanguages.push({
      name: "Other",
      bytes: 0,
      percentage: Math.round((100 - roundedTotal) * 10) / 10,
    });
  }

  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1">
      <h2 className="text-lg font-semibold text-[var(--card-foreground)] mb-4">
        Language Breakdown
      </h2>

      {loading ? (
        <div
          role="status"
          aria-live="polite"
          aria-busy="true"
          className="space-y-3"
        >
          <span className="sr-only">Loading language breakdown</span>
          <div
            aria-hidden="true"
            className="h-6 rounded-full skeleton-shimmer"
          />
          <div aria-hidden="true" className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-5 rounded skeleton-shimmer" />
            ))}
          </div>
        </div>
      ) : error ? (
        <p className="rounded-lg border border-[var(--destructive)]/20 bg-[var(--destructive)]/10 p-4 text-sm text-[var(--destructive)]">
          {error}
        </p>
      ) : languages.length === 0 ? (
        <p className="text-sm text-[var(--muted-foreground)]">
          No language data available.
        </p>
      ) : (
        <>
          {/* Stacked bar */}
          <div className="flex h-6 w-full overflow-hidden rounded-full bg-[var(--control)]">
            {displayLanguages.map((lang) => (
              <div
                key={lang.name}
                className="h-full transition-all duration-500 first:rounded-l-full last:rounded-r-full"
                style={{
                  width: `${lang.percentage}%`,
                  backgroundColor: lang.name === "Other" ? "var(--control)" : getColor(lang.name),
                  minWidth: lang.percentage > 0 ? "4px" : "0px",
                }}
                title={`${lang.name}: ${lang.percentage}%`}
              />
            ))}
          </div>

          {/* Legend */}
          <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
            {displayLanguages.map((lang) => (
              <div
                key={lang.name}
                className="flex min-w-0 max-w-full basis-full items-center gap-2 text-sm sm:basis-[calc(50%-0.5rem)]"
              >
<<<<<<< HEAD
                <LanguageDot 
                  color={lang.name === "Other" ? "var(--control)" : getColor(lang.name)}
                  label={`${lang.name}: ${lang.percentage}%`}
=======
                <span
                  className="shrink-0 rounded-full"
                  style={{
                    width: "0.5rem",
                    height: "0.5rem",
                    backgroundColor: getColor(lang.name),
                  }}
                  role="img"
                  aria-label={lang.name}
>>>>>>> 9af3a534735a3ac3d412933eec41fa59c7cc73e4
                />
                <span className="min-w-0 flex-1 truncate text-[var(--card-foreground)]">
                  {lang.name}
                </span>
                <span className="ml-auto shrink-0 text-[var(--muted-foreground)]">
                  {lang.percentage}%
                </span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
