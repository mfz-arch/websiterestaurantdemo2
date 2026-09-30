import { useState } from 'react';
import type { Currency, MenuItem } from './types/restaurant';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { DishesShowcase } from './components/DishesShowcase';
import { ChefsSection } from './components/ChefsSection';
import { ReviewsSection } from './components/ReviewsSection';
import { Footer } from './components/Footer';
import { TableReservationModal, type UserProfile } from './components/TableReservationModal';
import { AuthModal } from './components/AuthModal';

export function App() {
  const [currency, setCurrency] = useState<Currency>('TZS');
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [preSelectedDish, setPreSelectedDish] = useState<MenuItem | null>(null);
  const [modalInitialStep, setModalInitialStep] = useState<1 | 2>(1);

  const handleOpenReservationForDish = (dish: MenuItem) => {
    setPreSelectedDish(dish);
    setModalInitialStep(currentUser ? 2 : 1);
    setIsReservationOpen(true);
  };

  const handleGeneralReservationClick = () => {
    setPreSelectedDish(null);
    setModalInitialStep(currentUser ? 2 : 1);
    setIsReservationOpen(true);
  };

  const handleOpenAuth = (mode: 'signin' | 'signup' = 'signin') => {
    setAuthMode(mode);
    setIsAuthOpen(true);
  };

  const handleSuccessLogin = (name: string) => {
    setCurrentUser({
      name: name,
      email: `${name.toLowerCase().replace(/\s+/g, '')}@example.com`,
      phone: '+255 774 000 999',
    });
  };

  const handleModalProfileLogin = (profile: UserProfile) => {
    setCurrentUser(profile);
  };

  const handleSignOut = () => {
    setCurrentUser(null);
  };

  return (
    <div className="min-h-screen bg-[#111215] text-[#F7F8FA] font-sans selection:bg-[#E06D2B] selection:text-white">
      {/* SAVORITE Navigation Bar */}
      <Navbar
        currency={currency}
        setCurrency={setCurrency}
        onOpenReservation={handleGeneralReservationClick}
        onOpenAuth={handleOpenAuth}
        userName={currentUser?.name || null}
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
        currentUser={currentUser}
        onLoginSuccess={handleModalProfileLogin}
        initialStep={modalInitialStep}
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

