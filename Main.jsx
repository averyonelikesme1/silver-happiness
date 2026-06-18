import { useState } from "react";
import {
  Search,
  FileSearch,
  Wrench,
  RefreshCw,
  DollarSign,
  ChevronRight,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Clock,
  ExternalLink,
  MessageSquare,
  ShieldCheck,
  RotateCcw,
} from "lucide-react";

const SERIF = "'Source Serif 4', Georgia, serif";
const MONO = "'IBM Plex Mono', 'Courier New', monospace";
const SANS = "'Inter', system-ui, sans-serif";

const COLORS = {
  ink: "#10141A",
  panel: "#171C24",
  panelAlt: "#1D2330",
  line: "#2A313C",
  textPrimary: "#E9EBEF",
  textBody: "#C6CCD4",
  textMuted: "#838C99",
  citrine: "#C9A227",
  green: "#3FAE82",
  coral: "#DD6B4D",
  indigo: "#7378CE",
};

const KPIS = [
  { label: "Time-to-diagnosis", value: "11 min", sub: "avg. detect \u2192 root cause" },
  { label: "Verified win rate", value: "63%", sub: "fixes that moved a citation in 30 days" },
  { label: "Attributed revenue", value: "$482K", sub: "pipeline tied to verified wins, QTD" },
  { label: "NRR lift", value: "+14 pts", sub: "Impact Loop accounts vs. without" },
  { label: "Attach rate", value: "41%", sub: "Growth / Enterprise accounts adopted" },
];

const STAGES = [
  { id: 1, label: "Detect", icon: Search },
  { id: 2, label: "Diagnose", icon: FileSearch },
  { id: 3, label: "Fix", icon: Wrench },
  { id: 4, label: "Verify", icon: RefreshCw },
  { id: 5, label: "Attribute", icon: DollarSign },
];

const ENGINES = [
  { name: "ChatGPT", status: "gap" },
  { name: "Perplexity", status: "gap" },
  { name: "Claude", status: "cited" },
  { name: "Gemini", status: "cited" },
  { name: "Copilot", status: "cited" },
  { name: "Google AI Overviews", status: "cited" },
  { name: "Grok", status: "cited" },
  { name: "Meta AI", status: "monitoring" },
];

const VERIFY_WEEKS = [
  { label: "Baseline", cited: false },
  { label: "Week 1", cited: false },
  { label: "Week 2", cited: false },
  { label: "Week 3", cited: true },
  { label: "Week 4", cited: true },
];

const TOUCHES = [
  { label: "First touch \u2014 citation page view", pct: 20, amount: 16880 },
  { label: "Influence \u2014 mid-funnel content", pct: 45, amount: 37980 },
  { label: "Last touch \u2014 demo request", pct: 35, amount: 29540 },
];

function Badge({ children, color, style }) {
  return (
    <span
      style={{
        fontFamily: MONO,
        fontSize: 11,
        letterSpacing: 0.4,
        color: color,
        border: `1px solid ${color}`,
        borderRadius: 4,
        padding: "2px 7px",
        textTransform: "uppercase",
        whiteSpace: "nowrap",
        ...style,
      }}
    >
      {children}
    </span>
  );
}

function PrimaryButton({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="hover:opacity-90 focus:outline focus:outline-2"
      style={{
        background: COLORS.citrine,
        color: "#1A1300",
        fontFamily: MONO,
        fontSize: 13,
        fontWeight: 600,
        letterSpacing: 0.3,
        border: "none",
        borderRadius: 5,
        padding: "10px 16px",
        cursor: "pointer",
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
      }}
    >
      {children}
      <ChevronRight size={15} />
    </button>
  );
}

function SectionLabel({ index, title, caption }) {
  return (
    <div className="flex items-baseline gap-3 flex-wrap mb-1">
      <span style={{ fontFamily: MONO, color: COLORS.textMuted, fontSize: 13 }}>
        {index}
      </span>
      <h2
        style={{ fontFamily: SERIF, color: COLORS.textPrimary }}
        className="text-xl sm:text-2xl font-semibold"
      >
        {title}
      </h2>
      <span style={{ fontFamily: MONO, color: COLORS.textMuted, fontSize: 12 }}>
        {caption}
      </span>
    </div>
  );
}

