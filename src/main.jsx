import React, {useEffect, useMemo, useState} from "react";
import {createRoot} from "react-dom/client";
import {
  Activity, Brain, CircleCheck, CircleAlert, Footprints, Gauge, HeartPulse,
  Play, Pause, RotateCcw, ShieldCheck, Video, UserRound, TrendingDown,
  TrendingUp, Info, FileText, Printer, Copy, Check, X, Stethoscope, Sparkles,
  Clock, ChevronRight, ArrowRight
} from "lucide-react";
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend} from "recharts";
import "./styles.css";

const profiles = [
 {
   id:"A", name:"Demo Patient A", label:"Healthy / Low-risk pattern", risk:"LOW", color:"green",
   clinicalFocus: "Preventive conditioning & baseline maintenance",
   urgency: "ROUTINE SURVEILLANCE",
   urgencyTone: "green",
   timeline: "12 Months (Annual Surveillance)",
   pathway: "Preventive Joint Health & Active Maintenance",
   trendBadge: { label: "STABLE BASELINE", tone: "green" },
   trendSummary: "Consistently optimal knee range of motion (123°–126°) and zero reported pain across 4 consecutive longitudinal visits.",
   history: [
     { session: "S1 (12m ago)", rom: 124, pain: 0 },
     { session: "S2 (8m ago)", rom: 126, pain: 0 },
     { session: "S3 (4m ago)", rom: 123, pain: 0 },
     { session: "S4 (Current)", rom: 125, pain: 0 }
   ],
   wearable:{rom:125,flexion:62,velocity:190,variability:3,asymmetry:3,smooth:"High",flexSensor:120,imuAgreement:"Good"},
   q:{pain:0,stiffness:"None",stairs:"None",standing:"None",swelling:"No"},
   video:{knee:"Normal",gait:"Good",trunk:"Not detected",hesitation:"Not detected"},
   domains:[
    ["Knee Mobility","Normal","Low","ROM and movement velocity are within this simulated reference pattern."],
    ["Gait Quality","Normal","Low","Low stride variability and smooth movement are observed."],
    ["Loading Pattern","Normal","Low","Foot-loading asymmetry is minimal in this simulated session."],
    ["Functional Performance","Normal","Low","No meaningful functional limitation is represented."],
    ["Symptom Burden","Low","Low","No meaningful pain or stiffness is reported."],
    ["Sensor Reliability","Good","Low","IMU and flex-sensor estimates are reasonably consistent."]
   ],
   recommendation:"Continue routine monitoring; no escalation is indicated by this simulated profile.",
   briefAdvice:"Maintain current joint health. Continue regular low-impact aerobic exercise (walking, swimming, cycling) and core/quadriceps strengthening. Keep well hydrated, wear shock-absorbing footwear, and repeat screening annually as part of wellness monitoring.",
   actionSteps:[
     { title: "Active Aerobic Conditioning", desc: "Maintain low-impact exercises (walking, cycling, swimming) to stimulate synovial fluid circulation." },
     { title: "Annual Surveillance Protocol", desc: "Schedule digital screening re-check in 12 months, or sooner if unexpected swelling occurs." },
     { title: "Kinematic Alignment Maintenance", desc: "Retain symmetric bilateral foot loading and full 125° knee flexion with regular stretching." }
   ]
 },
 {
   id:"B", name:"Demo Patient B", label:"Mild mobility limitation", risk:"LOW–MODERATE", color:"yellow",
   clinicalFocus: "Early load management & active mobility restoration",
   urgency: "EARLY CONSERVATIVE CARE",
   urgencyTone: "yellow",
   timeline: "4–6 Weeks",
   pathway: "Primary Care Load Management & Motion Optimization",
   trendBadge: { label: "MILD MOBILITY LOSS", tone: "yellow" },
   trendSummary: "Gradual 10° reduction in flexion and emergence of mild stair discomfort (VAS 1 → 3) over the past 8 months.",
   history: [
     { session: "S1 (12m ago)", rom: 122, pain: 1 },
     { session: "S2 (8m ago)", rom: 119, pain: 1 },
     { session: "S3 (4m ago)", rom: 115, pain: 2 },
     { session: "S4 (Current)", rom: 112, pain: 3 }
   ],
   wearable:{rom:112,flexion:55,velocity:155,variability:7,asymmetry:9,smooth:"Moderate",flexSensor:108,imuAgreement:"Good"},
   q:{pain:3,stiffness:"<15 min",stairs:"Mild",standing:"None",swelling:"No"},
   video:{knee:"Slightly reduced",gait:"Mild asymmetry",trunk:"Not detected",hesitation:"Mild"},
   domains:[
    ["Knee Mobility","Mild limitation","Medium","ROM and peak flexion are reduced relative to the simulated healthy pattern."],
    ["Gait Quality","Mildly altered","Medium","Small increases in gait variability and reduced smoothness are present."],
    ["Loading Pattern","Mild asymmetry","Medium","Foot-loading asymmetry is elevated in this simulated session."],
    ["Functional Performance","Mild limitation","Medium","Mild stair difficulty is reported."],
    ["Symptom Burden","Mild","Low","Pain is present but symptom burden remains limited."],
    ["Sensor Reliability","Good","Low","Sensor agreement is acceptable for this simulated session."]
   ],
   recommendation:"Monitor the pattern and consider repeat screening if symptoms persist or increase.",
   briefAdvice:"Adopt early conservative management. Integrate gentle knee range-of-motion stretches and quad/hamstring strengthening exercises 3-4 times weekly. Avoid prolonged standing or sudden high-impact joint loading. Re-screen in 4–6 weeks to track if mobility stabilizes.",
   actionSteps:[
     { title: "Targeted Quadriceps Strengthening", desc: "Perform non-impact closed-kinetic chain exercises (straight-leg raises, wall sits) 3x weekly." },
     { title: "Short-Term Digital Re-Screening", desc: "Repeat wearable kinematics check in 4–6 weeks to confirm whether ROM loss has halted." },
     { title: "Activity & Impact Modification", desc: "Pace stair descent, avoid prolonged unassisted standing, and apply warm compresses for morning stiffness." }
   ]
 },
 {
   id:"C", name:"Demo Patient C", label:"Moderate-risk pattern", risk:"MODERATE", color:"orange",
   clinicalFocus: "Targeted physical therapy & biomechanical alignment",
   urgency: "ACTIVE INTERVENTION",
   urgencyTone: "orange",
   timeline: "2–3 Weeks",
   pathway: "Supervised Physical Therapy & Kinetic Offloading",
   trendBadge: { label: "MODERATE PROGRESSION", tone: "orange" },
   trendSummary: "Progressive loss of knee range of motion (116° → 101°) and escalation in morning stiffness and joint pain.",
   history: [
     { session: "S1 (12m ago)", rom: 116, pain: 2 },
     { session: "S2 (8m ago)", rom: 111, pain: 3 },
     { session: "S3 (4m ago)", rom: 106, pain: 4 },
     { session: "S4 (Current)", rom: 101, pain: 5 }
   ],
   wearable:{rom:101,flexion:48,velocity:130,variability:11,asymmetry:15,smooth:"Reduced",flexSensor:96,imuAgreement:"Acceptable"},
   q:{pain:5,stiffness:"15–30 min",stairs:"Moderate",standing:"Mild",swelling:"No"},
   video:{knee:"Reduced",gait:"Moderate asymmetry",trunk:"Mild",hesitation:"Mild"},
   domains:[
    ["Knee Mobility","Moderately reduced","High","Reduced ROM, peak flexion and angular velocity form a mobility-limitation pattern."],
    ["Gait Quality","Altered","Medium","Stride variability and reduced smoothness are elevated."],
    ["Loading Pattern","Moderate asymmetry","Medium","The simulated feet show a more pronounced loading imbalance."],
    ["Functional Performance","Reduced","Medium","Moderate stair difficulty and mild standing difficulty are reported."],
    ["Symptom Burden","Moderate","Medium","Pain and morning stiffness are more prominent."],
    ["Sensor Reliability","Acceptable","Medium","The flex sensor differs from the IMU-derived estimate; interpret cautiously."]
   ],
   recommendation:"If this pattern persists or worsens, consider re-screening or clinical review.",
   briefAdvice:"Initiate targeted physical therapy. Consult a physical therapist for kinetic-chain strengthening, joint offloading, and gait retraining to correct the 15% loading imbalance. Use ergonomic aids when climbing stairs, apply warm compresses for morning stiffness, and monitor for joint swelling.",
   actionSteps:[
     { title: "Supervised Physical Therapy Referral", desc: "Engage a physical therapist for personalized joint offloading, quad restoration, and gait retraining." },
     { title: "Foot-Loading Asymmetry Correction", desc: "Address 15% loading imbalance using cushioned footwear or corrective footbed orthotics." },
     { title: "Symptom Logging & Flare Protocol", desc: "Log daily stiffness duration; escalate promptly if rest pain or persistent joint warmth emerges." }
   ]
 },
 {
   id:"D", name:"Demo Patient D", label:"Higher-risk / worsening pattern", risk:"HIGHER", color:"red",
   clinicalFocus: "Specialist clinical review & diagnostic investigation",
   urgency: "PRIORITY SPECIALIST REVIEW",
   urgencyTone: "red",
   timeline: "Within 1–2 Weeks",
   pathway: "Specialist Orthopedic Consultation & Radiographic Workup",
   trendBadge: { label: "ACCELERATED WORSENING", tone: "red" },
   trendSummary: "Steep multi-month joint restriction (ROM 108° → 89°) paired with sharp escalation in daily resting pain (VAS 4 → 7).",
   history: [
     { session: "S1 (12m ago)", rom: 108, pain: 4 },
     { session: "S2 (8m ago)", rom: 101, pain: 5 },
     { session: "S3 (4m ago)", rom: 95, pain: 6 },
     { session: "S4 (Current)", rom: 89, pain: 7 }
   ],
   wearable:{rom:89,flexion:40,velocity:100,variability:17,asymmetry:24,smooth:"Low",flexSensor:81,imuAgreement:"Check"},
   q:{pain:7,stiffness:">30 min",stairs:"Severe",standing:"Moderate",swelling:"Yes"},
   video:{knee:"Clearly reduced",gait:"Significant asymmetry",trunk:"Present",hesitation:"Present"},
   domains:[
    ["Knee Mobility","Significant limitation","High","Restricted ROM, lower peak flexion and slower movement form a substantial mobility-limitation pattern."],
    ["Gait Quality","Significantly altered","High","High gait variability and low movement smoothness are represented."],
    ["Loading Pattern","High asymmetry","High","Marked simulated foot-loading asymmetry is present."],
    ["Functional Performance","Reduced","High","Severe stair difficulty and moderate standing difficulty are reported."],
    ["Symptom Burden","High","High","Pain, prolonged stiffness and swelling are reported."],
    ["Sensor Reliability","Check","High","Flex-sensor and IMU estimates differ more substantially; hardware placement should be checked."]
   ],
   recommendation:"Persistent or worsening findings may warrant re-screening or clinical review. This prototype does not diagnose OA.",
   briefAdvice:"Schedule a formal clinical consultation with an orthopedic specialist or rheumatologist. Clinical examination and diagnostic imaging (X-ray or MRI) are recommended to evaluate structural knee changes. Avoid unassisted stair navigation, consider temporary joint offloading (e.g. brace/cane), and discuss anti-inflammatory therapies.",
   actionSteps:[
     { title: "Orthopedic Specialist Evaluation", desc: "Formal clinical knee examination to assess structural cartilage deterioration and joint effusion." },
     { title: "Diagnostic Imaging Workup", desc: "Order bilateral weight-bearing knee radiographs (AP & lateral) to measure joint space narrowing." },
     { title: "Assisted Unloading & Medical Therapy", desc: "Deploy unloader knee brace / cane for stair negotiation; discuss guided anti-inflammatory management." }
   ]
 }
];

