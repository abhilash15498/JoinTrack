# JoinTrack Evaluation Engine — Virtual Simulation

A self-contained React/Vite prototype demonstrating how JoinTrack can combine virtual wearable sensor features, patient-reported information, and simulated video observations into an explainable screening profile.

## Run

```bash
npm install
npm run dev
```

Open the local Vite URL.

## Demo

- Select Demo Patient A–D.
- Inspect measured, calculated, evaluated, and interpreted layers.
- Start live simulation to animate virtual sensor readings.
- Use “Simulate Deterioration” to transition A → B → C → D and demonstrate worsening.
- Review the trend chart and domain explanations.

## Architecture

Virtual sensors → feature extraction → evaluation engine → risk profile → trend engine → recommendation.

## Important limitation

All sensor values, profile values, and evaluation thresholds are simulated prototype values. They are NOT clinically validated diagnostic thresholds. JoinTrack is a screening and monitoring prototype, not a clinical diagnostic device.

The video section contains simulated pre-processed observations for demonstration; it does not claim to diagnose OA from video.
