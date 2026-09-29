const parameters = new URLSearchParams(window.location.search);
const keys = ["utm_source", "utm_medium", "utm_campaign", "utm_content"] as const;
const tags = Object.fromEntries(keys.flatMap((key) => {
  const value = parameters.get(key);
  return value && /^[a-zA-Z0-9_-]{1,80}$/.test(value) ? [[key, value]] : [];
}));

if (Object.keys(tags).length) {
  document.querySelectorAll<HTMLAnchorElement>("a[href]").forEach((link) => {
    const url = new URL(link.href, window.location.href);
    const isSoleMatePage = (url.origin === window.location.origin ||
      url.origin === "https://over-tech-apps.pages.dev") &&
      /^\/solemate-run(?:\/|$)/.test(url.pathname);
    if (isSoleMatePage) {
      for (const [key, value] of Object.entries(tags)) url.searchParams.set(key, value);
      link.href = url.toString();
      return;
    }
    if (link.dataset.solemateStore === "android" && url.hostname === "play.google.com") {
      for (const [key, value] of Object.entries(tags)) url.searchParams.set(key, value);
    } else if (link.dataset.solemateStore === "ios" && url.hostname === "apps.apple.com") {
      const provider = link.dataset.appleProvider || "";
      // Apple campaign attribution needs the real provider token. Never invent one.
      if (!/^\d+$/.test(provider) || !tags.utm_campaign) return;
      url.searchParams.set("pt", provider);
      const raw = [tags.utm_campaign, tags.utm_source, tags.utm_content].filter(Boolean).join("_");
      let hash = 2166136261;
      for (let i = 0; i < raw.length; i++) hash = Math.imul(hash ^ raw.charCodeAt(i), 16777619);
      const token = raw.length <= 40 ? raw : raw.slice(0, 31) + "_" + (hash >>> 0).toString(16).padStart(8, "0");
      url.searchParams.set("ct", token);
      url.searchParams.set("mt", "8");
    } else return;
    link.href = url.toString();
  });
}