const clamp = (x, a, b) => Math.max(a, Math.min(b, x));
function seedFor(p) { return p.wearable; }
function dynamicValues(p, t) {
  const s = seedFor(p), wave = Math.sin(t * 0.18), wave2 = Math.sin(t * 0.31);
  const rom = clamp(s.rom + wave * 2.5, 0, 180);
  const kneeAngle = clamp(s.flexion + Math.sin(t * 0.28) * 7 + 10, 0, 150);
  return {
    thighGyro: (s.velocity / 2 + wave * 18).toFixed(1),
    shankGyro: (s.velocity / 2.2 + wave2 * 16).toFixed(1),
    thighAccel: (1.0 + wave * 0.25).toFixed(2),
    shankAccel: (1.1 + wave2 * 0.25).toFixed(2),
    kneeAngle: kneeAngle.toFixed(1),
    rom: rom.toFixed(1),
    flex: (s.flexSensor + wave2 * 2).toFixed(1),
    leftFsr: clamp(50 + wave * 12 + s.asymmetry / 3, 0, 100).toFixed(1),
    rightFsr: clamp(50 - wave * 10 - s.asymmetry / 3, 0, 100).toFixed(1)
  };
}

function badgeClass(text) {
  const x = text.toLowerCase();
  if (x.includes("normal") || x === "low" || x === "good") return "good";
  if (x.includes("high") || x.includes("significant") || x.includes("check")) return "bad";
  return "warn";
}

