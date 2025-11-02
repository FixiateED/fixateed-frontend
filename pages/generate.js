import { useState } from 'react';

export default function Generate() {
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState(null);

  const doGen = async () => {
    setLoading(true);
    const res = await fetch('/api/generate-plan', {
      method: 'POST',
      body: JSON.stringify({ childId: null, theme: 'ants', level: 'Emerging' })
    });
    const json = await res.json();
    setPlan(json);
    setLoading(false);
  };

  return (
    <main style={{padding:32, fontFamily:'system-ui'}}>
      <h1 style={{color:'#F57C00'}}>Generate a Plan</h1>
      <button onClick={doGen} disabled={loading}
        style={{background:'#F57C00', color:'#fff', padding:'10px 16px', border:0, borderRadius:6}}>
        {loading ? 'Generating…' : 'Generate Sample Ants Plan'}
      </button>

      {plan && (
        <section style={{marginTop:24}}>
          <h2>{plan.plan_title}</h2>
          <pre style={{background:'#FDF4E3', padding:16, overflowX:'auto'}}>{JSON.stringify(plan, null, 2)}</pre>
        </section>
      )}
    </main>
  );
}
