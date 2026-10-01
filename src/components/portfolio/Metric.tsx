import type { ProjectMetric } from "@/lib/projects";

export function Metrics({ metrics }: { metrics: ProjectMetric[] }) {
  if (!metrics.length) return null;
  return (
    <dl className="project-metrics">
      {metrics.map((metric) => (
        <div key={metric.value}>
          <dt>{metric.value}</dt>
          <dd>{metric.label}</dd>
        </div>
      ))}
    </dl>
  );
}
