import AgencyHeroSection from '@/components/shadcn-space/blocks/hero-01';
import { HomeSections } from '@/components/fluxora/home-sections';
import './fluxora.css';
export default function Home() 
{ return <div className="fluxora-theme"><AgencyHeroSection />
    <main>
        <HomeSections />
    </main>
</div>; 
}
