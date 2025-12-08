export const formatMoney = (num: number) => {
  try {
    const vNum = Number(num.toFixed(2));
    const format = Intl.NumberFormat("de-DE").format(vNum);
    return `${format}`;
  } catch (e: any) {
    console.error(e);
    return "0";
  }
};

export const formatDate = (timestamp: string): string => {
  try {
    const date = new Date(timestamp);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  } catch (e: any) {
    console.error(e);
    return "";
  }
};

export const formatTimestamp = (timestamp: string): string => {
  try {
    const date = new Date(timestamp);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  } catch (e: any) {
    console.error(e);
    return "";
  }
};

export const getFechaActual = (): string => {
  try {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const day = String(now.getDate()).padStart(2, "0");

    return `${day}/${month}/${year}`;
  } catch (e: any) {
    console.error(e);
    return "";
  }
};

export const formatPhoneNumber = (phoneNumber?: string) => {
  // Eliminar cualquier carácter no numérico
  if (!phoneNumber) {
    return "";
  }

  const cleaned = ("" + phoneNumber).replace(/\D/g, "");

  // Verificar si el número tiene al menos 4 dígitos
  if (cleaned.length < 4) {
    return phoneNumber;
  }

  const last = cleaned.slice(-4);
  const front = cleaned.slice(0, -4);

  let frontLast = "";
  let frontFirst = "";

  if (front.length > 4) {
    frontLast = front.slice(-4);
    frontFirst = "(" + front.slice(0, -4) + ") ";
  } else {
    frontFirst = "(11) ";
    frontLast = front;
  }

  return frontFirst + frontLast + "-" + last;
};

export const capitalizeFirstLetter = (string?: string) => {
  const titulo = string?.trim().toLocaleLowerCase();
  if (titulo) return titulo.charAt(0).toUpperCase() + titulo.slice(1);
  else return "";
};