function VerifiedStamp({ size = 84 }) {
  return (
    <div
      className="stamp-in"
      style={{
        width: size,
        height: size,
        minWidth: size,
        borderRadius: "9999px",
        border: `3px double ${COLORS.green}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transform: "rotate(-9deg)",
        flexShrink: 0,
      }}
    >
      <div style={{ textAlign: "center" }}>
        <div
          style={{
            fontFamily: MONO,
            color: COLORS.green,
            fontWeight: 700,
            fontSize: size * 0.155,
            letterSpacing: 0.5,
            lineHeight: 1.1,
          }}
        >
          VERIFIED
        </div>
        <div
          style={{
            fontFamily: MONO,
            color: COLORS.green,
            fontSize: size * 0.1,
            letterSpacing: 0.5,
          }}
        >
          IMPACT LOOP
        </div>
      </div>
    </div>
  );
}

export default function ImpactLoopDemo() {
  const [activeStage, setActiveStage] = useState(1);
  const [fixApproved, setFixApproved] = useState(false);

  const goTo = (id) => setActiveStage(id);
  const restart = () => {
    setFixApproved(false);
    setActiveStage(1);
  };

  return (
    <div style={{ background: COLORS.ink, minHeight: "100vh", fontFamily: SANS }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Source+Serif+4:opsz,wght@8..60,500;8..60,600;8..60,700&family=IBM+Plex+Mono:wght@400;500;600;700&family=Inter:wght@400;500;600;700&display=swap');

        @keyframes stampIn {
          0% { transform: scale(2.1) rotate(-9deg); opacity: 0; }
          60% { transform: scale(0.94) rotate(-9deg); opacity: 1; }
          100% { transform: scale(1) rotate(-9deg); opacity: 1; }
        }
        .stamp-in { animation: stampIn 0.5s ease-out; }

        @keyframes sweep {
          0% { transform: translateX(-120%); opacity: 0; }
          15% { opacity: 0.5; }
          85% { opacity: 0.5; }
          100% { transform: translateX(220%); opacity: 0; }
        }
        .scan-sweep {
          position: absolute;
          top: 0; bottom: 0; width: 40%;
          background: linear-gradient(90deg, transparent, rgba(201,162,39,0.16), transparent);
          animation: sweep 3.2s linear infinite;
          pointer-events: none;
        }
        @keyframes pulseDot {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.35; }
        }
        .pulse-dot { animation: pulseDot 1.6s ease-in-out infinite; }

        @media (prefers-reduced-motion: reduce) {
          .stamp-in, .scan-sweep, .pulse-dot { animation: none !important; }
        }
      `}</style>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-7 sm:py-9">
        {/* Header */}
        <div
          className="flex items-center justify-between flex-wrap gap-3 pb-5 mb-6"
          style={{ borderBottom: `1px solid ${COLORS.line}` }}
        >
          <div className="flex items-center gap-3">
            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: "9999px",
                border: `2px solid ${COLORS.green}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <ShieldCheck size={18} color={COLORS.green} />
            </div>
            <div>
              <div
                style={{ fontFamily: SERIF, color: COLORS.textPrimary, letterSpacing: 0.5 }}
                className="text-lg sm:text-xl font-semibold uppercase"
              >
                The Impact Loop
              </div>
              <div style={{ fontFamily: MONO, color: COLORS.textMuted, fontSize: 12 }}>
                GEO platform &middot; citation-to-revenue console
              </div>
            </div>
          </div>
          <div style={{ fontFamily: MONO, color: COLORS.textMuted, fontSize: 12 }} className="text-right">
            <div>CASE NO. IL-2026-0417</div>
            <div>Flowstack &middot; Workflow Automation</div>
          </div>
        </div>

        {/* KPI strip */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-3 mb-7">
          {KPIS.map((k) => (
            <div
              key={k.label}
              className="rounded-md p-3"
              style={{ background: COLORS.panel, border: `1px solid ${COLORS.line}` }}
            >
              <div
                style={{ fontFamily: MONO, color: COLORS.textMuted, fontSize: 10.5, letterSpacing: 0.3 }}
                className="uppercase mb-1"
              >
                {k.label}
              </div>
              <div
                style={{ fontFamily: SERIF, color: COLORS.textPrimary }}
                className="text-xl sm:text-2xl font-semibold leading-tight"
              >
                {k.value}
              </div>
              <div style={{ color: COLORS.textMuted, fontSize: 11 }} className="mt-0.5 leading-snug">
                {k.sub}
              </div>
            </div>
          ))}
        </div>

        {/* Stepper */}
        <div className="overflow-x-auto mb-2">
          <div className="flex items-center gap-1 sm:gap-2 min-w-max pb-1">
            {STAGES.map((s, i) => {
              const Icon = s.icon;
              const active = s.id === activeStage;
              const done = s.id < activeStage;
              const ringColor = active ? COLORS.citrine : done ? COLORS.green : COLORS.line;
              return (
                <div key={s.id} className="flex items-center gap-1 sm:gap-2">
                  <button
                    onClick={() => goTo(s.id)}
                    className="flex flex-col items-center gap-1 focus:outline focus:outline-2"
                    style={{ background: "transparent", border: "none", cursor: "pointer", padding: 4 }}
                  >
                    <div
                      style={{
                        width: 42,
                        height: 42,
                        borderRadius: "9999px",
                        border: `2px solid ${ringColor}`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: active ? "rgba(201,162,39,0.12)" : "transparent",
                      }}
                    >
                      {done ? (
                        <CheckCircle2 size={18} color={COLORS.green} />
                      ) : (
                        <Icon size={18} color={active ? COLORS.citrine : COLORS.textMuted} />
                      )}
                    </div>
                    <span
                      style={{
                        fontFamily: MONO,
                        fontSize: 11,
                        color: active ? COLORS.citrine : done ? COLORS.green : COLORS.textMuted,
                      }}
                    >
                      {String(s.id).padStart(2, "0")} {s.label}
                    </span>
                  </button>
                  {i < STAGES.length - 1 && (
                    <ChevronRight size={16} color={COLORS.line} style={{ marginBottom: 16 }} />
                  )}
                </div>
              );
            })}
          </div>
        </div>
        <div
          className="flex items-center justify-center gap-2 mb-8 pb-5"
          style={{ borderBottom: `1px solid ${COLORS.line}`, fontFamily: MONO, fontSize: 11.5, color: COLORS.indigo }}
        >
          <RotateCcw size={13} />
          verified outcomes retrain what Detect &amp; Diagnose prioritize next
        </div>

        {/* Stage panel */}
        <div
          className="rounded-lg p-4 sm:p-6"
          style={{ background: COLORS.panel, border: `1px solid ${COLORS.line}` }}
        >
          {activeStage === 1 && (
            <div>
              <SectionLabel index="01" title="Detect" caption="live citation monitoring" />
              <p style={{ color: COLORS.textBody, fontSize: 14 }} className="mb-4 max-w-xl">
                Prompt-level checks run across eight models every day. The moment a tracked
                query stops citing Flowstack, it surfaces here &mdash; no manual searching required.
              </p>

              <div className="flex items-center gap-2 mb-3">
                <span className="pulse-dot" style={{ width: 7, height: 7, borderRadius: "9999px", background: COLORS.green, display: "inline-block" }} />
                <span style={{ fontFamily: MONO, fontSize: 11.5, color: COLORS.textMuted }}>
                  monitoring live &middot; last sweep 4 min ago
                </span>
              </div>

              <div className="relative overflow-hidden rounded-md mb-4" style={{ border: `1px solid ${COLORS.line}` }}>
                <div className="scan-sweep" />
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-px relative">
                  {ENGINES.map((e) => {
                    const isGap = e.status === "gap";
                    const isMon = e.status === "monitoring";
                    const color = isGap ? COLORS.coral : isMon ? COLORS.textMuted : COLORS.green;
                    return (
                      <div
                        key={e.name}
                        className="p-2.5 flex items-center justify-between"
                        style={{ background: COLORS.panelAlt }}
                      >
                        <span style={{ fontFamily: MONO, fontSize: 11.5, color: COLORS.textBody }}>
                          {e.name}
                        </span>
                        {isGap ? (
                          <XCircle size={14} color={color} />
                        ) : isMon ? (
                          <Clock size={14} color={color} />
                        ) : (
                          <CheckCircle2 size={14} color={color} />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              <div
                className="rounded-md p-3.5 mb-5"
                style={{ background: "rgba(221,107,77,0.08)", border: `1px solid ${COLORS.coral}` }}
              >
                <div className="flex items-start gap-2">
                  <AlertTriangle size={16} color={COLORS.coral} style={{ marginTop: 2, flexShrink: 0 }} />
                  <div>
                    <div style={{ fontFamily: MONO, color: COLORS.textPrimary, fontSize: 13, fontWeight: 600 }}>
                      &ldquo;best workflow automation tool for enterprise teams&rdquo;
                    </div>
                    <div style={{ color: COLORS.textBody, fontSize: 13 }} className="mt-1">
                      ChatGPT and Perplexity now cite ZipFlow instead of Flowstack for this query.
                    </div>
                    <div style={{ fontFamily: MONO, color: COLORS.textMuted, fontSize: 11.5 }} className="mt-1.5">
                      1,240 monthly queries &middot; decision stage &middot; gap opened 6 hours ago
                    </div>
                  </div>
                </div>
              </div>

              <PrimaryButton onClick={() => goTo(2)}>Open diagnosis</PrimaryButton>
            </div>
          )}

          {activeStage === 2 && (
            <div>
              <SectionLabel index="02" title="Diagnose" caption="source-level root cause" />
              <p style={{ color: COLORS.textBody, fontSize: 14 }} className="mb-4 max-w-xl">
                The Impact Loop maps exactly which pages and threads won the citation instead of
                Flowstack, and scores the gap so the highest-value fixes surface first.
              </p>

              <div className="grid sm:grid-cols-2 gap-3 mb-4">
                <div className="rounded-md p-3.5" style={{ background: COLORS.panelAlt, border: `1px solid ${COLORS.line}` }}>
                  <div className="flex items-center gap-2 mb-1.5">
                    <ExternalLink size={14} color={COLORS.textMuted} />
                    <span style={{ fontFamily: MONO, fontSize: 11, color: COLORS.textMuted }}>G2.COM</span>
                  </div>
                  <div style={{ color: COLORS.textPrimary, fontSize: 13.5 }} className="font-medium mb-2">
                    &ldquo;ZipFlow vs Flowstack: Which Workflow Tool Is Right for Enterprise?&rdquo;
                  </div>
                  <Badge color={COLORS.citrine}>content gap</Badge>
                </div>
                <div className="rounded-md p-3.5" style={{ background: COLORS.panelAlt, border: `1px solid ${COLORS.line}` }}>
                  <div className="flex items-center gap-2 mb-1.5">
                    <MessageSquare size={14} color={COLORS.textMuted} />
                    <span style={{ fontFamily: MONO, fontSize: 11, color: COLORS.textMuted }}>r/SaaS &middot; 31 upvotes</span>
                  </div>
                  <div style={{ color: COLORS.textPrimary, fontSize: 13.5 }} className="font-medium mb-2">
                    &ldquo;Anyone replaced Flowstack with ZipFlow?&rdquo;
                  </div>
                  <Badge color={COLORS.citrine}>unanswered objection</Badge>
                </div>
              </div>

              <div
                className="rounded-md p-3.5 mb-3"
                style={{ background: COLORS.panelAlt, border: `1px solid ${COLORS.line}`, fontFamily: MONO, fontSize: 12.5, color: COLORS.textBody }}
              >
                1,240 mo. queries &times; decision stage = <span style={{ color: COLORS.citrine }}>high priority</span> &mdash; ranked above 14 other gaps this week
              </div>
              <p style={{ color: COLORS.textMuted, fontSize: 12.5 }} className="italic mb-5">
                Reopened 3 days after a ChatGPT model update &mdash; flagged immediately, before the next weekly review.
              </p>

              <PrimaryButton onClick={() => goTo(3)}>Draft the fix</PrimaryButton>
            </div>
          )}

          {activeStage === 3 && (
            <div>
              <SectionLabel index="03" title="Fix" caption="drafted, not yet published" />
              <p style={{ color: COLORS.textBody, fontSize: 14 }} className="mb-4 max-w-xl">
                Content briefs, schema, and outreach are generated automatically from the
                diagnosis. Nothing publishes without your approval.
              </p>

              <div className="space-y-3 mb-5">
                <div className="rounded-md p-3.5" style={{ background: COLORS.panelAlt, border: `1px solid ${COLORS.line}` }}>
                  <div style={{ fontFamily: MONO, fontSize: 11, color: COLORS.textMuted }} className="mb-1.5 uppercase">content brief</div>
                  <div style={{ color: COLORS.textPrimary, fontSize: 14 }} className="font-medium mb-2">
                    &ldquo;Flowstack vs ZipFlow: Enterprise Workflow Automation Compared&rdquo;
                  </div>
                  <ul style={{ color: COLORS.textBody, fontSize: 13 }} className="list-disc pl-5 space-y-1">
                    <li>Lead with SOC 2 / SSO depth ZipFlow's comparison page omits</li>
                    <li>Address the migration-effort objection raised in the Reddit thread</li>
                    <li>Target query: &ldquo;best workflow automation tool for enterprise teams&rdquo;</li>
                  </ul>
                </div>

                <div className="rounded-md p-3.5" style={{ background: COLORS.panelAlt, border: `1px solid ${COLORS.line}` }}>
                  <div style={{ fontFamily: MONO, fontSize: 11, color: COLORS.textMuted }} className="mb-1 uppercase">schema markup</div>
                  <div style={{ color: COLORS.textBody, fontSize: 13 }}>
                    Add Product + Comparison schema to <span style={{ fontFamily: MONO, color: COLORS.textPrimary }}>/compare</span>
                  </div>
                </div>

                <div className="rounded-md p-3.5" style={{ background: COLORS.panelAlt, border: `1px solid ${COLORS.line}` }}>
                  <div style={{ fontF
