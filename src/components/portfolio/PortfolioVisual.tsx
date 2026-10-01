import type { CaseWithMedia } from '@/lib/portfolio';

const variants: Record<string, string[]> = {
  'kyc-kyb-onboarding': ['Entry', 'Individual', 'Business', 'Documents', 'Review', 'Early access'],
  'b2b-rebates-payouts': ['Partner', 'Calculation', 'Approval', 'Payout', 'Exceptions', 'Status'],
  'standalone-partner-portal': ['Partner', 'Portal', 'Operations', 'Insights', 'Support', 'Transition'],
  'new-b2b-business-model': ['Research', 'Partner feedback', 'Proposal', 'Pilot'],
  'research-recruitment': ['Invitation', 'Survey', 'Interview', 'Insight'],
};

export function PortfolioVisual({ item, className = '' }: { item: CaseWithMedia; className?: string }) {
  const image = item.cover_path ? item.mediaUrls[item.cover_path] : null;
  if (image) return <div className={`portfolio-visual overflow-hidden ${className}`}><img src={image} alt={`${item.title} — project cover`} className="h-full w-full object-cover" /></div>;
  const nodes = variants[item.slug] ?? ['Discovery', 'Design', 'Delivery'];
  return <div className={`portfolio-visual visual-${item.slug} ${className}`} aria-label={`Conceptual flow: ${nodes.join(', ')}`} role="img">
    <div className="visual-topline"><span>{item.slug === 'research-recruitment' ? 'Research operations' : 'Product flow'}</span><span>{String(item.sort_order).padStart(2, '0')} / TK</span></div>
    <div className="visual-composition"><div className="visual-path">{nodes.map((node, index) => <div className="flow-step" key={`${node}-${index}`}><span className="flow-index">{String(index + 1).padStart(2, '0')}</span><span className="flow-label">{node}</span></div>)}</div></div>
    <div className="visual-bottomline"><span>Process / decisions / outcomes</span><span aria-hidden="true">↗</span></div>
  </div>;
}
