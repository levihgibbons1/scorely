import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "./queryClient";
import type { Agent, InsertAgent } from "@shared/schema";

export function useAgents(category?: string) {
  return useQuery<Agent[]>({
    queryKey:
      category && category !== "All"
        ? ["/api/agents", category]
        : ["/api/agents"],
    queryFn: async () => {
      const url =
        category && category !== "All"
          ? `/api/agents?category=${encodeURIComponent(category)}`
          : "/api/agents";
      const res = await fetch(url, { credentials: "include" });
      if (!res.ok) throw new Error(`${res.status}: ${await res.text()}`);
      return res.json();
    },
    staleTime: 30_000,
  });
}

export function useAgent(id: string) {
  return useQuery<Agent>({
    queryKey: ["/api/agents", id],
    enabled: !!id,
  });
}

export function useCreateAgent() {
  return useMutation({
    mutationFn: async (data: InsertAgent) => {
      const res = await apiRequest("POST", "/api/agents", data);
      return res.json() as Promise<Agent>;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/agents"] });
    },
  });
}

export function useVoteAgent() {
  return useMutation({
    mutationFn: async ({
      id,
      direction,
    }: {
      id: string;
      direction: "up" | "down";
    }) => {
      const res = await apiRequest("POST", `/api/agents/${id}/vote`, {
        direction,
      });
      return res.json() as Promise<Agent>;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/agents"] });
    },
  });
}
