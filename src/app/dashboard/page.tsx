<<<<<<< HEAD
﻿import TodayFocusHero from "@/components/TodayFocusHero";
=======
﻿import dynamic from "next/dynamic";
import LazyWidget from "@/components/LazyWidget";
import DiscussionsWidget from "@/components/DiscussionsWidget";
import CommunityMetrics from "@/components/CommunityMetrics";
import GoalTracker from "@/components/GoalTracker";
import TodayFocusHero from "@/components/TodayFocusHero";
>>>>>>> 9af3a534735a3ac3d412933eec41fa59c7cc73e4
import DashboardHeader from "@/components/DashboardHeader";
import ExportButton from "@/components/ExportButton";
import Link from "next/link";
import PersonalRecords from "@/components/PersonalRecords";
import LocalCodingTime from "@/components/LocalCodingTime";
import CodingTimeWidget from "@/components/CodingTimeWidget";
import RecentActivity from "@/components/RecentActivity";
import FriendComparison from "@/components/FriendComparison";
import { ChevronRight } from "lucide-react";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import DashboardSSEProvider from "@/components/DashboardSSEProvider";
import StreakTracker from "@/components/StreakTracker";
import RepoAnalyticsExplorer from "@/components/repo-analytics/RepoAnalyticsExplorer";
import PinnedReposWidget from "@/components/PinnedReposWidget";
import TopRepos from "@/components/TopRepos";
import InactiveRepositoriesCard from "@/components/InactiveRepositoriesCard";
import StreakAtRiskBanner from "@/components/StreakAtRiskBanner";
import ThrottleBanner from "@/components/ThrottleBanner";
import CustomizableDashboard from "@/components/dashboard/CustomizableDashboard";

const SkeletonCard = () => (
  <div
    role="status"
    aria-busy="true"
    aria-live="polite"
    className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6 shadow-sm"
  >
    <div className="h-6 w-48 bg-[var(--card-muted)] rounded mb-4 animate-pulse" />
    <div className="h-40 bg-[var(--card-muted)] rounded animate-pulse" />
  </div>
);

const ContributionGraphSkeleton = () => (
  <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6 shadow-sm">
    <h2 className="text-lg font-semibold text-[var(--foreground)]">Your Commits</h2>
    <div className="mt-3 h-40 rounded bg-[var(--card-muted)] animate-pulse" />
  </div>
);

const PRMetricsSkeleton = () => (
  <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6 shadow-sm">
    <h2 className="text-lg font-semibold text-[var(--card-foreground)]">PR Analytics</h2>
    <div className="mt-3 h-40 rounded bg-[var(--card-muted)] animate-pulse" />
  </div>
);

const CodingActivityInsightsCard = dynamic(
  () => import("@/components/CodingActivityInsightsCard"),
  { loading: () => <SkeletonCard /> },
);

const ActivityRingChart = dynamic(
  () => import("@/components/ActivityRingChart"),
  { loading: () => <SkeletonCard /> },
);

const ContributionGraph = dynamic(
  () => import("@/components/ContributionGraph"),
  { loading: () => <ContributionGraphSkeleton /> },
);

const ContributionHeatmap = dynamic(
  () => import("@/components/ContributionHeatmap"),
  { loading: () => <SkeletonCard /> },
);

const PRMetrics = dynamic(() => import("@/components/PRMetrics"), {
  loading: () => <PRMetricsSkeleton />,
});

const PRBreakdownChart = dynamic(
  () => import("@/components/PRBreakdownChart"),
  { loading: () => <SkeletonCard /> },
);

const CommitTimeChart = dynamic(
  () => import("@/components/CommitTimeChart"),
  { loading: () => <SkeletonCard /> },
);

