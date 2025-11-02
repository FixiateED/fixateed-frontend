import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function NewChild() {
  const [form, setForm] = useState({
    name: '', grade: '', comm_mode: '', reading_level: '', math_range: ''
  });
  const [saving, setSaving] = useState(false);
  const [ok, setOk] = useState(false);
  const onChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const save = async (e) => {
    e.preventDefault(); setSaving(true);
    const { data, error } = await supabase.from('children').insert([form]);
    setSaving(false);
    if (error) alert(error.message); else setOk(true);
  };

  return (
    <main style={{padding: 32, fontFamily:'system-ui'}}>
      <h1 style={{color:'#F57C00'}}>Add a Child</h1>
      <form onSubmit={save} style={{maxWidth: 520}}>
        <label>Name<br/>
          <input name="name" value={form.name} onChange={onChange} required style={{width:'100%', padding:8}}/>
        </label><br/><br/>
        <label>Grade<br/>
          <input name="grade" value={form.grade} onChange={onChange} style={{width:'100%', padding:8}}/>
        </label><br/><br/>
        <label>Communication Mode (verbal/AAC/ASL)<br/>
          <input name="comm_mode" value={form.comm_mode} onChange={onChange} style={{width:'100%', padding:8}}/>
        </label><br/><br/>
        <label>Reading Level<br/>
          <input name="reading_level" value={form.reading_level} onChange={onChange} style={{width:'100%', padding:8}}/>
        </label><br/><br/>
        <label>Math Range<br/>
          <input name="math_range" value={form.math_range} onChange={onChange} style={{width:'100%', padding:8}}/>
        </label><br/><br/>
        <button disabled={saving} style={{background:'#F57C00', color:'#fff', padding:'10px 16px', border:0, borderRadius:6}}>
          {saving ? 'Saving…' : 'Save Child'}
        </button>
      </form>
      {ok && <p style={{marginTop:16, color:'#276678'}}>Saved! Go to /generate to create a plan.</p>}
    </main>
  );
}
