import { categories } from '@/data/materials';

export default function BrandSlider() {
  return (
    <section className="px-4 py-10">
      <div className="mx-auto w-full max-w-6xl">
        <p className="mb-6 text-center text-sm text-muted-foreground">
          Do recebimento ao planejamento, cada material conta.
        </p>
        <ul className="m-0 flex w-full list-none flex-wrap items-center justify-center gap-x-8 gap-y-4 p-0 text-center md:gap-x-16">
          {categories.map(name => (
            <li key={name} className="text-xl font-medium text-muted-foreground">
              {name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
