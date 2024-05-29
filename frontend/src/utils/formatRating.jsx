import { FaRegStar, FaRegStarHalf } from "react-icons/fa6";

export const formatAverageRate = (rate) => {
    
    if (rate === null || rate === undefined || isNaN(rate)) {
      return null;
    }
  
    // Convertir rate de una escala de 0-10 a 0-5
    const scaledRate = rate / 2;
    const roundedRate = Math.round(scaledRate * 2) / 2;
    const fullStars = Math.floor(roundedRate);
    const hasHalfStar = roundedRate % 1 !== 0;
  
    return (
      <div className="flex flex-row p-1">
        {[...Array(fullStars)].map((_, i) => (
          <FaRegStar key={i} />
        ))}
        {hasHalfStar && <FaRegStarHalf />}
        {[...Array(5 - fullStars - (hasHalfStar ? 1 : 0))].map((_, i) => (
          <FaRegStar key={i + fullStars + 1} style={{ visibility: 'hidden' }} />
        ))}
      </div>
    );
  };