const PRReviewTrendChart = dynamic(
  () => import("@/components/PRReviewTrendChart"),
  { loading: () => <SkeletonCard /> },
);

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/");

  return (
    <DashboardSSEProvider>
      <div className="min-h-screen bg-[var(--background)] px-4 py-8 text-[var(--foreground)] transition-colors sm:px-6 lg:px-8 max-w-[1600px] mx-auto">
        <DashboardHeader />

        {/* Quick actions */}
<<<<<<< HEAD
        <div className="mt-8 mb-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Left side actions */}
          <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
            <Link
              href="/wrapped"
              className="inline-flex w-full sm:w-auto justify-center items-center gap-2 rounded-xl border border-[var(--accent)] bg-[var(--accent)]/10 px-5 py-2.5 text-sm font-semibold text-[var(--accent)] shadow-sm shadow-[var(--accent)]/20 transition-all hover:bg-[var(--accent)]/20 hover:scale-[1.02]"
            >
              Year in Code
            </Link>

            <Link
              href="/dashboard/settings"
              className="inline-flex w-full sm:w-auto justify-center items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-medium transition-all hover:bg-white/10 hover:scale-[1.02]"
            >
              Settings
            </Link>
          </div>

          <div className="w-full sm:w-auto">
=======
        <div className="mt-4 flex flex-wrap items-center gap-2 sm:gap-3">
          <Link
            href="/wrapped"
            className="inline-flex items-center gap-2 rounded-lg border border-[var(--accent)] bg-[var(--accent-soft)] px-4 py-2 text-sm font-semibold text-[var(--accent)] transition-opacity hover:opacity-90"
          >
            ✨ Year in Code
          </Link>
          <Link
            href="/friend-compare"
            className="inline-flex items-center gap-2 rounded-lg border border-[var(--accent)] bg-[var(--accent-soft)] px-4 py-2 text-sm font-semibold text-[var(--accent)] transition-opacity hover:opacity-90"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
            Compare Friends
          </Link>
          <Link
            href="/dashboard/settings"
            className="secondary-button inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium"
          >
            Settings
          </Link>
          <div className="sm:ml-auto">
>>>>>>> 9af3a534735a3ac3d412933eec41fa59c7cc73e4
            <ExportButton />
          </div>
        </div>

        <div className="space-y-4 mb-8">
          <ThrottleBanner />
          <StreakAtRiskBanner />
        </div>

        <section className="mt-8">
          <TodayFocusHero userName={session.user?.name ?? null} />
        </section>

        <section className="mt-14">
          <div className="relative overflow-hidden rounded-xl border border-[var(--border)] bg-gradient-to-r from-violet-950/20 via-indigo-950/10 to-transparent p-6 shadow-lg flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="space-y-2 max-w-xl">
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase font-bold text-violet-400 tracking-wider px-2 py-0.5 rounded bg-violet-500/10 border border-violet-500/20">
                  New Feature
                </span>
                <span className="text-xs text-[var(--muted-foreground)]">
                  AI Resume Generator
                </span>
              </div>

              <h3 className="text-lg font-bold text-[var(--foreground)]">
                Generate an ATS-Friendly CV Backed by Your Real Code
              </h3>
<<<<<<< HEAD

              <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">
                Analyze your GitHub contributions, merged PRs, and lines of code
                changed to automatically generate professional bullet points for
                your target roles.
              </p>
=======
>>>>>>> 9af3a534735a3ac3d412933eec41fa59c7cc73e4
            </div>
          </div>
        </section>

          {/* Right: streak + coding time */}
          <div className="flex flex-col gap-6">
            <StreakTracker />
            <LocalCodingTime />
            <CodingTimeWidget />
          </div>

        {/* Repo analytics explorer — full width */}
        <div className="mt-6">
          <LazyWidget fallback={<SkeletonCard />}>
            <RepoAnalyticsExplorer />
          </LazyWidget>
        </div>

        {/* -- Row 2: PR metrics + Community metrics -- */}
        <div id="pull-requests" className="mt-6 grid grid-cols-1 gap-6 scroll-mt-24 md:grid-cols-2">
          <PRMetrics />
          <CommunityMetrics />
        </div>

        {/* PR breakdown + commit time — 2-col so charts have room */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <LazyWidget fallback={<SkeletonCard />}>
            <PRBreakdownChart />
          </LazyWidget>
          <LazyWidget fallback={<SkeletonCard />}>
            <CommitTimeChart />
          </LazyWidget>
        </div>

        {/* Activity ring — full width */}
        <div className="mt-6">
          <LazyWidget fallback={<SkeletonCard />}>
            <ActivityRingChart />
          </LazyWidget>
        </div>

        {/* Coding activity insights — full width */}
        <div className="mt-6">
          <LazyWidget fallback={<SkeletonCard />}>
            <CodingActivityInsightsCard />
          </LazyWidget>
        </div>

        {/* PR review trend — full width */}
        <div className="mt-6">
          <LazyWidget fallback={<SkeletonCard />}>
            <PRReviewTrendChart />
          </LazyWidget>
        </div>

        {/* -- Row 3: Issues (2/3) + CI analytics (1/3) -- */}
        <div id="goals" className="mt-6 grid grid-cols-1 gap-6 scroll-mt-24 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <LazyWidget fallback={<SkeletonCard />}>
              <RepoAnalyticsExplorer />
            </LazyWidget>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
            <div className="flex flex-col gap-6 w-full overflow-hidden">
              <PRMetrics />
              <LazyWidget fallback={<SkeletonCard />}>
                <PRBreakdownChart />
              </LazyWidget>
              <LazyWidget fallback={<SkeletonCard />}>
                <PRReviewTrendChart />
              </LazyWidget>
              <LazyWidget fallback={<SkeletonCard />}>
                <DiscussionsWidget />
              </LazyWidget>
            </div>
            <div className="flex flex-col gap-6 w-full overflow-hidden">
              <CommunityMetrics />
              <LazyWidget fallback={<SkeletonCard />}>
                <PinnedReposWidget />
              </LazyWidget>
              <LazyWidget fallback={<SkeletonCard />}>
                <TopRepos />
              </LazyWidget>
              <LazyWidget fallback={<SkeletonCard />}>
                <InactiveRepositoriesCard />
              </LazyWidget>
            </div>
          </div>
        </div>

        {/* 4. GOALS & INSIGHTS */}
        <section id="goals" className="mt-14 space-y-6 scroll-mt-28 mb-12">
          <div className="flex items-center gap-3 border-b border-white/10 pb-4">
            <div className="h-8 w-1.5 rounded-full bg-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.5)]"></div>
            <h2 className="text-2xl font-bold tracking-tight">Goals & Insights</h2>
          </div>

            <Link
              href="/dashboard/career-intelligence"
              className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 px-5 py-2.5 text-xs font-bold text-white shadow-md shadow-indigo-500/20 hover:scale-[1.03] transition-all whitespace-nowrap"
            >
              Build Resume
              <ChevronRight className="h-4 w-4" />
            </Link>
        </section>

        <CustomizableDashboard />
      </div>
    </DashboardSSEProvider>
  );
}