import { Badge } from './ui/badge';
export function StockBadge({ status }) { const color = status === 'Normal' ? 'bg-emerald-100 text-emerald-900' : status === 'Estoque baixo' ? 'bg-amber-100 text-amber-900' : 'bg-red-100 text-red-900'; return <Badge className={`${color} whitespace-nowrap border-0`} variant="outline">{status}</Badge>; }
