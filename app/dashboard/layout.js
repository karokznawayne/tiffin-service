import BottomNav from '@/components/BottomNav';

export default function DashboardLayout({ children }) {
  return (
    <>
      <div style={{ paddingBottom: '70px' }}>
        {children}
      </div>
      <BottomNav />
    </>
  );
}
