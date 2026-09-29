import data from './data.json';


export const initialMaterials = data.map(item => ({
    id: item.id,
    code: item.codigo,
    name: item.material,
    category: item.categoria,
    unit: item.unidade,
    quantity: item.quantidade,
    minimum: item.estoqueMinimo,
}));
export const categories = [...new Set(initialMaterials.map(item => item.category))];
export const units = [...new Set([...initialMaterials.map(item => item.unit), 'kg', 'L', 'm', 'm²', 'un', 'rolo'])];

export const statuses = ['Normal', 'Estoque baixo', 'Sem estoque'];
export function statusOf(m) { return m.quantity === 0 ? 'Sem estoque' : m.quantity < m.minimum ? 'Estoque baixo' : 'Normal'; }
export function stockChange(material, type, amount) { const value = Number(amount); if (!Number.isFinite(value) || value <= 0)
    throw new Error('Informe uma quantidade maior que zero.'); if (!['entrada', 'saida'].includes(type))
    throw new Error('Movimentação inválida.'); if (type === 'saida' && value > material.quantity)
    throw new Error('A saída não pode ser maior que o saldo disponível.'); return { ...material, quantity: Math.round((material.quantity + (type === 'entrada' ? value : -value)) * 1000) / 1000 }; }
export const formatNumber = (n) => new Intl.NumberFormat('pt-BR', { maximumFractionDigits: 3 }).format(n);
