import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import {
  AnimatePresence,
  motion,
  useDragControls,
  useMotionValue,
  useReducedMotion,
} from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  AudioLines,
  Check,
  ChevronDown,
  ChevronLeft,
  CircleHelp,
  ExternalLink,
  Eye,
  EyeOff,
  Gauge,
  GripHorizontal,
  Headphones,
  History,
  LayoutGrid,
  LockKeyhole,
  Maximize2,
  Minus,
  MousePointer2,
  Plane,
  Plus,
  Radio,
  RotateCcw,
  Settings2,
  ShieldCheck,
  Sparkles,
  Volume2,
  VolumeX,
  X,
  Zap,
} from "lucide-react";

const LIVE_URL = "https://hgnice.biz/#/register?invitationCode=531582188045";
const INITIAL_HISTORY = [
  1.32, 2.48, 1.08, 3.76, 1.64, 6.21, 2.05, 1.14, 12.38, 1.92,
];
const DEMO_PLAYERS = [
  ["AL", "a***l", "100.00", "2.48x", "#ba8668"],
  ["MK", "m***k", "250.00", "1.82x", "#7e87bd"],
  ["RS", "r***s", "50.00", "3.26x", "#759b87"],
  ["JN", "j***n", "500.00", "1.54x", "#ad849c"],
  ["SA", "s***a", "120.00", "2.16x", "#7a99ac"],
  ["DM", "d***m", "75.00", "4.05x", "#b2a06e"],
  ["AH", "a***h", "200.00", "1.78x", "#8f82af"],
  ["NK", "n***k", "150.00", "2.64x", "#7c9c98"],
];

function BrandMark({ small = false }: { small?: boolean }) {
  return (
    <span className={`brand-mark ${small ? "small" : ""}`} aria-hidden="true">
      <svg viewBox="0 0 32 32" fill="none">
        <path
          d="m6 22 6-15h9c5 0 6 6 2 9l-3 2 5 7h-7l-6-9-3 6H6Z"
          fill="currentColor"
        />
        <path d="m14 11-2 5 7-3 1-2h-6Z" fill="#f66c4e" />
      </svg>
    </span>
  );
}

function Aircraft() {
  return (
    <svg viewBox="0 0 210 112" fill="none" aria-hidden="true">
      <defs>
        <linearGradient
          id="plane-body"
          x1="61"
          y1="42"
          x2="126"
          y2="86"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#ff7963" />
          <stop offset="1" stopColor="#cb2738" />
        </linearGradient>
        <linearGradient
          id="plane-wing"
          x1="70"
          y1="18"
          x2="119"
          y2="76"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#ff7a61" />
          <stop offset="1" stopColor="#dd3543" />
        </linearGradient>
      </defs>
      <path d="m38 61-8-30 15 3 18 28-25-1Z" fill="#e8444b" />
      <path d="m38 65-26 9 9 7 44-8-27-8Z" fill="#f05653" />
      <path
        d="M35 57c23-5 65-6 99-3 19 2 31 8 31 16 0 9-14 14-34 13L42 71l-7-14Z"
        fill="url(#plane-body)"
      />
      <path d="m89 57-21-41 20-3 49 46-48-2Z" fill="url(#plane-wing)" />
      <path d="m83 69-42 32 20 5 76-31-54-6Z" fill="url(#plane-wing)" />
      <path
        d="m72 20 17-3 37 37-5 1-49-35ZM49 100l14 3 62-26-8-1-68 24Z"
        fill="#ff9b7f"
        opacity=".6"
      />
      <path d="M113 53c1-13 17-14 23 2l-23-2Z" fill="#111b27" />
      <path d="M117 50c2-5 8-6 12 1l-12-1Z" fill="#9db3be" opacity=".75" />
      <path d="m160 59 10 3v15l-10 1V59Z" fill="#b9c1c8" />
      <path
        d="M172 45v47"
        stroke="#cdd1d6"
        strokeWidth="3"
        strokeLinecap="round"
        className="propeller"
      />
      <ellipse cx="172" cy="68" rx="7" ry="29" fill="#d8e2eb" opacity=".09" />
      <path d="m105 81 4 10m25-8-2 8" stroke="#adb6c2" strokeWidth="2.5" />
      <circle
        cx="109"
        cy="94"
        r="6"
        fill="#0c1016"
        stroke="#8a919e"
        strokeWidth="2"
      />
      <circle
        cx="132"
        cy="94"
        r="5"
        fill="#0c1016"
        stroke="#8a919e"
        strokeWidth="2"
      />
      <path
        d="m44 61 40 4"
        stroke="#ffb19b"
        strokeWidth="2"
        strokeLinecap="round"
        opacity=".6"
      />
    </svg>
  );
}

