import { api } from "./client";
import type { Page } from "../types";

export const RESOURCE = "MentoresUtec";

export type Item = {
  id: number;
  name: string;
  speciality: string;
  modality: string;
  availableSlots: number;
  description: string;
};

export type Detail = Item & {
  slots: { id: number; startsAt: string; available: boolean }[];
};

export type ActionBody = {
  slotId: number;
  attendees: number;
};

export type ActionResult = {
  slotId: number;
  attendees: number;
};

export async function list(page: number, size = 5) {
  const { data } = await api.get<Page<Item>>(`/api/${RESOURCE}`, { params: { page, size } });
  return data;
}

export async function getById(id: string | number) {
  const { data } = await api.get<Detail>(`/api/${RESOURCE}/${id}`);
  return data;
}

export async function sendAction(id: string | number, body: ActionBody) {
  const { data } = await api.post<ActionResult>(`/api/${RESOURCE}/${id}/reservations`, body);
  return data;
}