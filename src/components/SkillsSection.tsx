"use client";

const skills = {
  "System Administration": [
    { name: "Active Directory", level: 90 },
    { name: "NinjaRMM", level: 90 },
    { name: "Microsoft Intune", level: 85 },
    { name: "Linux Administration", level: 85 },
    { name: "Defender for Endpoint", level: 70 },
  ],
  "Languages & Frameworks": [
    { name: "HTML/CSS", level: 70 },
    { name: "Python", level: 40 },
    { name: "Next.js", level: 40 },
    { name: "LUA", level: 35 },
    { name: "Bash", level: 35 },
  ],
};

export function SkillsSection() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {Object.entries(skills).map(([category, skillList]) => (
        <div key={category} className="space-y-4 rounded-xl border border-white/5 bg-white/5 p-4">
          <p className="text-xs font-medium" style={{ color: '#6272A4' }}>{category}</p>
          {skillList.map((skill) => (
            <div key={skill.name} className="space-y-2">
              <div className="flex items-center justify-between text-sm text-slate-300">
                <span>{skill.name}</span>
                <span className="text-xs text-slate-500">{skill.level}%</span>
              </div>
              <div className="h-1.5 rounded-full bg-white/10">
                <div
                  className="h-1.5 rounded-full bg-gradient-to-r from-purple-500 to-purple-600 transition-all duration-700"
                  style={{ width: `${skill.level}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      ))}
      <div className="rounded-xl border border-white/5 p-4 text-sm" style={{ backgroundColor: 'rgba(68, 71, 90, 0.4)', color: '#F8F8F2' }}>
        <p className="text-xs font-medium" style={{ color: '#6272A4' }}>Currently Learning</p>
        <p className="mt-2">AWS · Snowflake · Kubernetes · Git · Docker</p>
      </div>
    </div>
  );
}
