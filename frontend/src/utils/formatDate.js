export const formatDateTime = (date) => {
    if (!date) return null;
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(date).toLocaleDateString("es-ES", options);
  }

  export const formatDate = (date) => {
    if (!date) return null;
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(date).toLocaleDateString("es-ES", options);
  }
  
  export const formatTime = (date) => {
    if (!date) return null;
    const options = { hour: '2-digit', minute: '2-digit' };
    return new Date(date).toLocaleTimeString('es-ES', options);
  }

  export const formatSmallDate = (date) => {
    if (!date) return null;
    const options = {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    }
    return new Date(date).toLocaleDateString("es-ES", options);
  }
  
  export const formatReservation = (date, time) => {
    if (!date || !time) return null;
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const hourString = time?.toString().padStart(2, "0");
    return `${year}-${month}-${day} ${hourString}:00:00`;
  }