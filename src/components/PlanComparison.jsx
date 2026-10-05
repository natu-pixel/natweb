import { PLANS } from '../lib/plans'

export default function PlanComparison({ billing, onOrder }) {
  const rows = [
    ['Total price', plan => `$${billing === 'annual' ? plan.annual : plan.monthly} / ${billing === 'annual' ? 'year' : 'month'}`],
    ['Simultaneous screens', plan => plan.screens],
    ['Video quality', plan => plan.quality],
    ['Channels', plan => plan.channels],
    ['VOD library', plan => plan.id === 'basic' || plan.id === 'plus' ? 'Included' : 'Full library'],
    ['Support', plan => plan.support],
    ['EPG TV guide', plan => plan.epg ? 'Included' : 'Not included'],
    ['Catch-up TV', plan => plan.catchup ? 'Included' : 'Not included'],
    ['Multi-device login', plan => plan.id === 'ultimate' ? 'Included' : 'Not listed'],
  ]
  return <section className="plan-comparison" aria-labelledby="comparison-heading"><div className="plan-comparison__heading"><span className="eyebrow">FIND YOUR FIT</span><h2 id="comparison-heading">The details, side by side.</h2><p>Comparing {billing === 'annual' ? 'annual totals billed yearly' : 'monthly prices'}. Switch billing above to see the difference.</p></div><div className="plan-comparison__scroll" tabIndex={0} role="region" aria-label="Subscription plan comparison; scroll horizontally on smaller screens"><table><caption className="sr-only">NAT subscription plan features and {billing} prices</caption><thead><tr><th scope="col">Your experience</th>{PLANS.map(plan => <th scope="col" key={plan.id}>{plan.name}{plan.highlighted && <span>Most popular</span>}</th>)}</tr></thead><tbody>{rows.map(([label, value]) => <tr key={label}><th scope="row">{label}</th>{PLANS.map(plan => <td key={plan.id}>{value(plan)}</td>)}</tr>)}<tr><th scope="row">Get started</th>{PLANS.map(plan => <td key={plan.id}><button className="btn btn-outline btn-sm" onClick={() => onOrder(plan)}>Choose {plan.name}</button></td>)}</tr></tbody></table></div></section>
}
