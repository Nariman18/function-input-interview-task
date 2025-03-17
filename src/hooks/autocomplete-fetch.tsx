import { useQuery } from "@tanstack/react-query";

const fetchAutocompleteSuggestions = async () => {
  const response = await fetch(
    "https://652f91320b8d8ddac0b2b62b.mockapi.io/autocomplete"
  );

  if (!response.ok) {
    throw new Error("Failed to fetch autocomplete suggestions");
  }

  // Convert API response to expected structure
  const data = await response.json();
  return data.map((item: { id: string; name: string }) => ({
    id: item.id,
    label: item.name, // Map API response correctly
  }));
};

export const useAutocomplete = (query: string) => {
  const { data, ...rest } = useQuery({
    queryKey: ["autocomplete"],
    queryFn: fetchAutocompleteSuggestions,
    staleTime: 5000,
  });

  const filteredData =
    data?.filter((item: { label: string }) =>
      item.label.toLowerCase().includes(query.toLowerCase())
    ) || [];

  return { data: filteredData, ...rest };
};
