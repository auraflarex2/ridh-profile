"use client";

import { FormEvent, useState } from "react";

type Block = {
  start: string;
  end: string;
  activity: string;
  category: string;
  priority: "high" | "medium" | "low";
  reason: string;
};

type Day = { day: string; date: string; blocks: Block[] };

type Plan = {
  goal_summary: string;
  success_definition: string;
  weekly_focus: string;
  risk_notes: string[];
  schedule: Day[];
};

export default function Home() {
  const [form, setForm] = useState({
    goal: "",
    deadline: "",
    currentLevel: "",
    targetLevel: "",
    fixedSchedule: "",
    dailyHours: "3"
  });
  const [plan, setPlan] = useState<Plan | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function submit(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError("");
    setPlan(null);

    try {
      const res = await fetch("/api/plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, dailyHours: Number(form.dailyHours), timezone: "Asia/Kolkata" })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Something went wrong.");
      setPlan(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="shell">
      <nav className="nav">
        <div className="brand">Aura<span>Mind</span></div>
        <div className="pill">AI Accountability Engine · V1</div>
      </nav>

      <section className="hero">
        <div className="kicker">Plan your real life</div>
        <h1>Your goal deserves a system, not another motivational quote.</h1>
        <p>
          AuraMind turns a real goal, real timetable and real starting level into an
          adaptive 7-day plan. The next layer will log every hour, detect distraction
          patterns and produce daily and weekly accountability reports.
        </p>
      </section>

      <section className="grid">
        <div className="card">
          <h2>Create a goal</h2>
          <p className="muted">This is the information AuraMind needs to build the first plan.</p>

          <form onSubmit={submit} className="formgrid">
            <label className="full">
              Goal
              <input required value={form.goal} onChange={e => setForm({ ...form, goal: e.target.value })} placeholder="Example: Score 85% in Class 10 boards" />
            </label>

            <label>
              Deadline
              <input required type="date" value={form.deadline} onChange={e => setForm({ ...form, deadline: e.target.value })} />
            </label>

            <label>
              Current level
              <input required value={form.currentLevel} onChange={e => setForm({ ...form, currentLevel: e.target.value })} placeholder="Example: Maths foundation is weak" />
            </label>

            <label>
              Target level
              <input required value={form.targetLevel} onChange={e => setForm({ ...form, targetLevel: e.target.value })} placeholder="Example: 70+ in boards" />
            </label>

            <label>
              Free hours per day
              <select value={form.dailyHours} onChange={e => setForm({ ...form, dailyHours: e.target.value })}>
                {[1,2,3,4,5,6].map(x => <option key={x} value={x}>{x} hours</option>)}
              </select>
            </label>

            <label className="full">
              Fixed commitments
              <textarea value={form.fixedSchedule} onChange={e => setForm({ ...form, fixedSchedule: e.target.value })} placeholder={"School: 7:30 AM–2:00 PM
Tuition: 4:00 PM–6:00 PM
Sleep: 11:00 PM–6:30 AM"} />
            </label>

            <div className="full">
              <button className="btn" disabled={loading}>{loading ? "AuraMind is building your plan…" : "Generate my 7-day plan"}</button>
            </div>
          </form>

          {error && <div className="error">{error}</div>}
        </div>

        <div className="card">
          <h2>How AuraMind thinks</h2>
          <div className="notice">1. Goal → milestone structure</div>
          <div className="notice">2. Milestones → realistic weekly workload</div>
          <div className="notice">3. Workload → hourly schedule around commitments</div>
          <div className="notice">4. Actual behavior → distraction + failure analysis</div>
          <div className="notice">5. Weekly patterns → next week's improved plan</div>
        </div>
      </section>

      {plan && (
        <section className="card" style={{ marginTop: 20 }}>
          <h2>Generated AuraMind plan</h2>
          <p className="muted">{plan.goal_summary}</p>

          <div className="stats">
            <div className="stat"><span className="muted">Success definition</span><strong>Locked</strong></div>
            <div className="stat"><span className="muted">Days planned</span><strong>{plan.schedule.length}</strong></div>
            <div className="stat"><span className="muted">Focus</span><strong>Adaptive</strong></div>
          </div>

          <div className="notice"><strong>Success condition:</strong> {plan.success_definition}</div>
          <div className="notice"><strong>Weekly focus:</strong> {plan.weekly_focus}</div>

          <div className="timeline">
            {plan.schedule.map(day => (
              <div className="card" key={day.date}>
                <h2>{day.day} · {day.date}</h2>
                {day.blocks.map((block, i) => (
                  <div className="block" key={i}>
                    <div className="time">{block.start}–{block.end}</div>
                    <div>
                      <strong>{block.activity}</strong>
                      <div className="muted">{block.reason}</div>
                    </div>
                    <div className="tag">{block.priority} · {block.category}</div>
                  </div>
                ))}
              </div>
            ))}
          </div>

          <div className="notice">
            <strong>Risk notes:</strong> {plan.risk_notes.join(" · ")}
          </div>
        </section>
      )}

      <div className="footer">AuraMind V1 · Goal planning first. Accountability engine next.</div>
    </main>
  );
}
