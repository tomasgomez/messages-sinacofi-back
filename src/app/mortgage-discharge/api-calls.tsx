import { Filter } from "@/types/mortgage-discharge";
import { MortgageDischargeData } from "../component/inbox-table/type";

export async function getForeClosureData(
  filters?: Filter[]
): Promise<MortgageDischargeData[]> {
  try {
    const baseUrl = window.location.origin;
    let url = `${baseUrl}/api/message/foreclosure`;

    const newFilters = filters?.slice() || [];

    if (newFilters.length > 0) {
      const queryParams = newFilters
        .map(
          (filter) =>
            `${encodeURIComponent(filter?.label)}=${encodeURIComponent(
              filter.value ?? ""
            )}`
        )
        .join("&");
      url = `${url}?${queryParams}`;
    }

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Error: Failed api call, Status: ${response.status}`);
    }

    if (response.status === 204) {
      return [];
    }

    const data: MortgageDischargeData[] = await response.json();

    return data;
  } catch (err: any) {
    throw err;
  }
}

export async function updateForeClosureMessage(
  cukCode?: string,
  status?: string
): Promise<MortgageDischargeData> {
  try {
    const baseUrl = window.location.origin;
    const url = `${baseUrl}/api/message/foreclosure`;
    const bodyData = { cukCode, status };
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyData),
    });

    if (!response.ok) {
      throw new Error(`Failed to update api call. Status: ${response.status}`);
    }

    const result: MortgageDischargeData = await response.json();

    return result;
  } catch (err) {
    throw err;
  }
}
