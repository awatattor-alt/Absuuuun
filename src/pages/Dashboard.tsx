import { StatCard } from '../components/ui/StatCard';
import { aiRecommendation, dashboardCards, recentActivities } from '../utils/dashboardData';

export default function Dashboard() {
  return (
    <section className="dashboard-page">
      <div className="stats-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {dashboardCards.map((card) => (
          <StatCard
            key={card.title}
            title={card.title}
            value={card.value}
            subtitle={card.subtitle}
          />
        ))}
      </div>

      <div className="dashboard-panels">
        <article className="panel">
          <h3>Activity summary</h3>
          <ul>
            {recentActivities.map((activity) => (
              <li key={activity}>{activity}</li>
            ))}
          </ul>
        </article>

        <article className="panel">
          <h3>AI recommendation preview</h3>
          <p>{aiRecommendation}</p>
        </article>
      </div>
    </section>
  );
}
