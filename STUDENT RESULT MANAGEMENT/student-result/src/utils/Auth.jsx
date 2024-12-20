const fetchUser = async () => {
    try {
      const res = await fetch("/api/viewUsername", {
        method: "GET",
        credentials: "include", // Ensure the server allows this
      });
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      const data = await res.json();
      return data;
    } catch (error) {
      console.error("Failed to fetch user:", error);
      return null; // Return null or handle the error case
    }
  };
  
  export { fetchUser };
  