import HeroSection from './hero';
import Header from './header';
import BrandSlider from './brand-slider';
export default function AgencyHeroSection() { return <><Header navigationData={[{ title: 'Início', href: '/' }, { title: 'Benefícios', href: '#beneficios' }, { title: 'Funcionalidades', href: '#funcionalidades' }, { title: 'Contato', href: '#contato' }]}/><HeroSection /><BrandSlider /></>; }
