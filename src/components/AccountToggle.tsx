"use client";

import { useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { useAccount } from "@/components/AccountContext";

interface LinkedAccount {
  githubId: string;
  githubLogin: string;
}

<<<<<<< HEAD
interface OrgRecord {
  orgId: string;
  orgLogin: string;
  avatarUrl: string | null;
  includeInMetrics: boolean;
}

interface AccountsResponse {
  accounts: Array<{
    githubId: string;
    githubLogin: string;
  }>;
}

interface OrgsResponse {
  orgs: OrgRecord[];
  hasReadOrgScope: boolean;
=======
interface AccountOption {
  label: string;
  value: string | null;
}

function GitHubAvatar({ login, size = 20 }: { login: string; size?: number }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`https://github.com/${login}.png?size=${size * 2}`}
      alt=""
      aria-hidden="true"
      width={size}
      height={size}
      className="rounded-full border border-[var(--border)] shrink-0"
      loading="lazy"
    />
  );
>>>>>>> 9af3a534735a3ac3d412933eec41fa59c7cc73e4
}

export default function AccountToggle() {
  const { selectedAccount, setSelectedAccount } = useAccount();
  const { data: session } = useSession();
  const [linkedAccounts, setLinkedAccounts] = useState<LinkedAccount[]>([]);
<<<<<<< HEAD
  const [orgs, setOrgs] = useState<OrgRecord[]>([]);
=======
  const [organizations, setOrganizations] = useState<
    Array<{ githubId: string; login: string }>
  >([]);
>>>>>>> 9af3a534735a3ac3d412933eec41fa59c7cc73e4

  // Load linked accounts from the new /api/accounts endpoint
  useEffect(() => {
    if (!session?.githubLogin) return;

    async function loadAccounts() {
      try {
        const response = await fetch("/api/accounts");
        if (!response.ok) {
          setLinkedAccounts([]);
          return;
        }
        const data = await response.json();
        setLinkedAccounts(
          (data.accounts ?? []).map(
            (a: { githubId: string; githubLogin: string }) => ({
              githubId: a.githubId,
              githubLogin: a.githubLogin,
            })
          )
        );
      } catch {
        setLinkedAccounts([]);
      }
    }

<<<<<<< HEAD
    async function loadOrgs() {
      try {
        const response = await fetch("/api/user/github-orgs");
        if (!response.ok) {
          setOrgs([]);
          return;
        }
        const data = (await response.json()) as OrgsResponse;
        // Only show orgs the user has chosen to include in metrics.
        setOrgs(
          (data.orgs ?? []).filter((o) => o.includeInMetrics)
        );
      } catch {
        setOrgs([]);
      }
    }

    loadAccounts();
    loadOrgs();
  }, [session?.githubLogin]);

  if (!session?.githubLogin) return null;

  const hasLinkedAccounts = linkedAccounts.length > 0;
  const hasOrgs = orgs.length > 0;

  // Render nothing if the user has neither linked accounts nor orgs
  if (!hasLinkedAccounts && !hasOrgs) return null;
=======
    loadAccounts();
  }, [session?.githubLogin]);

  // Load organization accounts
  useEffect(() => {
    if (!session?.githubLogin) return;

    async function loadOrgs() {
      try {
        const response = await fetch("/api/user/orgs");
        if (!response.ok) return;

        const data = await response.json();
        const config = data.config || {};

        const enabledOrgs: Array<{ githubId: string; login: string }> = [];
        (data.accounts || []).forEach((acc: any) => {
          (acc.orgs || []).forEach((org: any) => {
            if (config[org.login] !== false) {
              enabledOrgs.push({ githubId: acc.githubId, login: org.login });
            }
          });
        });
        setOrganizations(enabledOrgs);
      } catch (e) {
        console.error("Failed to load organizations in AccountToggle:", e);
      }
    }

    loadOrgs();
  }, [session?.githubLogin]);

  if (
    !session?.githubLogin ||
    (linkedAccounts.length === 0 && organizations.length === 0)
  ) {
    return null;
  }