function IconButton({
  children,
  label,
  onClick,
  className = "",
}: {
  children: ReactNode;
  label: string;
  onClick: () => void;
  className?: string;
}) {
  return (
    <button
      className={`icon-button ${className}`}
      aria-label={label}
      title={label}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

function playChime() {
  try {
    const context = new AudioContext();
    const gain = context.createGain();
    gain.gain.setValueAtTime(0.035, context.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, context.currentTime + 0.6);
    gain.connect(context.destination);
    [660, 880].forEach((frequency, index) => {
      const oscillator = context.createOscillator();
      oscillator.type = "sine";
      oscillator.frequency.value = frequency;
      oscillator.connect(gain);
      oscillator.start(context.currentTime + index * 0.12);
      oscillator.stop(context.currentTime + 0.6);
    });
    window.setTimeout(() => void context.close(), 800);
  } catch {
    /* Sound is optional when Web Audio is unavailable. */
  }
}

function InfoDialog({
  kind,
  history,
  onClose,
}: {
  kind: "guide" | "history";
  history: number[];
  onClose: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    ref.current?.showModal();
    const dialog = ref.current;
    const handleCancel = (event: Event) => {
      event.preventDefault();
      onClose();
    };
    dialog?.addEventListener("cancel", handleCancel);
    return () => dialog?.removeEventListener("cancel", handleCancel);
  }, [onClose]);
  return (
    <dialog
      ref={ref}
      className="info-dialog"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="dialog-heading">
        <span className="section-eyebrow">THE RAFSAN WORKSPACE</span>
        <IconButton label="Close dialog" onClick={onClose}>
          <X size={18} />
        </IconButton>
      </div>
      <h2>
        {kind === "guide" ? "Welcome aboard." : "A little flight history."}
      </h2>
      {kind === "guide" ? (
        <>
          <p className="dialog-intro">
            Your own compact Aviator companion. Everything you need, nothing in
            your way.
          </p>
          <div className="guide-step">
            <LockKeyhole />
            <div>
              <h3>Your panel, your key</h3>
              <p>
                Enter your assigned access key to unlock the panel. This local
                lock does not secure a real account.
              </p>
            </div>
          </div>
          <div className="guide-step">
            <MousePointer2 />
            <div>
              <h3>Make yourself comfortable</h3>
              <p>
                Drag the panel by its header. Minimize it, hide it, or fine-tune
                motion and sound in preferences.
              </p>
            </div>
          </div>
          <div className="guide-step">
            <Plane />
            <div>
              <h3>Explore a simulated flight</h3>
              <p>
                Generate random demo multipliers. These are not predictions and
                cannot indicate real game outcomes.
              </p>
            </div>
          </div>
          <div className="guide-step">
            <ExternalLink />
            <div>
              <h3>Bring your own background</h3>
              <p>
                Switch to Live website to load the supplied HGnice registration
                page. External sites may restrict embedding.
              </p>
            </div>
          </div>
          <div className="dialog-note">
            <ShieldCheck size={17} />
            <span>
              No real funds. No game connection. For demonstration only.
            </span>
          </div>
        </>
      ) : (
        <>
          <p className="dialog-intro">
            Recent multipliers from the local preview. No external game data is
            used.
          </p>
          <div className="history-table">
            <div className="history-table-head">
              <span>FLIGHT</span>
              <span>MULTIPLIER</span>
              <span>ENVIRONMENT</span>
            </div>
            {history.map((value, index) => (
              <div key={`${index}-${value}`}>
                <span>#{(8491 - index).toString().padStart(5, "0")}</span>
                <strong
                  className={
                    value >= 5
                      ? "text-purple"
                      : value >= 2
                        ? "text-green"
                        : "text-blue"
                  }
                >
                  {value.toFixed(2)}x
                </strong>
                <span>Local demo</span>
              </div>
            ))}
          </div>
        </>
      )}
      <button className="primary-button dialog-action" onClick={onClose}>
        Back to the flight deck <ArrowRight size={17} />
      </button>
    </dialog>
  );
}

function FlightArena({
  multiplier,
  flying,
  round,
  history,
  sound,
  onSound,
  onHistory,
  onExpand,
}: {
  multiplier: number;
  flying: boolean;
  round: number;
  history: number[];
  sound: boolean;
  onSound: () => void;
  onHistory: () => void;
  onExpand: () => void;
}) {
  return (
    <section className="arena" aria-label="Aviator simulation">
      <div className="round-history">
        <div className="history-values">
          {history.map((value, index) => (
            <button
              key={index}
              className={`history-value ${value >= 5 ? "violet" : value >= 2 ? "mint" : "blue"}`}
              onClick={onHistory}
              aria-label={`View flight history, ${value.toFixed(2)} times`}
            >
              {value.toFixed(2)}x
            </button>
          ))}
        </div>
        <IconButton label="View round history" onClick={onHistory}>
          <History size={17} />
        </IconButton>
      </div>
      <div className={`game-canvas ${flying ? "is-flying" : "is-waiting"}`}>
        <div className="canvas-top">
          <span>
            <ShieldCheck size={14} /> Provably a demo
          </span>
          <span>ROUND #{round.toString().padStart(5, "0")}</span>
        </div>
        <div className="canvas-grid" />
        <div className="flight-rays" />
        <svg
          className="flight-chart"
          viewBox="0 0 800 400"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <defs>
            <linearGradient
              id="flight-fill"
              x1="0"
              y1="120"
              x2="0"
              y2="400"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#ed4b49" stopOpacity=".23" />
              <stop offset="1" stopColor="#ed4b49" stopOpacity=".01" />
            </linearGradient>
            <linearGradient
              id="flight-stroke"
              x1="0"
              y1="360"
              x2="655"
              y2="115"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#7c2a32" />
              <stop offset="1" stopColor="#ff655a" />
            </linearGradient>
          </defs>
          <path
            d="M0 362C260 362 452 306 654 112V400H0V362Z"
            fill="url(#flight-fill)"
            className="chart-fill"
          />
          <path
            d="M0 362C260 362 452 306 654 112"
            stroke="url(#flight-stroke)"
            strokeWidth="3.5"
            fill="none"
            className="chart-curve"
          />
          <path
            d="M0 362C260 362 452 306 654 112"
            stroke="#ffb7a5"
            strokeOpacity=".8"
            strokeWidth="1.5"
            strokeDasharray="1 600"
            fill="none"
            className="chart-particle"
          />
          <circle
            cx="654"
            cy="112"
            r="5"
            fill="#ff7963"
            className="chart-endpoint"
          />
        </svg>
        <div className="main-aircraft">
          <Aircraft />
          <div className="aircraft-trail" />
        </div>
        <div className="multiplier-display">
          <span className="flight-status">
            <span className="status-dot" />
            {flying ? "THE SKY IS NOT THE LIMIT" : "PREPARING THE NEXT FLIGHT"}
          </span>
          <div className="main-multiplier">
            {flying ? multiplier.toFixed(2) : "Next"}
            <span>{flying ? "x" : " up"}</span>
          </div>
          <span className="multiplier-caption">
            {flying
              ? "A little higher. A little further."
              : "A new flight is about to begin."}
          </span>
        </div>
        <div className="canvas-axis">
          <span>0s</span>
          <span>5s</span>
          <span>10s</span>
          <span>15s</span>
          <span>20s</span>
        </div>
        <div className="canvas-bottom">
          <span className="simulation-label">
            <span /> SIMULATED FLIGHT
          </span>
          <div>
            <IconButton
              label={sound ? "Mute flight sound" : "Enable flight sound"}
              onClick={onSound}
            >
              {sound ? <Volume2 size={16} /> : <VolumeX size={16} />}
            </IconButton>
            <IconButton label="Expand flight arena" onClick={onExpand}>
              <Maximize2 size={15} />
            </IconButton>
          </div>
        </div>
      </div>
    </section>
  );
}

function PracticeControls({
  multiplier,
  flying,
  onNotice,
}: {
  multiplier: number;
  flying: boolean;
  onNotice: (message: string) => void;
}) {
  const [amount, setAmount] = useState(100);
  const [balance, setBalance] = useState(10000);
  const [stake, setStake] = useState<number | null>(null);
  const [autoCash, setAutoCash] = useState(false);
  const [autoValue, setAutoValue] = useState(2);
  useEffect(() => {
    if (stake !== null && autoCash && multiplier >= autoValue && flying) {
      const win = stake * autoValue;
      setBalance((value) => value + win);
      setStake(null);
      onNotice(`Auto cash out: +${win.toFixed(2)} demo credits.`);
    } else if (stake !== null && !flying) {
      setStake(null);
      onNotice(
        "Flight ended. Your practice stake was lost. No real money was used.",
      );
    }
  }, [autoCash, autoValue, flying, multiplier, onNotice, stake]);
  const placeBet = () => {
    if (stake !== null) {
      const win = stake * multiplier;
      setBalance((value) => value + win);
      setStake(null);
      onNotice(`Cashed out: +${win.toFixed(2)} demo credits. Nice flight!`);
      return;
    }
    if (!Number.isFinite(amount) || amount < 1 || amount > balance) {
      onNotice("Enter a stake between 1 and your available demo balance.");
      return;
    }
    setBalance((value) => value - amount);
    setStake(amount);
    onNotice("Practice flight joined. Cash out before the flight ends.");
  };
  return (
    <section
      className="practice-controls"
      aria-label="Practice flight controls"
    >
      <div className="practice-heading">
        <h3>
          Make a practice flight <span>DEMO</span>
        </h3>
        <span className="demo-balance">
          {balance.toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}{" "}
          <small>credits</small>
          <IconButton
            label="Reset demo balance"
            onClick={() => {
              setBalance(10000);
              setStake(null);
              onNotice("Demo balance reset to 10,000 credits.");
            }}
          >
            <RotateCcw size={13} />
          </IconButton>
        </span>
      </div>
      <div className="practice-inputs">
        <div className="stake-section">
          <label htmlFor="demo-stake">Stake amount</label>
          <div className="number-stepper">
            <button
              aria-label="Decrease stake"
              disabled={stake !== null}
              onClick={() => setAmount((value) => Math.max(1, value - 10))}
            >
              <Minus size={15} />
            </button>
            <input
              id="demo-stake"
              type="number"
              min="1"
              max={balance}
              value={amount}
              disabled={stake !== null}
              onChange={(event) => setAmount(Number(event.target.value))}
            />
            <button
              aria-label="Increase stake"
              disabled={stake !== null}
              onClick={() =>
                setAmount((value) => Math.min(balance, value + 10))
              }
            >
              <Plus size={15} />
            </button>
          </div>
        </div>
        <div className="autocash-section">
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={autoCash}
              onChange={(event) => setAutoCash(event.target.checked)}
            />
            Auto cash out
          </label>
          <div className={`auto-value ${autoCash ? "enabled" : ""}`}>
            <input
              aria-label="Auto cash out multiplier"
              type="number"
              min="1.1"
              max="100"
              step="0.1"
              value={autoValue}
              disabled={!autoCash}
              onChange={(event) =>
                setAutoValue(Math.max(1.1, Number(event.target.value)))
              }
            />
            <span>x</span>
          </div>
        </div>
        <button
          className={`bet-button ${stake !== null ? "cash-out" : ""}`}
          disabled={!flying}
          onClick={placeBet}
        >
          <Plane size={19} />
          <span>
            {stake !== null ? "Cash out" : "Place demo bet"}
            <small>
              {stake !== null
                ? `${(stake * multiplier).toFixed(2)} credits`
                : "No real money. Just a little altitude."}
            </small>
          </span>
          <ArrowUpRight size={18} />
        </button>
      </div>
    </section>
  );
}

function Activity({ onHistory }: { onHistory: () => void }) {
  return (
    <aside className="activity-rail">
      <div className="activity-heading">
        <h3>Flight activity</h3>
        <span className="live-tag">
          <span /> DEMO
        </span>
      </div>
      <div className="activity-tabs">
        <button className="active" onClick={onHistory}>
          All flights <span>128</span>
        </button>
        <button onClick={onHistory}>
          My history <ArrowUpRight size={12} />
        </button>
      </div>
      <div className="activity-columns">
        <span>PLAYER</span>
        <span>STAKE</span>
        <span>RETURN</span>
      </div>
      <div className="player-list">
        {DEMO_PLAYERS.map(([initials, name, stake, value, color], index) => (
          <div className="player-row" key={name}>
            <span
              className="player-avatar"
              style={{ color, background: `${color}15` }}
            >
              {initials}
            </span>
            <span className="player-name">
              {name}
              <small>Demo player</small>
            </span>
            <span className="player-stake">{stake}</span>
            <span className="player-return">{value}</span>
            <span
              className={`player-indicator ${index % 3 === 0 ? "warm" : ""}`}
            />
          </div>
        ))}
      </div>
      <div className="activity-footnote">
        <ShieldCheck size={14} />
        <span>Sample activity. No real players or funds.</span>
      </div>
    </aside>
  );
}

function FloatingPanel({
  sound,
  setSound,
  motionEnabled,
  setMotionEnabled,
}: {
  sound: boolean;
  setSound: (value: boolean) => void;
  motionEnabled: boolean;
  setMotionEnabled: (value: boolean) => void;
}) {
  const [visible, setVisible] = useState(true);
  const [minimized, setMinimized] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [preferences, setPreferences] = useState(false);
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<number | null>(null);
  const [history, setHistory] = useState<number[]>([]);
  const [speed, setSpeed] = useState<"normal" | "fast">("normal");
  const constraints = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dragControls = useDragControls();
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  useEffect(() => {
    const resetPosition = () => {
      x.set(0);
      y.set(0);
    };
    window.addEventListener("resize", resetPosition);
    return () => {
      window.removeEventListener("resize", resetPosition);
      if (timer.current) clearTimeout(timer.current);
    };
  }, [x, y]);

  useEffect(() => {
    const panel = panelRef.current;
    if (!panel || !visible) return;
    // Expanding a panel near an edge must not strand its controls offscreen.
    const keepInView = () => {
      const rect = panel.getBoundingClientRect();
      if (rect.bottom > innerHeight - 12)
        y.set(y.get() - (rect.bottom - innerHeight + 12));
      if (rect.top < 12) y.set(y.get() + 12 - rect.top);
    };
    const observer = new ResizeObserver(keepInView);
    observer.observe(panel);
    return () => observer.disconnect();
  }, [visible, y]);

  const unlock = (event: FormEvent) => {
    event.preventDefault();
    if (password === "big") {
      setUnlocked(true);
      setPassword("");
      setError("");
      if (sound) playChime();
    } else setError("That key is not quite right. Try again.");
  };
  const lock = () => {
    setUnlocked(false);
    setPassword("");
    setPreferences(false);
    setBusy(false);
    if (timer.current) clearTimeout(timer.current);
  };
  const simulate = () => {
    if (busy) return;
    setBusy(true);
    timer.current = setTimeout(
      () => {
        // Random local demo data, never a prediction of an external game.
        const random =
          crypto.getRandomValues(new Uint32Array(1))[0] / 4294967296;
        const value = Number((1.01 + random ** 2.2 * 11.49).toFixed(2));
        setResult(value);
        setHistory((old) => [value, ...old].slice(0, 4));
        setBusy(false);
        if (sound) playChime();
      },
      speed === "fast" ? 1300 : 2800,
    );
  };

  return (
    <div className="panel-drag-boundary" ref={constraints}>
      <AnimatePresence>
        {visible ? (
          <motion.aside
            ref={panelRef}
            key="floating-panel"
            className={`floating-panel ${minimized ? "minimized" : ""} ${unlocked ? "unlocked" : "locked"}`}
            aria-label="RAFSAN Aviator draggable panel"
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94 }}
            transition={{ duration: motionEnabled ? 0.45 : 0 }}
            style={{ x, y }}
            drag
            dragControls={dragControls}
            dragListener={false}
            dragConstraints={constraints}
            dragElastic={0}
            dragMomentum={false}
          >
            <header
              className="panel-header"
              tabIndex={0}
              aria-label="Move panel. Drag or use arrow keys."
              title="Drag to reposition, or focus and use arrow keys"
              onKeyDown={(event) => {
                if (
                  event.target !== event.currentTarget ||
                  !event.key.startsWith("Arrow")
                )
                  return;
                event.preventDefault();
                const rect = panelRef.current?.getBoundingClientRect();
                if (!rect) return;
                const step = event.shiftKey ? 30 : 10;
                if (event.key === "ArrowLeft")
                  x.set(x.get() - Math.min(step, rect.left - 12));
                if (event.key === "ArrowRight")
                  x.set(x.get() + Math.min(step, innerWidth - rect.right - 12));
                if (event.key === "ArrowUp")
                  y.set(y.get() - Math.min(step, rect.top - 12));
                if (event.key === "ArrowDown")
                  y.set(
                    y.get() + Math.min(step, innerHeight - rect.bottom - 12),
                  );
              }}
              onPointerDown={(event) => {
                if (!(event.target as HTMLElement).closest("button"))
                  dragControls.start(event);
              }}
            >
              <BrandMark small />
              <div className="panel-wordmark">
                <h2>
                  RAFSAN <span>AIR</span>
                </h2>
                <p>AVIATOR COMPANION</p>
              </div>
              <GripHorizontal className="drag-grip" size={16} />
              <div className="panel-window-controls">
                <IconButton
                  label={minimized ? "Expand panel" : "Minimize panel"}
                  onClick={() => setMinimized(!minimized)}
                >
                  {minimized ? <Maximize2 size={14} /> : <Minus size={16} />}
                </IconButton>
                <IconButton
                  label="Hide panel"
                  onClick={() => setVisible(false)}
                >
                  <X size={15} />
                </IconButton>
              </div>
            </header>
            <AnimatePresence initial={false}>
              {!minimized && (
                <motion.div
                  className="panel-expandable"
                  key="panel-content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: motionEnabled ? 0.25 : 0 }}
                >
                  <AnimatePresence mode="wait" initial={false}>
                    {preferences ? (
                      <motion.div
                        key="preferences"
                        className="panel-preferences"
                        initial={{ opacity: 0, x: 8 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -8 }}
                      >
                        <button
                          className="back-link"
                          onClick={() => setPreferences(false)}
                        >
                          <ChevronLeft size={15} /> Back to{" "}
                          {unlocked ? "flight deck" : "access"}
                        </button>
                        <span className="section-eyebrow">MAKE IT YOURS</span>
                        <h3>
                          Little details.
                          <br />
                          Better flights.
                        </h3>
                        <p className="preferences-intro">
                          Your workspace, just the way you like it.
                        </p>
                        <div className="preference-row">
                          <span>
                            <Sparkles size={17} />
                            <span>
                              Motion effects
                              <small>Orbits, trails & transitions</small>
                            </span>
                          </span>
                          <button
                            className={`switch ${motionEnabled ? "on" : ""}`}
                            role="switch"
                            aria-checked={motionEnabled}
                            aria-label="Motion effects"
                            onClick={() => setMotionEnabled(!motionEnabled)}
                          >
                            <span />
                          </button>
                        </div>
                        <div className="preference-row">
                          <span>
                            <Volume2 size={17} />
                            <span>
                              Flight sounds
                              <small>A soft chime on completion</small>
                            </span>
                          </span>
                          <button
                            className={`switch ${sound ? "on" : ""}`}
                            role="switch"
                            aria-checked={sound}
                            aria-label="Flight sounds"
                            onClick={() => {
                              setSound(!sound);
                              if (!sound) playChime();
                            }}
                          >
                            <span />
                          </button>
                        </div>
                        <button
                          className="reset-position"
                          onClick={() => {
                            x.set(0);
                            y.set(0);
                          }}
                        >
                          <RotateCcw size={15} /> Reset panel position{" "}
                          <ArrowUpRight size={14} />
                        </button>
                        <div className="preferences-note">
                          <ShieldCheck size={16} />
                          <span>
                            A local UI lock, not account security.
                            <br />
                            No data is sent to a server.
                          </span>
                        </div>
                      </motion.div>
                    ) : !unlocked ? (
                      <motion.div
                        key="locked"
                        className="panel-lock-body"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, y: -8 }}
                      >
                        <div className="lock-visual" aria-hidden="true">
                          <div className="orbit orbit-outer" />
                          <div className="orbit orbit-middle" />
                          <div className="orbit orbit-inner" />
                          <div className="orbit-track">
                            <span>
                              <Plane size={17} fill="currentColor" />
                            </span>
                          </div>
                          <div className="orbit-dot dot-one" />
                          <div className="orbit-dot dot-two" />
                          <span className="orbit-cross cross-one">+</span>
                          <span className="orbit-cross cross-two">+</span>
                          <div className="lock-core">
                            <LockKeyhole size={29} strokeWidth={1.6} />
                          </div>
                        </div>
                        <div className="private-caption">
                          <span /> YOUR PRIVATE FLIGHT DECK <span />
                        </div>
                        <h3>Your cockpit awaits.</h3>
                        <p className="lock-subtitle">
                          A little access. A whole new perspective.
                        </p>
                        <form onSubmit={unlock} className="unlock-form">
                          <label className="sr-only" htmlFor="panel-key">
                            Access key
                          </label>
                          <motion.div
                            className={`password-field ${error ? "has-error" : ""}`}
                            animate={
                              error ? { x: [0, -4, 4, -3, 3, 0] } : { x: 0 }
                            }
                            transition={{ duration: 0.3 }}
                          >
                            <LockKeyhole size={16} />
                            <input
                              id="panel-key"
                              type={showPassword ? "text" : "password"}
                              placeholder="Enter your access key"
                              value={password}
                              onChange={(event) => {
                                setPassword(event.target.value);
                                setError("");
                              }}
                              autoComplete="off"
                              aria-invalid={Boolean(error)}
                              aria-describedby="panel-key-error"
                              spellCheck={false}
                              required
                            />
                            <button
                              type="button"
                              aria-label={
                                showPassword
                                  ? "Hide access key"
                                  : "Show access key"
                              }
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              {showPassword ? (
                                <EyeOff size={17} />
                              ) : (
                                <Eye size={17} />
                              )}
                            </button>
                          </motion.div>
                          <div
                            className="password-error"
                            id="panel-key-error"
                            aria-live="polite"
                          >
                            {error}
                          </div>
                          <button
                            className="primary-button unlock-button"
                            type="submit"
                          >
                            Unlock panel <ArrowRight size={17} />
                          </button>
                        </form>
                        <div className="local-access-note">
                          <ShieldCheck size={12} />
                          <span>Personal access. Entirely on your device.</span>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="unlocked"
                        className="panel-flight-body"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                      >
                        <div className="flight-panel-status">
                          <span>
                            <span className="status-dot" />
                            {busy
                              ? "FLIGHT IN PROGRESS"
                              : "YOU ARE CLEARED FOR TAKEOFF"}
                          </span>
                          <Radio size={14} />
                        </div>
                        <div
                          className={`mini-flight ${busy ? "simulating" : ""}`}
                        >
                          <div className="mini-flight-grid" />
                          <span className="mini-flight-label">
                            SIMULATED MULTIPLIER
                          </span>
                          <div className="mini-flight-number">
                            {busy ? (
                              <span className="scanning-digits">...</span>
                            ) : result !== null ? (
                              result.toFixed(2)
                            ) : (
                              "--.--"
                            )}
                            <small>x</small>
                          </div>
                          <span className="mini-flight-caption">
                            {busy
                              ? "Preparing your local demo flight"
                              : result === null
                                ? "Your next adventure starts here"
                                : "A random result. Not a prediction."}
                          </span>
                          <svg
                            className="mini-flight-curve"
                            viewBox="0 0 280 110"
                            aria-hidden="true"
                          >
                            <defs>
                              <linearGradient
                                id="mini-fill"
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="110"
                                gradientUnits="userSpaceOnUse"
                              >
                                <stop stopColor="#f46a4d" stopOpacity=".15" />
                                <stop
                                  offset="1"
                                  stopColor="#f46a4d"
                                  stopOpacity="0"
                                />
                              </linearGradient>
                            </defs>
                            <path
                              d="M0 105C100 105 155 93 242 27V110H0Z"
                              fill="url(#mini-fill)"
                            />
                            <path
                              d="M0 105C100 105 155 93 242 27"
                              stroke="#f46a4d"
                              strokeWidth="1.5"
                              fill="none"
                            />
                          </svg>
                          <Plane
                            className="mini-flight-plane"
                            size={25}
                            fill="currentColor"
                          />
                          <div className="scan-line" />
                        </div>
                        <div className="simulation-speed">
                          <span>
                            <Gauge size={14} /> Flight speed
                          </span>
                          <div>
                            <button
                              className={speed === "normal" ? "active" : ""}
                              onClick={() => setSpeed("normal")}
                              disabled={busy}
                            >
                              Normal
                            </button>
                            <button
                              className={speed === "fast" ? "active" : ""}
                              onClick={() => setSpeed("fast")}
                              disabled={busy}
                            >
                              <Zap size={11} /> Fast
                            </button>
                          </div>
                        </div>
                        <button
                          className={`primary-button simulate-button ${busy ? "is-busy" : ""}`}
                          onClick={simulate}
                          disabled={busy}
                        >
                          {busy ? (
                            <>
                              <span className="button-spinner" /> Preparing
                              flight
                            </>
                          ) : (
                            <>
                              <Zap size={16} /> Simulate a flight{" "}
                              <ArrowRight size={16} />
                            </>
                          )}
                        </button>
                        <div className="panel-recent">
                          <div>
                            <span>YOUR RECENT FLIGHTS</span>
                            <History size={12} />
                          </div>
                          <div className="panel-recent-values">
                            {history.length ? (
                              history.map((value, index) => (
                                <motion.span
                                  key={`${value}-${index}`}
                                  initial={{ opacity: 0, y: 4 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  className={value >= 5 ? "high" : ""}
                                >
                                  {value.toFixed(2)}
                                  <small>x</small>
                                </motion.span>
                              ))
                            ) : (
                              <span className="no-flights">
                                Good things start with a first flight.
                              </span>
                            )}
                          </div>
                        </div>
                        <p className="simulation-warning">
                          <ShieldCheck size={12} /> Demo only. Cannot predict
                          real game outcomes.
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <footer className="panel-footer">
                    <button
                      className={`panel-lock-status ${unlocked ? "is-unlocked" : ""}`}
                      onClick={unlocked ? lock : undefined}
                      title={unlocked ? "Lock panel" : "Panel is locked"}
                    >
                      <span className="tiny-status-dot" />
                      {unlocked ? (
                        <>
                          <LockKeyhole size={11} /> Lock panel
                        </>
                      ) : (
                        "Waiting for your key"
                      )}
                    </button>
                    <div>
                      <span className="panel-version">v2.4</span>
                      <IconButton
                        label={
                          preferences
                            ? "Close panel preferences"
                            : "Panel preferences"
                        }
                        onClick={() => setPreferences(!preferences)}
                      >
                        <Settings2 size={14} />
                      </IconButton>
                    </div>
                  </footer>
                </motion.div>
              )}
            </AnimatePresence>
            {minimized && (
              <button
                className="minimized-state"
                onClick={() => setMinimized(false)}
              >
                <span className="tiny-status-dot" />
                {unlocked ? "Ready to fly" : "Access locked"}
                <ChevronDown size={13} />
              </button>
            )}
          </motion.aside>
        ) : (
          <motion.button
            key="panel-launcher"
            className="panel-launcher"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={() => {
              setVisible(true);
              x.set(0);
              y.set(0);
            }}
          >
            <BrandMark small />
            <span>
              RAFSAN <small>Open your flight deck</small>
            </span>
            <ArrowUpRight size={18} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function App() {
  const reducedMotion = useReducedMotion();
  const [motionEnabled, setMotionEnabled] = useState(!reducedMotion);
  const [sound, setSound] = useState(false);
  const [background, setBackground] = useState<"preview" | "live">("preview");
  const [liveLoaded, setLiveLoaded] = useState(false);
  const [liveDelayed, setLiveDelayed] = useState(false);
  const [frameVersion, setFrameVersion] = useState(0);
  const [roundTick, setRoundTick] = useState(32);
  const [round, setRound] = useState(8492);
  const [roundHistory, setRoundHistory] = useState(INITIAL_HISTORY);
  const [dialog, setDialog] = useState<"guide" | "history" | null>(null);
  const [toast, setToast] = useState("");
  const [expanded, setExpanded] = useState(false);
  const arenaRef = useRef<HTMLDivElement>(null);
  const flying = roundTick < 82;
  const multiplier = Math.pow(1.12, Math.min(roundTick, 81) / 4);

  useEffect(() => {
    const timer = setInterval(() => setRoundTick((value) => value + 1), 500);
    return () => clearInterval(timer);
  }, []);
  useEffect(() => {
    if (roundTick >= 94) {
      setRoundHistory((old) =>
        [Number(Math.pow(1.12, 81 / 4).toFixed(2)), ...old].slice(0, 10),
      );
      setRound((value) => value + 1);
      setRoundTick(0);
    }
  }, [roundTick]);
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(""), 5000);
      return () => clearTimeout(timer);
    }
  }, [toast]);
  useEffect(() => {
    if (background === "live" && !liveLoaded) {
      const timer = setTimeout(() => setLiveDelayed(true), 11000);
      return () => clearTimeout(timer);
    }
  }, [background, liveLoaded, frameVersion]);
  useEffect(() => {
    const handler = () => {
      if (!document.fullscreenElement) setExpanded(false);
    };
    document.addEventListener("fullscreenchange", handler);
    return () => document.removeEventListener("fullscreenchange", handler);
  }, []);
  const expandArena = async () => {
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
        setExpanded(false);
      } else {
        await arenaRef.current?.requestFullscreen();
        setExpanded(true);
      }
    } catch {
      setToast(
        "Fullscreen is unavailable in this browser. The flight deck is already responsive.",
      );
    }
  };

  return (
    <div
      className={`app-shell ${!motionEnabled ? "motion-paused" : ""} ${background === "live" ? "live-background" : ""}`}
    >
      <header className="topbar">
        <a
          className="main-brand"
          href="#"
          aria-label="RAFSAN Flight deck"
          onClick={(event) => {
            event.preventDefault();
            setBackground("preview");
          }}
        >
          <BrandMark />
          <span>
            RAFSAN<small>YOUR PERSONAL FLIGHT DECK</small>
          </span>
        </a>
        <nav className="top-navigation" aria-label="Main navigation">
          <button className="active" onClick={() => setBackground("preview")}>
            Flight deck
          </button>
          <button onClick={() => setDialog("history")}>Flight history</button>
          <button onClick={() => setDialog("guide")}>
            How it works <ArrowUpRight size={12} />
          </button>
        </nav>
        <div className="topbar-right">
          <div className="background-switch" aria-label="Background mode">
            <button
              className={background === "preview" ? "active" : ""}
              onClick={() => setBackground("preview")}
            >
              <LayoutGrid size={13} /> Preview
            </button>
            <button
              className={background === "live" ? "active" : ""}
              onClick={() => {
                if (background !== "live") {
                  setLiveLoaded(false);
                  setLiveDelayed(false);
                  setBackground("live");
                }
              }}
            >
              Live website <ArrowUpRight size={13} />
            </button>
          </div>
          <span className="profile-avatar" title="Personal demo workspace">
            R<span />
          </span>
        </div>
      </header>
      <div className="workspace">
        <aside className="sidebar">
          <div>
            <button
              className="sidebar-button active"
              aria-label="Aviator flight deck"
              title="Aviator flight deck"
              onClick={() => setBackground("preview")}
            >
              <Plane size={22} />
              <span>Aviator</span>
            </button>
            <button
              className="sidebar-button"
              aria-label="Flight activity"
              title="Flight activity"
              onClick={() => setDialog("history")}
            >
              <AudioLines size={21} />
              <span>Activity</span>
            </button>
            <button
              className="sidebar-button"
              aria-label="Workspace guide"
              title="Workspace guide"
              onClick={() => setDialog("guide")}
            >
              <CircleHelp size={21} />
              <span>Guide</span>
            </button>
          </div>
          <div className="sidebar-bottom">
            <button
              className="sidebar-button"
              aria-label={sound ? "Mute sound" : "Enable sound"}
              title={sound ? "Mute sound" : "Enable sound"}
              onClick={() => {
                setSound(!sound);
                if (!sound) playChime();
              }}
            >
              {sound ? <Volume2 size={19} /> : <VolumeX size={19} />}
            </button>
            <button
              className="sidebar-button"
              aria-label="Help and support"
              title="Help and support"
              onClick={() => setDialog("guide")}
            >
              <Headphones size={20} />
            </button>
            <span className="sidebar-divider" />
            <span className="sidebar-avatar">R</span>
          </div>
        </aside>
        <main className="main-content">
          {background === "preview" ? (
            <motion.div
              key="preview"
              className="preview-content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.35 }}
            >
              <div className="page-heading">
                <div>
                  <div className="breadcrumb">
                    YOUR WORKSPACE <span>/</span> THE FLIGHT DECK
                  </div>
                  <div className="aviator-title">
                    <Plane size={31} fill="currentColor" />
                    <h1>
                      Aviator<span>.</span>
                    </h1>
                    <span className="edition-label">A NEW PERSPECTIVE</span>
                  </div>
                </div>
                <div className="heading-actions">
                  <span className="preview-mode">
                    <span /> PRACTICE ENVIRONMENT
                  </span>
                  <button onClick={() => setDialog("guide")}>
                    <CircleHelp size={15} /> Quick guide
                  </button>
                </div>
              </div>
              <div className="game-layout">
                <div className="game-column">
                  <div
                    ref={arenaRef}
                    className={expanded ? "expanded-arena" : ""}
                  >
                    <FlightArena
                      multiplier={multiplier}
                      flying={flying}
                      round={round}
                      history={roundHistory}
                      sound={sound}
                      onSound={() => {
                        setSound(!sound);
                        if (!sound) playChime();
                      }}
                      onHistory={() => setDialog("history")}
                      onExpand={expandArena}
                    />
                  </div>
                  <PracticeControls
                    multiplier={multiplier}
                    flying={flying}
                    onNotice={setToast}
                  />
                  <div className="workspace-disclaimer">
                    <ShieldCheck size={16} />
                    <p>
                      A space to explore, not a promise to predict.
                      <br />
                      <span>
                        All flights and credits in this preview are simulated.
                      </span>
                    </p>
                    <button onClick={() => setDialog("guide")}>
                      Good to know <ArrowUpRight size={13} />
                    </button>
                  </div>
                </div>
                <Activity onHistory={() => setDialog("history")} />
              </div>
              <footer className="workspace-footer">
                <span>
                  <span className="tiny-status-dot" /> A clear runway. Your own
                  pace.
                </span>
                <span>
                  DESIGNED TO STAY OUT OF YOUR WAY <Plane size={13} />
                </span>
              </footer>
            </motion.div>
          ) : (
            <section
              className="live-site-container"
              aria-label="Live HGnice website background"
            >
              <div className="live-site-toolbar">
                <span>
                  <span className="status-dot" /> hgnice.biz{" "}
                  <span className="live-address-path">/ register</span>
                </span>
                <div>
                  <span className="external-site-label">EXTERNAL WEBSITE</span>
                  <IconButton
                    label="Reload live website"
                    onClick={() => {
                      setLiveLoaded(false);
                      setLiveDelayed(false);
                      setFrameVersion((value) => value + 1);
                    }}
                  >
                    <RotateCcw size={15} />
                  </IconButton>
                  <a
                    href={LIVE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Open HGnice in a new tab"
                  >
                    <ExternalLink size={15} />
                  </a>
                </div>
              </div>
              {!liveLoaded && (
                <div className="live-loading">
                  <span className="button-spinner" />
                  <h2>
                    {liveDelayed
                      ? "The site is taking a little longer."
                      : "Bringing your background on board."}
                  </h2>
                  <p>
                    {liveDelayed
                      ? "Some external websites limit embedded access."
                      : "Connecting to the supplied HGnice website..."}
                  </p>
                  {liveDelayed && (
                    <a
                      className="primary-button"
                      href={LIVE_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Open website in a new tab <ExternalLink size={16} />
                    </a>
                  )}
                </div>
              )}
              <iframe
                key={frameVersion}
                src={LIVE_URL}
                title="HGnice live registration website"
                className={liveLoaded ? "loaded" : ""}
                onLoad={() => setLiveLoaded(true)}
                onError={() => setLiveDelayed(true)}
                allow="fullscreen"
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox allow-downloads"
                referrerPolicy="strict-origin-when-cross-origin"
              />
              <div className="live-site-note">
                <ShieldCheck size={13} />
                <span>
                  External website. RAFSAN does not read game data or predict
                  outcomes.
                </span>
                <button onClick={() => setBackground("preview")}>
                  Back to preview <ArrowRight size={13} />
                </button>
              </div>
            </section>
          )}
        </main>
      </div>
      <FloatingPanel
        sound={sound}
        setSound={setSound}
        motionEnabled={motionEnabled}
        setMotionEnabled={setMotionEnabled}
      />
      <AnimatePresence>
        {toast && (
          <motion.div
            className="toast"
            role="status"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
          >
            <span className="toast-icon">
              <Check size={15} />
            </span>
            <span>{toast}</span>
            <IconButton
              label="Dismiss notification"
              onClick={() => setToast("")}
            >
              <X size={15} />
            </IconButton>
          </motion.div>
        )}
      </AnimatePresence>
      {dialog && (
        <InfoDialog
          kind={dialog}
          history={roundHistory}
          onClose={() => setDialog(null)}
        />
      )}
    </div>
  );
}
