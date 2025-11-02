export default async function handler(req, res) {
  try {
    const { childId, theme = 'ants', level = 'Emerging' } = JSON.parse(req.body || '{}');

    // TODO: fetch child, interests, goals from DB using service key on server side if needed

    const samplePlan = {
      plan_title: `5-Day ${theme} Mini-Unit (Level: ${level})`,
      days: [
        {
          day: 1,
          blocks: [{
            domain: "phonics",
            objective: "Identify initial /a/ in 10 words.",
            materials: ["picture cards","t-chart"],
            script: [
              "Hook: 'We’re ant detectives!'",
              "Model /a/ in 'ant'; child sorts 10 cards."
            ],
            accommodations: ["ASL 'A' visual","first-then board","reduce set to 6"],
            data_capture: { items: 10, metric: "correct" },
            reinforcement: "Add 1 ant sticker to colony",
            printables: [{ type: "checklist", html: "<html><body><h1>Ant /a/ Hunt</h1></body></html>" }]
          }]
        }
      ]
    };

    res.status(200).json(samplePlan);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
