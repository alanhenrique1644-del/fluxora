'use client';

import { useState } from 'react';
import { AppSidebar } from '@/components/app-sidebar';
import { ChartAreaInteractive } from '@/components/chart-area-interactive';
import { DataTable } from '@/components/data-table';
import { SectionCards } from '@/components/section-cards';
import { SiteHeader } from '@/components/site-header';
import { SidebarInset, SidebarProvider } from '@/components/fluxora/ui/sidebar';
import { Button } from '@/components/fluxora/ui/button';
import { MaterialDialog } from '@/components/fluxora/material-dialog';
import { initialMaterials, stockChange, categories } from '@/data/materials';
import { Plus } from 'lucide-react';
import '../fluxora.css';

export default function Page() {
  const [materials, setMaterials] = useState(initialMaterials);
  const [target, setTarget] = useState(null);
  const [message, setMessage] = useState('');

  function create(material) {
    if (!material.name) throw new Error('Informe o nome do material.');
    if (!categories.includes(material.category)) {
      throw new Error('Selecione uma categoria válida.');
    }
    if (!Number.isFinite(material.quantity) || !Number.isFinite(material.minimum)
      || material.quantity < 0 || material.minimum < 0) {
      throw new Error('As quantidades devem ser iguais ou maiores que zero.');
    }
    setMaterials(current => {
      const number = Math.max(0, ...current.map(item => Number(item.code.slice(3)))) + 1;
      const id = Math.max(0, ...current.map(item => item.id)) + 1;
      return [...current, { ...material, id, code: `MP-${String(number).padStart(3, '0')}` }];
    });
    setMessage(`${material.name} cadastrado com sucesso.`);
  }

  function move(code, type, amount) {
    const material = materials.find(item => item.code === code);
    if (!material) throw new Error('Material não encontrado.');
    const updated = stockChange(material, type, amount);
    setMaterials(current => current.map(item => item.code === code ? updated : item));
    setMessage(`${type === 'entrada' ? 'Entrada' : 'Saída'} registrada para ${updated.name}.`);
  }

  return (
    <div className="fluxora-theme">
      <SidebarProvider
        style={{
          '--sidebar-width': 'calc(var(--spacing) * 72)',
          '--header-height': 'calc(var(--spacing) * 12)',
        }}
      >
        <AppSidebar variant="inset" onCreate={() => setTarget('new')} />
        <SidebarInset>
          <SiteHeader />
          <main id="visao-geral" className="flex flex-1 flex-col">
            <div className="@container/main flex flex-1 flex-col gap-2">
              <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                <div className="px-4 lg:px-6">
                  <p className="mb-6 rounded-lg border border-primary/20 bg-primary/5 p-3 text-sm">
                    <strong>Demonstração com dados fictícios.</strong> As alterações ficam apenas nesta página e são reiniciadas ao recarregar.
                  </p>
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <h2 className="text-2xl font-semibold">Visão geral do estoque</h2>
                      <p className="mt-1 text-muted-foreground">Acompanhe os materiais que mantêm sua produção em movimento.</p>
                    </div>
                    <Button onClick={() => setTarget('new')}><Plus />Cadastrar material</Button>
                  </div>
                  <div aria-live="polite" role="status">
                    {message && <p className="mt-4 rounded-lg bg-emerald-50 text-emerald-800 p-3 text-sm">{message}</p>}
                  </div>
                </div>
                <SectionCards materials={materials} />
                <div className="px-4 lg:px-6">
                  <ChartAreaInteractive materials={materials} />
                </div>
                <DataTable data={materials} onMovement={setTarget} />
              </div>
            </div>
          </main>
        </SidebarInset>
        {target && (
          <MaterialDialog target={target} onClose={() => setTarget(null)} onCreate={create} onMovement={move} />
        )}
      </SidebarProvider>
    </div>
  );
}
