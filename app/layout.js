import './globals.css';

export const metadata = {
  title: 'Tiffin Service',
  description: 'Premium Daily Meal Delivery',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false, // App-like feel
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="container">
          {children}
        </div>
      </body>
    </html>
  );
}
