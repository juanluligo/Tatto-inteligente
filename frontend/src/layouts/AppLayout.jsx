import AppHeader from '../components/AppHeader.jsx';

export default function AppLayout({ children }) {
  return (
    <div className="app-shell">
      <AppHeader />
      <main>{children}</main>
    </div>
  );
}
