"use client";
import Link from "next/link";
import { Button } from "@/components/fluxora/ui/button";
function HeroSection() {
    return (<section>
      <div className="w-full h-full relative">
        <div className="relative w-full pt-0 md:pt-20 pb-6 md:pb-10 before:absolute before:w-full before:h-full before:bg-linear-to-r before:from-sky-100 before:via-white before:to-amber-100 before:rounded-full before:top-24 before:blur-3xl before:-z-10 dark:before:from-slate-800 dark:before:via-black dark:before:to-stone-700 dark:before:rounded-full dark:before:blur-3xl dark:before:-z-10">
          <div className="container mx-auto relative z-10">
            <div className="flex flex-col max-w-5xl mx-auto gap-8">
              <div className="relative flex flex-col text-center items-center sm:gap-6 gap-4">
                <h1 className="fluxora-reveal lg:text-8xl md:text-7xl text-5xl font-medium leading-14 md:leading-20 lg:leading-24">
                  Sua produção começa com{" "}
                  <span className="font-serif italic tracking-tight text-primary">
                    estoque organizado
                  </span>
                </h1>
                <p className="fluxora-reveal text-base font-normal max-w-2xl text-muted-foreground">
                  Acompanhe suas matérias-primas, identifique o que está em falta e
                  registre cada entrada e saída. Mais clareza para planejar as
                  próximas etapas da sua indústria.
                </p>
              </div>
              <div className="fluxora-reveal flex items-center flex-col md:flex-row justify-center gap-8">
                <Button asChild className="rounded-full h-12 px-7"><Link href="/demo">Experimentar demonstração</Link></Button>
                <div className="text-sm text-muted-foreground">Sem login · Dados fictícios · Experimente à vontade</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>);
}
export default HeroSection;
