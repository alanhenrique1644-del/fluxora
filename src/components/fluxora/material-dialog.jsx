'use client';
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { categories, units, formatNumber } from '@/data/materials';
function Choice({ id, value, onChange, items }) { return <Select value={value} onValueChange={onChange}><SelectTrigger id={id} className="w-full"><SelectValue /></SelectTrigger><SelectContent>{items.map(item => <SelectItem key={item.value || item} value={item.value || item}>{item.label || item}</SelectItem>)}</SelectContent></Select>; }
export function MaterialDialog({ target, onClose, onCreate, onMovement }) { const [category, setCategory] = useState(categories[0]); const [unit, setUnit] = useState('kg'); const [type, setType] = useState('entrada'); const [error, setError] = useState(''); const isNew = target === 'new'; function submit(e) { e.preventDefault(); setError(''); const f = new FormData(e.currentTarget); try {
    if (isNew)
        onCreate({ name: String(f.get('name')).trim(), category, unit, quantity: Number(f.get('quantity')), minimum: Number(f.get('minimum')) });
    else
        onMovement(target.code, type, Number(f.get('amount')));
    onClose();
}
catch (err) {
    setError(err.message);
} } return <Dialog open={Boolean(target)} onOpenChange={open => { if (!open)
    onClose(); }}><DialogContent className="max-h-[90vh] overflow-y-auto"><DialogHeader><DialogTitle>{isNew ? 'Cadastrar material' : 'Movimentar estoque'}</DialogTitle><DialogDescription>{isNew ? 'Preencha os dados da matéria-prima. O código será gerado automaticamente.' : `${target?.name || ''} · Saldo disponível: ${formatNumber(target?.quantity || 0)} ${target?.unit || ''}`}</DialogDescription></DialogHeader><form onSubmit={submit} className="space-y-4">{isNew ? <><div className="space-y-2"><Label htmlFor="material-name">Nome do material</Label><Input id="material-name" name="name" required maxLength={80} placeholder="Ex.: Chapa de alumínio"/></div><div className="grid grid-cols-2 gap-4"><div className="space-y-2"><Label htmlFor="material-category">Categoria</Label><Choice id="material-category" value={category} onChange={setCategory} items={categories}/></div><div className="space-y-2"><Label htmlFor="material-unit">Unidade</Label><Choice id="material-unit" value={unit} onChange={setUnit} items={units}/></div></div><div className="grid grid-cols-2 gap-4">{[['quantity', 'Quantidade disponível'], ['minimum', 'Estoque mínimo']].map(([id, label]) => <div key={id} className="space-y-2"><Label htmlFor={'material-' + id}>{label}</Label><Input id={'material-' + id} name={id} type="number" required min="0" max="1000000000" step="0.001" defaultValue="0"/></div>)}</div></> : <><div className="space-y-2"><Label htmlFor="movement-type">Tipo de movimentação</Label><Choice id="movement-type" value={type} onChange={setType} items={[{ value: 'entrada', label: 'Entrada' }, { value: 'saida', label: 'Saída' }]}/></div><div className="space-y-2"><Label htmlFor="movement-amount">Quantidade ({target?.unit})</Label><Input id="movement-amount" name="amount" type="number" required min="0.001" step="0.001" max={type === 'saida' ? target?.quantity : 1000000000} placeholder="Informe a quantidade"/></div></>}{error && <p role="alert" className="rounded-md bg-red-50 p-3 text-sm text-red-800">{error}</p>}<div className="flex justify-end gap-3 pt-3"><Button variant="outline" type="button" onClick={onClose}>Cancelar</Button><Button type="submit">{isNew ? 'Cadastrar' : 'Confirmar movimentação'}</Button></div></form></DialogContent></Dialog>; }
