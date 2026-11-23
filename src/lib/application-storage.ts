import type { JobApplication } from '@/pages/Index';

export const applicationStorageKey = 'nd-job-tracker.applications.v1';

function parseDate(value: unknown): Date {
  if (typeof value !== 'string') throw new Error('Invalid application date');
  const date = new Date(value);
  if (!Number.isFinite(date.getTime())) throw new Error('Invalid application date');
  return date;
}

export function loadApplications(): JobApplication[] {
  const saved = localStorage.getItem(applicationStorageKey);
  if (saved === null) return [];

  const records: unknown = JSON.parse(saved);
  if (!Array.isArray(records)) throw new Error('Invalid application records');

  return records.map((record) => {
    if (
      !record ||
      typeof record.id !== 'string' ||
      typeof record.company !== 'string' ||
      typeof record.position !== 'string' ||
      typeof record.nextAction !== 'string' ||
      typeof record.notes !== 'string' ||
      !['pending', 'applied', 'interview', 'offer', 'rejected', 'withdrawn'].includes(record.status) ||
      !['low', 'medium', 'high'].includes(record.priority)
    ) {
      throw new Error('Invalid application record');
    }

    return {
      ...record,
      dateApplied: parseDate(record.dateApplied),
      deadline: record.deadline === undefined ? undefined : parseDate(record.deadline),
    };
  });
}

export function saveApplications(applications: JobApplication[]) {
  localStorage.setItem(applicationStorageKey, JSON.stringify(applications));
}