>>>>>>> 9af3a534735a3ac3d412933eec41fa59c7cc73e4

  const accountOptions: AccountOption[] = [
    { label: session.githubLogin, value: null },
    ...linkedAccounts.map((a) => ({ label: a.githubLogin, value: a.githubId })),
<<<<<<< HEAD
    ...(hasLinkedAccounts ? [{ label: "Combined", value: "combined" }] : []),
  ];

  const orgOptions: Array<{ label: string; value: string }> = orgs.map(
    (o) => ({ label: o.orgLogin, value: `org:${o.orgLogin}` })
  );

  const renderButton = (
    label: string,
    value: string | null,
    prefix?: string
  ) => {
    const isActive = selectedAccount === value;
    return (
      <button
        key={`${prefix ?? ""}${label}-${value ?? "primary"}`}
        type="button"
        aria-pressed={isActive}
        onClick={() => setSelectedAccount(value)}
        className={`rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${
          isActive
            ? "border-[var(--accent)] bg-[var(--accent)] text-[var(--accent-foreground)]"
            : "border-[var(--card-muted)] bg-[var(--card-muted)] text-[var(--muted-foreground)] hover:bg-[var(--accent)] hover:text-[var(--accent-foreground)]"
        }`}
      >
        {label}
      </button>
    );
  };

  return (
    <div className="mt-4 space-y-2">
      {hasLinkedAccounts && (
        <div
          className="flex flex-wrap gap-2"
          role="group"
          aria-label="Select GitHub account"
        >
          {accountOptions.map((o) => renderButton(o.label, o.value, "acct-"))}
        </div>
      )}

      {hasOrgs && (
        <div
          className="flex flex-wrap gap-2"
          role="group"
          aria-label="Filter by organization"
        >
          <span className="self-center text-xs text-[var(--muted-foreground)] mr-1">
            Orgs:
          </span>
          {orgOptions.map((o) => renderButton(o.label, o.value, "org-"))}
        </div>
      )}
=======
    ...(linkedAccounts.length > 0
      ? [{ label: "Combined", value: "combined" }]
      : []),
    ...organizations.map((org) => ({
      label: org.login,
      value: `org:${org.githubId}:${org.login}`,
    })),
  ];

  return (
    <div
      className="mt-4 flex flex-wrap gap-2"
      role="group"
      aria-label="Select GitHub account or organization"
    >
      {accountOptions.map((option) => {
        const isActive = selectedAccount === option.value;
        // Determine if this option maps to a real GitHub login for avatar display
        const isOrgOption = option.value?.startsWith("org:") ?? false;
        const isCombined = option.value === "combined";
        const showAvatar = !isCombined && !isOrgOption;
        const avatarLogin = isCombined
          ? null
          : isOrgOption
          ? option.label
          : option.label;

        return (
          <button
            key={`${option.label}-${option.value ?? "primary"}`}
            type="button"
            aria-pressed={isActive}
            onClick={() => setSelectedAccount(option.value)}
            className={`inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] ${
              isActive
                ? "border-[var(--accent)] bg-[var(--accent)] text-[var(--accent-foreground)]"
                : "border-[var(--card-muted)] bg-[var(--card-muted)] text-[var(--muted-foreground)] hover:bg-[var(--accent)] hover:text-[var(--accent-foreground)]"
            }`}
          >
            {showAvatar && avatarLogin ? (
              <GitHubAvatar login={avatarLogin} size={18} />
            ) : isCombined ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4 shrink-0"
                aria-hidden="true"
              >
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4 shrink-0"
                aria-hidden="true"
              >
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
            )}
            <span>{option.label}</span>
          </button>
        );
      })}
>>>>>>> 9af3a534735a3ac3d412933eec41fa59c7cc73e4
    </div>
  );
}