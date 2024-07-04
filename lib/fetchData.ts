export const fetchData = async <T>(
  url: string,
  lang: string
): Promise<T | null> => {
  try {
    const res = await fetch(url, {
      headers: {
        "Accept-Language": lang,
      },
    });

    if (!res.ok) {
      throw new Error("Network response was not ok");
    }

    const data: T = await res.json();
    return data;
  } catch (error) {
    console.error("Fetch error:", error);
    return null;
  }
};
