import AppHeader from '../components/AppHeader.jsx';

export default function AppLayout({ children, onScheduleClick, onClientProcessClick }) {
  return (
    <div className="app-shell">
      <AppHeader
        onScheduleClick={onScheduleClick}
        onClientProcessClick={onClientProcessClick}
      />
      <main>{children}</main>
    </div>
  );
}
