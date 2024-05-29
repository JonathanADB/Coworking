import CreateReview from "@/pages/CreateReview.jsx";
import EditReview from "@/pages/EditReview.jsx";
import ViewReview from "@/pages/ViewReview.jsx";
import { Route, Routes } from "react-router-dom";

export default function ReviewsContainer() {
    return (
      <Routes>
        {/* Rutas anidadas para diferentes tipos de información relacionada con la review */}
        <Route path="/:reviewId" element={<ViewReview/>} />
        <Route path="/create/:reservationId" element={<CreateReview />} />
        <Route path="/edit/:reviewId" element={<EditReview/>} />

        <Route path=":reviewId/reservation/:reservationId" element={<ViewReview />} />
      </Routes>
    );
  }