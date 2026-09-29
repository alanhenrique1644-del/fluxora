import './globals.css';

export const metadata = {
  title: 'Fluxora | Controle de matéria-prima',
  description: 'Organize suas matérias-primas e acompanhe o estoque na demonstração da Fluxora.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
