import { Currency } from "@components/type";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

export function usePriceItems() {
  const { data, isFetching } = useQuery({
    queryKey: ["price-items"],
    queryFn: async () => {
      const response = await fetch(
        "https://interview.switcheo.com/prices.json"
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
  });

  const priceItems = useMemo(
    () =>
      (data || [])?.map((item: Record<string, unknown>) => ({
        text: item.currency,
        icon: `/src/assets/icons/tokens/${item.currency}.svg`,
        price: item.price,
      })) as Currency[],
    [data]
  );

  return {
    priceItems,
    isFetching,
  };
}
