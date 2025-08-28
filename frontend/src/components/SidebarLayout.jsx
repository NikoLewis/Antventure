import { NavLink, Outlet, useLocation, Link } from "react-router-dom";
import { useEffect, useMemo, useRef, useState } from "react";
import AuthModal from "./AuthModal.jsx";
import { useApp } from "../state/AppState.jsx";

export default function SidebarLayout() {
  const { user, logout, settings } = useApp();
  const [authOpen, setAuthOpen] = useState(false);
  const audioRef = useRef(null);
  const location = useLocation();
  const onGoals = location.pathname.startsWith("/goals");

  // Dark mode on <html>
  useEffect(() => {
    document.documentElement.classList.toggle("dark", !!settings.darkMode);
  }, [settings.darkMode]);

  // Direct URL playback (only when provider === "url")
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    try {
      if (settings.bgmProvider !== "url") {
        audio.pause();
        audio.removeAttribute("src");
        audio.load();
        return;
      }
      audio.volume = settings.bgmVolume ?? 0.4;
      if (settings.bgmEnabled && settings.bgmUrl) {
        if (audio.src !== settings.bgmUrl) audio.src = settings.bgmUrl;
        audio.loop = true;
        audio.play().catch(() => {});
      } else {
        audio.pause();
        audio.removeAttribute("src");
        audio.load();
      }
    } catch {}
  }, [settings.bgmEnabled, settings.bgmUrl, settings.bgmVolume, settings.bgmProvider]);

  // Build embed URLs for Spotify / Apple
  const spotifyEmbedSrc = useMemo(() => {
    const raw = (settings.bgmSpotifyUrl || "").trim();
    if (!raw) return "";
    try {
      const u = new URL(raw, window.location.origin);
      const parts = u.pathname.split("/").filter(Boolean);
      if (parts.length >= 2) {
        const type = parts[0];
        const id = parts[1].split("?")[0];
        return `https://open.spotify.com/embed/${type}/${id}?utm_source=oembed`;
      }
    } catch {}
    return "";
  }, [settings.bgmSpotifyUrl]);

  const appleEmbedSrc = useMemo(() => {
    const raw = (settings.bgmAppleUrl || "").trim();
    if (!raw) return "";
    try {
      const u = new URL(raw, window.location.origin);
      return `https://embed.music.apple.com${u.pathname}${u.search}`;
    } catch {}
    return "";
  }, [settings.bgmAppleUrl]);

  return (
    <div className={settings.darkMode ? "dark" : ""}>
      <div className="min-h-screen flex bg-[#F6F8FA] text-[#0F172A] dark:bg-[#0b1224] dark:text-[#F9FAFB]">
        {/* Sidebar */}
        <aside className="w-64 bg-[#0F172A] text-white p-6 flex flex-col">
          <div>
            <div className="text-lg font-semibold mb-6">My Ant-venture</div>
            <nav className="space-y-3">
              <NavItem to="/dashboard" end>Dashboard</NavItem>
              <NavItem to="/goals">Goals</NavItem>
              <NavItem to="/achievements">Achievements</NavItem>
              <NavItem to="/settings">Settings</NavItem>
            </nav>
          </div>

          {/* Music panel pinned at the bottom */}
          <div className="mt-6 pt-4 border-t border-white/10">
            <div className="text-xs tracking-widest text-white/70 mb-2">MUSIC</div>

            {!settings.bgmEnabled && (
              <div className="text-sm text-white/70">
                Disabled — enable in <NavLink to="/settings" className="underline">Settings</NavLink>.
              </div>
            )}

            {settings.bgmEnabled && settings.bgmProvider === "url" && (
              <div className="space-y-2">
                <audio ref={audioRef} controls className="w-full" />
                <div className="text-[11px] text-white/60">
                  Using direct URL. Volume can also be set in Settings.
                </div>
              </div>
            )}

            {settings.bgmEnabled && settings.bgmProvider === "spotify" && (
              spotifyEmbedSrc ? (
                <div className="rounded-lg overflow-hidden">
                  <iframe
                    title="Spotify Player"
                    src={spotifyEmbedSrc}
                    width="100%"
                    height="152"
                    frameBorder="0"
                    allow="autoplay; clipboard-write; encrypted-media; picture-in-picture"
                    loading="lazy"
                  />
                </div>
              ) : (
                <div className="text-sm text-white/70">Add a Spotify link in Settings.</div>
              )
            )}

            {settings.bgmEnabled && settings.bgmProvider === "apple" && (
              appleEmbedSrc ? (
                <div className="rounded-lg overflow-hidden">
                  <iframe
                    title="Apple Music Player"
                    allow="autoplay *; encrypted-media *;"
                    frameBorder="0"
                    height="175"
                    style={{ width: "100%", overflow: "hidden", background: "transparent" }}
                    sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-top-navigation-by-user-activation"
                    src={appleEmbedSrc}
                  />
                </div>
              ) : (
                <div className="text-sm text-white/70">Add an Apple Music link in Settings.</div>
              )
            )}
          </div>
        </aside>

        {/* Main */}
        <main className="flex-1 flex flex-col">
          <header className="flex items-center justify-end gap-3 p-4 border-b border-gray-200 bg-white dark:bg-[#0F172A] dark:border-gray-700">
            {/* Quick action only on /goals* */}
            {onGoals && (
              <Link
                to="/goals/new"
                className="px-3 py-2 rounded text-sm font-semibold bg-[#0F172A] text-white dark:bg-[#111827]"
              >
                + Add New Goal
              </Link>
            )}

            {user ? (
              <div className="flex items-center gap-3">
                <span className="hidden sm:block text-sm text-gray-500 dark:text-gray-300">
                  {user.name || user.email}
                </span>
                <button
                  type="button"
                  onClick={logout}
                  className="px-3 py-2 rounded text-sm font-semibold bg-gray-200 text-[#0F172A] dark:bg-gray-700 dark:text-gray-100"
                >
                  Log out
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setAuthOpen(true)}
                className="px-4 py-2 rounded text-sm font-semibold bg-[#E11D48] text-white"
              >
                Log in / Register
              </button>
            )}
          </header>

          <div className="p-6 flex-1">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Auth Modal */}
      <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} />
    </div>
  );
}

function NavItem({ to, end = false, children }) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        isActive
          ? "block px-2 py-1 rounded bg-white/10"
          : "block px-2 py-1 rounded hover:bg-white/10"
      }
    >
      {children}
    </NavLink>
  );
}
