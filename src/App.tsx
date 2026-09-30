import { useState } from 'react';
import type { Currency, MenuItem } from './types/restaurant';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { DishesShowcase } from './components/DishesShowcase';
import { ChefsSection } from './components/ChefsSection';
import { ReviewsSection } from './components/ReviewsSection';
import { Footer } from './components/Footer';
import { TableReservationModal } from './components/TableReservationModal';
import { AuthModal } from './components/AuthModal';

export function App() {
  const [currency, setCurrency] = useState<Currency>('TZS');
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [userName, setUserName] = useState<string | null>(null);
  const [preSelectedDish, setPreSelectedDish] = useState<MenuItem | null>(null);

  const handleOpenReservationForDish = (dish: MenuItem) => {
    setPreSelectedDish(dish);
    setIsReservationOpen(true);
  };

  const handleGeneralReservationClick = () => {
    setPreSelectedDish(null);
    setIsReservationOpen(true);
  };

  const handleOpenAuth = (mode: 'signin' | 'signup' = 'signin') => {
    setAuthMode(mode);
    setIsAuthOpen(true);
  };

  const handleSuccessLogin = (name: string) => {
    setUserName(name);
  };

  const handleSignOut = () => {
    setUserName(null);
  };

  return (
    <div className="min-h-screen bg-[#111215] text-[#F7F8FA] font-sans selection:bg-[#E06D2B] selection:text-white">
      {/* SAVORITE Navigation Bar */}
      <Navbar
        currency={currency}
        setCurrency={setCurrency}
        onOpenReservation={handleGeneralReservationClick}
        onOpenAuth={handleOpenAuth}
        userName={userName}
        onSignOut={handleSignOut}
      />

      {/* Main Content Sections (Photo 2 SAVORITE Design) */}
      <main>
        {/* Hero Section */}
        <Hero onReserveClick={handleGeneralReservationClick} />

        {/* Indulge in Culinary Artistry (Circular Plates Showcase) */}
        <DishesShowcase
          currency={currency}
          onSelectDishForBooking={handleOpenReservationForDish}
        />

        {/* Crafted by Experts (Chef Team Section) */}
        <ChefsSection />

        {/* Praise from Our Patrons (Reviews Section) */}
        <ReviewsSection />

        {/* Contact & Footer */}
        <Footer />
      </main>

      {/* Interactive Reservation Modal */}
      <TableReservationModal
        isOpen={isReservationOpen}
        onClose={() => setIsReservationOpen(false)}
        currency={currency}
        preSelectedDish={preSelectedDish}
      />

      {/* Sign In / Sign Up Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onSuccessLogin={handleSuccessLogin}
        initialMode={authMode}
      />
    </div>
  );
}

export default App;
