import { useState } from 'react';
import type { Currency, MenuItem } from './types/restaurant';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { DishesShowcase } from './components/DishesShowcase';
import { ChefsSection } from './components/ChefsSection';
import { ReviewsSection } from './components/ReviewsSection';
import { Footer } from './components/Footer';
import { TableReservationModal } from './components/TableReservationModal';

export function App() {
  const [currency, setCurrency] = useState<Currency>('TZS');
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const [preSelectedDish, setPreSelectedDish] = useState<MenuItem | null>(null);

  const handleOpenReservationForDish = (dish: MenuItem) => {
    setPreSelectedDish(dish);
    setIsReservationOpen(true);
  };

  const handleGeneralReservationClick = () => {
    setPreSelectedDish(null);
    setIsReservationOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#111215] text-[#F7F8FA] font-sans selection:bg-[#E06D2B] selection:text-white">
      {/* SAVORITE Navigation Bar */}
      <Navbar
        currency={currency}
        setCurrency={setCurrency}
        onOpenReservation={handleGeneralReservationClick}
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
    </div>
  );
}

export default App;
