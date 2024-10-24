import { useEffect, useState } from "react";

function useCurrencyInfo(currency) {
    const [data, setData] = useState({});
    const API_KEY = '2ab0b30219aa4f22be0cd41f26447588';  // Open Exchange Rates API Key

    useEffect(() => {
        if (!currency) return;

        fetch(`https://openexchangerates.org/api/latest.json?app_id=${API_KEY}`)
            .then((res) => res.json())
            .then((res) => {
                setData(res.rates);
            })
            .catch((error) => console.error("Error fetching currency data:", error));
    }, [currency]);

    return data;
}

export default useCurrencyInfo;