function App() {
  const [idx, setIdx] = useState(0);
  const [running, setRunning] = useState(false);
  const [t, setT] = useState(0);
  const [deteriorating, setDeteriorating] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [copied, setCopied] = useState(false);

  const p = profiles[idx];

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setT(x => x + 1), 220);
    return () => clearInterval(id);
  }, [running]);

  useEffect(() => {
    if (deteriorating) {
      let n = 0;
      const id = setInterval(() => {
        n++;
        setIdx(Math.min(3, Math.floor(n / 8)));
        if (n >= 31) {
          clearInterval(id);
          setDeteriorating(false);
        }
      }, 350);
      return () => clearInterval(id);
    }
  }, [deteriorating]);

  const v = useMemo(() => dynamicValues(p, t), [p, t]);
  const riskTone = p.risk === "LOW" ? "green" : p.risk.includes("MODERATE") ? "orange" : "red";

  const handleCopyReport = () => {
    const text = `====================================
JOINTRACK CLINICAL SCREENING SUMMARY REPORT
====================================
Patient: ${p.name} (ID: ${p.id})
Profile: ${p.label}
Risk Category: ${p.risk}
Clinical Focus: ${p.clinicalFocus}
Urgency / Review: ${p.urgency} (Timeline: ${p.timeline})
Pathway: ${p.pathway}

LONGITUDINAL TRAJECTORY:
Status: ${p.trendBadge.label}
Summary: ${p.trendSummary}
History:
${p.history.map(h => `- ${h.session}: ROM ${h.rom}°, Pain ${h.pain}/10`).join("\n")}

BIOMECHANICAL INDICATORS:
- Knee ROM: ${p.wearable.rom}° (Peak Flexion: ${p.wearable.flexion}°)
- Angular Velocity: ${p.wearable.velocity} °/s
- Gait Variability: ${p.wearable.variability}%
- Foot-Loading Asymmetry: ${p.wearable.asymmetry}%
- Motion Smoothness: ${p.wearable.smooth}
- Sensor Agreement: ${p.wearable.imuAgreement}

PATIENT-REPORTED SYMPTOMS:
- Pain: ${p.q.pain}/10
- Morning Stiffness: ${p.q.stiffness}
- Stair Difficulty: ${p.q.stairs}
- Standing Difficulty: ${p.q.standing}
- Swelling: ${p.q.swelling}

OBSERVED GAIT (SIMULATED):
- Knee Flexion: ${p.video.knee}
- Gait Symmetry: ${p.video.gait}
- Trunk Compensation: ${p.video.trunk}
- Hesitation: ${p.video.hesitation}

BRIEF CLINICAL ADVICE:
${p.briefAdvice}

RECOMMENDED NEXT STEP:
${p.recommendation}

ACTION PROTOCOL:
${p.actionSteps.map((s, i) => `${i + 1}. ${s.title}: ${s.desc}`).join("\n")}

Disclaimer: JoinTrack is an experimental screening & monitoring prototype, not a clinical diagnostic device.
====================================`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="app">
      <header className="top">
        <div>
          <div className="brand">JoinTrack <span>Virtual Evaluation Engine</span></div>
          <div className="subtitle">Wearable + patient-reported + video observation simulation</div>
        </div>
        <div className="demoPill"><span className="dot"/> VIRTUAL SENSOR MODE</div>
      </header>

      <main>
        <section className="hero">
          <div>
            <div className="eyebrow">SCREENING PROTOTYPE</div>
            <h1>From sensor signals to an explainable risk profile.</h1>
            <p>JoinTrack converts simulated wearable measurements into calculated biomechanical features, combines them with pre-filled patient information and simulated video observations, then evaluates multiple domains.</p>
          </div>
          <div className="architecture">
            <b>INPUTS</b>
            <div className="flow">
              <span>Wearable</span><i>→</i><span>Feature extraction</span><i>→</i><span>Evaluation engine</span><i>→</i><span>Risk profile</span>
            </div>
            <small>Measured → Calculated → Evaluated → Interpreted</small>
          </div>
        </section>

        <section className="profiles">
          {profiles.map((x, i) => (
            <button
              className={`profileBtn ${i === idx ? "selected" : ""}`}
              onClick={() => { setIdx(i); setRunning(false); }}
              key={x.id}
            >
              <div className={`avatar ${x.color}`}>{x.id}</div>
              <div>
                <b>{x.name}</b>
                <small>{x.label}</small>
              </div>
              <strong className={x.color}>{x.risk}</strong>
            </button>
          ))}
        </section>

        <div className="controls">
          <button className="primary" onClick={() => setRunning(x => !x)}>
            {running ? <Pause size={16}/> : <Play size={16}/>} {running ? "Pause" : "Start Simulation"}
          </button>
          <button onClick={() => { setT(0); setRunning(false); }}>
            <RotateCcw size={16}/> Reset
          </button>
          <button className="btnReport" onClick={() => setShowReport(true)}>
            <FileText size={16}/> Generate Report
          </button>
          <button className="deteriorate" onClick={() => { setDeteriorating(true); setRunning(true); }}>
            <TrendingDown size={16}/> Simulate Deterioration
          </button>
        </div>

        <div className="grid2">
          <section className="card">
            <div className="cardHead">
              <div><span className="sectionTag">MEASURED</span><h2>Virtual Wearable</h2></div>
              <span className="live"><span className="dot"/> LIVE</span>
            </div>
            <div className="sensorGrid">
              <Sensor title="IMU #1 · THIGH" icon={<Activity/>} rows={[["Gyro Y", v.thighGyro + " °/s"], ["Accel magnitude", v.thighAccel + " g"]]} />
              <Sensor title="IMU #2 · SHANK" icon={<Activity/>} rows={[["Gyro Y", v.shankGyro + " °/s"], ["Accel magnitude", v.shankAccel + " g"]]} />
              <Sensor title="FLEX · KNEE" icon={<Gauge/>} rows={[["Estimate", v.flex + "°"], ["Role", "Secondary"]]} />
              <Sensor title="FSR · FEET" icon={<Footprints/>} rows={[["Left load", v.leftFsr + " %"], ["Right load", v.rightFsr + " %"]]} />
            </div>
            <div className="kneeViz">
              <div className="leg">
                <span>THIGH</span>
                <div className="segment"/>
                <div className="joint" style={{transform: `rotate(${(Number(v.kneeAngle) - 55) / 3}deg)`}}>KNEE</div>
                <div className="segment shank"/>
                <span>SHANK</span>
              </div>
              <div className="angle">
                <b>{v.kneeAngle}°</b>
                <small>Virtual knee angle</small>
              </div>
            </div>
          </section>

          <section className="card">
            <div className="cardHead">
              <div><span className="sectionTag">CALCULATED</span><h2>Biomechanical Features</h2></div>
            </div>
            <Feature label="Knee ROM" value={v.rom + "°"} note="Derived from relative thigh/shank orientation"/>
            <Feature label="Peak flexion" value={p.wearable.flexion + "°"} note="Maximum simulated knee bend"/>
            <Feature label="Angular velocity" value={p.wearable.velocity + "°/s"} note="Knee movement speed"/>
            <Feature label="Gait variability" value={p.wearable.variability + "%"} note="Stride-time variability index"/>
            <Feature label="Foot-loading asymmetry" value={p.wearable.asymmetry + "%"} note="Left/right contact-load difference"/>
            <Feature label="Movement smoothness" value={p.wearable.smooth} note="IMU-derived motion quality"/>
            <div className="consistency">
              <span>Sensor consistency</span>
              <b className={`badge ${badgeClass(p.wearable.imuAgreement)}`}>{p.wearable.imuAgreement}</b>
              <small>IMU-derived angle vs flex sensor: {Math.abs(p.wearable.rom - p.wearable.flexSensor)}° difference</small>
            </div>
          </section>
        </div>

        <div className="grid2">
          <section className="card">
            <div className="cardHead">
              <div><span className="sectionTag">PATIENT-REPORTED</span><h2>Questionnaire</h2></div>
              <span className="complete"><CircleCheck size={15}/> Processed</span>
            </div>
            <div className="questionGrid">
              {[["Pain", p.q.pain + "/10"], ["Morning stiffness", p.q.stiffness], ["Stair difficulty", p.q.stairs], ["Standing difficulty", p.q.standing], ["Swelling / new change", p.q.swelling]].map(([a, b]) => (
                <div className="qrow" key={a}>
                  <span>{a}</span><b>{b}</b>
                </div>
              ))}
            </div>
          </section>
          <section className="card">
            <div className="cardHead">
              <div><span className="sectionTag">VIDEO</span><h2>Simulated Video Observations</h2></div>
              <span className="complete"><Video size={15}/> Demo observation</span>
            </div>
            <div className="questionGrid">
              {[["Knee flexion", p.video.knee], ["Gait symmetry", p.video.gait], ["Trunk compensation", p.video.trunk], ["Movement hesitation", p.video.hesitation]].map(([a, b]) => (
                <div className="qrow" key={a}>
                  <span>{a}</span><b>{b}</b>
                </div>
              ))}
            </div>
            <div className="notice"><Info size={15}/> These are simulated pre-processed observations for demonstration; no video diagnosis is claimed.</div>
          </section>
        </div>

        <section className="card engine">
          <div className="cardHead">
            <div><span className="sectionTag">EVALUATED</span><h2>Evaluation Engine</h2></div>
            <span className={`risk risk-${riskTone}`}>{p.risk}</span>
          </div>
          <div className="domainGrid">
            {p.domains.map(([name, status, severity, reason]) => (
              <div className="domain" key={name}>
                <div className="domainTop">
                  <b>{name}</b>
                  <span className={`badge ${badgeClass(status)}`}>{status}</span>
                </div>
                <p className="domainReason">{reason}</p>
                <div className="severity">
                  <span>Severity</span>
                  <b className={`sev-${severity.toLowerCase()}`}>{severity}</b>
                </div>
              </div>
            ))}
          </div>
          <div className="interpret">
            <div className="interpretTitle">
              <Brain size={18}/>
              <div>
                <span className="sectionTag">INTERPRETED</span>
                <h3>Why this profile?</h3>
              </div>
            </div>
            <p>
              {p.domains.filter(x => x[2] !== "Low").map(x => x[1]).join("; ") || "All screening domains remain within baseline parameters"}. The engine combines mobility, gait, loading, function, symptoms and sensor quality rather than treating a single sensor value as OA.
            </p>
          </div>
        </section>

        <div className="grid2">
          <section className="card">
            <div className="cardHead">
              <div>
                <span className="sectionTag">TREND ENGINE</span>
                <h2>Longitudinal Trajectory ({p.name})</h2>
              </div>
              <span className={`trendBadge trend-${p.trendBadge.tone}`}>
                {p.trendBadge.tone === "green" ? <CircleCheck size={14}/> : <TrendingDown size={14}/>}
                {p.trendBadge.label}
              </span>
            </div>
            <div className="chart">
              <ResponsiveContainer width="100%" height={260}>
                <LineChart data={p.history}>
                  <CartesianGrid strokeDasharray="3 3"/>
                  <XAxis dataKey="session"/>
                  <YAxis domain={[0, 140]}/>
                  <Tooltip/>
                  <Legend/>
                  <Line type="monotone" dataKey="rom" name="Knee ROM (°)" stroke="#1f7a8c" strokeWidth={2.5} dot={{r: 4, fill: "#1f7a8c"}} activeDot={{r: 6}} />
                  <Line type="monotone" dataKey="pain" name="Pain (0–10)" stroke="#c43e42" strokeWidth={2.5} dot={{r: 4, fill: "#c43e42"}} activeDot={{r: 6}} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="trendSummaryBox">
              <Info size={14}/>
              <p><b>Longitudinal Insight:</b> {p.trendSummary}</p>
            </div>
          </section>

          <section className="card recommendationCard">
            <div className="cardHead">
              <div>
                <span className="sectionTag">RECOMMENDED CLINICAL PATHWAY</span>
                <h2>Decision Support & Next Steps</h2>
              </div>
              <span className={`priorityBadge priority-${p.urgencyTone}`}>
                <ShieldCheck size={14}/> {p.urgency}
              </span>
            </div>

            <div className="pathwayBanner">
              <div className="pathwayHeader">
                <div className="pathwayMain">
                  <small>CARE PROTOCOL</small>
                  <h3>{p.pathway}</h3>
                </div>
                <div className="timelineBadge">
                  <Clock size={13}/>
                  <span>Review: <b>{p.timeline}</b></span>
                </div>
              </div>
              <p className="primaryRecText">{p.recommendation}</p>
            </div>

            <div className="actionStepsBlock">
              <div className="actionStepsHeading">Recommended Protocol Actions:</div>
              <div className="actionStepsList">
                {p.actionSteps.map((step, sIdx) => (
                  <div className="actionStepItem" key={sIdx}>
                    <div className="stepIndex">0{sIdx + 1}</div>
                    <div className="stepDetails">
                      <b>{step.title}</b>
                      <p>{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="evidencePipeline">
              <span className="pipelineLabel">Digital Evidence Lineage:</span>
              <div className="pipelineNodes">
                <span className="node">Measured</span>
                <i>→</i>
                <span className="node">Calculated</span>
                <i>→</i>
                <span className="node">Evaluated</span>
                <i>→</i>
                <span className="node">Interpreted</span>
                <i>→</i>
                <span className="node nodeHighlight">Recommended</span>
              </div>
            </div>

            <div className="recCardFooter">
              <button className="btnCardReport" onClick={() => setShowReport(true)}>
                <FileText size={14}/> View Full Clinical Summary Report <ChevronRight size={14}/>
              </button>
            </div>
          </section>
        </div>

        <footer>
          <HeartPulse size={16}/> <b>JoinTrack prototype disclaimer:</b> Simulated sensor/profile values and thresholds are not clinically validated diagnostic criteria. Screening support only; not a diagnosis.
        </footer>
      </main>

      {showReport && (
        <ReportModal
          p={p}
          v={v}
          copied={copied}
          onClose={() => setShowReport(false)}
          onCopy={handleCopyReport}
        />
      )}
    </div>
  );
}

function ReportModal({p, v, copied, onClose, onCopy}) {
  const riskTone = p.risk === "LOW" ? "green" : p.risk.includes("MODERATE") ? "orange" : "red";

  return (
    <div className="modalOverlay" onClick={onClose}>
      <div className="reportModal" onClick={e => e.stopPropagation()}>
        <div className="reportHeader">
          <div className="reportTitleBlock">
            <div className="reportPill"><FileText size={14}/> CLINICAL SCREENING SUMMARY REPORT</div>
            <h2>{p.name}</h2>
            <div className="reportSubtitle">
              <span><b>ID:</b> JOINTRACK-PT-{p.id}</span>
              <span>•</span>
              <span><b>Pattern:</b> {p.label}</span>
              <span>•</span>
              <span><b>Mode:</b> Virtual Wearable & Multimodal</span>
            </div>
          </div>
          <button className="closeBtn" onClick={onClose} aria-label="Close report">
            <X size={20}/>
          </button>
        </div>

        <div className="reportContent">
          <div className="reportRiskBanner">
            <div>
              <small>OVERALL SCREENING CLASSIFICATION</small>
              <div className="reportRiskTitle">
                <span className={`risk risk-${riskTone}`}>{p.risk} RISK PATTERN</span>
                <span className="focusTag"><Sparkles size={12}/> {p.clinicalFocus}</span>
              </div>
            </div>
          </div>

          <div className="reportSectionTitle">1. Biomechanical & Symptom Snapshot</div>
          <div className="reportMetricsGrid">
            <div className="metricItem">
              <span>Knee ROM</span>
              <b>{p.wearable.rom}°</b>
              <small>Peak flexion: {p.wearable.flexion}°</small>
            </div>
            <div className="metricItem">
              <span>Angular Velocity</span>
              <b>{p.wearable.velocity} °/s</b>
              <small>Leg swing speed</small>
            </div>
            <div className="metricItem">
              <span>Foot Asymmetry</span>
              <b>{p.wearable.asymmetry}%</b>
              <small>Contact-load imbalance</small>
            </div>
            <div className="metricItem">
              <span>Gait Variability</span>
              <b>{p.wearable.variability}%</b>
              <small>Stride-time consistency</small>
            </div>
            <div className="metricItem">
              <span>Reported Pain</span>
              <b>{p.q.pain} / 10</b>
              <small>Visual Analog Scale</small>
            </div>
            <div className="metricItem">
              <span>Morning Stiffness</span>
              <b>{p.q.stiffness}</b>
              <small>Functional symptom</small>
            </div>
          </div>

          <div className="reportSectionTitle">2. Longitudinal Trajectory History</div>
          <div className="reportMetricsGrid">
            {p.history.map((h, i) => (
              <div className="metricItem" key={i}>
                <span>{h.session}</span>
                <b>{h.rom}°</b>
                <small>Pain: {h.pain}/10</small>
              </div>
            ))}
          </div>

          <div className="reportSectionTitle">3. Evaluated Screening Domains</div>
          <div className="reportDomainsList">
            {p.domains.map(([name, status, severity, reason]) => (
              <div className="reportDomainRow" key={name}>
                <div>
                  <strong>{name}</strong>
                  <p>{reason}</p>
                </div>
                <div className="reportDomainBadges">
                  <span className={`badge ${badgeClass(status)}`}>{status}</span>
                  <small className="sevTag">Sev: {severity}</small>
                </div>
              </div>
            ))}
          </div>

          <div className="adviceCard">
            <div className="adviceHead">
              <Stethoscope size={18}/>
              <div>
                <h4>Brief Clinical & Lifestyle Advice</h4>
                <small>Tailored guidance based on synthesized screening findings</small>
              </div>
            </div>
            <p className="adviceText">{p.briefAdvice}</p>
          </div>

          <div className="nextStepCard">
            <b>Recommended Next Action:</b>
            <p>{p.recommendation}</p>
          </div>

          <div className="reportDisclaimer">
            <HeartPulse size={14}/>
            <span>
              <strong>JoinTrack Screening Prototype Notice:</strong> Sensor readings and evaluation algorithms are simulated for research and development demonstration. This document is a screening summary report and does not constitute a formal medical diagnosis.
            </span>
          </div>
        </div>

        <div className="reportFooter">
          <button className="actionBtn printBtn" onClick={() => window.print()}>
            <Printer size={16}/> Print / Save PDF
          </button>
          <button className="actionBtn copyBtn" onClick={onCopy}>
            {copied ? <Check size={16} color="#168252"/> : <Copy size={16}/>}
            {copied ? "Copied to Clipboard!" : "Copy Summary"}
          </button>
          <button className="actionBtn closeActionBtn" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

function Sensor({title, icon, rows}) {
  return (
    <div className="sensor">
      <div className="sensorTitle">{icon}<b>{title}</b><span className="dot"/></div>
      {rows.map(r => (
        <div className="sensorRow" key={r[0]}>
          <span>{r[0]}</span><b>{r[1]}</b>
        </div>
      ))}
    </div>
  );
}

function Feature({label, value, note}) {
  return (
    <div className="feature">
      <div><b>{label}</b><small>{note}</small></div>
      <strong>{value}</strong>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App/>);
