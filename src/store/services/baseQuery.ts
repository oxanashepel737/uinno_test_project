import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import configuration from "../../configuration";
import { getToken } from "../localStorage.ts";

export const BaseQuery = fetchBaseQuery({
  baseUrl: `${configuration.apiURL}/api`,
  prepareHeaders(headers) {
    const apiToken = getToken();
    headers.set("Accept", "application/json");
    apiToken && headers.set("Authorization", `Bearer ${apiToken}`);
  },
});
