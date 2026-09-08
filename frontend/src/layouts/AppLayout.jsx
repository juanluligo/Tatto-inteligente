import AppHeader from '../components/AppHeader.jsx';

export default function AppLayout({ children, onScheduleClick }) {
  return (
    <div className="app-shell">
      <AppHeader onScheduleClick={onScheduleClick} />
      <main>{children}</main>
    </div>
  );
}
