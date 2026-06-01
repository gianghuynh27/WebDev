import type { CoachRequest, CoachResponse } from "../types/coach";

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:4000";

export async function getCoachRecommendation(request : CoachRequest) : Promise<CoachResponse> {
    const response = await fetch(`${API_URL}/api/coach`, {
        method: "POST",
        headers:{
            "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
    });
    if(!response.ok){
        throw new Error("Failed to get coach recommendation");
    }
    return response.json();
}